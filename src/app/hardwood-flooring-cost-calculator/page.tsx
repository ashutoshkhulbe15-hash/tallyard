import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "hardwood-flooring-cost-calculator";

export const metadata: Metadata = {
  title: "Hardwood Flooring Cost Calculator: Price by Species",
  description:
    "Free hardwood flooring cost calculator: installed price per square foot by species, solid or engineered, prefinished or site-finished, with labor itemized. No signup.",
  alternates: { canonical: "/hardwood-flooring-cost-calculator" },
  openGraph: {
    title: "Hardwood Flooring Cost Calculator: Price by Species",
    description:
      "Free hardwood flooring cost calculator: installed price by species, construction, and finish, with labor itemized. No signup.",
    url: "https://www.tallyard.com/hardwood-flooring-cost-calculator",
    type: "website",
  },
};

export default function HardwoodFlooringCostCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="$14.70/ft²" />
    </>
  );
}
