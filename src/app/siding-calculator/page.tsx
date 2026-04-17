import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "siding-calculator";

export const metadata: Metadata = {
  title: "Siding Calculator — Squares For Your House",
  description:
    "Calculate squares and linear feet of siding for any home. Accounts for gables, openings, and material type.",
  alternates: { canonical: "/siding-calculator" },
  openGraph: {
    title: "Siding Calculator — Squares For Your House",
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
      <CalculatorPage slug={SLUG} illustrationValue="20 SQ" />
    </>
  );
}
