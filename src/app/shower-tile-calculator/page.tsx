import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "shower-tile-calculator";

export const metadata: Metadata = {
  title: "Shower Tile Calculator",
  description:
    "Estimate shower tile packages from measured total area, exact package coverage, and a user-selected allowance. Waterproofing design is not included.",
  alternates: { canonical: "/shower-tile-calculator" },
  openGraph: {
    title: "Shower Tile Calculator",
    description: "Estimate packages from measured tiled area and exact label coverage; not a shower-system or waterproofing design.",
    url: "https://www.tallyard.com/shower-tile-calculator",
    type: "website",
  },
};

export default function ShowerTileCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="TILE BOXES" />
    </>
  );
}
