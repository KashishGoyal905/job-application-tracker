import Skeleton from "../shared/Skeleton";

export default function StatsCardSkeleton() {
  return (
    <div className="rounded-xl border bg-white dark:bg-slate-900 p-6 shadow-sm">
      <Skeleton className="h-5 w-20" />
      <Skeleton className="mt-4 h-7 w-8" />
    </div>
  );
}
