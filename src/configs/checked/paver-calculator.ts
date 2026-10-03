import { PaverCalculatorExpansion } from "@/content/paver-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber, ceilQuantity } from "@/lib/format";

export const paverCalculatorConfig: CalculatorConfig = {
  ContentExpansion: PaverCalculatorExpansion,
  slug: "paver-calculator",
  title: "Paver Calculator",
  description: "Estimate paver count for a rectangular area using selected nominal dimensions and a user-selected planning allowance.",
  categoryLabel: "Landscaping",
  category: "landscaping",
  bannerHeadline: "Estimate paver quantity.",
  bannerTags: ["Rectangular area", "Selected paver size", "Planning allowance is adjustable"],
  inputs: [
    { id: "length", label: "Area length", type: "number", unitImperial: "ft", unitMetric: "m", defaultImperial: 12, defaultMetric: 3.7, min: 0.1, step: 0.5 },
    { id: "width", label: "Area width", type: "number", unitImperial: "ft", unitMetric: "m", defaultImperial: 10, defaultMetric: 3, min: 0.1, step: 0.5 },
    {
      id: "paverSize", label: "Nominal paver face size", type: "select", defaultImperial: "4x8",
      options: [
        { label: "4 × 8 in", value: "4x8" }, { label: "6 × 6 in", value: "6x6" },
        { label: "6 × 9 in", value: "6x9" }, { label: "8 × 8 in", value: "8x8" },
        { label: "12 × 12 in", value: "12x12" }, { label: "16 × 16 in", value: "16x16" },
      ],
      help: "Confirm actual product dimensions and coverage with the supplier.",
    },
    {
      id: "allowance", label: "Planning allowance", type: "select", defaultImperial: 0.1,
      options: [
        { label: "0%", value: 0 }, { label: "5%", value: 0.05 },
        { label: "10%", value: 0.1 }, { label: "15%", value: 0.15 },
      ],
      help: "A scenario you choose, not a pattern-specific or layout recommendation.",
    },
  ],
  calculate: (values, units) => {
    const length = Number(values.length) || 0;
    const width = Number(values.width) || 0;
    const allowance = Number(values.allowance) || 0;
    const size = String(values.paverSize || "4x8");
    const dimensions: Record<string, [number, number]> = {
      "4x8": [4, 8], "6x6": [6, 6], "6x9": [6, 9], "8x8": [8, 8], "12x12": [12, 12], "16x16": [16, 16],
    };
    const [sideA, sideB] = dimensions[size] || dimensions["4x8"];
    const area = length * width;
    const areaSqFt = units === "metric" ? area / 0.09290304 : area;
    const paverAreaSqFt = (sideA * sideB) / 144;
    const count = ceilQuantity((areaSqFt / paverAreaSqFt) * (1 + allowance));
    const shownArea = units === "metric" ? area : areaSqFt;
    const areaUnit = units === "metric" ? "m²" : "ft²";
    const paverArea = units === "metric" ? paverAreaSqFt * 0.09290304 : paverAreaSqFt;
    return {
      value: count,
      unit: count === 1 ? "paver" : "pavers",
      valueRounded: count,
      breakdown: [
        { label: "rectangular area", value: `${formatNumber(round(shownArea, 2))} ${areaUnit}` },
        { label: "nominal face area per paver", value: `${formatNumber(round(paverArea, 4))} ${areaUnit}` },
        { label: "selected planning allowance", value: `${formatNumber(round(allowance * 100, 0))}%` },
      ],
      formulaSteps: [
        `area = ${length} × ${width} = ${formatNumber(round(shownArea, 2))} ${areaUnit}`,
        `nominal paver face = ${sideA} × ${sideB} in`,
        `estimated count = ceil(area ÷ nominal face area × (1 + ${round(allowance * 100, 0)}%)) = ${count}`,
        "This area-based estimate does not model bond pattern, joint width, cuts, borders, or usable offcuts.",
      ],
    };
  },
  formulaDescription: "estimated paver count = ceil(rectangular area ÷ nominal paver face area × (1 + user-selected allowance))",
  methodology: [
    "The estimate divides rectangular project area by the selected nominal paver face area and applies the allowance selected by the user.",
    "Actual coverage depends on the product's installed dimensions, joint spacing, bond pattern, borders, cuts, and layout. Check the manufacturer or supplier coverage data and make a layout plan before ordering.",
    "This tool does not estimate base aggregate, bedding material, jointing material, excavation, drainage, edge restraint, or structural suitability. It is not installation guidance.",
  ],
  sources: [
    { name: "Concrete Masonry & Hardscapes Association: Homeowner resources", url: "https://www.masonryandhardscapes.org/", note: "General hardscape information; use product-specific installation guidance for a project." },
  ],
  related: [
    { name: "Gravel calculator", slug: "gravel-calculator", description: "Estimate area-based aggregate volume and approximate weight" },
    { name: "Concrete calculator", slug: "concrete-calculator", description: "Estimate concrete volume" },
    { name: "Brick calculator", slug: "brick-calculator", description: "Estimate brick quantities from wall dimensions" },
  ],
  faq: [
    { question: "How many pavers do I need?", answer: "Enter the rectangular dimensions, select nominal paver dimensions, and choose a planning allowance. Confirm actual installed coverage and account for the layout and cuts before ordering." },
    { question: "Does this estimate base, bedding, or jointing material?", answer: "No. Those quantities depend on the project design, material specifications, joint dimensions, site, and installation method." },
    { question: "Does the allowance account for my pattern or cuts?", answer: "No. It is a user-selected scenario and does not model the bond pattern, borders, cut plan, or reusable offcuts." },
  ],
};
