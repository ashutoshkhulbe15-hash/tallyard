import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "drywall-calculator";

export const metadata: Metadata = {
  title: "Drywall & Sheetrock Calculator: Sheets, Mud & Cost",
  description:
    "Free drywall calculator: sheets, joint compound, tape, and screws for any room. Covers installation cost, repair cost, and finish levels.",
  alternates: { canonical: "/drywall-calculator" },
  openGraph: {
    title: "Drywall & Sheetrock Calculator: Sheets, Mud & Cost",
    description:
      "Free drywall calculator: sheets, mud, tape, and screws. Covers installation cost, repair cost, and finish levels.",
    url: "https://www.tallyard.com/drywall-calculator",
    type: "website",
  },
};

export default function DrywallCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="14 SHEETS" />
    </>
  );
}
