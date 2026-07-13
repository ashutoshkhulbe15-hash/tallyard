import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "lumber-calculator";

export const metadata: Metadata = {
  title: "Board Foot & Lumber Calculator: Cost + Weight",
  description:
    "Free board foot calculator: board feet, linear feet, weight, and cost for any lumber. Nominal sizes, conversions, and species guide. No signup.",
  alternates: { canonical: "/lumber-calculator" },
  openGraph: {
    title: "Board Foot & Lumber Calculator: Cost + Weight",
    description:
      "Free board foot and lumber calculator: board feet, linear feet, weight, and cost for any board. Plus conversions. No signup.",
    url: "https://www.tallyard.com/lumber-calculator",
    type: "website",
  },
};

export default function LumberCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="267 BF" />
    </>
  );
}
