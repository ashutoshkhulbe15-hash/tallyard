import type { CalculatorConfig } from "@/lib/types";
import { formatNumber, round } from "@/lib/format";

export const floorRefinishingCostCalculatorConfig: CalculatorConfig = {
  slug: "hardwood-floor-refinishing-cost-calculator",
  title: "Hardwood Refinishing Quote Worksheet",
  description: "Calculate a subtotal from measured floor area and a per-area rate and extras copied from a written refinishing quote. No current market prices are assumed.",
  categoryLabel: "Flooring",
  category: "flooring",
  bannerHeadline: "Total the entered quote.",
  bannerTags: ["Measured floor area", "Rates from your quote", "No repair-vs-replace verdict"],
  inputs: [
    { id: "area", label: "Measured floor area", type: "number", unitImperial: "ft²", unitMetric: "ft²", defaultImperial: 500, defaultMetric: 500, min: 0.01, step: 1 },
    { id: "quotedRate", label: "Refinishing rate from written quote", type: "number", unitImperial: "USD/ft²", unitMetric: "USD/ft²", defaultImperial: 0, defaultMetric: 0, min: 0, step: 0.01 },
    { id: "fixedExtras", label: "Fixed quoted extras", type: "number", unitImperial: "USD", unitMetric: "USD", defaultImperial: 0, defaultMetric: 0, min: 0, step: 1 },
  ],
  calculate: (values) => {
    const area = Number(values.area);
    const quotedRate = Number(values.quotedRate);
    const fixedExtras = Number(values.fixedExtras);
    if (![area, quotedRate, fixedExtras].every(Number.isFinite) || area <= 0 || quotedRate < 0 || fixedExtras < 0 || quotedRate + fixedExtras <= 0) {
      throw new Error("Enter a positive area and nonnegative quote values; at least one quoted amount must be positive.");
    }
    const areaCharge = area * quotedRate;
    const total = areaCharge + fixedExtras;
    return {
      value: round(total, 2),
      unit: "quote subtotal (USD)",
      valueRounded: Math.round(total),
      prefix: "$",
      breakdown: [
        { label: "area charge from entered quote rate", value: `$${formatNumber(round(areaCharge, 2))}` },
        { label: "fixed quoted extras", value: `$${formatNumber(round(fixedExtras, 2))}` },
        { label: "calculated subtotal", value: `$${formatNumber(round(total, 2))}` },
        { label: "floor condition and suitability for refinishing", value: "not assessed" },
      ],
      formulaSteps: [`subtotal = ${area} ft² × $${quotedRate}/ft² + $${fixedExtras} = $${round(total, 2)}`, "This adds values you enter. It does not determine whether refinishing is suitable, estimate repair scope, compare replacement costs, or predict the final invoice."],
    };
  },
  formulaDescription: "subtotal = measured floor area × user-entered quote rate + user-entered fixed extras",
  methodology: ["Copy the measured area, per-area rate, and fixed extras from a current written quote. Use identical project scope and units when comparing bids. This worksheet sums those supplied values only.", "It does not diagnose finish condition, determine whether a floor can be sanded or recoated, estimate repair or cure time, evaluate indoor-air considerations, compare refinishing with replacement, or verify quote exclusions and contract terms. Obtain a site inspection and product-specific instructions from qualified professionals."],
  sources: [],
  related: [
    { name: "Hardwood installation quote worksheet", slug: "hardwood-flooring-cost-calculator", description: "Sum values from a new-floor quote" },
    { name: "Flooring package estimator", slug: "flooring-calculator", description: "Package count from entered label coverage" },
  ],
  faq: [
    { question: "Does this show what refinishing should cost?", answer: "No. Enter rates and extras from a written quote. The worksheet does not provide or validate market prices." },
    { question: "Can this tell me whether my floor can be refinished?", answer: "No. Condition and remaining wear layer require an on-site assessment of the specific floor." },
  ],
};
