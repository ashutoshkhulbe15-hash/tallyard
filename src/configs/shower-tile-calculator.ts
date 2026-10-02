import { ShowerTileCalculatorExpansion } from "@/content/shower-tile-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber, ceilQuantity } from "@/lib/format";

export const showerTileCalculatorConfig: CalculatorConfig = {
  ContentExpansion: ShowerTileCalculatorExpansion,
  slug: "shower-tile-calculator",
  title: "Shower Tile Calculator",
  description: "Estimate tile packages from a user-measured total tiled area, exact package coverage, and a selected planning allowance.",
  categoryLabel: "Flooring",
  category: "flooring",
  bannerHeadline: "Estimate shower tile quantity.",
  bannerTags: ["Enter measured tiled area", "Use label coverage", "Not waterproofing design"],
  inputs: [
    {
      id: "tileArea", label: "Total tiled area (measure surfaces separately)", type: "number",
      unitImperial: "ft²", unitMetric: "m²", defaultImperial: 80, defaultMetric: 7.4, min: 0.01, step: 0.1,
      help: "Add the actual wall/floor surface areas that will receive this tile; this tool does not infer niches, curbs, or slope.",
    },
    {
      id: "coveragePerPackage", label: "Coverage per package (check label)", type: "number",
      unitImperial: "ft²", unitMetric: "m²", defaultImperial: "", defaultMetric: "", min: 0.01, step: 0.1,
      help: "Use the coverage printed for the exact tile product and package.",
    },
    {
      id: "allowance", label: "Planning allowance", type: "select", defaultImperial: 0.15,
      options: [
        { label: "0%", value: 0 }, { label: "5%", value: 0.05 },
        { label: "10%", value: 0.1 }, { label: "15%", value: 0.15 },
      ],
      help: "Select a scenario using your layout and installer/product guidance; no shower-specific waste factor is prescribed.",
    },
  ],
  calculate: (values, units) => {
    const area = Number(values.tileArea);
    const coverage = Number(values.coveragePerPackage);
    const allowance = Number(values.allowance);
    if (![area, coverage, allowance].every(Number.isFinite) || area <= 0 || coverage <= 0 ||
        ![0, 0.05, 0.1, 0.15].includes(allowance)) {
      throw new Error("Enter positive measured tiled area and exact package coverage from its label, then choose a listed planning allowance.");
    }
    const adjustedArea = area * (1 + allowance);
    const packages = ceilQuantity(adjustedArea / coverage);
    const areaUnit = units === "metric" ? "m²" : "ft²";
    return {
      value: packages,
      unit: packages === 1 ? "package" : "packages",
      valueRounded: packages,
      breakdown: [
        { label: "measured tiled area", value: `${formatNumber(round(area, 2))} ${areaUnit}` },
        { label: "selected allowance", value: `${round(allowance * 100, 0)}%` },
        { label: "area including selected allowance", value: `${formatNumber(round(adjustedArea, 2))} ${areaUnit}` },
        { label: "coverage per package", value: `${formatNumber(round(coverage, 2))} ${areaUnit}` },
      ],
      formulaSteps: [
        `measured tiled area = ${round(area, 3)} ${areaUnit}`,
        `area with selected allowance = ${round(area, 3)} × (1 + ${round(allowance * 100, 0)}%) = ${round(adjustedArea, 3)} ${areaUnit}`,
        `packages = ceil(${round(adjustedArea, 3)} ÷ ${coverage}) = ${packages}`,
        "This estimate does not model tile layout, cuts, niche/curb surfaces, waterproofing, substrate, slope, or grout.",
      ],
    };
  },
  formulaDescription: "packages = ceil((user-measured tiled area × (1 + user-selected allowance)) ÷ label coverage per package)",
  methodology: [
    "Measure each intended tiled surface and enter the summed area. The estimator applies the selected allowance, divides by the exact package coverage entered from the tile label, and rounds up to whole packages.",
    "Complex layouts, niches, curbs, benches, floor slope, cuts, and product orientation require a surface-specific takeoff. This tool does not infer those areas or prescribe an allowance; review a drawing or ask the installer to check the takeoff.",
    "Tile quantity is separate from waterproofing, shower-pan construction, drainage, substrate preparation, grout, mortar, and code compliance. Follow the selected waterproofing system's complete instructions and obtain qualified design where needed.",
  ],
  sources: [
    { name: "Tile Council of North America: Tile Installation Resources", url: "https://www.tcnatile.com/", note: "Industry resources; manufacturer system instructions and project-specific details govern shower construction." },
  ],
  related: [
    { name: "Tile package calculator", slug: "tile-calculator", description: "Estimate packages from area and exact label coverage" },
    { name: "Grout calculator", slug: "grout-calculator", description: "Preliminary grout quantity estimate; confirm with product manufacturer" },
  ],
  faq: [
    { question: "How many boxes of shower tile do I need?", answer: "Measure all tiled surfaces, enter the total and package coverage from the exact product label, then choose an allowance based on the layout with installer guidance. The result rounds up to whole packages." },
    { question: "Does this include niche, curb, or shower-floor measurements?", answer: "No. Enter the total area you have measured; add every surface receiving this tile, including niche or curb faces. A separate floor tile product should be calculated separately." },
    { question: "Does this plan the shower waterproofing?", answer: "No. Tile is not a waterproofing system. Follow the complete instructions for a compatible shower system and applicable local requirements; consult a qualified professional." },
  ],
};
