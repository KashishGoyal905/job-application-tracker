import ApplicationsTable from "@/components/dashboard/ApplicationsTable";
import StatsCard from "@/components/dashboard/StatsCard";
import DashboardLayout from "@/components/layouts/DashboardLayout";

const statsData = [
  {
    title: "Total Applications",
    value: 0,
  },
  {
    title: "Interviews",
    value: 0,
  },
  {
    title: "Offers",
    value: 0,
  },
  {
    title: "Rejected",
    value: 0,
  },
];

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            DashBoard
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Welcome back, Kashish👋
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statsData.map((data) => (
            <StatsCard key={data.title} title={data.title} value={data.value} />
          ))}
        </div>

        {/* Applications */}
        <div>
          <ApplicationsTable />
        </div>
      </div>
    </DashboardLayout>
  );
}
