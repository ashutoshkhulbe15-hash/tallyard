import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber, ceilQuantity } from "@/lib/format";

export const brickCalculatorConfig: CalculatorConfig = {
  slug: "brick-calculator",
  title: "Brick Quantity Estimator",
  description: "Estimate brick count from net wall area, product-specific unit coverage, and a user-selected allowance. Does not estimate mortar or design a wall.",
  categoryLabel: "Masonry",
  category: "concrete",
  bannerHeadline: "Estimate brick quantity.",
  bannerTags: ["Net wall area", "Enter product coverage", "Not structural design"],
  inputs: [
    { id: "wallArea", label: "Net wall area (openings removed)", type: "number", unitImperial: "ft²", unitMetric: "m²", defaultImperial: 160, defaultMetric: 14.8645, min: 0.01, step: 1 },
    {
      id: "unitsPerArea", label: "Units per area (confirm layout/supplier data)", type: "number",
      unitImperial: "bricks/ft²", unitMetric: "bricks/m²", defaultImperial: "", defaultMetric: "", min: 0.01, step: 0.01,
      help: "Enter coverage matching the exact brick, joint, bond, and wall configuration.",
    },
    {
      id: "allowance", label: "Planning allowance", type: "select", defaultImperial: 0.1,
      options: [
        { label: "0%", value: 0 }, { label: "5%", value: 0.05 },
        { label: "10%", value: 0.1 }, { label: "15%", value: 0.15 },
      ],
      help: "User-selected scenario, not an industry or pattern recommendation.",
    },
  ],
  calculate: (values, units) => {
    const wallArea = Number(values.wallArea);
    const unitsPerArea = Number(values.unitsPerArea);
    const allowance = Number(values.allowance);
    if (![wallArea, unitsPerArea, allowance].every(Number.isFinite) || wallArea <= 0 || unitsPerArea <= 0 ||
        ![0, 0.05, 0.1, 0.15].includes(allowance)) {
      throw new Error("Enter a positive net wall area, product- and layout-specific unit coverage, and a listed planning allowance.");
    }
    const grossUnits = wallArea * unitsPerArea;
    const count = ceilQuantity(grossUnits * (1 + allowance));
    const areaUnit = units === "metric" ? "m²" : "ft²";
    return {
      value: count,
      unit: count === 1 ? "brick" : "bricks",
      valueRounded: count,
      breakdown: [
        { label: "net wall area", value: `${formatNumber(round(wallArea, 2))} ${areaUnit}` },
        { label: "entered product coverage", value: `${formatNumber(round(unitsPerArea, 2))} bricks/${areaUnit}` },
        { label: "selected allowance", value: `${round(allowance * 100, 0)}%` },
        { label: "estimated brick quantity", value: `${formatNumber(count)} bricks` },
      ],
      formulaSteps: [
        `net wall area = ${round(wallArea, 3)} ${areaUnit}`,
        `base unit estimate = ${round(wallArea, 3)} × ${round(unitsPerArea, 3)} = ${round(grossUnits, 2)} bricks`,
        `quantity = ceil(${round(grossUnits, 2)} × (1 + ${round(allowance * 100, 0)}%)) = ${count} bricks`,
        "Coverage must match actual openings, bond, joint, brick format, and wythe/layout; no mortar quantity is calculated.",
      ],
    };
  },
  formulaDescription: "bricks = ceil(net wall area × supplier/layout unit coverage × (1 + user-selected allowance))",
  methodology: [
    "Enter net wall area after subtracting openings, then provide unit coverage for the exact brick and wall layout. The calculator multiplies those inputs, applies the selected allowance, and rounds up to whole units.",
    "Coverage can depend on actual unit dimensions, joint width, bond, corners, returns, openings, and wall construction. This tool does not infer a standard brick format or wythe count; confirm the rate with the product supplier, masonry drawings, or installer.",
    "This is not a wall-design or code check. It does not estimate mortar, lintels, flashing, ties, reinforcement, grout, or firebox/chimney components. Obtain project-specific structural and detailing advice where required.",
  ],
  sources: [
    { name: "Brick Industry Association: Technical Notes", url: "https://www.gobrick.com/resources/technical-notes", note: "Brick dimensions and masonry estimating references; confirm unit coverage for the selected product and assembly." },
  ],
  related: [
    { name: "Mortar package estimator", slug: "mortar-calculator", description: "Estimate bags from unit count and manufacturer coverage" },
    { name: "Concrete volume calculator", slug: "concrete-calculator", description: "Geometric concrete volume estimate" },
  ],
  faq: [
    { question: "How many bricks do I need?", answer: "Enter net wall area and the supplier or layout-specific number of bricks per area for your exact brick, joint, and construction. Select an allowance based on the actual project and round to the supplier's selling unit." },
    { question: "Does this calculate mortar or structural wall thickness?", answer: "No. It estimates brick count only. Mortar yield, wall thickness, ties, lintels, flashing, reinforcement, and structural suitability need project- and product-specific details." },
    { question: "Why does the calculator require product coverage?", answer: "Brick formats, joints, bonds, openings, and wall layouts vary. A supplier or masonry takeoff for the selected assembly is more appropriate than assuming one universal bricks-per-area rate." },
  ],
};
