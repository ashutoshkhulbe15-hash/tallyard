import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const lumberCalculatorConfig: CalculatorConfig = {
  slug: "lumber-calculator",
  title: "Lumber Calculator",
  description:
    "Board feet and lineal feet for any lumber order. Handles nominal sizes (2×4, 2×6, etc.) and quantities — for framing, decks, and projects.",
  categoryLabel: "Lumber",
  category: "drywall",

  bannerHeadline: "Order cleanly.",
  bannerTags: ["Board feet + lineal", "All nominal sizes", "With waste factor"],

  inputs: [
    {
      id: "nominalSize",
      label: "Nominal size",
      type: "select",
      defaultImperial: "2x4",
      options: [
        { label: "1×4 (0.75 × 3.5\" actual)", value: "1x4" },
        { label: "1×6 (0.75 × 5.5\" actual)", value: "1x6" },
        { label: "1×8 (0.75 × 7.25\" actual)", value: "1x8" },
        { label: "1×12 (0.75 × 11.25\" actual)", value: "1x12" },
        { label: "2×2 (1.5 × 1.5\" actual)", value: "2x2" },
        { label: "2×4 (1.5 × 3.5\" actual)", value: "2x4" },
        { label: "2×6 (1.5 × 5.5\" actual)", value: "2x6" },
        { label: "2×8 (1.5 × 7.25\" actual)", value: "2x8" },
        { label: "2×10 (1.5 × 9.25\" actual)", value: "2x10" },
        { label: "2×12 (1.5 × 11.25\" actual)", value: "2x12" },
        { label: "4×4 (3.5 × 3.5\" actual)", value: "4x4" },
        { label: "4×6 (3.5 × 5.5\" actual)", value: "4x6" },
        { label: "6×6 (5.5 × 5.5\" actual)", value: "6x6" },
      ],
    },
    {
      id: "length",
      label: "Board length",
      type: "select",
      defaultImperial: 8,
      options: [
        { label: "8 ft", value: 8 },
        { label: "10 ft", value: 10 },
        { label: "12 ft", value: 12 },
        { label: "14 ft", value: 14 },
        { label: "16 ft", value: 16 },
        { label: "20 ft", value: 20 },
      ],
    },
    {
      id: "quantity",
      label: "Number of boards",
      type: "number",
      defaultImperial: 50,
      min: 1,
      step: 1,
      help: "How many of this size/length",
    },
    {
      id: "waste",
      label: "Waste factor",
      type: "select",
      defaultImperial: 10,
      options: [
        { label: "0% (exact count)", value: 0 },
        { label: "5%", value: 5 },
        { label: "10%", value: 10 },
        { label: "15%", value: 15 },
      ],
    },
  ],

  calculate: (values) => {
    const nominalSize = String(values.nominalSize || "2x4");
    const length = Number(values.length) || 8;
    const quantity = Number(values.quantity) || 1;
    const waste = Number(values.waste) || 10;

    // Nominal dimensions in inches (for board foot calculation)
    const nominalMap: Record<string, { t: number; w: number }> = {
      "1x4": { t: 1, w: 4 },
      "1x6": { t: 1, w: 6 },
      "1x8": { t: 1, w: 8 },
      "1x12": { t: 1, w: 12 },
      "2x2": { t: 2, w: 2 },
      "2x4": { t: 2, w: 4 },
      "2x6": { t: 2, w: 6 },
      "2x8": { t: 2, w: 8 },
      "2x10": { t: 2, w: 10 },
      "2x12": { t: 2, w: 12 },
      "4x4": { t: 4, w: 4 },
      "4x6": { t: 4, w: 6 },
      "6x6": { t: 6, w: 6 },
    };
    const dims = nominalMap[nominalSize] || nominalMap["2x4"];

    // Board feet formula: (thickness × width × length in feet) / 12
    // 1 board foot = 1" thick × 12" wide × 1 ft long = 144 cubic inches
    const boardFeetPerBoard = (dims.t * dims.w * length) / 12;
    const totalBoardFeet = boardFeetPerBoard * quantity;
    const totalLineal = length * quantity;

    const quantityWithWaste = Math.ceil(quantity * (1 + waste / 100));
    const boardFeetWithWaste = boardFeetPerBoard * quantityWithWaste;

    return {
      value: quantityWithWaste,
      unit: quantityWithWaste === 1 ? "board" : "boards",
      valueRounded: quantityWithWaste,
      breakdown: [
        { label: "size", value: `${nominalSize} × ${length}'` },
        { label: "board ft per piece", value: `${formatNumber(round(boardFeetPerBoard, 2))} bf` },
        { label: "total board ft", value: `${formatNumber(round(boardFeetWithWaste, 1))} bf` },
        { label: "lineal ft", value: `${quantityWithWaste * length}'` },
      ],
      formulaSteps: [
        `board size = ${dims.t}" × ${dims.w}" nominal, length = ${length} ft`,
        `board feet per board = (${dims.t} × ${dims.w} × ${length}) ÷ 12 = ${formatNumber(round(boardFeetPerBoard, 3))} bf`,
        `quantity requested = ${quantity}`,
        waste > 0
          ? `with ${waste}% waste = ⌈${quantity} × ${(1 + waste / 100).toFixed(2)}⌉ = ${quantityWithWaste}`
          : `no waste factor applied = ${quantityWithWaste}`,
        `total board feet = ${formatNumber(round(boardFeetPerBoard, 3))} × ${quantityWithWaste} = ${formatNumber(round(boardFeetWithWaste, 2))} bf`,
        `total lineal feet = ${quantityWithWaste} × ${length} = ${quantityWithWaste * length} ft`,
      ],
    };
  },

  formulaDescription:
    "board feet = (thickness × width × length_ft) ÷ 12, per board × quantity with waste",

  methodology: [
    "Board feet is the standard unit for lumber volume in North America. One board foot equals a piece 1 inch thick, 12 inches wide, and 1 foot long — or 144 cubic inches of wood. The formula is (nominal thickness × nominal width × length in feet) divided by 12.",
    "Note the 'nominal' in that formula. A 2×4 is actually 1.5 × 3.5 inches after milling, but board-foot calculations use the nominal dimensions (2 × 4) to keep things consistent across rough and dressed lumber. This is how lumber has been sold for over a century.",
    "Lineal feet is the simpler measurement — total length of lumber regardless of cross-section. A 2×4 at 8 feet long is 8 lineal feet. A 2×12 at 8 feet long is also 8 lineal feet. But the 2×12 is 6 board feet versus the 2×4's 5.33 board feet, so the 2×12 costs roughly 12× more per lineal foot.",
    "Waste factor for framing and construction lumber: 0% if you're ordering to a precise pre-calculated list, 10% for typical projects where you're cutting stock to fit. 15% for projects with complex angles or repeated short cuts that leave lots of unusable scrap. Always round up to whole boards — a 10% buffer on 50 boards is 55, not 55.0.",
    "Pricing: lumber yards quote in different units. Big-box retailers usually price per piece (\"$5.47 each\"). Wholesale lumber yards quote per 1,000 board feet (\"$850 MBF\"). Convert between them: price per piece ÷ board feet per piece = price per board foot. Multiply by 1,000 for MBF.",
  ],

  sources: [
    {
      name: "American Lumber Standards Committee",
      url: "https://www.alsc.org/",
      note: "Nominal vs actual dimension standards",
    },
    {
      name: "Western Wood Products Association — Board Foot Reference",
      url: "https://www.wwpa.org/",
      note: "Industry reference for board foot calculation",
    },
  ],

  related: [
    { name: "Deck calculator", slug: "deck-calculator", description: "Boards and joists for any deck" },
    { name: "Fence calculator", slug: "fence-calculator", description: "Posts, rails, and pickets" },
    { name: "Drywall calculator", slug: "drywall-calculator", description: "Sheets for walls and ceilings" },
    { name: "Stair calculator", slug: "stair-calculator", description: "Stringers, treads, and risers" },
  ],

  faq: [
    {
      question: "What is a board foot?",
      answer:
        "One board foot equals a piece of lumber 1 inch thick, 12 inches wide, and 1 foot long. That's 144 cubic inches of wood. Board feet is the standard way to measure and sell lumber volume in the US and Canada — it accounts for cross-section (thickness × width) and length together.",
    },
    {
      question: "Why is a 2×4 not actually 2 by 4 inches?",
      answer:
        "The '2×4' is the nominal (rough) dimension before milling. When lumber is dried and planed smooth, it loses about 1/2 inch from thickness and width. Finished: 1.5 × 3.5 inches. This has been the industry standard since the 1920s. Board-foot math still uses nominal dimensions for consistency.",
    },
    {
      question: "How do I convert lineal feet to board feet?",
      answer:
        "Multiply lineal feet by nominal thickness and width, divide by 12. For a 2×6: lineal × 2 × 6 ÷ 12 = lineal × 1. So 10 lineal feet of 2×6 = 10 board feet. For 1×4: lineal × 1 × 4 ÷ 12 = lineal × 0.33. So 10 lineal feet of 1×4 = 3.33 board feet.",
    },
    {
      question: "How much lumber do I need for a deck?",
      answer:
        "For deck materials specifically, use the deck calculator — it factors in decking boards, joists, beams, posts, and fasteners. The lumber calculator here is for general framing or when you need to compute board feet for cost comparison or bulk ordering.",
    },
    {
      question: "What's the difference between cheap and premium lumber?",
      answer:
        "Grade. Cheap lumber ('stud grade' or 'no. 2') has knots, slight warping, and visible wane. Premium lumber ('select structural' or 'no. 1') has fewer defects and is straighter. Cost difference is 30-100%. For hidden framing, stud grade is fine. For exposed work (furniture, trim), premium is worth it.",
    },
    {
      question: "How much does lumber cost?",
      answer:
        "Extremely volatile in recent years. Roughly: 8-foot 2×4 stud grade SPF = $4-8; 16-foot 2×10 = $25-45; 8-foot 4×4 pressure-treated = $15-25. Pressure-treated costs 50-100% more than untreated. Prices swing 30-50% seasonally and with housing market cycles.",
    },
    {
      question: "Should I buy pressure-treated or regular lumber?",
      answer:
        "Pressure-treated (PT) for anything in contact with ground, concrete, or outdoors without protection: fence posts, deck framing, ledger boards, sill plates. Regular lumber for interior framing, visible deck boards (can use PT but it splits and warps more), and furniture. Cedar and redwood are rot-resistant naturally but cost 2-3× more than PT.",
    },
    {
      question: "What are MBF and M in lumber pricing?",
      answer:
        "MBF = thousand board feet (Roman M = 1,000). Lumber wholesale is quoted per MBF: '$850/MBF' means $0.85 per board foot. A single 2×4×8' board is 5.33 bf, so at $850/MBF it's $4.53 per piece. Retail stores usually quote per piece directly; wholesale and contractor pricing use MBF.",
    },
  ],
};
