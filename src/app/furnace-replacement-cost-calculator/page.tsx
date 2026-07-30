import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "furnace-replacement-cost-calculator";

export const metadata: Metadata = {
  title: "Furnace Replacement Cost Calculator: 2026 Gas, Oil & AC",
  description:
    "Free furnace and AC replacement cost calculator: 2026 installed prices by size and efficiency, repair vs replace guidance, and every cost itemized.",
  alternates: { canonical: "/furnace-replacement-cost-calculator" },
  openGraph: {
    title: "Furnace Replacement Cost Calculator: 2026 Gas, Oil & AC",
    description:
      "Free furnace and AC replacement cost calculator: 2026 installed prices by size and efficiency, with repair vs replace guidance.",
    url: "https://www.tallyard.com/furnace-replacement-cost-calculator",
    type: "website",
  },
};

export default function FurnaceReplacementCostCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="$6,800" />
    </>
  );
}
