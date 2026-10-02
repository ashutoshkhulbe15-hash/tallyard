import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "snow-load-calculator";

export const metadata: Metadata = {
  title: "Snow Load Calculator",
  description:
    "Estimate the weight of a uniform snow and ice layer from depth and roof area. Does not determine roof capacity or safety.",
  alternates: { canonical: "/snow-load-calculator" },
  openGraph: {
    title: "Snow Load Calculator",
    description: "Estimate snow and ice weight; structural capacity is not calculated.",
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
