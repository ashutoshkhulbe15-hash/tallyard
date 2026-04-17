import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "backsplash-calculator";

export const metadata: Metadata = {
  title: "Backsplash Calculator — Kitchen Tile Count",
  description:
    "Calculate tiles and boxes for a kitchen backsplash. Handles subway, mosaic, and large-format tile with outlet and window cutouts.",
  alternates: { canonical: "/backsplash-calculator" },
  openGraph: {
    title: "Backsplash Calculator — Kitchen Tile Count",
    description: "Calculate backsplash tile with outlet and window subtractions.",
    url: "https://tallyard.com/backsplash-calculator",
    type: "website",
  },
};

export default function BacksplashCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="278 TILES" />
    </>
  );
}
