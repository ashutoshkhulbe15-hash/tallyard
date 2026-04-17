import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const rebarCalculatorConfig: CalculatorConfig = {
  slug: "rebar-calculator",
  title: "Rebar Calculator",
  description:
    "Rebar lineal feet and pieces for any concrete slab. Standard grid spacing, with overlap for continuous runs.",
  categoryLabel: "Masonry",
  category: "concrete",

  bannerHeadline: "Reinforce strongly.",
  bannerTags: ["Grid layout", "Overlap included", "lineal ft or m"],

  inputs: [
    {
      id: "length",
      label: "Slab length",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 20,
      defaultMetric: 6,
      min: 2,
      step: 0.5,
    },
    {
      id: "width",
      label: "Slab width",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 12,
      defaultMetric: 3.7,
      min: 2,
      step: 0.5,
    },
    {
      id: "spacing",
      label: "Grid spacing",
      type: "select",
      defaultImperial: 12,
      options: [
        { label: '12" / 30 cm (heavy)', value: 12 },
        { label: '16" / 40 cm (standard)', value: 16 },
        { label: '18" / 45 cm', value: 18 },
        { label: '24" / 60 cm (light)', value: 24 },
      ],
      help: "12\" for driveways, 16\" for patios, 18-24\" for walkways and light slabs",
    },
    {
      id: "barSize",
      label: "Bar size",
      type: "select",
      defaultImperial: "#4",
      options: [
        { label: "#3 (3/8\" / 10 mm)", value: "#3" },
        { label: "#4 (1/2\" / 13 mm) standard", value: "#4" },
        { label: "#5 (5/8\" / 16 mm)", value: "#5" },
        { label: "#6 (3/4\" / 19 mm)", value: "#6" },
      ],
    },
    {
      id: "includePerimeter",
      label: "Include perimeter ring",
      type: "select",
      defaultImperial: "yes",
      options: [
        { label: "Yes (edge rebar ring)", value: "yes" },
        { label: "No (grid only)", value: "no" },
      ],
    },
  ],

  calculate: (values, units) => {
    const L = Number(values.length) || 0;
    const W = Number(values.width) || 0;
    const spacingIn = Number(values.spacing) || 16;
    const barSize = String(values.barSize || "#4");
    const includePerimeter = String(values.includePerimeter || "yes") === "yes";

    // Convert to feet if metric
    const lengthFt = units === "metric" ? L * 3.281 : L;
    const widthFt = units === "metric" ? W * 3.281 : W;
    const spacingFt =
      units === "metric" ? (spacingIn * 0.4) / 12 : spacingIn / 12;

    // Longitudinal bars (run along length) — count = width / spacing + 1
    const longBars = Math.ceil(widthFt / spacingFt) + 1;
    const longLengthEach = lengthFt;
    // Rebar comes in 20 ft lengths typically; for bars longer than 20', need overlap
    // Overlap = 40 × bar diameter, but for simplicity we use 1.5 ft overlap per joint
    const overlapPerJoint = 1.5;

    const longBarJoints =
      longLengthEach > 20 ? Math.ceil(longLengthEach / 20) - 1 : 0;
    const longTotalLengthEach =
      longLengthEach + longBarJoints * overlapPerJoint;
    const longTotalLength = longBars * longTotalLengthEach;

    // Transverse bars (run along width)
    const transBars = Math.ceil(lengthFt / spacingFt) + 1;
    const transLengthEach = widthFt;
    const transBarJoints =
      transLengthEach > 20 ? Math.ceil(transLengthEach / 20) - 1 : 0;
    const transTotalLengthEach =
      transLengthEach + transBarJoints * overlapPerJoint;
    const transTotalLength = transBars * transTotalLengthEach;

    // Perimeter ring: 2 × (length + width) if included
    const perimeterLength = includePerimeter ? 2 * (lengthFt + widthFt) : 0;

    // Grand total
    const totalLinealFt =
      longTotalLength + transTotalLength + perimeterLength;

    // 20-ft sticks needed
    const sticksNeeded = Math.ceil(totalLinealFt / 20);

    // Weight: approximate lb per linear foot by bar size
    const weightPerFt: Record<string, number> = {
      "#3": 0.376,
      "#4": 0.668,
      "#5": 1.043,
      "#6": 1.502,
    };
    const totalWeight = totalLinealFt * (weightPerFt[barSize] || 0.668);

    const displayLength =
      units === "metric" ? totalLinealFt * 0.3048 : totalLinealFt;
    const lengthUnit = units === "metric" ? "m" : "ft";
    const weightUnit = units === "metric" ? "kg" : "lb";
    const displayWeight =
      units === "metric" ? totalWeight * 0.4536 : totalWeight;

    return {
      value: Math.round(displayLength),
      unit: `lineal ${lengthUnit}`,
      valueRounded: Math.round(displayLength),
      breakdown: [
        { label: "longitudinal bars", value: `${longBars} × ${formatNumber(round(longTotalLengthEach, 1))} ft` },
        { label: "transverse bars", value: `${transBars} × ${formatNumber(round(transTotalLengthEach, 1))} ft` },
        ...(includePerimeter
          ? [{ label: "perimeter", value: `${formatNumber(round(perimeterLength, 1))} ft` }]
          : []),
        { label: "20-ft sticks", value: `${sticksNeeded}` },
        { label: "weight", value: `~${formatNumber(round(displayWeight, 0))} ${weightUnit}` },
      ],
      formulaSteps: [
        `slab = ${lengthFt.toFixed(1)} × ${widthFt.toFixed(1)} ft, spacing = ${spacingIn}"${units === "metric" ? ` (${round(spacingIn * 0.4, 1)} cm)` : ""}`,
        `longitudinal bars = ⌈${widthFt.toFixed(1)} ÷ ${round(spacingFt, 2)}⌉ + 1 = ${longBars} bars`,
        `longitudinal length = ${longBars} × ${formatNumber(round(longTotalLengthEach, 1))} ft = ${formatNumber(round(longTotalLength, 1))} ft`,
        `transverse bars = ⌈${lengthFt.toFixed(1)} ÷ ${round(spacingFt, 2)}⌉ + 1 = ${transBars} bars`,
        `transverse length = ${transBars} × ${formatNumber(round(transTotalLengthEach, 1))} ft = ${formatNumber(round(transTotalLength, 1))} ft`,
        includePerimeter
          ? `perimeter = 2 × (${lengthFt.toFixed(1)} + ${widthFt.toFixed(1)}) = ${formatNumber(round(perimeterLength, 1))} ft`
          : "perimeter = 0 (grid only)",
        `total = ${formatNumber(round(totalLinealFt, 1))} ft${units === "metric" ? ` (${formatNumber(round(displayLength, 1))} m)` : ""}`,
        `20-ft sticks = ⌈${formatNumber(round(totalLinealFt, 1))} ÷ 20⌉ = ${sticksNeeded} sticks`,
        `weight = ${formatNumber(round(totalLinealFt, 1))} × ${weightPerFt[barSize]} lb/ft = ${formatNumber(round(totalWeight, 0))} lb`,
      ],
    };
  },

  formulaDescription:
    "bars = ⌈dimension ÷ spacing⌉ + 1 per direction; total = (long × long length) + (trans × trans length) + perimeter",

  methodology: [
    "The calculator assumes a grid layout — rebar running both directions at the specified on-center spacing, creating a mesh that reinforces concrete against tension forces. Longitudinal bars run along the length of the slab; transverse bars run across the width. Bar count in each direction is the slab dimension divided by spacing, plus one for the closing bar at the far edge.",
    "For slabs longer than 20 feet (the standard rebar stick length), bars must be overlapped where joined. The calculator adds 1.5 feet of overlap per joint. The technically correct overlap is 40 × bar diameter (which is 20 inches for #4 rebar, 25 inches for #5), but 1.5 feet is a safe simplification covering most cases.",
    "Perimeter ring: an additional rebar loop around the edge of the slab, tied to the grid. Recommended for driveways and structural slabs, optional for simple patios. The ring strengthens edges which tend to crack first. Skip it for shallow decorative slabs.",
    "Bar size selection: #4 (1/2 inch diameter) is the residential default for 4-inch slabs. #3 (3/8\") is used in lighter applications like walkways. #5 (5/8\") and #6 (3/4\") are for structural slabs, retaining walls, and any pour over 6 inches thick. Larger bars don't just add strength — they add significant weight and cost.",
    "Weight is calculated from standard lb-per-linear-foot values. This matters for ordering: steel is typically sold by weight. A full 20-foot stick of #4 rebar weighs 13.4 lb. A large slab might need 300-500+ pounds of rebar, enough to require multiple truck trips or careful loading.",
    "Not included: chairs or dobie blocks (used to hold rebar up from the subgrade to the middle of the slab depth — one every 4 feet is typical), tie wire (for fastening bars at intersections, about 1 lb per 200 feet of rebar), saddles/corners for turn connections. Budget those separately.",
  ],

  sources: [
    {
      name: "CRSI — Concrete Reinforcing Steel Institute",
      url: "https://www.crsi.org/",
      note: "Standard sizes, weights, and spacing recommendations",
    },
    {
      name: "ACI 318 — Building Code Requirements for Structural Concrete",
      url: "https://www.concrete.org/",
      note: "Reference for overlap and spacing requirements",
    },
  ],

  related: [
    { name: "Concrete calculator", slug: "concrete-calculator", description: "Cubic yards for slabs and footings" },
    { name: "Gravel calculator", slug: "gravel-calculator", description: "Base gravel under slabs" },
    { name: "Paver calculator", slug: "paver-calculator", description: "Patio pavers and base" },
    { name: "Lumber calculator", slug: "lumber-calculator", description: "Board feet for forms" },
  ],

  faq: [
    {
      question: "What size rebar do I need for a 4-inch slab?",
      answer:
        "#4 rebar (1/2 inch diameter) at 16-inch spacing is the standard for a 4-inch residential slab (patio, driveway, garage floor). For heavier use (commercial or truck-loaded driveways), go to 12\" spacing or #5 bar. Sidewalks can use #3 at 18\" spacing for light residential.",
    },
    {
      question: "Do I actually need rebar in a slab?",
      answer:
        "For thin decorative slabs under 3 inches: no, wire mesh is sufficient. For 4\"+ slabs that bear any load: yes — rebar is cheap insurance against cracks. For anything over 6 inches or bearing vehicles: always. The cost difference ($50-150 for a typical slab) is trivial vs. the cost of cracking and replacing.",
    },
    {
      question: "What's the spacing for a driveway?",
      answer:
        "12-inch grid minimum for passenger car driveways; 16\" for a simple residential path. Use #4 bar. For driveways bearing trucks or RVs, 12\" spacing with #5 bar is advisable. In freeze-thaw regions, add extra bars near the edges where frost heave concentrates.",
    },
    {
      question: "How much overlap between rebar sticks?",
      answer:
        "The code minimum is 40 times the bar diameter. For #4 (1/2\" bar): 20 inches minimum overlap. For #5 (5/8\" bar): 25 inches. The calculator uses 1.5 feet (18\") for simplicity, which is conservative for #3 and just over the minimum for #4. Tie the overlap with wire at 2-3 points.",
    },
    {
      question: "What's a perimeter ring?",
      answer:
        "An additional bar loop running around the outside edge of the slab, tied to the grid. Slab edges are the weak spot where frost heave, tree roots, and vehicle loads concentrate stress. A perimeter ring strengthens that edge. Recommended for driveways; optional for light-duty patios.",
    },
    {
      question: "Can I use wire mesh instead?",
      answer:
        "Welded wire mesh (WWF) is an alternative for thin slabs up to 4 inches. Pro: easier to install (roll it out). Con: harder to position at mid-slab depth (tends to sink to the bottom during the pour, providing minimal structural value). For any slab you care about, stick to rebar on chairs.",
    },
    {
      question: "What position in the slab should rebar sit?",
      answer:
        "Middle-to-upper third of the slab thickness. For a 4-inch slab, the rebar grid should sit 1.5-2 inches from the top. Use dobie blocks or chairs to hold the rebar at this height — never let it sit on the ground, where it provides no structural benefit and may rust out from below.",
    },
    {
      question: "How much does rebar weigh?",
      answer:
        "Per linear foot: #3 = 0.376 lb, #4 = 0.668 lb, #5 = 1.043 lb, #6 = 1.502 lb. A typical 20-foot stick of #4 weighs 13.4 lb. A slab with 500 feet of rebar weighs 334 lb. The calculator shows the total weight — check if your vehicle can carry it.",
    },
  ],
};
