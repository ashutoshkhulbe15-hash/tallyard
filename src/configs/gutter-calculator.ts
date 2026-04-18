import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const gutterCalculatorConfig: CalculatorConfig = {
  slug: "gutter-calculator",
  title: "Gutter Calculator",
  description:
    "Linear feet of gutter, downspouts, and accessories for any home. Sizes gutters for your roof area and rainfall intensity.",
  categoryLabel: "Roofing",
  category: "roofing",

  bannerHeadline: "Drain safely.",
  bannerTags: ["5\" or 6\" K-style", "Downspouts + hangers", "Size by rainfall"],

  inputs: [
    {
      id: "roofLength",
      label: "Roof edge length (linear ft of gutter needed)",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 120,
      defaultMetric: 37,
      min: 10,
      step: 1,
      help: "Sum of all eaves where gutters will be installed",
    },
    {
      id: "roofArea",
      label: "Roof area drained (per section)",
      type: "number",
      unitImperial: "ft²",
      unitMetric: "m²",
      defaultImperial: 1200,
      defaultMetric: 111,
      min: 100,
      step: 50,
      help: "Square footage of roof area that feeds into the longest run",
    },
    {
      id: "pitch",
      label: "Roof pitch",
      type: "select",
      defaultImperial: 1.0,
      options: [
        { label: "Flat to 3/12", value: 1.0 },
        { label: "4/12 to 6/12", value: 1.1 },
        { label: "7/12 to 9/12", value: 1.2 },
        { label: "10/12+", value: 1.3 },
      ],
      help: "Steeper roofs channel more water — need bigger gutters",
    },
    {
      id: "rainfall",
      label: "Peak rainfall intensity",
      type: "select",
      defaultImperial: 7,
      options: [
        { label: "5 in/hr (Pacific NW, N. Plains)", value: 5 },
        { label: "7 in/hr (Midwest, Northeast)", value: 7 },
        { label: "9 in/hr (Gulf Coast, FL)", value: 9 },
      ],
      help: "100-year 5-minute rainfall rate for your region",
    },
    {
      id: "corners",
      label: "Corners (inside + outside)",
      type: "number",
      defaultImperial: 4,
      min: 0,
      step: 1,
      help: "Each corner needs a miter or corner piece",
    },
  ],

  calculate: (values, units) => {
    const roofLength = Number(values.roofLength) || 0;
    const roofArea = Number(values.roofArea) || 0;
    const pitch = Number(values.pitch) || 1.0;
    const rainfall = Number(values.rainfall) || 7;
    const corners = Number(values.corners) || 0;

    const roofLengthFt = units === "metric" ? roofLength * 3.281 : roofLength;
    const roofAreaSqFt = units === "metric" ? roofArea * 10.764 : roofArea;

    // Effective drainage area = roof area × pitch factor × rainfall/7
    // (7 in/hr is the reference baseline for 5" gutters)
    const effectiveArea = roofAreaSqFt * pitch * (rainfall / 7);

    // Sizing: 5" K-style handles up to ~5,500 sq ft effective; 6" handles up to ~7,900
    // Below 5,500 → 5"; above → 6"
    const gutterSize = effectiveArea > 5500 ? "6\"" : "5\"";

    // Downspouts: 1 per 600-800 sq ft for 5", 1 per 1,200 sq ft for 6"
    const maxSqFtPerDownspout = gutterSize === "6\"" ? 1200 : 700;
    const downspouts = Math.max(
      Math.ceil(effectiveArea / maxSqFtPerDownspout),
      Math.ceil(roofLengthFt / 40) // at least 1 per 40 ft of gutter
    );

    // Downspout length: assume 1 story ~10 ft; approximate 12 ft per downspout (incl elbows)
    const downspoutLinearFt = downspouts * 12;

    // Hangers: 1 every 24-32 inches. Use 32" OC for most installs.
    const hangers = Math.ceil(roofLengthFt / (32 / 12));

    // End caps: 2 per gutter run (one at each end)
    // Approximate 1 run per 60 ft of gutter
    const runs = Math.max(1, Math.ceil(roofLengthFt / 60));
    const endCaps = runs * 2;

    // Elbows: typically 2-3 per downspout (top + middle + bottom)
    const elbows = downspouts * 3;

    const totalLinearFt = roofLengthFt + downspoutLinearFt;
    const displayLinear =
      units === "metric" ? totalLinearFt * 0.3048 : totalLinearFt;
    const lengthUnit = units === "metric" ? "m" : "ft";

    return {
      value: Math.ceil(displayLinear),
      unit: `linear ${lengthUnit}`,
      valueRounded: Math.ceil(displayLinear),
      breakdown: [
        { label: "gutter size", value: gutterSize },
        { label: "gutter length", value: `${formatNumber(round(roofLengthFt, 0))} ft` },
        { label: "downspouts", value: `${downspouts}` },
        { label: "hangers (32\" OC)", value: `${hangers}` },
        { label: "elbows", value: `${elbows}` },
        { label: "corners", value: `${corners}` },
        { label: "end caps", value: `${endCaps}` },
      ],
      formulaSteps: [
        `roof edge = ${formatNumber(round(roofLengthFt, 0))} ft`,
        `roof area = ${formatNumber(round(roofAreaSqFt, 0))} ft²`,
        `effective area = ${formatNumber(round(roofAreaSqFt, 0))} × ${pitch} × (${rainfall}/7) = ${formatNumber(round(effectiveArea, 0))} ft²`,
        `gutter size = ${gutterSize} (${effectiveArea > 5500 ? "6\" for area > 5,500 ft²" : "5\" sufficient"})`,
        `downspouts = max(⌈${formatNumber(round(effectiveArea, 0))} ÷ ${maxSqFtPerDownspout}⌉, ⌈${formatNumber(round(roofLengthFt, 0))} ÷ 40⌉) = ${downspouts}`,
        `downspout linear ft = ${downspouts} × 12 ≈ ${downspoutLinearFt} ft`,
        `hangers = ⌈${formatNumber(round(roofLengthFt, 0))} ÷ 2.67⌉ = ${hangers} at 32" OC`,
        `elbows = ${downspouts} × 3 = ${elbows}`,
        `end caps = ${runs} runs × 2 = ${endCaps}`,
        `total linear ft = ${formatNumber(round(roofLengthFt, 0))} gutter + ${downspoutLinearFt} downspout = ${formatNumber(round(totalLinearFt, 0))} ft`,
      ],
    };
  },

  formulaDescription:
    "gutter = roof edge ft; downspouts = ⌈effective area ÷ (600-1200 ft² per DS)⌉; size = 5\" up to 5,500 ft², 6\" above",

  methodology: [
    "Gutter sizing starts with the effective drainage area — the roof area that funnels water into the longest gutter run, adjusted for roof pitch and local rainfall intensity. Steeper roofs deliver water to the gutter faster, so pitch factor bumps up effective area (1.1 for 4-6/12 pitch, up to 1.3 for very steep roofs). Regional rainfall matters too — Gulf Coast storms deliver 9 in/hr of rain; the Pacific Northwest rarely exceeds 5 in/hr.",
    "The rule of thumb: 5-inch K-style gutters handle effective areas up to ~5,500 sq ft. Above that, step up to 6-inch gutters which handle ~7,900 sq ft. Most residential homes use 5-inch; large houses or high-rainfall areas often need 6-inch. Commercial and industrial buildings use even larger sizes.",
    "Downspouts: one per 600-800 sq ft of effective drainage area for 5-inch gutters, one per 1,200 sq ft for 6-inch. Also a minimum of one downspout per 40 feet of gutter run to prevent overflow from long unbroken runs. A simple rectangular home often has 4 downspouts (one per corner); larger homes need more.",
    "Hangers (the metal brackets holding the gutter to the fascia) space 24-32 inches on center. The calculator uses 32-inch spacing which is standard for most climates. In snow-load regions (New England, Upper Midwest), spec 16-20 inch spacing because snow weight can pull out widely-spaced hangers.",
    "Elbows are the 45 or 90-degree fittings that connect downspouts to the gutter and turn corners at the ground level. Typical downspout uses 3 elbows: one at the top (gutter to downspout), one at the bottom (downspout to ground discharge), and sometimes one at the middle (to clear trim or offset).",
    "Not included: splash blocks (concrete pads at downspout discharge), gutter guards or screens, heated gutter cables (for ice dam prevention in cold climates), fascia repair materials, and labor. Professional installation costs $5-15 per linear foot for aluminum, $15-35 for copper.",
  ],

  sources: [
    {
      name: "SMACNA — Architectural Sheet Metal Manual",
      url: "https://www.smacna.org/",
      note: "Industry standard for gutter sizing by drainage area",
    },
    {
      name: "IRC 2021 Chapter 11 — Roofing",
      url: "https://codes.iccsafe.org/",
      note: "Code requirements for drainage and downspout placement",
    },
  ],

  related: [
    { name: "Roofing calculator", slug: "roofing-calculator", description: "Shingle bundles for any pitch" },
    { name: "Siding calculator", slug: "siding-calculator", description: "Squares of siding for any home" },
    { name: "Paint calculator", slug: "paint-calculator", description: "Exterior paint and trim" },
    { name: "Insulation calculator", slug: "insulation-calculator", description: "Attic insulation R-value" },
  ],

  faq: [
    {
      question: "How many feet of gutter do I need for my house?",
      answer:
        "Measure the total length of all roof eaves where you want gutters — typically the sum of the long sides of the house. A typical 30×40 ft ranch has 70-80 ft of gutter if only the long sides have gutters, or ~140 ft if all four sides do. The calculator handles any length.",
    },
    {
      question: "Should I use 5-inch or 6-inch gutters?",
      answer:
        "5-inch handles most residential homes up to ~2,000 sq ft per drainage section. 6-inch is needed for larger homes, steep roofs, or areas with heavy rainfall (Gulf Coast, Florida). The calculator checks effective drainage area against these thresholds automatically. When in doubt, 6-inch provides more capacity with minimal cost increase.",
    },
    {
      question: "How many downspouts do I need?",
      answer:
        "Minimum: one per 40 feet of gutter run, plus extras as needed for effective drainage area. For 5-inch gutters, one downspout per 600-800 sq ft of effective roof area. Typical 2,000 sq ft home: 4 downspouts placed at corners and intermediate points. Too few downspouts cause overflow; too many are wasteful but not harmful.",
    },
    {
      question: "Where should I place downspouts?",
      answer:
        "At outside corners (lowest points of the roof's slope) and at the ends of long runs. Downspouts need clear discharge paths — never onto a neighbor's property, toward a foundation, or onto hardscape that sends water back to the house. Always extend downspouts 4-6 feet from the foundation or direct into an approved drainage system.",
    },
    {
      question: "How far apart should gutter hangers be?",
      answer:
        "Standard climates: 24-32 inches on center. In snow-load regions, 16-20 inches. Hangers cost $2-5 each, so tighter spacing adds little material cost but provides crucial durability. Older homes often have hangers at 36-48 inches, which is inadequate — expect gutters to pull loose from the fascia over time.",
    },
    {
      question: "Can I install gutters myself?",
      answer:
        "Seamless aluminum gutters are typically installed by professionals who fabricate them on-site from rolls of aluminum. Sectional gutters (5 or 10 foot pre-cut pieces from home centers) are DIY-friendly. Aluminum is lightest and easiest. Copper requires solder joints. Vinyl is cheapest but brittle in cold weather and typically lasts only 10-15 years.",
    },
    {
      question: "What do gutter guards cost?",
      answer:
        "DIY mesh screens: $1-3 per linear foot. Foam or brush-style inserts: $3-8 per linear foot. Professional micro-mesh (like LeafGuard or Gutter Helmet): $20-60 per linear foot installed. Not included in this calculator — budget separately if desired. Value varies; foam inserts clog with fine debris, professional systems have better long-term performance.",
    },
    {
      question: "How long do gutters last?",
      answer:
        "Aluminum: 20-30 years. Galvanized steel: 20-30 years but may rust. Copper: 50-100 years (premium, expensive). Vinyl: 10-20 years. Lifespan depends on climate — ice dams, hail, leaves trapped for years, and falling tree limbs all shorten life. Clean gutters twice yearly (spring and fall) to maximize lifespan.",
    },
  ],
  relatedGuides: [
    { name: "Vinyl vs fiber cement siding", slug: "vinyl-vs-fiber-cement-siding", description: "30-year cost comparison with fire ratings and maintenance math" },
  ],
};
