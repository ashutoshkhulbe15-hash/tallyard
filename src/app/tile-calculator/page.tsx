import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "tile-calculator";

export const metadata: Metadata = {
  title: "Tile Calculator — How Many Tiles Do I Need",
  description:
    "Calculate tiles and boxes needed for any floor or wall. Accounts for cuts, waste, and patterns.",
  alternates: { canonical: "/tile-calculator" },
  openGraph: {
    title: "Tile Calculator — How Many Tiles Do I Need",
    description:
      "Calculate tiles and boxes needed for any floor or wall. Accounts for cuts, waste, and patterns.",
    url: "https://tallyard.com/tile-calculator",
    type: "website",
  },
};

export default function TileCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="132 TILES" />
    </>
  );
}
