import type { CalculatorConfig } from "@/lib/types";
import { formatNumber, round, ceilQuantity } from "@/lib/format";

export const wallpaperCalculatorConfig: CalculatorConfig = {
  slug: "wallpaper-calculator",
  title: "Wallpaper Roll-Coverage Estimator",
  description: "Estimate roll count from net measured wall area, exact product-label coverage, and a user-selected allowance. Does not account for pattern or installation layout.",
  categoryLabel: "Paint & Walls",
  category: "drywall",
  bannerHeadline: "Use the product coverage.",
  bannerTags: ["Net wall area", "Exact label coverage", "No pattern-layout model"],
  inputs: [
    { id: "area", label: "Net wall area to cover", type: "number", unitImperial: "ft²", unitMetric: "m²", defaultImperial: 400, defaultMetric: 37.2, min: 0.01, step: 1 },
    { id: "coverage", label: "Coverage per roll from product label", type: "number", unitImperial: "ft²/roll", unitMetric: "m²/roll", defaultImperial: 56, defaultMetric: 5.2, min: 0.01, step: 0.1 },
    { id: "allowance", label: "User-selected planning allowance", type: "select", defaultImperial: "0", options: [
      { label: "0%", value: "0" }, { label: "5%", value: "5" }, { label: "10%", value: "10" }, { label: "15%", value: "15" },
    ] },
  ],
  calculate: (values, units) => {
    const area = Number(values.area);
    const coverage = Number(values.coverage);
    const allowance = Number(values.allowance);
    if (![area, coverage, allowance].every(Number.isFinite) || area <= 0 || coverage <= 0 || ![0, 5, 10, 15].includes(allowance)) {
      throw new Error("Enter positive measured area and label coverage, and select a listed allowance.");
    }
    const adjusted = area * (1 + allowance / 100);
    const rolls = ceilQuantity(adjusted / coverage);
    const unit = units === "metric" ? "m²" : "ft²";
    return {
      value: rolls,
      unit: rolls === 1 ? "roll estimate" : "rolls estimate",
      valueRounded: rolls,
      breakdown: [
        { label: "entered net wall area", value: `${formatNumber(round(area, 2))} ${unit}` },
        { label: "selected allowance", value: `${allowance}%` },
        { label: "product-label coverage", value: `${formatNumber(round(coverage, 2))} ${unit}/roll` },
        { label: "roll count estimate", value: `${rolls}` },
        { label: "pattern repeat, dye lot, and drop layout", value: "not assessed" },
      ],
      formulaSteps: [
        `adjusted area = ${round(area, 2)} ${unit} × (1 + ${allowance}%) = ${round(adjusted, 2)} ${unit}`,
        `rolls = ceil(${round(adjusted, 2)} ${unit} ÷ ${round(coverage, 2)} ${unit}/roll) = ${rolls}`,
        "This area-coverage estimate does not model pattern repeat, roll length, drop matching, room geometry, or usable coverage. Check the exact product label and installer layout.",
      ],
    };
  },
  formulaDescription: "rolls = ceil((entered net wall area × (1 + user-selected allowance)) ÷ exact label coverage per roll)",
  methodology: ["Enter net wall area, exact coverage per roll from the product label, and an allowance you choose. The calculator divides adjusted area by label coverage and rounds up to a whole roll.", "It does not model roll dimensions, pattern repeat, drop matching, unusable offcuts, substrate preparation, adhesive, dye lots, or installation suitability. Actual usable coverage depends on the selected paper and wall layout; confirm quantities with the manufacturer, supplier, or qualified installer."],
  sources: [],
  related: [
    { name: "Paint estimator", slug: "paint-calculator", description: "Quantity arithmetic from measured surfaces and entered coverage" },
    { name: "Drywall panel estimator", slug: "drywall-calculator", description: "Panel count from net area and nominal panel size" },
  ],
  faq: [
    { question: "Does this account for a wallpaper pattern repeat?", answer: "No. The tool uses area coverage printed on the label. Pattern repeat and drop layout can reduce usable coverage; check with the manufacturer or installer." },
    { question: "Where does the coverage value come from?", answer: "Use the exact coverage information for the product and roll format being purchased." },
  ],
};
