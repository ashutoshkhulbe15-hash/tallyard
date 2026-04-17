import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "flooring-calculator";

export const metadata: Metadata = {
  title: "Flooring Calculator — Hardwood, Laminate, Vinyl",
  description:
    "Calculate boxes of hardwood, laminate, or luxury vinyl plank flooring for any room. Waste factor by pattern.",
  alternates: { canonical: "/flooring-calculator" },
  openGraph: {
    title: "Flooring Calculator — Hardwood, Laminate, Vinyl",
    description:
      "Calculate boxes of hardwood, laminate, or vinyl plank flooring for any room.",
    url: "https://tallyard.com/flooring-calculator",
    type: "website",
  },
};

export default function FlooringCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="10 BOXES" />
    </>
  );
}
