import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "kitchen-cabinet-calculator";

export const metadata: Metadata = {
  title: "Kitchen Cabinet Run Calculator",
  description:
    "Estimate cabinet run length and rough cabinet module count from your kitchen layout and wall measurements.",
  alternates: { canonical: "/kitchen-cabinet-calculator" },
  openGraph: {
    title: "Kitchen Cabinet Run Calculator",
    description: "Estimate kitchen cabinet run lengths from wall measurements.",
    url: "https://www.tallyard.com/kitchen-cabinet-calculator",
    type: "website",
  },
};

export default function KitchenCabinetCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="RUNS" />
    </>
  );
}
