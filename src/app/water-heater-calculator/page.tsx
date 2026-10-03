import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "water-heater-calculator";

export const metadata: Metadata = {
  title: "Water Heater Size Calculator: Gallons or GPM",
  description:
    "Water heater size from household demand: first hour rating for tanks, temperature rise for tankless. Covers 40 vs 50 gallon, venting, and expansion tanks.",
  alternates: { canonical: "/water-heater-calculator" },
  openGraph: {
    title: "Water Heater Size Calculator: Gallons or GPM",
    description: "Calculate water heater size for any household.",
    url: "https://www.tallyard.com/water-heater-calculator",
    type: "website",
  },
};

export default function WaterHeaterCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="FLOW × ΔT" />
    </>
  );
}
