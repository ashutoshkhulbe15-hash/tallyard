import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "siding-calculator";

export const metadata: Metadata = {
  title: "Siding Area Worksheet",
  description: "Estimate area from measured net wall surfaces and a user-selected allowance; no product, trim, cost, or installation takeoff.",
  alternates: { canonical: "/siding-calculator" },
  openGraph: {
    title: "Siding Area Worksheet",
    description: "Measured wall-area arithmetic only; no package or trim quantities.",
    url: "https://www.tallyard.com/siding-calculator",
    type: "website",
  },
};

export default function SidingCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="AREA ONLY" />
    </>
  );
}
