import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "rebar-calculator";

export const metadata: Metadata = {
  title: "Rebar Calculator — Lineal Feet And Sticks",
  description:
    "Calculate rebar lineal feet, 20-ft sticks, and total weight for any concrete slab. Grid spacing with optional perimeter ring.",
  alternates: { canonical: "/rebar-calculator" },
  openGraph: {
    title: "Rebar Calculator — Lineal Feet And Sticks",
    description: "Calculate rebar for any slab with grid layout and perimeter ring.",
    url: "https://tallyard.com/rebar-calculator",
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
