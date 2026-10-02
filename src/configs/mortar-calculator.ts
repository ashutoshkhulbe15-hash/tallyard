import { MortarCalculatorExpansion } from "@/content/mortar-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber, ceilQuantity } from "@/lib/format";

export const mortarCalculatorConfig: CalculatorConfig = {
  ContentExpansion: MortarCalculatorExpansion,
  slug: "mortar-calculator",
  title: "Mortar Calculator",
  description: "Estimate mortar bags from masonry unit count, exact package coverage, and a user-selected allowance. Does not select mortar type or give installation advice.",
  categoryLabel: "Masonry",
  category: "concrete",
  bannerHeadline: "Estimate mortar quantity.",
  bannerTags: ["Enter unit count", "Use exact package coverage", "No mortar selection advice"],
  inputs: [
    { id: "unitCount", label: "Masonry unit count", type: "number", unitImperial: "units", defaultImperial: 1000, min: 1, step: 1 },
    {
      id: "coveragePerBag", label: "Units covered per package (check product data)", type: "number",
      unitImperial: "units/bag", defaultImperial: "", min: 0.01, step: 1,
      help: "Enter the coverage for the exact mortar product, bag size, masonry unit, and joint configuration.",
    },
    {
      id: "allowance", label: "Planning allowance", type: "select", defaultImperial: 0.1,
      options: [
        { label: "0%", value: 0 }, { label: "5%", value: 0.05 },
        { label: "10%", value: 0.1 }, { label: "15%", value: 0.15 },
      ],
      help: "A user-selected scenario; not a universal waste rate.",
    },
  ],
  calculate: (values) => {
    const unitCount = Number(values.unitCount);
    const coveragePerBag = Number(values.coveragePerBag);
    const allowance = Number(values.allowance);
    if (![unitCount, coveragePerBag, allowance].every(Number.isFinite) || unitCount <= 0 || coveragePerBag <= 0 ||
        ![0, 0.05, 0.1, 0.15].includes(allowance)) {
      throw new Error("Enter a positive masonry unit count, coverage for the exact mortar package, and a listed planning allowance.");
    }
    const adjustedUnits = unitCount * (1 + allowance);
    const bags = ceilQuantity(adjustedUnits / coveragePerBag);
    return {
      value: bags,
      unit: bags === 1 ? "bag" : "bags",
      valueRounded: bags,
      breakdown: [
        { label: "masonry units", value: formatNumber(unitCount) },
        { label: "selected allowance", value: `${round(allowance * 100, 0)}%` },
        { label: "entered package coverage", value: `${formatNumber(round(coveragePerBag, 2))} units/bag` },
        { label: "estimated package count", value: `${formatNumber(bags)} bags` },
      ],
      formulaSteps: [
        `adjusted unit count = ${unitCount} × (1 + ${round(allowance * 100, 0)}%) = ${round(adjustedUnits, 2)} units`,
        `packages = ceil(${round(adjustedUnits, 2)} ÷ ${coveragePerBag} units/bag) = ${bags} bags`,
        "The result is only as applicable as the coverage value entered; packaging yield varies with unit, joint, workmanship, and product.",
      ],
    };
  },
  formulaDescription: "bags = ceil((masonry unit count × (1 + user-selected allowance)) ÷ exact product coverage per bag)",
  methodology: [
    "The estimator divides the unit count, after the selected allowance, by package coverage supplied by the user for the exact mortar product and masonry configuration. It rounds up to whole packages.",
    "Package yields vary by bag size, unit dimensions, joint geometry, wall assembly, substrate, and workmanship. Use the manufacturer's current technical data for the selected product; if it does not give a suitable coverage value, this calculator cannot produce a dependable estimate.",
    "The calculator does not select Type M, S, N, or another mortar; determine structural suitability; estimate mixing water; or advise mixing, working time, placement, or repointing. Follow the project specifications, product label, and qualified masonry guidance.",
  ],
  sources: [
    { name: "ASTM International: C270 Mortar for Unit Masonry", url: "https://www.astm.org/c0270-19ae01.html", note: "Mortar specification reference; it does not validate a universal package coverage rate." },
    { name: "Quikrete Mortar Mix: Product Information", url: "https://www.quikrete.com/productlines/mortarmix.asp", note: "Example manufacturer product data; package yields must be checked for the exact product selected." },
  ],
  related: [
    { name: "Brick quantity estimator", slug: "brick-calculator", description: "Estimate units from net wall area and product coverage" },
    { name: "Grout calculator", slug: "grout-calculator", description: "Separate preliminary grout estimate for tile joints" },
  ],
  faq: [
    { question: "How many bags of mortar do I need?", answer: "Enter your unit count and the coverage per package for the exact mortar product and masonry configuration, then choose any planning allowance. The calculator rounds up to whole bags." },
    { question: "Which mortar type should I use?", answer: "This tool does not select mortar type. Use project specifications, applicable standards, substrate and exposure details, and qualified masonry guidance; historic masonry may need specialist assessment." },
    { question: "Can I use this if my bag label has no coverage?", answer: "Not reliably. Obtain a product-specific yield from the manufacturer or supplier for the unit and joint configuration. Do not substitute a generic bags-per-brick assumption." },
  ],
};
