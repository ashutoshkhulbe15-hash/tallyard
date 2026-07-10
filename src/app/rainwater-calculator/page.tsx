import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "rainwater-calculator";

export const metadata: Metadata = {
  title: "Rainwater Collection Calculator: Gallons & Tank Size",
  description:
    "Free rainwater calculator: gallons your roof collects from any rainfall, plus tank and barrel sizing. See how much water an inch of rain really is. No signup.",
  alternates: { canonical: "/rainwater-calculator" },
  openGraph: {
    title: "Rainwater Collection Calculator: Gallons & Tank Size",
    description:
      "Free rainwater calculator: gallons your roof collects from any rainfall, plus tank and barrel sizing. See how much an inch of rain really is.",
    url: "https://www.tallyard.com/rainwater-calculator",
    type: "website",
  },
};

export default function RainwaterCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="635 GAL" />
    </>
  );
}
