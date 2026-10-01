import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "rebar-calculator";

export const metadata: Metadata = {
  title: "Reinforcing Bar Grid Geometry Estimator",
  description:
    "Estimate gross straight grid runs from a rectangular footprint and user-selected spacing. Does not choose reinforcement or provide a purchase list.",
  alternates: { canonical: "/rebar-calculator" },
  openGraph: {
    title: "Reinforcing Bar Grid Geometry Estimator",
    description: "Estimate gross grid geometry from entered dimensions and spacing; not structural design.",
    url: "https://www.tallyard.com/rebar-calculator",
    type: "website",
  },
};

export default function RebarCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="GRID" />
    </>
  );
}
