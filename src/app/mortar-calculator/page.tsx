import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "mortar-calculator";

export const metadata: Metadata = {
  title: "Mortar Calculator",
  description:
    "Estimate bag count from masonry unit count and coverage for the exact selected mortar package. Does not select mortar type or provide installation advice.",
  alternates: { canonical: "/mortar-calculator" },
  openGraph: {
    title: "Mortar Calculator",
    description: "Estimate packages using exact product coverage and a user-selected allowance; mortar type and cost are not included.",
    url: "https://www.tallyard.com/mortar-calculator",
    type: "website",
  },
};

export default function MortarCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="BAGS" />
    </>
  );
}
