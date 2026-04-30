import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "mortar-calculator";

export const metadata: Metadata = {
  title: "Mortar Calculator — Bags of Mortar Mix for Brick and Block Walls",
  description:
    "Calculate how many bags of mortar you need for brick, block, or stone walls. Accounts for joint width, brick size, and mortar type (S, N, M). Free, no signup.",
  alternates: { canonical: "/mortar-calculator" },
  openGraph: {
    title: "Mortar Calculator — Bags of Mortar Mix",
    description:
      "How many bags of mortar for your brick or block wall. Joint width math, waste factor, and cost estimate.",
    url: "https://www.tallyard.com/mortar-calculator",
    type: "website",
  },
};

export default function MortarCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="12 BAGS" />
    </>
  );
}
