import { DeckStairExpansion } from "@/content/deck-stair-expansion";
import { StringerCutSheet } from "@/components/StringerCutSheet";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

/** Nearest 1/16 fraction, e.g. 6.875 -> 6-7/8" */
function frac(value: number): string {
  const whole = Math.floor(value);
  const sixteenths = Math.round((value - whole) * 16);
  if (sixteenths === 0) return `${whole}"`;
  if (sixteenths === 16) return `${whole + 1}"`;
  let num = sixteenths;
  let den = 16;
  while (num % 2 === 0) {
    num /= 2;
    den /= 2;
  }
  return whole === 0 ? `${num}/${den}"` : `${whole}-${num}/${den}"`;
}

export const deckStairCalculatorConfig: CalculatorConfig = {
  slug: "deck-stair-calculator",
  title: "Deck Stair Calculator",
  description:
    "Stringer layout for deck stairs: riser height, tread run, stringer length, and board counts, checked against IRC R311.7 with a printable dimensioned cut sheet.",
  categoryLabel: "Decking",
  category: "landscaping",

  bannerHeadline: "Cut it once.",
  bannerTags: ["Printable cut sheet", "IRC R311.7 checks", "Stringer layout"],

  inputs: [
    {
      id: "totalRise",
      label: "Total rise (deck surface to landing)",
      type: "number",
      unitImperial: "in",
      defaultImperial: 55,
      min: 8,
      step: 0.25,
      help: "Measure from the top of the deck boards down to the finished landing surface, not the dirt. Build the pad first if there isn't one.",
    },
    {
      id: "treadRun",
      label: "Tread run (depth of each step)",
      type: "number",
      unitImperial: "in",
      defaultImperial: 10.5,
      min: 9,
      step: 0.25,
      help: "IRC minimum is 10 inches. Two 5/4x6 deck boards with a gap give about 10.5 to 11 inches, which is why that is the common run.",
    },
    {
      id: "width",
      label: "Stair width",
      type: "number",
      unitImperial: "in",
      defaultImperial: 36,
      min: 24,
      step: 1,
      help: "IRC minimum is 36 inches clear. Stringers go every 16 inches or less for 5/4 treads.",
    },
    {
      id: "treadThickness",
      label: "Tread thickness",
      type: "select",
      defaultImperial: 1,
      options: [
        { label: "5/4 decking (1 in)", value: 1 },
        { label: "2x lumber (1.5 in)", value: 1.5 },
      ],
      help: "This is what gets cut off the bottom riser so the first step ends up the same height as the rest",
    },
  ],

  calculate: (values) => {
    const totalRise = Number(values.totalRise) || 55;
    const treadRun = Number(values.treadRun) || 10.5;
    const width = Number(values.width) || 36;
    const treadThickness = Number(values.treadThickness) || 1;

    // Riser count: fewest equal risers that keeps each at or under the 7.75" max
    const risers = Math.max(1, Math.ceil(totalRise / 7.75));
    const riserHeight = totalRise / risers;
    const treads = risers - 1;
    const totalRun = treads * treadRun;

    const stringerLength = Math.sqrt(totalRise * totalRise + totalRun * totalRun);
    const angle = (Math.atan2(totalRise, totalRun) * 180) / Math.PI;

    // Stringers every 16" on center or less, plus the two outers
    const stringerCount = Math.max(3, Math.ceil(width / 16) + 1);
    // 5/4x6 boards are 5.5" wide; two per tread with a gap covers ~11"
    const boardsPerTread = Math.ceil(treadRun / 5.75);
    const treadBoards = treads * boardsPerTread;

    // Stock length for the stringer, rounded to a purchasable board
    const stockFt = Math.ceil((stringerLength / 12 + 1) / 2) * 2;
    const boardLabel = `2x12x${stockFt}'`;

    const riserOk = riserHeight <= 7.75;
    const runOk = treadRun >= 10;
    const widthOk = width >= 36;
    const guardsRequired = totalRise > 30;
    const pass = riserOk && runOk && widthOk;

    const breakdown = [
      { label: "risers", value: `${risers} @ ${frac(riserHeight)}` },
      { label: "treads", value: `${treads} @ ${frac(treadRun)}` },
      { label: "total run", value: frac(totalRun) },
      { label: "stringer length", value: frac(stringerLength) },
      { label: "stringers", value: `${stringerCount} × ${boardLabel}` },
      { label: "tread boards", value: `${treadBoards} @ ${frac(width)}` },
      {
        label: "IRC R311.7",
        value: pass
          ? "all checks pass"
          : !riserOk
            ? `riser ${frac(riserHeight)} exceeds 7-3/4" max (R311.7.5.1)`
            : !runOk
              ? `run ${frac(treadRun)} under 10" min (R311.7.5.2)`
              : `width ${frac(width)} under 36" min (R311.7.1)`,
      },
    ];

    return {
      value: round(riserHeight, 3),
      unit: "in per riser",
      valueRounded: round(riserHeight, 3),
      breakdown,
      diagramData: {
        risers,
        treads,
        riserHeight,
        treadRun,
        totalRise,
        totalRun,
        stringerLength,
        width,
        stringerCount,
        treadBoards,
        boardLabel,
        angle,
        treadThickness,
        riserOk,
        runOk,
        widthOk,
        guardsRequired,
      },
      formulaSteps: [
        `risers = ceil(${formatNumber(totalRise)}" ÷ 7.75" max) = ${risers}`,
        `riser height = ${formatNumber(totalRise)}" ÷ ${risers} = ${frac(riserHeight)} (equal risers)`,
        `treads = ${risers} − 1 = ${treads} (top step is the deck)`,
        `total run = ${treads} × ${formatNumber(treadRun)}" = ${frac(totalRun)}`,
        `stringer = √(${formatNumber(totalRise)}² + ${formatNumber(round(totalRun, 2))}²) = ${frac(stringerLength)}`,
        `bottom riser cut short by ${frac(treadThickness)} for tread thickness`,
        pass ? `IRC R311.7: pass` : `IRC R311.7: fail, see receipt`,
      ],
      composition: {
        unit: "in",
        total: Math.round(totalRise + totalRun),
        segments: [
          { label: "Total rise", amount: Math.round(totalRise), shade: "primary" },
          { label: "Total run", amount: Math.round(totalRun), shade: "secondary" },
        ],
      },
    };
  },

  ContentExpansion: DeckStairExpansion,
  ResultDiagram: StringerCutSheet,

  formulaDescription:
    "risers = ceil(total rise ÷ 7.75\"); riser = rise ÷ risers; treads = risers − 1; stringer = √(rise² + run²)",

  methodology: [
    "Riser count is the fewest equal risers that keeps every riser at or below the 7.75 inch maximum in IRC R311.7.5.1. Dividing total rise by that count produces equal risers by construction, which matters because R311.7.5.1 also limits variation between the tallest and shortest riser to 3/8 inch across the flight.",
    "Tread count is always one less than riser count: the deck surface itself serves as the top tread. Total run is tread count multiplied by tread run, and R311.7.5.2 sets the minimum run at 10 inches.",
    "Stringer length is the hypotenuse of total rise and total run. Stock length adds roughly a foot for the plumb and level cuts and rounds up to a purchasable even-foot board.",
    "Stringer count assumes spacing of 16 inches on center or less, appropriate for 5/4 decking treads; 2x treads can span further, but 16 inches remains the common build. Tread board counts assume 5/4x6 stock with a nominal face of 5.5 inches plus a drainage gap.",
    "The bottom riser is cut shorter by one tread thickness so that once treads are installed every riser measures the same. This single step is the most common first-build error and is drawn explicitly on the cut sheet.",
    "Stairs with a total rise over 30 inches require guards under IRC R312, and handrails follow R311.7.8. Local amendments can be stricter than the model code; the building department has the final word.",
  ],

  sources: [
    {
      name: "IRC R311.7 (Stairways), ICC Digital Codes",
      url: "https://codes.iccsafe.org/content/IRC2021P2/chapter-3-building-planning",
      note: "Riser, tread, width, and nosing limits every check on this page implements",
    },
    {
      name: "IRC R312 (Guards)",
      url: "https://codes.iccsafe.org/content/IRC2021P2/chapter-3-building-planning",
      note: "Guard requirement triggered above 30 inches of rise",
    },
    {
      name: "AWC Prescriptive Residential Deck Construction Guide (DCA 6)",
      url: "https://awc.org/publications/dca6/",
      note: "Stringer spacing, attachment, and deck stair framing details",
    },
    {
      name: "NADRA - Deck Safety",
      url: "https://www.nadra.org/consumers/deck-safety/",
      note: "Industry guidance on stair and guard failures found in deck inspections",
    },
  ],

  related: [
    { name: "Deck calculator", slug: "deck-calculator", description: "Boards, joists, and fasteners for the deck itself" },
    { name: "Stair calculator", slug: "stair-calculator", description: "Interior stair layout and code limits" },
    { name: "Lumber calculator", slug: "lumber-calculator", description: "Board feet for the stringer and tread order" },
    { name: "Concrete calculator", slug: "concrete-calculator", description: "The landing pad the stringers sit on" },
  ],

  howTo: {
    name: "How to lay out deck stair stringers",
    description:
      "Calculate and cut deck stair stringers in five steps, from measuring total rise to test-fitting the first stringer.",
    steps: [
      {
        name: "Measure total rise",
        text: "Measure from the top of the deck surface straight down to the finished landing. If the concrete pad is not poured yet, pour it first: guessing the landing height throws off every riser.",
      },
      {
        name: "Divide into equal risers",
        text: "Divide total rise by 7.75 inches and round up to get the riser count, then divide total rise by that count for the exact riser height. Every riser must be equal within 3/8 inch under IRC R311.7.5.1.",
      },
      {
        name: "Set the tread run",
        text: "Pick a run of at least 10 inches. Two 5/4x6 boards with a drainage gap land around 10.5 to 11 inches, which is why that is the standard deck stair run. Tread count is always one less than riser count.",
      },
      {
        name: "Lay out the stringer",
        text: "Set a framing square to riser height on the tongue and tread run on the blade, then step it down a 2x12 marking each triangle. Cut the bottom riser shorter by one tread thickness so the first step finishes level with the rest.",
      },
      {
        name: "Test fit before cutting the rest",
        text: "Cut one stringer, set it in place against the deck and the landing, and confirm the top plumb cut meets the rim and the bottom sits flat. Only then use it as the template for the remaining stringers.",
      },
    ],
  },

  faq: [
    {
      question: "How do I calculate deck stair stringers?",
      answer:
        "Divide total rise by 7.75 inches and round up for the riser count, then divide total rise by that count for exact riser height. Tread count is one less than riser count. Stringer length is the square root of rise squared plus run squared. The calculator above does all of it and prints a dimensioned cut sheet.",
    },
    {
      question: "What is the code for deck stairs?",
      answer:
        "IRC R311.7 governs: risers no taller than 7-3/4 inches, treads at least 10 inches deep, stairs at least 36 inches wide, and all risers equal within 3/8 inch. Rise over 30 inches requires guards (R312), and handrails follow R311.7.8. Local amendments can be stricter, so confirm with your building department.",
    },
    {
      question: "How much does it cost to build deck stairs?",
      answer:
        "DIY materials for a typical 4-to-5 step run cost $150-400 in pressure-treated lumber, or $350-800 in composite. Hiring it out runs $800-2,000 for a straight run including the landing pad, with labor at $50-90 per hour. Composite treads and a railing push the professional cost toward $2,500.",
    },
    {
      question: "How many stringers do deck stairs need?",
      answer:
        "Three for a 36 inch wide stair, spaced 16 inches on center or less with 5/4 decking treads. Wider stairs add a stringer every 16 inches. Under-spacing stringers is the cause of the bouncy, flexing treads people notice on older decks.",
    },
    {
      question: "Why is my bottom step shorter than the others?",
      answer:
        "The bottom riser has to be cut shorter by exactly one tread thickness. Once the tread is installed on top of it, that first step finishes the same height as the rest. Skipping this is the most common stringer layout mistake, and it leaves a first step an inch taller than every other one.",
    },
    {
      question: "What size lumber for deck stair stringers?",
      answer:
        "2x12 pressure-treated is standard; the notches cut into a 2x10 leave too little material behind them. Use ground-contact rated stock, since stringer bottoms sit near or on concrete, and keep at least 5 inches of uncut depth behind every notch.",
    },
    {
      question: "Do deck stairs need a landing?",
      answer:
        "Yes: stairs need a solid landing at the bottom, at least as wide as the stair and 36 inches deep in the direction of travel. A concrete pad, patio, or compacted gravel over a footing all work. Stringers resting on soil rot within a few seasons.",
    },
  ],
};
