"use client";

import {
  BriefcaseBusiness,
  CalendarDays,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  return (
    // aside is just a wrapper for better undestanding. It is same like div, section. Here we are using it for semantic purposes
    <aside className="w-64 min-h-screen border-r bg-white text-slate-800 dark:bg-slate-900 dark:text-white">

      {/* This is the logo */}
      <div className="p-6">
        <h1 className="text-2xl font-bold">JobTracker</h1>
      </div>

      {/* Navigation bar */}
      <nav className="flex flex-col gap-2 px-4">
        {/* Iterating through the navItems array and rendering the Link component for each item */}
        {navItems.map((item) => {
          // Destructuring the Icon component from the item object
          const Icon = item.icon;

          return (
            // Link component is used to navigate to the specified href
            <Link
              key={item.title}
              href={item.href}
              //  This is a conditional class name
              //  If the current pathname is equal to the item's href, then the class "bg-slate-500 text-white" is applied
              //  Otherwise, the class "hover:bg-slate-100 dark:hover:bg-slate-800" is applied
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition
 ${pathname === item.href ? "bg-slate-500 text-white" : "hover:bg-slate-200 dark:hover:bg-slate-800"}`}
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
