import { Skeleton } from "@/components/ui/skeleton";
// import { useApplicationStore } from "@/store/applicationsStore";

export default function ApplicationTableSkeleton() {
  // const applications = useApplicationStore((state) => state.applications);
  // const applicationsLength = applications.length;
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800">
      <div className="mb-6 flex flex-col gap-3 items-center sm:flex-row sm:justify-between">
        <Skeleton className="h-6 md:h-10 w-48" />
        <Skeleton className="h-6 md:h-10 w-48" />
        <Skeleton className="h-7 md:h-10 w-full md:w-28" />
      </div>

      {/* Desktop */}
      <div className="space-y-4 hidden md:block">
        {Array.from({ length: 6 }).map((_, index) => (
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

      {/* Mobile */}
      <div className="space-y-4 md:hidden">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index}
            className="rounded-xl border bg-white dark:bg-slate-900 p-4 border-slate-200 dark:border-slate-700"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-26" />
                <Skeleton className="h-6 w-26" />
              </div>
              <div className="flex items-center justify-between gap-2 border-t pt-3">
                <Skeleton className="h-8 w-12" />
                <Skeleton className="h-8 w-12" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
