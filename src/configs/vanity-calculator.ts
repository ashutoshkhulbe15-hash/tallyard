import type { CalculatorConfig } from "@/lib/types";
import { formatNumber, round } from "@/lib/format";

export const vanityCalculatorConfig: CalculatorConfig = {
  slug: "vanity-calculator",
  title: "Vanity Wall-Width Worksheet",
  description: "Calculate the wall width remaining after the clearances you enter. Does not recommend a vanity or check bathroom-code clearances.",
  categoryLabel: "Flooring",
  category: "flooring",
  bannerHeadline: "Measure the available width.",
  bannerTags: ["Entered dimensions", "Clearances are user-selected", "No code verdict"],
  inputs: [
    { id: "wallWidth", label: "Measured wall width", type: "number", unitImperial: "in", unitMetric: "cm", defaultImperial: 72, defaultMetric: 183, min: 0.1, step: 0.1 },
    { id: "leftClearance", label: "Clearance to reserve on left", type: "number", unitImperial: "in", unitMetric: "cm", defaultImperial: 0, defaultMetric: 0, min: 0, step: 0.1 },
    { id: "rightClearance", label: "Clearance to reserve on right", type: "number", unitImperial: "in", unitMetric: "cm", defaultImperial: 4, defaultMetric: 10, min: 0, step: 0.1 },
  ],
  calculate: (values, units) => {
    const wall = Number(values.wallWidth);
    const left = Number(values.leftClearance);
    const right = Number(values.rightClearance);
    if (![wall, left, right].every(Number.isFinite) || wall <= 0 || left < 0 || right < 0 || left + right >= wall) {
      throw new Error("Enter a positive wall width and nonnegative clearances whose sum is less than the wall width.");
    }
    const available = wall - left - right;
    const unit = units === "metric" ? "cm" : "in";
    return {
      value: round(available, 2),
      unit: `remaining wall width (${unit})`,
      valueRounded: round(available, 1),
      breakdown: [
        { label: "measured wall width", value: `${formatNumber(round(wall, 2))} ${unit}` },
        { label: "entered left and right clearances", value: `${formatNumber(round(left, 2))} + ${formatNumber(round(right, 2))} ${unit}` },
        { label: "remaining width", value: `${formatNumber(round(available, 2))} ${unit}` },
        { label: "fixture suitability and code compliance", value: "not assessed" },
      ],
      formulaSteps: [`remaining width = ${wall} − ${left} − ${right} = ${round(available, 2)} ${unit}`, "This result is simple dimension arithmetic. It does not select a vanity or assess sink placement, door swing, plumbing, accessibility, or code requirements."],
    };
  },
  formulaDescription: "remaining width = measured wall width − user-entered left clearance − user-entered right clearance",
  methodology: ["Measure the wall and enter the clearances you have independently determined to reserve. The worksheet subtracts those values and reports only the remaining width.", "It does not recommend a cabinet size, height, depth, sink count, fixture location, door swing, accessibility, plumbing layout, or code compliance. Confirm the actual product dimensions and all project requirements before selection or installation."],
  sources: [],
  related: [
    { name: "Countertop area estimator", slug: "countertop-calculator", description: "Surface area from entered dimensions" },
    { name: "Window rectangle area", slug: "window-sizing-calculator", description: "Geometry only; no code assessment" },
  ],
  faq: [
    { question: "Does this tell me which vanity to buy?", answer: "No. It reports the width remaining after the clearances you enter. Compare that dimension with exact product drawings and project requirements." },
    { question: "Does this check bathroom clearances?", answer: "No. Clearances and accessibility requirements depend on the applicable rules, fixture layout, and site conditions." },
  ],
};
