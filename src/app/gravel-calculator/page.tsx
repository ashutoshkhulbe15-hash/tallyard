import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "gravel-calculator";

export const metadata: Metadata = {
  title: "Gravel Calculator: Cubic Yards and Tons",
  description:
    "Gravel in cubic yards and tons from area and depth. Covers crusher run, #57, pea gravel, driveway layer depths, and how much a yard of gravel weighs.",
  alternates: { canonical: "/gravel-calculator" },
  openGraph: {
    title: "Gravel Calculator: Cubic Yards and Tons",
    description:
      "Calculate cubic yards and tons of gravel for driveways, paths, or base layers.",
    url: "https://www.tallyard.com/gravel-calculator",
    type: "website",
  },
};

export default function GravelCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="2.5 YD³" />
    </>
  );
}
