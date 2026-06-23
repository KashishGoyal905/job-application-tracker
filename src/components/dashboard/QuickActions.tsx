import { toast } from "sonner";
import { Button } from "../ui/button";
import { BriefcaseBusiness, CalendarDays, Download } from "lucide-react";

type QuickActionsProps = {
  onAddApplication: () => void;
};

export default function QuickActions() {
  return (
    <div className="rounded-xl border bg-white dark:bg-slate-900 p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-slate-800 dark:text-white">
        Quick Actions
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Button
          // onClick={onAddApplication}
          className="h-18 flex-col items-center justify-center gap-2"
        >
          <BriefcaseBusiness size={22} />
          Add Application
        </Button>
        <Button
          variant={"outline"}
          className="h-18 flex-col items-center justify-center gap-2 cursor-pointer"
          onClick={() => toast.info("Interview Scheduling coming soon")}
        >
          <CalendarDays size={22} />
          Schedule Interview
        </Button>
        <Button
          variant={"outline"}
          className="h-18 flex-col items-center justify-center gap-2 cursor-pointer"
          onClick={() => toast.info("Export feature coming soon")}
        >
          <Download size={22} />
          Export data
        </Button>
      </div>
    </div>
  );
}
