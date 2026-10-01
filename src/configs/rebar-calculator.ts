import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber, ceilQuantity } from "@/lib/format";

export const rebarCalculatorConfig: CalculatorConfig = {
  slug: "rebar-calculator",
  title: "Reinforcing Bar Grid Geometry Estimator",
  description: "Estimate the number and gross length of grid runs from a rectangular footprint and user-selected maximum spacing. Not reinforcement design or a bar order list.",
  categoryLabel: "Masonry",
  category: "concrete",
  bannerHeadline: "Estimate grid geometry.",
  bannerTags: ["Rectangular footprint", "User-selected spacing", "Not a structural design"],
  inputs: [
    { id: "length", label: "Footprint length", type: "number", unitImperial: "ft", unitMetric: "m", defaultImperial: 20, defaultMetric: 6.096, min: 0.01, step: 0.5 },
    { id: "width", label: "Footprint width", type: "number", unitImperial: "ft", unitMetric: "m", defaultImperial: 12, defaultMetric: 3.6576, min: 0.01, step: 0.5 },
    {
      id: "spacing", label: "User-selected maximum grid spacing", type: "select", defaultImperial: 16,
      options: [
        { label: '12 in (30.48 cm)', value: 12 }, { label: '16 in (40.64 cm)', value: 16 },
        { label: '18 in (45.72 cm)', value: 18 }, { label: '24 in (60.96 cm)', value: 24 },
      ],
      help: "Select spacing from project drawings or a qualified design; the calculator does not recommend spacing.",
    },
  ],
  calculate: (values, units) => {
    const length = Number(values.length);
    const width = Number(values.width);
    const spacingInches = Number(values.spacing);
    if (![length, width, spacingInches].every(Number.isFinite) || length <= 0 || width <= 0 ||
        ![12, 16, 18, 24].includes(spacingInches)) {
      throw new Error("Enter positive rectangular dimensions and choose a supported spacing from the project specification.");
    }
    const lengthInches = units === "metric" ? length * 39.37007874015748 : length * 12;
    const widthInches = units === "metric" ? width * 39.37007874015748 : width * 12;
    const barsAlongLength = ceilQuantity(widthInches / spacingInches) + 1;
    const barsAlongWidth = ceilQuantity(lengthInches / spacingInches) + 1;
    const grossLengthInches = barsAlongLength * lengthInches + barsAlongWidth * widthInches;
    const grossLengthFeet = grossLengthInches / 12;
    const displayLength = units === "metric" ? grossLengthFeet * 0.3048 : grossLengthFeet;
    const area = length * width;
    const areaUnit = units === "metric" ? "m²" : "ft²";
    const lengthUnit = units === "metric" ? "m" : "ft";
    return {
      value: round(displayLength, 2),
      unit: `gross lineal ${lengthUnit}`,
      valueRounded: round(displayLength, 1),
      breakdown: [
        { label: "rectangular footprint", value: `${formatNumber(round(area, 2))} ${areaUnit}` },
        { label: "runs parallel to length", value: `${barsAlongLength}` },
        { label: "runs parallel to width", value: `${barsAlongWidth}` },
        { label: "gross grid run length", value: `${formatNumber(round(displayLength, 2))} ${lengthUnit}` },
      ],
      formulaSteps: [
        `runs parallel to length = ceil(width ÷ ${spacingInches} in) + 1 = ${barsAlongLength}`,
        `runs parallel to width = ceil(length ÷ ${spacingInches} in) + 1 = ${barsAlongWidth}`,
        `gross run length before design details = ${barsAlongLength} × ${round(lengthInches / 12, 3)} ft + ${barsAlongWidth} × ${round(widthInches / 12, 3)} ft = ${round(grossLengthFeet, 2)} ft`,
        "This geometry excludes cover, hooks, bends, laps, cut plans, support chairs, perimeter bars, and structural requirements.",
      ],
    };
  },
  formulaDescription: "parallel runs = ceil(perpendicular footprint dimension ÷ selected maximum spacing) + 1; gross length = run counts × footprint dimensions",
  methodology: [
    "The estimator places straight, full-dimension grid runs along both directions of a rectangle. For each direction it divides the perpendicular dimension by the user-selected maximum spacing, rounds up to an interval count, then adds one run.",
    "Grid spacing is converted from the selected inch-based option exactly in both unit modes. The output is gross lineal geometry only. It does not deduct concrete cover or add hooks, bends, development length, lap splices, openings, edge bars, chairs, or cut-plan optimization.",
    "This tool does not choose bar size or spacing and does not assess whether reinforcement is required or adequate. Follow engineered drawings and applicable project specifications; obtain qualified structural review where needed. Do not use this estimate as a purchase list.",
  ],
  sources: [
    { name: "Concrete Reinforcing Steel Institute: Resources", url: "https://www.crsi.org/resources/", note: "General reinforcing-steel resources; reinforcement design and detailing are outside this estimator." },
  ],
  related: [
    { name: "Concrete volume calculator", slug: "concrete-calculator", description: "Geometric concrete volume estimate; not structural design" },
    { name: "Lumber calculator", slug: "lumber-calculator", description: "Board feet and linear-length estimates" },
  ],
  faq: [
    { question: "Does this tell me what rebar spacing or size to use?", answer: "No. Enter spacing taken from project documents or a qualified design. This tool does not select bar size or determine whether the reinforcement is structurally adequate." },
    { question: "Does this give me the number of stock bars to buy?", answer: "No. It estimates gross straight grid runs only. Cover, splices, hooks, bends, waste, stock lengths, and cut optimization need the actual drawings and a bar schedule." },
    { question: "Why can the estimate differ from my bar schedule?", answer: "The simple rectangle does not include edge offsets, openings, laps, hooks, development length, support details, or placement requirements. The project drawings and qualified bar-detailing review govern." },
  ],
};
