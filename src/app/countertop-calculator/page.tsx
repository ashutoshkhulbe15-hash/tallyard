import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "countertop-calculator";

export const metadata: Metadata = {
  title: "Countertop Calculator: Sq Ft & Cost by Material",
  description:
    "Measure countertop square footage the way fabricators do, then compare installed cost: granite vs quartz, laminate, butcher block, and quartzite.",
  alternates: { canonical: "/countertop-calculator" },
  openGraph: {
    title: "Countertop Calculator: Sq Ft & Cost by Material",
    description: "Calculate countertop square feet with island and cost estimates.",
    url: "https://www.tallyard.com/countertop-calculator",
    type: "website",
  },
};

export default function CountertopCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="42 FT²" />
    </>
  );
}
