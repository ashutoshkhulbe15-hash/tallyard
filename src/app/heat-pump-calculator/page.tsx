import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "heat-pump-calculator";

export const metadata: Metadata = {
  title: "Heating and Cooling Load Conversion Worksheet",
  description: "Convert user-provided heating and cooling loads to ton-equivalent arithmetic; does not calculate loads or select equipment.",
  alternates: { canonical: "/heat-pump-calculator" },
  openGraph: {
    title: "Heating and Cooling Load Conversion Worksheet",
    description: "Convert documented loads to ton-equivalent arithmetic; no equipment selection.",
    url: "https://www.tallyard.com/heat-pump-calculator",
    type: "website",
  },
};

export default function HeatPumpCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="LOAD ÷ 12,000" />
    </>
  );
}
