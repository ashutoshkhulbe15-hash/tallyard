import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "extension-cord-calculator";

export const metadata: Metadata = {
  title: "Extension Cord Calculator",
  description:
    "Estimate resistive voltage drop for a selected conductor size, current, cord length, and voltage. Does not select or certify an extension cord.",
  alternates: { canonical: "/extension-cord-calculator" },
  openGraph: {
    title: "Extension Cord Calculator",
    description: "Estimate voltage drop for a selected conductor size and cord length; not a safety rating.",
    url: "https://www.tallyard.com/extension-cord-calculator",
    type: "website",
  },
};

export default function ExtensionCordCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="VOLTAGE DROP" />
    </>
  );
}
