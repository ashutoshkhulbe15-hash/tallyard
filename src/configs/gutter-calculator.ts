import type { CalculatorConfig } from "@/lib/types";
import { formatNumber, round } from "@/lib/format";

export const gutterCalculatorConfig: CalculatorConfig = {
  slug: "gutter-calculator",
  title: "Gutter-Run Length Worksheet",
  description: "Sum user-measured gutter runs and apply a chosen planning allowance. Does not size gutters, downspouts, or drainage systems.",
  categoryLabel: "Roofing",
  category: "roofing",
  bannerHeadline: "Add measured runs.",
  bannerTags: ["Measured lengths", "Allowance is user-selected", "No drainage sizing"],
  inputs: [
    { id: "runA", label: "Measured gutter run A", type: "number", unitImperial: "ft", unitMetric: "m", defaultImperial: 40, defaultMetric: 12.2, min: 0, step: 0.1 },
    { id: "runB", label: "Measured gutter run B", type: "number", unitImperial: "ft", unitMetric: "m", defaultImperial: 40, defaultMetric: 12.2, min: 0, step: 0.1 },
    { id: "runC", label: "Measured gutter run C", type: "number", unitImperial: "ft", unitMetric: "m", defaultImperial: 0, defaultMetric: 0, min: 0, step: 0.1 },
    { id: "runD", label: "Measured gutter run D", type: "number", unitImperial: "ft", unitMetric: "m", defaultImperial: 0, defaultMetric: 0, min: 0, step: 0.1 },
    { id: "allowance", label: "User-selected planning allowance", type: "select", defaultImperial: "0", options: [
      { label: "0%", value: "0" }, { label: "5%", value: "5" }, { label: "10%", value: "10" }, { label: "15%", value: "15" },
    ] },
  ],
  calculate: (values, units) => {
    const runs = ["runA", "runB", "runC", "runD"].map((key) => Number(values[key]));
    const allowance = Number(values.allowance);
    if (!runs.every((run) => Number.isFinite(run) && run >= 0) || runs.every((run) => run === 0) || ![0, 5, 10, 15].includes(allowance)) {
      throw new Error("Enter at least one positive measured run, no negative run lengths, and a listed allowance.");
    }
    const measured = runs.reduce((sum, run) => sum + run, 0);
    const adjusted = measured * (1 + allowance / 100);
    const unit = units === "metric" ? "m" : "ft";
    return {
      value: round(adjusted, 2),
      unit: `gutter-run length estimate (${unit})`,
      valueRounded: round(adjusted, 1),
      breakdown: [
        { label: "measured total run", value: `${formatNumber(round(measured, 2))} ${unit}` },
        { label: "selected allowance", value: `${allowance}%` },
        { label: "length with allowance", value: `${formatNumber(round(adjusted, 2))} ${unit}` },
        { label: "gutter profile, drainage capacity, accessories", value: "not assessed" },
      ],
      formulaSteps: [
        `measured total = ${runs.map((run) => round(run, 2)).join(" + ")} = ${round(measured, 2)} ${unit}`,
        `length with allowance = ${round(measured, 2)} × (1 + ${allowance}%) = ${round(adjusted, 2)} ${unit}`,
        "This is length arithmetic only. It does not size drainage components or establish slope, outlet placement, or safe discharge.",
      ],
    };
  },
  formulaDescription: "length with allowance = sum of measured gutter runs × (1 + user-selected allowance)",
  methodology: ["Enter up to four measured gutter runs in the selected unit and choose an allowance. The tool reports the sum and adjusted length only.", "It does not evaluate roof area or pitch, rainfall intensity, gutter profile or material, downspout count, hanger spacing, slope, overflow, drainage discharge, ice, access, or code requirements. Use site measurements, manufacturer data, and a qualified installer for system selection and installation."],
  sources: [],
  related: [
    { name: "Roof planar-area estimator", slug: "roofing-calculator", description: "Simple roof footprint and pitch geometry" },
    { name: "Rainfall runoff estimator", slug: "rainwater-calculator", description: "Event runoff arithmetic; not drainage design" },
  ],
  faq: [
    { question: "Does this tell me which gutter size to install?", answer: "No. It totals measured run length only. Drainage sizing depends on project-specific roof and rainfall conditions and the selected system." },
    { question: "Does this include downspouts or hangers?", answer: "No. Use the chosen product's instructions and a project-specific layout for component quantities." },
  ],
};
