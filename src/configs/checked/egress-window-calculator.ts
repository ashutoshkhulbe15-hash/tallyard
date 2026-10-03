import { EgressWindowExpansion } from "@/content/egress-window-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const egressWindowCalculatorConfig: CalculatorConfig = {
  ContentExpansion: EgressWindowExpansion,
  slug: "egress-window-calculator",
  title: "Egress Window Calculator",
  description: "Calculate area from user-entered net clear opening dimensions. Does not determine egress compliance or suitability as an emergency exit.",
  categoryLabel: "Lumber",
  category: "drywall",
  bannerHeadline: "Calculate entered clear-opening area.",
  bannerTags: ["User-measured dimensions", "Area arithmetic only", "No egress verdict"],
  inputs: [
    { id: "clearWidth", label: "Measured net clear width", type: "number", unitImperial: "in", unitMetric: "cm", defaultImperial: 32, defaultMetric: 81.28, min: 0.1, step: 0.1 },
    { id: "clearHeight", label: "Measured net clear height", type: "number", unitImperial: "in", unitMetric: "cm", defaultImperial: 26, defaultMetric: 66.04, min: 0.1, step: 0.1 },
  ],
  calculate: (values, units) => {
    const widthInput = Number(values.clearWidth);
    const heightInput = Number(values.clearHeight);
    if (![widthInput, heightInput].every(Number.isFinite) || widthInput <= 0 || heightInput <= 0) {
      throw new Error("Enter positive measured clear-opening width and height.");
    }
    const widthCm = units === "metric" ? widthInput : widthInput * 2.54;
    const heightCm = units === "metric" ? heightInput : heightInput * 2.54;
    const areaM2 = widthCm * heightCm / 10000;
    const area = units === "metric" ? areaM2 : areaM2 * 10.7639104167;
    const areaUnit = units === "metric" ? "m²" : "ft²";
    return {
      value: round(area, 3),
      unit: areaUnit,
      valueRounded: round(area, 2),
      breakdown: [
        { label: "entered net clear dimensions", value: `${formatNumber(round(widthInput, 2))} × ${formatNumber(round(heightInput, 2))} ${units === "metric" ? "cm" : "in"}` },
        { label: "rectangular area", value: `${formatNumber(round(area, 3))} ${areaUnit}` },
        { label: "scope", value: "area arithmetic only; no egress verdict" },
      ],
      formulaSteps: [
        `area = ${round(widthCm, 3)} cm × ${round(heightCm, 3)} cm ÷ 10,000 = ${round(areaM2, 4)} m²`,
        `displayed area = ${round(area, 3)} ${areaUnit}`,
        "This tool does not validate measurement method, window operation, sill height, well, local code, or emergency-egress suitability.",
      ],
    };
  },
  formulaDescription: "area = user-entered net clear width × user-entered net clear height, with unit conversion",
  methodology: [
    "The calculator multiplies the net clear dimensions entered by the user. The result is a geometric area only and depends on measuring the unobstructed opening using the applicable product and project measurement method.",
    "It does not check code thresholds, sill height, window operation, well clearance, ladders, area exceptions, local amendments, or whether a room has a compliant emergency escape and rescue opening. Obtain current local code review and manufacturer documentation; do not rely on this result to establish life-safety compliance.",
  ],
  sources: [],
  related: [
    { name: "Window rectangle area calculator", slug: "window-sizing-calculator", description: "Rectangular area arithmetic from entered dimensions" },
    { name: "Stud layout estimator", slug: "stud-spacing-calculator", description: "Limited count from entered wall length and spacing" },
  ],
  faq: [
    { question: "Does this tell me if my window meets egress code?", answer: "No. It multiplies the entered net clear dimensions only. Egress compliance involves other measurements and requirements that vary with the building and applicable code." },
    { question: "What dimensions should I enter?", answer: "Use verified net clear opening measurements from the exact window and project. Nominal, frame, glass, and clear-opening dimensions are not interchangeable." },
  ],
};
