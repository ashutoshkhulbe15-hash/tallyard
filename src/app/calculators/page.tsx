import type { Metadata } from "next";
import { CalculatorIndex } from "./CalculatorIndex";

export const metadata: Metadata = {
  title: "All 45 calculators — free home improvement tools",
  description:
    "A master index of 45 free home improvement calculators — paint, concrete, roofing, HVAC, landscaping, electrical, and more. Every row shows its formula and source. No signup.",
  alternates: { canonical: "/calculators" },
};

export default function CalculatorsIndexPage() {
  return <CalculatorIndex />;
}
