import { FlooringCalculatorExpansion } from "@/content/flooring-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const flooringCalculatorConfig: CalculatorConfig = {
  slug: "flooring-calculator",
  title: "Flooring Calculator",
  description:
    "Square footage and box count for hardwood, laminate, or vinyl plank. Accounts for the industry-standard 10% waste and pattern cuts.",
  categoryLabel: "Flooring",
  category: "flooring",

  bannerHeadline: "Floor cleanly.",
  bannerTags: ["Hardwood · laminate · vinyl", "Boxes rounded up", "ft² or m²"],

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
      id: "flooringType",
      label: "Flooring type",
      type: "select",
      defaultImperial: "laminate",
      options: [
        { label: "Hardwood (solid)", value: "hardwood" },
        { label: "Engineered hardwood", value: "engineered" },
        { label: "Laminate", value: "laminate" },
        { label: "Luxury vinyl plank (LVP)", value: "lvp" },
      ],
    },
    {
      id: "sqFtPerBox",
      label: "Square feet per box",
      type: "number",
      unitImperial: "ft²",
      unitMetric: "m²",
      defaultImperial: 20,
      defaultMetric: 1.85,
      min: 5,
      step: 1,
      help: "Check the box label — typical: 18-24 ft² (laminate), 20-30 ft² (hardwood)",
    },
    {
      id: "pattern",
      label: "Layout pattern",
      type: "select",
      defaultImperial: "staggered",
      options: [
        { label: "Staggered (standard)", value: "staggered" },
        { label: "Diagonal", value: "diagonal" },
        { label: "Herringbone", value: "herringbone" },
      ],
    },
  ],

  calculate: (values, units) => {
    const L = Number(values.length) || 0;
    const W = Number(values.width) || 0;
    const flooringType = String(values.flooringType || "laminate");
    const sqFtPerBoxInput = Number(values.sqFtPerBox) || 20;
    const pattern = String(values.pattern || "staggered");

    const area = L * W;
    const areaSqFt = units === "metric" ? area * 10.764 : area;

    // Waste factor by pattern
    const wastePct =
      pattern === "herringbone" ? 20 : pattern === "diagonal" ? 15 : 10;

    // Apply type-specific extras
    // Solid hardwood might include a rip for edge boards (~2% extra)
    const typeWasteBonus = flooringType === "hardwood" ? 2 : 0;
    const totalWaste = wastePct + typeWasteBonus;

    const areaWithWaste = areaSqFt * (1 + totalWaste / 100);

    // Convert sqFtPerBox if metric (input in m² needs conversion to ft²)
    const sqFtPerBox =
      units === "metric" ? sqFtPerBoxInput * 10.764 : sqFtPerBoxInput;

    const boxesNeeded = Math.ceil(areaWithWaste / sqFtPerBox);

    const displayArea = units === "metric" ? area : areaSqFt;
    const displayAreaWithWaste =
      units === "metric" ? areaWithWaste / 10.764 : areaWithWaste;
    const areaUnit = units === "metric" ? "m²" : "ft²";

    return {
      value: boxesNeeded,
      unit: boxesNeeded === 1 ? "box" : "boxes",
      valueRounded: boxesNeeded,
      breakdown: [
        { label: "area", value: `${formatNumber(round(displayArea, 1))} ${areaUnit}` },
        {
          label: "with waste",
          value: `${formatNumber(round(displayAreaWithWaste, 1))} ${areaUnit}`,
        },
        { label: "per box", value: `${formatNumber(sqFtPerBoxInput, 1)} ${areaUnit}` },
        { label: "pattern", value: `${pattern} (${totalWaste}%)` },
      ],
      formulaSteps: [
        `area = ${L} × ${W} = ${formatNumber(round(areaSqFt, 1))} ft²${units === "metric" ? ` (${formatNumber(round(area, 2))} m²)` : ""}`,
        `pattern waste = ${wastePct}%${typeWasteBonus > 0 ? ` + ${typeWasteBonus}% for ${flooringType}` : ""} = ${totalWaste}%`,
        `with waste = ${formatNumber(round(areaSqFt, 1))} × ${(1 + totalWaste / 100).toFixed(2)} = ${formatNumber(round(areaWithWaste, 1))} ft²`,
        `per box = ${sqFtPerBoxInput} ${units === "metric" ? "m²" : "ft²"}${units === "metric" ? ` (${formatNumber(round(sqFtPerBox, 1))} ft²)` : ""}`,
        `boxes = ⌈${formatNumber(round(areaWithWaste, 1))} ÷ ${formatNumber(round(sqFtPerBox, 1))}⌉ = ${boxesNeeded} boxes`,
      ],
      composition: {
        unit: areaUnit,
        total: round(displayAreaWithWaste, 1),
        segments: [
          {
            label: "Coverage",
            amount: round(displayArea, 1),
            shade: "primary",
          },
          {
            label: "Waste",
            amount: round(displayAreaWithWaste - displayArea, 1),
            shade: "secondary",
          },
        ],
      },
    };
  },

  ContentExpansion: FlooringCalculatorExpansion,

  formulaDescription:
    "boxes = ⌈(area × (1 + waste)) ÷ sq ft per box⌉",

  methodology: [
    "The calculator starts with floor area (length × width) and multiplies by a waste factor determined by the installation pattern. Straight staggered layouts (standard) use 10% waste. Diagonal layouts (boards at 45 degrees) require extra cuts at every perimeter, pushing waste to 15%. Herringbone patterns double the cuts and push waste to 20%.",
    "Solid hardwood gets an additional 2% bonus because the first and last rows typically require ripping boards to fit, leaving narrow scraps that rarely get reused. Engineered hardwood, laminate, and LVP have more flexible installation that handles rips efficiently.",
    "Box size varies significantly by product — always check the label. Typical ranges: solid hardwood 20-30 sq ft/box, engineered 25-30 sq ft/box, laminate 18-22 sq ft/box, luxury vinyl plank 22-30 sq ft/box. Narrower boards pack fewer square feet; thicker boards pack fewer as well.",
    "Box count rounds up to the next whole box because you can't buy a partial box. For larger projects, buy one extra box beyond the calculator's result to keep as an attic spare — flooring patterns and dye lots get discontinued, and matching 5 years later is impossible.",
    "The calculator assumes a rectangular room. For L-shaped or irregular rooms, divide into rectangles, calculate each separately, and sum the box counts. For rooms with closets, calculate the main area plus each closet separately rather than subtracting closet area from a single rectangle (avoids negative waste math).",
    "Not included: underlayment (most floating floors need an acoustic underlayment beneath them — typical roll covers 100 sq ft), transition strips (one per doorway, approximately $20-40 each), and reducer strips or thresholds where the new floor meets a different flooring surface.",
  ],

  sources: [
    {
      name: "National Wood Flooring Association (NWFA)",
      url: "https://www.nwfa.org/",
      note: "Industry standards for hardwood installation waste",
    },
    {
      name: "Armstrong — Vinyl Flooring Installation Guide",
      url: "https://www.armstrongflooring.com/",
      note: "Reference for waste by pattern and coverage",
    },
  ],

  related: [
    { name: "Tile calculator", slug: "tile-calculator", description: "Tiles and boxes for kitchens and baths" },
    { name: "Grout calculator", slug: "grout-calculator", description: "For tiled transitions" },
    { name: "Paint calculator", slug: "paint-calculator", description: "Gallons of paint for any room" },
    { name: "Insulation calculator", slug: "insulation-calculator", description: "For underfloor insulation" },
  ],

  faq: [
    {
      question: "How much flooring do I need for a 12×14 room?",
      answer:
        "For a 12×14 ft room (168 sq ft) with standard 10% waste and laminate boxes of 20 sq ft each, you need 10 boxes (184 sq ft of flooring). Larger waste factors or bigger boxes change the count — use the calculator with your specific product specs.",
    },
    {
      question: "Why is the waste factor so high?",
      answer:
        "Two reasons: pattern cuts and installation reality. Every board needs to be cut to length at the end of each row, leaving scrap that often isn't reusable. In diagonal and herringbone patterns, every perimeter piece requires an angled cut, producing even more scrap. 10% waste is the absolute minimum; 15%+ is safer for complex spaces.",
    },
    {
      question: "Can I use less than 10% waste?",
      answer:
        "Only for very simple rectangular rooms with minimal cuts. Even then, 8% is the floor. Going below risks coming up short mid-install — and since dye lots are batch-specific, additional flooring purchased later may not match your existing stock.",
    },
    {
      question: "Do I need underlayment?",
      answer:
        "Laminate and luxury vinyl plank: yes — an acoustic underlayment (2-4mm foam) is usually required by the manufacturer warranty. Engineered hardwood floating installations: yes, same reason. Solid hardwood nailed down: no, but rosin paper or felt is common. Check your specific product's install guide.",
    },
    {
      question: "What about transition strips and moldings?",
      answer:
        "Not in this calculator. Budget about $100-300 in trim materials for a typical room: baseboards or quarter round around the perimeter (linear feet of perimeter ÷ 8-foot lengths), plus a transition strip at every doorway. T-molding for same-height transitions, reducers for stepping down, and thresholds at entry doors.",
    },
    {
      question: "Should I buy from the same dye lot?",
      answer:
        "Critical for hardwood and engineered hardwood — the color and grain variation between dye lots is visible. Buy all your flooring at once from the same lot. Laminate and LVP are less variable but still worth matching lots when possible. Keep the SKU and lot number written on the back of one installed board for future reference.",
    },
    {
      question: "How accurate is 'per box' from the product spec?",
      answer:
        "Manufacturer listings are accurate to the square foot. Always check the specific product — hardwood boxes vary from 15 to 35 sq ft depending on board width and length. Narrower, longer boards pack less per box; wider, shorter boards pack more.",
    },
    {
      question: "Can I acclimate the flooring in boxes?",
      answer:
        "Hardwood and engineered: yes — 3-7 days in the installation space before laying, with the boxes open for air circulation. Laminate: 48 hours typically. LVP: often no acclimation needed. Skipping acclimation causes gaps or buckling as the floor expands or contracts after install.",
    },
  ],
};
