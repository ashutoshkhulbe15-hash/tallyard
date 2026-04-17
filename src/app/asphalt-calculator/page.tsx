import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "asphalt-calculator";

export const metadata: Metadata = {
  title: "Asphalt Calculator — Tons For Any Driveway",
  description:
    "Calculate tons of asphalt needed for any driveway, lot, or path. Accounts for compaction thickness and waste.",
  alternates: { canonical: "/asphalt-calculator" },
  openGraph: {
    title: "Asphalt Calculator — Tons For Any Driveway",
    description: "Calculate tons of asphalt for any driveway or parking project.",
    url: "https://tallyard.com/asphalt-calculator",
    type: "website",
  },
};

export default function AsphaltCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="12 TONS" />
    </>
  );
}
