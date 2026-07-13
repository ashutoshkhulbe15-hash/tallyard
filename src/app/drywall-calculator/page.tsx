import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "drywall-calculator";

export const metadata: Metadata = {
  title: "Drywall Calculator: Sheets, Mud, Tape & Cost",
  description:
    "Free drywall calculator: sheets, joint compound, tape, and screws for any room by square footage. Includes finish levels and cost. No signup.",
  alternates: { canonical: "/drywall-calculator" },
  openGraph: {
    title: "Drywall Calculator: Sheets, Mud, Tape & Cost",
    description:
      "Free drywall calculator: sheets, joint compound, tape, and screws by square footage. Plus finish levels and cost. No signup.",
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
