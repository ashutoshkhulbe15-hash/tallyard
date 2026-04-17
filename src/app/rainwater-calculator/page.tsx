import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "rainwater-calculator";

export const metadata: Metadata = {
  title: "Rainwater Harvesting Calculator — Gallons From Your Roof",
  description:
    "Calculate rainwater collection yield from any roof. Barrels, tanks, and gallons per storm or annual rainfall.",
  alternates: { canonical: "/rainwater-calculator" },
  openGraph: {
    title: "Rainwater Harvesting Calculator — Gallons From Your Roof",
    description: "Calculate rainwater yield and sizes barrels or tanks.",
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
