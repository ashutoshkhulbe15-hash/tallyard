import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "sod-calculator";

export const metadata: Metadata = {
  title: "Sod Calculator — Square Feet, Rolls, And Pallets",
  description:
    "Calculate square feet, slabs, rolls, and pallets of sod needed for any lawn. Accounts for cuts and waste.",
  alternates: { canonical: "/sod-calculator" },
  openGraph: {
    title: "Sod Calculator — Square Feet, Rolls, And Pallets",
    description: "Calculate sod pieces and pallets for any lawn installation.",
    url: "https://tallyard.com/sod-calculator",
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
