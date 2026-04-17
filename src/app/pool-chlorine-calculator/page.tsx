import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "pool-chlorine-calculator";

export const metadata: Metadata = {
  title: "Pool Chlorine Calculator — Dose For Any Pool",
  description:
    "Calculate chlorine dose for any pool volume. Handles liquid, granular, trichlor, and dichlor products.",
  alternates: { canonical: "/pool-chlorine-calculator" },
  openGraph: {
    title: "Pool Chlorine Calculator — Dose For Any Pool",
    description: "Calculate chlorine dose for pool maintenance and shock.",
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
