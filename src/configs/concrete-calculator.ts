import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const concreteCalculatorConfig: CalculatorConfig = {
  slug: "concrete-calculator",
  title: "Concrete Calculator",
  description:
    "Cubic yards of concrete for slabs, footings, and round pours. Waste factor included so your order matches your project.",
  categoryLabel: "Masonry",
  category: "concrete",

  bannerHeadline: "Pour confidently.",
  bannerTags: ["Accounts for waste", "Slabs or footings", "yd³ or m³"],

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
      help: "Typical slab: 4 in / 10 cm. Footings: 8-12 in / 20-30 cm.",
    },
    {
      id: "waste",
      label: "Waste factor",
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
    const waste = Number(values.waste) || 10;

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
    "For rectangular pours, the calculator multiplies length by width by thickness to get raw volume. For round pours, it uses π × radius² × thickness. Thickness is entered in inches (or centimeters) and converted to the same unit as length and width before the multiplication.",
    "Imperial results convert from cubic feet to cubic yards by dividing by 27 (since 1 cubic yard = 27 cubic feet). Metric results stay in cubic meters directly. Yards and meters are how concrete is sold, so this is what you'll actually order.",
    "A waste factor of 10% is standard for most slab pours — it covers spillage, uneven subgrade, over-excavation, and the practical reality that concrete trucks don't come back for tiny shortages. Use 5% for very flat, well-prepared sites; 15% for irregular shapes or rough subgrade.",
    "The final number is rounded up to the nearest 0.01 cubic yards or meters because concrete suppliers typically sell in increments of 0.25 yards. When you order, round up again to the nearest quarter-yard to account for truck minimums.",
  ],

  sources: [
    {
      name: "Portland Cement Association — Concrete Basics",
      url: "https://www.cement.org/learn/concrete-technology/concrete-construction",
      note: "Industry reference for concrete volume calculation",
    },
    {
      name: "Concrete Network — How Much Concrete Do I Need",
      url: "https://www.concretenetwork.com/concrete/howmuch/calculator.htm",
      note: "Waste factor recommendations for residential pours",
    },
  ],

  related: [
    { name: "Paint calculator", slug: "paint-calculator", description: "Gallons of paint for any room" },
    { name: "Tile calculator", slug: "tile-calculator", description: "Tiles and boxes for any floor" },
    { name: "Gravel calculator", slug: "gravel-calculator", description: "Cubic yards of gravel base for slabs" },
    { name: "Fence calculator", slug: "fence-calculator", description: "Posts, rails, and concrete for post holes" },
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
        "Real-world pours always use more than theoretical volume. Subgrade settles, forms bulge, concrete spills during placement, and finishers prefer working with a slight excess. 10% waste is standard; anything less risks running out mid-pour — which is expensive because another truck delivery incurs a minimum charge.",
    },
    {
      question: "What's the minimum concrete truck order?",
      answer:
        "Most ready-mix suppliers have a 1 cubic yard minimum, and charge a short-load fee for anything under 3-5 yards. For pours under 1 yard, bagged concrete (80 lb bags ≈ 0.02 yards each) is often cheaper even accounting for mixing time.",
    },
    {
      question: "How many bags of concrete equal a cubic yard?",
      answer:
        "A cubic yard of concrete is roughly 60 bags of 50-lb premix, 45 bags of 60-lb, or 40 bags of 80-lb. Bagged concrete is practical for pours under half a yard; above that, ready-mix is more cost-effective.",
    },
    {
      question: "What thickness should my slab be?",
      answer:
        "Sidewalks and patios: 4 inches. Driveways for passenger cars: 4 inches. Driveways for trucks or RVs: 6 inches. Garage floors: 4-6 inches. Footings: 8-12 inches or deeper in cold climates. Check local code — frost depth requirements vary.",
    },
    {
      question: "How is round concrete calculated differently?",
      answer:
        "For round pours (tube forms, round patios, fence posts), the calculator uses π × radius² × thickness instead of length × width × thickness. Enter the diameter in the length field and leave width alone — it's ignored for round shapes.",
    },
    {
      question: "Does this include aggregate, cement, and water?",
      answer:
        "The cubic yardage is for mixed concrete (what you order from a truck or buy in bags). It already includes all components. You don't need to calculate cement, sand, gravel, and water separately unless you're mixing from scratch.",
    },
    {
      question: "What's the difference between cubic yards and yards of concrete?",
      answer:
        "They're the same thing — 'yards' of concrete is shorthand for cubic yards. A 'yard' of concrete means one cubic yard (3 ft × 3 ft × 3 ft = 27 cubic feet).",
    },
  ],
};
