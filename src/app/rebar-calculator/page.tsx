import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "rebar-calculator";

export const metadata: Metadata = {
  title: "Rebar Calculator: Size Chart, Spacing & Lap",
  description:
    "Bars, linear feet, and weight for any slab or footing. Includes the rebar size chart, slab-on-grade spacing, and the 40-diameter lap splice rule.",
  alternates: { canonical: "/rebar-calculator" },
  openGraph: {
    title: "Rebar Calculator: Size Chart, Spacing & Lap",
    description: "Calculate rebar for any slab with grid layout and perimeter ring.",
    url: "https://www.tallyard.com/rebar-calculator",
    type: "website",
  },
};

export default function RebarCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="480 LF" />
    </>
  );
}
