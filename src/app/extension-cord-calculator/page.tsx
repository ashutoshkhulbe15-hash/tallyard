import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "extension-cord-calculator";

export const metadata: Metadata = {
  title: "Extension Cord Gauge Calculator: AWG by Length",
  description:
    "What gauge extension cord you need by amps and length. Full AWG chart for 16, 14, 12, and 10 gauge cords, plus jacket codes and generator cord rules.",
  alternates: { canonical: "/extension-cord-calculator" },
  openGraph: {
    title: "Extension Cord Gauge Calculator: AWG by Length",
    description: "Extension cord gauge sizing for any tool or appliance.",
    url: "https://www.tallyard.com/extension-cord-calculator",
    type: "website",
  },
};

export default function ExtensionCordCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="12 AWG" />
    </>
  );
}
