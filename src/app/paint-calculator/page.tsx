import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "paint-calculator";

export const metadata: Metadata = {
  title: "Paint Calculator — How Much Paint Do I Need",
  description:
    "Calculate how many gallons of paint you need for any room. Free, no signup. Shows the math and accounts for doors and windows.",
  alternates: {
    canonical: "/paint-calculator",
  },
  openGraph: {
    title: "Paint Calculator — How Much Paint Do I Need",
    description:
      "Calculate how many gallons of paint you need for any room. Shows the math.",
    url: "https://tallyard.com/paint-calculator",
    type: "website",
  },
};

export default function PaintCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} />
    </>
  );
}
