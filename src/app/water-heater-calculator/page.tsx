import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "water-heater-calculator";

export const metadata: Metadata = {
  title: "Water Heater Calculator — Tank Size Or Tankless GPM",
  description:
    "Right-size a tank or tankless water heater. Based on household size, bathrooms, and peak-hour demand.",
  alternates: { canonical: "/water-heater-calculator" },
  openGraph: {
    title: "Water Heater Calculator — Tank Size Or Tankless GPM",
    description: "Calculate water heater size for any household.",
    url: "https://tallyard.com/water-heater-calculator",
    type: "website",
  },
};

export default function WaterHeaterCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="50 GAL" />
    </>
  );
}
