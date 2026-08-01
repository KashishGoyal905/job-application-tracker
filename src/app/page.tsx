"use client";

import QuickActions from "@/components/dashboard/QuickActions";
import RecentApplications from "@/components/dashboard/RecentApplications";
import StatsCard from "@/components/dashboard/StatsCard";
import StatsCardSkeleton from "@/skeletons/StatsCardSkeleton";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useApplicationStore } from "@/store/applicationsStore";
import { useEffect, useState } from "react";
import ApplicationStatusPieChart from "@/components/charts/ApplicationStatusPieChart";
import ApplicationsLineChart from "@/components/charts/ApplicationsLineChart";

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
    { status: "Interview", count: interviews, fill: "var(--chart-2)" },
    { status: "Applied", count: applied, fill: "var(--chart-3)" },
    { status: "Offer", count: offer, fill: "var(--chart-4)" },
    { status: "Rejected", count: rejected, fill: "var(--chart-1)" },
  ]

  // Data for the line Chart
  const monthlyApplications: Record<string, number> = {};
  applications.forEach((application) => {
    const date = new Date(application.appliedDate);
    if (!isNaN(date.getTime())) {
      const month = date.toLocaleString("default", { month: "short" });
      monthlyApplications[month] = (monthlyApplications[month] || 0) + 1;
    }
  });

  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const monthlyApplicationsData = Object.keys(monthlyApplications)
    .sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b))
    .map((month) => ({
      month,
      applications: monthlyApplications[month],
    }));

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
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 xl:grid-cols-5">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ApplicationsLineChart chartData={monthlyApplicationsData} />
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
