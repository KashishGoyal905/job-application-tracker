import ApplicationsTable from "@/components/dashboard/ApplicationsTable";
import DashboardLayout from "@/components/layouts/DashboardLayout";

function ApplicationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Applications
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Manage & track all your job applications here!
          </p>
        </div>

        {/* Table */}

        <ApplicationsTable />
      </div>
    </DashboardLayout>
  );
}

export default ApplicationsPage;
