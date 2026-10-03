import { MulchCalculatorExpansion } from "@/content/mulch-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber, ceilQuantity } from "@/lib/format";

export const mulchCalculatorConfig: CalculatorConfig = {
  ContentExpansion: MulchCalculatorExpansion,
  slug: "mulch-calculator",
  title: "Mulch Calculator",
  description:
    "Estimate mulch volume from a rectangular area and user-selected depth, with an optional count for nominal 2 ft³ bags.",
  categoryLabel: "Landscaping",
  category: "landscaping",

  bannerHeadline: "Mulch efficiently.",
  bannerTags: ["Volume or nominal bags", "User-selected depth", "Planning estimate"],

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
      defaultMetric: 3,
      options: [
        { label: '1 in / 2.54 cm', value: 1 },
        { label: '2 in / 5.08 cm', value: 2 },
        { label: '3 in / 7.62 cm', value: 3 },
        { label: '4 in / 10.16 cm', value: 4 },
      ],
      help: "Values are fixed inch-based presets shown in both unit modes; depth is an input, not a recommendation.",
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
    // Depth select values are inches in both unit modes.
    const depthSelection = Number(values.depth) || 3;
    const form = String(values.form || "bulk");

    const depthInLinear =
      units === "metric"
        ? (depthSelection * 2.54) / 100
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
      const bagSize = units === "metric" ? 2 * 0.028316846592 : 2 / 27;
      const bagsNeeded = ceilQuantity(volumeInYardsOrMeters / bagSize);

      return {
        value: bagsNeeded,
        unit: "bags",
        valueRounded: bagsNeeded,
        breakdown: [
          { label: "area", value: `${formatNumber(round(area, 1))} ${units === "metric" ? "m²" : "ft²"}` },
          { label: "depth", value: units === "metric" ? `${depthSelection * 2.54} cm` : `${depthSelection}"` },
          { label: "volume", value: `${formatNumber(round(volumeInYardsOrMeters, 2))} ${unitShort}` },
        ],
        formulaSteps: [
          `area = ${L} × ${W} = ${formatNumber(round(area, 2))} ${units === "metric" ? "m²" : "ft²"}`,
          units === "metric"
            ? `depth = ${depthSelection * 2.54} cm = ${formatNumber(round(depthInLinear, 4))} m`
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
        { label: "depth", value: units === "metric" ? `${depthSelection * 2.54} cm` : `${depthSelection}"` },
        { label: "bag equivalent", value: `${ceilQuantity(volumeInYardsOrMeters / (units === "metric" ? 2 * 0.028316846592 : 2 / 27))} nominal 2 ft³ bags` },
      ],
      formulaSteps: [
        `area = ${L} × ${W} = ${formatNumber(round(area, 2))} ${units === "metric" ? "m²" : "ft²"}`,
        units === "metric"
          ? `depth = ${depthSelection * 2.54} cm = ${formatNumber(round(depthInLinear, 4))} m`
          : `depth = ${depthSelection}" = ${formatNumber(round(depthInLinear, 3))} ft`,
        units === "metric"
          ? `volume = ${formatNumber(round(area, 2))} × ${formatNumber(round(depthInLinear, 3))} = ${formatNumber(round(volumeInYardsOrMeters, 3))} m³`
          : `volume = ${formatNumber(round(area, 2))} × ${formatNumber(round(depthInLinear, 3))} = ${formatNumber(round(volumeInLinearCubed, 2))} ft³ ÷ 27 = ${formatNumber(round(volumeInYardsOrMeters, 3))} yd³`,
        `rounded up to ${formatNumber(roundUp(volumeInYardsOrMeters, 2))} ${unitShort}`,
      ],
    };
  },

  formulaDescription:
    "volume = area × depth, converted to cubic yards or meters (or bags)",

  methodology: [
    "The calculator multiplies a rectangular bed area by the user-selected depth and converts the volume to cubic yards or cubic metres. The depth presets are inch values and are converted using 1 inch = 2.54 cm, including in metric mode.",
    "The optional bag estimate assumes nominal 2 ft³ bags. Actual labeled fill volume, settling, and supplier ordering quantities may differ; check the package and supplier quote.",
    "This calculator does not recommend mulch depth or assess plant, soil, drainage, or site conditions. Use plant-specific and local horticultural guidance to choose depth and material.",
  ],

  sources: [
    {
      name: "University of Maryland Extension: Mulching Trees and Shrubs",
      url: "https://extension.umd.edu/resource/mulching-trees-and-shrubs",
      note: "Horticultural background; the calculator does not make a depth recommendation.",
    },
    {
      name: "Sunset Magazine: Mulch Guide",
      url: "https://www.sunset.com/garden/landscaping-design/mulch-basics",
      note: "General background; verify plant-specific guidance for an actual landscape.",
    },
  ],

  related: [
    { name: "Rainwater runoff estimator", slug: "rainwater-calculator", description: "Estimate rainfall-event runoff volume from a catchment area" },
    { name: "Topsoil calculator", slug: "topsoil-calculator", description: "Volume for garden bed filling" },
    { name: "Sod calculator", slug: "sod-calculator", description: "Square footage of sod for any yard" },
    { name: "Pool chlorine mass estimator", slug: "pool-chlorine-calculator", description: "Theoretical mass estimate from measured values and user-entered label strength; not dosing instructions" },
  ],

  faq: [
    { question: "How is mulch volume calculated?", answer: "The calculator multiplies the rectangular area by the depth you select. Irregular areas or multiple depths should be measured as separate sections." },
    { question: "How many bags are in the estimate?", answer: "The bag count assumes nominal 2 ft³ bags and rounds up to whole bags. Verify the actual volume on the package." },
    { question: "Does this recommend a mulch depth or tell me which mulch to use?", answer: "No. Depth and material depend on plants, soil, and site conditions. Consult plant-specific or local horticultural guidance." },
    { question: "Does this estimate current bulk or bag prices?", answer: "No. Prices, delivery minimums, and package volumes vary by supplier and location; request a current quote and check product labels." },
  ],
};
