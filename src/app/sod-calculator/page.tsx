import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "sod-calculator";

export const metadata: Metadata = {
  title: "Sod Calculator: Sq Ft, Pallets & Cost by Grass",
  description:
    "Square feet and pallets of sod for any yard, with 2026 cost by variety: Bermuda, fescue, zoysia, St. Augustine. Includes prep and watering timeline.",
  alternates: { canonical: "/sod-calculator" },
  openGraph: {
    title: "Sod Calculator: Sq Ft, Pallets & Cost by Grass",
    description: "Calculate sod pieces and pallets for any lawn installation.",
    url: "https://www.tallyard.com/sod-calculator",
    type: "website",
  },
};

export default function SodCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="394 SLABS" />
    </>
  );
}
