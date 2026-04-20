import { BrickCalculatorExpansion } from "@/content/brick-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const brickCalculatorConfig: CalculatorConfig = {
  slug: "brick-calculator",
  title: "Brick Calculator",
  description:
    "Bricks and mortar bags for any wall or project. Accounts for brick size, mortar joint width, and typical 10% cut waste.",
  categoryLabel: "Masonry",
  category: "concrete",

  bannerHeadline: "Build sturdy.",
  bannerTags: ["Bricks + mortar", "All common sizes", "Cuts and waste"],

  inputs: [
    {
      id: "length",
      label: "Wall length",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 20,
      defaultMetric: 6,
      min: 1,
      step: 0.5,
    },
    {
      id: "height",
      label: "Wall height",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 8,
      defaultMetric: 2.4,
      min: 1,
      step: 0.5,
    },
    {
      id: "brickType",
      label: "Brick size",
      type: "select",
      defaultImperial: "modular",
      options: [
        { label: 'Modular (3.625 × 2.25 × 7.625")', value: "modular" },
        { label: 'Standard (3.625 × 2.25 × 8")', value: "standard" },
        { label: 'Queen (3.125 × 2.75 × 9.625")', value: "queen" },
        { label: 'Jumbo (3.625 × 2.75 × 8")', value: "jumbo" },
      ],
    },
    {
      id: "jointWidth",
      label: "Mortar joint width",
      type: "select",
      defaultImperial: 0.375,
      options: [
        { label: '3/8" / 10 mm (standard)', value: 0.375 },
        { label: '1/2" / 13 mm (wide)', value: 0.5 },
        { label: '1/4" / 6 mm (narrow)', value: 0.25 },
      ],
    },
    {
      id: "thickness",
      label: "Wall thickness",
      type: "select",
      defaultImperial: "single",
      options: [
        { label: "Single wythe (veneer)", value: "single" },
        { label: "Double wythe (structural)", value: "double" },
      ],
      help: "Most modern brick is single-wythe veneer on a framed wall",
    },
    {
      id: "waste",
      label: "Waste factor",
      type: "select",
      defaultImperial: 10,
      options: [
        { label: "5%", value: 5 },
        { label: "10%", value: 10 },
        { label: "15%", value: 15 },
      ],
    },
  ],

  calculate: (values, units) => {
    const L = Number(values.length) || 0;
    const H = Number(values.height) || 0;
    const brickType = String(values.brickType || "modular");
    const jointWidth = Number(values.jointWidth) || 0.375;
    const thickness = String(values.thickness || "single");
    const waste = Number(values.waste) || 10;

    // Brick dimensions in inches (height × length)
    const brickMap: Record<string, { h: number; l: number; perSqFt: number }> = {
      modular: { h: 2.25, l: 7.625, perSqFt: 6.86 },
      standard: { h: 2.25, l: 8, perSqFt: 6.55 },
      queen: { h: 2.75, l: 9.625, perSqFt: 4.71 },
      jumbo: { h: 2.75, l: 8, perSqFt: 5.49 },
    };
    const brick = brickMap[brickType] || brickMap["modular"];

    // Adjust bricks per sq ft based on joint width
    // Standard table values assume 3/8" joints. Wider joints = fewer bricks per sq ft.
    // Formula: bricks per sqft = 144 / ((brick.l + joint) × (brick.h + joint))
    const bricksPerSqFtWithJoint =
      144 / ((brick.l + jointWidth) * (brick.h + jointWidth));

    // Wall area
    const area = L * H;
    const areaSqFt = units === "metric" ? area * 10.764 : area;

    // Wythe multiplier
    const wytheMultiplier = thickness === "double" ? 2 : 1;

    // Raw brick count
    const rawBricks = areaSqFt * bricksPerSqFtWithJoint * wytheMultiplier;
    const bricksNeeded = Math.ceil(rawBricks * (1 + waste / 100));

    // Mortar: approximately 1 cubic foot per 30 bricks for 3/8" joints
    // Adjusts with joint width
    const mortarFactor = 0.375 / jointWidth; // bricks per cubic foot at different joint widths
    const mortarBricksPerCuFt = 30 * mortarFactor;
    const mortarCuFt = bricksNeeded / mortarBricksPerCuFt;
    // A standard 80-lb bag of mortar yields about 0.75 cu ft
    const mortarBags = Math.ceil(mortarCuFt / 0.75);

    const areaUnit = units === "metric" ? "m²" : "ft²";
    const displayArea = units === "metric" ? area : areaSqFt;

    return {
      value: bricksNeeded,
      unit: bricksNeeded === 1 ? "brick" : "bricks",
      valueRounded: bricksNeeded,
      breakdown: [
        { label: "area", value: `${formatNumber(round(displayArea, 1))} ${areaUnit}` },
        { label: "wythe", value: thickness === "double" ? "double" : "single" },
        { label: "mortar bags (80 lb)", value: `${mortarBags}` },
        { label: "bricks per ft²", value: `${formatNumber(round(bricksPerSqFtWithJoint, 2))}` },
      ],
      formulaSteps: [
        `wall area = ${L} × ${H} = ${formatNumber(round(areaSqFt, 1))} ft²${units === "metric" ? ` (${formatNumber(round(area, 2))} m²)` : ""}`,
        `brick size = ${brick.l}" × ${brick.h}" (${brickType})`,
        `joint = ${jointWidth}"`,
        `bricks per ft² = 144 ÷ ((${brick.l} + ${jointWidth}) × (${brick.h} + ${jointWidth})) = ${formatNumber(round(bricksPerSqFtWithJoint, 2))}`,
        `wythe = ${thickness}, multiplier = ${wytheMultiplier}×`,
        `raw bricks = ${formatNumber(round(areaSqFt, 1))} × ${formatNumber(round(bricksPerSqFtWithJoint, 2))} × ${wytheMultiplier} = ${formatNumber(round(rawBricks, 0))}`,
        `with ${waste}% waste = ${bricksNeeded} bricks`,
        `mortar ≈ ${bricksNeeded} ÷ ${formatNumber(round(mortarBricksPerCuFt, 1))} bricks/ft³ = ${formatNumber(round(mortarCuFt, 1))} ft³`,
        `mortar bags (80 lb, ~0.75 ft³/bag) = ⌈${formatNumber(round(mortarCuFt, 1))} ÷ 0.75⌉ = ${mortarBags} bags`,
      ],
    };
  },

  ContentExpansion: BrickCalculatorExpansion,

  formulaDescription:
    "bricks = area × (144 ÷ ((brick L + joint) × (brick H + joint))) × wythe × (1 + waste)",

  methodology: [
    "Brick count is calculated from the wall area, the brick size, and the mortar joint width. The formula accounts for the effective area each brick covers (brick dimensions plus joint width on two sides). Smaller bricks mean more per square foot; wider joints reduce the count slightly because each brick covers more total area with the mortar included.",
    "Brick sizes vary by manufacturer and region. Modular brick (3.625 × 2.25 × 7.625 inches) is the US standard — 6.86 bricks per square foot with 3/8-inch joints. Standard brick is slightly longer (8 inches). Queen and jumbo are larger formats that reduce brick count and labor but cost more per brick.",
    "Wythe refers to the thickness of the wall in brick layers. Single-wythe (one brick thick) is used for modern veneer — the brick is decorative, with a framed wall behind providing structural support. Double-wythe (two bricks thick, bonded together) was common before 1960 and is still used for structural masonry, garden walls, and chimneys. Double-wythe uses twice as many bricks.",
    "Mortar calculation is approximate. A cubic foot of mortar typically sets about 30 bricks at 3/8\" joints. Wider joints use proportionally more mortar per brick. Standard 80-pound bags of pre-mixed mortar yield about 0.75 cubic feet each. The calculator adjusts the mortar estimate based on your joint width.",
    "Waste factor of 10% covers typical cuts at corners, around openings, and breakage during handling. Use 15% for complex masonry with many openings, arches, or decorative patterns; 5% for long straight walls with minimal cuts.",
    "Not included in this calculator: flashing, weep holes, wall ties (1 per 2.67 sq ft of veneer), expansion joints, lintels over openings, and cleaning materials. For structural walls, also factor in rebar (see rebar calculator) and grout for reinforced cells.",
  ],

  sources: [
    {
      name: "Brick Industry Association — Technical Notes",
      url: "https://www.gobrick.com/",
      note: "Standard brick sizes and wall design references",
    },
    {
      name: "Portland Cement Association — Masonry",
      url: "https://www.cement.org/",
      note: "Mortar coverage and joint width references",
    },
  ],

  related: [
    { name: "Concrete calculator", slug: "concrete-calculator", description: "For footings under brick walls" },
    { name: "Concrete calculator", slug: "concrete-calculator", description: "Cubic yards for footings and slabs" },
    { name: "Rebar calculator", slug: "rebar-calculator", description: "Reinforcement in brick walls" },
    { name: "Paint calculator", slug: "paint-calculator", description: "For painted brick" },
  ],

  faq: [
    {
      question: "How many bricks do I need for a 20×8 foot wall?",
      answer:
        "For a 20×8 ft single-wythe veneer wall using modular brick with 3/8\" joints and 10% waste, you need about 1,208 bricks plus 45 bags of mortar. Double-wythe structural walls need twice that. Use the calculator with your specific brick type.",
    },
    {
      question: "What's the difference between modular and standard brick?",
      answer:
        "Modular brick is 7.625\" long (designed so 4 bricks plus joints = 32\"). Standard brick is 8\" long. Modular is now the most common US brick; standard is older/regional. Both are 2.25\" high and 3.625\" deep. Modular gives you 6.86 bricks per sq ft; standard gives 6.55 per sq ft.",
    },
    {
      question: "How much mortar do I need?",
      answer:
        "Approximately 1 cubic foot of mortar per 30 bricks at 3/8\" joints. An 80-lb bag of pre-mixed mortar yields 0.75 cubic feet. For 1,000 bricks, plan on about 45 bags. Buy extra — running out mid-wall means joints that set before you can finish a course.",
    },
    {
      question: "Single-wythe or double-wythe — which do I need?",
      answer:
        "Single-wythe (brick veneer over frame or CMU) is standard for modern construction — the brick is decorative cladding, the structure is behind it. Double-wythe is for standalone structural walls: garden walls, chimneys, retaining walls, or older construction methods. Double-wythe uses twice the brick and twice the labor.",
    },
    {
      question: "What's the best mortar joint width?",
      answer:
        "3/8 inch is the US standard — sized to make brick coursing dimensions work out nicely. 1/2 inch is used for rougher bricks like handmade or reclaimed. 1/4 inch is used for thin brick veneer and tight modern styles. Wider joints look more traditional; narrower joints look more contemporary.",
    },
    {
      question: "How much do bricks cost?",
      answer:
        "Typical range: $0.50-1.50 per brick for standard face brick. Premium or handmade brick: $2-5 per brick. A 1,000-brick wall costs $500-5,000 in bricks alone. Plus mortar ($7-10 per 80-lb bag × 45 bags = $315-450). Plus labor if not DIY.",
    },
    {
      question: "Can I buy partial pallets of brick?",
      answer:
        "Usually yes at retail — home centers and masonry yards often sell by the piece or by bundle (500 bricks). Full pallets (typically 500-525 bricks) are cheaper per piece. For large orders, ordering by the pallet is 10-20% cheaper.",
    },
    {
      question: "How do I calculate bricks for a chimney or fireplace?",
      answer:
        "Calculate each wall surface separately: front, back, sides. For chimneys with flue liners, the inside wythe counts separately from the outside wythe. A typical residential chimney uses 800-1,500 bricks. For fireplaces, the firebox uses firebrick (different product, different refractory mortar) — calculate that separately.",
    },
  ],
};
