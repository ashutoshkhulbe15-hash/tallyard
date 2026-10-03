import { InsulationCalculatorExpansion } from "@/content/insulation-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber, ceilQuantity } from "@/lib/format";

export const insulationCalculatorConfig: CalculatorConfig = {
  ContentExpansion: InsulationCalculatorExpansion,
  slug: "insulation-calculator",
  title: "Insulation Calculator",
  description: "Estimate package count from measured area, exact product-label coverage, and a user-selected allowance. Does not recommend R-value or insulation type.",
  categoryLabel: "Insulation",
  category: "drywall",
  bannerHeadline: "Count from the label.",
  bannerTags: ["Measured area", "Exact package coverage", "No R-value recommendation"],
  inputs: [
    { id: "area", label: "Measured net area", type: "number", unitImperial: "ft²", unitMetric: "m²", defaultImperial: 1200, defaultMetric: 111.5, min: 0.01, step: 1 },
    { id: "coverage", label: "Coverage per package from product label", type: "number", unitImperial: "ft²/package", unitMetric: "m²/package", defaultImperial: 40, defaultMetric: 3.72, min: 0.01, step: 0.1 },
    { id: "allowance", label: "User-selected planning allowance", type: "select", defaultImperial: "0", options: [
      { label: "0%", value: "0" }, { label: "5%", value: "5" }, { label: "10%", value: "10" }, { label: "15%", value: "15" },
    ] },
  ],
  calculate: (values, units) => {
    const area = Number(values.area);
    const coverage = Number(values.coverage);
    const allowance = Number(values.allowance);
    if (![area, coverage, allowance].every(Number.isFinite) || area <= 0 || coverage <= 0 || ![0, 5, 10, 15].includes(allowance)) {
      throw new Error("Enter positive measured area and product coverage, and select a listed allowance.");
    }
    const adjustedArea = area * (1 + allowance / 100);
    const packages = ceilQuantity(adjustedArea / coverage);
    return {
      value: packages,
      unit: packages === 1 ? "package estimate" : "packages estimate",
      valueRounded: packages,
      breakdown: [
        { label: "measured net area", value: `${formatNumber(round(area, 2))} ${units === "metric" ? "m²" : "ft²"}` },
        { label: "selected allowance", value: `${allowance}%` },
        { label: "entered label coverage", value: `${formatNumber(round(coverage, 2))} ${units === "metric" ? "m²" : "ft²"} per package` },
        { label: "package count estimate", value: `${packages}` },
        { label: "R-value and product suitability", value: "not assessed" },
      ],
      formulaSteps: [
        `adjusted area = ${formatNumber(round(area, 2))} ${units === "metric" ? "m²" : "ft²"} × (1 + ${allowance}%) = ${formatNumber(round(adjustedArea, 2))}`,
        `packages = ceil(${formatNumber(round(adjustedArea, 2))} ÷ ${formatNumber(round(coverage, 2))} ${units === "metric" ? "m²" : "ft²"} per package) = ${packages}`,
        "This is a package-coverage estimate only. Check that the exact product, thickness, R-value, assembly, and installation are suitable for the project.",
      ],
    };
  },
  formulaDescription: "packages = ceil(measured area × (1 + selected allowance) ÷ exact product-label coverage)",
  methodology: [
    "Enter the net area to be covered, the coverage stated on the exact product package for its actual configuration, and any planning allowance you choose. The result rounds package count up to a whole package.",
    "This worksheet does not recommend an R-value, insulation type, climate target, framing fit, package coverage, or building assembly. It does not account for irregular geometry, obstructions, compression, existing insulation, moisture, air leakage, fire protection, or local code. Confirm product suitability, label coverage, and project requirements before purchase or installation.",
  ],
  sources: [],
  related: [
    { name: "Lumber quantity estimator", slug: "lumber-calculator", description: "Geometric board and lineal estimates from entered dimensions" },
    { name: "Attic area-ratio worksheet", slug: "attic-ventilation-calculator", description: "Illustrative arithmetic only; not ventilation design" },
  ],
  faq: [
    { question: "Which R-value should I choose?", answer: "This estimator does not determine an appropriate R-value or product. Check current local requirements, project documents, and advice from a qualified building professional." },
    { question: "How do I estimate packages?", answer: "Use net measured area and the coverage printed on the exact product package, then choose an allowance appropriate to your project." },
  ],
};
