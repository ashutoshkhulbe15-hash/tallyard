import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "gutter-calculator";

export const metadata: Metadata = {
  title: "Gutter Calculator",
  description: "Sum measured gutter runs and apply a user-selected allowance; no drainage sizing or component takeoff.",
  alternates: { canonical: "/gutter-calculator" },
  openGraph: {
    title: "Gutter Calculator",
    description: "Measured run arithmetic only; no hydraulic sizing or drainage design.",
    url: "https://www.tallyard.com/gutter-calculator",
    type: "website",
  },
};

export default function GutterCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="RUN LENGTH" />
    </>
  );
}
