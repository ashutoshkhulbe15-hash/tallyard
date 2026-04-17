import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "gravel-calculator";

export const metadata: Metadata = {
  title: "Gravel Calculator — How Many Yards Of Gravel",
  description:
    "Calculate cubic yards and tons of gravel for driveways, paths, or base layers. Any depth, any aggregate type.",
  alternates: { canonical: "/gravel-calculator" },
  openGraph: {
    title: "Gravel Calculator — How Many Yards Of Gravel",
    description:
      "Calculate cubic yards and tons of gravel for driveways, paths, or base layers.",
    url: "https://tallyard.com/gravel-calculator",
    type: "website",
  },
};

export default function GravelCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="2.5 YD³" />
    </>
  );
}
