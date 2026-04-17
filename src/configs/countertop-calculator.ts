import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const countertopCalculatorConfig: CalculatorConfig = {
  slug: "countertop-calculator",
  title: "Countertop Calculator",
  description:
    "Square feet and linear feet of countertop for any kitchen or bath. Accounts for standard depth, waste, and edge treatments.",
  categoryLabel: "Flooring",
  category: "flooring",

  bannerHeadline: "Top cleanly.",
  bannerTags: ["Kitchen or bath", "ft² + linear ft", "Any depth"],

  inputs: [
    {
      id: "linearFt",
      label: "Counter linear feet",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 18,
      defaultMetric: 5.5,
      min: 1,
      step: 0.5,
      help: "Sum of all counter edges. Typical kitchen: 15-25 ft.",
    },
    {
      id: "depth",
      label: "Counter depth",
      type: "select",
      defaultImperial: 25.5,
      options: [
        { label: '22" (bath vanity)', value: 22 },
        { label: '25.5" (kitchen standard)', value: 25.5 },
        { label: '30" (deep kitchen)', value: 30 },
        { label: '42" (island with overhang)', value: 42 },
      ],
      help: "Kitchen: 25.5\". Bath: 22\". Deeper for islands.",
    },
    {
      id: "island",
      label: "Include island",
      type: "select",
      defaultImperial: "no",
      options: [
        { label: "No", value: "no" },
        { label: "Small (4×2 ft)", value: "small" },
        { label: "Medium (6×3 ft)", value: "medium" },
        { label: "Large (8×4 ft)", value: "large" },
      ],
    },
    {
      id: "material",
      label: "Material",
      type: "select",
      defaultImperial: "quartz",
      options: [
        { label: "Quartz (engineered)", value: "quartz" },
        { label: "Granite", value: "granite" },
        { label: "Marble", value: "marble" },
        { label: "Butcher block", value: "butcher" },
        { label: "Laminate", value: "laminate" },
        { label: "Concrete", value: "concrete" },
      ],
    },
    {
      id: "waste",
      label: "Waste factor",
      type: "select",
      defaultImperial: 10,
      options: [
        { label: "10% (standard)", value: 10 },
        { label: "15% (many cuts)", value: 15 },
        { label: "20% (complex layout)", value: 20 },
      ],
    },
  ],

  calculate: (values, units) => {
    const linearFtInput = Number(values.linearFt) || 0;
    const depthIn = Number(values.depth) || 25.5;
    const islandSize = String(values.island || "no");
    const material = String(values.material || "quartz");
    const waste = Number(values.waste) || 10;

    const linearFt = units === "metric" ? linearFtInput * 3.281 : linearFtInput;

    // Main counter area
    const mainArea = linearFt * (depthIn / 12);

    // Island additions
    const islandAreas: Record<string, { area: number; edges: number }> = {
      no: { area: 0, edges: 0 },
      small: { area: 8, edges: 12 },
      medium: { area: 18, edges: 18 },
      large: { area: 32, edges: 24 },
    };
    const island = islandAreas[islandSize] || islandAreas["no"];
    const islandArea = island.area;
    const islandLinearEdge = island.edges;

    // Total area
    const rawArea = mainArea + islandArea;
    const areaWithWaste = rawArea * (1 + waste / 100);

    // Total linear edge (for edge treatments, backsplash planning)
    // Main counter edge: linearFt (front) + depth/12 × 2 ends (if counters are rectangles)
    // Simplified: edge = linearFt (front) + islandLinearEdge (full perimeter)
    const totalLinearEdge = linearFt + islandLinearEdge;

    // Price range estimates (2025-2026 US installed)
    const priceMap: Record<string, { low: number; high: number }> = {
      quartz: { low: 60, high: 120 },
      granite: { low: 50, high: 120 },
      marble: { low: 80, high: 200 },
      butcher: { low: 40, high: 100 },
      laminate: { low: 20, high: 50 },
      concrete: { low: 75, high: 150 },
    };
    const price = priceMap[material] || priceMap["quartz"];
    const lowPrice = Math.round(areaWithWaste * price.low);
    const highPrice = Math.round(areaWithWaste * price.high);

    return {
      value: round(areaWithWaste, 1),
      unit: "ft²",
      valueRounded: Math.ceil(areaWithWaste),
      breakdown: [
        { label: "main counter", value: `${formatNumber(round(mainArea, 1))} ft²` },
        ...(islandArea > 0
          ? [{ label: "island", value: `${formatNumber(round(islandArea, 1))} ft²` }]
          : []),
        { label: "linear edge", value: `${formatNumber(round(totalLinearEdge, 1))} ft` },
        { label: "estimated cost", value: `$${lowPrice.toLocaleString()}–$${highPrice.toLocaleString()}` },
      ],
      formulaSteps: [
        `main area = ${formatNumber(round(linearFt, 1))} ft × ${depthIn}"/12 = ${formatNumber(round(mainArea, 1))} ft²`,
        islandArea > 0
          ? `island (${islandSize}) = ${islandArea} ft² with ${islandLinearEdge} ft edge`
          : "island: none",
        `raw area = ${formatNumber(round(mainArea, 1))} + ${islandArea} = ${formatNumber(round(rawArea, 1))} ft²`,
        `with ${waste}% waste = ${formatNumber(round(rawArea, 1))} × ${(1 + waste / 100).toFixed(2)} = ${formatNumber(round(areaWithWaste, 1))} ft²`,
        `linear edge = ${formatNumber(round(linearFt, 1))} (main front) + ${islandLinearEdge} (island) = ${formatNumber(round(totalLinearEdge, 1))} ft`,
        `${material} estimated cost: $${price.low}–$${price.high}/ft² × ${formatNumber(round(areaWithWaste, 1))} = $${lowPrice.toLocaleString()}–$${highPrice.toLocaleString()}`,
      ],
      composition: {
        unit: "ft²",
        total: round(areaWithWaste, 1),
        segments: [
          { label: "Main counter", amount: round(mainArea, 1), shade: "primary" },
          ...(islandArea > 0
            ? [{ label: "Island", amount: islandArea, shade: "secondary" as const }]
            : []),
          {
            label: "Waste buffer",
            amount: round(areaWithWaste - rawArea, 1),
            shade: "tertiary",
          },
        ],
      },
    };
  },

  formulaDescription:
    "area = (linear ft × depth) + island + waste; linear edge = main front + island perimeter",

  methodology: [
    "Kitchen counter area is linear feet (front edge) times depth. Standard kitchen counters are 25.5 inches deep — just under 2.125 linear feet. A 20-foot run of kitchen counter has 42.5 square feet of surface. Bathroom vanities use 22-inch depth typically.",
    "Islands are handled as separate pieces because they have different edge geometry. A small island (4 × 2 ft) adds 8 sq ft but has all four edges exposed — 12 linear feet of edge. Compare to a 4-ft wall counter section that adds 8.5 sq ft but only 4 linear feet of exposed front edge. Islands cost more per square foot installed because of the extra edge treatment.",
    "Linear edge matters for pricing — edge treatment (bullnose, ogee, eased, mitered) is typically priced per linear foot beyond the basic cut. A straight eased edge is often included; decorative edges cost $10-30 per linear foot extra. More exposed edge means more cost for fancy edges.",
    "Waste factor for countertops is lower than tile because countertops are cut from slabs. Quartz and granite slabs are typically 55 × 120 inches (2×3 yards). A good fabricator lays out cuts to minimize waste, but seams, edge grain matching (for veined stone), and cutout offcuts (for sinks, cooktops) all contribute. 10% is standard for simple kitchens; 15-20% for complex layouts with many cutouts and short runs.",
    "Price estimates are for installed countertops in 2025-2026 US market (per square foot): quartz $60-120 (engineered stone, low maintenance), granite $50-120 (natural stone, more variation), marble $80-200 (premium natural stone, stains), butcher block $40-100 (wood, requires oiling), laminate $20-50 (synthetic, most economical), concrete $75-150 (industrial look, custom). Prices vary regionally and with complexity.",
    "Not included: sink cutouts (typically free with the slab), faucet holes, edge treatment upgrades, underlayment (usually just plywood for stone slabs), backsplash (see backsplash calculator), and removal of existing counters. These can add $500-2,000 to a total kitchen installation.",
  ],

  sources: [
    {
      name: "NKBA — Kitchen Planning Guidelines",
      url: "https://www.nkba.org/",
      note: "Standard counter depths and layout references",
    },
    {
      name: "HomeAdvisor — Countertop Cost Guide",
      url: "https://www.homeadvisor.com/",
      note: "Price ranges by material for installed countertops",
    },
  ],

  related: [
    { name: "Backsplash calculator", slug: "backsplash-calculator", description: "Kitchen tile above counter" },
    { name: "Vanity calculator", slug: "vanity-calculator", description: "Size a bathroom vanity" },
    { name: "Tile calculator", slug: "tile-calculator", description: "Floor and wall tile" },
    { name: "Paint calculator", slug: "paint-calculator", description: "Kitchen and bath paint" },
  ],

  faq: [
    {
      question: "How many square feet of countertop for a typical kitchen?",
      answer:
        "A typical kitchen has 15-25 linear feet of counter at 25.5\" deep, which is 32-53 square feet of surface. Add an island: small adds 8 sq ft, medium 18, large 32. The calculator above handles any layout.",
    },
    {
      question: "How do I measure my kitchen counters?",
      answer:
        "Measure the front edge of each counter section in linear feet: the stove run, the sink run, any peninsula or island edge. Sum them. Don't double-count corners — an L-shaped kitchen with 8 ft along one wall and 6 ft along the other is 14 linear feet, not 15. The calculator needs this total linear figure.",
    },
    {
      question: "Why does the waste factor apply to countertops?",
      answer:
        "Countertops are cut from slabs. A 120 × 55 inch granite slab is 45.8 sq ft. Your counter layout rarely fits perfectly on a slab — some waste is inevitable around the sink cutout, the stove cutout, and seams between pieces. 10% is typical; 15% for complex layouts with many short sections.",
    },
    {
      question: "What's the difference between quartz and granite?",
      answer:
        "Quartz is engineered stone (90% natural quartz mixed with resin). More uniform pattern, non-porous, no sealing required, resistant to stains. Granite is natural stone — each slab unique, requires periodic sealing, can stain if not maintained. Prices overlap; quartz is taking market share because of lower maintenance.",
    },
    {
      question: "How much does a new countertop cost?",
      answer:
        "For a typical 40 sq ft kitchen in quartz ($60-120/ft² installed): $2,400-4,800. Granite similar. Marble premium: $3,200-8,000. Laminate budget: $800-2,000. The calculator shows a cost range based on material; exact quotes require sending measurements to fabricators for stone/engineered options.",
    },
    {
      question: "What about an island overhang for seating?",
      answer:
        "Standard island: 25.5\" wide (counter depth). For bar seating: add 12-15\" overhang on the seating side = 38-40\" total depth. Enter this wider depth in the calculator if your island has seating. Overhangs beyond 12 inches require support brackets for stone tops.",
    },
    {
      question: "Do I need to account for the backsplash?",
      answer:
        "Countertops often include a short 4\" integrated backsplash as part of the slab (adds slight material but usually negligible cost). Full 18\" or taller backsplashes in tile are a separate purchase — use the backsplash calculator. Stone-slab full-height backsplashes cost about the same per square foot as the counter itself.",
    },
    {
      question: "Can I install countertops myself?",
      answer:
        "Laminate: yes — DIY-friendly, pre-formed sections from home centers. Butcher block: yes — hand-measurable and cuttable. Quartz/granite/marble: no — slabs weigh 15-22 lb/sq ft (a standard kitchen slab can weigh 700+ lb), require templating equipment, specialized cutting tools, and seam bonding. Fabrication + installation is always professional for stone.",
    },
  ],
};
