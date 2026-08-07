import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "drain-pipe-calculator";

export const metadata: Metadata = {
  title: "Drain Pipe Size Calculator: DFU Chart & Slope",
  description:
    "Size any drain line with the IPC DFU chart. Fixture unit values, pipe capacity tables, and the 1/4 inch per foot slope rule, all in one calculator.",
  alternates: { canonical: "/drain-pipe-calculator" },
  openGraph: {
    title: "Drain Pipe Size Calculator: DFU Chart & Slope",
    description: "Calculate drain pipe size for any bathroom or kitchen.",
    url: "https://www.tallyard.com/drain-pipe-calculator",
    type: "website",
  },
};

export default function DrainPipeCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue={`3"`} />
    </>
  );
}
