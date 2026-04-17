import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "snow-load-calculator";

export const metadata: Metadata = {
  title: "Snow Load Calculator — Roof Weight In PSF",
  description:
    "Calculate roof snow load in psf. Compares actual load to design capacity and flags over-limit conditions.",
  alternates: { canonical: "/snow-load-calculator" },
  openGraph: {
    title: "Snow Load Calculator — Roof Weight In PSF",
    description: "Calculate roof snow load and compare to design capacity.",
    url: "https://tallyard.com/snow-load-calculator",
    type: "website",
  },
};

export default function SnowLoadCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="22 PSF" />
    </>
  );
}
