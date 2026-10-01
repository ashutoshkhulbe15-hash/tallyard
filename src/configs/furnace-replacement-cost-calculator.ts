import type { CalculatorConfig } from "@/lib/types";
import { formatNumber, round } from "@/lib/format";

export const furnaceReplacementCostCalculatorConfig: CalculatorConfig = {
  slug: "furnace-replacement-cost-calculator",
  title: "Furnace Replacement Quote Worksheet",
  description: "Add line items entered from a written furnace-replacement quote. Does not size equipment or estimate current prices.",
  categoryLabel: "HVAC",
  category: "hvac",
  bannerHeadline: "Add the quoted line items.",
  bannerTags: ["Your project quote", "Transparent subtotal", "No equipment sizing"],
  inputs: [
    { id: "equipment", label: "Equipment amount in quote", type: "number", unitImperial: "USD", unitMetric: "USD", defaultImperial: 0, defaultMetric: 0, min: 0, step: 1 },
    { id: "labor", label: "Labor amount in quote", type: "number", unitImperial: "USD", unitMetric: "USD", defaultImperial: 0, defaultMetric: 0, min: 0, step: 1 },
    { id: "venting", label: "Venting or ductwork amount in quote", type: "number", unitImperial: "USD", unitMetric: "USD", defaultImperial: 0, defaultMetric: 0, min: 0, step: 1 },
    { id: "permitOther", label: "Permit, disposal, tax, and other quoted amounts", type: "number", unitImperial: "USD", unitMetric: "USD", defaultImperial: 0, defaultMetric: 0, min: 0, step: 1 },
  ],
  calculate: (values) => {
    const entries = ["equipment", "labor", "venting", "permitOther"].map((key) => Number(values[key]));
    if (!entries.every((value) => Number.isFinite(value) && value >= 0) || entries.every((value) => value === 0)) {
      throw new Error("Enter nonnegative line items from the quote and at least one positive amount.");
    }
    const total = entries.reduce((sum, value) => sum + value, 0);
    return {
      value: round(total, 2),
      unit: "entered quote subtotal (USD)",
      valueRounded: Math.round(total),
      prefix: "$",
      breakdown: [
        ...["equipment", "labor", "venting or ductwork", "permit, disposal, tax, and other"].map((label, index) => ({ label, value: `$${formatNumber(round(entries[index], 2))}` })),
        { label: "entered quote subtotal", value: `$${formatNumber(round(total, 2))}` },
        { label: "furnace capacity, efficiency, and suitability", value: "not assessed" },
      ],
      formulaSteps: [`subtotal = ${entries.map((value) => `$${round(value, 2)}`).join(" + ")} = $${round(total, 2)}`, "This adds only the amounts entered. It does not determine equipment size, compare bids for equivalent scope, or verify permits, tax, or omitted work."],
    };
  },
  formulaDescription: "quote subtotal = sum of user-entered quote line items",
  methodology: ["Copy amounts from an itemized, project-specific written quote. Include taxes, permits, disposal, venting, duct changes, and other items in the line where the contractor listed them. Use the same scope when comparing providers.", "This worksheet does not calculate heat loss, size a furnace or air conditioner, compare efficiency economics, assess venting or fuel compatibility, quote current prices, or verify code compliance. Equipment selection and installation require qualified, site-specific review and exact manufacturer documentation."],
  sources: [],
  related: [
    { name: "Heating/cooling load conversion", slug: "heat-pump-calculator", description: "Converts documented loads only; not equipment sizing" },
    { name: "Room AC capacity guide", slug: "btu-calculator", description: "Limited room-area guide, not central system sizing" },
  ],
  faq: [
    { question: "Does this estimate furnace replacement prices?", answer: "No. Enter amounts from a current written quote. Tallyard does not provide market prices in this worksheet." },
    { question: "Does this tell me whether to repair or replace?", answer: "No. That decision depends on equipment condition, safety, repair scope, and project-specific costs." },
  ],
};
