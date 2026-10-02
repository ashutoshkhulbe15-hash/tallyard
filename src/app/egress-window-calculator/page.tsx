import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "egress-window-calculator";

export const metadata: Metadata = {
  title: "Egress Window Calculator",
  description:
    "Calculate area from entered net clear opening dimensions. Does not determine egress compliance or emergency-exit suitability.",
  alternates: { canonical: "/egress-window-calculator" },
  openGraph: {
    title: "Egress Window Calculator",
    description: "Area arithmetic from user-measured clear-opening dimensions only; no egress verdict.",
    url: "https://www.tallyard.com/egress-window-calculator",
    type: "website",
  },
};

export default function EgressWindowCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="AREA" />
    </>
  );
}
