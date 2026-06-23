import { useApplicationStore } from "@/store/applicationsStore"
import { Button } from "../ui/button";
import Link from "next/link";
import EmptyState from "../shared/EmptyState";

export default function RecentApplications() {
    const applications = useApplicationStore((state) => state.applications);
    applications.sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime());
    const recentApplications = applications.slice(0, 5);
    // const recentApplications = [];

    if (recentApplications.length === 0) {
        return (
            <EmptyState title="No Recent Applications" description="Add your first application" />
        )
    }
    return (
        <div className="rounded-xl p-6 border bg-white dark:bg-slate-900 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                    Recent Applications
                </h2>
                <Link href={"/applications"}>
                    <Button variant={"outline"} className="cursor-pointer">View All</Button>
                </Link>
            </div>
            <div className="space-y-4">
                {recentApplications.map((application) => (
                    <div key={application.id} className="flex items-center justify-between">
                        <div>
                            <h3 className="text-md font-medium text-slate-800 dark:text-white">
                                {application.company}
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {application.role}
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                {application.appliedDate}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}