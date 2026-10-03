import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "wire-size-calculator";

export const metadata: Metadata = {
  title: "Wire Size Calculator: AWG Chart & Voltage Drop",
  description:
    "Wire gauge for any circuit by ampacity and voltage drop. NEC AWG chart for copper and aluminum, breaker sizes, and max run length by gauge.",
  alternates: { canonical: "/wire-size-calculator" },
  openGraph: {
    title: "Wire Size Calculator: AWG Chart & Voltage Drop",
    description:
      "Calculate the right electrical wire gauge for your circuit, with voltage drop included.",
    url: "https://www.tallyard.com/wire-size-calculator",
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
