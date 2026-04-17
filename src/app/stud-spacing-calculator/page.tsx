import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "stud-spacing-calculator";

export const metadata: Metadata = {
  title: "Stud Spacing Calculator — Studs For Any Wall",
  description:
    "Calculate studs for any wall including headers, jacks, kings, and cripples for openings. IRC-compliant.",
  alternates: { canonical: "/stud-spacing-calculator" },
  openGraph: {
    title: "Stud Spacing Calculator — Studs For Any Wall",
    description: "Calculate studs with openings for any framed wall.",
    url: "https://tallyard.com/stud-spacing-calculator",
    type: "website",
  },
};

export default function StudSpacingCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="42 STUDS" />
    </>
  );
}
