import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "gutter-calculator";

export const metadata: Metadata = {
  title: "Gutter Calculator — Linear Feet And Downspouts",
  description:
    "Calculate gutters, downspouts, and accessories for any home. Sizes gutters by roof area and regional rainfall.",
  alternates: { canonical: "/gutter-calculator" },
  openGraph: {
    title: "Gutter Calculator — Linear Feet And Downspouts",
    description: "Calculate gutter linear feet and downspouts for any home.",
    url: "https://tallyard.com/gutter-calculator",
    type: "website",
  },
};

export default function GutterCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="168 LF" />
    </>
  );
}
