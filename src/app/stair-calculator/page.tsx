import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "stair-calculator";

export const metadata: Metadata = {
  title: "Stair Calculator — Rise, Run, And Stringer Length",
  description:
    "Calculate risers, treads, stringer length, and total run for any stair. IRC-code compliant with comfort checks.",
  alternates: { canonical: "/stair-calculator" },
  openGraph: {
    title: "Stair Calculator — Rise, Run, And Stringer Length",
    description: "Calculate risers, treads, and stringer length for any staircase.",
    url: "https://tallyard.com/stair-calculator",
    type: "website",
  },
};

export default function StairCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="14 RISERS" />
    </>
  );
}
