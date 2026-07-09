import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "shed-calculator";

export const metadata: Metadata = {
  title: "Shed Calculator: Material List, Cost & Lumber Estimate",
  description:
    "Free shed material calculator: lumber, sheathing, and shingles for any size. Full material list, cost breakdown, and how to build a 10x12 shed. No signup.",
  alternates: { canonical: "/shed-calculator" },
  openGraph: {
    title: "Shed Calculator: Material List, Cost & Lumber Estimate",
    description:
      "Free shed material calculator: lumber, sheathing, and shingles for any size. Full material list, cost breakdown, and how to build a 10x12 shed.",
    url: "https://www.tallyard.com/shed-calculator",
    type: "website",
  },
};

export default function ShedCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="80 FT²" />
    </>
  );
}
