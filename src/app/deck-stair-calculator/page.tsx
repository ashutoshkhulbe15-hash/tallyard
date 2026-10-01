import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "deck-stair-calculator";

export const metadata: Metadata = {
  title: "Stair Geometry Calculator",
  description:
    "Explore equal-rise stair geometry from total rise and user-selected dimensions. Not a code check, stringer layout, or construction plan.",
  alternates: { canonical: "/deck-stair-calculator" },
  openGraph: {
    title: "Stair Geometry Calculator",
    description: "Explore equal-rise stair geometry. Not a code check or construction plan.",
    url: "https://www.tallyard.com/deck-stair-calculator",
    type: "website",
  },
};

export default function DeckStairCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="GEOMETRY" />
    </>
  );
}
