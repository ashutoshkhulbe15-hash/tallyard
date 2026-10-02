import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "solar-calculator";

export const metadata: Metadata = {
  title: "Solar Panel Calculator",
  description: "Explore panel-count arithmetic from entered usage and assumptions; not a production forecast, site assessment, or system design.",
  alternates: { canonical: "/solar-calculator" },
  openGraph: {
    title: "Solar Panel Calculator",
    description: "Explore panel-count arithmetic from entered assumptions; not a site assessment or system design.",
    url: "https://www.tallyard.com/solar-calculator",
    type: "website",
  },
};

export default function SolarCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="SCENARIO ONLY" />
    </>
  );
}
