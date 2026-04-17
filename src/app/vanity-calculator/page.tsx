import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "vanity-calculator";

export const metadata: Metadata = {
  title: "Vanity Calculator — Right Size For Your Bathroom",
  description:
    "Calculate the right vanity size for your bathroom. Accounts for clearances, single vs double sink, and standard widths.",
  alternates: { canonical: "/vanity-calculator" },
  openGraph: {
    title: "Vanity Calculator — Right Size For Your Bathroom",
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
