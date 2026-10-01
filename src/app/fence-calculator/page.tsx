import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "fence-calculator";

export const metadata: Metadata = {
  title: "Fence Calculator: Posts, Rails, And Pickets",
  description:
    "Estimate posts, rails, and pickets for a straight fence run from entered spacing assumptions. Gate, corner, foundation, and concrete quantities require a separate layout.",
  alternates: { canonical: "/fence-calculator" },
  openGraph: {
    title: "Fence Calculator: Posts, Rails, And Pickets",
    description:
      "Estimate straight-run fence quantities from entered dimensions and spacing assumptions.",
    url: "https://www.tallyard.com/fence-calculator",
    type: "website",
  },
};

export default function FenceCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="209 PCS" />
    </>
  );
}
