import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "water-heater-calculator";

export const metadata: Metadata = {
  title: "Water Heater Calculator",
  description: "Convert entered water flow and temperature rise to a theoretical heat-transfer rate; does not size or select equipment.",
  alternates: { canonical: "/water-heater-calculator" },
  openGraph: {
    title: "Water Heater Calculator",
    description: "Convert flow and temperature rise to a theoretical rate; no equipment selection.",
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
