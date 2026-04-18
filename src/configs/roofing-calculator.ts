import { RoofingCalculatorExpansion } from "@/content/roofing-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const roofingCalculatorConfig: CalculatorConfig = {
  slug: "roofing-calculator",
  title: "Roofing Calculator",
  description:
    "Shingles and squares of roofing for any pitch and footprint. Accounts for waste, ridge caps, and the slope multiplier.",
  categoryLabel: "Roofing",
  category: "roofing",

  bannerHeadline: "Roof right.",
  bannerTags: ["Accounts for pitch", "Ridge caps included", "Asphalt shingles"],

  inputs: [
    {
      id: "length",
      label: "House length (footprint)",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 40,
      defaultMetric: 12,
      min: 5,
      step: 1,
    },
    {
      id: "width",
      label: "House width (footprint)",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 30,
      defaultMetric: 9,
      min: 5,
      step: 1,
    },
    {
      id: "pitch",
      label: "Roof pitch",
      type: "select",
      defaultImperial: "6/12",
      options: [
        { label: "Flat (0/12)", value: "0/12" },
        { label: "3/12 (low slope)", value: "3/12" },
        { label: "4/12", value: "4/12" },
        { label: "6/12 (standard)", value: "6/12" },
        { label: "8/12", value: "8/12" },
        { label: "10/12 (steep)", value: "10/12" },
        { label: "12/12 (very steep)", value: "12/12" },
      ],
      help: "Rise over 12 inches of run. 4/12 is low-slope, 6/12 is standard, 10/12+ needs special safety.",
    },
    {
      id: "waste",
      label: "Waste factor",
      type: "select",
      defaultImperial: 10,
      options: [
        { label: "10%", value: 10 },
        { label: "15%", value: 15 },
        { label: "20%", value: 20 },
      ],
      help: "15% for complex roofs with dormers, hips, or valleys",
    },
  ],

  calculate: (values, units) => {
    const L = Number(values.length) || 0;
    const W = Number(values.width) || 0;
    const pitch = String(values.pitch || "6/12");
    const waste = Number(values.waste) || 10;

    // Pitch multiplier (slope factor) = √(1 + (rise/run)²)
    const pitchMultipliers: Record<string, number> = {
      "0/12": 1.0,
      "3/12": 1.031,
      "4/12": 1.054,
      "6/12": 1.118,
      "8/12": 1.202,
      "10/12": 1.302,
      "12/12": 1.414,
    };
    const slopeFactor = pitchMultipliers[pitch] || 1.118;

    // Footprint area
    const footprintArea = L * W;
    // Actual roof surface area (accounts for slope)
    const roofArea = footprintArea * slopeFactor;
    const roofAreaWithWaste = roofArea * (1 + waste / 100);

    const areaUnit = units === "metric" ? "m²" : "ft²";

    // Roofing squares: 1 square = 100 sq ft. Metric stays in m².
    const squares = units === "metric" ? null : roofAreaWithWaste / 100;

    // Shingle bundles: standard 3-tab asphalt = 3 bundles per square
    const bundles = units === "metric"
      ? Math.ceil(roofAreaWithWaste / 3.1) // ~3.1 m² per bundle (≈33 sq ft)
      : Math.ceil((squares || 0) * 3);

    // Ridge cap bundles: estimate 1 bundle per 35 linear ft of ridge+hip
    // For a simple gable: ridge = L, so 1 bundle per 35 ft of length
    const ridgeLinear = L;
    const ridgeUnitDivisor = units === "metric" ? 10.7 : 35;
    const ridgeBundles = Math.ceil(ridgeLinear / ridgeUnitDivisor);

    const totalBundles = bundles + ridgeBundles;

    return {
      value: totalBundles,
      unit: totalBundles === 1 ? "bundle" : "bundles",
      valueRounded: totalBundles,
      breakdown: [
        { label: "footprint", value: `${formatNumber(round(footprintArea, 0))} ${areaUnit}` },
        {
          label: "roof area",
          value: `${formatNumber(round(roofAreaWithWaste, 0))} ${areaUnit}${squares !== null ? ` · ${round(squares, 1)} sq` : ""}`,
        },
        { label: "ridge caps", value: `${ridgeBundles} bundle${ridgeBundles !== 1 ? "s" : ""}` },
      ],
      formulaSteps: [
        `footprint = ${L} × ${W} = ${formatNumber(round(footprintArea, 0))} ${areaUnit}`,
        `slope factor for ${pitch} pitch = ${slopeFactor}`,
        `roof area = ${formatNumber(round(footprintArea, 0))} × ${slopeFactor} = ${formatNumber(round(roofArea, 0))} ${areaUnit}`,
        `with ${waste}% waste = ${formatNumber(round(roofArea, 0))} × ${(1 + waste / 100).toFixed(2)} = ${formatNumber(round(roofAreaWithWaste, 0))} ${areaUnit}`,
        squares !== null
          ? `squares = ${formatNumber(round(roofAreaWithWaste, 0))} ÷ 100 = ${formatNumber(round(squares, 2))} squares`
          : `bundles needed = ⌈${formatNumber(round(roofAreaWithWaste, 0))} ÷ 3.1⌉ = ${bundles} bundles`,
        units === "metric"
          ? ""
          : `field bundles = ⌈${formatNumber(round(squares || 0, 2))} × 3⌉ = ${bundles} bundles`,
        `ridge cap bundles = ⌈${ridgeLinear} ÷ ${ridgeUnitDivisor}⌉ = ${ridgeBundles}`,
        `total = ${bundles} + ${ridgeBundles} = ${totalBundles} bundles`,
      ].filter(Boolean) as string[],
      composition: {
        unit: "bundles",
        total: totalBundles,
        segments: [
          { label: "Field shingles", amount: bundles, shade: "primary" },
          { label: "Ridge caps", amount: ridgeBundles, shade: "secondary" },
        ],
      },
    };
  },

  ContentExpansion: RoofingCalculatorExpansion,

  formulaDescription:
    "bundles = ⌈(footprint × slope × (1 + waste)) ÷ square size × 3⌉ + ridge caps",

  methodology: [
    "The calculator takes your house footprint (the outline viewed from above, not the actual roof surface), multiplies by a slope factor based on your pitch, and adds a waste percentage. The slope factor accounts for the fact that a sloped roof has more surface area than a flat one — a 6/12 pitch adds about 12%; a 12/12 pitch adds 41%.",
    "Pitch is measured as rise over run — 6/12 means the roof rises 6 inches for every 12 inches of horizontal distance. In the US, 4/12 is the minimum for most shingle warranties; 6/12 is the most common residential pitch; anything over 10/12 typically needs special safety equipment and rope work.",
    "In imperial units, roofing is sold by the 'square' — 100 square feet of coverage. Three-tab asphalt shingles typically pack 3 bundles per square. The calculator converts your total roof area to squares and then to bundles.",
    "Ridge cap bundles are estimated separately. A simple gable roof needs ridge caps along the peak (the length of the house). Complex roofs with hips and valleys need more — add 1-2 bundles for typical homes with multiple roof planes.",
    "For complex roofs with dormers, hips, valleys, or multiple gables, bump the waste factor to 15-20%. The footprint-times-slope-factor method underestimates total area on complex shapes because it doesn't account for the extra surface from hip and valley planes.",
  ],

  sources: [
    {
      name: "GAF — Roofing Calculator Guide",
      url: "https://www.gaf.com/en-us/for-homeowners/roofing-advice",
      note: "Industry-standard slope factors and bundle counts",
    },
    {
      name: "Owens Corning — Asphalt Shingle Installation",
      url: "https://www.owenscorning.com/roofing",
      note: "Reference for waste factors and ridge cap requirements",
    },
  ],

  related: [
    { name: "Concrete calculator", slug: "concrete-calculator", description: "Cubic yards for any slab or footing" },
    { name: "Gutter calculator", slug: "gutter-calculator", description: "Linear feet of gutter for a house" },
    { name: "Insulation calculator", slug: "insulation-calculator", description: "Attic insulation R-value and coverage" },
    { name: "Paint calculator", slug: "paint-calculator", description: "Exterior paint for siding and trim" },
  ],

  faq: [
    {
      question: "How many bundles of shingles do I need for a 1,200 sq ft roof?",
      answer:
        "For a standard 6/12 pitch roof with a 1,200 sq ft footprint, plan on about 46 bundles of field shingles plus 2-3 bundles of ridge caps. That's about 15 squares at 3 bundles each, plus 10% waste. Use the calculator above for your exact dimensions.",
    },
    {
      question: "What does 'roofing square' mean?",
      answer:
        "One roofing square equals 100 square feet of roof surface. It's the standard unit shingles are sold in — a bundle is typically one-third of a square, so 3 bundles = 1 square. When a contractor says 'a 20-square roof,' they mean 2,000 sq ft of roof surface.",
    },
    {
      question: "How do I find my roof pitch without climbing up?",
      answer:
        "From the ground, sight along the roof edge with a ruler and compare to a pitch guide (many hardware stores carry printed cards). Alternatively, there are free pitch measurement apps. For most houses built after 1980, 4/12 to 6/12 is typical. If you can't tell and it's not obviously steep, assume 6/12 — it's close enough for ordering.",
    },
    {
      question: "Why is roofing more than my footprint?",
      answer:
        "A sloped roof has more surface area than the floor it covers. A 6/12 pitch adds about 12% area; a 12/12 pitch adds 41%. The calculator's slope factor accounts for this. Don't use just your footprint for ordering — you'll come up short.",
    },
    {
      question: "What's the right waste factor for my roof?",
      answer:
        "10% for simple gable roofs with no dormers or valleys. 15% for typical homes with 1-2 small dormers or chimney cuts. 20% for complex roofs with multiple hips, valleys, dormers, or skylights. When in doubt, pick the higher number — spare shingles are cheap insurance against return trips.",
    },
    {
      question: "Does this include ridge caps?",
      answer:
        "Yes — the calculator adds ridge cap bundles based on the length of your ridge. For a simple gable roof, ridge length roughly equals house length. For complex hip roofs, add 50% more ridge caps since hip edges also need capping.",
    },
    {
      question: "Is this calculator for asphalt shingles only?",
      answer:
        "The area math works for any material, but the bundle count is specific to asphalt (3 bundles per square). For metal, clay tile, or slate, calculate total square footage from the result and consult your specific product's coverage spec.",
    },
    {
      question: "Do I need underlayment and nails separately?",
      answer:
        "Yes — this calculates shingles only. You also need underlayment (roll-by-roll, typically 400 sq ft per roll), drip edge (linear feet of eaves and rakes), starter strips (one bundle per 150 ft of eaves), and roofing nails (about 2 lbs per square). A starter-strip calculator is typically one row along the eaves.",
    },
  ],
};
