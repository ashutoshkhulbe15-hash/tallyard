import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "kitchen-cabinet-calculator";

export const metadata: Metadata = {
  title: "Kitchen Cabinet Calculator — Linear Feet And Budget",
  description:
    "Calculate linear feet of cabinets for any kitchen layout. Upper and base cabinet counts with cost estimate by grade.",
  alternates: { canonical: "/kitchen-cabinet-calculator" },
  openGraph: {
    title: "Kitchen Cabinet Calculator — Linear Feet And Budget",
    description: "Calculate kitchen cabinet linear feet for any layout.",
    url: "https://tallyard.com/kitchen-cabinet-calculator",
    type: "website",
  },
};

export default function KitchenCabinetCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="34 LF" />
    </>
  );
}
