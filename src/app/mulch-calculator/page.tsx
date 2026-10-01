import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "mulch-calculator";

export const metadata: Metadata = {
  title: "Mulch Volume Calculator",
  description:
    "Estimate mulch volume from rectangular area and selected depth, with an optional count for nominal 2 ft³ bags.",
  alternates: { canonical: "/mulch-calculator" },
  openGraph: {
    title: "Mulch Volume Calculator",
    description: "Estimate mulch volume or nominal bag count from area and selected depth.",
    url: "https://www.tallyard.com/mulch-calculator",
    type: "website",
  },
};

export default function MulchCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="VOLUME" />
    </>
  );
}
