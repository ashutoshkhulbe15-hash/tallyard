import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "drywall-calculator";

export const metadata: Metadata = {
  title: "Drywall Calculator — How Many Sheets Of Drywall",
  description:
    "Calculate sheets of drywall needed for any room. Accounts for waste, cuts, and standard sheet sizes.",
  alternates: { canonical: "/drywall-calculator" },
  openGraph: {
    title: "Drywall Calculator — How Many Sheets Of Drywall",
    description:
      "Calculate sheets of drywall needed for any room. Accounts for waste, cuts, and standard sheet sizes.",
    url: "https://www.tallyard.com/drywall-calculator",
    type: "website",
  },
};

export default function DrywallCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="14 SHEETS" />
    </>
  );
}
