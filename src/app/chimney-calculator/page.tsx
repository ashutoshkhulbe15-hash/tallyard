import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "chimney-calculator";

export const metadata: Metadata = {
  title: "Chimney Calculator — Flue Size For Any Fireplace Or Stove",
  description:
    "Calculate flue size for fireplaces and wood stoves. Uses the 1/10 rule for masonry and manufacturer sizing for stoves.",
  alternates: { canonical: "/chimney-calculator" },
  openGraph: {
    title: "Chimney Calculator — Flue Size For Any Fireplace Or Stove",
    description: "Calculate flue size for fireplaces and wood stoves.",
    url: "https://www.tallyard.com/chimney-calculator",
    type: "website",
  },
};

export default function ChimneyCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="112 IN²" />
    </>
  );
}
