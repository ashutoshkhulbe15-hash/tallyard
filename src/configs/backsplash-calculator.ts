import { BacksplashCalculatorExpansion } from "@/content/backsplash-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const backsplashCalculatorConfig: CalculatorConfig = {
  slug: "backsplash-calculator",
  title: "Backsplash Calculator",
  description:
    "Tiles and boxes for a kitchen backsplash. Accounts for window cutouts, outlet openings, and the 15% cut waste typical of backsplashes.",
  categoryLabel: "Flooring",
  category: "flooring",

  bannerHeadline: "Splash colorfully.",
  bannerTags: ["Linear feet × height", "Outlets and windows", "Subway or mosaic"],

  inputs: [
    {
      id: "linearFt",
      label: "Counter linear feet",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 18,
      defaultMetric: 5.5,
      min: 1,
      step: 0.5,
      help: "Sum of all counter edges getting backsplash (standard kitchen: 15-25 ft)",
    },
    {
      id: "height",
      label: "Backsplash height",
      type: "select",
      defaultImperial: 18,
      options: [
        { label: '4" (standard short)', value: 4 },
        { label: '18" (counter to cabinets)', value: 18 },
        { label: '24" (tall)', value: 24 },
        { label: 'To ceiling (full)', value: 36 },
      ],
      help: "18\" is standard counter-to-upper-cabinet distance",
    },
    {
      id: "tileSize",
      label: "Tile size",
      type: "select",
      defaultImperial: "3x6",
      options: [
        { label: "3 × 6 (classic subway)", value: "3x6" },
        { label: "4 × 12 (long subway)", value: "4x12" },
        { label: "2 × 2 (mosaic)", value: "2x2" },
        { label: "4 × 4", value: "4x4" },
        { label: "12 × 12 (large)", value: "12x12" },
        { label: "12 × 24 (modern)", value: "12x24" },
      ],
    },
    {
      id: "tilesPerBox",
      label: "Tiles per box",
      type: "number",
      defaultImperial: 40,
      min: 1,
      step: 1,
      help: "Subway tile typically 40-60/box; large tile 6-10/box",
    },
    {
      id: "outlets",
      label: "Outlets and switches",
      type: "number",
      defaultImperial: 4,
      min: 0,
      step: 1,
      help: "Count of electrical boxes in the backsplash",
    },
    {
      id: "window",
      label: "Window above counter",
      type: "select",
      defaultImperial: "none",
      options: [
        { label: "None", value: "none" },
        { label: "Small (24 × 36\")", value: "small" },
        { label: "Medium (36 × 48\")", value: "medium" },
        { label: "Large (48 × 60\")", value: "large" },
      ],
    },
  ],

  calculate: (values, units) => {
    const linearFtInput = Number(values.linearFt) || 0;
    const heightIn = Number(values.height) || 18;
    const tileSize = String(values.tileSize || "3x6");
    const tilesPerBox = Number(values.tilesPerBox) || 40;
    const outlets = Number(values.outlets) || 0;
    const windowSize = String(values.window || "none");

    const linearFt = units === "metric" ? linearFtInput * 3.281 : linearFtInput;

    // Gross area in square feet
    const grossArea = linearFt * (heightIn / 12);

    // Outlet cutouts: ~0.1 sq ft each (single box)
    const outletArea = outlets * 0.1;

    // Window subtractions
    const windowAreas: Record<string, number> = {
      none: 0,
      small: 6, // 2×3 ft
      medium: 12, // 3×4 ft
      large: 20, // 4×5 ft
    };
    const windowArea = windowAreas[windowSize] || 0;

    const netArea = Math.max(0, grossArea - outletArea - windowArea);

    // Waste: backsplashes cluster around fixtures (stove, sink, outlets) — 15%
    const wastePct = 15;
    const areaWithWaste = netArea * (1 + wastePct / 100);

    // Tile dimensions (inches)
    const tileMap: Record<string, { l: number; w: number }> = {
      "3x6": { l: 3, w: 6 },
      "4x12": { l: 4, w: 12 },
      "2x2": { l: 2, w: 2 },
      "4x4": { l: 4, w: 4 },
      "12x12": { l: 12, w: 12 },
      "12x24": { l: 12, w: 24 },
    };
    const tile = tileMap[tileSize] || tileMap["3x6"];
    const tileAreaFt2 = (tile.l * tile.w) / 144;

    const rawTiles = areaWithWaste / tileAreaFt2;
    const tilesNeeded = Math.ceil(rawTiles);
    const boxesNeeded = Math.ceil(tilesNeeded / tilesPerBox);

    return {
      value: tilesNeeded,
      unit: tilesNeeded === 1 ? "tile" : "tiles",
      valueRounded: tilesNeeded,
      breakdown: [
        { label: "gross area", value: `${formatNumber(round(grossArea, 1))} ft²` },
        { label: "net area", value: `${formatNumber(round(netArea, 1))} ft²` },
        { label: "boxes", value: `${boxesNeeded}` },
        { label: "tile size", value: `${tile.l}" × ${tile.w}"` },
      ],
      formulaSteps: [
        `linear ft = ${formatNumber(round(linearFt, 1))}, height = ${heightIn}"`,
        `gross area = ${formatNumber(round(linearFt, 1))} × (${heightIn} ÷ 12) = ${formatNumber(round(grossArea, 1))} ft²`,
        `outlets = ${outlets} × 0.1 = ${formatNumber(round(outletArea, 1))} ft²`,
        `window = ${windowArea} ft²${windowSize !== "none" ? ` (${windowSize})` : ""}`,
        `net area = ${formatNumber(round(grossArea, 1))} − ${formatNumber(round(outletArea + windowArea, 1))} = ${formatNumber(round(netArea, 1))} ft²`,
        `with 15% waste = ${formatNumber(round(netArea, 1))} × 1.15 = ${formatNumber(round(areaWithWaste, 1))} ft²`,
        `tile area = ${tile.l}" × ${tile.w}" = ${formatNumber(round(tileAreaFt2, 3))} ft² each`,
        `tiles = ⌈${formatNumber(round(areaWithWaste, 1))} ÷ ${formatNumber(round(tileAreaFt2, 3))}⌉ = ${tilesNeeded}`,
        `boxes = ⌈${tilesNeeded} ÷ ${tilesPerBox}⌉ = ${boxesNeeded}`,
      ],
    };
  },

  ContentExpansion: BacksplashCalculatorExpansion,

  formulaDescription:
    "tiles = ⌈((linear ft × height − outlets − window) × 1.15) ÷ tile area⌉",

  methodology: [
    "Backsplash area is the sum of all counter linear feet times the backsplash height. Typical kitchens have 15-25 linear feet of counter backsplash: 6-8 ft along the stove wall, 4-6 ft along the sink wall, plus any island or peninsula. For an L-shaped kitchen, sum both legs. For a U-shaped, sum all three.",
    "Height choices reflect common designs: 4 inches is the short 'just above the counter' strip common in older kitchens and budget remodels. 18 inches is the standard counter-to-upper-cabinet height — the most common backsplash height in modern kitchens. 24 inches is tall, typical when uppers are raised. Full-height (36+ inches) goes to the ceiling, used for feature walls and behind ranges without upper cabinets.",
    "Outlets and switches: each GFCI or standard electrical box in the backsplash punches a ~0.1 sq ft hole. Typical kitchens have 3-5 boxes in the backsplash (over the counter code requires GFCI outlets every 4 feet). Small subtraction but adds up.",
    "Windows above the counter: use the closest size preset. A small over-sink window is about 6 sq ft; a medium window is 12 sq ft; a large window (often behind a sink with a view) is 20 sq ft. These subtractions are approximate — round-number estimates of real window openings that typically range 2-5 ft wide × 3-5 ft tall.",
    "Waste factor is 15% because backsplashes cluster near fixtures that require cuts. Every outlet opening needs trimming around it. Windows require tile cuts along their edges. The area around the stove often has specialized cuts for appliances. Subway tile at 3×6 inches has many cuts per row; larger tile has fewer but bigger scraps.",
    "Tile size matters for appearance and install time. Classic 3×6 subway takes many more tiles per sq ft (about 8) but is forgiving of uneven walls. Large-format tile (12×24) uses fewer pieces (about 0.5 per sq ft) but each cut must be precise. Mosaic (2×2 or 1×1 mounted on mesh sheets) is sold by the sheet but calculated as individual tiles in this tool — enter tile size as 2×2 for standard mosaic math.",
  ],

  sources: [
    {
      name: "Tile Council of North America",
      url: "https://www.tcnatile.com/",
      note: "Industry standards for kitchen tile waste",
    },
    {
      name: "Home Depot — Backsplash Buying Guide",
      url: "https://www.homedepot.com/c/ah/backsplash-installation-guide/",
      note: "Practical guide for backsplash measurement",
    },
  ],

  related: [
    { name: "Tile calculator", slug: "tile-calculator", description: "For floors and general tile installs" },
    { name: "Grout calculator", slug: "grout-calculator", description: "Grout for tile projects" },
    { name: "Shower tile calculator", slug: "shower-tile-calculator", description: "For tub and shower walls" },
    { name: "Countertop calculator", slug: "countertop-calculator", description: "Counter square footage" },
  ],

  faq: [
    {
      question: "How many tiles do I need for a kitchen backsplash?",
      answer:
        "For a typical kitchen with 18 linear feet of counter, 18-inch height, 3×6 subway tile with 15% waste, you need about 278 tiles or 7 boxes of 40. Larger format tile (12×24) at the same area needs only about 35 tiles or 4 boxes. The calculator handles any kitchen layout.",
    },
    {
      question: "How tall should my backsplash be?",
      answer:
        "Most common: 18 inches (standard counter-to-upper-cabinet distance). If you have no upper cabinets or raised uppers, go 24\" or full-height to the ceiling. Minimum functional height is 4\" — just enough to protect the wall from splashes but not aesthetically strong. Behind the stove, many designs use a taller feature (30-36\") even when the rest is 18\".",
    },
    {
      question: "Do I need to subtract outlets and windows?",
      answer:
        "Windows yes — typical windows subtract 6-20 sq ft. Outlets are tiny (~0.1 sq ft each) but the calculator subtracts them because every outlet is a cut that produces waste. For perfectionists, subtract outlets. For approximation, you can ignore them — the 15% waste factor absorbs small cutouts.",
    },
    {
      question: "Why is backsplash waste 15% instead of 10%?",
      answer:
        "Backsplashes concentrate cuts: outlets every 4 feet, the stove hood area, window sills, cabinet edges, and often a sink window. Every cut produces scrap. 15% is realistic for most kitchens; bump to 20% for complex multi-wall layouts with diagonal tile or feature inlays.",
    },
    {
      question: "Can I use peel-and-stick tile instead?",
      answer:
        "Coverage math is identical — same linear feet × height. Peel-and-stick sheets are sold in different sizes (often 1 × 1 ft sheets at $5-15 each). Quality varies widely; budget peel-and-stick shows seams and yellows in 2-5 years. Real tile is 2-4× more expensive but lasts decades.",
    },
    {
      question: "Do I need thinset or can I use mastic?",
      answer:
        "Mastic (pre-mixed adhesive) works for most kitchen backsplashes — easier for DIY, sticky enough to hold small tile on vertical surfaces. Thinset (mixed cement) is required for natural stone, glass, and any tile larger than 8 inches. Behind a stove that gets hot, use thinset (mastic can soften). 1 gallon of mastic covers ~40 sq ft.",
    },
    {
      question: "How many sheets of mosaic do I need?",
      answer:
        "Most mosaic comes on 12 × 12 inch sheets (1 sq ft each) with individual tiles ranging from 1×1 to 2×2 inches. For a backsplash of 27 sq ft with 15% waste, you need 31 sheets. Calculate mosaic by sheet (1 sq ft each) rather than individual tile count — enter '1' in tiles per box and use 1 × 12 inch dimensions, or simply use gross area.",
    },
    {
      question: "Should I run subway tile horizontally or vertically?",
      answer:
        "Horizontal (offset 50% / running bond) is traditional and makes ceilings look higher on short walls. Vertical (stacked or offset) is modern and makes rooms feel taller. Herringbone is a premium look requiring 20%+ waste. Tile count is identical regardless of orientation — only waste changes.",
    },
  ],
};
