import type { CalculatorConfig } from "@/lib/types";
import { formatNumber, round } from "@/lib/format";

export const hardwoodFlooringCostCalculatorConfig: CalculatorConfig = {
  slug: "hardwood-flooring-cost-calculator",
  title: "Hardwood Flooring Quote Worksheet",
  description: "Calculate a subtotal from measured area and per-square-foot rates copied from a written quote. Tallyard does not supply current material or labor prices.",
  categoryLabel: "Flooring",
  category: "flooring",
  bannerHeadline: "Total your quote inputs.",
  bannerTags: ["Your measured area", "Your quoted rates", "No market-price estimate"],
  inputs: [
    { id: "area", label: "Measured net floor area", type: "number", unitImperial: "ft²", unitMetric: "ft²", defaultImperial: 400, defaultMetric: 400, min: 0.01, step: 1 },
    { id: "materialRate", label: "Material rate from quote", type: "number", unitImperial: "USD/ft²", unitMetric: "USD/ft²", defaultImperial: 0, defaultMetric: 0, min: 0, step: 0.01 },
    { id: "laborRate", label: "Installation rate from quote", type: "number", unitImperial: "USD/ft²", unitMetric: "USD/ft²", defaultImperial: 0, defaultMetric: 0, min: 0, step: 0.01 },
    { id: "otherRate", label: "Other per-area quoted items", type: "number", unitImperial: "USD/ft²", unitMetric: "USD/ft²", defaultImperial: 0, defaultMetric: 0, min: 0, step: 0.01 },
    { id: "fixedExtras", label: "Fixed quoted extras", type: "number", unitImperial: "USD", unitMetric: "USD", defaultImperial: 0, defaultMetric: 0, min: 0, step: 1 },
  ],
  calculate: (values) => {
    const area = Number(values.area);
    const materialRate = Number(values.materialRate);
    const laborRate = Number(values.laborRate);
    const otherRate = Number(values.otherRate);
    const fixedExtras = Number(values.fixedExtras);
    if (![area, materialRate, laborRate, otherRate, fixedExtras].every(Number.isFinite) || area <= 0 || [materialRate, laborRate, otherRate, fixedExtras].some((value) => value < 0) || materialRate + laborRate + otherRate + fixedExtras <= 0) {
      throw new Error("Enter a positive area and nonnegative quote values; at least one quoted amount must be positive.");
    }
    const materials = area * materialRate;
    const labor = area * laborRate;
    const other = area * otherRate;
    const total = materials + labor + other + fixedExtras;
    return {
      value: round(total, 2),
      unit: "quote subtotal (USD)",
      valueRounded: Math.round(total),
      prefix: "$",
      breakdown: [
        { label: "materials from entered quote rate", value: `$${formatNumber(round(materials, 2))}` },
        { label: "installation from entered quote rate", value: `$${formatNumber(round(labor, 2))}` },
        { label: "other per-area items", value: `$${formatNumber(round(other, 2))}` },
        { label: "fixed quoted extras", value: `$${formatNumber(round(fixedExtras, 2))}` },
        { label: "calculated subtotal", value: `$${formatNumber(round(total, 2))}` },
      ],
      formulaSteps: [`subtotal = ${area} ft² × ($${materialRate} + $${laborRate} + $${otherRate})/ft² + $${fixedExtras} = $${round(total, 2)}`, "This sums only the values you entered. It is not a market estimate and does not verify quote scope, product, tax, disposal, repairs, or contract terms."],
    };
  },
  formulaDescription: "subtotal = measured area × sum of user-entered per-area quote rates + user-entered fixed extras",
  methodology: ["Copy area and itemized rates from a written, project-specific quote. Enter the same scope and units for each contractor you compare. The worksheet performs arithmetic only.", "It does not supply market prices, select wood species or construction, determine product suitability, include omitted line items, evaluate subfloor conditions, or guarantee the final invoice. Review the quote scope, exclusions, change terms, product documentation, and local requirements with the contractor."],
  sources: [],
  related: [
    { name: "Flooring package estimator", slug: "flooring-calculator", description: "Package counts from entered coverage" },
    { name: "Floor refinishing quote worksheet", slug: "hardwood-floor-refinishing-cost-calculator", description: "Sum rates from a refinishing quote" },
  ],
  faq: [
    { question: "Does this estimate current hardwood prices?", answer: "No. Enter values from a current written quote. Tallyard does not provide market rates in this worksheet." },
    { question: "Can I compare contractors?", answer: "Yes, as arithmetic, if you enter each quote's rates and fixed charges using the same measured area and scope. The tool cannot identify missing or non-equivalent work." },
  ],
};
