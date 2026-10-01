import type { Metadata } from "next";
import { CalculatorIndex } from "./CalculatorIndex";

export const metadata: Metadata = {
  title: "All 45 calculators: free home improvement tools",
  description:
    "A master index of home-improvement calculators and worksheets for measurement, quantity planning, and quote comparisons. Review the inputs and limitations on each tool.",
  alternates: { canonical: "/calculators" },
};

export default function CalculatorsIndexPage() {
  return <CalculatorIndex />;
}
