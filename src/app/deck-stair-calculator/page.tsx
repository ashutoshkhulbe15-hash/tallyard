import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "deck-stair-calculator";

export const metadata: Metadata = {
  title: "Deck Stair Calculator: Stringer Layout, Code & Cost",
  description:
    "Free deck stair calculator: riser height, tread run, stringer length and board counts, checked against IRC R311.7, with a printable dimensioned cut sheet. No signup.",
  alternates: { canonical: "/deck-stair-calculator" },
  openGraph: {
    title: "Deck Stair Calculator: Stringer Layout, Code & Cost",
    description:
      "Free deck stair calculator with a printable stringer cut sheet and IRC R311.7 pass/fail checks. No signup.",
    url: "https://www.tallyard.com/deck-stair-calculator",
    type: "website",
  },
};

export default function DeckStairCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue={'6-7/8"'} />
    </>
  );
}
