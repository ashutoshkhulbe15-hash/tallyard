import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "wallpaper-calculator";

export const metadata: Metadata = {
  title: "Wallpaper Roll-Coverage Estimator",
  description: "Estimate rolls from net wall area, exact product-label coverage, and a user-selected allowance; no pattern-layout model.",
  alternates: { canonical: "/wallpaper-calculator" },
  openGraph: {
    title: "Wallpaper Roll-Coverage Estimator",
    description: "Area-coverage arithmetic from product-label data; pattern layout is not assessed.",
    url: "https://www.tallyard.com/wallpaper-calculator",
    type: "website",
  },
};

export default function WallpaperCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="LABEL COVERAGE" />
    </>
  );
}
