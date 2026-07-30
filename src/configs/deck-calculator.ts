import { DeckCalculatorExpansion } from "@/content/deck-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const deckCalculatorConfig: CalculatorConfig = {
  slug: "deck-calculator",
  title: "Deck Calculator",
  description:
    "Deck boards, joists, beams, and fasteners for any size deck. Accounts for board width, joist spacing, and the support frame.",
  categoryLabel: "Landscaping",
  category: "landscaping",

  bannerHeadline: "Deck solidly.",
  bannerTags: ["Boards + frame", "Any joist spacing", "Screws or hidden"],

  inputs: [
    {
      id: "length",
      label: "Deck length",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 16,
      defaultMetric: 4.9,
      min: 4,
      step: 1,
    },
    {
      id: "width",
      label: "Deck width",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 12,
      defaultMetric: 3.7,
      min: 4,
      step: 1,
    },
    {
      id: "boardWidth",
      label: "Decking board width",
      type: "select",
      defaultImperial: 5.5,
      options: [
        { label: "5.5\" (2×6 nominal)", value: 5.5 },
        { label: "5.25\" (composite)", value: 5.25 },
        { label: "3.5\" (2×4 nominal)", value: 3.5 },
      ],
    },
    {
      id: "joistSpacing",
      label: "Joist spacing",
      type: "select",
      defaultImperial: 16,
      options: [
        { label: '12" OC (wood composite)', value: 12 },
        { label: '16" OC (standard)', value: 16 },
        { label: '24" OC (PT lumber only)', value: 24 },
      ],
      help: "Composite boards require 16\" or less; 12\" for diagonal layouts",
    },
    {
      id: "fastener",
      label: "Fastener type",
      type: "select",
      defaultImperial: "screws",
      options: [
        { label: "Deck screws (visible)", value: "screws" },
        { label: "Hidden fasteners", value: "hidden" },
      ],
    },
  ],

  calculate: (values, units) => {
    const L = Number(values.length) || 0;
    const W = Number(values.width) || 0;
    const boardWidth = Number(values.boardWidth) || 5.5;
    const joistSpacing = Number(values.joistSpacing) || 16;
    const fastener = String(values.fastener || "screws");

    // Convert to feet if metric
    const lengthFt = units === "metric" ? L * 3.281 : L;
    const widthFt = units === "metric" ? W * 3.281 : W;

    // Area
    const areaSqFt = lengthFt * widthFt;

    // Boards: running perpendicular to joists, typically along the length
    // Board coverage = board width in ft with 1/8" gap
    const boardCoverageFt = (boardWidth + 0.125) / 12;
    const rowsOfBoards = Math.ceil(widthFt / boardCoverageFt);
    // Each row spans the length; boards sold in 8, 12, 16 ft lengths
    // For simplicity: total linear feet of decking = rows × length
    const linearFtBoards = rowsOfBoards * lengthFt;
    // Number of 16-ft boards needed (with 10% waste)
    const boards16ft = Math.ceil((linearFtBoards * 1.1) / 16);

    // Joists: spaced at joistSpacing inches, running perpendicular to boards
    // Number of joists = (length / spacing) + 1, each joist spans the width
    const joistCount = Math.ceil((lengthFt * 12) / joistSpacing) + 1;
    const linearFtJoists = joistCount * widthFt;
    const joists16ft = Math.ceil(linearFtJoists / 16);

    // Beams: typically 2, running full length, doubled 2×8 or 2×10
    // Assume: 2 beams, each consisting of 2 plies
    const beamPlies = 2 * 2; // 2 beams × 2 plies each
    const linearFtBeams = beamPlies * lengthFt;
    const beams16ft = Math.ceil(linearFtBeams / 16);

    // Fasteners
    // Screws: 4 per board per joist (~40-50 per 16 sq ft)
    // Hidden: 1 clip per joist per board
    let fastenerCount: number;
    let fastenerLabel: string;
    if (fastener === "screws") {
      // 4 screws per board row × joist count × avg boards per row
      fastenerCount = Math.ceil(rowsOfBoards * joistCount * 2);
      fastenerLabel = "deck screws";
    } else {
      fastenerCount = Math.ceil(rowsOfBoards * joistCount);
      fastenerLabel = "hidden clips";
    }

    // Posts: approximately 1 per 80 sq ft for basic spacing
    const posts = Math.max(4, Math.ceil(areaSqFt / 80));

    return {
      value: boards16ft,
      unit: boards16ft === 1 ? "16' board" : "16' boards",
      valueRounded: boards16ft,
      breakdown: [
        { label: "area", value: `${formatNumber(round(areaSqFt, 0))} sq ft` },
        { label: "deck boards", value: `${boards16ft} × 16'` },
        { label: "joists", value: `${joists16ft} × 16'` },
        { label: "beams", value: `${beams16ft} × 16'` },
        { label: "posts", value: `${posts}` },
        { label: fastenerLabel, value: `${fastenerCount}` },
      ],
      formulaSteps: [
        `area = ${lengthFt} × ${widthFt} = ${formatNumber(round(areaSqFt, 0))} sq ft`,
        `board coverage = ${boardWidth}" + 1/8" gap = ${formatNumber(round(boardCoverageFt * 12, 3))}" per row`,
        `rows of boards = ⌈${widthFt} ÷ ${formatNumber(round(boardCoverageFt, 3))}⌉ = ${rowsOfBoards}`,
        `linear ft of decking = ${rowsOfBoards} × ${lengthFt} = ${formatNumber(round(linearFtBoards, 0))} ft`,
        `16' boards = ⌈${formatNumber(round(linearFtBoards, 0))} × 1.1 ÷ 16⌉ = ${boards16ft} boards`,
        `joists @ ${joistSpacing}" OC = ⌈${lengthFt * 12} ÷ ${joistSpacing}⌉ + 1 = ${joistCount} joists`,
        `beams = 2 beams × 2 plies × ${lengthFt} ft = ${formatNumber(round(linearFtBeams, 0))} linear ft`,
        `${fastenerLabel} = ${fastenerCount}`,
      ],
    };
  },

  ContentExpansion: DeckCalculatorExpansion,

  formulaDescription:
    "boards = ⌈area ÷ board coverage × 1.1 ÷ 16⌉; joists = ⌈length ÷ spacing⌉ + 1",

  methodology: [
    "Deck boards: the calculator assumes boards run perpendicular to the joists (standard orientation). Board count is derived from deck width divided by effective board coverage (actual width plus a 1/8\" gap for expansion). Total linear feet converts to 16-foot board count with 10% waste, which is standard for straight-cut installations.",
    "Joists: spaced at the specified on-center distance, running perpendicular to the decking. Joist count is the length of the deck divided by spacing, plus one for the closing joist. All joists span the full width. Composite decking requires 12-inch or 16-inch spacing; pressure-treated 2×6 decking can span 24 inches if solid (but not preferred).",
    "Beams are the horizontal members running under the joists, transferring loads to the posts. Most residential decks use doubled (2-ply) 2×8 or 2×10 beams. The calculator assumes 2 beams at 2 plies each, running the full length: this covers typical deck framing but is approximate. Complex deck shapes require more beams.",
    "Posts: rough estimate of one 4×4 or 6×6 post per 80 square feet of deck area. Actual post count depends on beam span capacity, which depends on beam size and wood species. For engineered accuracy, consult the International Residential Code (IRC) 2021 prescriptive tables or have a pro design.",
    "Fasteners: visible deck screws at 2 per board per joist (front and back of board), or hidden fasteners at 1 clip per board per joist. Hidden fasteners cost 3-5× more and add an hour per 100 sq ft of install time but deliver a cleaner finished look.",
    "Not included: ledger board (attaches deck to house), flashing (critical for ledger waterproofing), joist hangers (one per joist end), knee braces for lateral stability, railing posts and balusters (calculate separately), and stairs. These add significantly to material cost: budget 30-40% more than the calculator's output for a complete build.",
  ],

  sources: [
    {
      name: "AWC DCA 6: Prescriptive Residential Deck Construction Guide",
      url: "https://awc.org/publications/dca6/",
      note: "Free guide governing joist and beam spans, ledger attachment, and footing sizing",
    },
    {
      name: "IRC Section R507 (Exterior Decks)",
      url: "https://codes.iccsafe.org/content/IRC2021P2/chapter-5-floors",
      note: "Adopted code provisions for deck framing, ledger connection, and lateral load",
    },
    {
      name: "IRC Section R311.7 and R312 (Stairs and Guards)",
      url: "https://codes.iccsafe.org/content/IRC2021P2/chapter-3-building-planning",
      note: "Guard requirement above 30 inches and stair geometry for deck stairs",
    },
    {
      name: "NADRA Deck Safety and Inspection Guidance",
      url: "https://www.nadra.org/consumers/deck-safety/",
      note: "Industry data on ledger and connection failures found in deck inspections",
    },
    {
      name: "AWC Span Calculator",
      url: "https://awc.org/codes-standards/calculators-software/spancalc/",
      note: "Official tool for verifying joist and beam spans for a specific species and grade",
    },
  ],

  related: [
    { name: "Concrete calculator", slug: "concrete-calculator", description: "For deck footings" },
    { name: "Deck stair calculator", slug: "deck-stair-calculator", description: "Stringer cut sheet with IRC checks" },
    { name: "Shed calculator", slug: "shed-calculator", description: "Framing and sheathing for a shed" },
    { name: "Lumber calculator", slug: "lumber-calculator", description: "Board feet for framing" },
  ],

  howTo: {
    name: "How to calculate deck materials",
    description: "Work out decking boards, joists, beams, posts, and fasteners for a deck in five steps, starting from the surface material rather than the frame.",
    steps: [
      { name: "Choose the decking board first", text: "Pick the surface material before framing anything. Composite brands set their own maximum joist spacing, commonly 16 inches on center for straight lay and 12 inches for a 45 degree pattern, and that requirement drives the entire frame." },
      { name: "Measure and set the frame layout", text: "Enter deck length and width along with the joist spacing your decking requires. Long shallow decks along the house cost less per square foot than square decks, because deeper decks need an intermediate beam and another row of footings." },
      { name: "Count decking boards by length", text: "Divide deck width by the actual board coverage, including the gap between boards, then match board length to the deck run so full boards span without seams. Buying 16 foot boards for a 16 foot deck wastes far less than 12 foot boards." },
      { name: "Add framing, footings, and fasteners", text: "Add joists at the required spacing, beams and posts per DCA 6 span tables, and footings below the local frost line. Use fasteners rated for the decking: stainless or coated screws for pressure-treated, hidden clips for grooved composite." },
      { name: "Price stairs, railing, and permit separately", text: "Guards are required above a 30 inch drop and are quoted per linear foot. Stairs are their own calculation under IRC R311.7. Both are commonly missing from a deck quote, and both are required for a permit." },
    ],
  },

  faq: [
    {
      question: "How much does it cost to build a deck in 2026?",
      answer:
        "$30-50 per square foot installed for pressure-treated and $50-80 for composite. A 12×16 deck runs about $5,800-9,600 in pressure-treated or $9,600-15,400 in composite. Railing ($25-60 per linear foot) and stairs ($800-2,200) are quoted separately and are the two items most often missing from a comparison.",
    },
    {
      question: "How is a deck ledger supposed to be attached?",
      answer:
        "With through-bolts or approved structural screws in a staggered pattern per IRC R507.9 and AWC DCA 6, never with nails, and with flashing above it to divert water out over the siding. Ledger failures account for a large share of reported deck collapses, and they are the first thing an inspector checks.",
    },
    {
      question: "How many deck boards do I need for a 12×16 deck?",
      answer:
        "For a 12×16 ft deck (192 sq ft) using 5.5\"-wide boards (2×6 nominal), you need about 28 boards at 16 feet long, or 42 boards at 12 feet long. Composite boards (5.25\" actual) need slightly more. Use the calculator above for exact numbers based on your board width.",
    },
    {
      question: "What joist spacing should I use?",
      answer:
        "Standard pressure-treated 2×6 decking: 16\" on center for straight boards, 12\" for diagonal layouts. All composite decking: 16\" maximum (some require 12\"). Wider spacing causes bounce, long-term sag, and voids the composite warranty. Always check the composite manufacturer's spec: they vary.",
    },
    {
      question: "Do I need hidden fasteners?",
      answer:
        "Not required, but preferred for composite decking for a cleaner look (no screw heads visible). For pressure-treated lumber, standard deck screws are fine and significantly cheaper. Hidden fasteners cost $0.15-0.30 per clip vs $0.03 per screw. Labor is similar with modern systems.",
    },
    {
      question: "How far can my beams span?",
      answer:
        "Depends on beam size and wood species. Typical residential: doubled 2×8 spans 8 feet, doubled 2×10 spans 10 feet, doubled 2×12 spans 12 feet. Longer spans require LVL or triple plies. The calculator assumes typical spacing but doesn't verify span, always cross-check with IRC tables.",
    },
    {
      question: "What's the difference between 16' and 12' board lengths?",
      answer:
        "16-foot boards produce fewer end-to-end seams on long decks, which looks cleaner and is slightly stronger. 12-foot boards are easier to handle solo and cheaper per board. For a 16-foot-long deck, 16-foot boards have no butt joints at all, just one continuous board per row.",
    },
    {
      question: "Do I need ledger flashing?",
      answer:
        "Critical and not optional for decks attached to the house. A proper ledger installation includes: house wrap cut and folded behind the ledger, metal Z-flashing over the top edge, rubber flashing at both ends. Poor flashing causes hidden water damage to house walls that can be $10,000+ to repair.",
    },
    {
      question: "Can I calculate without the frame?",
      answer:
        "The calculator's boards-only count (ignoring joists and beams) is accurate for replacing existing decking where the frame is already in place. For new decks, you need the full materials list. For decks being resurfaced over old framing, inspect the joists and beams for rot: replace anything soft.",
    },
    {
      question: "How many posts do I need?",
      answer:
        "Rough rule: one post per 80-100 sq ft of deck for basic spacing. Actual post count depends on beam capacity. Most decks have 4-6 posts on the outside perimeter (beam support) plus a ledger attachment to the house on the fourth side. Freestanding decks need posts on all four sides.",
    },
  ],
  relatedGuides: [
    { name: "Composite vs PT vs cedar decking", slug: "composite-vs-pressure-treated-vs-cedar-deck", description: "20-year cost breakdown for all three decking materials" },
  ],
};
