import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "shower-tile-calculator";

export const metadata: Metadata = {
  title: "Shower Tile Calculator — Tub And Walk-In Surrounds",
  description:
    "Calculate tiles and boxes for a shower or tub surround. Three walls plus optional niche and floor, with wet-area waste.",
  alternates: { canonical: "/shower-tile-calculator" },
  openGraph: {
    title: "Shower Tile Calculator — Tub And Walk-In Surrounds",
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
