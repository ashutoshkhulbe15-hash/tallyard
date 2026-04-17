import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "heat-pump-calculator";

export const metadata: Metadata = {
  title: "Heat Pump Calculator — Size In Tons",
  description:
    "Right-size a heat pump for your home. Accounts for climate, insulation, and both heating and cooling loads.",
  alternates: { canonical: "/heat-pump-calculator" },
  openGraph: {
    title: "Heat Pump Calculator — Size In Tons",
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
