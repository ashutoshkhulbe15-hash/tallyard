import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "gutter-calculator";

export const metadata: Metadata = {
  title: "Gutter Calculator: Size, Downspouts & Cost Estimate",
  description:
    "Free gutter calculator: linear feet, downspouts, and 5-inch vs 6-inch sizing for any roof. Includes slope, material costs, and how to measure. No signup.",
  alternates: { canonical: "/gutter-calculator" },
  openGraph: {
    title: "Gutter Calculator: Size, Downspouts & Cost Estimate",
    description:
      "Free gutter calculator: linear feet, downspouts, and 5-inch vs 6-inch sizing for any roof. Includes slope, material costs, and how to measure.",
    url: "https://www.tallyard.com/gutter-calculator",
    type: "website",
  },
};

export default function GutterCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="168 LF" />
    </>
  );
}
