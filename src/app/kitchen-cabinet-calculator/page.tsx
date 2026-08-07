import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "kitchen-cabinet-calculator";

export const metadata: Metadata = {
  title: "Kitchen Cabinet Calculator: Cost Per Linear Foot",
  description:
    "Cabinet linear feet and cost from your kitchen layout, with the standard size chart in 3 inch increments and 2026 prices for stock to custom.",
  alternates: { canonical: "/kitchen-cabinet-calculator" },
  openGraph: {
    title: "Kitchen Cabinet Calculator: Cost Per Linear Foot",
    description: "Calculate kitchen cabinet linear feet for any layout.",
    url: "https://www.tallyard.com/kitchen-cabinet-calculator",
    type: "website",
  },
};

export default function KitchenCabinetCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="34 LF" />
    </>
  );
}
