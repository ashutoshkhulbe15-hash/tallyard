import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber, ceilQuantity } from "@/lib/format";

export const tileCalculatorConfig: CalculatorConfig = {
  slug: "tile-calculator",
  title: "Tile Package Calculator",
  description: "Estimate tile packages from rectangular area, the coverage printed on the package, and a user-selected planning allowance.",
  categoryLabel: "Flooring",
  category: "flooring",
  bannerHeadline: "Estimate tile quantity.",
  bannerTags: ["Rectangular area", "Enter package coverage", "Allowance is user-selected"],
  inputs: [
    { id: "length", label: "Area length", type: "number", unitImperial: "ft", unitMetric: "m", defaultImperial: 10, defaultMetric: 3, min: 0.1, step: 0.5 },
    { id: "width", label: "Area width", type: "number", unitImperial: "ft", unitMetric: "m", defaultImperial: 12, defaultMetric: 3.7, min: 0.1, step: 0.5 },
    {
      id: "coveragePerPackage", label: "Coverage per package (check label)", type: "number",
      unitImperial: "ft²", unitMetric: "m²", defaultImperial: "", defaultMetric: "", min: 0.01, step: 0.1,
      help: "Enter coverage for the exact tile product and package; tile count per box varies by product.",
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
      throw new Error("Enter positive area dimensions and the exact package coverage from its label, then choose a listed planning allowance.");
    }
    const area = length * width;
    const adjustedArea = area * (1 + allowance);
    const packages = ceilQuantity(adjustedArea / coverage);
    const areaUnit = units === "metric" ? "m²" : "ft²";
    return {
      value: packages,
      unit: packages === 1 ? "package" : "packages",
      valueRounded: packages,
      breakdown: [
        { label: "rectangular area", value: `${formatNumber(round(area, 2))} ${areaUnit}` },
        { label: "selected allowance", value: `${round(allowance * 100, 0)}%` },
        { label: "area including selected allowance", value: `${formatNumber(round(adjustedArea, 2))} ${areaUnit}` },
        { label: "coverage per package", value: `${formatNumber(round(coverage, 2))} ${areaUnit}` },
      ],
      formulaSteps: [
        `area = ${length} × ${width} = ${round(area, 3)} ${areaUnit}`,
        `area with selected allowance = ${round(area, 3)} × (1 + ${round(allowance * 100, 0)}%) = ${round(adjustedArea, 3)} ${areaUnit}`,
        `packages = ceil(${round(adjustedArea, 3)} ÷ ${coverage}) = ${packages}`,
        "This estimate does not model tile layout, cuts, borders, niches, reusable offcuts, substrate, or grout.",
      ],
    };
  },
  formulaDescription: "packages = ceil((rectangular area × (1 + user-selected allowance)) ÷ label coverage per package)",
  methodology: [
    "The calculator multiplies the entered rectangular dimensions, applies the user-selected allowance, divides by coverage printed on the exact tile package, and rounds up to whole packages.",
    "The allowance is not prescribed by tile format or pattern. Actual quantity depends on the room shape, layout, borders, cuts, tile orientation, breakage, and reusable offcuts. Ask the installer or supplier to review the layout before purchase.",
    "This calculator does not estimate individual tile count, grout, mortar, underlayment, waterproofing, substrate preparation, or installation design. Confirm the complete material list and project requirements separately.",
  ],
  sources: [
    { name: "Tile Council of North America: Tile Installation Resources", url: "https://www.tcnatile.com/", note: "Industry resources; use manufacturer instructions and project-specific guidance for layout and installation." },
  ],
  related: [
    { name: "Flooring package calculator", slug: "flooring-calculator", description: "Estimate flooring packages from area and label coverage" },
    { name: "Grout calculator", slug: "grout-calculator", description: "Preliminary grout quantity estimate from tile and joint dimensions" },
    { name: "Shower tile calculator", slug: "shower-tile-calculator", description: "Estimate shower surface area from entered dimensions" },
  ],
  faq: [
    { question: "How many boxes of tile do I need?", answer: "Enter the area, coverage listed on the exact product package, and an allowance selected for the layout. The calculator rounds up to whole packages." },
    { question: "How much extra tile should I buy?", answer: "The required margin depends on layout, cuts, room geometry, and installer recommendations. This calculator does not prescribe a waste percentage." },
    { question: "Does this calculate individual tile count or grout?", answer: "No. It estimates whole packages from package coverage; individual tile count, grout, and other installation materials need separate product and project information." },
  ],
};
