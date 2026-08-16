"use client";

import ApplicationsTable from "@/components/dashboard/ApplicationsTable";
import ApplicationTableSkeleton from "@/components/dashboard/ApplicationTableSkeleton";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function ApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  //  GET
  const {
    data: applications = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await fetch("/api/applications");

      if (!res.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await res.json();
      // console.log(data);

      return data.applications;
    },
  });


  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Searching & Filtering UI */}
        <div className="flex flex-row gap-3 items-center justify-between">
          <Input
            placeholder="Search company or role"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:max-w-sm"
          />

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="max-w-lg md:w-[120px]">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Applied">Applied</SelectItem>
              <SelectItem value="Interview">Interview</SelectItem>
              <SelectItem value="Offer">Offer</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Main Table */}
        <ApplicationsTable
          applications={applications}
          isLoading={isLoading}
          error={error}
          searchQuery={searchQuery}
          statusFilter={statusFilter}
        />

      </div>
    </DashboardLayout>
  );
}

export default ApplicationsPage;
