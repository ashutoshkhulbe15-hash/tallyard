import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "topsoil-calculator";

export const metadata: Metadata = {
  title: "Topsoil Calculator — Yards, Bags, And Tons",
  description:
    "Calculate cubic yards of topsoil for garden beds, lawns, or fill. Converts to bags and tons for delivery.",
  alternates: { canonical: "/topsoil-calculator" },
  openGraph: {
    title: "Topsoil Calculator — Yards, Bags, And Tons",
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
