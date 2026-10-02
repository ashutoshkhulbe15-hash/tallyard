import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "paint-calculator";

export const metadata: Metadata = {
  title: "Paint Calculator",
  description:
    "Estimate wall and optional ceiling paint from rectangular room measurements, coats, assumed opening deductions, and coverage entered from the product label.",
  alternates: {
    canonical: "/paint-calculator",
  },
  openGraph: {
    title: "Paint Calculator",
    description:
      "Estimate paint from room measurements, coats, and entered product coverage. Review the opening-area assumptions.",
    url: "https://www.tallyard.com/paint-calculator",
    type: "website",
  },
};

export default function PaintCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="2.8 GAL" />
    </>
  );
}
