import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "topsoil-calculator";

export const metadata: Metadata = {
  title: "Soil Volume Calculator",
  description:
    "Estimate soil volume from a rectangular area and selected depth, with an optional bag estimate using a selected package volume.",
  alternates: { canonical: "/topsoil-calculator" },
  openGraph: {
    title: "Soil Volume Calculator",
    description: "Estimate soil volume and package count from area, selected depth, and bag size.",
    url: "https://www.tallyard.com/topsoil-calculator",
    type: "website",
  },
};

export default function TopsoilCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="VOLUME" />
    </>
  );
}
