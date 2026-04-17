import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "solar-calculator";

export const metadata: Metadata = {
  title: "Solar Panel Calculator — How Many Panels Do I Need",
  description:
    "Calculate solar panel count and system size for your electricity use. Adjusts for sun hours, panel watts, and system efficiency.",
  alternates: { canonical: "/solar-calculator" },
  openGraph: {
    title: "Solar Panel Calculator — How Many Panels Do I Need",
    description:
      "Calculate solar panel count and system size for your electricity use.",
    url: "https://tallyard.com/solar-calculator",
    type: "website",
  },
};

export default function SolarCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="17 PANELS" />
    </>
  );
}
