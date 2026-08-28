"use client"

import { Button } from "../ui/button";
import Link from "next/link";
import EmptyState from "../shared/EmptyState";
import RecentApplicationsSkeleton from "@/skeletons/RecentApplicationsSkeleton";
import { useQuery } from "@tanstack/react-query";

export default function RecentApplications() {
  const { data, isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await fetch("/api/applications");
      if (!res.ok) {
        throw new Error("Failed to fetch applications");
      }
      return res.json();
    },
  })
  const applications = data?.applications ?? [];
  const recentApplications = [...applications]
    .sort(
      (a, b) =>
        new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime(),
    )
    .slice(0, 5);

  if (isLoading) {
    return <RecentApplicationsSkeleton />;
  }

  if (recentApplications.length === 0) {
    return (
      <EmptyState
        title="No Recent Applications"
        description="Add your first application"
      />
    );
  }

  return (
    <div className="rounded-xl p-6 border bg-white dark:bg-slate-900 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
          Recent Applications
        </h2>
        <Link href={"/applications"}>
          <Button variant={"outline"} size="sm" className="cursor-pointer">
            View All
          </Button>
        </Link>
      </div>
      <div className="space-y-4">
        {recentApplications.map((application) => (
          <div
            key={application.id}
            className="flex items-center justify-between border-b last:border-b-0 pb-4"
          >
            <div className="flex flex-col items-start gap-2">
              <h3 className="text-md font-medium text-slate-800 dark:text-white">
                {application.company}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {application.role}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {application.appliedDate}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {application.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
