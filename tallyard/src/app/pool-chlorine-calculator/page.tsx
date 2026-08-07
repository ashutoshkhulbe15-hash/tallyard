import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "pool-chlorine-calculator";

export const metadata: Metadata = {
  title: "Pool Chlorine Calculator: How Much to Add",
  description:
    "Work out how much chlorine to add to your pool. Liquid, tablets, granular, and shock doses from your gallons and current ppm, using CDC MAHC target levels.",
  alternates: { canonical: "/pool-chlorine-calculator" },
  openGraph: {
    title: "Pool Chlorine Calculator: How Much to Add",
    description: "Chlorine dose for maintenance and shock, from volume and current ppm.",
    url: "https://www.tallyard.com/pool-chlorine-calculator",
    type: "website",
  },
};

export default function PoolChlorineCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="47 OZ" />
    </>
  );
}
