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
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";

type AppliationTableProps = {
  searchQuery: string;
  statusFilter: string;
};

const ITEMS_PER_PAGE = 5;


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

  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedApplications = filteredApplications.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages])


  return (
    <>
      <div className="rounded-xl border bg-white dark:bg-slate-900 p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            All Applications
          </h2>
          {
            applications.length > 0 && (
              <h2 className="text-xs text-green-700 dark:text-green-400 bg-green-200 dark:bg-green-700/20 border px-2 py-1 rounded-lg border-green-300 dark:border-green-800 ">
                Found <span className="font-bold">
                  {filteredApplications.length}
                </span>  applications
              </h2>
            )
          }
          <Button onClick={handleNewApplicationClick}>Add New</Button>
        </div>

        <div className="overflow-x-auto">
          {applications.length === 0 ? (
            <EmptyState
              title="No applications yet"
              description="Get started by adding your first job application."
              buttonText="Add First Application"
              onClick={handleNewApplicationClick}
            />
          ) : filteredApplications.length === 0 ? (
            <EmptyState
              title="No applications found"
              description="No applications found matching your criteria."
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
                      className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
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
                        ${application.status === "Interview"
                              ? "bg-yellow-100 text-yellow-700 border-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400"
                              : application.status === "Applied"
                                ? "bg-blue-100 text-blue-700 border-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                                : application.status === "Offer"
                                  ? "bg-green-100 text-green-700 border-green-600 dark:bg-green-900/20 dark:text-green-400"
                                  : "bg-red-100 text-red-700 border-red-600 dark:bg-red-900/20 dark:text-red-400"
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
              <div className="mt-6 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" className={currentPage === 1 ? "pointer-events-none opacity-50 cursor-not-allowed" : ""} onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) {
                          setCurrentPage(currentPage - 1);
                        }
                      }}></PaginationPrevious>
                    </PaginationItem>
                    {Array.from({ length: totalPages }).map((_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <PaginationItem key={pageNumber}>
                          <PaginationLink
                            href="#"
                            isActive={currentPage === pageNumber}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(pageNumber);
                            }}
                          >
                            {pageNumber}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    })
                    }

                    {/* <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem> */}
                    <PaginationItem>
                      <PaginationNext href="#" className={currentPage === totalPages ? "pointer-events-none opacity-50 cursor-not-allowed" : ""} onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) {
                          setCurrentPage(currentPage + 1);
                        }
                      }}></PaginationNext>
                    </PaginationItem>

                  </PaginationContent>
                </Pagination>
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
