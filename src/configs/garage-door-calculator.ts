import { GarageDoorCalculatorExpansion } from "@/content/garage-door-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const garageDoorCalculatorConfig: CalculatorConfig = {
  ContentExpansion: GarageDoorCalculatorExpansion,
  slug: "garage-door-calculator",
  title: "Garage Door Calculator",
  description: "Record entered opening and clearance dimensions and calculate rectangular opening area. Does not select a door, track, spring, opener, or price.",
  categoryLabel: "Roofing",
  category: "roofing",
  bannerHeadline: "Record opening measurements.",
  bannerTags: ["Opening geometry", "User-entered clearances", "Verify product fit"],
  inputs: [
    { id: "opening", label: "Opening width", type: "number", unitImperial: "ft", unitMetric: "m", defaultImperial: 16, defaultMetric: 4.8768, min: 0.01, step: 0.1 },
    { id: "height", label: "Opening height", type: "number", unitImperial: "ft", unitMetric: "m", defaultImperial: 7, defaultMetric: 2.1336, min: 0.01, step: 0.1 },
    { id: "headroom", label: "Measured headroom", type: "number", unitImperial: "in", unitMetric: "cm", defaultImperial: 12, defaultMetric: 30.48, min: 0, step: 0.5 },
    { id: "sideroom", label: "Measured side room (each side)", type: "number", unitImperial: "in", unitMetric: "cm", defaultImperial: 4, defaultMetric: 10.16, min: 0, step: 0.5 },
  ],
  calculate: (values, units) => {
    const width = Number(values.opening);
    const height = Number(values.height);
    const headroom = Number(values.headroom);
    const sideroom = Number(values.sideroom);
    if (![width, height, headroom, sideroom].every(Number.isFinite) || width <= 0 || height <= 0 || headroom < 0 || sideroom < 0) {
      throw new Error("Enter positive opening dimensions and non-negative measured clearances.");
    }
    const area = width * height;
    const areaUnit = units === "metric" ? "m²" : "ft²";
    const clearanceUnit = units === "metric" ? "cm" : "in";
    return {
      value: round(area, 2),
      unit: areaUnit,
      valueRounded: round(area, 1),
      breakdown: [
        { label: "entered opening", value: `${formatNumber(round(width, 2))} × ${formatNumber(round(height, 2))} ${units === "metric" ? "m" : "ft"}` },
        { label: "rectangular opening area", value: `${formatNumber(round(area, 2))} ${areaUnit}` },
        { label: "measured headroom", value: `${formatNumber(round(headroom, 2))} ${clearanceUnit}` },
        { label: "measured side room (each side)", value: `${formatNumber(round(sideroom, 2))} ${clearanceUnit}` },
      ],
      formulaSteps: [
        `opening area = ${width} × ${height} = ${round(area, 3)} ${areaUnit}`,
        `recorded headroom = ${headroom} ${clearanceUnit}; side room = ${sideroom} ${clearanceUnit} per side`,
        "Measurements only. Track, spring, door, opener, framing, wind rating, clearances, and installation compatibility are not assessed.",
      ],
    };
  },
  formulaDescription: "rectangular opening area = entered width × entered height",
  methodology: [
    "This worksheet multiplies the entered width and height and repeats the headroom and side-room clearances you record. Verify measurement points and units on site.",
    "It does not recommend a door size or type, opener, springs, tracks, header, wind rating, or installation method. Compatibility depends on the exact door and hardware specifications, framing, site conditions, and applicable requirements; have the manufacturer or qualified installer verify fit.",
  ],
  sources: [],
  related: [
    { name: "Stud layout estimator", slug: "stud-spacing-calculator", description: "Simple straight-length spacing arithmetic; not framing design" },
    { name: "Concrete volume calculator", slug: "concrete-calculator", description: "Geometric volume from entered dimensions" },
  ],
  faq: [
    { question: "Does this recommend a garage door or opener?", answer: "No. It calculates rectangular area and records entered clearances only. Check the exact product's installation requirements with the manufacturer or qualified installer." },
    { question: "Does this size the header?", answer: "No. Header selection is structural design and is not calculated here." },
  ],
};
