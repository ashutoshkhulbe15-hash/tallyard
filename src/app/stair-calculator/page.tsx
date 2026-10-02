import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "stair-calculator";

export const metadata: Metadata = {
  title: "Stair Calculator",
  description:
    "Estimate equalized riser count and geometric rise/run from selected dimensions. Not a code check or construction cut sheet.",
  alternates: { canonical: "/stair-calculator" },
  openGraph: {
    title: "Stair Calculator",
    description: "Simple rise and run geometry from user-selected inputs; no compliance verdict.",
    url: "https://www.tallyard.com/stair-calculator",
    type: "website",
  },
};

export default function StairCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="RISERS" />
    </>
  );
}
