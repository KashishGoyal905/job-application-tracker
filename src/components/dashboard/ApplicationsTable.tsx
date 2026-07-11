"use client";

import { useEffect, useState } from "react";
import ApplicationModal from "../applications/ApplicationModal";
import { useApplicationStore } from "@/store/applicationsStore";
import { ApplicationType } from "@/types/application";
import EmptyState from "../shared/EmptyState";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import DeleteConfirmationDialog from "../dialogs/DeleteConfirmationDialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import ApplicationTableSkeleton from "./ApplicationTableSkeleton";

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

  // for skeletons
  const [isLoading, setIsLoading] = useState(true);

  // Modal related
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] =
    useState<ApplicationType | null>(null);
  const [editingApplication, setEditingApplication] =
    useState<ApplicationType | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // To create a new application
  function handleNewApplicationClick() {
    setEditingApplication(null);
    setIsModalOpen(true);
  }

  // To edit a existing application
  function handleEditApplication(application: ApplicationType) {
    setEditingApplication(application);
    setIsModalOpen(true);
  }

  // To delete a application
  function handleDeleteApplicationConfirm() {
    if (!applicationToDelete) return;
    deleteApplication(applicationToDelete.id);
    toast.success(`Deleted ${applicationToDelete.company} successfully`);
    setApplicationToDelete(null);
  }
  function handleDeleteApplicationCancel() {
    setApplicationToDelete(null);
  }

  // calculating applications based on search query and filter
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

  // calculating no. applications per page
  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedApplications = filteredApplications.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  // for edge cases like u delete the only row entry from the last page
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  // for edge cases like u delete the last page completely
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // skeletons
  if (isLoading) {
    return <ApplicationTableSkeleton />
  }

  return (
    <>
      <div className="rounded-xl border bg-white dark:bg-slate-900 p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-3 items-center sm:flex-row sm:justify-between">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
            All Applications
          </h2>
          {applications.length > 0 && (
            <h2 className="text-xs text-green-700 dark:text-green-400 bg-green-200 dark:bg-green-700/20 border px-2 py-1 rounded-lg border-green-300 dark:border-green-800 ">
              Found{" "}
              <span className="font-bold">{filteredApplications.length}</span>{" "}
              applications
            </h2>
          )}
          <Button
            onClick={handleNewApplicationClick}
            className="w-full sm:w-auto"
          >
            Add New
          </Button>
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
              {/* Desktop */}
              <div className="hidden md:block">
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
                            {/* Edit */}
                            <button
                              onClick={() => handleEditApplication(application)}
                              className="rounded-full cursor-pointer p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                            >
                              <Pencil size={16} />
                            </button>
                            {/* Delete */}
                            <button
                              onClick={() =>
                                setApplicationToDelete(application)
                              }
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
              </div>

              {/* Mobile */}
              <div className="space-y-4 md:hidden">
                {paginatedApplications.map((application) => (
                  <div
                    key={application.id}
                    className="rounded-xl border shadow-sm hover:shadow-md transition-all bg-white dark:bg-slate-900 p-4 shadow-sm border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    <div className="space-y-3">
                      {/* Info col-1 */}
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-slate-800 dark:text-white">
                          {application.company}
                        </h3>
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
                      </div>
                      {/* Info col-2 */}
                      <div className="flex items-center justify-between">
                        <p className="text-md text-slate-500 dark:text-slate-400">
                          {application.role}
                        </p>

                        <span className="text- text-slate-500 dark:text-slate-400">
                          {application.appliedDate}
                        </span>
                      </div>
                      {/* Actions */}
                      <div className="flex justify-between border-t pt-1">
                        <button
                          onClick={() => handleEditApplication(application)}
                          className="rounded-full cursor-pointer p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => setApplicationToDelete(application)}
                          className="rounded-full cursor-pointer p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-6 flex justify-center">
                <Pagination>
                  <PaginationContent>

                    {/* Prebious Icon */}
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50 cursor-not-allowed"
                            : ""
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                          }
                        }}
                      ></PaginationPrevious>
                    </PaginationItem>

                    {/* Numbres */}
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
                      );
                    })}

                    {/* Next Icon */}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50 cursor-not-allowed"
                            : ""
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          if (currentPage < totalPages) {
                            setCurrentPage(currentPage + 1);
                          }
                        }}
                      ></PaginationNext>
                    </PaginationItem>

                  </PaginationContent>
                </Pagination>
              </div>

            </>
          )}
        </div>

      </div>
      {/* To edit & Add new application */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingApplication(null);
        }}
        application={editingApplication}
      />
      {/* To delete an application */}
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
