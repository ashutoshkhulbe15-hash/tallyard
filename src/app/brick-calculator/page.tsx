import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "brick-calculator";

export const metadata: Metadata = {
  title: "Brick Calculator: Count, Sizes & Cost Per Brick",
  description:
    "How many bricks you need from wall size, with the standard brick size chart, bricks per square foot, and 2026 cost per brick and per thousand.",
  alternates: { canonical: "/brick-calculator" },
  openGraph: {
    title: "Brick Calculator: Count, Sizes & Cost Per Brick",
    description: "Calculate bricks and mortar bags for any wall project.",
    url: "https://www.tallyard.com/brick-calculator",
    type: "website",
  },
};

export default function BrickCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="1,208 BRICKS" />
    </>
  );
}
