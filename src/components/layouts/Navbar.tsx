"use client";

import { Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/applications": "Applications",
  "/interviews": "Interviews",
  "/resume": "Resume",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

type NavbarProps = {
  onMenuClick: () => void,
}

function Navbar({ onMenuClick }: NavbarProps) {
  const pathname = usePathname();
  const currentTitle = pageTitles[pathname] || "Dashboard";

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white dark:bg-slate-900 px-6 py-4">
      {/* Left Side*/}
      <div className="flex items-start gap-3">
        <Button onClick={onMenuClick}
          variant="outline"
          size="icon"
          className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden">
          <Menu size={20} />
        </Button>
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
            {currentTitle}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 hidden md:block">
            Track your job applications and interviews easily
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-semibold text-white">
          K
        </div>
      </div>
    </header>
  );
}

export default Navbar;
