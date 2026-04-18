import { TileCalculatorExpansion } from "@/content/tile-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const tileCalculatorConfig: CalculatorConfig = {
  slug: "tile-calculator",
  title: "Tile Calculator",
  description:
    "Tiles and boxes needed for any floor or wall. Accounts for cuts, waste, and patterns so you only make one trip to the store.",
  categoryLabel: "Flooring",
  category: "flooring",

  bannerHeadline: "Tile exactly right.",
  bannerTags: ["Includes cuts and waste", "Boxes rounded up", "ft² or m²"],

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
        { label: "12 × 12", value: "12x12" },
        { label: "12 × 24", value: "12x24" },
        { label: "18 × 18", value: "18x18" },
        { label: "24 × 24", value: "24x24" },
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
      help: "10% straight pattern · 15% diagonal · 20% herringbone or complex",
    },
    {
      id: "tilesPerBox",
      label: "Tiles per box",
      type: "number",
      defaultImperial: 10,
      min: 1,
      step: 1,
      help: "Check your tile's packaging — typical: 8-15 tiles per box",
    },
  ],

  calculate: (values, units) => {
    const L = Number(values.length) || 0;
    const W = Number(values.width) || 0;
    const tileSize = String(values.tileSize || "12x12");
    const waste = Number(values.waste) || 10;
    const tilesPerBox = Number(values.tilesPerBox) || 10;

    const sizeMap: Record<string, { wImp: number; hImp: number; wMet: number; hMet: number }> = {
      "12x12": { wImp: 12, hImp: 12, wMet: 30, hMet: 30 },
      "12x24": { wImp: 12, hImp: 24, wMet: 30, hMet: 60 },
      "18x18": { wImp: 18, hImp: 18, wMet: 45, hMet: 45 },
      "24x24": { wImp: 24, hImp: 24, wMet: 60, hMet: 60 },
    };

    const tile = sizeMap[tileSize] || sizeMap["12x12"];

    let tileAreaInFloorUnit: number;
    let areaLabel: string;
    let tileDimLabel: string;

    if (units === "metric") {
      const tileAreaCm = tile.wMet * tile.hMet;
      tileAreaInFloorUnit = tileAreaCm / 10000;
      areaLabel = "m²";
      tileDimLabel = `${tile.wMet} × ${tile.hMet} cm`;
    } else {
      const tileAreaInches = tile.wImp * tile.hImp;
      tileAreaInFloorUnit = tileAreaInches / 144;
      areaLabel = "ft²";
      tileDimLabel = `${tile.wImp} × ${tile.hImp} in`;
    }

    const floorArea = L * W;
    const rawTiles = floorArea / tileAreaInFloorUnit;
    const tilesWithWaste = rawTiles * (1 + waste / 100);
    const tilesNeeded = Math.ceil(tilesWithWaste);
    const boxesNeeded = Math.ceil(tilesNeeded / tilesPerBox);
    const wasteTiles = tilesNeeded - Math.ceil(rawTiles);

    return {
      value: tilesNeeded,
      unit: "tiles",
      valueRounded: tilesNeeded,
      breakdown: [
        { label: "floor area", value: `${formatNumber(round(floorArea, 1))} ${areaLabel}` },
        { label: "tile size", value: tileDimLabel },
        { label: "boxes", value: `${boxesNeeded}` },
      ],
      formulaSteps: [
        `floor area = ${L} × ${W} = ${formatNumber(round(floorArea, 2))} ${areaLabel}`,
        `tile area = ${tileDimLabel} = ${formatNumber(round(tileAreaInFloorUnit, 4))} ${areaLabel}`,
        `raw tiles = ${formatNumber(round(floorArea, 2))} ÷ ${formatNumber(round(tileAreaInFloorUnit, 4))} = ${formatNumber(round(rawTiles, 1))}`,
        `with ${waste}% waste = ${formatNumber(round(rawTiles, 1))} × ${(1 + waste / 100).toFixed(2)} = ${formatNumber(round(tilesWithWaste, 1))}`,
        `rounded up to ${tilesNeeded} tiles`,
        `boxes = ⌈${tilesNeeded} ÷ ${tilesPerBox}⌉ = ${boxesNeeded} boxes`,
      ],
      composition: {
        unit: "tiles",
        total: tilesNeeded,
        segments: [
          { label: "Coverage", amount: Math.ceil(rawTiles), shade: "primary" },
          { label: "Waste buffer", amount: Math.max(0, wasteTiles), shade: "secondary" },
        ],
      },
    };
  },

  ContentExpansion: TileCalculatorExpansion,

  formulaDescription:
    "tiles = ⌈(area ÷ tile size) × (1 + waste)⌉, boxes = ⌈tiles ÷ per box⌉",

  methodology: [
    "The calculator computes the floor area (length × width), divides by the area of a single tile (converted to the same unit), and multiplies the result by 1 plus the waste factor. Tile dimensions are listed in inches (imperial) or centimeters (metric) and internally converted to square feet or square meters.",
    "Waste factor covers cuts along edges, miscellaneous breakage during installation, and keeping a few spare tiles for future repairs. The right factor depends on your layout: 10% is fine for straight-lay patterns, 15% for 45-degree diagonals, 20% for herringbone or other patterns with lots of cuts.",
    "Tile count is rounded up to the nearest whole tile because you can't buy fractional tiles. Boxes are rounded up to the next whole box — you buy by the box, not the tile.",
    "Variation between tiles from different production runs is real. Always buy all your tile at once from the same lot number, and keep 1-2 full boxes of extras for repairs years later (specific patterns and colors get discontinued).",
  ],

  sources: [
    {
      name: "Tile Council of North America — Installation Handbook",
      url: "https://www.tcnatile.com/",
      note: "Industry standards for waste factor by pattern",
    },
    {
      name: "Home Depot — Tile Buying Guide",
      url: "https://www.homedepot.com/c/ah/how-to-estimate-tile-needed-for-your-project/",
      note: "Reference for buying tile in lots and boxes",
    },
  ],

  related: [
    { name: "Grout calculator", slug: "grout-calculator", description: "Grout volume for tile projects" },
    { name: "Flooring calculator", slug: "flooring-calculator", description: "Hardwood, laminate, vinyl square footage" },
    { name: "Concrete calculator", slug: "concrete-calculator", description: "For slab prep under tile" },
    { name: "Paint calculator", slug: "paint-calculator", description: "Gallons of paint for any room" },
  ],

  faq: [
    {
      question: "How much extra tile should I buy?",
      answer:
        "10% is the minimum for simple straight-lay patterns on rectangular floors. Add 5% for each additional complexity: diagonal layouts (15%), herringbone or chevron (20%+), irregular room shapes, many obstructions. When in doubt, buy more — discontinued lots are hard to match later.",
    },
    {
      question: "Why do I need to buy all tile at once?",
      answer:
        "Tile is manufactured in batches called 'lots' or 'dye lots'. Slight color and size variations exist between lots — invisible individually, but visible when tiles from different lots are installed next to each other. Always buy enough for the entire project plus spares from the same lot.",
    },
    {
      question: "How many tiles are in a typical box?",
      answer:
        "Varies by tile size: 12×12 tiles usually 10-15 per box; 12×24 typically 6-8; 18×18 about 6; 24×24 about 3-4. Always check the specific tile you're buying — the calculator uses your input for tiles per box.",
    },
    {
      question: "Does this include the grout?",
      answer:
        "No, this calculates tile quantity only. Grout is a separate purchase. As a rough guide, you need about 1-2 pounds of grout per 10 sq ft for 1/8-inch joints. Use the grout calculator for a precise number.",
    },
    {
      question: "How much waste should I expect with 24×24 tiles?",
      answer:
        "Larger tiles produce more waste because each edge cut leaves a larger unusable piece. For 24×24 tiles on a straight-lay pattern, 12-15% waste is realistic — more if the room has complex edges or obstructions.",
    },
    {
      question: "Do I calculate wall tile the same way?",
      answer:
        "Yes — the math is identical. Enter the wall dimensions as length and width. For showers, calculate each wall separately and add them. Subtract large openings (windows, niches) only if they're bigger than a few square feet.",
    },
    {
      question: "What about diagonal or herringbone layouts?",
      answer:
        "Bump the waste factor up: 15% for diagonal straight lay, 20% for herringbone or chevron, 25% for complex patterns with many cuts. These layouts require cutting tiles at angles, which produces more unusable scrap per cut.",
    },
    {
      question: "Can I use this for subway tile or large-format tile?",
      answer:
        "Yes — use the closest matching preset, or enter the tile size if you need something non-standard. For subway tile (3×6), the math is the same but you'll need many more tiles because each one covers less area.",
    },
  ],
};
