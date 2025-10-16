"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col gap-1">
      <p className="text-[12px] text-semibold leading-tight">Theme Mode</p>
      <div className="flex gap-2">
        <button
          onClick={() => setTheme("light")}
          className={cn("flex items-center gap-2 px-3 py-1 rounded-sm border text-[12px]", theme === "light" && "border-2 border-foreground")}
        >
          <Sun className={cn("size-3", theme === "light" && "font-semibold")} />
          <span className={cn(theme === "light" && "font-semibold")}>Light</span>
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={cn("flex items-center gap-2 px-3 py-1 rounded-sm border text-[12px]", theme === "dark" && "border-2 border-foreground")}
        >
          <Moon className={cn("size-3", theme === "dark" && "font-semibold")} />
          <span className={cn(theme === "dark" && "font-semibold")}>Dark</span>
        </button>
      </div>
    </div>
  );
}
