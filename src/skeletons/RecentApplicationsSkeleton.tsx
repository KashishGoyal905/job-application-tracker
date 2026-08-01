import { Skeleton } from "@/components/ui/skeleton";

export default function RecentApplicationsSkeleton() {
  return (
    <div className="rounded-xl p-6 border bg-white dark:bg-slate-900">
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-8 w-20" />
      </div>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b last:border-b-0 pb-4"
          >
            <div className="flex flex-col items-start gap-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="flex flex-col items-end gap-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
