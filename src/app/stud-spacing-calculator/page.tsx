import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "stud-spacing-calculator";

export const metadata: Metadata = {
  title: "Straight-Wall Spacing Count Estimator",
  description:
    "Simple spacing-position count along a straight entered length. Does not count framing members or design a wall.",
  alternates: { canonical: "/stud-spacing-calculator" },
  openGraph: {
    title: "Straight-Wall Spacing Count Estimator",
    description: "Simple position count from wall length and user-selected interval; not framing design.",
    url: "https://www.tallyard.com/stud-spacing-calculator",
    type: "website",
  },
};

export default function StudSpacingCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="POSITIONS" />
    </>
  );
}
