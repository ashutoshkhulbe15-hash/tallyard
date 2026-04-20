import { ShowerTileCalculatorExpansion } from "@/content/shower-tile-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const showerTileCalculatorConfig: CalculatorConfig = {
  slug: "shower-tile-calculator",
  title: "Shower Tile Calculator",
  description:
    "Tiles and boxes for a shower or tub surround. Calculates three walls plus optional niche and floor — with cut waste built in.",
  categoryLabel: "Flooring",
  category: "flooring",

  bannerHeadline: "Tile bathrooms.",
  bannerTags: ["Three walls + floor", "Niche optional", "Wet-area waste"],

  inputs: [
    {
      id: "backWidth",
      label: "Back wall width",
      type: "number",
      unitImperial: "in",
      unitMetric: "cm",
      defaultImperial: 60,
      defaultMetric: 152,
      min: 24,
      step: 1,
      help: "Standard tub: 60\". Walk-in: measure the back wall only.",
    },
    {
      id: "sideDepth",
      label: "Side wall depth",
      type: "number",
      unitImperial: "in",
      unitMetric: "cm",
      defaultImperial: 32,
      defaultMetric: 81,
      min: 24,
      step: 1,
      help: "Standard tub: 32\". Walk-in: the shorter dimension of the enclosure.",
    },
    {
      id: "height",
      label: "Tile height",
      type: "number",
      unitImperial: "in",
      unitMetric: "cm",
      defaultImperial: 96,
      defaultMetric: 244,
      min: 24,
      step: 1,
      help: "To ceiling: 96\". Above tub only: 60-72\" typical.",
    },
    {
      id: "tileSize",
      label: "Tile size",
      type: "select",
      defaultImperial: "12x24",
      options: [
        { label: "4 × 4 (mosaic/subway)", value: "4x4" },
        { label: "3 × 6 (classic subway)", value: "3x6" },
        { label: "6 × 6", value: "6x6" },
        { label: "12 × 12", value: "12x12" },
        { label: "12 × 24 (modern)", value: "12x24" },
        { label: "24 × 24 (large format)", value: "24x24" },
      ],
    },
    {
      id: "tilesPerBox",
      label: "Tiles per box",
      type: "number",
      defaultImperial: 8,
      min: 1,
      step: 1,
    },
    {
      id: "includeNiche",
      label: "Include niche",
      type: "select",
      defaultImperial: "yes",
      options: [
        { label: "Yes (14 × 24\" standard)", value: "yes" },
        { label: "No", value: "no" },
      ],
      help: "Niches subtract from back wall but add tile for 5 interior surfaces",
    },
    {
      id: "includeFloor",
      label: "Include shower floor",
      type: "select",
      defaultImperial: "no",
      options: [
        { label: "No (drop-in tub)", value: "no" },
        { label: "Yes (walk-in shower pan)", value: "yes" },
      ],
    },
  ],

  calculate: (values, units) => {
    const backWidthInput = Number(values.backWidth) || 60;
    const sideDepthInput = Number(values.sideDepth) || 32;
    const heightInput = Number(values.height) || 96;
    const tileSize = String(values.tileSize || "12x24");
    const tilesPerBox = Number(values.tilesPerBox) || 8;
    const includeNiche = String(values.includeNiche || "yes") === "yes";
    const includeFloor = String(values.includeFloor || "no") === "yes";

    // Convert to inches if metric
    const backWidth = units === "metric" ? backWidthInput / 2.54 : backWidthInput;
    const sideDepth = units === "metric" ? sideDepthInput / 2.54 : sideDepthInput;
    const height = units === "metric" ? heightInput / 2.54 : heightInput;

    // Three wall surfaces (all in sq inches for now, convert later)
    const backArea = backWidth * height;
    const sideArea = sideDepth * height;
    const wallsAreaIn2 = backArea + 2 * sideArea;

    // Niche: subtract 14 × 24 = 336 sq inches from back, add 5 interior surfaces
    // Standard niche: 14 wide × 24 tall × 3.5 deep
    const nicheFrontArea = 14 * 24; // opening area subtracted from wall
    const nicheInteriorArea = includeNiche
      ? 2 * (14 * 3.5) + 2 * (24 * 3.5) + 14 * 24 // top + bottom + 2 sides + back
      : 0;
    const nicheNetAddition = includeNiche
      ? nicheInteriorArea - nicheFrontArea
      : 0;

    // Floor: if walk-in shower
    const floorAreaIn2 = includeFloor ? backWidth * sideDepth : 0;

    // Total wet area in sq inches → sq feet
    const totalAreaIn2 = wallsAreaIn2 + nicheNetAddition + floorAreaIn2;
    const totalAreaFt2 = totalAreaIn2 / 144;

    // Tile area per piece (inches)
    const tileMap: Record<string, { l: number; w: number }> = {
      "4x4": { l: 4, w: 4 },
      "3x6": { l: 3, w: 6 },
      "6x6": { l: 6, w: 6 },
      "12x12": { l: 12, w: 12 },
      "12x24": { l: 12, w: 24 },
      "24x24": { l: 24, w: 24 },
    };
    const tile = tileMap[tileSize] || tileMap["12x24"];
    const tileAreaFt2 = (tile.l * tile.w) / 144;

    // Waste: showers have more cuts than floors — use 15% standard
    const wastePct = 15;
    const areaWithWaste = totalAreaFt2 * (1 + wastePct / 100);

    const rawTiles = areaWithWaste / tileAreaFt2;
    const tilesNeeded = Math.ceil(rawTiles);
    const boxesNeeded = Math.ceil(tilesNeeded / tilesPerBox);

    return {
      value: tilesNeeded,
      unit: tilesNeeded === 1 ? "tile" : "tiles",
      valueRounded: tilesNeeded,
      breakdown: [
        {
          label: "wet area",
          value: `${formatNumber(round(totalAreaFt2, 1))} ft²`,
        },
        { label: "boxes", value: `${boxesNeeded}` },
        { label: "with 15% waste", value: `${formatNumber(round(areaWithWaste, 1))} ft²` },
        {
          label: "extras included",
          value: [
            includeNiche ? "niche" : null,
            includeFloor ? "floor" : null,
          ].filter(Boolean).join(", ") || "none",
        },
      ],
      formulaSteps: [
        `back wall = ${formatNumber(round(backWidth, 0))}" × ${formatNumber(round(height, 0))}" = ${formatNumber(round(backArea / 144, 1))} ft²`,
        `each side wall = ${formatNumber(round(sideDepth, 0))}" × ${formatNumber(round(height, 0))}" = ${formatNumber(round(sideArea / 144, 1))} ft²`,
        `three walls = ${formatNumber(round(wallsAreaIn2 / 144, 1))} ft²`,
        includeNiche
          ? `niche net add = ${formatNumber(round(nicheNetAddition / 144, 2))} ft² (interior surfaces minus opening)`
          : `niche: not included`,
        includeFloor
          ? `floor = ${formatNumber(round(floorAreaIn2 / 144, 1))} ft²`
          : `floor: not included`,
        `total wet area = ${formatNumber(round(totalAreaFt2, 1))} ft²`,
        `with 15% waste = ${formatNumber(round(areaWithWaste, 1))} ft²`,
        `tile size = ${tile.l}" × ${tile.w}" = ${formatNumber(round(tileAreaFt2, 3))} ft² each`,
        `tiles = ⌈${formatNumber(round(areaWithWaste, 1))} ÷ ${formatNumber(round(tileAreaFt2, 3))}⌉ = ${tilesNeeded}`,
        `boxes = ⌈${tilesNeeded} ÷ ${tilesPerBox}⌉ = ${boxesNeeded}`,
      ],
    };
  },

  ContentExpansion: ShowerTileCalculatorExpansion,

  formulaDescription:
    "tiles = ⌈((3 walls + niche + floor) × 1.15) ÷ tile area⌉",

  methodology: [
    "The calculator treats a shower as three tile surfaces: back wall, two side walls, and an optional floor/ceiling. Standard tub surrounds run 60 inches wide × 32 inches deep × 96 inches tall to the ceiling (or 60-72 inches tall for a tub surround only, without reaching the ceiling). Walk-in showers vary — measure the actual back and side dimensions.",
    "Niches add complexity. A standard 14 × 24 inch niche carved into the back wall: the opening itself (14 × 24 = 336 sq in) is subtracted from the back wall area, then all five interior surfaces (two sides, top, bottom, back) are added. Net: a typical niche adds a small amount of tile (1-2 sq ft) rather than subtracting from the total.",
    "Shower floor (for walk-in showers): add the floor area to the wall total. Drop-in tubs have no tiled floor (the tub is the floor). Many walk-in showers use smaller mosaic tile on the floor for grip — if using different tile on the floor, calculate separately.",
    "Waste factor is 15% — higher than standard floor tile because shower walls have many edges, corners, and fixture cutouts (valve openings, shower head, niche boundaries). Every cut produces scrap that rarely gets reused. Large-format tile (12×24, 24×24) in showers pushes waste up further because bigger scraps are less reusable.",
    "Tiles round up to whole tiles; boxes round up to whole boxes. Buy at least 1-2 extra boxes beyond the calculator's count for future repairs. Shower tile gets chipped by dropped shampoo bottles and razors; matching replacement tile years later is rarely possible.",
    "Not included: backer board (cement board or foam board behind the tile — see drywall calculator for area), waterproofing membrane (recommended: 1 roll covers about 30 sq ft), thinset (1 bag of 50-lb per 40-50 sq ft), grout (see grout calculator), niche trim pieces, and fixtures (shower head, valve, soap dish).",
  ],

  sources: [
    {
      name: "Tile Council of North America — Wet Area Installation",
      url: "https://www.tcnatile.com/",
      note: "Industry standards for shower tiling and waterproofing",
    },
    {
      name: "Schluter Systems — Shower Construction Guide",
      url: "https://www.schluter.com/",
      note: "Wet-area installation and niche design references",
    },
  ],

  related: [
    { name: "Tile calculator", slug: "tile-calculator", description: "For floors and general tile installs" },
    { name: "Grout calculator", slug: "grout-calculator", description: "Grout for tile projects" },
    { name: "Backsplash calculator", slug: "backsplash-calculator", description: "Kitchen backsplash tile" },
    { name: "Drywall calculator", slug: "drywall-calculator", description: "Backer board for shower walls" },
  ],

  faq: [
    {
      question: "How many tiles do I need for a standard shower?",
      answer:
        "For a standard 60 × 32 × 96 inch tub surround (3 walls only, to ceiling) using 12×24 tiles with 15% waste, you need about 60 tiles or 8 boxes of 8. Walk-in showers with a floor need 10-15% more tile. Include a niche adds another ~2 ft² of tile.",
    },
    {
      question: "Should I use the same tile on floor and walls?",
      answer:
        "You can — but slip resistance is a concern on wet floors. For shower floors, use tiles with DCOF ≥ 0.42 (slip rating) or switch to small mosaic tile (under 2 inches) where grout lines provide grip. Walls don't have this concern. Many showers pair large wall tile with small mosaic floor tile for this reason.",
    },
    {
      question: "Why is shower waste 15% instead of 10%?",
      answer:
        "Showers have more edges, corners, and cutouts than floors. Fixture penetrations (shower head, valve, tub spout, niche edges) each require precise cuts that leave unusable scraps. Large-format wall tile makes this worse because each cut wastes a bigger piece.",
    },
    {
      question: "What about the ceiling?",
      answer:
        "Most showers don't tile the ceiling — use moisture-resistant drywall with mildew-resistant paint instead. If you do tile the ceiling (for a steam shower or luxury finish), calculate the ceiling area separately (back wall width × side depth) and add to the total. Ceiling tile is harder to install and requires special thinset.",
    },
    {
      question: "How big should my niche be?",
      answer:
        "Standard 14 × 24 inches (the space between standard studs at 16\" on center, minus framing). Smaller niches (8 × 12) fit between 2×4 framing without disrupting studs. Multiple small niches are sometimes preferable to one large niche for organizing shampoo, conditioner, soap.",
    },
    {
      question: "What about curbs and benches?",
      answer:
        "Not automatically calculated. A standard curb (the barrier at the shower entrance) is about 6 × 4 × 36 inches — adds ~1 ft² of tile. A built-in bench is 15-18 × 48 inches typically — adds 3-5 ft². Add these to your total manually and bump the calculator's dimensions.",
    },
    {
      question: "Do I need waterproofing behind tile?",
      answer:
        "Yes — modern standard. Cement board alone is not waterproof. Use a sheet membrane (like Schluter Kerdi) or liquid-applied waterproofing (like RedGard) over the backer board. Standard shower areas typically need 1 roll (40 sq ft) of sheet membrane or 1-2 gallons of liquid.",
    },
    {
      question: "Can I do this over an existing tub surround?",
      answer:
        "Not directly on existing tile (old tile must come off first). If removing old tile, inspect the backer — water damage behind old shower tile is very common. Plan to replace the cement board, not just the tile. Factor 1-2 extra days and $200-500 in backer/waterproofing materials on top of new tile.",
    },
  ],
};
