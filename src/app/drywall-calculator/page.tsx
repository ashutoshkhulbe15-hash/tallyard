import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "drywall-calculator";

export const metadata: Metadata = {
  title: "Drywall Calculator",
  description: "Estimate panel count from net measured surface area, nominal panel size, and a user-selected allowance.",
  alternates: { canonical: "/drywall-calculator" },
  openGraph: {
    title: "Drywall Calculator",
    description: "Panel area arithmetic only; no layout, finishing-material takeoff, or installation advice.",
    url: "https://www.tallyard.com/drywall-calculator",
    type: "website",
  },
};

export default function DrywallCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="AREA ÷ PANEL AREA" />
    </>
  );
}
