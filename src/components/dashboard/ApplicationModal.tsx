"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { ApplicationStatusType } from "@/types/application";

type ApplicationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    company: string;
    role: string;
    status: ApplicationStatusType;
    appliedDate: string;
  }) => void;
};

function ApplicationModal({
  isOpen,
  onClose,
  onSubmit,
}: ApplicationModalProps) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<ApplicationStatusType>("Applied");
  const [appliedDate, setAppliedDate] = useState("");

  function handleModalSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!company.trim() || !role.trim() || !appliedDate.trim()) {
      return;
    }

    // Format date beautifully if needed, or pass it directly
    onSubmit({
      company,
      role,
      status,
      appliedDate,
    });

    // Reset state
    setCompany("");
    setRole("");
    setStatus("Applied");
    setAppliedDate("");

    // Close modal
    onClose();
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
            Add New Application
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
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-400"
            />
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
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-400"
            />
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
              onChange={(e) => setAppliedDate(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-400"
            />
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
            <button
              type="submit"
              className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600 active:scale-[0.98] transition cursor-pointer"
            >
              Add Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplicationModal;
