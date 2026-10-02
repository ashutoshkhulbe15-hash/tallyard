import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "sod-calculator";

export const metadata: Metadata = {
  title: "Sod Calculator",
  description:
    "Estimate sod area and piece count from rectangular dimensions, selected package format, and a user-set planning allowance.",
  alternates: { canonical: "/sod-calculator" },
  openGraph: {
    title: "Sod Calculator",
    description: "Estimate sod area and piece count; package coverage varies by supplier.",
    url: "https://www.tallyard.com/sod-calculator",
    type: "website",
  },
};

export default function SodCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="PIECES" />
    </>
  );
}
