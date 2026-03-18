import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function statusLabel(status: string): string {
  return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function budgetLabel(band: string | null | undefined): string {
  if (!band) return "—";
  const map: Record<string, string> = {
    UNDER_50K: "Under R50k",
    BAND_50_100K: "R50k – R100k",
    BAND_100_200K: "R100k – R200k",
    BAND_200_500K: "R200k – R500k",
    OVER_500K: "R500k+",
  };
  return map[band] ?? band;
}
