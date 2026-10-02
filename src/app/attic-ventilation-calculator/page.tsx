import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "attic-ventilation-calculator";

export const metadata: Metadata = {
  title: "Attic Ventilation Calculator",
  description:
    "Illustrative area-ratio arithmetic only. Does not calculate net-free area or design a ventilation system.",
  alternates: { canonical: "/attic-ventilation-calculator" },
  openGraph: {
    title: "Attic Ventilation Calculator",
    description: "Explore a user-selected area-ratio scenario; not ventilation design.",
    url: "https://www.tallyard.com/attic-ventilation-calculator",
    type: "website",
  },
};

export default function AtticVentilationCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="SCENARIO" />
    </>
  );
}
