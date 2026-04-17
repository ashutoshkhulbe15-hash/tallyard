import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "fence-calculator";

export const metadata: Metadata = {
  title: "Fence Calculator — Posts, Rails, And Pickets",
  description:
    "Calculate posts, rails, pickets, and concrete for any fence. Includes gates and corners.",
  alternates: { canonical: "/fence-calculator" },
  openGraph: {
    title: "Fence Calculator — Posts, Rails, And Pickets",
    description:
      "Calculate posts, rails, pickets, and concrete for any fence length.",
    url: "https://tallyard.com/fence-calculator",
    type: "website",
  },
};

export default function FenceCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="209 PCS" />
    </>
  );
}
