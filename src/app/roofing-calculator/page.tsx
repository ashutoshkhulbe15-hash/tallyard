import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "roofing-calculator";

export const metadata: Metadata = {
  title: "Roofing Calculator: Squares, Pitch & Bundles",
  description:
    "Roofing squares and shingle bundles from footprint and pitch. Covers pitch multipliers, waste by roof shape, metal panels, and roof replacement cost.",
  alternates: { canonical: "/roofing-calculator" },
  openGraph: {
    title: "Roofing Calculator: Squares, Pitch & Bundles",
    description:
      "Calculate roof area, squares, and shingle bundles for any pitch and footprint.",
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
