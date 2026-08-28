"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { ApplicationStatusType, ApplicationType } from "@/types/application";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { formatDate } from "@/utils/date";
import { addApplicationSchema } from "@/lib/validations/applicationSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ApplicationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  application: ApplicationType | null;
};

function ApplicationModal({
  isOpen,
  onClose,
  application,
}: ApplicationModalProps) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<ApplicationStatusType>("Applied");
  const [appliedDate, setAppliedDate] = useState("");

  // form data error state for zod
  const [errors, setErrors] = useState<{
    company?: string;
    role?: string;
    status?: string;
    appliedDate?: string;
  }>({});

  // to fill the data if we have application otherwise clear the data.
  useEffect(() => {
    if (application) {
      setCompany(application.company);
      setRole(application.role);
      setStatus(application.status);

      // Format date from "12 May 2026" to "YYYY-MM-DD" for the HTML5 date input
      const date = new Date(application.appliedDate);
      if (!isNaN(date.getTime())) {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        setAppliedDate(`${yyyy}-${mm}-${dd}`);
      } else {
        setAppliedDate("");
      }
    } else {
      setCompany("");
      setRole("");
      setStatus("Applied");
      setAppliedDate("");
    }

    // reseting errors also if we open and close modal without submitting anything, we still want to start from a fresh state
    setErrors({});
  }, [application, isOpen]); // isOpen is important if we don't use it then we face a bug
  // BUG: without it, supoose we click add new button (application: null, modal: open)
  //  -> we fill some thing and click cancels (appliaction: null, modal:false) but state inside modal is still holding our added values
  // -> now if we again open it (applicaiton: null, modal: open) now since we only had application dependency and it is still same as null, our useEffect will not be called therefore we will still see the last added values instead of fresh new application modal

  const queryClient = useQueryClient();
  // POST -> new application
  const createApplicationMutation = useMutation({
    mutationFn: async (application: {
      company: string;
      role: string;
      status: ApplicationStatusType;
      appliedDate: string;
    }) => {

      const res = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(application),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add application");
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      setErrors({});
      toast.success(`${company} application added successfully`);
      onClose();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add application");
    }
  })
  // Put -> update application
  const updateApplicationMutation = useMutation({
    mutationFn: async (application: {
      id: number;
      company: string;
      role: string;
      status: string;
      appliedDate: string;
    }) => {
      const res = await fetch(`/api/applications/${application.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: application.company,
          role: application.role,
          status: application.status,
          appliedDate: application.appliedDate,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update application");
      }

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      setErrors({});
      toast.success("Application updated successfully");
      onClose();
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  // DELETE
  const deleteApplicationMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/applications/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete application");
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      toast.success("Application deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete application");
    }
  })

  async function handleModalSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // zod validation
    const validationResult = addApplicationSchema.safeParse({ // safeParse() return object with values as success: boolean and data: T or error: ZodError
      company,
      role,
      status,
      appliedDate,
    });

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;

      // setting error state
      setErrors({
        company: fieldErrors.company?.[0],
        role: fieldErrors.role?.[0],
        status: fieldErrors.status?.[0],
        appliedDate: fieldErrors.appliedDate?.[0],
      });
      // toast.error("Please fill all the fields");
      return;
    }

    // if application doesn't exist then add it else edit it
    if (!application) {
      createApplicationMutation.mutate({
        company,
        role,
        status,
        appliedDate: formatDate(appliedDate),
      });

      return;
    } else {
      updateApplicationMutation.mutate({
        id: application.id,
        company,
        role,
        status,
        appliedDate: formatDate(appliedDate),
      });
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-[3px] p-4">
      {/* Modal Card */}
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all transform animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            {application ? "Edit Application" : "Add New Application"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleModalSubmit} className="space-y-4">
          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Company
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Google"
              value={company}
              onChange={(e) => {
                setCompany(e.target.value);
                // if we start typing again, errors will be removed until you submit again and it fails
                if (errors.company) {
                  setErrors((prev) => ({
                    ...prev,
                    company: undefined,
                  }));
                }
              }}
              className={
                errors.company
                  ? "w-full rounded-lg border-2 border-red-500 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-red-700 dark:bg-slate-800 dark:text-white dark:focus:border-red-400"
                  : "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-400"
              }
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">{errors.company}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Role
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Frontend Developer"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                if (errors.role) {
                  setErrors((prev) => ({
                    ...prev,
                    role: undefined,
                  }));
                }
              }}
              className={
                errors.role
                  ? "w-full rounded-lg border-2 border-red-500 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-red-700 dark:bg-slate-800 dark:text-white dark:focus:border-red-400"
                  : "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-400"
              }
            />
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role}</p>
            )}
          </div>

          {/* Status Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              Status
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {(["Applied", "Interview", "Offer", "Rejected"] as const).map(
                (s) => {
                  const isActive = status === s;
                  let activeStyle = "";
                  if (isActive) {
                    if (s === "Applied")
                      activeStyle =
                        "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800";
                    if (s === "Interview")
                      activeStyle =
                        "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800";
                    if (s === "Offer")
                      activeStyle =
                        "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
                    if (s === "Rejected")
                      activeStyle =
                        "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800";
                  }

                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStatus(s)}
                      className={`rounded-lg border px-3 py-2 text-xs font-medium transition text-center cursor-pointer
                      ${isActive ? activeStyle : "border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"}
                    `}
                    >
                      {s}
                    </button>
                  );
                },
              )}
            </div>
          </div>

          {/* Applied Date */}
          <div>
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
              Applied Date
            </label>
            <input
              type="date"
              required
              value={appliedDate}
              onChange={(e) => {
                setAppliedDate(e.target.value);

                if (errors.appliedDate) {
                  setErrors((prev) => ({
                    ...prev,
                    appliedDate: undefined,
                  }));
                }
              }}
              className={
                errors.appliedDate
                  ? "w-full rounded-lg border-2 border-red-500 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-red-700 dark:bg-slate-800 dark:text-white dark:focus:border-red-400"
                  : "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-400"
              }
            />
            {errors.appliedDate && (
              <p className="text-red-500 text-sm mt-1">{errors.appliedDate}</p>
            )}
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <Button type="submit" className={`active:scale-[0.98] transition ${createApplicationMutation.isPending ? "disabled:opacity-50" : ""}`}>
              {application ? "Update Application" : createApplicationMutation.isPending
                ? "Adding..."
                : "Add Application"}
            </Button>
          </div>
        </form>
      </div>
    </div >
  );
}

export default ApplicationModal;
