import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "flooring-calculator";

export const metadata: Metadata = {
  title: "Flooring Calculator: Square Footage, Cost & Waste",
  description:
    "Free flooring calculator: how to figure square footage for any room, plus waste factor and cost by material for hardwood, laminate, vinyl, and tile. No signup.",
  alternates: { canonical: "/flooring-calculator" },
  openGraph: {
    title: "Flooring Calculator: Square Footage, Cost & Waste",
    description:
      "Free flooring calculator: figure square footage, waste factor, and cost by material for hardwood, laminate, vinyl, and tile.",
    url: "https://www.tallyard.com/flooring-calculator",
    type: "website",
  },
};

export default function FlooringCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="10 BOXES" />
    </>
  );
}
