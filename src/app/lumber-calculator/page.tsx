import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "lumber-calculator";

export const metadata: Metadata = {
  title: "Lumber Board-Foot and Lineal-Length Worksheet",
  description: "Calculate nominal board-foot and lineal totals from size, length, quantity, and a user-selected allowance. No price or weight estimate.",
  alternates: { canonical: "/lumber-calculator" },
  openGraph: {
    title: "Lumber Board-Foot and Lineal-Length Worksheet",
    description: "Nominal board-foot and lineal-length arithmetic only; no price, weight, or design output.",
    url: "https://www.tallyard.com/lumber-calculator",
    type: "website",
  },
};

export default function LumberCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="BOARD FEET" />
    </>
  );
}
