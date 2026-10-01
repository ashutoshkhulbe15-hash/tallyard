import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber, ceilQuantity } from "@/lib/format";

export const deckStairCalculatorConfig: CalculatorConfig = {
  slug: "deck-stair-calculator",
  title: "Stair Geometry Calculator",
  description:
    "Explore equal-rise stair geometry from total rise, a user-selected target riser height, and tread run. Does not provide code checks or construction plans.",
  categoryLabel: "Decking",
  category: "landscaping",
  bannerHeadline: "Explore stair geometry.",
  bannerTags: ["Equal-rise layout", "Metric and imperial", "Not a construction plan"],
  inputs: [
    {
      id: "totalRise",
      label: "Total rise",
      type: "number",
      unitImperial: "in",
      unitMetric: "cm",
      defaultImperial: 55,
      defaultMetric: 139.7,
      min: 1,
      step: 0.25,
    },
    {
      id: "targetRiserHeight",
      label: "Target riser height (user-selected) ",
      type: "number",
      unitImperial: "in",
      unitMetric: "cm",
      defaultImperial: 7.25,
      defaultMetric: 18.4,
      min: 1,
      step: 0.125,
      help: "The calculator divides the total rise into equal risers near this target. It does not determine code-compliant dimensions.",
    },
    {
      id: "treadRun",
      label: "Horizontal run per tread (user-selected)",
      type: "number",
      unitImperial: "in",
      unitMetric: "cm",
      defaultImperial: 10,
      defaultMetric: 25.4,
      min: 1,
      step: 0.25,
      help: "This is a geometric input only, not a minimum or recommendation.",
    },
  ],
  calculate: (values, units) => {
    const totalRiseInput = Math.max(0.01, Number(values.totalRise) || 0.01);
    const targetRiserInput = Math.max(0.01, Number(values.targetRiserHeight) || 0.01);
    const treadRunInput = Math.max(0, Number(values.treadRun) || 0);
    const metric = units === "metric";
    const toInches = metric ? 1 / 2.54 : 1;
    const riseInches = totalRiseInput * toInches;
    const targetRiserInches = targetRiserInput * toInches;
    const treadRunInches = treadRunInput * toInches;
    const risers = Math.max(1, ceilQuantity(riseInches / targetRiserInches));
    const riserHeightInches = riseInches / risers;
    const treads = Math.max(0, risers - 1);
    const totalRunInches = treads * treadRunInches;
    const diagonalInches = Math.sqrt(riseInches ** 2 + totalRunInches ** 2);
    const displayFactor = metric ? 2.54 : 1;
    const lengthUnit = metric ? "cm" : "in";
    const displayRise = riseInches * displayFactor;
    const displayRiser = riserHeightInches * displayFactor;
    const displayTreadRun = treadRunInches * displayFactor;
    const displayTotalRun = totalRunInches * displayFactor;
    const displayDiagonal = diagonalInches * displayFactor;
    const precision = metric ? 1 : 2;
    const roundedRiser = round(displayRiser, precision);
    const roundedRun = round(displayTotalRun, precision);

    return {
      value: displayRiser,
      unit: `${lengthUnit} per riser (geometry only)`,
      valueRounded: roundedRiser,
      breakdown: [
        { label: "equal risers", value: `${risers}` },
        { label: "calculated riser height", value: `${formatNumber(roundedRiser)} ${lengthUnit}` },
        { label: "treads between landings", value: `${treads}` },
        { label: "total horizontal run", value: `${formatNumber(roundedRun)} ${lengthUnit}` },
        { label: "rise/run diagonal", value: `${formatNumber(round(displayDiagonal, precision))} ${lengthUnit} (not a cut length)` },
      ],
      formulaSteps: [
        `risers = ceil(${formatNumber(displayRise)} ${lengthUnit} ÷ ${formatNumber(targetRiserInput)} ${lengthUnit} target) = ${risers}`,
        `equal riser height = ${formatNumber(displayRise)} ${lengthUnit} ÷ ${risers} = ${formatNumber(roundedRiser)} ${lengthUnit}`,
        `treads between landings = risers − 1 = ${treads}`,
        `total horizontal run = ${treads} × ${formatNumber(displayTreadRun)} ${lengthUnit} = ${formatNumber(roundedRun)} ${lengthUnit}`,
        `rise/run diagonal = √(${formatNumber(displayRise)}² + ${formatNumber(roundedRun)}²) = ${formatNumber(round(displayDiagonal, precision))} ${lengthUnit}`,
        "These geometric values are not a code check, stringer layout, or construction instruction.",
      ],
      composition: {
        unit: lengthUnit,
        total: round(displayRise + displayTotalRun, precision),
        segments: [
          { label: "Total rise", amount: round(displayRise, precision), shade: "primary" },
          { label: "Total run", amount: round(displayTotalRun, precision), shade: "secondary" },
        ],
      },
    };
  },
  formulaDescription:
    "equal risers = ceil(total rise ÷ user-selected target); treads = risers − 1; total run = treads × user-selected run",
  methodology: [
    "The calculator divides a measured total rise into an integer number of equal risers, choosing the count by rounding up against the user-selected target height. It then multiplies the user-selected horizontal run by the number of treads between landings.",
    "The diagonal is only the straight-line distance between the endpoints defined by total rise and total horizontal run. It is not a stringer cut length and does not account for notches, bearing, attachment, material, or construction tolerances.",
    "This is a geometry aid, not a stair design or code-compliance check. It does not evaluate local code, landings, headroom, nosings, handrails, guards, width, structure, or site conditions. Have a qualified professional verify the complete design and applicable local requirements before construction.",
  ],
  sources: [
    {
      name: "International Code Council: Digital Codes",
      url: "https://codes.iccsafe.org/",
      note: "Consult the locally adopted code and authority having jurisdiction; this calculator performs no code checks.",
    },
  ],
  related: [
    { name: "Decking board calculator", slug: "deck-calculator", description: "Estimate surface area and rough decking-board quantity" },
    { name: "Concrete calculator", slug: "concrete-calculator", description: "Estimate concrete volume for separately designed work" },
  ],
  faq: [
    {
      question: "Does this give me a stringer cut sheet?",
      answer: "No. It provides only simplified stair geometry. It does not account for stringer stock, notches, bearing, attachments, materials, or construction tolerances.",
    },
    {
      question: "Does this check my stairs against building code?",
      answer: "No. It does not check any code requirements. Applicable rules vary by location and project; have the complete design checked against locally adopted requirements by a qualified professional.",
    },
    {
      question: "How are the number of risers chosen?",
      answer: "The calculator rounds up total rise divided by the target riser height entered by the user, then divides total rise evenly by that count. The target is not a code recommendation.",
    },
  ],
};
