import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "countertop-calculator";

export const metadata: Metadata = {
  title: "Countertop Surface Area Calculator",
  description:
    "Estimate rectangular countertop and island surface area from entered dimensions. Confirm fabrication and ordering quantities with the fabricator.",
  alternates: { canonical: "/countertop-calculator" },
  openGraph: {
    title: "Countertop Surface Area Calculator",
    description: "Estimate countertop surface area from entered dimensions. No installed-price estimate.",
    url: "https://www.tallyard.com/countertop-calculator",
    type: "website",
  },
};

export default function CountertopCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="42 FT²" />
    </>
  );
}
