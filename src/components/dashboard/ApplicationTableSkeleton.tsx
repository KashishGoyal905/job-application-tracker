import Skeleton from "../ui/Skeleton";
import { useApplicationStore } from "@/store/applicationsStore";

export default function ApplicationTableSkeleton() {
  const applications = useApplicationStore((state) => state.applications);
  const applicationsLength = applications.length;
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800">
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-28" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: applicationsLength }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
          >
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
