import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "drain-pipe-calculator";

export const metadata: Metadata = {
  title: "Drain Pipe Calculator",
  description:
    "Add an illustrative subset of IPC 2021 residential fixture-unit loads. This worksheet does not calculate drain or vent pipe sizes.",
  alternates: { canonical: "/drain-pipe-calculator" },
  openGraph: {
    title: "Drain Pipe Calculator",
    description: "Add illustrative IPC 2021 fixture-unit loads; not a pipe-sizing tool.",
    url: "https://www.tallyard.com/drain-pipe-calculator",
    type: "website",
  },
};

export default function DrainPipeCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="DFU" />
    </>
  );
}
