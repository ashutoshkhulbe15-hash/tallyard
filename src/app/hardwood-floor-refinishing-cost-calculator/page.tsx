import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "hardwood-floor-refinishing-cost-calculator";

export const metadata: Metadata = {
  title: "Hardwood Floor Refinishing Cost Calculator",
  description: "Calculate a subtotal from area, rate, and extras copied from a written refinishing quote; no market prices are assumed.",
  alternates: { canonical: "/hardwood-floor-refinishing-cost-calculator" },
  openGraph: {
    title: "Hardwood Floor Refinishing Cost Calculator",
    description: "Quote arithmetic from user-entered scope and rates; no market-price or repair recommendation.",
    url: "https://www.tallyard.com/hardwood-floor-refinishing-cost-calculator",
    type: "website",
  },
};

export default function FloorRefinishingCostCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="QUOTE INPUTS" />
    </>
  );
}
