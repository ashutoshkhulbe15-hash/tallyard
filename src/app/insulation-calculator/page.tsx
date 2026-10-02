import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "insulation-calculator";

export const metadata: Metadata = {
  title: "Insulation Calculator",
  description: "Estimate package count from measured area, exact product-label coverage, and a user-selected allowance.",
  alternates: { canonical: "/insulation-calculator" },
  openGraph: {
    title: "Insulation Calculator",
    description: "Estimate packages using entered area and exact product-label coverage.",
    url: "https://www.tallyard.com/insulation-calculator",
    type: "website",
  },
};

export default function InsulationCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="AREA ÷ LABEL COVERAGE" />
    </>
  );
}
