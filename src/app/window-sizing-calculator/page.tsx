import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "window-sizing-calculator";

export const metadata: Metadata = {
  title: "Window Sizing Calculator — Egress, Light, And Rough Opening",
  description:
    "Calculate window size with IRC egress, natural light, and ventilation checks. Rough opening dimensions included.",
  alternates: { canonical: "/window-sizing-calculator" },
  openGraph: {
    title: "Window Sizing Calculator — Egress, Light, And Rough Opening",
    description: "Calculate window size with egress and light checks.",
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
