import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "window-sizing-calculator";

export const metadata: Metadata = {
  title: "Window Size Calculator: Egress, Rough Opening & Measuring",
  description:
    "Free window calculator: egress size, rough opening, and light and vent minimums to code. Plus how to measure a window for replacement. No signup.",
  alternates: { canonical: "/window-sizing-calculator" },
  openGraph: {
    title: "Window Size Calculator: Egress, Rough Opening & Measuring",
    description:
      "Free window calculator: egress size, rough opening, and code minimums. Plus how to measure a window for replacement.",
    url: "https://www.tallyard.com/window-sizing-calculator",
    type: "website",
  },
};

export default function WindowSizingCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="12 FT²" />
    </>
  );
}
