import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "brick-calculator";

export const metadata: Metadata = {
  title: "Brick Calculator",
  description:
    "Estimate brick count from net wall area, product-specific units-per-area coverage, and a user-selected planning allowance. Does not estimate mortar or wall design.",
  alternates: { canonical: "/brick-calculator" },
  openGraph: {
    title: "Brick Calculator",
    description: "Estimate brick count from net wall area and product-specific coverage; no mortar or cost estimate.",
    url: "https://www.tallyard.com/brick-calculator",
    type: "website",
  },
};

export default function BrickCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="BRICKS" />
    </>
  );
}
