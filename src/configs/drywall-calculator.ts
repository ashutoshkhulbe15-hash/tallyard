import type { CalculatorConfig } from "@/lib/types";
import { formatNumber, round, ceilQuantity } from "@/lib/format";

export const drywallCalculatorConfig: CalculatorConfig = {
  slug: "drywall-calculator",
  title: "Drywall Panel Area Estimator",
  description: "Estimate panel count from net measured surface area and a selected nominal panel size. Does not create a layout or finishing-material takeoff.",
  categoryLabel: "Drywall",
  category: "drywall",
  bannerHeadline: "Estimate panel area.",
  bannerTags: ["Net measured area", "Nominal panel size", "No installation advice"],
  inputs: [
    { id: "area", label: "Net surface area to cover", type: "number", unitImperial: "ft²", unitMetric: "m²", defaultImperial: 800, defaultMetric: 74.3, min: 0.01, step: 1 },
    { id: "panelSize", label: "Nominal panel-size scenario", type: "select", defaultImperial: "4x8", options: [
      { label: "4 × 8 ft (32 ft²)", value: "4x8" },
      { label: "4 × 10 ft (40 ft²)", value: "4x10" },
      { label: "4 × 12 ft (48 ft²)", value: "4x12" },
    ] },
    { id: "allowance", label: "User-selected planning allowance", type: "select", defaultImperial: "0", options: [
      { label: "0%", value: "0" }, { label: "5%", value: "5" }, { label: "10%", value: "10" }, { label: "15%", value: "15" },
    ] },
  ],
  calculate: (values, units) => {
    const area = Number(values.area);
    const allowance = Number(values.allowance);
    const panelKey = String(values.panelSize);
    const panelAreas = units === "metric"
      ? { "4x8": 32 * 0.09290304, "4x10": 40 * 0.09290304, "4x12": 48 * 0.09290304 }
      : { "4x8": 4 * 8, "4x10": 4 * 10, "4x12": 4 * 12 };
    const panelArea = panelAreas[panelKey as keyof typeof panelAreas];
    if (!Number.isFinite(area) || area <= 0 || !Number.isFinite(allowance) || ![0, 5, 10, 15].includes(allowance) || !panelArea) {
      throw new Error("Enter positive net area and select a listed panel-size scenario and allowance.");
    }
    const adjustedArea = area * (1 + allowance / 100);
    const count = ceilQuantity(adjustedArea / panelArea);
    const areaUnit = units === "metric" ? "m²" : "ft²";
    return {
      value: count,
      unit: count === 1 ? "panel estimate" : "panels estimate",
      valueRounded: count,
      breakdown: [
        { label: "entered net area", value: `${formatNumber(round(area, 2))} ${areaUnit}` },
        { label: "selected nominal panel area", value: `${formatNumber(round(panelArea, 2))} ${areaUnit}` },
        { label: "selected allowance", value: `${allowance}%` },
        { label: "panel count estimate", value: `${count}` },
        { label: "layout, fasteners, and finishing materials", value: "not calculated" },
      ],
      formulaSteps: [
        `adjusted area = ${formatNumber(round(area, 2))} ${areaUnit} × (1 + ${allowance}%) = ${formatNumber(round(adjustedArea, 2))} ${areaUnit}`,
        `panels = ceil(${formatNumber(round(adjustedArea, 2))} ${areaUnit} ÷ ${formatNumber(round(panelArea, 2))} ${areaUnit}/panel) = ${count}`,
        "Area division does not account for sheet layout, framing, openings, damage, handling, or product dimensions. Verify measurements and local product availability.",
      ],
    };
  },
  formulaDescription: "panels = ceil((entered net area × (1 + selected allowance)) ÷ selected nominal panel area)",
  methodology: [
    "Enter net surface area after accounting for openings and select a nominal panel-area scenario. The estimator multiplies area by the allowance you choose, divides by panel area, and rounds up to a whole panel.",
    "This is area arithmetic, not a sheet layout, material takeoff, or installation guide. It does not determine panel type, thickness, fire or moisture performance, fastener schedule, framing layout, joint finish, compound, tape, or local code requirements. Verify the exact product dimensions and project specifications.",
  ],
  sources: [],
  related: [
    { name: "Paint area estimator", slug: "paint-calculator", description: "Estimate coating quantity from entered surfaces and product coverage" },
    { name: "Insulation package estimator", slug: "insulation-calculator", description: "Package count from measured area and product-label coverage" },
  ],
  faq: [
    { question: "Does this provide an installation layout?", answer: "No. It divides entered net area by nominal panel area. Layout, cuts, framing, fastening, and finishing are not assessed." },
    { question: "Does this calculate compound, tape, or screws?", answer: "No. Those quantities depend on product, layout, substrate, specification, and installation details not included here." },
  ],
};
