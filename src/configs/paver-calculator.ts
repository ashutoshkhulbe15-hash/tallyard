import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const paverCalculatorConfig: CalculatorConfig = {
  slug: "paver-calculator",
  title: "Paver Calculator",
  description:
    "Pavers, base gravel, and sand for any patio or path. Accounts for cuts, pattern waste, and the underlying base layers.",
  categoryLabel: "Landscaping",
  category: "landscaping",

  bannerHeadline: "Pave precisely.",
  bannerTags: ["Pavers + base + sand", "Any pattern", "ft² or m²"],

  inputs: [
    {
      id: "length",
      label: "Area length",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 12,
      defaultMetric: 3.7,
      min: 1,
      step: 0.5,
    },
    {
      id: "width",
      label: "Area width",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 10,
      defaultMetric: 3,
      min: 1,
      step: 0.5,
    },
    {
      id: "paverSize",
      label: "Paver size",
      type: "select",
      defaultImperial: "4x8",
      options: [
        { label: "4 × 8 (brick paver)", value: "4x8" },
        { label: "6 × 6", value: "6x6" },
        { label: "6 × 9", value: "6x9" },
        { label: "8 × 8", value: "8x8" },
        { label: "12 × 12 (large format)", value: "12x12" },
        { label: "16 × 16", value: "16x16" },
      ],
    },
    {
      id: "pattern",
      label: "Pattern",
      type: "select",
      defaultImperial: "running",
      options: [
        { label: "Running bond", value: "running" },
        { label: "Herringbone", value: "herringbone" },
        { label: "Basket weave", value: "basket" },
        { label: "Stack bond", value: "stack" },
      ],
      help: "Herringbone uses more cuts — higher waste",
    },
    {
      id: "use",
      label: "Installation use",
      type: "select",
      defaultImperial: "patio",
      options: [
        { label: "Pedestrian (patio, path)", value: "patio" },
        { label: "Vehicular (driveway)", value: "driveway" },
      ],
      help: "Driveways need 8-10\" base; patios need 4-6\"",
    },
  ],

  calculate: (values, units) => {
    const L = Number(values.length) || 0;
    const W = Number(values.width) || 0;
    const paverSize = String(values.paverSize || "4x8");
    const pattern = String(values.pattern || "running");
    const use = String(values.use || "patio");

    // Paver dimensions (inches)
    const paverMap: Record<string, { l: number; w: number }> = {
      "4x8": { l: 4, w: 8 },
      "6x6": { l: 6, w: 6 },
      "6x9": { l: 6, w: 9 },
      "8x8": { l: 8, w: 8 },
      "12x12": { l: 12, w: 12 },
      "16x16": { l: 16, w: 16 },
    };
    const paver = paverMap[paverSize] || paverMap["4x8"];

    // Pattern waste factor
    const patternWaste: Record<string, number> = {
      running: 5,
      herringbone: 15,
      basket: 8,
      stack: 3,
    };
    const wastePct = patternWaste[pattern] || 5;

    // Area
    const area = L * W;
    const areaSqFt = units === "metric" ? area * 10.764 : area;

    // Paver area in sq ft
    const paverAreaSqFt = (paver.l * paver.w) / 144;

    // Paver count
    const rawPavers = areaSqFt / paverAreaSqFt;
    const paverCount = Math.ceil(rawPavers * (1 + wastePct / 100));

    // Base gravel: depth depends on use
    // Patio: 4-6" (use 5"), Driveway: 8-10" (use 9")
    const baseDepthImperial = use === "driveway" ? 9 : 5;
    const baseDepthFt = baseDepthImperial / 12;
    const baseAreaSqFt = areaSqFt;
    const baseCubicFt = baseAreaSqFt * baseDepthFt;
    const baseCubicYards = baseCubicFt / 27;
    const baseTons = baseCubicYards * 1.4; // crushed stone density

    // Bedding sand: 1" thick
    const sandDepthFt = 1 / 12;
    const sandCubicFt = baseAreaSqFt * sandDepthFt;
    const sandCubicYards = sandCubicFt / 27;
    const sandTons = sandCubicYards * 1.5; // sand density

    // Joint sand (polymeric): approx 1 lb per sq ft for standard joints
    const jointSandLbs = Math.ceil(areaSqFt);

    const areaUnit = units === "metric" ? "m²" : "ft²";
    const volumeUnit = units === "metric" ? "m³" : "yd³";
    const displayArea = units === "metric" ? area : areaSqFt;
    const baseDisplay =
      units === "metric"
        ? round(baseCubicYards * 0.7646, 2)
        : round(baseCubicYards, 2);
    const sandDisplay =
      units === "metric"
        ? round(sandCubicYards * 0.7646, 2)
        : round(sandCubicYards, 2);

    return {
      value: paverCount,
      unit: paverCount === 1 ? "paver" : "pavers",
      valueRounded: paverCount,
      breakdown: [
        { label: "area", value: `${formatNumber(round(displayArea, 1))} ${areaUnit}` },
        {
          label: `base (${baseDepthImperial}" deep)`,
          value: `${formatNumber(baseDisplay)} ${volumeUnit} · ${formatNumber(round(baseTons, 1))} tons`,
        },
        {
          label: "bedding sand (1\")",
          value: `${formatNumber(sandDisplay)} ${volumeUnit}`,
        },
        {
          label: "joint sand",
          value: `${jointSandLbs} lb`,
        },
      ],
      formulaSteps: [
        `area = ${L} × ${W} = ${formatNumber(round(areaSqFt, 1))} sq ft`,
        `paver size = ${paver.l}" × ${paver.w}" = ${formatNumber(round(paverAreaSqFt, 3))} sq ft per paver`,
        `raw pavers = ${formatNumber(round(areaSqFt, 1))} ÷ ${formatNumber(round(paverAreaSqFt, 3))} = ${formatNumber(round(rawPavers, 1))}`,
        `with ${wastePct}% ${pattern} waste = ${paverCount} pavers`,
        `base gravel: ${formatNumber(round(areaSqFt, 1))} × ${baseDepthImperial}"/12 ÷ 27 = ${formatNumber(round(baseCubicYards, 2))} yd³ ≈ ${formatNumber(round(baseTons, 1))} tons`,
        `bedding sand: ${formatNumber(round(areaSqFt, 1))} × 1"/12 ÷ 27 = ${formatNumber(round(sandCubicYards, 2))} yd³`,
        `joint sand ≈ 1 lb/sq ft × ${formatNumber(round(areaSqFt, 0))} = ${jointSandLbs} lb`,
      ],
    };
  },

  formulaDescription:
    "pavers = ⌈area ÷ paver area × (1 + pattern waste)⌉; includes base gravel and bedding sand",

  methodology: [
    "Paver count is calculated by dividing the project area by the area of a single paver, then multiplying by a pattern-specific waste factor. Running bond and stack bond patterns have minimal cuts (3-5% waste). Herringbone requires diagonal cuts at all edges (15% waste). Basket weave sits in between (8%).",
    "A proper paver installation is a three-layer system: compacted gravel base (structural), bedding sand (leveling), and the pavers themselves. The calculator computes all three. Base depth depends on use — 4-6 inches for pedestrian patios and walkways, 8-10 inches for driveways that bear vehicle weight.",
    "Base gravel is typically crushed stone #57 or #3 (angular, self-compacting). The calculator uses density of 1.4 tons per cubic yard, which covers most crushed aggregate. Order by the yard for large jobs (over 3 yd³); by the bag for small patios.",
    "Bedding sand is coarse concrete sand (ASTM C33) spread 1 inch deep and screeded level. Never use play sand or masonry sand — they hold moisture and cause pavers to sink or heave.",
    "Joint sand (polymeric or regular) fills the gaps between pavers. 1 pound per square foot is a rough estimate for standard 1/8\" joints on 4×8 brick pavers. Larger pavers with the same joint width use less; wider joints use more. Polymeric sand hardens when activated with water and prevents weeds and ant invasion.",
    "The calculator does not include: edge restraint (plastic or metal edging at the perimeter, typically 1 linear foot per linear foot of edge), geotextile fabric (recommended under base on clay soils), or drainage provisions. Budget those items separately.",
  ],

  sources: [
    {
      name: "ICPI — Interlocking Concrete Pavement Institute",
      url: "https://icpi.org/",
      note: "Industry standards for base depth and bedding sand",
    },
    {
      name: "Belgard — Paver Installation Guide",
      url: "https://www.belgard.com/",
      note: "Pattern waste factors and coverage recommendations",
    },
  ],

  related: [
    { name: "Gravel calculator", slug: "gravel-calculator", description: "Base gravel for under pavers" },
    { name: "Concrete calculator", slug: "concrete-calculator", description: "Slabs and footings" },
    { name: "Gravel calculator", slug: "gravel-calculator", description: "Base gravel for paver beds" },
    { name: "Mulch calculator", slug: "mulch-calculator", description: "For beds around paver installations" },
  ],

  faq: [
    {
      question: "How many pavers do I need for a 10×12 patio?",
      answer:
        "For a 10×12 ft patio (120 sq ft) using 4×8 brick pavers in a running bond pattern with 5% waste, you need about 570 pavers. Larger 12×12 pavers reduce count to about 126 for the same area. Use the calculator above with your specific paver size.",
    },
    {
      question: "How deep should the base be?",
      answer:
        "Pedestrian patios and walkways: 4-6 inches of compacted gravel, plus 1 inch of bedding sand. Driveways: 8-10 inches of compacted gravel minimum, plus 1 inch of bedding sand. Insufficient base is the #1 cause of paver failure — sinking, heaving, and uneven surfaces almost always trace back to thin or improperly compacted base.",
    },
    {
      question: "What's the difference between base and bedding sand?",
      answer:
        "Base is compacted crushed stone (structural layer that supports load). Bedding sand is 1 inch of coarse concrete sand on top of the base, used to level the pavers. Don't skip either — just sand on dirt will fail within a season.",
    },
    {
      question: "Do I need polymeric sand?",
      answer:
        "Recommended for most installations. Polymeric sand hardens when wetted, preventing weeds, ants, and washout between pavers. Costs 2-3× more than regular sand but the install stays clean for years. Don't use it on permeable pavers or with irrigation that wets the surface daily — it breaks down.",
    },
    {
      question: "What pattern uses the least pavers?",
      answer:
        "Stack bond (pavers aligned in grid) has the lowest waste (~3%). Running bond (standard offset pattern) is similar (~5%). Herringbone at 45 degrees is the highest (~15%) because every edge paver needs a diagonal cut.",
    },
    {
      question: "Can I install pavers over existing concrete?",
      answer:
        "Yes — it's called an overlay. You need thin bedding sand (1/2 inch) directly on the concrete, then pavers. Edge restraint is trickier — you can't stake into concrete, so use adhesive edging. Drainage becomes critical since water can't filter through the slab.",
    },
    {
      question: "How long do pavers take to install?",
      answer:
        "Rough DIY estimate: 1 person can do about 50-75 sq ft per day including excavation and base prep. A 10×12 ft patio takes a full weekend from start to finish. Pros installing only (with excavation and base done) lay about 200-300 sq ft per day.",
    },
    {
      question: "Do I need an edge restraint?",
      answer:
        "Yes — without it, outside pavers slowly shift outward and the pattern unravels. Plastic or metal L-shaped edging spiked every 12 inches is standard. Concrete curb works for permanent installations but costs more. Never skip this step.",
    },
  ],
};
