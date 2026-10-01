import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "asphalt-calculator";

export const metadata: Metadata = {
  title: "Asphalt Volume and Weight Calculator",
  description:
    "Estimate asphalt volume and approximate weight from area and selected thickness. Not a pavement design or price quote.",
  alternates: { canonical: "/asphalt-calculator" },
  openGraph: {
    title: "Asphalt Volume and Weight Calculator",
    description: "Estimate asphalt volume and approximate weight from area and selected thickness.",
    url: "https://www.tallyard.com/asphalt-calculator",
    type: "website",
  },
};

export default function AsphaltCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="12 TONS" />
    </>
  );
}
