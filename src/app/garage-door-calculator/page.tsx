import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "garage-door-calculator";

export const metadata: Metadata = {
  title: "Garage Door Calculator",
  description:
    "Record opening and clearance dimensions and calculate rectangular area. Does not select hardware, check compatibility, or estimate price.",
  alternates: { canonical: "/garage-door-calculator" },
  openGraph: {
    title: "Garage Door Calculator",
    description: "Opening area arithmetic and entered clearances only; verify fit with the manufacturer.",
    url: "https://www.tallyard.com/garage-door-calculator",
    type: "website",
  },
};

export default function GarageDoorCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="OPENING" />
    </>
  );
}
