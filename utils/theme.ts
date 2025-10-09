import { converter, differenceEuclidean, formatHex } from "culori";

const toOklch = converter("oklch");
const toRgb = converter("rgb");

export function generateColorScale(hex: string) {
  const base = toOklch(hex);
  if (!base) return {};

  const scale: Record<number, string> = {};
  const steps = [0.95, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05]; // brightness levels
  const keys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  keys.forEach((key, i) => {
    const l = steps[i]; // Lightness
    scale[key] = formatHex({ ...base, l });
  });

  return scale;
}

export function findColorShade(
  baseColor: string,
  scale: Record<number, string>
): number {
  const base = toRgb(baseColor);
  if (!base) return 500;

  const diff = differenceEuclidean("rgb");

  let closestShade = 500;
  let minDiff = Infinity;

  Object.entries(scale).forEach(([shade, color]) => {
    const rgb = toRgb(color);
    if (!rgb) return;

    const distance = diff(base, rgb);
    if (distance < minDiff) {
      minDiff = distance;
      closestShade = Number(shade);
    }
  });

  return closestShade;
}

export function inverseShade(shade: number): number {
  const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900];
  const index = shades.indexOf(shade);
  return shades[shades.length - 1 - index] ?? 500;
}

export function hexToOklch(hex: string): string {
  const color = toOklch(hex);
  if (!color) return "oklch(0.5 0.2 0)";

  const l = color.l.toFixed(3);
  const c = color.c.toFixed(3);
  const h = (color.h ?? 0).toFixed(3); // handle null hue

  return `oklch(${l} ${c} ${h})`;
}

export function rgbToHex(r: number, g: number, b: number): string {
  // Ensure each channel is within [0, 255]
  const clamp = (value: number) => Math.max(0, Math.min(255, value));

  const toHex = (value: number) => clamp(value).toString(16).padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}