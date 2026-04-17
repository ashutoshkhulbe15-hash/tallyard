import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "attic-ventilation-calculator";

export const metadata: Metadata = {
  title: "Attic Ventilation Calculator — NFVA Intake And Exhaust",
  description:
    "Size attic venting with the 1:300 rule. Balanced intake and exhaust for ridge, gable, box, or power vents.",
  alternates: { canonical: "/attic-ventilation-calculator" },
  openGraph: {
    title: "Attic Ventilation Calculator — NFVA Intake And Exhaust",
    description: "Calculate attic ventilation with the 1:300 rule.",
    url: "https://tallyard.com/attic-ventilation-calculator",
    type: "website",
  },
};

export default function AtticVentilationCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="720 IN²" />
    </>
  );
}
