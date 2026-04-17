import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "insulation-calculator";

export const metadata: Metadata = {
  title: "Insulation Calculator — R-Value And Bags Needed",
  description:
    "Calculate insulation coverage and R-value for any wall, attic, or floor. Climate-appropriate targets included.",
  alternates: { canonical: "/insulation-calculator" },
  openGraph: {
    title: "Insulation Calculator — R-Value And Bags Needed",
    description:
      "Calculate insulation coverage for any wall, attic, or floor with climate-specific R-values.",
    url: "https://tallyard.com/insulation-calculator",
    type: "website",
  },
};

export default function InsulationCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="R-49" />
    </>
  );
}
