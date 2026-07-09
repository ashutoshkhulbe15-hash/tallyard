import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "stair-calculator";

export const metadata: Metadata = {
  title: "Stair Calculator: Stringers, Rise & Run with Diagram",
  description:
    "Free stair calculator with diagram: steps, rise and run, stringer length and count for any staircase. IRC code compliant with a full parts breakdown. No signup.",
  alternates: { canonical: "/stair-calculator" },
  openGraph: {
    title: "Stair Calculator: Stringers, Rise & Run with Diagram",
    description:
      "Free stair calculator with diagram: steps, rise and run, and stringer length and count for any staircase. IRC code compliant.",
    url: "https://www.tallyard.com/stair-calculator",
    type: "website",
  },
};

export default function StairCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="14 RISERS" />
    </>
  );
}
