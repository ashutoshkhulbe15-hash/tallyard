import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "lumber-calculator";

export const metadata: Metadata = {
  title: "Lumber Calculator — Board Feet And Lineal Feet",
  description:
    "Calculate board feet and lineal feet for any lumber order. Handles all nominal sizes with waste factor.",
  alternates: { canonical: "/lumber-calculator" },
  openGraph: {
    title: "Lumber Calculator — Board Feet And Lineal Feet",
    description: "Calculate board feet for framing, decks, and any lumber project.",
    url: "https://tallyard.com/lumber-calculator",
    type: "website",
  },
};

export default function LumberCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="267 BF" />
    </>
  );
}
