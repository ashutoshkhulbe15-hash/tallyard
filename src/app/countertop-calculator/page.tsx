import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "countertop-calculator";

export const metadata: Metadata = {
  title: "Countertop Calculator — Square Feet For Kitchen Or Bath",
  description:
    "Calculate countertop square feet and linear feet for kitchens and bathrooms. Includes island and material cost estimates.",
  alternates: { canonical: "/countertop-calculator" },
  openGraph: {
    title: "Countertop Calculator — Square Feet For Kitchen Or Bath",
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
