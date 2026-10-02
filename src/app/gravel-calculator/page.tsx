import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "gravel-calculator";

export const metadata: Metadata = {
  title: "Gravel Calculator",
  description:
    "Estimate aggregate volume and approximate weight from area and selected depth. Not a site, pavement, or price specification.",
  alternates: { canonical: "/gravel-calculator" },
  openGraph: {
    title: "Gravel Calculator",
    description: "Estimate aggregate volume and approximate weight from area and selected depth.",
    url: "https://www.tallyard.com/gravel-calculator",
    type: "website",
  },
};

export default function GravelCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="2.5 YD³" />
    </>
  );
}
