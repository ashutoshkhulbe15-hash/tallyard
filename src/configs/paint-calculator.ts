import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const paintCalculatorConfig: CalculatorConfig = {
  slug: "paint-calculator",
  title: "Paint Calculator",
  description:
    "Estimate wall paint from room dimensions, coats, and coverage. Optionally include the ceiling and check the selected product label before buying.",
  categoryLabel: "Paint",
  category: "paint",

  bannerHeadline: "Paint smarter.",
  bannerTags: ["Accounts for doors", "Accounts for windows", "ft·gal or m·L"],

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
      id: "height",
      label: "Ceiling height",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 9,
      defaultMetric: 2.7,
      min: 1,
      step: 0.5,
    },
    {
      id: "coats",
      label: "Number of coats",
      type: "select",
      defaultImperial: 2,
      options: [
        { label: "1 coat", value: 1 },
        { label: "2 coats", value: 2 },
        { label: "3 coats", value: 3 },
      ],
    },
    {
      id: "coverage",
      label: "Coverage from product label",
      type: "number",
      unitImperial: "ft²/gal",
      unitMetric: "m²/L",
      defaultImperial: 350,
      defaultMetric: 8.6,
      min: 0.01,
      step: 0.1,
      help: "Example coverage only; replace it with the exact product's rate for your surface and application.",
    },
    {
      id: "includeCeiling",
      label: "Include ceiling?",
      type: "select",
      defaultImperial: "no",
      options: [
        { label: "No: walls only", value: "no" },
        { label: "Yes: add ceiling", value: "yes" },
      ],
    },
    {
      id: "doors",
      label: "Doors to subtract",
      type: "number",
      defaultImperial: 1,
      min: 0,
      step: 1,
      help: "Each door ≈ 21 sq ft / 2 sq m",
    },
    {
      id: "windows",
      label: "Windows to subtract",
      type: "number",
      defaultImperial: 2,
      min: 0,
      step: 1,
      help: "Each window ≈ 15 sq ft / 1.4 sq m",
    },
  ],

  calculate: (values, units) => {
    const L = Number(values.length) || 0;
    const W = Number(values.width) || 0;
    const H = Number(values.height) || 0;
    const coats = Number(values.coats) || 2;
    const includeCeiling = String(values.includeCeiling || "no") === "yes";
    const doors = Number(values.doors) || 0;
    const windows = Number(values.windows) || 0;

    const doorAreaImperial = 21;
    const doorAreaMetric = 21 * 0.09290304;
    const windowAreaImperial = 15;
    const windowAreaMetric = 15 * 0.09290304;

    const doorArea = units === "metric" ? doorAreaMetric : doorAreaImperial;
    const windowArea = units === "metric" ? windowAreaMetric : windowAreaImperial;
    const coverage = Number(values.coverage ?? (units === "metric" ? 8.6 : 350));
    if (!Number.isFinite(coverage) || coverage <= 0) throw new Error("Enter positive coverage from the selected product label.");

    const perimeter = 2 * (L + W);
    const grossWallArea = perimeter * H;
    const doorSubtract = doors * doorArea;
    const windowSubtract = windows * windowArea;
    const subtractions = doorSubtract + windowSubtract;
    const netWallArea = Math.max(0, grossWallArea - subtractions);

    const ceilingArea = includeCeiling ? L * W : 0;
    const paintSurfaceArea = netWallArea + ceilingArea;
    const paintNeeded = (paintSurfaceArea * coats) / coverage;

    const unitLabel = units === "metric" ? "liters" : "gallons";
    const areaUnit = units === "metric" ? "sq m" : "sq ft";
    const coverageLabel =
      units === "metric" ? `${coverage} sq m/L` : `${coverage} sq ft/gal`;

    // Composition: walls (net), doors (subtracted), windows (subtracted)
    // For the bar we show the components of the gross wall area — what's
    // being painted (net walls) vs what's deducted (doors + windows).
    const wallsOnly = netWallArea;

    return {
      value: round(paintNeeded, 3),
      unit: unitLabel,
      valueRounded: roundUp(paintNeeded, 0),
      breakdown: [
        { label: "net wall area", value: `${formatNumber(round(netWallArea, 1))} ${areaUnit}` },
        ...(includeCeiling ? [{ label: "ceiling area", value: `${formatNumber(round(ceilingArea, 1))} ${areaUnit}` }] : []),
        { label: "painted area", value: `${formatNumber(round(paintSurfaceArea, 1))} ${areaUnit}` },
        { label: "coats", value: `${coats}` },
        { label: "coverage", value: coverageLabel },
      ],
      formulaSteps: [
        `perimeter = 2 × (${L} + ${W}) = ${formatNumber(perimeter)} ${units === "metric" ? "m" : "ft"}`,
        `gross wall area = ${formatNumber(perimeter)} × ${H} = ${formatNumber(round(grossWallArea, 1))} ${areaUnit}`,
        subtractions > 0
          ? `subtractions = (${doors} × ${doorArea}) + (${windows} × ${windowArea}) = ${formatNumber(round(subtractions, 1))} ${areaUnit}`
          : `subtractions = 0 ${areaUnit}`,
        `net wall area = ${formatNumber(round(grossWallArea, 1))} − ${formatNumber(round(subtractions, 1))} = ${formatNumber(round(netWallArea, 1))} ${areaUnit}`,
        ...(includeCeiling ? [`ceiling area = ${L} × ${W} = ${formatNumber(round(ceilingArea, 1))} ${areaUnit}`] : []),
        `paint = (${formatNumber(round(paintSurfaceArea, 1))} × ${coats}) ÷ ${coverage} = ${formatNumber(round(paintNeeded, 3))} ${unitLabel}`,
        `rounded up to ${formatNumber(roundUp(paintNeeded, 0))} whole ${unitLabel} for a simple purchase estimate`,
      ],
      composition: {
        unit: areaUnit,
        total: round(grossWallArea, 1),
        segments: [
          { label: "Walls", amount: round(wallsOnly, 1), shade: "primary" },
          { label: "Doors", amount: round(doorSubtract, 1), shade: "secondary" },
          { label: "Windows", amount: round(windowSubtract, 1), shade: "tertiary" },
        ],
      },
    };
  },

  formulaDescription:
    "paint = (perimeter × height − doors − windows + optional ceiling area) × coats ÷ coverage",

  methodology: [
    "Wall area is calculated as perimeter times height minus the entered door and window deductions. If selected, ceiling area (length × width) is added. The resulting area is multiplied by coats and divided by the coverage assumption.",
    "Coverage is entered by the user. The example defaults of 350 square feet per gallon or approximately 8.6 square meters per liter are planning assumptions; replace them with the selected product label's rate for the surface and application.",
    "The exact theoretical amount is shown with a rounded-up whole-gallon or whole-liter estimate. Container sizes can vary, and a smaller container may suit the remaining fraction.",
    "The ceiling is excluded unless the optional ceiling input is selected. Door and window deductions apply only to walls.",
  ],

  sources: [
    {
      name: "Benjamin Moore: Paint Coverage Chart",
      url: "https://www.benjaminmoore.com/en-us/paint-colors/paint-coverage",
      note: "General coverage guidance; use the exact product's published coverage rather than a universal rate.",
    },
    {
      name: "Sherwin-Williams: How Much Paint Do I Need",
      url: "https://www.sherwin-williams.com/homeowners/color/painting-tips/how-much-paint-do-i-need",
      note: "Reference for coverage assumptions and coat recommendations",
    },
  ],

  related: [
    { name: "Drywall calculator", slug: "drywall-calculator", description: "Sheets for walls before painting" },
    { name: "Siding calculator", slug: "siding-calculator", description: "Exterior siding and trim coverage" },
    { name: "Wallpaper calculator", slug: "wallpaper-calculator", description: "Rolls and pattern repeat for an accent wall" },
    { name: "Tile calculator", slug: "tile-calculator", description: "Tiles and boxes for floors and walls" },
  ],

  faq: [
    {
      question: "How many gallons of paint do I need for an average room?",
      answer:
        "For a 12 × 14 ft room with 8 ft walls, one 21 sq ft door, two 15 sq ft windows, and two coats at 350 sq ft/gal, the calculated wall amount is about 2.1 gallons before rounding. The displayed purchase estimate rounds up to 3 whole gallons. Actual use depends on the product, surface, and application.",
    },
    {
      question: "Should I buy one or two coats' worth?",
      answer:
        "Follow the paint manufacturer's label and project specification for the coat count. Color change, surface condition, primer, and product coverage can affect how many coats are needed.",
    },
    {
      question: "How much extra paint should I buy?",
      answer:
        "The rounded result is only a planning amount. Texture, porosity, waste, and application method can change actual use. Check the product label and ask the installer about unusual surfaces.",
    },
    {
      question: "Does this calculator include the ceiling?",
      answer:
        "By default it covers walls only. Select 'Yes: add ceiling' to include length × width as ceiling area. Check the selected product label for expected coverage.",
    },
    {
      question: "Why does paint cover less than the can says?",
      answer:
        "Coverage varies with coating, substrate, texture, application method, and film thickness. The default 350 sq ft/gal is only a planning assumption; use the product label for a closer estimate.",
    },
    {
      question: "What if my walls have a heavy texture?",
      answer:
        "This calculator does not measure texture or porosity. Use a product-specific coverage estimate for the surface, or adjust the coverage input assumption based on a test area or installer guidance.",
    },
    {
      question: "How accurate is the 350 sq ft per gallon number?",
      answer:
        "It is a default planning assumption, not a promise. Check the exact product label and adjust the coverage assumption if the label differs.",
    },
    {
      question: "Do I need primer? Does the calculator include it?",
      answer:
        "The calculator estimates finish paint only. Primer selection depends on the substrate, stains, prior coating, and product system; follow the coating manufacturer's directions and price primer separately if required.",
    },
  ],
  relatedGuides: [
    { name: "Vinyl vs fiber cement siding", slug: "vinyl-vs-fiber-cement-siding", description: "Compare siding materials and installation considerations" },
  ],
};
