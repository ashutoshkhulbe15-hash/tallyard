import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const shedCalculatorConfig: CalculatorConfig = {
  slug: "shed-calculator",
  title: "Shed Calculator",
  description:
    "Materials for any backyard shed: floor, walls, roof sheathing, and siding. Sized by shed footprint and wall height.",
  categoryLabel: "Lumber",
  category: "drywall",

  bannerHeadline: "Build sturdy.",
  bannerTags: ["Lumber + sheathing", "Floor · walls · roof", "Any footprint"],

  inputs: [
    {
      id: "length",
      label: "Shed length",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 10,
      defaultMetric: 3,
      min: 4,
      step: 1,
      help: "Standard sizes: 8, 10, 12 ft",
    },
    {
      id: "width",
      label: "Shed width",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 8,
      defaultMetric: 2.4,
      min: 4,
      step: 1,
    },
    {
      id: "wallHeight",
      label: "Wall height",
      type: "select",
      defaultImperial: 8,
      options: [
        { label: "6 ft (low)", value: 6 },
        { label: "8 ft (standard)", value: 8 },
        { label: "10 ft (tall)", value: 10 },
      ],
    },
    {
      id: "roofStyle",
      label: "Roof style",
      type: "select",
      defaultImperial: "gable",
      options: [
        { label: "Gable (peak in middle)", value: "gable" },
        { label: "Lean-to (single slope)", value: "leanto" },
        { label: "Gambrel (barn style)", value: "gambrel" },
      ],
    },
    {
      id: "studSpacing",
      label: "Stud spacing",
      type: "select",
      defaultImperial: 16,
      options: [
        { label: '16" OC (standard)', value: 16 },
        { label: '24" OC (economy)', value: 24 },
      ],
    },
  ],

  calculate: (values, units) => {
    const L = Number(values.length) || 0;
    const W = Number(values.width) || 0;
    const H = Number(values.wallHeight) || 8;
    const roofStyle = String(values.roofStyle || "gable");
    const studSpacing = Number(values.studSpacing) || 16;

    // Convert to feet if metric
    const lengthFt = units === "metric" ? L * 3.281 : L;
    const widthFt = units === "metric" ? W * 3.281 : W;

    // Floor area
    const floorArea = lengthFt * widthFt;
    const floorJoists = Math.ceil((widthFt * 12) / 16) + 1; // 16" OC joists spanning width
    const floorJoistLength = floorJoists * lengthFt;
    const floorJoistBoards = Math.ceil(floorJoistLength / 12); // 12-ft boards
    const floorRimBoards = 2; // front and back rim joist
    const floorRimLength = 2 * lengthFt;
    const floorSheathingSheets = Math.ceil(floorArea / 32); // 4×8 plywood

    // Wall framing
    const perimeter = 2 * (lengthFt + widthFt);
    const studsOnCenter = Math.ceil((perimeter * 12) / studSpacing) + 4; // +4 for corner doubles
    // Each stud = wall height - ~3" for top/bottom plates = typically 8-ft studs for 8-ft walls
    // Top plate (double) + bottom plate: 2 × perimeter linear feet × 2 layers = 4 × perimeter
    const platesLinearFt = 3 * perimeter; // 2 top + 1 bottom plates
    const platesBoards = Math.ceil(platesLinearFt / 16); // 16-ft boards typical

    // Wall sheathing (7/16 OSB or 1/2 plywood, 4×8 sheets)
    const wallArea = perimeter * H;
    const wallSheathingSheets = Math.ceil(wallArea / 32);

    // Roof framing
    let rafterCount = 0;
    let rafterLengthEach = 0;
    let roofSheathingArea = 0;

    if (roofStyle === "gable") {
      // Rafters: pairs running from eaves to ridge
      // Assume 6/12 pitch, rafter length = √((width/2)² + (width/2 × 0.5)²) + 1 ft overhang
      const run = widthFt / 2;
      const rise = run * 0.5; // 6/12 pitch
      rafterLengthEach = Math.sqrt(run * run + rise * rise) + 1;
      rafterCount = Math.ceil((lengthFt * 12) / 24) * 2 + 2; // pairs @ 24" OC + end rafters
      // Roof area for sheathing: 2 × slope length × length
      const slopeLength = Math.sqrt(run * run + rise * rise);
      roofSheathingArea = 2 * slopeLength * lengthFt;
    } else if (roofStyle === "leanto") {
      // Single slope: rafter length = width × 1.1 (slight slope) + 1 ft overhang
      rafterLengthEach = widthFt * 1.1 + 1;
      rafterCount = Math.ceil((lengthFt * 12) / 24) + 1;
      roofSheathingArea = rafterLengthEach * lengthFt;
    } else {
      // Gambrel: 4 slopes, more complex. Rough estimate: 1.7× floor area
      rafterLengthEach = widthFt * 0.6; // simplified
      rafterCount = Math.ceil((lengthFt * 12) / 24) * 4 + 4;
      roofSheathingArea = floorArea * 1.7;
    }

    const rafterTotalLength = rafterCount * rafterLengthEach;
    const rafterBoards = Math.ceil(rafterTotalLength / 12);
    const roofSheathingSheets = Math.ceil(roofSheathingArea / 32);

    // Shingles (at 3 bundles per square + 10% waste)
    const roofingSquares = roofSheathingArea / 100;
    const shingleBundles = Math.ceil(roofingSquares * 3 * 1.1);

    // Siding (same area as wall sheathing, 10% waste): squares or sheets
    const sidingSheets = Math.ceil((wallArea * 1.1) / 32); // if T1-11 or equivalent

    return {
      value: Math.ceil(floorArea),
      unit: "ft² footprint",
      valueRounded: Math.ceil(floorArea),
      breakdown: [
        { label: "floor joists (2×6)", value: `${floorJoistBoards} × 12-ft` },
        { label: "floor sheathing (3/4\" T&G)", value: `${floorSheathingSheets} sheets` },
        { label: "wall studs (2×4)", value: `${studsOnCenter}` },
        { label: "wall plates (2×4)", value: `${platesBoards} × 16-ft` },
        { label: "wall sheathing (4×8)", value: `${wallSheathingSheets} sheets` },
        { label: "rafters (2×6)", value: `${rafterCount} @ ${round(rafterLengthEach, 1)}-ft` },
        { label: "roof sheathing (4×8)", value: `${roofSheathingSheets} sheets` },
        { label: "shingle bundles", value: `${shingleBundles}` },
        { label: "siding (4×8)", value: `${sidingSheets} sheets` },
      ],
      formulaSteps: [
        `floor: ${lengthFt} × ${widthFt} = ${round(floorArea, 1)} ft² footprint`,
        `floor joists: ⌈(${widthFt} × 12) ÷ 16⌉ + 1 = ${floorJoists}; total linear ft = ${floorJoists} × ${lengthFt} = ${round(floorJoistLength, 0)}`,
        `floor sheathing: ${round(floorArea, 0)} ÷ 32 = ${floorSheathingSheets} sheets of 4×8`,
        `walls: perimeter = ${round(perimeter, 1)} ft, height = ${H} ft`,
        `studs (${studSpacing}" OC): ⌈${perimeter} × 12 ÷ ${studSpacing}⌉ + 4 corners = ${studsOnCenter}`,
        `wall sheathing: ${round(perimeter * H, 0)} ft² ÷ 32 = ${wallSheathingSheets} sheets`,
        `roof (${roofStyle}): ${round(roofSheathingArea, 0)} ft² total surface`,
        `rafters: ${rafterCount} @ ${round(rafterLengthEach, 1)} ft = ${round(rafterTotalLength, 0)} linear ft`,
        `roof sheathing: ${roofSheathingSheets} sheets`,
        `shingles: ${round(roofingSquares, 1)} squares × 3 bundles × 1.1 = ${shingleBundles} bundles`,
      ],
    };
  },

  formulaDescription:
    "floor + walls + roof framing + sheathing for any shed footprint and wall height",

  methodology: [
    "Shed construction has four systems: floor (joists + sheathing on a base), walls (studs + plates + sheathing), roof (rafters + sheathing + shingles), and siding (exterior finish). The calculator estimates each from just length, width, wall height, and roof style.",
    "Floor: 2×6 joists spaced 16\" on center spanning the width, supported by perimeter rim joists. Floor sheathing is 3/4\" tongue-and-groove plywood or OSB, 4×8 sheets. For a 10×8 shed: 7 joists spanning 8 ft each, 3 sheets of sheathing. Most shed floors sit on pressure-treated 4×4 skids or a concrete slab.",
    "Walls: 2×4 studs 16\" on center with doubled top plates and a single bottom plate. Corner studs are doubled or tripled for rigidity. For an 8-ft wall, use 8-foot pre-cut studs (actually 92-5/8\"). Wall sheathing is 7/16\" OSB or 1/2\" plywood in 4×8 sheets. Door and window openings subtract studs but add headers — the calculator doesn't model openings; budget extra material for them.",
    "Roof: gable (most common) has rafters running from eaves to a ridge board. Assuming 6/12 pitch (standard shed pitch), rafter length is √(run² + rise²) plus a 1-foot overhang. Rafters 24\" on center for most sheds. Roof sheathing is 7/16\" OSB, 4×8 sheets. Shingles at 3 bundles per square plus 10% waste.",
    "Lean-to roof is simpler: a single slope from a high wall down to a low wall. Uses fewer materials than a gable. Common for small sheds against an existing structure. Gambrel (barn-style) uses 4 slopes to maximize interior storage height — more rafters, more sheathing, more complex framing, but the extra roof surface is useful headroom.",
    "Not included: foundation (concrete slab, gravel pad, or skid foundation), interior finishing (drywall, insulation, electrical — use those respective calculators), doors and windows (subtract material for openings but add headers and trim), fasteners (nails, screws, hurricane ties), and paint or stain. Budget 20-30% more in materials cost beyond this framing list.",
  ],

  sources: [
    {
      name: "IRC 2021 — Detached Accessory Structures",
      url: "https://codes.iccsafe.org/",
      note: "Code requirements for sheds and outbuildings",
    },
    {
      name: "APA Engineered Wood — Shed Design",
      url: "https://www.apawood.org/",
      note: "Engineered wood construction references",
    },
  ],

  related: [
    { name: "Lumber calculator", slug: "lumber-calculator", description: "Board feet for any framing" },
    { name: "Deck calculator", slug: "deck-calculator", description: "Boards, joists, fasteners" },
    { name: "Roofing calculator", slug: "roofing-calculator", description: "Shingles for any pitch" },
    { name: "Concrete calculator", slug: "concrete-calculator", description: "Slab or footing foundations" },
  ],

  faq: [
    {
      question: "How much material do I need for a 10×8 shed?",
      answer:
        "For a standard 10×8 shed with 8-ft walls and a gable roof, you need roughly: 6-8 floor joists, 3 sheets floor sheathing, 40 wall studs, 9 sheets wall sheathing, 10-12 rafters, 6 sheets roof sheathing, 6-7 bundles of shingles, and 9 sheets of siding. Exact counts depend on door/window count and specific design.",
    },
    {
      question: "What's the cheapest shed to build?",
      answer:
        "Lean-to style with T1-11 siding (no separate sheathing), 24\" OC stud spacing, gravel pad instead of concrete, and asphalt shingles. DIY materials for a 10×8 lean-to shed: $800-1,500. Same size gable shed: $1,200-2,000. Gambrel (barn): $1,800-3,000 for materials. Add 50-100% if hiring contractors.",
    },
    {
      question: "Do I need a permit?",
      answer:
        "Depends on your jurisdiction. Most US codes exempt sheds under 120 sq ft (a 10×12 or smaller). Over that, permits required. Electrical wiring or plumbing always requires permits. HOA restrictions may apply regardless of permits. Check before building — retroactive permits cost more than original.",
    },
    {
      question: "What foundation does a shed need?",
      answer:
        "For small sheds (under 100 sq ft): gravel pad (4-6 inches compacted crushed stone) with pressure-treated 4×4 skids. For medium sheds (100-200 sq ft): concrete piers at each corner and mid-span + skid beams. For large sheds (200+ sq ft) or in freeze/frost areas: concrete slab or perimeter footings below frost line.",
    },
    {
      question: "Should I use OSB or plywood for sheathing?",
      answer:
        "Both work. OSB is 20-30% cheaper and standard in modern construction. Plywood is slightly more resistant to moisture and slightly stronger. For a budget shed, OSB is fine. If the shed might get wet during construction or has poor ventilation, plywood is safer. Both need to be covered promptly with siding and roofing.",
    },
    {
      question: "What pitch should my shed roof be?",
      answer:
        "3/12 to 4/12 for a subtle lean-to. 6/12 standard for gable (matches common residential houses). 8/12 for steeper, more aggressive gable or gambrel. Higher pitch sheds more rain and snow, looks taller, but uses more material. In snow regions (Northern US, mountains), go 6/12+ minimum.",
    },
    {
      question: "Can I skip the roof sheathing?",
      answer:
        "Not for asphalt shingles — they need a solid nailing surface. You can skip sheathing if you use metal roofing with purlins (horizontal boards every 24\" across the rafters). Metal roofing costs more per square foot but saves on sheathing material. For wood shakes or shingles, sheathing is optional but recommended for weatherproofing.",
    },
    {
      question: "What about insulation and drywall?",
      answer:
        "Not included in this calculator. For insulated sheds (workshop or hobby spaces): budget additional batt insulation (see insulation calculator for R-13 walls, R-19 ceiling), interior drywall or wood paneling, and electrical wiring. Insulating a 10×8 shed adds $400-800 in materials. Worth it if you'll use the shed in winter.",
    },
  ],
};
