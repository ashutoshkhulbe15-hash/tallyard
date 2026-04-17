import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "mulch-calculator";

export const metadata: Metadata = {
  title: "Mulch Calculator — How Many Yards Of Mulch",
  description:
    "Calculate cubic yards of mulch for any garden bed. Bulk or bags, any depth, with clear math.",
  alternates: { canonical: "/mulch-calculator" },
  openGraph: {
    title: "Mulch Calculator — How Many Yards Of Mulch",
    description:
      "Calculate cubic yards of mulch for any garden bed. Bulk or bags.",
    url: "https://tallyard.com/mulch-calculator",
    type: "website",
  },
};

export default function MulchCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="0.75 YD³" />
    </>
  );
}
