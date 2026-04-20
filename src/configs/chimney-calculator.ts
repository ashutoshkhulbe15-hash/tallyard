import { ChimneyCalculatorExpansion } from "@/content/chimney-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const chimneyCalculatorConfig: CalculatorConfig = {
  slug: "chimney-calculator",
  title: "Chimney Calculator",
  description:
    "Flue size for fireplaces and wood stoves. Uses the 1/10 rule for masonry fireplaces and appliance-specific sizing for stoves and inserts.",
  categoryLabel: "Masonry",
  category: "concrete",

  bannerHeadline: "Vent hotly.",
  bannerTags: ["1/10 rule", "Masonry or stove", "Flue size in²"],

  inputs: [
    {
      id: "type",
      label: "Appliance type",
      type: "select",
      defaultImperial: "fireplace",
      options: [
        { label: "Masonry fireplace", value: "fireplace" },
        { label: "Wood stove", value: "woodstove" },
        { label: "Fireplace insert", value: "insert" },
        { label: "Gas fireplace (direct-vent)", value: "gas" },
      ],
    },
    {
      id: "openingWidth",
      label: "Fireplace opening width",
      type: "number",
      unitImperial: "in",
      unitMetric: "cm",
      defaultImperial: 36,
      defaultMetric: 91,
      min: 0,
      step: 1,
      help: "For masonry fireplace or insert — 0 for wood stove",
    },
    {
      id: "openingHeight",
      label: "Fireplace opening height",
      type: "number",
      unitImperial: "in",
      unitMetric: "cm",
      defaultImperial: 30,
      defaultMetric: 76,
      min: 0,
      step: 1,
      help: "For masonry fireplace or insert — 0 for wood stove",
    },
    {
      id: "stoveOutlet",
      label: "Wood stove flue outlet diameter",
      type: "select",
      defaultImperial: 6,
      options: [
        { label: '6" (most stoves)', value: 6 },
        { label: '7"', value: 7 },
        { label: '8" (large stove)', value: 8 },
      ],
      help: "Manufacturer-specified on the appliance. Match exactly.",
    },
    {
      id: "chimneyHeight",
      label: "Chimney height (above firebox)",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 20,
      defaultMetric: 6,
      min: 10,
      step: 1,
      help: "IRC minimum: 15 ft for fireplaces, manufacturer spec for stoves",
    },
  ],

  calculate: (values, units) => {
    const type = String(values.type || "fireplace");
    const openingWidthInput = Number(values.openingWidth) || 0;
    const openingHeightInput = Number(values.openingHeight) || 0;
    const stoveOutlet = Number(values.stoveOutlet) || 6;
    const chimneyHeightInput = Number(values.chimneyHeight) || 0;

    const openingWidth = units === "metric" ? openingWidthInput / 2.54 : openingWidthInput;
    const openingHeight = units === "metric" ? openingHeightInput / 2.54 : openingHeightInput;
    const chimneyHeight = units === "metric" ? chimneyHeightInput * 3.281 : chimneyHeightInput;

    // Masonry fireplace: flue area = 1/10 of fireplace opening area (rule of thumb)
    // More precisely, IRC R1003.15 requires different ratios for rectangular vs round flues
    const openingArea = openingWidth * openingHeight; // sq in

    let flueAreaNeeded: number;
    let flueSizeRec: string;
    let liningRec: string;

    if (type === "fireplace") {
      // Rule: flue area = 1/10 of fireplace opening for chimneys ≥ 15 ft
      // Round flues: 1/12. For short chimneys (under 15 ft): use 1/8
      const ratio = chimneyHeight < 15 ? 8 : 10;
      flueAreaNeeded = openingArea / ratio;

      // Standard rectangular terra cotta flue liners (inside clear area in sq in):
      // 8×8 = 33, 8×12 = 54, 12×12 = 80, 12×16 = 112, 16×16 = 156, 20×20 = 262
      const liners = [
        { size: "8×8", area: 33 },
        { size: "8×12", area: 54 },
        { size: "12×12", area: 80 },
        { size: "12×16", area: 112 },
        { size: "16×16", area: 156 },
        { size: "20×20", area: 262 },
      ];
      const chosen = liners.find((l) => l.area >= flueAreaNeeded) || liners[liners.length - 1];
      flueSizeRec = `${chosen.size}" rectangular terra cotta (${chosen.area} in²)`;
      liningRec = "Rectangular terra cotta or equivalent insulated liner";
    } else if (type === "woodstove" || type === "insert") {
      // Match the stove outlet — round metal flue
      const diameter = stoveOutlet;
      flueAreaNeeded = Math.PI * Math.pow(diameter / 2, 2);
      flueSizeRec = `${diameter}" round stainless steel Class A`;
      liningRec = "Double-wall insulated stainless steel flue liner";
    } else {
      // Gas direct-vent
      flueAreaNeeded = 0;
      flueSizeRec = "Direct-vent kit per manufacturer — no traditional chimney";
      liningRec = "Coaxial direct-vent pipe to exterior wall or roof";
    }

    // Chimney height checks
    const heightStatus =
      type === "fireplace"
        ? chimneyHeight >= 15
          ? "OK (≥ 15 ft)"
          : "⚠ short chimney — consider relining or taller chimney"
        : chimneyHeight >= 10
          ? "OK"
          : "⚠ check manufacturer minimum";

    // 3-2-10 rule: chimney top must be 3 ft above roof penetration, and 2 ft higher than any roof/structure within 10 ft
    const threetwoten = "3-2-10 rule: 3 ft above roof penetration, 2 ft higher than any structure within 10 ft";

    return {
      value: round(flueAreaNeeded, 0),
      unit: "in² flue area",
      valueRounded: Math.ceil(flueAreaNeeded),
      breakdown: [
        { label: "appliance type", value: type },
        ...(type === "fireplace" || type === "insert"
          ? [{ label: "opening area", value: `${round(openingArea, 0)} in² (${round(openingWidth, 0)}"×${round(openingHeight, 0)}")` }]
          : []),
        { label: "recommended flue", value: flueSizeRec },
        { label: "lining", value: liningRec },
        { label: "chimney height", value: `${round(chimneyHeight, 0)} ft — ${heightStatus}` },
        { label: "termination rule", value: threetwoten },
      ],
      formulaSteps: [
        `appliance type = ${type}`,
        type === "fireplace"
          ? `opening area = ${round(openingWidth, 0)}" × ${round(openingHeight, 0)}" = ${round(openingArea, 0)} in²`
          : "",
        type === "fireplace"
          ? `flue ratio = 1:${chimneyHeight < 15 ? 8 : 10} (based on ${round(chimneyHeight, 0)}-ft chimney)`
          : "",
        type === "fireplace"
          ? `flue area needed = ${round(openingArea, 0)} ÷ ${chimneyHeight < 15 ? 8 : 10} = ${round(flueAreaNeeded, 0)} in²`
          : "",
        type === "woodstove" || type === "insert"
          ? `flue = match stove outlet: ${stoveOutlet}" round = ${round(flueAreaNeeded, 0)} in²`
          : "",
        `recommended: ${flueSizeRec}`,
        `chimney height status: ${heightStatus}`,
      ].filter(Boolean) as string[],
    };
  },

  ContentExpansion: ChimneyCalculatorExpansion,

  formulaDescription:
    "masonry fireplace: flue area = opening area ÷ 10 (or ÷ 8 if < 15 ft tall); wood stove: match outlet diameter",

  methodology: [
    "The classic rule for masonry fireplaces: flue cross-sectional area should be approximately 1/10 of the fireplace opening area. A 36 × 30 inch opening (1,080 sq in) needs about 108 sq in of flue — which is between a 12×12 (80 sq in) and 12×16 (112 sq in) terra cotta liner, so use the larger one. IRC R1003.15 codifies this with slight variations for rectangular vs round flues.",
    "Short chimneys (under 15 feet) need larger flues because draft is weaker. The calculator uses 1:8 ratio for chimneys under 15 ft and 1:10 for chimneys 15 ft or taller. Very short chimneys (under 10 ft above the firebox) generally don't draft properly for traditional fireplaces — consider a taller structure or switch to a different appliance.",
    "Wood stoves are sized differently — you match the flue exactly to the stove's outlet diameter, which is set by the manufacturer based on the stove's heat output and flow characteristics. Most residential wood stoves have 6-inch outlets. Large stoves and some brands use 7 or 8 inches. Never reduce or enlarge the flue from the stove outlet — this is a fire safety issue, not just a performance issue.",
    "Chimney height: IRC requires fireplace chimneys to extend at least 15 feet from the firebox (top of opening to top of chimney). For wood stoves, the manufacturer specifies the minimum, typically 13-15 feet. This height generates the draft (pressure differential) that pulls combustion gases out of the house.",
    "Termination clearance follows the 3-2-10 rule: the chimney top must be at least 3 feet above the roof at the penetration point, AND at least 2 feet above any part of the roof or structure within 10 horizontal feet. This prevents downdrafts from wind hitting nearby structures. Violating this rule is the most common cause of poor-drafting fireplaces.",
    "Not covered: heat exchanger specifications, draft control dampers, chase construction, spark arrestors, smoke chambers, lintel sizing, firebox construction, ash dump, or the 8-inch masonry thickness required for fireplace walls. A masonry fireplace is one of the most regulated pieces of residential construction — always consult IRC Chapter 10 or hire a CSIA-certified chimney professional.",
  ],

  sources: [
    {
      name: "IRC 2021 Chapter 10 — Chimneys and Fireplaces",
      url: "https://codes.iccsafe.org/content/IRC2021P2/chapter-10-chimneys-and-fireplaces",
      note: "Code requirements for flue sizing and chimney construction",
    },
    {
      name: "Chimney Safety Institute of America (CSIA)",
      url: "https://www.csia.org/",
      note: "Industry reference for chimney and fireplace safety",
    },
  ],

  related: [
    { name: "Brick calculator", slug: "brick-calculator", description: "Bricks for masonry chimney" },
    { name: "Concrete calculator", slug: "concrete-calculator", description: "Footings under chimney" },
    { name: "Roofing calculator", slug: "roofing-calculator", description: "Shingles around chimney flashing" },
    { name: "Rebar calculator", slug: "rebar-calculator", description: "Reinforcement in chimney footing" },
  ],

  faq: [
    {
      question: "What size flue do I need for a 36×30 fireplace?",
      answer:
        "Opening area = 1,080 sq in. Flue area needed (1:10 ratio) = 108 sq in. Standard terra cotta liners: 12×12 is 80 sq in (too small), 12×16 is 112 sq in (correct). Always round UP to the next standard size. For round metal flues: use a 13-inch diameter minimum.",
    },
    {
      question: "Why does my fireplace smoke back into the room?",
      answer:
        "Top causes: (1) Flue too small relative to opening — check 1:10 rule. (2) Chimney too short or terminated below nearby structures — check 3-2-10 rule. (3) Negative house pressure from modern airtight construction or exhaust fans overwhelming the draft — crack a window near the fireplace to test. (4) Cold chimney needs priming — burn newspaper in the smoke chamber first.",
    },
    {
      question: "What's the 3-2-10 rule?",
      answer:
        "Chimney termination must be at least 3 feet above the roof at the penetration point, AND at least 2 feet higher than any roof or structure within 10 horizontal feet. This prevents wind-driven downdrafts. A chimney coming out of a tall roof next to a dormer often needs to be quite tall to satisfy this rule.",
    },
    {
      question: "Can I use an existing chimney for a wood stove?",
      answer:
        "Sometimes. The existing flue must match the stove outlet size and must be lined with stainless steel insulated liner (Class A) — raw masonry flues don't meet modern wood stove requirements. Relining an existing chimney costs $2,000-5,000. A professional chimney inspection (Level 2) is required before installation. Don't skip this — improper venting is the #1 cause of chimney fires.",
    },
    {
      question: "What kind of liner do I need?",
      answer:
        "Masonry fireplaces: clay (terra cotta) tile liner, installed during construction. Retrofits: stainless steel flexible liner, insulated. Wood stoves: double-wall insulated stainless steel Class A chimney pipe. Gas fireplaces: type B vent (aluminum) or direct-vent coaxial pipe. Never use single-wall stove pipe outside the firebox — it's for short interior connector runs only.",
    },
    {
      question: "How tall does my chimney need to be?",
      answer:
        "IRC minimum: 15 feet from firebox to chimney cap for fireplaces. Wood stoves: per manufacturer, typically 13-16 feet. In practice: taller is better for draft — a 20-foot chimney drafts better than a 15-foot one. For 2-story homes, the chimney naturally reaches 25-30 feet. For ranches, you may need to extend above the roof line significantly to meet the 3-2-10 rule.",
    },
    {
      question: "How often does the chimney need cleaning?",
      answer:
        "Open wood fireplace used occasionally: annually. Wood stove used as primary heat: 2-3 times per year. Gas fireplace: every 2 years (less creosote but still needs inspection). Cleaning costs $150-400 depending on chimney size and condition. Skipping cleaning leads to creosote buildup and chimney fires — the leading cause of house fires originating in heating systems.",
    },
    {
      question: "Do I need a chimney cap?",
      answer:
        "Yes — strongly recommended. Caps prevent rain from entering the flue (keeps the liner dry and extends life), block animals (birds, squirrels, raccoons nest in flues), and include spark arrestors (required by many fire codes to prevent ember-caused roof fires). Caps cost $50-300 and are easy to install. Skipping the cap shortens chimney life by 30-50%.",
    },
  ],
};
