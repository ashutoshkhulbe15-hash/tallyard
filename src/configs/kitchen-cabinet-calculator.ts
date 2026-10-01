import type { CalculatorConfig } from "@/lib/types";
import { formatNumber, round, ceilQuantity } from "@/lib/format";

export const kitchenCabinetCalculatorConfig: CalculatorConfig = {
  slug: "kitchen-cabinet-calculator",
  title: "Kitchen Cabinet Run Calculator",
  description:
    "Estimate cabinet run length and rough module count from wall measurements. Confirm openings, corners, fillers, and cabinet sizes in a final plan.",
  categoryLabel: "Kitchen",
  category: "flooring",
  bannerHeadline: "Measure cabinet runs.",
  bannerTags: ["Linear length", "Rough module count", "Planning estimate"],
  inputs: [
    {
      id: "layout",
      label: "Kitchen layout",
      type: "select",
      defaultImperial: "L",
      options: [
        { label: "Single wall", value: "single" },
        { label: "Galley (two walls)", value: "galley" },
        { label: "L-shaped", value: "L" },
        { label: "U-shaped", value: "U" },
        { label: "L + island", value: "Lisland" },
      ],
    },
    {
      id: "wallOneLength",
      label: "Primary wall run",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 12,
      defaultMetric: 3.7,
      min: 0,
      step: 0.5,
    },
    {
      id: "wallTwoLength",
      label: "Second wall run",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 8,
      defaultMetric: 2.4,
      min: 0,
      step: 0.5,
      help: "Enter 0 if there is no second run.",
    },
    {
      id: "wallThreeLength",
      label: "Third wall run",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 0,
      defaultMetric: 0,
      min: 0,
      step: 0.5,
      help: "Enter 0 if there is no third run.",
    },
    {
      id: "islandLength",
      label: "Island cabinet run",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 0,
      defaultMetric: 0,
      min: 0,
      step: 0.5,
    },
  ],
  calculate: (values, units) => {
    const layout = String(values.layout || "L");
    const rawLengths = [
      Number(values.wallOneLength) || 0,
      Number(values.wallTwoLength) || 0,
      Number(values.wallThreeLength) || 0,
    ];
    const island = Number(values.islandLength) || 0;
    const multiplier = units === "metric" ? 1 / 0.3048 : 1;
    const wallRunsFt = rawLengths.map((length) => length * multiplier);
    const islandFt = island * multiplier;
    const wallRunCount = layout === "single" ? 1 : layout === "galley" || layout === "L" || layout === "Lisland" ? 2 : 3;
    const wallLengthFt = wallRunsFt.slice(0, wallRunCount).reduce((sum, length) => sum + length, 0);
    const totalRunFt = wallLengthFt + (layout === "Lisland" ? islandFt : 0);
    const grossWallLength = units === "metric" ? totalRunFt * 0.3048 : totalRunFt;
    const runUnit = units === "metric" ? "m" : "ft";
    const modules = ceilQuantity(totalRunFt / 2); // illustrative 24-inch module width
    const layoutName: Record<string, string> = {
      single: "single wall",
      galley: "galley",
      L: "L-shaped",
      U: "U-shaped",
      Lisland: "L-shaped with island run",
    };

    return {
      value: round(grossWallLength, 1),
      unit: runUnit,
      valueRounded: round(grossWallLength, 1),
      breakdown: [
        { label: "layout", value: layoutName[layout] || "kitchen" },
        { label: "measured wall runs", value: `${formatNumber(round(units === "metric" ? wallLengthFt * 0.3048 : wallLengthFt, 1))} ${runUnit}` },
        ...(layout === "Lisland" ? [{ label: "island run", value: `${formatNumber(round(units === "metric" ? islandFt * 0.3048 : islandFt, 1))} ${runUnit}` }] : []),
        { label: "combined gross run", value: `${formatNumber(round(grossWallLength, 1))} ${runUnit}` },
        { label: "rough 24-inch modules", value: `about ${modules}; openings and corner units not adjusted` },
      ],
      formulaSteps: [
        `layout = ${layoutName[layout] || layout}`,
        `sum entered wall runs = ${formatNumber(round(wallLengthFt, 2))} ft`,
        ...(layout === "Lisland" ? [`add island cabinet run = ${formatNumber(round(islandFt, 2))} ft`] : []),
        `combined gross run = ${formatNumber(round(totalRunFt, 2))} ft = ${formatNumber(round(grossWallLength, 1))} ${runUnit}`,
        `rough modules = ceil(${formatNumber(round(totalRunFt, 2))} ft ÷ 2 ft) = ${modules}; actual cabinet widths and layout will differ`,
      ],
      composition: {
        unit: "ft",
        total: round(totalRunFt, 1),
        segments: [
          { label: "Wall runs", amount: round(wallLengthFt, 1), shade: "primary" },
          ...(layout === "Lisland" ? [{ label: "Island", amount: round(islandFt, 1), shade: "secondary" as const }] : []),
        ],
      },
    };
  },
  formulaDescription:
    "combined gross run = entered wall runs + optional island; rough modules assume 24-inch average width",
  methodology: [
    "The entered wall lengths are added as gross cabinet runs. They are not reduced for appliances, windows, corners, fillers, or end panels. For an L + island layout, the island length is added to the run total.",
    "The module count divides the gross run by an illustrative 24-inch width and rounds up. Actual cabinet widths vary and the final plan must resolve openings, corner units, fillers, appliance clearances, and the manufacturer's available sizes.",
    "No cabinet price is calculated. Product, finish, hardware, delivery, installation, demolition, and site conditions vary; compare current itemized local quotes against a finalized plan.",
  ],
  sources: [
    {
      name: "NKBA Kitchen Planning Guidelines",
      url: "https://nkba.org/guidelines/",
      note: "Planning and clearance considerations for a final kitchen layout.",
    },
  ],
  related: [
    { name: "Countertop calculator", slug: "countertop-calculator", description: "Estimate counter surface area" },
    { name: "Backsplash calculator", slug: "backsplash-calculator", description: "Estimate backsplash material quantities" },
  ],
  faq: [
    {
      question: "Does this estimate how many cabinets I should buy?",
      answer: "It gives a rough module count assuming 24-inch average widths. It does not design the layout or account for actual cabinet sizes, openings, corners, fillers, or clearances. Use a finalized cabinet plan to order.",
    },
    {
      question: "Does it calculate cabinet cost?",
      answer: "No. Cabinet prices depend on the exact product, finish, hardware, delivery, installation, and project conditions. Request current itemized quotes for a finalized plan.",
    },
    {
      question: "How should I measure a kitchen?",
      answer: "Measure each planned cabinet run separately, including the island if present. Note openings, appliance locations, windows, corners, and obstructions for the cabinet designer; this calculator only sums the gross lengths.",
    },
  ],
};
