import { BacksplashCalculatorExpansion } from "@/content/backsplash-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber, ceilQuantity } from "@/lib/format";

export const backsplashCalculatorConfig: CalculatorConfig = {
  ContentExpansion: BacksplashCalculatorExpansion,
  slug: "backsplash-calculator",
  title: "Backsplash Calculator",
  description: "Estimate backsplash tile packages from measured tiled area, exact package coverage, and a user-selected allowance.",
  categoryLabel: "Flooring",
  category: "flooring",
  bannerHeadline: "Estimate backsplash tile packages.",
  bannerTags: ["Measured net tile area", "Exact package coverage", "Allowance is user-selected"],
  inputs: [
    { id: "area", label: "Measured net area to tile", type: "number", unitImperial: "ft²", unitMetric: "m²", defaultImperial: 27, defaultMetric: 2.51, min: 0.01, step: 0.1 },
    {
      id: "coveragePerPackage", label: "Coverage per package (check label)", type: "number",
      unitImperial: "ft²", unitMetric: "m²", defaultImperial: "", defaultMetric: "", min: 0.01, step: 0.1,
      help: "Enter label coverage for the exact tile product and package format, including sheet coverage for mosaics.",
    },
    {
      id: "allowance", label: "Planning allowance", type: "select", defaultImperial: 0.1,
      options: [
        { label: "0%", value: 0 }, { label: "5%", value: 0.05 },
        { label: "10%", value: 0.1 }, { label: "15%", value: 0.15 },
      ],
      help: "Select with the actual layout, cuts, product guidance, and installer; no pattern-based rate is assumed.",
    },
  ],
  calculate: (values, units) => {
    const area = Number(values.area);
    const coverage = Number(values.coveragePerPackage);
    const allowance = Number(values.allowance);
    if (![area, coverage, allowance].every(Number.isFinite) || area <= 0 || coverage <= 0 ||
        ![0, 0.05, 0.1, 0.15].includes(allowance)) {
      throw new Error("Enter positive measured tile area, exact package coverage, and a listed planning allowance.");
    }
    const adjustedArea = area * (1 + allowance);
    const packages = ceilQuantity(adjustedArea / coverage);
    const areaUnit = units === "metric" ? "m²" : "ft²";
    return {
      value: packages,
      unit: packages === 1 ? "package" : "packages",
      valueRounded: packages,
      breakdown: [
        { label: "measured net tile area", value: `${formatNumber(round(area, 2))} ${areaUnit}` },
        { label: "selected allowance", value: `${round(allowance * 100, 0)}%` },
        { label: "coverage per package", value: `${formatNumber(round(coverage, 2))} ${areaUnit}` },
        { label: "estimated packages", value: `${formatNumber(packages)}` },
      ],
      formulaSteps: [
        `area with selected allowance = ${round(area, 3)} × (1 + ${round(allowance * 100, 0)}%) = ${round(adjustedArea, 3)} ${areaUnit}`,
        `packages = ceil(${round(adjustedArea, 3)} ÷ ${coverage} ${areaUnit}/package) = ${packages}`,
        "The entered area should reflect actual tile surfaces; this estimate does not infer runs, openings, fixture cutouts, layout, or reusable offcuts.",
      ],
    };
  },
  formulaDescription: "packages = ceil((measured tile area × (1 + user-selected allowance)) ÷ exact label coverage)",
  methodology: [
    "Measure each backsplash surface, including separate range or feature areas where applicable, and enter the net area to be tiled. Apply the allowance you selected, divide by the exact package coverage, then round up to whole packages.",
    "Coverage may be stated by area or sheet format. Confirm that the package coverage and entered area use matching units and that the package's coverage applies to the selected product. Layout, cuts, room geometry, breakage, and reusable offcuts affect the final quantity; get the layout checked before ordering.",
    "This calculator does not prescribe backsplash height, subtract outlets/windows, estimate individual tile count, select setting materials, or provide electrical, substrate, waterproofing, or installation guidance. Follow the plans, applicable requirements, product instructions, and qualified tradespeople.",
  ],
  sources: [
    { name: "Tile Council of North America: Tile Installation Resources", url: "https://www.tcnatile.com/", note: "Industry resources; follow product instructions and project-specific installation requirements." },
  ],
  related: [
    { name: "Tile package calculator", slug: "tile-calculator", description: "Estimate packages from measured area and label coverage" },
    { name: "Grout package estimator", slug: "grout-calculator", description: "Estimate grout packages from exact product coverage" },
    { name: "Countertop calculator", slug: "countertop-calculator", description: "Surface area estimate from entered dimensions" },
  ],
  faq: [
    { question: "How many tile packages do I need for a backsplash?", answer: "Measure the net surface area to be tiled, enter coverage for the exact product package, and choose an allowance based on the actual layout and installer guidance. The result rounds up to whole packages." },
    { question: "Does this subtract outlets or windows?", answer: "No. Measure the net tile area yourself. Openings can change both tiled area and cut requirements; this tool does not infer their dimensions or how much material those cuts consume." },
    { question: "Does this calculate tile pieces or installation materials?", answer: "No. It estimates packages using label coverage only. Individual pieces, setting materials, grout, electrical box adjustments, substrate, and installation details require project- and product-specific review." },
  ],
};
