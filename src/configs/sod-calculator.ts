import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const sodCalculatorConfig: CalculatorConfig = {
  slug: "sod-calculator",
  title: "Sod Calculator",
  description:
    "Square footage, rolls, and pallets of sod for any lawn. Accounts for cuts and waste so you can finish installation in one day.",
  categoryLabel: "Landscaping",
  category: "landscaping",

  bannerHeadline: "Sod evenly.",
  bannerTags: ["Rolls · slabs · pallets", "Accounts for cuts", "ft² or m²"],

  inputs: [
    {
      id: "length",
      label: "Lawn length",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 40,
      defaultMetric: 12,
      min: 1,
      step: 1,
    },
    {
      id: "width",
      label: "Lawn width",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 25,
      defaultMetric: 7.5,
      min: 1,
      step: 1,
    },
    {
      id: "shape",
      label: "Lawn shape",
      type: "select",
      defaultImperial: "rectangular",
      options: [
        { label: "Rectangular", value: "rectangular" },
        { label: "Irregular (+15% waste)", value: "irregular" },
        { label: "Heavy curves (+25% waste)", value: "curved" },
      ],
    },
    {
      id: "sodSize",
      label: "Sod format",
      type: "select",
      defaultImperial: "slab",
      options: [
        { label: "Slab (16×24\" · 2.67 ft²)", value: "slab" },
        { label: "Small roll (2×5' · 10 ft²)", value: "smallRoll" },
        { label: "Big roll (3.3×6' · 20 ft²)", value: "bigRoll" },
      ],
      help: "Slabs are typical residential; big rolls for large installs",
    },
  ],

  calculate: (values, units) => {
    const L = Number(values.length) || 0;
    const W = Number(values.width) || 0;
    const shape = String(values.shape || "rectangular");
    const sodSize = String(values.sodSize || "slab");

    const area = L * W;
    const areaSqFt = units === "metric" ? area * 10.764 : area;

    // Waste factor by shape
    const wastePct = shape === "curved" ? 25 : shape === "irregular" ? 15 : 5;
    const areaWithWaste = areaSqFt * (1 + wastePct / 100);

    // Sod piece coverage (in sq ft)
    const pieceCoverage: Record<string, number> = {
      slab: 2.67,
      smallRoll: 10,
      bigRoll: 20,
    };
    const coverage = pieceCoverage[sodSize] || 2.67;
    const pieces = Math.ceil(areaWithWaste / coverage);

    // Pallet counts: standard pallet = 500 sq ft
    const pallets = Math.ceil(areaWithWaste / 500);

    const areaUnit = units === "metric" ? "m²" : "ft²";
    const displayArea = units === "metric" ? area : areaSqFt;
    const displayWithWaste =
      units === "metric" ? areaWithWaste / 10.764 : areaWithWaste;

    const pieceLabel =
      sodSize === "slab"
        ? "slabs"
        : sodSize === "smallRoll"
          ? "small rolls"
          : "big rolls";

    return {
      value: pieces,
      unit: pieceLabel,
      valueRounded: pieces,
      breakdown: [
        { label: "area", value: `${formatNumber(round(displayArea, 1))} ${areaUnit}` },
        { label: "with waste", value: `${formatNumber(round(displayWithWaste, 1))} ${areaUnit}` },
        { label: "pallets (500 ft²)", value: `${pallets}` },
        { label: "shape waste", value: `${wastePct}%` },
      ],
      formulaSteps: [
        `area = ${L} × ${W} = ${formatNumber(round(areaSqFt, 0))} ft²${units === "metric" ? ` (${formatNumber(round(area, 1))} m²)` : ""}`,
        `shape = ${shape}, waste = ${wastePct}%`,
        `with waste = ${formatNumber(round(areaSqFt, 0))} × ${(1 + wastePct / 100).toFixed(2)} = ${formatNumber(round(areaWithWaste, 0))} ft²`,
        `piece coverage = ${coverage} ft² per ${sodSize === "slab" ? "slab" : sodSize === "smallRoll" ? "small roll" : "big roll"}`,
        `${pieceLabel} = ⌈${formatNumber(round(areaWithWaste, 0))} ÷ ${coverage}⌉ = ${pieces}`,
        `pallets = ⌈${formatNumber(round(areaWithWaste, 0))} ÷ 500⌉ = ${pallets}`,
      ],
    };
  },

  formulaDescription:
    "pieces = ⌈(area × (1 + shape waste)) ÷ coverage per piece⌉",

  methodology: [
    "The calculator multiplies lawn area by a shape-dependent waste factor. Rectangular lawns need only 5% waste — sod lays in straight rows with minimal end cuts. Irregular lawns (curves, trees, flower beds to work around) need 15% because every edge piece requires a cut. Heavily curved lawns with lots of obstacles need 25% — every cut produces scrap that rarely fits elsewhere.",
    "Sod is sold in three main formats: individual slabs (16\" × 24\" ≈ 2.67 sq ft each, most common at garden centers and small farms), small rolls (2 × 5 ft ≈ 10 sq ft, used for residential installs where workers can carry rolls), and big rolls (3.3 × 6 ft ≈ 20 sq ft, used for commercial and large residential installs with equipment).",
    "Pallet counts are for logistics planning: a standard pallet of slabs holds about 500 square feet. Suppliers charge by the pallet delivery plus a per-square-foot rate. Ordering in partial pallets is possible at some suppliers but usually adds a surcharge.",
    "The calculator rounds piece counts and pallet counts up — you can't buy half a slab or half a pallet. Because sod lives only 8-24 hours off the farm before it starts degrading, order conservatively. Install within one day of delivery; leftover pieces become compost or fill for future bare spots.",
    "For accurate estimates with oddly-shaped lawns, break the area into rectangles (a driveway strip + a backyard rectangle + a front curve), calculate each separately, and add the piece counts. This gives more accurate results than applying one waste factor to an awkward total.",
  ],

  sources: [
    {
      name: "Turfgrass Producers International",
      url: "https://www.turfgrasssod.org/",
      note: "Industry standards for sod sizing and installation",
    },
    {
      name: "University of Maryland Extension — Lawn Establishment",
      url: "https://extension.umd.edu/",
      note: "Timing, site prep, and installation reference",
    },
  ],

  related: [
    { name: "Topsoil calculator", slug: "topsoil-calculator", description: "Cubic yards for lawn base prep" },
    { name: "Mulch calculator", slug: "mulch-calculator", description: "For beds around your sodded lawn" },
    { name: "Gravel calculator", slug: "gravel-calculator", description: "Base material for paths and drives" },
    { name: "Fence calculator", slug: "fence-calculator", description: "Posts, rails, and pickets" },
  ],

  faq: [
    {
      question: "How much sod do I need for a 1,000 sq ft lawn?",
      answer:
        "For a 1,000 sq ft rectangular lawn, you need about 1,050 sq ft of sod (5% waste) — that's 394 slabs, 2 pallets. An irregular lawn of the same size needs 1,150 sq ft, about 3 pallets. The calculator above adjusts for your specific lawn shape.",
    },
    {
      question: "What's the difference between slabs and rolls?",
      answer:
        "Slabs (16 × 24 inches) are the standard format at garden centers — easy to handle solo, good for residential areas up to about 1,000 sq ft. Small rolls (2 × 5 ft) speed up installation but need two people. Big rolls (3.3 × 6 ft) require a sod cutter and tractor attachment — for commercial and large residential installs.",
    },
    {
      question: "How long can sod sit before installation?",
      answer:
        "12-24 hours maximum from farm to ground. Longer in hot weather is worse — sod stacked on a pallet in summer sun can die in 6-8 hours. Always schedule delivery for the morning of installation. If you can't install immediately, keep pallets shaded and water them lightly.",
    },
    {
      question: "How much sod fits in a pickup truck?",
      answer:
        "A full-size pickup can carry one pallet of sod (500 sq ft, about 3,000 lbs). That's near the legal GVW limit — drive carefully. Compact trucks are rated for half a pallet max. For multiple pallets, hire delivery — sod suppliers typically charge $50-150 per delivery plus a per-square-foot rate.",
    },
    {
      question: "Do I need to prep the ground first?",
      answer:
        "Yes — this is where most DIY installations fail. Remove all existing turf and weeds. Till to loosen compacted soil. Add 2-4 inches of topsoil if existing soil is poor. Rake level, compact lightly with a lawn roller, and water. Only then install sod.",
    },
    {
      question: "How much does sod cost?",
      answer:
        "Sod retail: $0.35-0.80 per square foot for common cool-season grass (fescue, Kentucky bluegrass); $0.50-1.00 for warm-season (Bermuda, zoysia, St. Augustine). Delivery is $75-200 per trip. Total installed cost (DIY): $0.50-1.00/sq ft; professional installation: $1.50-3.00/sq ft.",
    },
    {
      question: "When is the best time to install sod?",
      answer:
        "Spring and early fall for cool-season grasses (60-75°F air temperature during establishment). Late spring through summer for warm-season grasses (70°F+ soil temperature). Avoid extreme summer heat — newly laid sod transpires water faster than roots can absorb it. Avoid winter — dormant sod doesn't root.",
    },
    {
      question: "How much do I water new sod?",
      answer:
        "First week: 1-2 inches of water per day, split into 2-3 sessions (not all at once). Second week: daily, once a day. Third week onward: 1-1.5 inches per week total. Sod dies fast from under-watering in the first 10 days. It's one of the highest water-demand landscape projects during establishment.",
    },
  ],
};
