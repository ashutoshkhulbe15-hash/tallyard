import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "flooring-calculator";

export const metadata: Metadata = {
  title: "Flooring Package Calculator",
  description:
    "Estimate flooring packages from rectangular room area, exact package coverage, and a planning allowance you choose.",
  alternates: { canonical: "/flooring-calculator" },
  openGraph: {
    title: "Flooring Package Calculator",
    description: "Estimate flooring package count from area and product-label coverage; cost and installation are not included.",
    url: "https://www.tallyard.com/flooring-calculator",
    type: "website",
  },
};

export default function FlooringCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="BOXES" />
    </>
  );
}
