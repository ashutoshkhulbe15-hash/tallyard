import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "vanity-calculator";

export const metadata: Metadata = {
  title: "Vanity Wall-Width Worksheet",
  description: "Calculate remaining wall width after user-entered clearances; no product recommendation or code check.",
  alternates: { canonical: "/vanity-calculator" },
  openGraph: {
    title: "Vanity Wall-Width Worksheet",
    description: "Dimension arithmetic only; does not assess fixture suitability or compliance.",
    url: "https://www.tallyard.com/vanity-calculator",
    type: "website",
  },
};

export default function VanityCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="WIDTH ONLY" />
    </>
  );
}
