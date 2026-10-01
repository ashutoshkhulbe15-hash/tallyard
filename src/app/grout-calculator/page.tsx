import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "grout-calculator";

export const metadata: Metadata = {
  title: "Grout Package Estimator: Use Exact Product Coverage",
  description:
    "Estimate grout packages from measured tiled area and coverage for the exact product and package. Does not calculate joint yield or select grout type.",
  alternates: { canonical: "/grout-calculator" },
  openGraph: {
    title: "Grout Package Estimator",
    description:
      "Estimate grout packages using measured area and exact product coverage.",
    url: "https://www.tallyard.com/grout-calculator",
    type: "website",
  },
};

export default function GroutCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="BAGS" />
    </>
  );
}
