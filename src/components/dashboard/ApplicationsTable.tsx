"use client";

import { useEffect, useState } from "react";
import ApplicationModal from "./ApplicationModal";
import { useApplicationStore } from "@/store/applicationsStore";
import { ApplicationType } from "@/types/application";
import EmptyState from "../shared/EmptyState";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import DeleteConfirmationDialog from "../dialogs/DeleteConfirmationDialog";

type AppliationTableProps = {
  searchQuery: string;
  statusFilter: string;
};

function ApplicationsTable({
  searchQuery,
  statusFilter,
}: AppliationTableProps) {
  const applications = useApplicationStore((state) => state.applications);
  const deleteApplication = useApplicationStore(
    (state) => state.deleteApplication,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] =
    useState<ApplicationType | null>(null);
  const [editingApplication, setEditingApplication] =
    useState<ApplicationType | null>(null);


  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  function handleNewApplicationClick() {
    setEditingApplication(null);
    setIsModalOpen(true);
  }

  function handleEditApplication(application: ApplicationType) {
    setEditingApplication(application);
    setIsModalOpen(true);
  }

  function handleDeleteApplicationConfirm() {
    if (!applicationToDelete) return;
    deleteApplication(applicationToDelete.id);
    toast.success(`Deleted ${applicationToDelete.company} successfully`);
    setApplicationToDelete(null);
  }

  function handleDeleteApplicationCancel() {
    setApplicationToDelete(null);
  }

  let searchApplications = applications;
  if (searchQuery !== "") {
    searchApplications = applications.filter(
      (app) =>
        app.company.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        app.role.toLowerCase().includes(searchQuery?.toLowerCase()),
    );
  }

  let filteredApplications = searchApplications;
  if (statusFilter !== "All") {
    filteredApplications = searchApplications.filter(
      (app) => app.status.toLowerCase() === statusFilter.toLowerCase(),
    );
  }

  const totalPages = Math.ceil(filteredApplications.length/ITEMS_PER_PAGE);
  const startIndex = (currentPage-1) * ITEMS_PER_PAGE;
  const paginatedApplications = filteredApplications.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  useEffect(() => {
    if(currentPage > totalPages && totalPages >0){
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages])

  const handlePageChange = (page: number)=>{
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
  }

  return (
    <>
      <div className="rounded-xl border bg-white dark:bg-slate-900 p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            Recent Applications
          </h2>
          <Button onClick={handleNewApplicationClick}>Add New</Button>
        </div>

        <div className="overflow-x-auto">
          {paginatedApplications.length === 0 ? (
            <EmptyState
              title="No applications yet"
              description="Get started by adding your first job application."
              buttonText="Add First Application"
              onClick={handleNewApplicationClick}
            />
          ) : (
            <>
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left">
                  <th className="pb-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                    Company
                  </th>
                  <th className="pb-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                    Role
                  </th>
                  <th className="pb-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                    Status
                  </th>
                  <th className="pb-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                    Applied
                  </th>
                  <th className="pb-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedApplications.map((application) => (
                  <tr
                    key={application.id}
                    className="border-t border-slate-200 dark:border-slate-700"
                  >
                    <td className="py-4 font-medium text-slate-800 dark:text-white">
                      {application.company}
                    </td>
                    <td className="py-4 text-slate-600 dark:text-slate-400">
                      {application.role}
                    </td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium
                        ${
                          application.status === "Interview"
                            ? "bg-yellow-100 text-yellow-700 border-b border-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                            : application.status === "Applied"
                              ? "bg-blue-100 text-blue-700 border-b border-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                              : application.status === "Offer"
                                ? "bg-green-100 text-green-700 border-b border-green-600 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-red-100 text-red-700 border-b border-red-600 dark:bg-red-900/20 dark:text-red-400"
                        }`}
                      >
                        {application.status === "Offer"
                          ? "Offered"
                          : application.status}
                      </span>
                    </td>
                    <td className="py-4 text-slate-600 dark:text-slate-400">
                      {application.appliedDate}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditApplication(application)}
                          className="rounded-full cursor-pointer p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => setApplicationToDelete(application)}
                          className="rounded-full cursor-pointer p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">Page {currentPage} of {totalPages}</p>
              <div className="flex gap-2">
                <Button variant={"outline"} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  Previous
                </Button>
                <Button variant={"outline"} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                  Next
                </Button>
              </div>
            </div>
            </>
          )}
        </div>
      </div>
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingApplication(null);
        }}
        application={editingApplication}
      />
      <DeleteConfirmationDialog
        isOpen={!!applicationToDelete}
        onClose={handleDeleteApplicationCancel}
        onConfirm={handleDeleteApplicationConfirm}
        companyName={applicationToDelete?.company || ""}
      />
    </>
  );
}

export default ApplicationsTable;
