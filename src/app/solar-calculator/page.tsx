import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "solar-calculator";

export const metadata: Metadata = {
  title: "Solar Panel Calculator: How Many Panels & Cost by State",
  description:
    "Free solar panel calculator: how many panels you need from your kWh and sun hours, plus 2026 cost per watt by state and real output per panel. No signup.",
  alternates: { canonical: "/solar-calculator" },
  openGraph: {
    title: "Solar Panel Calculator: How Many Panels & Cost by State",
    description:
    "Free solar panel calculator: how many panels you need from your kWh and sun hours, plus 2026 cost per watt by state and real output per panel. No signup.",
    url: "https://www.tallyard.com/solar-calculator",
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
