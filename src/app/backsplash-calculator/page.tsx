import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "backsplash-calculator";

export const metadata: Metadata = {
  title: "Backsplash Calculator: Tile Square Feet by Run",
  description:
    "Backsplash tile from counter linear feet and height. Covers the 18 inch standard, range walls, outlets, zellige waste, and peel and stick options.",
  alternates: { canonical: "/backsplash-calculator" },
  openGraph: {
    title: "Backsplash Calculator: Tile Square Feet by Run",
    description: "Calculate backsplash tile with outlet and window subtractions.",
    url: "https://www.tallyard.com/backsplash-calculator",
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
