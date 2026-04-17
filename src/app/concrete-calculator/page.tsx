import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "concrete-calculator";

export const metadata: Metadata = {
  title: "Concrete Calculator — How Many Yards Of Concrete",
  description:
    "Calculate cubic yards of concrete for any slab, footing, or round pour. Free, no signup. Waste factor included.",
  alternates: { canonical: "/concrete-calculator" },
  openGraph: {
    title: "Concrete Calculator — How Many Yards Of Concrete",
    description:
      "Calculate cubic yards of concrete for any slab, footing, or round pour.",
    url: "https://www.tallyard.com/concrete-calculator",
    type: "website",
  },
};

export default function ConcreteCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="1.5 YD³" />
    </>
  );
}
