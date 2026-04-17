import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "wallpaper-calculator";

export const metadata: Metadata = {
  title: "Wallpaper Calculator — Rolls Needed For Any Room",
  description:
    "Calculate rolls of wallpaper for any room. Accounts for pattern repeat, roll coverage, windows, and doors.",
  alternates: { canonical: "/wallpaper-calculator" },
  openGraph: {
    title: "Wallpaper Calculator — Rolls Needed For Any Room",
    description: "Calculate wallpaper rolls with pattern repeat and opening subtractions.",
    url: "https://tallyard.com/wallpaper-calculator",
    type: "website",
  },
};

export default function WallpaperCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="9 ROLLS" />
    </>
  );
}
