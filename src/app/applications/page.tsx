"use client";

import ApplicationsTable from "@/components/dashboard/ApplicationsTable";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

function ApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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
          searchQuery={searchQuery}
          statusFilter={statusFilter}
        />

      </div>
    </DashboardLayout>
  );
}

export default ApplicationsPage;
