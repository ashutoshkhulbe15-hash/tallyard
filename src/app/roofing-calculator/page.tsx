import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "roofing-calculator";

export const metadata: Metadata = {
  title: "Roofing Calculator — How Many Bundles Of Shingles",
  description:
    "Calculate roof area, squares, and shingle bundles for any pitch. Includes waste factor and ridge caps.",
  alternates: { canonical: "/roofing-calculator" },
  openGraph: {
    title: "Roofing Calculator — How Many Bundles Of Shingles",
    description:
      "Calculate roof area, squares, and shingle bundles for any pitch and footprint.",
    url: "https://www.tallyard.com/roofing-calculator",
    type: "website",
  },
};

export default function RoofingCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="46 BUNDLES" />
    </>
  );
}
