import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber, ceilQuantity } from "@/lib/format";

const packageFormats = {
  slab: { coverageSqFt: 16 * 24 / 144, label: "16 × 24 in slab" },
  smallRoll: { coverageSqFt: 2 * 5, label: "2 × 5 ft roll" },
  largeRoll: { coverageSqFt: 3.3 * 6, label: "3.3 × 6 ft roll" },
};

export const sodCalculatorConfig: CalculatorConfig = {
  slug: "sod-calculator",
  title: "Sod Area and Piece Calculator",
  description:
    "Estimate lawn area and piece count from a rectangular measurement, selected package format, and user-set planning allowance.",
  categoryLabel: "Landscaping",
  category: "landscaping",
  bannerHeadline: "Estimate sod quantity.",
  bannerTags: ["Rectangular area", "Selected package format", "Planning allowance"],
  inputs: [
    {
      id: "length",
      label: "Lawn section length",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 40,
      defaultMetric: 12,
      min: 0.1,
      step: 1,
    },
    {
      id: "width",
      label: "Lawn section width",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 25,
      defaultMetric: 7.5,
      min: 0.1,
      step: 1,
    },
    {
      id: "allowance",
      label: "Planning allowance",
      type: "select",
      defaultImperial: 5,
      options: [
        { label: "0%", value: 0 },
        { label: "5%", value: 5 },
        { label: "10%", value: 10 },
        { label: "15%", value: 15 },
      ],
      help: "This is a user-selected scenario, not a shape-specific recommendation.",
    },
    {
      id: "packageFormat",
      label: "Example piece format",
      type: "select",
      defaultImperial: "slab",
      options: [
        { label: "16 × 24 in slab (2.67 ft² / 0.248 m²)", value: "slab" },
        { label: "2 × 5 ft roll (10 ft² / 0.929 m²)", value: "smallRoll" },
        { label: "3.3 × 6 ft roll (19.8 ft² / 1.84 m²)", value: "largeRoll" },
      ],
      help: "Example dimensions only. Confirm the actual coverage on the supplier's product listing.",
    },
  ],
  calculate: (values, units) => {
    const length = Math.max(0, Number(values.length) || 0);
    const width = Math.max(0, Number(values.width) || 0);
    const allowance = Math.max(0, Number(values.allowance) || 0);
    const packageFormat = String(values.packageFormat || "slab") as keyof typeof packageFormats;
    const format = packageFormats[packageFormat] ?? packageFormats.slab;
    const metric = units === "metric";
    const areaInput = length * width;
    const areaSqFt = metric ? areaInput / 0.09290304 : areaInput;
    const withAllowanceSqFt = areaSqFt * (1 + allowance / 100);
    const pieces = ceilQuantity(withAllowanceSqFt / format.coverageSqFt);
    const areaUnit = metric ? "m²" : "ft²";
    const area = metric ? areaInput : areaSqFt;
    const withAllowance = metric ? withAllowanceSqFt * 0.09290304 : withAllowanceSqFt;
    const packageCoverage = metric ? format.coverageSqFt * 0.09290304 : format.coverageSqFt;

    return {
      value: pieces,
      unit: `example ${format.label}${pieces === 1 ? " piece" : " pieces"}`,
      valueRounded: pieces,
      breakdown: [
        { label: "measured rectangular area", value: `${formatNumber(round(area, 2))} ${areaUnit}` },
        { label: "area with selected allowance", value: `${formatNumber(round(withAllowance, 2))} ${areaUnit}` },
        { label: "selected example coverage", value: `${formatNumber(round(packageCoverage, 3))} ${areaUnit} per piece` },
        { label: "estimated pieces", value: `${pieces} (verify supplier format and coverage)` },
      ],
      formulaSteps: [
        `rectangular area = ${formatNumber(length)} × ${formatNumber(width)} = ${formatNumber(round(area, 2))} ${areaUnit}`,
        `selected allowance = ${allowance}%`,
        `area with allowance = ${formatNumber(round(area, 2))} × ${(1 + allowance / 100).toFixed(2)} = ${formatNumber(round(withAllowance, 2))} ${areaUnit}`,
        `piece coverage = ${format.label} = ${formatNumber(round(packageCoverage, 3))} ${areaUnit}`,
        `piece estimate = ceil(${formatNumber(round(withAllowance, 2))} ÷ ${formatNumber(round(packageCoverage, 3))}) = ${pieces}`,
      ],
      composition: {
        unit: areaUnit,
        total: round(withAllowance, 2),
        segments: [
          { label: "Measured lawn area", amount: round(area, 2), shade: "primary" },
          ...(allowance > 0 ? [{ label: "Selected planning allowance", amount: round(withAllowance - area, 2), shade: "secondary" as const }] : []),
        ],
      },
    };
  },
  formulaDescription: "piece estimate = ceil(rectangular area × (1 + selected allowance) ÷ selected package coverage)",
  methodology: [
    "The calculator measures a rectangular section, applies the user's selected planning allowance, and divides by the selected example piece area. For irregular lawns, divide the plan into rectangles and add the measured areas; this tool does not infer shape-related waste.",
    "The package formats are example dimensions, not universal retail standards. Actual sod products and pallet coverage vary by supplier and region. Confirm the coverage, piece count, and pallet packaging on the current supplier quote or product information.",
    "This is a quantity estimate only. It does not advise on grass variety, soil preparation, planting season, installation, watering, transport, weight, pallet count, or price.",
  ],
  sources: [
    {
      name: "Turfgrass Producers International: Consumer Resources",
      url: "https://www.turfgrasssod.org/consumers/",
      note: "General sod information; package dimensions and availability should be confirmed with the supplier.",
    },
    {
      name: "Clemson Cooperative Extension: Sodding a Lawn",
      url: "https://hgic.clemson.edu/factsheet/sodding-a-lawn/",
      note: "Extension resource for project-specific lawn establishment guidance.",
    },
  ],
  related: [
    { name: "Topsoil calculator", slug: "topsoil-calculator", description: "Estimate soil volume from area and selected depth" },
    { name: "Mulch calculator", slug: "mulch-calculator", description: "Estimate mulch volume or nominal bag count" },
    { name: "Gravel calculator", slug: "gravel-calculator", description: "Estimate aggregate volume and approximate weight" },
  ],
  faq: [
    {
      question: "How many sod pieces do I need?",
      answer: "Measure each rectangular section, choose a planning allowance and an example package format, and the calculator divides adjusted area by the selected coverage. Verify actual product dimensions with the supplier.",
    },
    {
      question: "Does this calculator estimate pallet quantities?",
      answer: "No. Pallet quantities and coverage vary by sod supplier. Use the piece/area estimate to request a current pallet and delivery quote.",
    },
    {
      question: "Does this recommend sod variety, installation, or watering?",
      answer: "No. Grass suitability and establishment depend on local conditions and species. Consult local extension guidance and the sod supplier for those decisions.",
    },
    {
      question: "Does the planning allowance have to match my lawn shape?",
      answer: "No. It is a user-selected scenario. For a more precise estimate, divide an irregular lawn into rectangles and account for cuts and unusable offcuts based on your layout and supplier advice.",
    },
  ],
};
