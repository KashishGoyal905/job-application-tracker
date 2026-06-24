"use client";

import ApplicationsTable from "@/components/dashboard/ApplicationsTable";
import ApplicationTableSkeleton from "@/components/dashboard/ApplicationTableSkeleton";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentApplications from "@/components/dashboard/RecentApplications";
import StatsCard from "@/components/dashboard/StatsCard";
import StatsCardSkeleton from "@/skeletons/StatsCardSkeleton";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useApplicationStore } from "@/store/applicationsStore";
import { useEffect, useState } from "react";
import ApplicationStatusBarChart from "@/components/charts/ApplicationStatusBarChart";
import ApplicationStatusPieChart from "@/components/charts/ApplicationStatusPieChart";

export default function Home() {
  const applications = useApplicationStore((state) => state.applications);
  const [isLoading, setIsLoading] = useState(true);

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

  // Data for the charts
  const chartsApplicationsStatusData = [
    { status: "Interview", count: interviews },
    { status: "Applied", count: applied },
    { status: "Offer", count: offer },
    { status: "Rejected", count: rejected },
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {isLoading ? (
            <>
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
              <StatsCardSkeleton />
            </>
          ) : (
            statsData.map((data) => (
              <StatsCard
                key={data.title}
                title={data.title}
                value={data.value}
              />
            ))
          )}
        </div>

        {/* Charts */}
        <div className="rounded-xl border bg-white dark:bg-slate-900 p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ApplicationStatusBarChart chartData={chartsApplicationsStatusData} />
          <ApplicationStatusPieChart chartData={chartsApplicationsStatusData} />
        </div>

        {/* Quick Actions */}
        <QuickActions />



        {/* Recent Applications */}
        <RecentApplications />

      </div>
    </DashboardLayout>
  );
}
