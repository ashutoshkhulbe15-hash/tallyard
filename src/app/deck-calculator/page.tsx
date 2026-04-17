import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "deck-calculator";

export const metadata: Metadata = {
  title: "Deck Calculator — Boards, Joists, And Fasteners",
  description:
    "Calculate deck boards, joists, beams, posts, and fasteners for any deck size. Accounts for joist spacing and board width.",
  alternates: { canonical: "/deck-calculator" },
  openGraph: {
    title: "Deck Calculator — Boards, Joists, And Fasteners",
    description:
      "Calculate deck boards, joists, and all framing materials for any deck.",
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
