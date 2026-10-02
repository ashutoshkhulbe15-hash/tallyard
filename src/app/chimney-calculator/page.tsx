import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "chimney-calculator";

export const metadata: Metadata = {
  title: "Chimney Calculator",
  description:
    "Calculate rectangular fireplace opening area only. This tool does not size a flue, liner, chimney, or vent system.",
  alternates: { canonical: "/chimney-calculator" },
  openGraph: {
    title: "Chimney Calculator",
    description: "Calculate rectangular fireplace opening area only; not a flue-sizing tool.",
    url: "https://www.tallyard.com/chimney-calculator",
    type: "website",
  },
};

export default function ChimneyCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="AREA" />
    </>
  );
}
