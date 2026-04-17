import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const kitchenCabinetCalculatorConfig: CalculatorConfig = {
  slug: "kitchen-cabinet-calculator",
  title: "Kitchen Cabinet Calculator",
  description:
    "Linear feet of upper and base cabinets for any kitchen. Budget and cabinet count by kitchen size and layout.",
  categoryLabel: "Flooring",
  category: "flooring",

  bannerHeadline: "Stack functionally.",
  bannerTags: ["Uppers + base", "By linear ft", "Budget estimate"],

  inputs: [
    {
      id: "layout",
      label: "Kitchen layout",
      type: "select",
      defaultImperial: "L",
      options: [
        { label: "Single wall", value: "single" },
        { label: "Galley (two walls)", value: "galley" },
        { label: "L-shaped", value: "L" },
        { label: "U-shaped", value: "U" },
        { label: "L + island", value: "Lisland" },
      ],
    },
    {
      id: "wallOneLength",
      label: "Primary wall length",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 12,
      defaultMetric: 3.7,
      min: 4,
      step: 0.5,
    },
    {
      id: "wallTwoLength",
      label: "Second wall (galley/L/U)",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 8,
      defaultMetric: 2.4,
      min: 0,
      step: 0.5,
      help: "0 if single-wall kitchen",
    },
    {
      id: "wallThreeLength",
      label: "Third wall (U only)",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 0,
      defaultMetric: 0,
      min: 0,
      step: 0.5,
      help: "0 if not a U-shaped kitchen",
    },
    {
      id: "islandLength",
      label: "Island length (if any)",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 0,
      defaultMetric: 0,
      min: 0,
      step: 0.5,
    },
    {
      id: "grade",
      label: "Cabinet grade",
      type: "select",
      defaultImperial: "midrange",
      options: [
        { label: "Stock (IKEA, Home Depot)", value: "stock" },
        { label: "Mid-range (semi-custom)", value: "midrange" },
        { label: "Custom", value: "custom" },
      ],
    },
  ],

  calculate: (values, units) => {
    const layout = String(values.layout || "L");
    const w1 = Number(values.wallOneLength) || 0;
    const w2 = Number(values.wallTwoLength) || 0;
    const w3 = Number(values.wallThreeLength) || 0;
    const island = Number(values.islandLength) || 0;
    const grade = String(values.grade || "midrange");

    // Convert to feet
    const w1Ft = units === "metric" ? w1 * 3.281 : w1;
    const w2Ft = units === "metric" ? w2 * 3.281 : w2;
    const w3Ft = units === "metric" ? w3 * 3.281 : w3;
    const islandFt = units === "metric" ? island * 3.281 : island;

    // Calculate total wall perimeter by layout
    let totalBaseFt: number;
    let totalUpperFt: number;
    let layoutDesc: string;

    if (layout === "single") {
      totalBaseFt = w1Ft;
      totalUpperFt = w1Ft * 0.75; // Uppers typically 75% of base (sink + stove don't have uppers)
      layoutDesc = "single wall";
    } else if (layout === "galley") {
      totalBaseFt = w1Ft + w2Ft;
      totalUpperFt = (w1Ft + w2Ft) * 0.75;
      layoutDesc = "galley";
    } else if (layout === "L") {
      totalBaseFt = w1Ft + w2Ft;
      totalUpperFt = (w1Ft + w2Ft) * 0.7;
      layoutDesc = "L-shape";
    } else if (layout === "U") {
      totalBaseFt = w1Ft + w2Ft + w3Ft;
      totalUpperFt = (w1Ft + w2Ft + w3Ft) * 0.7;
      layoutDesc = "U-shape";
    } else {
      // L + island
      totalBaseFt = w1Ft + w2Ft + islandFt;
      totalUpperFt = (w1Ft + w2Ft) * 0.7; // island typically no uppers
      layoutDesc = "L + island";
    }

    // Subtract ~3 ft for appliances (stove, sink, dishwasher each)
    const appliancesDeduction = layout === "single" ? 6 : 9;
    const installedBaseFt = Math.max(0, totalBaseFt - appliancesDeduction);

    // Cabinet count: average cabinet widths are 18-36", use 24" average
    const baseCabinets = Math.ceil((installedBaseFt * 12) / 24);
    const upperCabinets = Math.ceil((totalUpperFt * 12) / 24);

    // Price per linear ft installed, by grade
    const priceMap: Record<string, { low: number; high: number }> = {
      stock: { low: 80, high: 180 },
      midrange: { low: 180, high: 400 },
      custom: { low: 400, high: 800 },
    };
    const price = priceMap[grade] || priceMap["midrange"];
    const totalLinearFt = installedBaseFt + totalUpperFt;
    const costLow = Math.round(totalLinearFt * price.low);
    const costHigh = Math.round(totalLinearFt * price.high);

    return {
      value: round(totalLinearFt, 1),
      unit: "linear ft",
      valueRounded: Math.ceil(totalLinearFt),
      breakdown: [
        { label: "layout", value: layoutDesc },
        { label: "base cabinets", value: `${baseCabinets} @ ~24" wide (${round(installedBaseFt, 1)} ft)` },
        { label: "upper cabinets", value: `${upperCabinets} @ ~24" wide (${round(totalUpperFt, 1)} ft)` },
        { label: "total linear ft", value: `${round(totalLinearFt, 1)} ft` },
        { label: "estimated cost", value: `$${costLow.toLocaleString()}–$${costHigh.toLocaleString()}` },
      ],
      formulaSteps: [
        `layout = ${layoutDesc}`,
        `total wall cabinets linear ft = ${round(totalBaseFt, 1)} ft base (before appliances)`,
        `appliance deduction = ${appliancesDeduction} ft (stove, sink, dishwasher)`,
        `installed base cabinets = ${round(installedBaseFt, 1)} ft`,
        `upper cabinets = ${round(totalUpperFt, 1)} ft (70-75% of base walls)`,
        `base cabinets count = ⌈${round(installedBaseFt, 1)} × 12 ÷ 24⌉ = ${baseCabinets}`,
        `upper cabinets count = ⌈${round(totalUpperFt, 1)} × 12 ÷ 24⌉ = ${upperCabinets}`,
        `total linear ft = ${round(installedBaseFt + totalUpperFt, 1)}`,
        `${grade} cost: $${price.low}-${price.high}/ft × ${round(totalLinearFt, 1)} = $${costLow.toLocaleString()}-${costHigh.toLocaleString()}`,
      ],
      composition: {
        unit: "ft",
        total: round(totalLinearFt, 1),
        segments: [
          { label: "Base", amount: round(installedBaseFt, 1), shade: "primary" },
          { label: "Upper", amount: round(totalUpperFt, 1), shade: "secondary" },
        ],
      },
    };
  },

  formulaDescription:
    "base ft = perimeter − appliances; upper ft = perimeter × 70-75%; cabinets = ⌈ft × 12 ÷ 24⌉",

  methodology: [
    "Kitchen cabinets are measured in linear feet — the combined length of all base and upper cabinet sections. Base cabinets (on the floor, 24\" deep, 34.5\" tall before countertop) run along most walls. Upper cabinets (mounted on the wall, 12\" deep, typically 30-42\" tall) cover 70-75% of the same wall length because sinks, stoves, and windows interrupt the run.",
    "Layout determines total perimeter. Single-wall: one run of 10-15 ft typically. Galley: two parallel walls, 8-12 ft each. L-shape: two walls meeting at a corner. U-shape: three walls. L + island: L-shape plus an island (typically 6-8 ft of base cabinets, no uppers). Your layout + wall lengths tells the calculator everything.",
    "Appliance deduction: each major appliance (stove, sink, dishwasher) replaces about 3 feet of base cabinet. A kitchen with stove, sink, and dishwasher loses 9 linear feet of base cabinetry. Single-wall layouts have 6 ft deducted (usually no dishwasher or smaller kitchen).",
    "Cabinet count uses 24-inch average width. Real cabinets range from 12\" (single door) to 36-48\" (wide double-door or drawer banks) — the 24-inch average produces a realistic estimate for typical kitchens. Tight kitchens with many small cabinets have more units; spacious kitchens with fewer-but-larger cabinets have fewer.",
    "Price estimates (installed, 2025-2026 US) by grade: stock cabinets (IKEA Sektion, Home Depot Hampton Bay) $80-180/ft — pre-assembled or flat-pack, limited sizes, basic finishes, quick install. Mid-range semi-custom (Kraftmaid, Thomasville, Diamond) $180-400/ft — most Americans' choice, 8-10 week lead time, lots of options. Custom cabinetry $400-800/ft — made-to-spec, any size or style, 12-20 week lead time.",
    "Not captured: countertop (see countertop calculator), backsplash (see backsplash calculator), appliances themselves, hardware upgrades (pulls/knobs average $5-20 each, 20-40 per kitchen), crown molding and trim, lighting. Total kitchen remodel budget (materials + labor + permits) typically 2-3× the cabinet cost alone.",
  ],

  sources: [
    {
      name: "NKBA — Kitchen Planning Guidelines",
      url: "https://www.nkba.org/",
      note: "Industry standards for kitchen layout and cabinet sizing",
    },
    {
      name: "HomeAdvisor — Cabinet Cost Guide",
      url: "https://www.homeadvisor.com/",
      note: "Reference for installed cost by cabinet grade",
    },
  ],

  related: [
    { name: "Countertop calculator", slug: "countertop-calculator", description: "Square feet for counter surfaces" },
    { name: "Backsplash calculator", slug: "backsplash-calculator", description: "Kitchen tile above counter" },
    { name: "Flooring calculator", slug: "flooring-calculator", description: "Hardwood, laminate, vinyl" },
    { name: "Paint calculator", slug: "paint-calculator", description: "Kitchen paint" },
  ],

  faq: [
    {
      question: "How many linear feet of cabinets do I need for a 10×12 kitchen?",
      answer:
        "Depends on layout. Galley (cabinets on two opposite walls): 20 linear ft base + 15 upper = 35 total. L-shape: 20 base + 14 upper = 34. U-shape with 3 walls: 28 base + 20 upper = 48. The calculator above handles any layout and wall dimensions.",
    },
    {
      question: "What's the difference between stock, semi-custom, and custom cabinets?",
      answer:
        "Stock: pre-made in standard sizes (3-inch increments), limited door styles and colors, cheapest. Semi-custom: pre-made but with more size options, dozens of finishes, door style choices, mid-range price. Custom: made to your exact specifications, any size, any finish, any style, most expensive and longest lead time.",
    },
    {
      question: "Should I buy assembled or flat-pack (RTA) cabinets?",
      answer:
        "Flat-pack (ready-to-assemble) cabinets save 20-30% but require 2-4 hours per cabinet to assemble. IKEA Sektion is the most common flat-pack; very good quality for the price but requires patience. Pre-assembled cabinets cost more but arrive ready to install. For most DIYers: pre-assembled is worth the extra cost.",
    },
    {
      question: "How do I measure my kitchen for cabinets?",
      answer:
        "Measure each wall's length (floor to wall intersections). For an L-shape, measure both legs. For U, all three. Note locations of doors, windows, electrical, plumbing. Measure floor-to-ceiling to pick upper cabinet height (30\" short, 36\" standard, 42\" tall to ceiling). The calculator uses linear feet; you convert measurements to individual cabinet sizes in final design.",
    },
    {
      question: "Do I need an island?",
      answer:
        "An island adds counter space and storage but requires 42-48 inches of clearance on all sides (more for walk-through). Minimum kitchen for an island: 12×10 ft. Smaller kitchens with islands feel cramped. Alternative: a peninsula (attached to one wall) uses less floor space. Budget $1,500-5,000 for a basic island, much more for fully finished.",
    },
    {
      question: "How much does a kitchen remodel cost?",
      answer:
        "Budget: $15,000-25,000 (stock cabinets, laminate counters, DIY paint, keep existing layout). Mid-range: $30,000-60,000 (semi-custom, quartz, some layout changes). High-end: $60,000-150,000+ (custom, premium appliances, full layout reconfiguration). Cabinets alone are 30-40% of total budget. Countertops 10-15%. Appliances 10-20%. Labor 15-25%.",
    },
    {
      question: "What about cabinet hardware?",
      answer:
        "Pulls and knobs typically $5-20 each for basic, $20-50 for premium. A typical kitchen uses 30-50 pieces. Budget $200-1,500 just for hardware. Soft-close hinges are often upgrade-only on stock cabinets (add $50-100 per cabinet). Semi-custom and custom usually include soft-close as standard.",
    },
    {
      question: "Can I reuse existing cabinets?",
      answer:
        "Options: refinishing (sand and stain or paint existing, $1,500-4,000 for a typical kitchen), refacing (replace doors and drawer fronts, keep the boxes, $5,000-15,000), or full replacement. Reusing makes sense if cabinets are solid wood in good structural condition — particleboard or MDF boxes 15+ years old are usually not worth refinishing.",
    },
  ],
};
