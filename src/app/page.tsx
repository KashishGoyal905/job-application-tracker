"use client";

import ApplicationsTable from "@/components/dashboard/ApplicationsTable";
import StatsCard from "@/components/dashboard/StatsCard";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useApplicationStore } from "@/store/applicationsStore";

export default function Home() {
  const applications = useApplicationStore((state) => state.applications);

  const totalApplications = applications.length;
  const interviews = applications.filter(
    (application) => application.status === "Interview",
  ).length;
  const applied = applications.filter(
    (application) => application.status === "Applied",
  ).length;
  const offer = applications.filter(
    (application) => application.status === "Offer",
  ).length;
  const rejected = applications.filter(
    (application) => application.status === "Rejected",
  ).length;

  const statsData = [
    {
      title: "Total Applications",
      value: totalApplications,
    },
    {
      title: "Interviews",
      value: interviews,
    },
    {
      title: "Applied",
      value: applied,
    },
    {
      title: "Offered",
      value: offer,
    },
    {
      title: "Rejected",
      value: rejected,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        {/* <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            DashBoard
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Welcome back, Kashish👋
          </p>
        </div> */}

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
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
