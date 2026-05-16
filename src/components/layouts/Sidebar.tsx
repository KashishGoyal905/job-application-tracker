import {
  BriefcaseBusiness,
  CalendarDays,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Applications",
    href: "/applications",
    icon: BriefcaseBusiness,
  },
  {
    title: "Interviews",
    href: "/interviews",
    icon: CalendarDays,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen border-r bg-slate-950 text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold">JobTracker</h1>
      </div>
      <nav className="flex flex-col gap-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-slate-800"
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
