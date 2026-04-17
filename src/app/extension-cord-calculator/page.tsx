import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "extension-cord-calculator";

export const metadata: Metadata = {
  title: "Extension Cord Calculator — AWG For Any Load",
  description:
    "Right extension cord gauge for your tool, appliance, or device. Accounts for amps, length, and indoor/outdoor use.",
  alternates: { canonical: "/extension-cord-calculator" },
  openGraph: {
    title: "Extension Cord Calculator — AWG For Any Load",
    description: "Extension cord gauge sizing for any tool or appliance.",
    url: "https://tallyard.com/extension-cord-calculator",
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
