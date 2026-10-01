import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "paver-calculator";

export const metadata: Metadata = {
  title: "Paver Area and Count Calculator",
  description:
    "Estimate paver count for a rectangular area using nominal paver dimensions and a user-selected planning allowance.",
  alternates: { canonical: "/paver-calculator" },
  openGraph: {
    title: "Paver Area and Count Calculator",
    description:
      "Estimate paver quantity from area and selected nominal paver dimensions.",
    url: "https://www.tallyard.com/paver-calculator",
    type: "website",
  },
};

export default function PaverCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="PAVERS" />
    </>
  );
}
