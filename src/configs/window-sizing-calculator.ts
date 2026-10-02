import { WindowSizingCalculatorExpansion } from "@/content/window-sizing-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const windowSizingCalculatorConfig: CalculatorConfig = {
  ContentExpansion: WindowSizingCalculatorExpansion,
  slug: "window-sizing-calculator",
  title: "Window Sizing Calculator",
  description: "Calculate the area of a user-entered rectangular window dimension pair. Does not determine egress, glazing, ventilation, rough openings, or code compliance.",
  categoryLabel: "Lumber",
  category: "drywall",
  bannerHeadline: "Calculate a rectangular area.",
  bannerTags: ["Entered dimensions", "Area arithmetic only", "No code assessment"],
  inputs: [
    { id: "width", label: "Entered width", type: "number", unitImperial: "in", unitMetric: "cm", defaultImperial: 36, defaultMetric: 91.44, min: 0.1, step: 1 },
    { id: "height", label: "Entered height", type: "number", unitImperial: "in", unitMetric: "cm", defaultImperial: 48, defaultMetric: 121.92, min: 0.1, step: 1 },
  ],
  calculate: (values, units) => {
    const widthInput = Number(values.width);
    const heightInput = Number(values.height);
    if (![widthInput, heightInput].every(Number.isFinite) || widthInput <= 0 || heightInput <= 0) {
      throw new Error("Enter positive width and height values.");
    }
    const widthCm = units === "metric" ? widthInput : widthInput * 2.54;
    const heightCm = units === "metric" ? heightInput : heightInput * 2.54;
    const area = widthCm * heightCm / 10000;
    const displayArea = units === "metric" ? area : area * 10.7639104167;
    const displayUnit = units === "metric" ? "m²" : "ft²";
    return {
      value: round(displayArea, 3),
      unit: displayUnit,
      valueRounded: round(displayArea, 2),
      breakdown: [
        { label: "entered rectangle", value: `${formatNumber(round(widthInput, 2))} × ${formatNumber(round(heightInput, 2))} ${units === "metric" ? "cm" : "in"}` },
        { label: "rectangular area", value: `${formatNumber(round(displayArea, 3))} ${displayUnit}` },
        { label: "scope", value: "dimension product only" },
      ],
      formulaSteps: [
        `entered rectangle area = ${round(widthCm, 3)} cm × ${round(heightCm, 3)} cm ÷ 10,000 = ${round(area, 4)} m²`,
        `displayed area = ${round(displayArea, 3)} ${displayUnit}`,
        "This is the area of the entered rectangle, not glass area, net clear opening, daylight area, rough opening, or a code determination.",
      ],
    };
  },
  formulaDescription: "area = entered width × entered height, with unit conversion",
  methodology: [
    "The calculator multiplies the two entered dimensions and converts the resulting rectangular area for display. It does not account for a frame, sash, mullions, opening operation, wall construction, or installation clearance.",
    "Nominal window size, rough opening, glazed area, and net clear opening are different measurements. This tool does not compare dimensions with egress, light, ventilation, accessibility, energy, or code requirements. Confirm required measurements with product documentation and local project professionals.",
  ],
  sources: [],
  related: [
    { name: "Net clear opening area calculator", slug: "egress-window-calculator", description: "Area arithmetic only; not egress compliance" },
    { name: "Lumber quantity estimator", slug: "lumber-calculator", description: "Geometric quantity arithmetic from entered dimensions" },
  ],
  faq: [
    { question: "Does this size an egress window?", answer: "No. It only calculates area from the entered rectangle and does not account for net clear opening or local egress requirements." },
    { question: "Is this the glass area or rough opening?", answer: "Not necessarily. The result is only the area of the dimensions you entered. Consult the window manufacturer and project documents for the intended measurement." },
  ],
};
