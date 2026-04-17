import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "wire-size-calculator";

export const metadata: Metadata = {
  title: "Wire Size Calculator — AWG For Any Amp Load",
  description:
    "Calculate the right electrical wire gauge for your circuit. Accounts for amps, voltage drop, distance, and wire material.",
  alternates: { canonical: "/wire-size-calculator" },
  openGraph: {
    title: "Wire Size Calculator — AWG For Any Amp Load",
    description:
      "Calculate the right electrical wire gauge for your circuit, with voltage drop included.",
    url: "https://tallyard.com/wire-size-calculator",
    type: "website",
  },
};

export default function WireSizeCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="12 AWG" />
    </>
  );
}
