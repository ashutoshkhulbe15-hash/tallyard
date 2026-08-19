import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "chimney-calculator";

export const metadata: Metadata = {
  title: "Chimney Flue Size Calculator: Chart & Height",
  description:
    "Flue size for any fireplace or wood stove, with the chimney flue size chart, clay liner net areas, and the 3-2-10 height rule from the IRC.",
  alternates: { canonical: "/chimney-calculator" },
  openGraph: {
    title: "Chimney Flue Size Calculator: Chart & Height",
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
