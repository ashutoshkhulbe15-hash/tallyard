import { WallpaperCalculatorExpansion } from "@/content/wallpaper-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const wallpaperCalculatorConfig: CalculatorConfig = {
  slug: "wallpaper-calculator",
  title: "Wallpaper Calculator",
  description:
    "Rolls of wallpaper for any room. Accounts for pattern repeat, roll coverage, and typical 15% cut waste so you buy exactly what you need.",
  categoryLabel: "Paint",
  category: "paint",

  bannerHeadline: "Paper smoothly.",
  bannerTags: ["Pattern repeat", "Rolls rounded up", "Doors and windows"],

  inputs: [
    {
      id: "perimeter",
      label: "Room perimeter",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 52,
      defaultMetric: 16,
      min: 4,
      step: 1,
      help: "2 × (length + width). 10×12 room = 44 ft perimeter.",
    },
    {
      id: "height",
      label: "Wall height",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 9,
      defaultMetric: 2.7,
      min: 4,
      step: 0.5,
    },
    {
      id: "rollCoverage",
      label: "Coverage per roll",
      type: "select",
      defaultImperial: 56,
      options: [
        { label: "American (56 ft² double roll)", value: 56 },
        { label: "European (29 ft² single roll)", value: 29 },
        { label: "Metric (15 m² roll)", value: 161 },
      ],
      help: "US double roll is standard. Check your specific product.",
    },
    {
      id: "patternRepeat",
      label: "Pattern repeat",
      type: "select",
      defaultImperial: 0,
      options: [
        { label: '0" (no pattern / random)', value: 0 },
        { label: '6" / 15 cm', value: 6 },
        { label: '12" / 30 cm', value: 12 },
        { label: '18" / 45 cm', value: 18 },
        { label: '24" / 60 cm (large)', value: 24 },
      ],
      help: "Larger repeats waste more paper to match the pattern",
    },
    {
      id: "doors",
      label: "Number of doors",
      type: "number",
      defaultImperial: 1,
      min: 0,
      step: 1,
      help: "Each door subtracts ~21 ft² from wall area",
    },
    {
      id: "windows",
      label: "Number of windows",
      type: "number",
      defaultImperial: 2,
      min: 0,
      step: 1,
      help: "Each window subtracts ~15 ft² from wall area",
    },
  ],

  calculate: (values, units) => {
    const perimeter = Number(values.perimeter) || 0;
    const height = Number(values.height) || 0;
    const rollCoverageFt2 = Number(values.rollCoverage) || 56;
    const patternRepeat = Number(values.patternRepeat) || 0;
    const doors = Number(values.doors) || 0;
    const windows = Number(values.windows) || 0;

    const perimeterFt = units === "metric" ? perimeter * 3.281 : perimeter;
    const heightFt = units === "metric" ? height * 3.281 : height;

    // Gross wall area
    const grossArea = perimeterFt * heightFt;

    // Subtract doors (21 ft² each) and windows (15 ft² each)
    const openingsArea = doors * 21 + windows * 15;
    const netArea = Math.max(0, grossArea - openingsArea);

    // Pattern repeat waste: typically adds half a repeat per strip
    // In wallpaper math: waste factor increases with repeat size
    // 0" = 10% base waste, 6" = 15%, 12" = 20%, 18" = 25%, 24" = 30%
    const wastePctMap: Record<number, number> = {
      0: 10,
      6: 15,
      12: 20,
      18: 25,
      24: 30,
    };
    const wastePct = wastePctMap[patternRepeat] ?? 15;

    const areaWithWaste = netArea * (1 + wastePct / 100);
    const rollsNeeded = Math.ceil(areaWithWaste / rollCoverageFt2);

    // Determine roll type label
    const rollLabel =
      rollCoverageFt2 === 56
        ? "double rolls"
        : rollCoverageFt2 === 29
          ? "single rolls"
          : "metric rolls";

    const areaUnit = units === "metric" ? "m²" : "ft²";
    const displayGross = units === "metric" ? grossArea / 10.764 : grossArea;
    const displayNet = units === "metric" ? netArea / 10.764 : netArea;

    return {
      value: rollsNeeded,
      unit: rollLabel,
      valueRounded: rollsNeeded,
      breakdown: [
        { label: "gross wall area", value: `${formatNumber(round(displayGross, 0))} ${areaUnit}` },
        { label: "after openings", value: `${formatNumber(round(displayNet, 0))} ${areaUnit}` },
        { label: "pattern waste", value: `${wastePct}%` },
        { label: "coverage per roll", value: `${rollCoverageFt2} ft²` },
      ],
      formulaSteps: [
        `gross area = ${formatNumber(round(perimeterFt, 1))} ft × ${formatNumber(round(heightFt, 1))} ft = ${formatNumber(round(grossArea, 0))} ft²`,
        `openings = ${doors} doors × 21 + ${windows} windows × 15 = ${openingsArea} ft²`,
        `net area = ${formatNumber(round(grossArea, 0))} − ${openingsArea} = ${formatNumber(round(netArea, 0))} ft²`,
        `pattern repeat = ${patternRepeat}", waste = ${wastePct}%`,
        `with waste = ${formatNumber(round(netArea, 0))} × ${(1 + wastePct / 100).toFixed(2)} = ${formatNumber(round(areaWithWaste, 0))} ft²`,
        `coverage per roll = ${rollCoverageFt2} ft²`,
        `rolls = ⌈${formatNumber(round(areaWithWaste, 0))} ÷ ${rollCoverageFt2}⌉ = ${rollsNeeded} ${rollLabel}`,
      ],
    };
  },

  ContentExpansion: WallpaperCalculatorExpansion,

  formulaDescription:
    "rolls = ⌈((perimeter × height − openings) × (1 + pattern waste)) ÷ roll coverage⌉",

  methodology: [
    "Gross wall area is computed from the room perimeter times the wall height. This assumes you're papering all four walls — for accent walls or partial rooms, enter just the perimeter you're papering (length of wall × 2 if just one wall: you can also enter the actual length in perimeter field since perimeter math is just linear feet).",
    "Doors and windows are subtracted using standard sizes: 21 square feet per door (7 ft × 3 ft typical), 15 square feet per window (4 ft × 4 ft average). Small decorative windows should be ignored; only subtract openings larger than a few square feet.",
    "Pattern repeat is the key driver of wallpaper waste. With no pattern, you can use nearly every inch of every strip. With a 24-inch repeat, every strip needs to be trimmed to align with the adjacent strip — wasting up to half a repeat per strip. The calculator scales waste from 10% (no pattern) to 30% (24-inch repeat).",
    "Roll coverage varies by market. American 'double rolls' cover 56 sq ft (sold in the US because single rolls are too small to be practical). European single rolls cover 29 sq ft. Metric rolls cover about 15 sq meters (161 sq ft). Always verify coverage with your specific product — some designer brands use non-standard roll sizes.",
    "Rolls round up to whole rolls. For larger rooms, buy one extra roll beyond the calculator's count as insurance — you cannot practically match dye lots by buying more rolls later. Discontinued patterns are especially unforgiving; keep one unopened roll for years as a repair reserve.",
  ],

  sources: [
    {
      name: "Wallcoverings Association — Estimating Guide",
      url: "https://www.wallcoverings.org/",
      note: "Industry standards for roll coverage and pattern matching",
    },
    {
      name: "Home Depot — How To Measure For Wallpaper",
      url: "https://www.homedepot.com/",
      note: "Reference for door and window area subtractions",
    },
  ],

  related: [
    { name: "Paint calculator", slug: "paint-calculator", description: "Gallons of paint for any room" },
    { name: "Drywall calculator", slug: "drywall-calculator", description: "Sheets before wallpaper" },
    { name: "Flooring calculator", slug: "flooring-calculator", description: "Hardwood, laminate, vinyl" },
    { name: "Tile calculator", slug: "tile-calculator", description: "Bathroom and kitchen tile" },
  ],

  faq: [
    {
      question: "How many rolls of wallpaper for a 12×14 room?",
      answer:
        "For a 12×14 ft room with 9-foot ceilings, 1 door, and 2 windows, you need about 9 American double rolls (56 ft² each) for a non-patterned paper, or 11-12 rolls for a large repeat. The calculator above handles any room size and pattern.",
    },
    {
      question: "What's a double roll vs a single roll?",
      answer:
        "American wallpaper is packaged as 'double rolls' because single rolls are too small to be practical (a single US roll would only cover 28-29 sq ft, enough for one 9-foot strip). European and international wallpapers are usually sold as single rolls because they're slightly larger. When in doubt, the package label tells you total coverage in sq ft or m².",
    },
    {
      question: "How much extra should I buy for pattern repeats?",
      answer:
        "For non-patterned or random-match paper: 10% extra. For small repeats (6-12 inches): 15-20%. For large repeats (18-24+ inches): 25-30%. The waste comes from trimming strips to align the pattern. Papers with 'drop match' (diagonal alignment) can waste even more.",
    },
    {
      question: "Do I subtract doors and windows?",
      answer:
        "Yes, but only for significant openings (larger than a few square feet). The calculator uses 21 sq ft for a standard door and 15 sq ft for an average window. Very small decorative windows or vents shouldn't be subtracted — just add them to your waste buffer.",
    },
    {
      question: "Can I use this for accent walls?",
      answer:
        "Yes — instead of room perimeter, enter just the length of the accent wall. The math works for any wall area. For a 12-foot-wide accent wall at 9-foot ceilings, enter 12 in 'perimeter' (the linear run of paperable wall) and 9 in 'height'.",
    },
    {
      question: "What's the difference between prepasted and unpasted?",
      answer:
        "Prepasted paper has adhesive already applied — you just wet and hang. Easier for DIY. Unpasted requires applying paste separately (roller or paste-the-wall method) — more flexible, better for thick vinyl or grasscloth but slower. Roll coverage is identical.",
    },
    {
      question: "How do I deal with a dye lot?",
      answer:
        "All your wallpaper rolls should have the same 'batch number' or 'lot number' printed on the packaging. Rolls from different lots can have slight but visible color differences. Buy all rolls from one lot at once. Keep an unopened roll for future repairs — years later, the exact lot is impossible to re-order.",
    },
    {
      question: "Should I hire a professional installer?",
      answer:
        "For basic straight rooms with simple patterns, DIY is reasonable for patient installers. For large-repeat patterns, grasscloth, or difficult shapes (curved walls, stairwells), pros are worth the $3-8/sq ft labor cost. Mistakes on expensive designer wallpaper ($100+ per roll) add up fast.",
    },
  ],
};
