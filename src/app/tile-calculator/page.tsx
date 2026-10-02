import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "tile-calculator";

export const metadata: Metadata = {
  title: "Tile Calculator",
  description:
    "Estimate tile packages from rectangular area, package-label coverage, and a user-selected planning allowance.",
  alternates: { canonical: "/tile-calculator" },
  openGraph: {
    title: "Tile Calculator",
    description: "Estimate tile packages from area and product-label coverage; individual tile count and layout are not included.",
    url: "https://www.tallyard.com/tile-calculator",
    type: "website",
  },
};

export default function TileCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="TILE BOXES" />
    </>
  );
}
