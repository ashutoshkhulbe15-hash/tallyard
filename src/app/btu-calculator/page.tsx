import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "btu-calculator";

export const metadata: Metadata = {
  title: "BTU Calculator — Air Conditioner Size",
  description:
    "Calculate the right BTU size for your room or home. Accounts for climate, sun exposure, and occupancy.",
  alternates: { canonical: "/btu-calculator" },
  openGraph: {
    title: "BTU Calculator — Air Conditioner Size",
    description:
      "Calculate the right BTU size for your AC. Accounts for climate, sun, and occupancy.",
    url: "https://www.tallyard.com/btu-calculator",
    type: "website",
  },
};

export default function BtuCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="8,000 BTU" />
    </>
  );
}
