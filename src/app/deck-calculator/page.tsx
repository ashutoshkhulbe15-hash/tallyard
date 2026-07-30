import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "deck-calculator";

export const metadata: Metadata = {
  title: "Deck Calculator: Boards, Joists, Framing & Cost",
  description:
    "Free deck calculator: boards, joists, beams, posts, and fasteners for any deck size, plus 2026 build cost by size and material. No signup.",
  alternates: { canonical: "/deck-calculator" },
  openGraph: {
    title: "Deck Calculator: Boards, Joists, Framing & Cost",
    description:
      "Free deck calculator: boards, joists, and framing for any deck, plus 2026 build cost by size and material. No signup.",
    url: "https://www.tallyard.com/deck-calculator",
    type: "website",
  },
};

export default function DeckCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="29 BOARDS" />
    </>
  );
}
