import { GarageDoorCalculatorExpansion } from "@/content/garage-door-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const garageDoorCalculatorConfig: CalculatorConfig = {
  slug: "garage-door-calculator",
  title: "Garage Door Calculator",
  description:
    "Right garage door size, headroom, and opener power for any garage. Checks clearances and recommends single vs double door.",
  categoryLabel: "Roofing",
  category: "roofing",

  bannerHeadline: "Open cleanly.",
  bannerTags: ["Size + clearance", "Headroom + side", "Opener HP"],

  inputs: [
    {
      id: "opening",
      label: "Door opening width",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 16,
      defaultMetric: 4.9,
      min: 6,
      step: 0.5,
      help: "Standard: 8' single, 16' double",
    },
    {
      id: "height",
      label: "Door opening height",
      type: "select",
      defaultImperial: 7,
      options: [
        { label: '7 ft (standard)', value: 7 },
        { label: '8 ft (full-size vehicles)', value: 8 },
        { label: '9 ft (RV/trailer)', value: 9 },
        { label: '10 ft (commercial)', value: 10 },
      ],
    },
    {
      id: "headroom",
      label: "Available headroom",
      type: "number",
      unitImperial: "in",
      unitMetric: "cm",
      defaultImperial: 12,
      defaultMetric: 30,
      min: 0,
      step: 1,
      help: "Distance from top of opening to ceiling",
    },
    {
      id: "sideroom",
      label: "Available side room",
      type: "number",
      unitImperial: "in",
      unitMetric: "cm",
      defaultImperial: 6,
      defaultMetric: 15,
      min: 0,
      step: 1,
      help: "Distance from each side of opening to wall",
    },
    {
      id: "material",
      label: "Door material",
      type: "select",
      defaultImperial: "steel-insulated",
      options: [
        { label: "Steel (non-insulated)", value: "steel" },
        { label: "Steel (insulated)", value: "steel-insulated" },
        { label: "Aluminum + glass", value: "aluminum" },
        { label: "Wood", value: "wood" },
      ],
    },
  ],

  calculate: (values, units) => {
    const openingInput = Number(values.opening) || 0;
    const heightFt = Number(values.height) || 7;
    const headroomInput = Number(values.headroom) || 0;
    const sideroomInput = Number(values.sideroom) || 0;
    const material = String(values.material || "steel-insulated");

    // Convert to inches for checks
    const openingFt = units === "metric" ? openingInput * 3.281 : openingInput;
    const headroomIn = units === "metric" ? headroomInput / 2.54 : headroomInput;
    const sideroomIn = units === "metric" ? sideroomInput / 2.54 : sideroomInput;

    // Door type recommendation
    const doorType =
      openingFt <= 10
        ? "single-car"
        : openingFt <= 18
          ? "double-car"
          : "oversized/commercial";

    // Clearance checks
    // Standard sectional door requires 12" headroom minimum, 3.75" side clearance each side
    // Low-headroom conversions available down to 4.5" headroom (special tracks)
    let headroomStatus: string;
    if (headroomIn < 4.5) {
      headroomStatus = "⚠ INSUFFICIENT: need 4.5\" minimum (low-headroom kit)";
    } else if (headroomIn < 12) {
      headroomStatus = "OK with low-headroom kit (add $100-200)";
    } else {
      headroomStatus = "OK (standard tracks)";
    }

    let sideroomStatus: string;
    if (sideroomIn < 3.75) {
      sideroomStatus = "⚠ INSUFFICIENT: need 3.75\" minimum each side";
    } else if (sideroomIn < 8) {
      sideroomStatus = "OK (tight: verify torsion spring clearance)";
    } else {
      sideroomStatus = "OK (standard installation)";
    }

    // Opener HP recommendation based on door area and material weight
    const area = openingFt * heightFt;
    const weightFactor: Record<string, number> = {
      steel: 1.0,
      "steel-insulated": 1.2,
      aluminum: 0.9,
      wood: 1.8,
    };
    const adjusted = area * (weightFactor[material] || 1.0);

    let openerHp: string;
    if (adjusted < 120) openerHp = "1/2 HP";
    else if (adjusted < 180) openerHp = "3/4 HP";
    else openerHp = "1 HP or more";

    // Total door area for cost estimate
    const priceMap: Record<string, { low: number; high: number }> = {
      steel: { low: 400, high: 900 }, // per 16-ft door
      "steel-insulated": { low: 700, high: 1800 },
      aluminum: { low: 1500, high: 3500 },
      wood: { low: 2000, high: 6000 },
    };
    const priceRange = priceMap[material] || priceMap["steel-insulated"];
    const widthFactor = openingFt / 16; // priced for standard 16-ft double
    const lowCost = Math.round(priceRange.low * widthFactor);
    const highCost = Math.round(priceRange.high * widthFactor);

    return {
      value: round(openingFt, 1),
      unit: "ft wide",
      valueRounded: Math.round(openingFt),
      breakdown: [
        { label: "door type", value: doorType },
        { label: "opening", value: `${round(openingFt, 1)} × ${heightFt} ft` },
        { label: "headroom", value: headroomStatus },
        { label: "side room", value: sideroomStatus },
        { label: "opener", value: openerHp },
        { label: "cost (installed)", value: `$${lowCost}–$${highCost}` },
      ],
      formulaSteps: [
        `opening = ${round(openingFt, 1)} × ${heightFt} ft = ${round(area, 0)} ft² door area`,
        `door type = ${doorType}`,
        `headroom = ${round(headroomIn, 1)} in: ${headroomStatus}`,
        `side room = ${round(sideroomIn, 1)} in each side: ${sideroomStatus}`,
        `material weight factor = ${weightFactor[material]}× (${material})`,
        `adjusted load = ${round(area, 0)} × ${weightFactor[material]} = ${round(adjusted, 0)}`,
        `opener recommendation: ${openerHp}`,
        `cost range (installed, ${openingFt}-ft door): $${lowCost}-$${highCost}`,
      ],
    };
  },

  howTo: {
    name: "How to size a garage door and check clearances",
    description:
      "Measure the opening and the three clearances around it, then match a standard door size, spring, and opener.",
    steps: [
      {
        name: "Measure the finished opening",
        text: "Width and height of the finished opening, not the old door panel. Standard sizes are 8x7 and 9x7 for singles, 10x8 for tall singles, and 16x7 for doubles.",
      },
      {
        name: "Measure headroom",
        text: "From the top of the opening to the lowest obstruction above it, including lights, pipes, and sprinkler heads. Standard track needs 12 inches; a low-headroom kit works down to about 4-1/2 inches.",
      },
      {
        name: "Measure side room and backroom",
        text: "Side room is at least 3-3/4 inches from each side of the opening to the wall. Backroom is the door height plus 18 inches, or roughly the door height plus 4 feet when a ceiling-mounted opener is used.",
      },
      {
        name: "Pick the material and check the weight",
        text: "A 16x7 steel door weighs about 155 pounds and an insulated one about 210. Springs are sized to that weight, so a heavier replacement door needs new springs.",
      },
      {
        name: "Size the opener",
        text: "Use 1/2 HP for a standard single, 3/4 HP for a 16 foot double, and 1 HP or more for insulated doubles, wood doors, or doors over 8 feet tall.",
      },
    ],
  },

  ContentExpansion: GarageDoorCalculatorExpansion,

  formulaDescription:
    "door ≤ 10ft = single, ≤ 18ft = double; opener HP by area × material weight factor",

  methodology: [
    "Standard garage door widths: 8 or 9 ft for single-car openings, 16 ft for standard double, 18 ft for extra-wide double (for modern large SUVs and trucks), 20 ft+ for RV or commercial bays. Standard heights: 7 ft (standard for passenger cars and most small SUVs), 8 ft (full-size pickups and RVs with top carriers), 9-10 ft (RVs, small commercial, workshop access for trucks with racks).",
    "Headroom is the critical dimension most homeowners overlook. A standard sectional garage door needs 12 inches of clearance between the top of the opening and the ceiling for the tracks to curve back. Less than 12 inches requires a low-headroom conversion kit (adds $100-200 to door cost) that works down to about 4.5 inches. Below 4.5 inches: sectional doors won't fit; consider side-folding or roll-up options.",
    "Side room is the horizontal clearance between each side of the opening and the nearest wall. Standard installations need 3.75 inches each side for the vertical tracks and track brackets. Torsion spring systems may need 8+ inches on one side for the spring. Tight side room is workable but may limit spring choices.",
    "Opener sizing depends on door weight: a non-insulated steel door is lightweight (~120-180 lbs for a 16×7 door), insulated steel is medium (150-250 lbs), aluminum-and-glass doors vary (180-350 lbs), wood doors are heaviest (300-600+ lbs). For doors under 150 lbs: 1/2 HP opener. For 150-250 lbs: 3/4 HP. For 250+ lbs: 1 HP or DC chain drive. Overdrive openers (1.25+ HP) extend lifespan for any heavy door.",
    "Material cost ranges (installed for a 16×7 ft double door, 2025-2026 US): basic steel $400-900; insulated steel $700-1,800 (most popular); aluminum with glass panels $1,500-3,500 (modern look, premium); wood $2,000-6,000 (custom staining, high maintenance). Prices scale roughly linearly with door width.",
    "Not included: springs, tracks, hinges, cables (standard with new door), remote openers (add $150-400 for smart openers with WiFi), insulation upgrades, weatherstripping at the bottom, decorative hardware. Installation labor typically adds $200-500 for a single door, $400-800 for a double.",
  ],

  sources: [
    {
      name: "ANSI/DASMA 102: Residential Sectional Door Specification",
      url: "https://www.dasma.com/standards/",
      note: "The industry specification behind standard sizes, construction, and performance ratings",
    },
    {
      name: "DASMA Technical Data Sheets: Headroom and Backroom",
      url: "https://www.dasma.com/technical-data-sheets/",
      note: "Clearance requirements for standard, low-headroom, and high-lift track",
    },
    {
      name: "ANSI/DASMA 108: Wind Load Testing",
      url: "https://www.dasma.com/standards/",
      note: "The design pressure standard required in coastal and high-wind jurisdictions",
    },
    {
      name: "IRC 2021, Table R602.7(1): Girder and Header Spans",
      url: "https://codes.iccsafe.org/content/IRC2021P1/chapter-6-wall-construction",
      note: "Prescriptive header spans over garage openings in load-bearing walls",
    },
    {
      name: "UL 325: Door, Drapery, Gate, and Window Operators",
      url: "https://www.shopulstandards.com/ProductDetail.aspx?productId=UL325",
      note: "The standard mandating photo-eye entrapment protection on residential openers since 1993",
    },
  ],

  related: [
    { name: "Concrete calculator", slug: "concrete-calculator", description: "For garage slab or driveway" },
    { name: "Stud spacing calculator", slug: "stud-spacing-calculator", description: "Framing around openings" },
    { name: "Insulation calculator", slug: "insulation-calculator", description: "R-value for attached garages" },
    { name: "Wire size calculator", slug: "wire-size-calculator", description: "Opener circuit wiring" },
  ],

  faq: [
    {
      question: "What size garage door do I need?",
      answer:
        "Single-car garage: 8 or 9 ft wide × 7 ft tall. Standard double-car: 16 × 7 ft (fits two compact cars or one large SUV). Wide double: 18 × 7 ft (for two full-size vehicles with side mirrors). Tall double: 16 × 8 ft (for large SUVs, trucks with top carriers). Measure your opening from frame to frame, never trust what the builder 'says' the size is.",
    },
    {
      question: "Can I install a garage door with low ceilings?",
      answer:
        "Yes, with a low-headroom conversion kit. Standard sectional doors need 12 inches of headroom; low-headroom kits work with as little as 4.5 inches. The kit adds $100-200 to door cost. Below 4.5 inches of headroom, consider side-folding or roll-up doors as alternatives.",
    },
    {
      question: "Should I get an insulated door?",
      answer:
        "For attached garages or workshops: yes. Insulated doors reduce heat loss through the largest opening in the garage by 50-70%. Adds $200-600 to door cost. Cheaper to insulate the door than to insulate the garage separately. For detached unheated garages: non-insulated is fine.",
    },
    {
      question: "What size opener do I need?",
      answer:
        "1/2 HP handles most 16×7 sectional steel doors up to 300 lbs. 3/4 HP for heavier insulated steel or light wood doors (300-500 lbs). 1 HP+ for heavy wood, glass/aluminum, or any door over 500 lbs. Belt drive is quieter than chain (important for rooms above garages). Direct drive (Liftmaster, Chamberlain) is most reliable.",
    },
    {
      question: "How much does a new garage door cost?",
      answer:
        "Basic steel: $400-900 installed for a 16×7 double. Insulated steel (most popular): $700-1,800. Aluminum and glass modern: $1,500-3,500. Wood custom: $2,000-6,000. Single-car doors run about 60-70% of double-car prices. Opener adds $200-500 (basic) to $400-800 (smart with camera).",
    },
    {
      question: "How long do garage doors last?",
      answer:
        "Steel: 15-30 years with minimal maintenance. Wood: 15-20 years with regular staining/sealing every 2-3 years. Aluminum: 20-25 years. Springs wear out in 10,000-20,000 cycles (7-10 years typical, 5 years for heavy-use homes). Openers last 10-15 years. Most garage door 'failures' are spring or track problems, not the door itself.",
    },
    {
      question: "Can I replace just the panels?",
      answer:
        "Yes for sectional doors if you can match the style and color. New panels cost $100-300 each installed. Sometimes makes sense for a single damaged panel. For widespread damage or to change style: full replacement is more cost-effective than replacing 3+ panels.",
    },
    {
      question: "What about the header above the door?",
      answer:
        "Garage door headers are critical structural components. For 16-ft openings: typically a doubled LVL (2-ply 14-18\" deep) or engineered beam. For 18-ft+ openings: tripled LVL or steel beam. Always spec by IRC span tables or engineered drawings: garage door headers are load-bearing and undersized headers cause roof sagging.",
    },
  ],
};
