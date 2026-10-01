import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "roofing-calculator";

export const metadata: Metadata = {
  title: "Roof Surface Area Calculator",
  description:
    "Estimate planar roof surface area from a rectangular footprint and pitch. Does not calculate material quantities or roof suitability.",
  alternates: { canonical: "/roofing-calculator" },
  openGraph: {
    title: "Roof Surface Area Calculator",
    description: "Estimate planar roof surface area from a rectangular footprint and pitch.",
    url: "https://www.tallyard.com/roofing-calculator",
    type: "website",
  },
};

export default function RoofingCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="AREA" />
    </>
  );
}
