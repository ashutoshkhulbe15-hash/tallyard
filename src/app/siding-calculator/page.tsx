import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "siding-calculator";

export const metadata: Metadata = {
  title: "Siding Calculator: Squares, Sheets & Cost",
  description:
    "Siding for any house in squares or sheets. Covers vinyl, fiber cement, T1-11, board and batten, and cedar, with exposure math and installed cost per foot.",
  alternates: { canonical: "/siding-calculator" },
  openGraph: {
    title: "Siding Calculator: Squares, Sheets & Cost",
    description: "Calculate siding squares and linear feet for any home.",
    url: "https://www.tallyard.com/siding-calculator",
    type: "website",
  },
};

export default function SidingCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="AREA ONLY" />
    </>
  );
}
