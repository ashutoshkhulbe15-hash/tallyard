import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "pool-chlorine-calculator";

export const metadata: Metadata = {
  title: "Pool Chlorine Mass Estimator",
  description:
    "Estimate theoretical available-chlorine and product mass from measured free chlorine, a user-entered target, and label strength. Not a dosing recommendation.",
  alternates: { canonical: "/pool-chlorine-calculator" },
  openGraph: {
    title: "Pool Chlorine Mass Estimator",
    description: "Mass-balance estimate only; use measured values and follow the exact product label.",
    url: "https://www.tallyard.com/pool-chlorine-calculator",
    type: "website",
  },
};

export default function PoolChlorineCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="MASS" />
    </>
  );
}
