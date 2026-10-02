import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "backsplash-calculator";

export const metadata: Metadata = {
  title: "Backsplash Calculator",
  description:
    "Estimate backsplash tile packages from measured tile area, exact package coverage, and a user-selected allowance.",
  alternates: { canonical: "/backsplash-calculator" },
  openGraph: {
    title: "Backsplash Calculator",
    description: "Estimate packages using measured tile area and exact label coverage.",
    url: "https://www.tallyard.com/backsplash-calculator",
    type: "website",
  },
};

export default function BacksplashCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="PACKAGES" />
    </>
  );
}
