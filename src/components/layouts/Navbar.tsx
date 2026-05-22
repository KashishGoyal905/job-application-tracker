"use client";

import { Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";

function Navbar() {

  const pathname = usePathname();

  const pageTitles: Record<string, string> = {
    "/": "Dashboard",
    "/applications": "Applications",
    "/interviews": "Interviews",
    "/resume": "Resume",
    "/analytics": "Analytics",
  }

  const currentTitle = pageTitles[pathname] || "Dashboard";
  return (
    <header className="flex items-center justify-between border-b bg-white dark:bg-slate-900 px-6 py-4">
      {/* Left Side*/}
      <div>
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
          {currentTitle}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Track you job application easily
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-lg border bg-slate-100 dark:bg-slate-800 px-3 py-2">
          <Search size={18} className="text-slate-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm outline-none"
          />
        </div>
        <ThemeToggle />
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-semibold text-white">
          K
        </div>
      </div>
    </header>
  );
}

export default Navbar;
