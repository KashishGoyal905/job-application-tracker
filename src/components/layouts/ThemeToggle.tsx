"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDarkTheme = theme === "dark";
  function toggleTheme() {
    setTheme(isDarkTheme ? "light" : "dark");
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-full border bg-white dark:bg-slate-800 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-700"
    >
      {isDarkTheme ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export default ThemeToggle;
