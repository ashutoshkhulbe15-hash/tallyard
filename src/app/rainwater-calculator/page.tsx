import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "rainwater-calculator";

export const metadata: Metadata = {
  title: "Rainfall Runoff Volume Estimator",
  description: "Estimate event runoff volume from horizontal catchment area, rainfall depth, and a user-selected capture factor. Does not size storage.",
  alternates: { canonical: "/rainwater-calculator" },
  openGraph: {
    title: "Rainfall Runoff Volume Estimator",
    description: "Estimate rainfall runoff volume; tank sizing and water-use planning are outside scope.",
    url: "https://www.tallyard.com/rainwater-calculator",
    type: "website",
  },
};

export default function RainwaterCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="RUNOFF" />
    </>
  );
}
