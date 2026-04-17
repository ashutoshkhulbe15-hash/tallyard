import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "brick-calculator";

export const metadata: Metadata = {
  title: "Brick Calculator — Bricks And Mortar Bags",
  description:
    "Calculate bricks and mortar for any wall. All standard sizes with single or double wythe and proper joint math.",
  alternates: { canonical: "/brick-calculator" },
  openGraph: {
    title: "Brick Calculator — Bricks And Mortar Bags",
    description: "Calculate bricks and mortar bags for any wall project.",
    url: "https://www.tallyard.com/brick-calculator",
    type: "website",
  },
};

export default function BrickCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="1,208 BRICKS" />
    </>
  );
}
