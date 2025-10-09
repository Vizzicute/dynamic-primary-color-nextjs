"use client";

import { useMounted } from "@/hooks/use-mounted";
import {
  findColorShade,
  generateColorScale,
  hexToOklch,
  inverseShade,
} from "@/utils/theme";
import { useTheme } from "next-themes";
import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeColorContextType = {
  themeColor: string;
  setThemeColor: React.Dispatch<React.SetStateAction<string>>;
};

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(
  undefined
);

export const useThemeColor = () => {
  const context = useContext(ThemeColorContext);
  if (!context) {
    throw new Error("useThemeColor must be used within a ThemeColorProvider");
  }
  return context;
};

export const ThemeColorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [themeColor, setThemeColor] = useState("#3b82f6");
  const mounted = useMounted();
  const { theme } = useTheme();

  const applyThemeColors = (color: string, mode: string) => {
    const colorScale = generateColorScale(color);
    const baseColorShade = findColorShade(color, colorScale);
    const inverseColorShade = inverseShade(baseColorShade);

    const oklchColor = hexToOklch(colorScale[baseColorShade]);
    const oklchInverseColor = hexToOklch(colorScale[inverseColorShade]);

    let primaryForeground =
      baseColorShade > 350
        ? hexToOklch(colorScale[50])
        : hexToOklch(colorScale[950]);
    let primaryColor = oklchColor;

    if (
      (baseColorShade > 750 && mode === "dark") ||
      (baseColorShade < 250 && mode === "light")
    ) {
      primaryColor = oklchInverseColor;
      primaryForeground =
        inverseColorShade > 350
          ? hexToOklch("#ffffff")
          : hexToOklch(colorScale[950]);
    }

    document.documentElement.style.setProperty("--primary", primaryColor);
    document.documentElement.style.setProperty(
      "--primary-foreground",
      primaryForeground
    );
  };

  useEffect(() => {
    if (!mounted || !theme) return;

    const timeout = setTimeout(() => {
      applyThemeColors(themeColor, theme || "light");
      localStorage.setItem("userPrimaryColor", themeColor);
    }, 150);

    return () => clearTimeout(timeout);
  }, [themeColor, mounted, theme]);

  useEffect(() => {
    const saved = localStorage.getItem("userPrimaryColor");
    if (saved) setThemeColor(saved);
  }, []);

  return (
    <ThemeColorContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeColorContext.Provider>
  );
};
