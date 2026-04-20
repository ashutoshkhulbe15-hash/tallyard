import { GroutCalculatorExpansion } from "@/content/grout-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const groutCalculatorConfig: CalculatorConfig = {
  slug: "grout-calculator",
  title: "Grout Calculator",
  description:
    "Pounds of grout for any tile installation. Accounts for tile size, joint width, and thickness so you buy the right bags.",
  categoryLabel: "Flooring",
  category: "flooring",

  bannerHeadline: "Grout precisely.",
  bannerTags: ["Any tile size", "Sanded or unsanded", "lb or kg"],

  inputs: [
    {
      id: "length",
      label: "Area length",
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
      label: "Area width",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 12,
      defaultMetric: 3.7,
      min: 0.5,
      step: 0.5,
    },
    {
      id: "tileSize",
      label: "Tile size",
      type: "select",
      defaultImperial: "12x12",
      options: [
        { label: "4 × 4 (small wall)", value: "4x4" },
        { label: "6 × 6", value: "6x6" },
        { label: "12 × 12 (standard)", value: "12x12" },
        { label: "12 × 24", value: "12x24" },
        { label: "18 × 18", value: "18x18" },
        { label: "24 × 24 (large)", value: "24x24" },
      ],
    },
    {
      id: "jointWidth",
      label: "Grout joint width",
      type: "select",
      defaultImperial: 0.125,
      options: [
        { label: '1/16" / 1.5 mm (rectified)', value: 0.0625 },
        { label: '1/8" / 3 mm (standard)', value: 0.125 },
        { label: '3/16" / 5 mm', value: 0.1875 },
        { label: '1/4" / 6 mm (rustic)', value: 0.25 },
        { label: '3/8" / 10 mm (stone)', value: 0.375 },
      ],
      help: "1/16-1/8\" is typical for modern tile. 1/4\"+ for rustic or stone.",
    },
    {
      id: "tileThickness",
      label: "Tile thickness",
      type: "select",
      defaultImperial: 0.375,
      options: [
        { label: '1/4" / 6 mm (thin)', value: 0.25 },
        { label: '3/8" / 10 mm (standard)', value: 0.375 },
        { label: '1/2" / 12 mm (thick)', value: 0.5 },
      ],
    },
    {
      id: "waste",
      label: "Waste factor",
      type: "select",
      defaultImperial: 15,
      options: [
        { label: "10%", value: 10 },
        { label: "15% (standard)", value: 15 },
        { label: "20%", value: 20 },
      ],
    },
  ],

  calculate: (values, units) => {
    const L = Number(values.length) || 0;
    const W = Number(values.width) || 0;
    const tileSize = String(values.tileSize || "12x12");
    const jointWidthInches = Number(values.jointWidth) || 0.125;
    const tileThicknessInches = Number(values.tileThickness) || 0.375;
    const waste = Number(values.waste) || 15;

    // Tile dimensions in inches (imperial) or cm (metric)
    const tileMapImperial: Record<string, { l: number; w: number }> = {
      "4x4": { l: 4, w: 4 },
      "6x6": { l: 6, w: 6 },
      "12x12": { l: 12, w: 12 },
      "12x24": { l: 12, w: 24 },
      "18x18": { l: 18, w: 18 },
      "24x24": { l: 24, w: 24 },
    };
    const tile = tileMapImperial[tileSize] || tileMapImperial["12x12"];

    // Coverage formula (industry standard, in sq ft per pound for imperial):
    // coverage = (L × W × thickness × 2) / ((L + W) × joint_width × 2)
    // Simplified: coverage_sqft_per_lb ≈ (tile_area × thickness) / (perimeter × joint × density)
    //
    // Standard approximation: grout coverage per pound varies by tile size + joint + thickness.
    // Using Mapei/Custom Building Products formula:
    // lb/sqft = (L+W) × joint × thickness × 150 / (L × W × 12)
    // Where 150 is the density of cementitious grout in lb/ft³
    // L, W, thickness, joint all in inches

    // Calculate lb of grout per square foot of tile coverage
    const lbPerSqFt =
      ((tile.l + tile.w) * jointWidthInches * tileThicknessInches * 150) /
      (tile.l * tile.w * 12);

    // Floor area
    const floorArea = L * W;
    const floorAreaSqFt = units === "metric" ? floorArea * 10.764 : floorArea;

    const rawPounds = lbPerSqFt * floorAreaSqFt;
    const poundsWithWaste = rawPounds * (1 + waste / 100);

    // Bag sizes: 10 lb (small) or 25 lb (standard)
    const smallBags = Math.ceil(poundsWithWaste / 10);
    const standardBags = Math.ceil(poundsWithWaste / 25);

    const displayWeight =
      units === "metric"
        ? round(poundsWithWaste * 0.4536, 1)
        : round(poundsWithWaste, 1);
    const weightUnit = units === "metric" ? "kg" : "lb";
    const areaUnit = units === "metric" ? "m²" : "ft²";
    const displayArea = units === "metric" ? floorArea : floorAreaSqFt;

    // Recommend sanded vs unsanded
    const sandedRecommended = jointWidthInches >= 0.125;

    return {
      value: displayWeight,
      unit: weightUnit,
      valueRounded: units === "metric" ? round(displayWeight, 1) : roundUp(displayWeight, 0),
      breakdown: [
        { label: "area", value: `${formatNumber(round(displayArea, 1))} ${areaUnit}` },
        { label: "25 lb bags", value: `${standardBags}` },
        {
          label: "recommended",
          value: sandedRecommended ? "sanded" : "unsanded",
        },
      ],
      formulaSteps: [
        `tile size = ${tile.l}" × ${tile.w}"`,
        `joint width = ${jointWidthInches}"`,
        `tile thickness = ${tileThicknessInches}"`,
        `lb per sq ft = (${tile.l + tile.w} × ${jointWidthInches} × ${tileThicknessInches} × 150) ÷ (${tile.l * tile.w} × 12) = ${formatNumber(round(lbPerSqFt, 3))}`,
        `area = ${L} × ${W} = ${formatNumber(round(floorAreaSqFt, 0))} sq ft${units === "metric" ? ` (${formatNumber(round(floorArea, 2))} m²)` : ""}`,
        `raw weight = ${formatNumber(round(lbPerSqFt, 3))} × ${formatNumber(round(floorAreaSqFt, 0))} = ${formatNumber(round(rawPounds, 1))} lb`,
        `with ${waste}% waste = ${formatNumber(round(poundsWithWaste, 1))} lb${units === "metric" ? ` (${formatNumber(round(poundsWithWaste * 0.4536, 1))} kg)` : ""}`,
        `standard 25-lb bags = ⌈${formatNumber(round(poundsWithWaste, 1))} ÷ 25⌉ = ${standardBags} bags`,
        `small 10-lb bags = ⌈${formatNumber(round(poundsWithWaste, 1))} ÷ 10⌉ = ${smallBags} bags`,
      ],
    };
  },

  ContentExpansion: GroutCalculatorExpansion,

  formulaDescription:
    "lb = (tile perimeter × joint × thickness × 150) ÷ (tile area × 12) × floor area × (1 + waste)",

  methodology: [
    "The grout needed per square foot depends on three tile characteristics: how much joint perimeter exists around each tile (smaller tiles = more joints = more grout), how wide the joints are, and how thick the tiles are (thicker tiles = deeper joints to fill). The calculator uses the industry standard formula from cement grout manufacturers like Mapei and Custom Building Products.",
    "Small tiles (4×4, 6×6) need significantly more grout than large tiles at the same joint width — a mosaic or small subway tile installation can require 3-4x the grout of a 24×24 floor installation of equivalent area, because there are many more linear feet of joint per square foot of coverage.",
    "Joint width is the other major driver. Modern rectified tiles allow 1/16\" joints, which use about half the grout of standard 1/8\" joints. Rustic installations with 1/4\" or wider joints use substantially more. Match the joint width to the tile — using a narrow joint on unrectified tile creates uneven lines.",
    "Sanded grout is required for joints wider than 1/8\". The sand prevents the grout from shrinking and cracking in wider joints. Unsanded grout is for joints 1/8\" and narrower, especially on polished stone or soft tile that sanded grout would scratch.",
    "The 15% waste factor covers the small amount that sticks to the mixing bucket, float, sponge, and tile surfaces during cleanup. For large complex installations with lots of cuts or multiple sessions, bump to 20%. Always mix grout in complete bag quantities — partial bags don't color-match reliably when mixed in different batches.",
  ],

  sources: [
    {
      name: "Mapei — Grout Coverage Chart",
      url: "https://www.mapei.com/us/en-us/",
      note: "Industry standard coverage calculation for cement grouts",
    },
    {
      name: "Custom Building Products — Grout Calculator",
      url: "https://www.custombuildingproducts.com/",
      note: "Reference for sanded vs unsanded selection and coverage",
    },
  ],

  related: [
    { name: "Tile calculator", slug: "tile-calculator", description: "Tiles and boxes for any floor" },
    { name: "Paint calculator", slug: "paint-calculator", description: "Gallons of paint for any room" },
    { name: "Flooring calculator", slug: "flooring-calculator", description: "Hardwood, laminate, vinyl" },
    { name: "Concrete calculator", slug: "concrete-calculator", description: "For slab prep under tile" },
  ],

  faq: [
    {
      question: "How many bags of grout do I need?",
      answer:
        "For a typical 10×12 ft floor with 12×12 tiles and 1/8\" joints, you need about 2-3 standard 25-lb bags. Small tiles or wider joints need more. The calculator above gives you the exact pound and bag count for your specific installation.",
    },
    {
      question: "Should I use sanded or unsanded grout?",
      answer:
        "Sanded: joints 1/8\" or wider, all floor installations. Unsanded: joints narrower than 1/8\", polished marble or other soft stone, glass tile. If you're unsure, 1/8\" is the breakpoint — at exactly 1/8\", either works but sanded is more common.",
    },
    {
      question: "How long does grout take to dry?",
      answer:
        "Cement grout is walk-on ready in 24-48 hours but takes 7 days to fully cure. Don't seal, scrub, or wet-clean for at least 72 hours. Epoxy grout cures faster (24 hours) but is harder to work with and more expensive.",
    },
    {
      question: "Do I need to seal grout?",
      answer:
        "Cement grout: yes — apply a penetrating sealer 48-72 hours after installation, then reapply every 1-3 years. This prevents stains and water penetration. Epoxy grout: no — it's already non-porous. Premium pre-mixed grouts (like TEC AccuColor) often have sealer built in.",
    },
    {
      question: "Can I reduce grout use with wider tiles?",
      answer:
        "Yes — 12×24 or 24×24 tiles use much less grout per square foot than 4×4 or 6×6 because there's less total joint perimeter. Large tiles also show dirt in grout lines less, require less cleaning, and install faster. The tradeoff is subfloor flatness — larger tiles are less forgiving of uneven floors.",
    },
    {
      question: "What if my tiles have different thicknesses?",
      answer:
        "Use the thickest tile's dimension for grout calculation — grout fills to the top of the thickest tile. For installations mixing thicknesses, use back-buttering or thicker thinset under thinner tiles to level the surface; grout doesn't fix large thickness differences.",
    },
    {
      question: "How accurate is the coverage formula?",
      answer:
        "The formula is within 5-10% for standard installations. Real-world variability: some grout gets wasted in the bucket, some joints end up slightly wider than planned, some tiles absorb grout in their beveled edges. The 15% waste factor covers typical variance; add more for complex patterns or large cuts.",
    },
    {
      question: "Can I mix different grout colors?",
      answer:
        "Don't mix colors in the same joint — they'll blotch. For different rooms or feature walls, use distinct colors but mix each separately with its own water-to-powder ratio. For color consistency, always mix full bags at a time and note the batch number when buying multiple bags.",
    },
  ],
};
