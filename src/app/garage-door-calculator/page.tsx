import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "garage-door-calculator";

export const metadata: Metadata = {
  title: "Garage Door Calculator — Size And Opener HP",
  description:
    "Right garage door size and opener power for any opening. Checks headroom, side room, and recommends material.",
  alternates: { canonical: "/garage-door-calculator" },
  openGraph: {
    title: "Garage Door Calculator — Size And Opener HP",
    description: "Calculate garage door size, clearances, and opener HP.",
    url: "https://tallyard.com/garage-door-calculator",
    type: "website",
  },
};

export default function GarageDoorCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="16 × 7 FT" />
    </>
  );
}
