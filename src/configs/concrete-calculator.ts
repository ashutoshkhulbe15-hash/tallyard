import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const concreteCalculatorConfig: CalculatorConfig = {
  slug: "concrete-calculator",
  title: "Concrete Calculator",
  description:
    "Estimate geometric concrete volume for rectangular or round shapes from entered dimensions and a user-selected planning allowance. Not a structural design or supplier order guarantee.",
  categoryLabel: "Masonry",
  category: "concrete",

  bannerHeadline: "Pour confidently.",
  bannerTags: ["Entered geometry", "Selected planning allowance", "yd³ or m³"],

  inputs: [
    {
      id: "shape",
      label: "Shape",
      type: "select",
      defaultImperial: "rectangular",
      options: [
        { label: "Rectangular", value: "rectangular" },
        { label: "Round", value: "round" },
      ],
    },
    {
      id: "length",
      label: "Length (or diameter for round)",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 10,
      defaultMetric: 3,
      min: 0.5,
      step: 0.5,
    },
    {
      id: "width",
      label: "Width (ignored for round)",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 10,
      defaultMetric: 3,
      min: 0.5,
      step: 0.5,
    },
    {
      id: "thickness",
      label: "Thickness / depth",
      type: "number",
      unitImperial: "in",
      unitMetric: "cm",
      defaultImperial: 4,
      defaultMetric: 10,
      min: 1,
      step: 0.5,
      help: "Enter the formed thickness/depth from your project specification; the calculator does not recommend it.",
    },
    {
      id: "waste",
      label: "Planning allowance",
      type: "select",
      defaultImperial: 10,
      options: [
        { label: "5%", value: 5 },
        { label: "10%", value: 10 },
        { label: "15%", value: 15 },
      ],
    },
  ],

  calculate: (values, units) => {
    const shape = String(values.shape || "rectangular");
    const L = Number(values.length) || 0;
    const W = Number(values.width) || 0;
    const T = Number(values.thickness) || 0;
    const waste = Number(values.waste);

    if (!["rectangular", "round"].includes(shape) || ![L, T, waste].every(Number.isFinite) ||
        L <= 0 || T <= 0 || (shape === "rectangular" && (!Number.isFinite(W) || W <= 0)) ||
        ![5, 10, 15].includes(waste)) {
      throw new Error("Enter positive dimensions and thickness, choose a supported shape, and select a 5%, 10%, or 15% planning allowance.");
    }

    const thicknessInLinearUnit =
      units === "metric" ? T / 100 : T / 12;

    let baseArea: number;
    if (shape === "round") {
      const radius = L / 2;
      baseArea = Math.PI * radius * radius;
    } else {
      baseArea = L * W;
    }

    const baseVolumeInLinearCubed = baseArea * thicknessInLinearUnit;

    const baseVolume =
      units === "metric"
        ? baseVolumeInLinearCubed
        : baseVolumeInLinearCubed / 27;

    const wasteVolume = baseVolume * (waste / 100);
    const totalVolume = baseVolume + wasteVolume;

    const unitLabel = units === "metric" ? "cubic meters" : "cubic yards";
    const unitShort = units === "metric" ? "m³" : "yd³";

    return {
      value: round(totalVolume, 3),
      unit: unitLabel,
      valueRounded: roundUp(totalVolume, 2),
      breakdown: [
        { label: "shape", value: shape === "round" ? "round" : "rectangular" },
        { label: "base volume", value: `${formatNumber(round(baseVolume, 2))} ${unitShort}` },
        { label: "waste", value: `${waste}%` },
      ],
      formulaSteps: [
        shape === "round"
          ? `area = π × (${L}/2)² = ${formatNumber(round(baseArea, 2))} ${units === "metric" ? "m²" : "ft²"}`
          : `area = ${L} × ${W} = ${formatNumber(round(baseArea, 2))} ${units === "metric" ? "m²" : "ft²"}`,
        units === "metric"
          ? `thickness = ${T} cm = ${formatNumber(round(thicknessInLinearUnit, 3))} m`
          : `thickness = ${T} in = ${formatNumber(round(thicknessInLinearUnit, 3))} ft`,
        units === "metric"
          ? `base volume = ${formatNumber(round(baseArea, 2))} × ${formatNumber(round(thicknessInLinearUnit, 3))} = ${formatNumber(round(baseVolume, 3))} m³`
          : `base volume = ${formatNumber(round(baseArea, 2))} × ${formatNumber(round(thicknessInLinearUnit, 3))} = ${formatNumber(round(baseVolumeInLinearCubed, 2))} ft³ ÷ 27 = ${formatNumber(round(baseVolume, 3))} yd³`,
        `waste = ${formatNumber(round(baseVolume, 3))} × ${waste / 100} = ${formatNumber(round(wasteVolume, 3))} ${unitShort}`,
        `total = ${formatNumber(round(baseVolume, 3))} + ${formatNumber(round(wasteVolume, 3))} = ${formatNumber(round(totalVolume, 3))} ${unitShort}`,
        `rounded up to ${formatNumber(roundUp(totalVolume, 2))} ${unitShort}`,
      ],
      composition: {
        unit: unitShort,
        total: round(totalVolume, 3),
        segments: [
          { label: "Base volume", amount: round(baseVolume, 3), shade: "primary" },
          { label: "Waste buffer", amount: round(wasteVolume, 3), shade: "secondary" },
        ],
      },
    };
  },

  formulaDescription:
    "volume = area × thickness × (1 + waste), converted to cubic yards or meters",

  methodology: [
    "For rectangular shapes, the estimate multiplies entered length, width, and thickness. For round shapes, it treats the length input as diameter and uses π × radius² × depth. It assumes uniform thickness and the geometric shape entered.",
    "Imperial results convert cubic feet to cubic yards by dividing by 27. Metric results are calculated in cubic metres. The result excludes unentered features such as thickened edges, steps, grade beams, over-excavation, and irregular subgrade.",
    "The selected percentage is a user-chosen planning allowance, not a universal waste standard or guarantee of sufficiency. Check forms and project drawings, then confirm ordering quantity and increments with the supplier or contractor.",
    "The displayed quantity is rounded for readability; the underlying geometric estimate can differ from actual placed quantity and supplier load sizing.",
  ],

  sources: [
    {
      name: "Portland Cement Association: Concrete Basics",
      url: "https://www.cement.org/learn/concrete-technology/concrete-construction",
      note: "Industry reference for concrete volume calculation",
    },
    {
      name: "National Ready Mixed Concrete Association: Concrete in Practice",
      url: "https://www.nrmca.org/association-resources/research-and-engineering/concrete-in-practice/",
      note: "Industry education; project mix, design, and placement requirements should come from qualified project sources.",
    },
  ],

  related: [
    { name: "Rebar calculator", slug: "rebar-calculator", description: "Preliminary bar quantity for a user-selected grid; not reinforcement design" },
    { name: "Mortar package estimator", slug: "mortar-calculator", description: "Bag count from masonry unit count and exact package coverage" },
    { name: "Gravel calculator", slug: "gravel-calculator", description: "Estimate aggregate volume and approximate weight" },
    { name: "Drain pipe calculator", slug: "drain-pipe-calculator", description: "Illustrative fixture-unit worksheet; not pipe sizing" },
  ],

  faq: [
    {
      question: "How much concrete do I need for a 10×10 slab?",
      answer:
        "For a standard 4-inch thick 10×10 ft slab with 10% waste, you need about 1.4 cubic yards. At 6 inches thick it's 2.1 yards. Use the calculator above for your exact dimensions.",
    },
    {
      question: "Why do I need to add a waste factor?",
      answer:
        "The selected allowance helps plan for differences between nominal and actual form dimensions, uneven subgrade, or placement loss. It is not a guarantee that the order will be sufficient. Measure the formed dimensions and confirm the order with the supplier or concrete contractor.",
    },
    {
      question: "What's the minimum concrete truck order?",
      answer:
        "Minimum loads, short-load fees, delivery access, and bag-versus-ready-mix economics vary by supplier and location. Request local quotes for both options; there is no universal one-yard cutoff.",
    },
    {
      question: "How many bags of concrete equal a cubic yard?",
      answer:
        "Using the stated yields of about 0.45 ft³ per 60-lb bag and 0.6 ft³ per 80-lb bag, one cubic yard (27 ft³) takes about 60 or 45 bags respectively. Check the actual yield printed on your chosen product; bag counts vary by mix.",
    },
    {
      question: "What thickness should my slab be?",
      answer:
        "Required thickness depends on loads, base conditions, concrete design, exposure, and local requirements. The calculator uses the thickness you enter; it does not determine a structurally adequate slab or footing. Confirm specifications with a qualified professional.",
    },
    {
      question: "How is round concrete calculated differently?",
      answer:
        "For round pours (tube forms, round patios, fence posts), the calculator uses π × radius² × thickness instead of length × width × thickness. Enter the diameter in the length field and leave width alone: it's ignored for round shapes.",
    },
    {
      question: "Does this include aggregate, cement, and water?",
      answer:
        "The result is a geometric volume estimate for mixed concrete. It does not select a mix design or calculate constituent quantities for site mixing; use product instructions or a qualified mix designer for those needs.",
    },
    {
      question: "What's the difference between cubic yards and yards of concrete?",
      answer:
        "They're the same thing: 'yards' of concrete is shorthand for cubic yards. A 'yard' of concrete means one cubic yard (3 ft × 3 ft × 3 ft = 27 cubic feet).",
    },
  ],
  relatedGuides: [
    { name: "Cost to pour concrete", slug: "cost-to-pour-concrete", description: "Scope and bid-comparison checklist for a concrete project" },
  ],
};
