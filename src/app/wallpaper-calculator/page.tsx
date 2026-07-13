import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "wallpaper-calculator";

export const metadata: Metadata = {
  title: "Wallpaper Calculator: Rolls, Repeat & Measuring",
  description:
    "Free wallpaper calculator: rolls needed for any room with pattern repeat, roll size, and openings. Plus how to measure a wall. No signup.",
  alternates: { canonical: "/wallpaper-calculator" },
  openGraph: {
    title: "Wallpaper Calculator: Rolls, Repeat & Measuring",
    description:
      "Free wallpaper calculator: rolls for any room with pattern repeat and openings, plus how to measure a wall. No signup.",
    url: "https://www.tallyard.com/wallpaper-calculator",
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
