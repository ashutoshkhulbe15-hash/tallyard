import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "paver-calculator";

export const metadata: Metadata = {
  title: "Paver Calculator — Pavers, Base, And Sand",
  description:
    "Calculate pavers, base gravel, bedding sand, and joint sand for any patio or walkway.",
  alternates: { canonical: "/paver-calculator" },
  openGraph: {
    title: "Paver Calculator — Pavers, Base, And Sand",
    description:
      "Calculate pavers, base gravel, and sand for any patio or path.",
    url: "https://www.tallyard.com/paver-calculator",
    type: "website",
  },
};

export default function PaverCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="567 PAVERS" />
    </>
  );
}
