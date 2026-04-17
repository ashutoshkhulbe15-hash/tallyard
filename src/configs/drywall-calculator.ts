import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const drywallCalculatorConfig: CalculatorConfig = {
  slug: "drywall-calculator",
  title: "Drywall Calculator",
  description:
    "Sheets of drywall needed for any room or wall. Accounts for waste, cuts, and standard sheet sizes so you buy once.",
  categoryLabel: "Drywall",
  category: "drywall",

  bannerHeadline: "Sheet smarter.",
  bannerTags: ["Walls and ceilings", "Accounts for waste", "4×8 or 4×12"],

  inputs: [
    {
      id: "length",
      label: "Room length",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 14,
      defaultMetric: 4.3,
      min: 1,
      step: 0.5,
    },
    {
      id: "width",
      label: "Room width",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 12,
      defaultMetric: 3.7,
      min: 1,
      step: 0.5,
    },
    {
      id: "height",
      label: "Ceiling height",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 9,
      defaultMetric: 2.7,
      min: 1,
      step: 0.5,
    },
    {
      id: "sheetSize",
      label: "Sheet size",
      type: "select",
      defaultImperial: "4x8",
      options: [
        { label: "4 × 8 ft", value: "4x8" },
        { label: "4 × 10 ft", value: "4x10" },
        { label: "4 × 12 ft", value: "4x12" },
      ],
    },
    {
      id: "includeCeiling",
      label: "Include ceiling",
      type: "select",
      defaultImperial: "yes",
      options: [
        { label: "Yes", value: "yes" },
        { label: "No (walls only)", value: "no" },
      ],
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
      help: "Bump up for rooms with many windows, doors, or angles",
    },
  ],

  calculate: (values, units) => {
    const L = Number(values.length) || 0;
    const W = Number(values.width) || 0;
    const H = Number(values.height) || 0;
    const sheetSize = String(values.sheetSize || "4x8");
    const includeCeiling = String(values.includeCeiling || "yes") === "yes";
    const waste = Number(values.waste) || 10;

    // Sheet area in sq ft (or converted for metric)
    const sheetDimensions: Record<string, { wImp: number; hImp: number }> = {
      "4x8": { wImp: 4, hImp: 8 },
      "4x10": { wImp: 4, hImp: 10 },
      "4x12": { wImp: 4, hImp: 12 },
    };
    const sheet = sheetDimensions[sheetSize] || sheetDimensions["4x8"];

    // For metric: convert input dimensions to feet internally since sheets are sold in feet
    // globally. Alternative: metric dimensions treated as meters and sheets also in meters.
    // We'll be consistent: if user is in metric, we assume they're in a market with metric
    // sheets (1.2m × 2.4m / 3.0m / 3.6m ≈ 4×8, 4×10, 4×12)
    const metricSheetSizes: Record<string, { wMet: number; hMet: number }> = {
      "4x8": { wMet: 1.2, hMet: 2.4 },
      "4x10": { wMet: 1.2, hMet: 3.0 },
      "4x12": { wMet: 1.2, hMet: 3.6 },
    };
    const metricSheet = metricSheetSizes[sheetSize] || metricSheetSizes["4x8"];

    const sheetArea =
      units === "metric"
        ? metricSheet.wMet * metricSheet.hMet
        : sheet.wImp * sheet.hImp;
    const areaUnit = units === "metric" ? "m²" : "ft²";

    // Walls: perimeter × height
    const perimeter = 2 * (L + W);
    const wallArea = perimeter * H;

    // Ceiling (if included): L × W
    const ceilingArea = includeCeiling ? L * W : 0;

    const totalArea = wallArea + ceilingArea;
    const rawSheets = totalArea / sheetArea;
    const sheetsWithWaste = rawSheets * (1 + waste / 100);
    const sheetsNeeded = Math.ceil(sheetsWithWaste);

    return {
      value: sheetsNeeded,
      unit: sheetsNeeded === 1 ? "sheet" : "sheets",
      valueRounded: sheetsNeeded,
      breakdown: [
        { label: "total area", value: `${formatNumber(round(totalArea, 1))} ${areaUnit}` },
        { label: "sheet size", value: sheetSize.replace("x", " × ") },
        { label: "waste", value: `${waste}%` },
      ],
      formulaSteps: [
        `walls = 2 × (${L} + ${W}) × ${H} = ${formatNumber(round(wallArea, 1))} ${areaUnit}`,
        includeCeiling
          ? `ceiling = ${L} × ${W} = ${formatNumber(round(ceilingArea, 1))} ${areaUnit}`
          : `ceiling = not included`,
        `total area = ${formatNumber(round(totalArea, 1))} ${areaUnit}`,
        `sheet area = ${units === "metric" ? `${metricSheet.wMet} × ${metricSheet.hMet}` : `${sheet.wImp} × ${sheet.hImp}`} = ${formatNumber(round(sheetArea, 2))} ${areaUnit}`,
        `raw sheets = ${formatNumber(round(totalArea, 1))} ÷ ${formatNumber(round(sheetArea, 2))} = ${formatNumber(round(rawSheets, 1))}`,
        `with ${waste}% waste = ${formatNumber(round(rawSheets, 1))} × ${(1 + waste / 100).toFixed(2)} = ${formatNumber(round(sheetsWithWaste, 1))}`,
        `rounded up to ${sheetsNeeded} sheets`,
      ],
      composition: {
        unit: areaUnit,
        total: round(totalArea, 1),
        segments: [
          { label: "Walls", amount: round(wallArea, 1), shade: "primary" },
          ...(includeCeiling
            ? ([{ label: "Ceiling", amount: round(ceilingArea, 1), shade: "secondary" as const }])
            : []),
        ],
      },
    };
  },

  formulaDescription:
    "sheets = ⌈((wall area + ceiling area) ÷ sheet area) × (1 + waste)⌉",

  methodology: [
    "Wall area is calculated as perimeter (2 × length + 2 × width) times ceiling height. If 'include ceiling' is selected, the ceiling area (length × width) is added. No subtraction is made for doors and windows — drywall cuts leave unusable scrap, and the waste factor covers those small openings better than exact subtraction does.",
    "Sheet sizes are the three standard options sold at lumber yards in North America: 4×8 (most common, easiest to carry), 4×10 (reduces seams on 10-ft ceilings), and 4×12 (fewest seams, hardest to handle). Metric markets use the equivalent 1.2 × 2.4 m, 1.2 × 3.0 m, and 1.2 × 3.6 m panels.",
    "Waste factor of 10% is standard for square rooms with few openings. Use 15% for most typical rooms; 20% for rooms with lots of windows, doors, angled walls, or vaulted ceilings where cut scraps can't be reused.",
    "The result is rounded up to the next whole sheet because you can't buy half a sheet. For larger projects, round up to the next even number — damaged sheets and miscounts during install are common, and a spare pair saves a return trip.",
  ],

  sources: [
    {
      name: "US Gypsum Company — Drywall Installation Guide",
      url: "https://www.usg.com/content/usgcom/en/tools-resources/design-studio.html",
      note: "Industry reference for standard sheet sizes and coverage",
    },
    {
      name: "Family Handyman — How Much Drywall Do I Need",
      url: "https://www.familyhandyman.com/",
      note: "Practical waste factor and coverage recommendations",
    },
  ],

  related: [
    { name: "Paint calculator", slug: "paint-calculator", description: "Gallons of paint after drywall is up" },
    { name: "Joint compound calculator", slug: "joint-compound-calculator", description: "Mud and tape for your sheets" },
    { name: "Insulation calculator", slug: "insulation-calculator", description: "R-value and square footage for walls" },
    { name: "Concrete calculator", slug: "concrete-calculator", description: "Cubic yards for foundations and slabs" },
  ],

  faq: [
    {
      question: "How many sheets of drywall do I need for a 12×14 room?",
      answer:
        "For a 12×14 room with 9-foot ceilings including the ceiling, you need about 8 sheets of 4×8 drywall at 10% waste. Walls only: 6 sheets. The calculator above gives you the exact number for your dimensions.",
    },
    {
      question: "Should I use 4×8 or 4×12 sheets?",
      answer:
        "4×8 sheets (32 sq ft) are the easiest to handle — one person can install them alone. 4×12 sheets (48 sq ft) have fewer horizontal seams on 12-foot-wide walls, which means less taping and a smoother finish. Use 4×12 for long unbroken walls; 4×8 for tight rooms or solo installation.",
    },
    {
      question: "Do I subtract doors and windows?",
      answer:
        "No — drywall cuts leave scrap that can rarely be reused around openings. The waste factor accounts for cuts around doors and windows better than subtracting their area directly. Subtracting would actually leave you short.",
    },
    {
      question: "What thickness of drywall should I buy?",
      answer:
        "1/2 inch is standard for walls. 5/8 inch is code-required for ceilings (prevents sag) and for fire-rated walls between garages and living space. 1/4 inch is for curved walls or overlays. The calculator assumes standard thickness — thicker sheets don't change area math.",
    },
    {
      question: "How much joint compound and tape do I need?",
      answer:
        "As a rule of thumb: 1 gallon of joint compound per 100 sq ft of drywall, and 1 roll of tape (500 ft) per 5-6 sheets. So for 10 sheets of 4×8, plan on about 3 gallons of mud and 2 rolls of tape.",
    },
    {
      question: "Is moisture-resistant drywall necessary for bathrooms?",
      answer:
        "Green board (moisture-resistant) is recommended for bathroom walls except inside the shower enclosure, where cement board or a waterproof substrate is required. Quantity calculation is the same — green board just costs 20-30% more.",
    },
    {
      question: "How long does drywall take to install?",
      answer:
        "A solo DIYer averages 1-2 sheets per hour for hanging only. Add another 50-100% for taping, mudding, and sanding. A 12×14 room (8 sheets) typically takes a weekend from bare studs to paint-ready.",
    },
    {
      question: "Can I use this for garage or basement?",
      answer:
        "Yes — the math is identical for any room. For basements, use moisture-resistant drywall on exterior walls. For garages, check local code — many require 5/8 inch fire-rated drywall on shared walls with the house.",
    },
  ],
};
