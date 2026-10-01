import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "hardwood-flooring-cost-calculator";

export const metadata: Metadata = {
  title: "Hardwood Flooring Quote Worksheet",
  description: "Calculate a subtotal from measured area and rates copied from a current written quote; no market prices are assumed.",
  alternates: { canonical: "/hardwood-flooring-cost-calculator" },
  openGraph: {
    title: "Hardwood Flooring Quote Worksheet",
    description: "Quote arithmetic from user-entered scope and rates; no market-price estimate.",
    url: "https://www.tallyard.com/hardwood-flooring-cost-calculator",
    type: "website",
  },
};

export default function HardwoodFlooringCostCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="QUOTE INPUTS" />
    </>
  );
}
