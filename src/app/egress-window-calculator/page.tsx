import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "egress-window-calculator";

export const metadata: Metadata = {
  title: "Egress Window Calculator: Size, Code & Cost (IRC R310)",
  description:
    "Free egress window calculator: check net clear opening against IRC R310, plus window well rules and the cost to add a basement egress window. No signup.",
  alternates: { canonical: "/egress-window-calculator" },
  openGraph: {
    title: "Egress Window Calculator: Size, Code & Cost (IRC R310)",
    description:
      "Free egress window calculator: check net clear opening against IRC R310, plus window well rules and basement egress costs. No signup.",
    url: "https://www.tallyard.com/egress-window-calculator",
    type: "website",
  },
};

export default function EgressWindowCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="5.87 SQ FT" />
    </>
  );
}
