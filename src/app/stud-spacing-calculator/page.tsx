import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "stud-spacing-calculator";

export const metadata: Metadata = {
  title: "Stud & Wall Framing Calculator: Spacing + Count",
  description:
    "Free stud calculator: count studs, plates, headers, and corners for any wall at 16 or 24 inch spacing. Wall framing diagram and IRC rules. No signup.",
  alternates: { canonical: "/stud-spacing-calculator" },
  openGraph: {
    title: "Stud & Wall Framing Calculator: Spacing + Count",
    description:
      "Free stud calculator: studs, plates, headers, and corners for any wall. Framing diagram plus 16 vs 24 inch spacing rules. No signup.",
    url: "https://www.tallyard.com/stud-spacing-calculator",
    type: "website",
  },
};

export default function StudSpacingCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="42 STUDS" />
    </>
  );
}
