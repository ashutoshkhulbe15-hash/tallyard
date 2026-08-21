import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "attic-ventilation-calculator";

export const metadata: Metadata = {
  title: "Attic Ventilation Calculator: 1:300 Rule & NFA",
  description:
    "Attic vent area from floor size using the IRC 1:300 rule, split into intake and exhaust. Covers net free area, soffit baffles, and mixing vent types.",
  alternates: { canonical: "/attic-ventilation-calculator" },
  openGraph: {
    title: "Attic Ventilation Calculator: 1:300 Rule & NFA",
    description: "Calculate attic ventilation with the 1:300 rule.",
    url: "https://www.tallyard.com/attic-ventilation-calculator",
    type: "website",
  },
};

export default function AtticVentilationCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="720 IN²" />
    </>
  );
}
