type StatsCardProps = {
  title: string;
  value: number;
};

function StatsCard({ title, value }: StatsCardProps) {
  return (
    <div className="rounded-xl border bg-white dark:bg-slate-900 p-6 shadow-sm">
      <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
      <h3 className="mt-2 text-3xl font-bold text-slate-800 dark:text-white">
        {value}
      </h3>
    </div>
  );
}

export default StatsCard;
