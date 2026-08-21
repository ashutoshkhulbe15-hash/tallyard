import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "heat-pump-calculator";

export const metadata: Metadata = {
  title: "Heat Pump Sizing Calculator: Tons by Climate",
  description:
    "Heat pump size in tons from square footage, climate zone, and insulation. Covers SEER2 ratings, installation cost by size, and cold weather performance.",
  alternates: { canonical: "/heat-pump-calculator" },
  openGraph: {
    title: "Heat Pump Sizing Calculator: Tons by Climate",
    description: "Calculate heat pump size for heating and cooling.",
    url: "https://www.tallyard.com/heat-pump-calculator",
    type: "website",
  },
};

export default function HeatPumpCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="4 TONS" />
    </>
  );
}
