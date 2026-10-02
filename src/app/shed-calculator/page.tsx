import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "shed-calculator";

export const metadata: Metadata = {
  title: "Shed Calculator",
  description:
    "Estimate surface areas and nominal sheathing sheets for a simple rectangular shed with the stated roof assumption. Does not produce a framing plan, cost, or complete material list.",
  alternates: { canonical: "/shed-calculator" },
  openGraph: {
    title: "Shed Calculator",
    description:
      "Estimate shed surface areas and nominal sheet counts using the stated geometry assumptions.",
    url: "https://www.tallyard.com/shed-calculator",
    type: "website",
  },
};

export default function ShedCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="80 FT²" />
    </>
  );
}
