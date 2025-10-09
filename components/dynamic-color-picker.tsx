"use client";

import { Input } from "./ui/input";
import { useThemeColor } from "@/context/theme-color-provider";
import { findColorShade, generateColorScale } from "@/utils/theme";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { Palette } from "lucide-react";

const presetColors = [
  { name: "Neutral", color: "#525252" },
  { name: "Slate", color: "#475569" },
  { name: "Zinc", color: "#52525b" },
  { name: "Emerald", color: "#059669" },
  { name: "Lime", color: "#65a30d" },
  { name: "Amber", color: "#d97706" },
  { name: "Cyan", color: "#0891b2" },
  { name: "Indigo", color: "#4f46e5" },
  { name: "Fuchsia", color: "#c026d3" },
];

export default function DynamicColorPicker() {
  const { themeColor, setThemeColor } = useThemeColor();

  const themeColorScale = generateColorScale(themeColor);
  const themeColorShade = findColorShade(themeColor, themeColorScale);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleCounterColorButtonClick = () => {
    inputRef.current?.click();
  };

  const handleCounterColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThemeColor(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-semibold leading-tight">Preset Theme Colors</p>
        <div className="grid grid-cols-3 gap-1">
          {presetColors.map((c, index) => {
            const colorScale = generateColorScale(c.color);
            const colorShade = findColorShade(c.color, colorScale);
            return (
              <button
                key={index}
                onClick={() => setThemeColor(c.color)}
                className="flex items-center gap-1 px-2 py-1 rounded-sm border text-[12px]"
              >
                <div
                  style={{ backgroundColor: c.color }}
                  className="size-4 rounded-full"
                />
                <span
                  className={cn(
                    themeColorScale[themeColorShade] ===
                      colorScale[colorShade] && "font-semibold"
                  )}
                >
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-semibold leading-tight">Theme Color Counter</p>
        <div className="flex flex-row gap-2">
          <button
            onClick={handleCounterColorButtonClick}
            className="flex items-center p-2 rounded-sm border text-[12px]"
          >
            <Palette className="size-5" />
          </button>
          <input
            type="color"
            ref={inputRef}
            onChange={handleCounterColorChange}
            className="w-[1px] opacity-0"
          />

          <Input
            type="text"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
            className="border rounded-sm p-1 w-32 text-center"
          />
        </div>
      </div>
    </>
  );
}
