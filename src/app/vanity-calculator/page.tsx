import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "vanity-calculator";

export const metadata: Metadata = {
  title: "Vanity Size Calculator: Widths & Clearances",
  description:
    "Bathroom vanity size for any wall, with the standard width chart from 24 to 72 inches, IRC clearances, and why a double sink needs 60 inches.",
  alternates: { canonical: "/vanity-calculator" },
  openGraph: {
    title: "Vanity Size Calculator: Widths & Clearances",
    description: "Calculate bathroom vanity size with clearances and code checks.",
    url: "https://www.tallyard.com/vanity-calculator",
    type: "website",
  },
};

export default function VanityCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue={`66"`} />
    </>
  );
}
