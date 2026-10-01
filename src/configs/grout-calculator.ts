import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber, ceilQuantity } from "@/lib/format";

export const groutCalculatorConfig: CalculatorConfig = {
  slug: "grout-calculator",
  title: "Grout Package Estimator",
  description: "Estimate grout packages from measured tiled area and coverage for the exact product and package. Does not calculate joint yield or select grout type.",
  categoryLabel: "Flooring",
  category: "flooring",
  bannerHeadline: "Estimate grout packages.",
  bannerTags: ["Measured tiled area", "Enter exact product coverage", "No grout selection advice"],
  inputs: [
    { id: "area", label: "Measured tiled area", type: "number", unitImperial: "ft²", unitMetric: "m²", defaultImperial: 120, defaultMetric: 11.15, min: 0.01, step: 1 },
    {
      id: "coveragePerPackage", label: "Coverage per package (check product data)", type: "number",
      unitImperial: "ft²", unitMetric: "m²", defaultImperial: "", defaultMetric: "", min: 0.01, step: 0.1,
      help: "Enter coverage matching the exact grout product, package size, tile, and joint configuration.",
    },
    {
      id: "allowance", label: "Planning allowance", type: "select", defaultImperial: 0.1,
      options: [
        { label: "0%", value: 0 }, { label: "5%", value: 0.05 },
        { label: "10%", value: 0.1 }, { label: "15%", value: 0.15 },
      ],
      help: "User-selected scenario, not a universal waste recommendation.",
    },
  ],
  calculate: (values, units) => {
    const area = Number(values.area);
    const coverage = Number(values.coveragePerPackage);
    const allowance = Number(values.allowance);
    if (![area, coverage, allowance].every(Number.isFinite) || area <= 0 || coverage <= 0 ||
        ![0, 0.05, 0.1, 0.15].includes(allowance)) {
      throw new Error("Enter a positive tiled area, exact product-package coverage, and a listed planning allowance.");
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
        { label: "coverage per package", value: `${formatNumber(round(coverage, 2))} ${areaUnit}` },
        { label: "estimated packages", value: `${formatNumber(packages)}` },
      ],
      formulaSteps: [
        `area with selected allowance = ${round(area, 3)} × (1 + ${round(allowance * 100, 0)}%) = ${round(adjustedArea, 3)} ${areaUnit}`,
        `packages = ceil(${round(adjustedArea, 3)} ÷ ${coverage} ${areaUnit}/package) = ${packages}`,
        "Coverage must apply to the selected product, tile, and joint configuration; no grout volume or type is inferred.",
      ],
    };
  },
  formulaDescription: "packages = ceil((measured tiled area × (1 + user-selected allowance)) ÷ exact package coverage)",
  methodology: [
    "The estimator applies the selected planning allowance to your measured tiled area, divides by the coverage value you enter for the exact grout package and assembly, and rounds up to whole packages.",
    "Coverage varies by grout product, package size, tile dimensions and thickness, joint width and depth, and application details. Use current manufacturer coverage data for the actual materials; if it does not provide an applicable yield, this tool cannot calculate a dependable quantity.",
    "This tool does not calculate grout mass from assumed density, select cementitious or epoxy grout, recommend sanded/unsanded material, or advise installation, sealing, curing, or movement joints. Follow project specifications, product instructions, and qualified tile-setting guidance.",
  ],
  sources: [
    { name: "Tile Council of North America: Tile Installation Resources", url: "https://www.tcnatile.com/", note: "Industry resources; use current manufacturer data for product-specific grout coverage and follow project requirements." },
  ],
  related: [
    { name: "Tile package calculator", slug: "tile-calculator", description: "Estimate tile packages using exact label coverage" },
    { name: "Flooring package calculator", slug: "flooring-calculator", description: "Estimate flooring packages from area and product coverage" },
    { name: "Shower tile package estimator", slug: "shower-tile-calculator", description: "Estimate packages from measured shower tile area" },
  ],
  faq: [
    { question: "How many packages of grout do I need?", answer: "Enter the tiled area and coverage for the exact grout product, package size, tile, and joint configuration. Choose an allowance based on project guidance; the result rounds up to whole packages." },
    { question: "Can this estimate grout from tile size and joint width?", answer: "No. It does not apply a generic grout density or yield formula. Use the selected manufacturer's coverage data for the tile and joint assembly." },
    { question: "Does this choose sanded, unsanded, or epoxy grout?", answer: "No. Select material from project specifications and manufacturer guidance, accounting for tile, joint, substrate, exposure, and other project conditions." },
  ],
};
