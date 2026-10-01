import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber, ceilQuantity } from "@/lib/format";

export const flooringCalculatorConfig: CalculatorConfig = {
  slug: "flooring-calculator",
  title: "Flooring Package Calculator",
  description: "Estimate flooring package count from rectangular area, package coverage printed on the label, and an allowance you select.",
  categoryLabel: "Flooring",
  category: "flooring",
  bannerHeadline: "Estimate flooring quantity.",
  bannerTags: ["Rectangular area", "Enter package coverage", "Allowance is user-selected"],
  inputs: [
    { id: "length", label: "Room length", type: "number", unitImperial: "ft", unitMetric: "m", defaultImperial: 14, defaultMetric: 4.3, min: 0.1, step: 0.5 },
    { id: "width", label: "Room width", type: "number", unitImperial: "ft", unitMetric: "m", defaultImperial: 12, defaultMetric: 3.7, min: 0.1, step: 0.5 },
    {
      id: "coveragePerPackage", label: "Coverage per package (check label)", type: "number",
      unitImperial: "ft²", unitMetric: "m²", defaultImperial: "", defaultMetric: "", min: 0.01, step: 0.1,
      help: "Enter the coverage stated for the exact flooring product and package.",
    },
    {
      id: "allowance", label: "Planning allowance", type: "select", defaultImperial: 0.1,
      options: [
        { label: "0%", value: 0 }, { label: "5%", value: 0.05 },
        { label: "10%", value: 0.1 }, { label: "15%", value: 0.15 },
      ],
      help: "Choose an allowance using the layout, product guidance, and installer advice; no pattern-specific amount is assumed.",
    },
  ],
  calculate: (values, units) => {
    const length = Number(values.length);
    const width = Number(values.width);
    const coverage = Number(values.coveragePerPackage);
    const allowance = Number(values.allowance);
    if (![length, width, coverage, allowance].every(Number.isFinite) || length <= 0 || width <= 0 || coverage <= 0 ||
        ![0, 0.05, 0.1, 0.15].includes(allowance)) {
      throw new Error("Enter positive room dimensions and the exact package coverage from its label, then choose a listed planning allowance.");
    }
    const area = length * width;
    const coverageAdjusted = area * (1 + allowance);
    const packages = ceilQuantity(coverageAdjusted / coverage);
    const areaUnit = units === "metric" ? "m²" : "ft²";
    return {
      value: packages,
      unit: packages === 1 ? "package" : "packages",
      valueRounded: packages,
      breakdown: [
        { label: "rectangular area", value: `${formatNumber(round(area, 2))} ${areaUnit}` },
        { label: "selected allowance", value: `${round(allowance * 100, 0)}%` },
        { label: "area including selected allowance", value: `${formatNumber(round(coverageAdjusted, 2))} ${areaUnit}` },
        { label: "coverage per package", value: `${formatNumber(round(coverage, 2))} ${areaUnit}` },
      ],
      formulaSteps: [
        `area = ${length} × ${width} = ${round(area, 3)} ${areaUnit}`,
        `area with selected allowance = ${round(area, 3)} × (1 + ${round(allowance * 100, 0)}%) = ${round(coverageAdjusted, 3)} ${areaUnit}`,
        `packages = ceil(${round(coverageAdjusted, 3)} ÷ ${coverage}) = ${packages}`,
        "This estimate does not model layout, cut plan, reusable offcuts, subfloor, underlayment, transitions, or product-specific installation rules.",
      ],
    };
  },
  formulaDescription: "packages = ceil((rectangular area × (1 + user-selected allowance)) ÷ label coverage per package)",
  methodology: [
    "The calculator multiplies rectangular room length by width, applies the allowance selected by the user, then divides by the exact package coverage entered from the product label and rounds up to whole packages.",
    "The allowance is not prescribed by flooring type or pattern. Actual needs depend on room geometry, layout, cuts, product instructions, usable offcuts, and installer judgment. Divide irregular rooms into rectangles and avoid double-counting overlap.",
    "This calculator does not estimate installation cost, underlayment, transitions, subfloor preparation, adhesives, stair parts, or long-term repair stock. Confirm all included quantities and installation requirements with the product documentation and installer.",
  ],
  sources: [
    { name: "National Wood Flooring Association: Installation Guidelines", url: "https://nwfa.org/resources/", note: "Wood flooring guidance; product instructions and project conditions govern actual installation." },
  ],
  related: [
    { name: "Tile package calculator", slug: "tile-calculator", description: "Estimate tile packages from area and label coverage" },
    { name: "Hardwood flooring cost", slug: "hardwood-flooring-cost-calculator", description: "Scope and bid-comparison information for hardwood flooring" },
    { name: "Floor refinishing cost", slug: "hardwood-floor-refinishing-cost-calculator", description: "Compare refinishing scope with replacement bids" },
  ],
  faq: [
    { question: "How many flooring packages do I need?", answer: "Measure the floor area, enter coverage per package from the exact product label, and choose a planning allowance suited to your layout. The calculator rounds up to whole packages." },
    { question: "What allowance should I choose?", answer: "There is no universal allowance for every material or layout. Follow product guidance and ask the installer to account for cuts, room shape, and reusable offcuts." },
    { question: "Does this calculate installation cost or underlayment?", answer: "No. It estimates product package count only; installation and additional materials require separate product and project details." },
  ],
};
