"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/50 backdrop-blur-sm transition-all duration-300 hover:bg-accent/10 hover:scale-105"
        aria-label="Toggle theme"
      >
        <Sun className="h-5 w-5 text-foreground/60" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/50 backdrop-blur-sm transition-all duration-300 hover:bg-accent/10 hover:scale-105 group"
      aria-label={theme === "dark" ? "Passer en mode jour" : "Passer en mode nuit"}
    >
      {/* Sun icon (visible in light mode) */}
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0 text-[#F2AF1D] group-hover:text-[#EE6A22]" />

      {/* Moon icon (visible in dark mode) */}
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100 text-[#F2AF1D] group-hover:text-[#EE6A22]" />

      {/* Tooltip */}
      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100 pointer-events-none">
        {theme === "dark" ? "Mode jour" : "Mode nuit"}
      </span>
    </button>
  );
}
