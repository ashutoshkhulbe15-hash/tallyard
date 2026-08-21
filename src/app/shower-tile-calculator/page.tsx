import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "shower-tile-calculator";

export const metadata: Metadata = {
  title: "Shower Tile Calculator: Wall & Floor Square Feet",
  description:
    "Tile for any shower, with wall and floor counted separately. Covers niche and curb, waste by pattern, shower pan options, and floor tile slip ratings.",
  alternates: { canonical: "/shower-tile-calculator" },
  openGraph: {
    title: "Shower Tile Calculator: Wall & Floor Square Feet",
    description: "Calculate shower tile with niche and floor options.",
    url: "https://www.tallyard.com/shower-tile-calculator",
    type: "website",
  },
};

export default function ShowerTileCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="60 TILES" />
    </>
  );
}
