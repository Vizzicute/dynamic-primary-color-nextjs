"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import ThemeToggle from "./theme-toggler";
import DynamicColorPicker from "./dynamic-color-picker";
import { useThemeColor } from "@/context/theme-color-provider";
import { useMounted } from "@/hooks/use-mounted";

const ThemeCustomizer = () => {
  const { theme } = useTheme();
  const { themeColor } = useThemeColor();
  const mounted = useMounted();
  
  if (!mounted) return null;

  return (
    <Popover modal={false}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="p-3 rounded-full">
          {theme === "dark" ? (
            <Moon className="size-4" />
          ) : (
            <Sun className="size-4" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col gap-3 p-2">
          <div className="flex items-center gap-1">
            <div
              className="size-8 rounded-full"
              style={{ backgroundColor: themeColor }}
            />
            <div className="gap-0 flex flex-col text-left">
              <h2 className="text-lg leading-tight text-left font-semibold">
                Theme Customizer
              </h2>
              <p className="text-[10px] text-gray-500">
                Customize your theme and colors
              </p>
            </div>
          </div>
          <ThemeToggle />
          <DynamicColorPicker />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeCustomizer;
