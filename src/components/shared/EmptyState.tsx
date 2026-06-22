import { Briefcase } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
  buttonText?: string;
  onClick?: () => void;
};

export default function EmptyState({
  title,
  description,
  buttonText,
  onClick,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-100 px-6 py-16 text-center dark:border-slate-700 dark:bg-slate-900/50">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
        <Briefcase size={28} className="text-indigo-600 dark:text-indigo-400" />
      </div>
      <h3 className="mt-6 text-xl font-semibold text-slate-800 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        {description}
      </p>
      {buttonText && onClick && (
        <button
          onClick={onClick}
          className="mt-6 cursor-pointer rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-600"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
