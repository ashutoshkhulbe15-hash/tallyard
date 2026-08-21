import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "topsoil-calculator";

export const metadata: Metadata = {
  title: "Topsoil Calculator: Cubic Yards for Any Area",
  description:
    "Cubic yards of topsoil from your area and depth, with coverage per yard, what a yard of topsoil weighs, bags vs bulk pricing, and screened vs fill dirt.",
  alternates: { canonical: "/topsoil-calculator" },
  openGraph: {
    title: "Topsoil Calculator: Cubic Yards for Any Area",
    description: "Calculate cubic yards of topsoil for any garden or lawn project.",
    url: "https://www.tallyard.com/topsoil-calculator",
    type: "website",
  },
};

export default function TopsoilCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="3.7 YD³" />
    </>
  );
}
