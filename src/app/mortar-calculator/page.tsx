import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "mortar-calculator";

export const metadata: Metadata = {
  title: "Mortar Calculator: Bags for Brick and Block",
  description:
    "Bags of mortar from brick or block count and joint width. Covers ASTM Type N, S, M, and O, mix proportions, and why thinset is a different product.",
  alternates: { canonical: "/mortar-calculator" },
  openGraph: {
    title: "Mortar Calculator: Bags for Brick and Block",
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
      <CalculatorPage slug={SLUG} illustrationValue="BAGS" />
    </>
  );
}
