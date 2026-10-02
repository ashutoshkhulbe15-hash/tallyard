import { StairCalculatorExpansion } from "@/content/stair-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const stairCalculatorConfig: CalculatorConfig = {
  ContentExpansion: StairCalculatorExpansion,
  slug: "stair-calculator",
  title: "Stair Calculator",
  description: "Estimate equalized riser count and geometric rise/run from user-selected dimensions. Not a code check or construction cut sheet.",
  categoryLabel: "Lumber",
  category: "drywall",
  bannerHeadline: "Estimate stair geometry.",
  bannerTags: ["Entered floor-to-floor rise", "Selected geometry assumptions", "Not a cut sheet"],
  inputs: [
    { id: "totalRise", label: "Total floor-to-floor rise", type: "number", unitImperial: "in", unitMetric: "cm", defaultImperial: 108, defaultMetric: 274.32, min: 1, step: 1 },
    { id: "targetRise", label: "User-selected target rise", type: "number", unitImperial: "in", unitMetric: "in", defaultImperial: 7.5, defaultMetric: 7.5, min: 1, step: 0.1, help: "Use a value from project documents or professional guidance; no code limit is checked." },
    { id: "treadRun", label: "User-selected horizontal run per step", type: "number", unitImperial: "in", unitMetric: "in", defaultImperial: 11, defaultMetric: 11, min: 1, step: 0.1 },
  ],
  calculate: (values, units) => {
    const totalRiseInput = Number(values.totalRise);
    const targetRiseIn = Number(values.targetRise);
    const treadRunIn = Number(values.treadRun);
    if (![totalRiseInput, targetRiseIn, treadRunIn].every(Number.isFinite) || totalRiseInput <= 0 || targetRiseIn <= 0 || treadRunIn <= 0) {
      throw new Error("Enter positive total rise, selected target rise, and selected run values.");
    }
    const riseIn = units === "metric" ? totalRiseInput / 2.54 : totalRiseInput;
    const risers = Math.max(1, Math.round(riseIn / targetRiseIn));
    const actualRiseIn = riseIn / risers;
    const treads = Math.max(0, risers - 1);
    const totalRunIn = treads * treadRunIn;
    const slopeLengthIn = Math.hypot(riseIn, totalRunIn);
    const unit = units === "metric" ? "cm" : "in";
    const factor = units === "metric" ? 2.54 : 1;
    return {
      value: risers,
      unit: risers === 1 ? "riser" : "risers",
      valueRounded: risers,
      breakdown: [
        { label: "equalized risers", value: formatNumber(risers) },
        { label: "calculated rise per interval", value: `${formatNumber(round(actualRiseIn * factor, 2))} ${unit}` },
        { label: "tread intervals", value: formatNumber(treads) },
        { label: "total horizontal run", value: `${formatNumber(round(totalRunIn * factor, 2))} ${unit}` },
        { label: "geometric slope length", value: `${formatNumber(round(slopeLengthIn * factor, 2))} ${unit}` },
      ],
      formulaSteps: [
        `risers = round(${round(riseIn, 2)} in ÷ ${round(targetRiseIn, 2)} in) = ${risers}`,
        `actual rise = ${round(riseIn, 2)} in ÷ ${risers} = ${round(actualRiseIn, 3)} in`,
        `treads = max(0, ${risers} − 1) = ${treads}; total run = ${treads} × ${round(treadRunIn, 2)} in = ${round(totalRunIn, 2)} in`,
        `slope length = √(${round(riseIn, 2)}² + ${round(totalRunIn, 2)}²) = ${round(slopeLengthIn, 2)} in`,
        "Slope length is geometry, not a stringer cut length. This tool does not check code, landings, headroom, guards, handrails, supports, or structural capacity.",
      ],
    };
  },
  formulaDescription: "riser count = round(total rise ÷ user-selected target rise); run = (risers − 1) × user-selected run",
  methodology: [
    "This worksheet divides the entered floor-to-floor rise by a user-selected target rise, rounds to a whole interval count, and reports the resulting equalized rise, total run, and geometric slope length.",
    "It does not verify whether the selected geometry meets building code or fits a site. The slope length is not a cut measurement: stringer layout requires construction details and deductions not represented here.",
    "Stair safety depends on the entire design, including tread and riser limits and uniformity, landings, headroom, width, handrails, guards, supports, and local rules. Use approved plans and qualified review; do not build from this estimate.",
  ],
  sources: [],
  related: [
    { name: "Deck stair geometry estimator", slug: "deck-stair-calculator", description: "Separate geometry worksheet; not a construction cut sheet" },
    { name: "Lumber quantity estimator", slug: "lumber-calculator", description: "Geometric quantity arithmetic from entered dimensions" },
  ],
  faq: [
    { question: "Does this check stair code?", answer: "No. It calculates geometry from user-selected assumptions but does not determine applicable code, site fit, landings, headroom, handrails, guards, support, or structural adequacy." },
    { question: "Is slope length the stringer cut length?", answer: "No. It is only the hypotenuse from total rise and run. It omits layout, end cuts, notch geometry, attachment details, and material requirements." },
    { question: "What values should I enter?", answer: "Use dimensions and targets from approved project documents or a qualified designer. This estimator does not recommend riser or tread dimensions." },
  ],
};
