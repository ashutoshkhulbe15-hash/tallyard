import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "grout-calculator";

export const metadata: Metadata = {
  title: "Grout Calculator — Pounds Of Grout For Tile",
  description:
    "Calculate pounds of grout for any tile installation. Accounts for tile size, joint width, and thickness.",
  alternates: { canonical: "/grout-calculator" },
  openGraph: {
    title: "Grout Calculator — Pounds Of Grout For Tile",
    description:
      "Calculate pounds of grout for any tile installation.",
    url: "https://www.tallyard.com/grout-calculator",
    type: "website",
  },
};

export default function GroutCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="8 LB" />
    </>
  );
}
