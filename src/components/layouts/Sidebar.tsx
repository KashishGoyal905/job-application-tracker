"use client";

import {
  BriefcaseBusiness,
  CalendarDays,
  FileText,
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
    title: "Resume",
    href: "/resume",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

type SidebarProps = {
  isOpen: boolean,
  onClose: () => void,
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (

    <>
      {/* This is an overlay that appears when the sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* aside is just a wrapper for better undestanding. It is same like div, section. Here we are using it for semantic purposes */}
      <aside
        // This is a conditional class name
        // if isOpen is true, then the class "translate-x-0" is applied
        // if isOpen is false, then the class "-translate-x-full" is applied
        className={`fixed left-0 top-0 z-50 h-full w-64 border-r bg-white text-slate-800 dark:bg-slate-900 dark:text-white transition-transform duration-300
 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}>


        {/* logo */}
        <div className="p-6">
          <h1 className="text-2xl font-bold">JobTracker</h1>
        </div>

        {/* Navigation bar */}
        <nav className="flex flex-col gap-2 px-4">
          {navItems.map((item) => {
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
    </>

  );
}
