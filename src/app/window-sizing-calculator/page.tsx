import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "window-sizing-calculator";

export const metadata: Metadata = {
  title: "Window Rectangle Area Calculator",
  description:
    "Calculate area from entered rectangular dimensions only. Does not determine egress, glazing, rough opening, or code compliance.",
  alternates: { canonical: "/window-sizing-calculator" },
  openGraph: {
    title: "Window Rectangle Area Calculator",
    description: "Rectangular area arithmetic from user-entered window dimensions only.",
    url: "https://www.tallyard.com/window-sizing-calculator",
    type: "website",
  },
};

export default function WindowSizingCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="AREA" />
    </>
  );
}
