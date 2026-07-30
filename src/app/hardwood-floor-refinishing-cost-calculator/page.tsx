import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "hardwood-floor-refinishing-cost-calculator";

export const metadata: Metadata = {
  title: "Hardwood Floor Refinishing Cost Calculator (2026 Rates)",
  description:
    "Free hardwood floor refinishing cost calculator: sand and refinish priced by area, finish, and condition, with screen-and-recoat compared.",
  alternates: { canonical: "/hardwood-floor-refinishing-cost-calculator" },
  openGraph: {
    title: "Hardwood Floor Refinishing Cost Calculator (2026 Rates)",
    description:
      "Free refinishing cost calculator: sand and refinish by area, finish, and condition, with screen-and-recoat compared.",
    url: "https://www.tallyard.com/hardwood-floor-refinishing-cost-calculator",
    type: "website",
  },
};

export default function FloorRefinishingCostCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="$4.95/ft²" />
    </>
  );
}
