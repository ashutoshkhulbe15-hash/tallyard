import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "snow-load-calculator";

export const metadata: Metadata = {
  title: "Snow Load Calculator: Roof Snow Weight by Depth",
  description:
    "Snow weight per square foot from depth and snow type, compared against your roof design load. Covers ground vs roof snow load and ASCE 7 conversion.",
  alternates: { canonical: "/snow-load-calculator" },
  openGraph: {
    title: "Snow Load Calculator: Roof Snow Weight by Depth",
    description: "Calculate roof snow load and compare to design capacity.",
    url: "https://www.tallyard.com/snow-load-calculator",
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
