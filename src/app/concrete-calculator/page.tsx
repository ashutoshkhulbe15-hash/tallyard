import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "concrete-calculator";

export const metadata: Metadata = {
  title: "Concrete Volume Calculator",
  description:
    "Estimate geometric concrete volume for rectangular or round shapes using entered dimensions and a user-selected planning allowance.",
  alternates: { canonical: "/concrete-calculator" },
  openGraph: {
    title: "Concrete Volume Calculator",
    description:
      "Estimate concrete volume from a simple shape and entered dimensions; not a structural design.",
    url: "https://www.tallyard.com/concrete-calculator",
    type: "website",
  },
};

export default function ConcreteCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="VOLUME" />
    </>
  );
}
