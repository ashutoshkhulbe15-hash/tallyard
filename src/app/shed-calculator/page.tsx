import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "shed-calculator";

export const metadata: Metadata = {
  title: "Shed Calculator — Materials For Any Backyard Shed",
  description:
    "Calculate lumber, sheathing, and shingles for any shed. Floor, walls, roof, and siding from just footprint and height.",
  alternates: { canonical: "/shed-calculator" },
  openGraph: {
    title: "Shed Calculator — Materials For Any Backyard Shed",
    description: "Calculate materials for any backyard shed.",
    url: "https://www.tallyard.com/shed-calculator",
    type: "website",
  },
};

export default function ShedCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="80 FT²" />
    </>
  );
}
