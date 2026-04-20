import { SidingCalculatorExpansion } from "@/content/siding-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const sidingCalculatorConfig: CalculatorConfig = {
  slug: "siding-calculator",
  title: "Siding Calculator",
  description:
    "Squares and linear feet of siding for any house. Accounts for gables, openings, and typical 10-15% waste by material type.",
  categoryLabel: "Roofing",
  category: "roofing",

  bannerHeadline: "Clad cleanly.",
  bannerTags: ["Vinyl or wood", "Squares + linear ft", "Gables included"],

  inputs: [
    {
      id: "perimeter",
      label: "House perimeter",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 140,
      defaultMetric: 43,
      min: 20,
      step: 1,
      help: "Sum of all exterior wall lengths. Typical 2,000 sq ft home: 160-200 ft.",
    },
    {
      id: "height",
      label: "Average wall height",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 9,
      defaultMetric: 2.7,
      min: 6,
      step: 0.5,
      help: "Floor to eave. Ranch: 8-9 ft. Two-story: 18-20 ft.",
    },
    {
      id: "gables",
      label: "Gable triangles",
      type: "select",
      defaultImperial: 2,
      options: [
        { label: "0 (hip roof)", value: 0 },
        { label: "2 (standard gable)", value: 2 },
        { label: "4 (cross-gable)", value: 4 },
      ],
      help: "Each gable triangle adds about 40-80 sq ft depending on pitch",
    },
    {
      id: "gableSize",
      label: "Gable size",
      type: "select",
      defaultImperial: 60,
      options: [
        { label: "Small (30 ft²)", value: 30 },
        { label: "Medium (60 ft²)", value: 60 },
        { label: "Large (100 ft²)", value: 100 },
      ],
    },
    {
      id: "material",
      label: "Material",
      type: "select",
      defaultImperial: "vinyl",
      options: [
        { label: "Vinyl (lap)", value: "vinyl" },
        { label: "Fiber cement (Hardie)", value: "fiber" },
        { label: "Wood (cedar lap)", value: "wood" },
        { label: "Engineered wood (LP)", value: "engineered" },
      ],
    },
    {
      id: "openings",
      label: "Doors + windows (count)",
      type: "number",
      defaultImperial: 14,
      min: 0,
      step: 1,
      help: "Total count. Each subtracts ~20 sq ft (averaged across types).",
    },
  ],

  calculate: (values, units) => {
    const perimeter = Number(values.perimeter) || 0;
    const height = Number(values.height) || 0;
    const gables = Number(values.gables) || 0;
    const gableSize = Number(values.gableSize) || 60;
    const material = String(values.material || "vinyl");
    const openings = Number(values.openings) || 0;

    // Convert to feet for calculations
    const perimeterFt = units === "metric" ? perimeter * 3.281 : perimeter;
    const heightFt = units === "metric" ? height * 3.281 : height;

    // Rectangular wall area
    const wallArea = perimeterFt * heightFt;
    // Gables
    const gableArea = gables * gableSize;
    // Openings subtracted
    const openingArea = openings * 20;

    const netArea = Math.max(0, wallArea + gableArea - openingArea);

    // Waste by material
    const wasteMap: Record<string, number> = {
      vinyl: 10,
      fiber: 10,
      wood: 15,
      engineered: 12,
    };
    const wastePct = wasteMap[material] || 10;
    const areaWithWaste = netArea * (1 + wastePct / 100);

    // Squares (1 square = 100 sq ft, standard siding unit)
    const squares = areaWithWaste / 100;

    // Linear feet for trim and starter (perimeter-based)
    const trimLinearFt = perimeterFt * 2; // top + bottom starter + J-channel around openings
    const jChannelLinearFt = openings * 16; // ~16 LF per opening (perimeter of window/door)

    return {
      value: round(squares, 1),
      unit: "squares",
      valueRounded: Math.ceil(squares),
      breakdown: [
        { label: "wall area", value: `${formatNumber(round(wallArea, 0))} ft²` },
        ...(gableArea > 0
          ? [{ label: "gables", value: `${formatNumber(gableArea)} ft²` }]
          : []),
        { label: "openings subtracted", value: `${openingArea} ft²` },
        { label: "with waste", value: `${formatNumber(round(areaWithWaste, 0))} ft²` },
        { label: "trim linear ft", value: `${formatNumber(round(trimLinearFt + jChannelLinearFt, 0))}` },
      ],
      formulaSteps: [
        `wall area = ${formatNumber(round(perimeterFt, 0))} × ${heightFt} = ${formatNumber(round(wallArea, 0))} ft²`,
        gables > 0
          ? `gables = ${gables} × ${gableSize} = ${formatNumber(gableArea)} ft²`
          : "no gables (hip roof)",
        `openings = ${openings} × 20 = ${openingArea} ft²`,
        `net area = ${formatNumber(round(wallArea + gableArea, 0))} − ${openingArea} = ${formatNumber(round(netArea, 0))} ft²`,
        `${material} waste = ${wastePct}%`,
        `with waste = ${formatNumber(round(netArea, 0))} × ${(1 + wastePct / 100).toFixed(2)} = ${formatNumber(round(areaWithWaste, 0))} ft²`,
        `squares = ${formatNumber(round(areaWithWaste, 0))} ÷ 100 = ${formatNumber(round(squares, 2))} squares`,
        `trim + J-channel = ${formatNumber(round(trimLinearFt, 0))} + ${jChannelLinearFt} = ${formatNumber(round(trimLinearFt + jChannelLinearFt, 0))} linear ft`,
      ],
    };
  },

  ContentExpansion: SidingCalculatorExpansion,

  formulaDescription:
    "squares = ((perimeter × height + gables − openings) × (1 + waste)) ÷ 100",

  methodology: [
    "Wall area is the perimeter of the house times the average wall height. Perimeter means the sum of all exterior wall lengths — for a simple rectangular house, just 2 × (length + width). For houses with offsets, bays, or wings, add each wall length separately.",
    "Gable triangles (the triangular ends of a house with a gable roof) are added separately because the math is different. A gable is half of a rectangle: (base × rise) ÷ 2. Gable size depends on roof pitch and house width — 30 sq ft is typical for a small gable on a narrow house; 100 sq ft is large (steep pitch on a wide house). Hip roofs have no gables.",
    "Openings (doors and windows) are subtracted using an average of 20 square feet each. This is a compromise: exterior doors are about 21 sq ft, standard windows are 15-18 sq ft, large picture windows are 25-35 sq ft. For more accuracy, count large windows as two.",
    "Waste factor varies by material. Vinyl lap siding has panels 12 feet long with butt-joint ends — minimal waste (10%). Fiber cement (like James Hardie) comes in 12-foot planks with similar waste. Wood clapboard has more cuts and grain matching — 15%. Engineered wood (LP SmartSide) falls in between at 12%.",
    "Siding is sold by 'square' — 100 square feet of coverage. One carton of vinyl siding covers 2 squares (200 sq ft). Fiber cement comes in cartons that cover about 1.5 squares per box. The calculator rounds up to the nearest whole square when ordering.",
    "Not included in this calculator: soffit, fascia, house wrap, insulation, fasteners, corner posts, starter strip, or finish trim pieces. These typically add 15-25% to the total material cost. Budget for these separately when shopping. Also not included: the labor cost, which for professional installation runs $2-8 per sq ft depending on material and region.",
  ],

  sources: [
    {
      name: "James Hardie — Installation Guide",
      url: "https://www.jameshardie.com/",
      note: "Coverage and waste for fiber cement siding",
    },
    {
      name: "Vinyl Siding Institute — Estimating",
      url: "https://www.vinylsiding.org/",
      note: "Industry standard coverage for vinyl lap siding",
    },
  ],

  related: [
    { name: "Roofing calculator", slug: "roofing-calculator", description: "Shingle bundles for any pitch" },
    { name: "Insulation calculator", slug: "insulation-calculator", description: "R-value and bags for walls" },
    { name: "Paint calculator", slug: "paint-calculator", description: "Exterior paint and trim" },
    { name: "Drywall calculator", slug: "drywall-calculator", description: "Interior sheets for walls" },
  ],

  faq: [
    {
      question: "How many squares of siding do I need for a 2,000 sq ft house?",
      answer:
        "For a typical 2,000 sq ft two-story house with 140 ft perimeter, 9 ft walls, 2 gables, and 14 openings: about 19-21 squares of vinyl siding. A single-story home with the same square footage but larger footprint (250 ft perimeter) needs 22-25 squares. Use the calculator above for exact numbers.",
    },
    {
      question: "What's a siding square?",
      answer:
        "One siding square equals 100 square feet of coverage — same unit as roofing. Siding is sold by the carton, which typically covers 2 squares (200 sq ft) for vinyl. Fiber cement and wood sidings are often sold by the piece or square foot instead, but the 'square' unit still helps with estimating.",
    },
    {
      question: "Do I subtract windows and doors from my total?",
      answer:
        "The calculator subtracts 20 sq ft per opening automatically. This is a practical average — real doors are 21 sq ft, standard windows 15-18 sq ft, large windows 25-35 sq ft. For a kitchen with lots of large windows, manually count large ones as two openings. For houses with mostly small windows, don't adjust.",
    },
    {
      question: "How do I measure a gable?",
      answer:
        "A gable is a triangle. Measure the base (width of the wall at ceiling level) and the rise (distance from the ceiling level to the peak of the roof). Area = (base × rise) ÷ 2. Typical residential gable: 24 ft base × 6 ft rise = 72 sq ft. Use the calculator's gable-size presets as a rough guide.",
    },
    {
      question: "What's the cheapest siding material?",
      answer:
        "Vinyl is cheapest: $3-8 per sq ft installed. Then engineered wood ($4-10), fiber cement ($6-13), then cedar wood ($7-15). These are 2025-2026 installed prices including labor. Removing old siding adds $1-3 per sq ft. For a 2,000 sq ft project, total budget ranges from $6,000 for basic vinyl to $30,000 for premium fiber cement.",
    },
    {
      question: "Do I need house wrap and insulation under the siding?",
      answer:
        "House wrap (like Tyvek) is recommended under all siding — it sheds liquid water while allowing vapor to escape. Required by most modern building codes. Exterior insulation (rigid foam) under siding is increasingly standard for energy efficiency, especially in colder climates. Neither is in this calculator.",
    },
    {
      question: "How long does siding last?",
      answer:
        "Vinyl: 30-40 years typical. Fiber cement: 30-50 years. Cedar wood: 20-30 years (requires staining/painting every 3-7 years). Engineered wood: 25-40 years with maintenance. Warranty periods often don't reflect real life — replace when the old siding cracks, fades, warps, or shows water intrusion, not when the warranty expires.",
    },
    {
      question: "Can I install siding over existing siding?",
      answer:
        "Vinyl siding can be installed over existing wood or vinyl siding in some cases, but it's not recommended — hides potential rot, adds 1-2\" thickness to walls (messes with window and door trim), and limits the ability to inspect for damage. For a proper job, tear off old siding to the sheathing and re-install.",
    },
  ],
  relatedGuides: [
    { name: "Vinyl vs fiber cement siding", slug: "vinyl-vs-fiber-cement-siding", description: "30-year cost comparison with fire ratings and maintenance math" },
  ],
};
