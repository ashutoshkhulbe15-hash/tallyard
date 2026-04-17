import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const studSpacingCalculatorConfig: CalculatorConfig = {
  slug: "stud-spacing-calculator",
  title: "Stud Spacing Calculator",
  description:
    "Studs needed for any wall, including headers for openings. IRC-compliant spacing with king studs, jack studs, and cripples.",
  categoryLabel: "Lumber",
  category: "drywall",

  bannerHeadline: "Frame squarely.",
  bannerTags: ["16\" or 24\" OC", "Headers + jacks", "Opening math"],

  inputs: [
    {
      id: "wallLength",
      label: "Wall length",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 20,
      defaultMetric: 6,
      min: 2,
      step: 0.5,
    },
    {
      id: "spacing",
      label: "Stud spacing",
      type: "select",
      defaultImperial: 16,
      options: [
        { label: '16" OC (standard)', value: 16 },
        { label: '24" OC (economy)', value: 24 },
      ],
    },
    {
      id: "corners",
      label: "Corner connections",
      type: "number",
      defaultImperial: 2,
      min: 0,
      step: 1,
      help: "Corner framing adds 2-3 extra studs each",
    },
    {
      id: "doors",
      label: "Door openings",
      type: "number",
      defaultImperial: 1,
      min: 0,
      step: 1,
      help: "Each door adds 2 jack + 2 king + header + cripples",
    },
    {
      id: "windows",
      label: "Window openings",
      type: "number",
      defaultImperial: 2,
      min: 0,
      step: 1,
      help: "Each window adds 2 jack + 2 king + header + cripples + sill",
    },
    {
      id: "bearingWall",
      label: "Wall type",
      type: "select",
      defaultImperial: "non-bearing",
      options: [
        { label: "Non-bearing (partition)", value: "non-bearing" },
        { label: "Bearing (supports roof/floor)", value: "bearing" },
      ],
      help: "Bearing walls need larger headers (2×8 or 2×10)",
    },
  ],

  calculate: (values, units) => {
    const wallLengthInput = Number(values.wallLength) || 0;
    const spacing = Number(values.spacing) || 16;
    const corners = Number(values.corners) || 0;
    const doors = Number(values.doors) || 0;
    const windows = Number(values.windows) || 0;
    const bearing = String(values.bearingWall || "non-bearing") === "bearing";

    const wallLengthFt = units === "metric" ? wallLengthInput * 3.281 : wallLengthInput;

    // Basic stud count at spacing, plus 1 for end
    const lineStuds = Math.ceil((wallLengthFt * 12) / spacing) + 1;

    // Corner studs: typical 3-stud corner adds 2 extra per corner
    const cornerStuds = corners * 2;

    // Per door: 2 king + 2 jack = 4 extra studs, plus cripples (2 above header)
    const doorFraming = doors * (4 + 2);
    // Per window: 2 king + 2 jack + 2 cripples above + 2 cripples below = 8
    const windowFraming = windows * (4 + 4);

    // Headers: 1 per opening; board feet depends on width + wall type
    // Non-bearing: 2×4 header OK for openings under 4 ft
    // Bearing: 2×8 or 2×10 minimum
    const headerPieces = (doors + windows) * 2; // doubled header

    // Total studs
    const totalStuds = lineStuds + cornerStuds + doorFraming + windowFraming;

    // Header size recommendation
    const headerSize = bearing
      ? "2×8 minimum (per IRC span tables)"
      : "2×4 (non-bearing, under 4-ft openings)";

    return {
      value: totalStuds,
      unit: totalStuds === 1 ? "stud" : "studs",
      valueRounded: totalStuds,
      breakdown: [
        { label: "line studs", value: `${lineStuds} at ${spacing}" OC` },
        ...(corners > 0
          ? [{ label: "corner studs", value: `+${cornerStuds} (${corners} corners)` }]
          : []),
        ...(doors > 0
          ? [{ label: "door framing", value: `+${doorFraming} (${doors} doors)` }]
          : []),
        ...(windows > 0
          ? [{ label: "window framing", value: `+${windowFraming} (${windows} windows)` }]
          : []),
        { label: "header pieces", value: `${headerPieces} × 2× lumber` },
        { label: "header size", value: headerSize },
      ],
      formulaSteps: [
        `wall length = ${wallLengthFt} ft = ${round(wallLengthFt * 12, 0)} inches`,
        `line studs = ⌈${round(wallLengthFt * 12, 0)} ÷ ${spacing}⌉ + 1 = ${lineStuds}`,
        corners > 0
          ? `corners = ${corners} × 2 extra studs = ${cornerStuds}`
          : "no corners specified",
        doors > 0
          ? `doors = ${doors} × (2 king + 2 jack + 2 cripples) = ${doorFraming}`
          : "no doors",
        windows > 0
          ? `windows = ${windows} × (2 king + 2 jack + 2 top cripples + 2 bottom cripples) = ${windowFraming}`
          : "no windows",
        `total studs = ${lineStuds} + ${cornerStuds} + ${doorFraming} + ${windowFraming} = ${totalStuds}`,
        `headers: ${headerPieces} pieces of 2× lumber (doubled over each opening)`,
        `recommended header size: ${headerSize}`,
      ],
    };
  },

  formulaDescription:
    "studs = ⌈length × 12 ÷ spacing⌉ + 1 + corners × 2 + doors × 6 + windows × 8",

  methodology: [
    "Line studs are spaced at either 16\" or 24\" on center. 16\" OC is the residential standard — stronger wall, easier drywall install (4-ft sheets break on studs), and what most carpenters default to. 24\" OC saves ~35% studs and is permitted for most non-bearing interior walls and some exterior walls with engineered sheathing. The calculator computes the line by dividing the wall length (in inches) by spacing and adding one for the end stud.",
    "Corner framing adds extra studs for the intersection of walls. A standard 3-stud corner adds 2 studs beyond the line count (one at the end, plus a 2-stud L at the corner itself). Modern energy-efficient corners use 2 studs with a corner backing board, saving lumber and allowing more insulation.",
    "Each door opening requires 6 extra studs beyond the line: 2 king studs (full-height, flanking the opening), 2 jack studs (shorter, supporting the header), and typically 2 cripple studs above the header to complete the wall. The calculator doesn't subtract the line studs that would have been in the opening — this builds in a small buffer that's typical of how carpenters actually order.",
    "Each window adds 8 extra studs: 2 king, 2 jack, 2 cripples above the header, and 2 cripples below the rough sill. Wider windows need more cripples — the calculator uses 2 as a baseline for typical 3-foot-wide windows. For 6+ foot windows, add 2 more cripples per opening.",
    "Header sizing: non-bearing walls (interior partitions not supporting roof or floor loads) can use 2×4 flat-plate headers for openings under 4 feet. Bearing walls (most exterior walls, load-bearing interior walls) require heavier headers per IRC 2021 Table R602.7: 2×6 up to 4-ft spans, 2×8 up to 6-ft spans, 2×10 up to 8-ft spans, 2×12 up to 10-ft spans. The calculator recommends a minimum — always verify with actual span calculations.",
    "Not covered: non-standard framing (balloon framing, advanced framing, SIPs), engineered lumber (LVL, glulam, I-joists for headers), seismic or hurricane hold-downs, or shear wall requirements. This is a materials estimator — for load-bearing decisions, consult a residential structural engineer or IRC span tables.",
  ],

  sources: [
    {
      name: "IRC 2021 — Wood Wall Framing",
      url: "https://codes.iccsafe.org/",
      note: "Code-required stud spacing and header spans",
    },
    {
      name: "APA Engineered Wood Association",
      url: "https://www.apawood.org/",
      note: "Framing best practices and material sizing",
    },
  ],

  related: [
    { name: "Drywall calculator", slug: "drywall-calculator", description: "Sheets for framed walls" },
    { name: "Lumber calculator", slug: "lumber-calculator", description: "Board feet for any order" },
    { name: "Insulation calculator", slug: "insulation-calculator", description: "R-value by framing spacing" },
    { name: "Paint calculator", slug: "paint-calculator", description: "Gallons once walls are framed" },
  ],

  faq: [
    {
      question: "How many studs do I need for a 20-foot wall?",
      answer:
        "At 16\" OC: 16 line studs. Add 1 door (+6), 2 windows (+16), and 2 corners (+4) = 42 studs total. The calculator handles any wall length and opening count. For safety, order 10% extras — warped boards are common and unusable.",
    },
    {
      question: "Should I use 16\" or 24\" OC spacing?",
      answer:
        "16\" OC for most residential walls — stronger, easier to sheetrock, and what most building codes require for bearing walls. 24\" OC (sometimes called 'advanced framing') saves lumber for non-bearing interior walls and some single-story exterior walls with engineered sheathing. Check your local code before using 24\" OC for bearing walls.",
    },
    {
      question: "What are king studs and jack studs?",
      answer:
        "King studs are full-height studs flanking a door or window opening — they connect the top plate to the bottom plate. Jack studs are shorter, nailed to the king studs, supporting the bottom of the header. Together they form the structural frame around the opening. Larger openings may need doubled or tripled jacks.",
    },
    {
      question: "What size header do I need?",
      answer:
        "Non-bearing walls with openings under 4 ft: 2×4 flat header OK. Bearing walls: 2×6 header for up to 4-ft span, 2×8 for up to 6 ft, 2×10 for up to 8 ft, 2×12 for up to 10 ft. Spans over 10 ft typically need engineered lumber (LVL, glulam). Always verify with IRC Table R602.7 for your specific load and span.",
    },
    {
      question: "What are cripple studs?",
      answer:
        "Short studs above or below an opening that maintain the framing grid. Above a header: short studs between the header and the top plate. Below a window sill: short studs between the sill and the bottom plate. They maintain nailing surface for sheathing and drywall. Count them when ordering lumber.",
    },
    {
      question: "Do partition walls need headers?",
      answer:
        "For openings under 3 feet in non-load-bearing walls: often just a flat 2×4 header is sufficient. For wider openings in non-bearing walls: 2×6 works. Bearing walls require proper headers regardless of width. When in doubt, install a header — over-engineering a non-bearing wall wastes a few dollars; under-engineering a bearing wall causes structural failure.",
    },
    {
      question: "How does corner framing work?",
      answer:
        "Traditional 3-stud corner: full stud at corner, then 2 studs backing it to provide nailing surface for drywall. Uses 3 studs per corner plus blocking. Energy-efficient 2-stud corner: two studs forming the L, with plywood/OSB scraps for drywall nailing — allows insulation to extend to the corner. The calculator uses +2 studs per corner which covers both methods.",
    },
    {
      question: "What about shear walls and bracing?",
      answer:
        "Not modeled here. Most walls need some form of lateral bracing — either let-in diagonal bracing, metal strap bracing, or (most common) wood structural panel sheathing (OSB or plywood) covering at least part of the wall. Required by code especially in seismic and high-wind regions. Consult your local building official for specific requirements.",
    },
  ],
};
