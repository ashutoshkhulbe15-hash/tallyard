import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "btu-calculator";

export const metadata: Metadata = {
  title: "Room Air Conditioner Capacity Guide",
  description:
    "Estimate room air-conditioner capacity using the ENERGY STAR area guide and its stated adjustments. Not whole-home HVAC sizing.",
  alternates: { canonical: "/btu-calculator" },
  openGraph: {
    title: "Room Air Conditioner Capacity Guide",
    description: "Estimate room AC capacity using the ENERGY STAR area guide and stated adjustments.",
    url: "https://www.tallyard.com/btu-calculator",
    type: "website",
  },
};

export default function BtuCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="BTU/hr" />
    </>
  );
}
