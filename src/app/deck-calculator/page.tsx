import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "deck-calculator";

export const metadata: Metadata = {
  title: "Deck Calculator",
  description:
    "Estimate deck surface area and a rough decking-board quantity for a simple rectangular deck. Not a structural design tool.",
  alternates: { canonical: "/deck-calculator" },
  openGraph: {
    title: "Deck Calculator",
    description: "Estimate deck surface area and rough decking-board quantity for a simple rectangle.",
    url: "https://www.tallyard.com/deck-calculator",
    type: "website",
  },
};

export default function DeckCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="BOARDS" />
    </>
  );
}
