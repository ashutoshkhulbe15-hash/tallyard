import { MulchCalculatorExpansion } from "@/content/mulch-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const mulchCalculatorConfig: CalculatorConfig = {
  slug: "mulch-calculator",
  title: "Mulch Calculator",
  description:
    "Cubic yards of mulch for any garden bed. Shows bag count if you're buying in bags, and bulk yardage if you're ordering by the truck.",
  categoryLabel: "Landscaping",
  category: "landscaping",

  bannerHeadline: "Mulch efficiently.",
  bannerTags: ["Bulk or bags", "Any depth", "yd³ or m³"],

  inputs: [
    {
      id: "length",
      label: "Bed length",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 20,
      defaultMetric: 6,
      min: 1,
      step: 0.5,
    },
    {
      id: "width",
      label: "Bed width",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 4,
      defaultMetric: 1.2,
      min: 0.5,
      step: 0.5,
    },
    {
      id: "depth",
      label: "Depth",
      type: "select",
      defaultImperial: 3,
      defaultMetric: 7.5,
      options: [
        { label: '1" / 2.5 cm', value: 1 },
        { label: '2" / 5 cm', value: 2 },
        { label: '3" / 7.5 cm', value: 3 },
        { label: '4" / 10 cm', value: 4 },
      ],
      help: "2-3 inches / 5-7.5 cm is standard for most beds",
    },
    {
      id: "form",
      label: "Purchase form",
      type: "select",
      defaultImperial: "bulk",
      options: [
        { label: "Bulk (yd³/m³)", value: "bulk" },
        { label: "Bags (2 cu ft)", value: "bags" },
      ],
    },
  ],

  calculate: (values, units) => {
    const L = Number(values.length) || 0;
    const W = Number(values.width) || 0;
    // Depth stored always in imperial inches scale (1-4). For metric, interpret
    // as cm equivalents: 1 in ≈ 2.5 cm, 2 in = 5 cm, 3 in = 7.5 cm, 4 in = 10 cm.
    const depthSelection = Number(values.depth) || 3;
    const form = String(values.form || "bulk");

    const depthInLinear =
      units === "metric"
        ? (depthSelection * 2.5) / 100
        : depthSelection / 12;

    const area = L * W;
    const volumeInLinearCubed = area * depthInLinear;

    const volumeInYardsOrMeters =
      units === "metric"
        ? volumeInLinearCubed
        : volumeInLinearCubed / 27;

    const unitShort = units === "metric" ? "m³" : "yd³";

    if (form === "bags") {
      // A 2 cu ft bag = 2/27 cubic yards ≈ 0.074 yd³. In metric, 2 cu ft ≈ 0.0566 m³.
      const bagSize = units === "metric" ? 0.0566 : 2 / 27;
      const bagsNeeded = Math.ceil(volumeInYardsOrMeters / bagSize);

      return {
        value: bagsNeeded,
        unit: "bags",
        valueRounded: bagsNeeded,
        breakdown: [
          { label: "area", value: `${formatNumber(round(area, 1))} ${units === "metric" ? "m²" : "ft²"}` },
          { label: "depth", value: units === "metric" ? `${depthSelection * 2.5} cm` : `${depthSelection}"` },
          { label: "volume", value: `${formatNumber(round(volumeInYardsOrMeters, 2))} ${unitShort}` },
        ],
        formulaSteps: [
          `area = ${L} × ${W} = ${formatNumber(round(area, 2))} ${units === "metric" ? "m²" : "ft²"}`,
          units === "metric"
            ? `depth = ${depthSelection * 2.5} cm = ${formatNumber(round(depthInLinear, 3))} m`
            : `depth = ${depthSelection}" = ${formatNumber(round(depthInLinear, 3))} ft`,
          units === "metric"
            ? `volume = ${formatNumber(round(area, 2))} × ${formatNumber(round(depthInLinear, 3))} = ${formatNumber(round(volumeInYardsOrMeters, 3))} m³`
            : `volume = ${formatNumber(round(area, 2))} × ${formatNumber(round(depthInLinear, 3))} = ${formatNumber(round(volumeInLinearCubed, 2))} ft³ ÷ 27 = ${formatNumber(round(volumeInYardsOrMeters, 3))} yd³`,
          `bag size = ${units === "metric" ? "0.0566 m³" : "2 ft³ = 0.074 yd³"}`,
          `bags = ⌈${formatNumber(round(volumeInYardsOrMeters, 3))} ÷ ${bagSize.toFixed(4)}⌉ = ${bagsNeeded} bags`,
        ],
      };
    }

    return {
      value: round(volumeInYardsOrMeters, 3),
      unit: units === "metric" ? "cubic meters" : "cubic yards",
      valueRounded: roundUp(volumeInYardsOrMeters, 2),
      breakdown: [
        { label: "area", value: `${formatNumber(round(area, 1))} ${units === "metric" ? "m²" : "ft²"}` },
        { label: "depth", value: units === "metric" ? `${depthSelection * 2.5} cm` : `${depthSelection}"` },
        { label: "bag equivalent", value: `${Math.ceil(volumeInYardsOrMeters / (units === "metric" ? 0.0566 : 2 / 27))} bags` },
      ],
      formulaSteps: [
        `area = ${L} × ${W} = ${formatNumber(round(area, 2))} ${units === "metric" ? "m²" : "ft²"}`,
        units === "metric"
          ? `depth = ${depthSelection * 2.5} cm = ${formatNumber(round(depthInLinear, 3))} m`
          : `depth = ${depthSelection}" = ${formatNumber(round(depthInLinear, 3))} ft`,
        units === "metric"
          ? `volume = ${formatNumber(round(area, 2))} × ${formatNumber(round(depthInLinear, 3))} = ${formatNumber(round(volumeInYardsOrMeters, 3))} m³`
          : `volume = ${formatNumber(round(area, 2))} × ${formatNumber(round(depthInLinear, 3))} = ${formatNumber(round(volumeInLinearCubed, 2))} ft³ ÷ 27 = ${formatNumber(round(volumeInYardsOrMeters, 3))} yd³`,
        `rounded up to ${formatNumber(roundUp(volumeInYardsOrMeters, 2))} ${unitShort}`,
      ],
    };
  },

  ContentExpansion: MulchCalculatorExpansion,

  formulaDescription:
    "volume = area × depth, converted to cubic yards or meters (or bags)",

  methodology: [
    "The calculator multiplies bed area (length × width) by depth to compute total volume. Depth is entered in inches or centimeters and converted to feet or meters before the multiplication so everything is in consistent units.",
    "Imperial results are converted from cubic feet to cubic yards by dividing by 27. Cubic yards is the standard bulk sale unit at landscape suppliers. Metric results stay in cubic meters directly.",
    "For bag calculations, the standard bag is 2 cubic feet of mulch (which is 0.074 cubic yards or about 0.057 cubic meters). Bags round up to the nearest whole bag because you can't buy a partial bag.",
    "The right depth depends on your goals: 2 inches keeps weeds down in established beds; 3 inches is standard for new beds or areas needing moisture retention; 4 inches is for heavily weeded areas or around shrubs. Going deeper than 4 inches can suffocate plant roots.",
  ],

  sources: [
    {
      name: "University of Maryland Extension — Mulch Basics",
      url: "https://extension.umd.edu/resource/mulching-landscape",
      note: "Academic reference for proper mulch depth and application",
    },
    {
      name: "Sunset Magazine — Mulch Guide",
      url: "https://www.sunset.com/garden/landscaping-design/mulch-basics",
      note: "Practical coverage and depth recommendations",
    },
  ],

  related: [
    { name: "Gravel calculator", slug: "gravel-calculator", description: "Cubic yards for paths and base layers" },
    { name: "Topsoil calculator", slug: "topsoil-calculator", description: "Volume for garden bed filling" },
    { name: "Sod calculator", slug: "sod-calculator", description: "Square footage of sod for any yard" },
    { name: "Concrete calculator", slug: "concrete-calculator", description: "Cubic yards for any slab or footing" },
  ],

  faq: [
    {
      question: "How much mulch do I need?",
      answer:
        "Depends on bed size and depth. A 20 × 4 ft bed at 3 inches deep needs about 0.75 cubic yards (about 10 bags). Use the calculator above for exact numbers. Most residential beds need between 0.5 and 3 cubic yards.",
    },
    {
      question: "How deep should I apply mulch?",
      answer:
        "2-3 inches is standard for most garden beds. Go deeper (3-4 inches) for new beds, weedy areas, or around shrubs. Don't exceed 4 inches — too much mulch smothers plant roots and can cause rot. For refreshing existing mulch, 1 inch is often enough.",
    },
    {
      question: "Is bulk mulch cheaper than bagged?",
      answer:
        "Usually significantly cheaper per cubic yard. Bagged mulch runs $3-6 per 2 cu ft bag; bulk mulch from a landscape supplier is typically $25-40 per cubic yard. Bulk is cheaper if you need more than about 10 bags (roughly 0.75 yards). Below that, bags are more practical because of delivery minimums.",
    },
    {
      question: "How many bags of mulch are in a cubic yard?",
      answer:
        "A cubic yard equals about 13.5 bags of 2 cu ft mulch. So for a yard of mulch you'd need 14 bags (rounding up). Bags are easy to carry home; bulk requires a truck or delivery but is much cheaper per yard.",
    },
    {
      question: "What's the difference between a cubic yard and a regular yard?",
      answer:
        "A regular yard is a linear measurement (3 feet). A cubic yard is a volume (3 ft × 3 ft × 3 ft = 27 cubic feet). Mulch is always sold by the cubic yard. When a supplier says 'a yard of mulch,' they mean one cubic yard.",
    },
    {
      question: "When is the best time to mulch?",
      answer:
        "Early spring is ideal — after the soil warms but before summer heat. Mulch applied in early spring suppresses weeds before they emerge and conserves moisture through summer. Avoid mulching over cold, wet soil in winter (can promote rot) or over dry soil in peak summer (water first).",
    },
    {
      question: "Does the calculator work for gravel or stone?",
      answer:
        "The volume math is identical for any bulk material — gravel, stone, sand, topsoil, compost. But bag sizes differ: stone bags are typically 0.5 cu ft, gravel is often sold by weight (tons). For gravel and stone, use the dedicated gravel calculator.",
    },
    {
      question: "How much area does 1 cubic yard of mulch cover?",
      answer:
        "At 3 inches deep: about 108 sq ft. At 2 inches: 162 sq ft. At 4 inches: 81 sq ft. The rule of thumb: one cubic yard covers 100 square feet at 3 inches deep.",
    },
  ],
};
