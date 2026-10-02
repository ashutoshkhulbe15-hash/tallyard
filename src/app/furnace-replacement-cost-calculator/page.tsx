import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "furnace-replacement-cost-calculator";

export const metadata: Metadata = {
  title: "Furnace Replacement Cost Calculator",
  description: "Add line items from an itemized furnace-replacement quote; no equipment sizing or current-price estimate.",
  alternates: { canonical: "/furnace-replacement-cost-calculator" },
  openGraph: {
    title: "Furnace Replacement Cost Calculator",
    description: "Quote arithmetic only; no equipment sizing, repair advice, or market prices.",
    url: "https://www.tallyard.com/furnace-replacement-cost-calculator",
    type: "website",
  },
};

export default function FurnaceReplacementCostCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="QUOTE INPUTS" />
    </>
  );
}
