import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "garage-door-calculator";

export const metadata: Metadata = {
  title: "Garage Door Size Calculator: Sizes & Clearances",
  description:
    "Standard garage door sizes with headroom, side room, and backroom clearances checked. Includes door weight, header spans, opener HP, and 2026 costs.",
  alternates: { canonical: "/garage-door-calculator" },
  openGraph: {
    title: "Garage Door Size Calculator: Sizes & Clearances",
    description: "Calculate garage door size, clearances, and opener HP.",
    url: "https://www.tallyard.com/garage-door-calculator",
    type: "website",
  },
};

export default function GarageDoorCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="16 × 7 FT" />
    </>
  );
}
