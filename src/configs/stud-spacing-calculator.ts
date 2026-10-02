import { StudSpacingCalculatorExpansion } from "@/content/stud-spacing-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber, ceilQuantity } from "@/lib/format";

export const studSpacingCalculatorConfig: CalculatorConfig = {
  ContentExpansion: StudSpacingCalculatorExpansion,
  slug: "stud-spacing-calculator",
  title: "Stud Spacing Calculator",
  description: "Estimate evenly spaced points along a straight wall length from user-selected spacing. Does not design framing or count openings and connections.",
  categoryLabel: "Lumber",
  category: "drywall",
  bannerHeadline: "Estimate a simple spacing count.",
  bannerTags: ["Straight length only", "User-selected spacing", "Not framing design"],
  inputs: [
    { id: "wallLength", label: "Straight wall length", type: "number", unitImperial: "ft", unitMetric: "m", defaultImperial: 12, defaultMetric: 3.6576, min: 0.01, step: 0.1 },
    { id: "spacing", label: "User-selected maximum interval", type: "number", unitImperial: "in", unitMetric: "in", defaultImperial: 16, defaultMetric: 16, min: 0.1, step: 0.5, help: "Use spacing from project documents; no framing spacing is recommended." },
  ],
  calculate: (values, units) => {
    const lengthInput = Number(values.wallLength);
    const spacingIn = Number(values.spacing);
    if (![lengthInput, spacingIn].every(Number.isFinite) || lengthInput <= 0 || spacingIn <= 0) {
      throw new Error("Enter a positive wall length and user-selected interval.");
    }
    const lengthIn = units === "metric" ? lengthInput * 39.3700787402 : lengthInput * 12;
    const intervals = ceilQuantity(lengthIn / spacingIn);
    const positions = intervals + 1;
    const actualIntervalIn = lengthIn / intervals;
    const lengthUnit = units === "metric" ? "m" : "ft";
    const actualInterval = units === "metric" ? actualIntervalIn * 2.54 : actualIntervalIn / 12;
    const spacingUnit = units === "metric" ? "cm" : "in";
    return {
      value: positions,
      unit: "positions (simple straight run)",
      valueRounded: positions,
      breakdown: [
        { label: "entered wall length", value: `${formatNumber(round(lengthInput, 3))} ${lengthUnit}` },
        { label: "user-selected maximum interval", value: `${formatNumber(round(spacingIn, 2))} in` },
        { label: "equal intervals", value: formatNumber(intervals) },
        { label: "simple positions including both ends", value: formatNumber(positions) },
        { label: "calculated interval", value: `${formatNumber(round(actualInterval, 2))} ${spacingUnit}` },
      ],
      formulaSteps: [
        `length = ${round(lengthIn, 2)} in; intervals = ceil(${round(lengthIn, 2)} ÷ ${spacingIn}) = ${intervals}`,
        `positions = intervals + 1 = ${positions}`,
        "This is spacing arithmetic only. It excludes corners, openings, plates, headers, connections, loads, bracing, member size, and code requirements.",
      ],
    };
  },
  formulaDescription: "positions = ceil(straight wall length ÷ user-selected maximum spacing) + 1",
  methodology: [
    "The estimator converts the entered wall length into inches, divides by the user-selected interval, rounds up to a whole interval count, and adds one position for both ends of a simple straight run.",
    "This does not count framing members or account for actual layout conventions, corners, intersections, openings, plates, headers, splices, load path, sheathing, material dimensions, or construction tolerances. The spacing value is user-selected and is not a recommendation.",
    "Do not use this arithmetic for a framing takeoff or structural design. Follow approved plans, product requirements, and local rules, with qualified review where required.",
  ],
  sources: [],
  related: [
    { name: "Lumber quantity estimator", slug: "lumber-calculator", description: "Geometric board-foot and lineal estimates" },
    { name: "Drywall quantity estimator", slug: "drywall-calculator", description: "Separate surface and sheet quantity estimate" },
  ],
  faq: [
    { question: "Does this calculate studs for a framed wall?", answer: "No. It counts evenly spaced positions along a simple straight length only. It excludes the layout details and design requirements needed for a framing takeoff." },
    { question: "Which spacing should I use?", answer: "Enter an interval specified by the project drawings or qualified designer. This estimator does not recommend spacing or assess structural adequacy." },
  ],
};
