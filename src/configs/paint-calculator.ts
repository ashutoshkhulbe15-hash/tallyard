import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const paintCalculatorConfig: CalculatorConfig = {
  slug: "paint-calculator",
  title: "Paint Calculator",
  description:
    "Calculate how many gallons of paint you need for any room. Uses standard paint coverage of 350 sq ft per gallon, with optional subtraction for doors and windows.",
  category: "Paint",

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
        { label: "2 coats (standard)", value: 2 },
        { label: "3 coats", value: 3 },
      ],
    },
    {
      id: "doors",
      label: "Doors to subtract",
      type: "number",
      defaultImperial: 1,
      min: 0,
      step: 1,
      help: "Each door ≈ 21 sq ft",
    },
    {
      id: "windows",
      label: "Windows to subtract",
      type: "number",
      defaultImperial: 2,
      min: 0,
      step: 1,
      help: "Each window ≈ 15 sq ft",
    },
  ],

  calculate: (values, units) => {
    const L = Number(values.length) || 0;
    const W = Number(values.width) || 0;
    const H = Number(values.height) || 0;
    const coats = Number(values.coats) || 2;
    const doors = Number(values.doors) || 0;
    const windows = Number(values.windows) || 0;

    // Coverage rate: paint cans standardly list 350-400 sq ft per gallon.
    // For metric: approximately 10 sq m per liter (based on 1 gal ≈ 3.785 L,
    // 350 sq ft ≈ 32.5 sq m → ~8.6 sq m/L, rounded to 9 for clarity).
    const coverageImperial = 350; // sq ft per gallon
    const coverageMetric = 9; // sq m per liter

    // Door and window subtraction areas
    const doorAreaImperial = 21; // sq ft per door (standard 3×7)
    const doorAreaMetric = 2; // sq m per door
    const windowAreaImperial = 15; // sq ft per window (standard 3×5)
    const windowAreaMetric = 1.4; // sq m per window

    const doorArea = units === "metric" ? doorAreaMetric : doorAreaImperial;
    const windowArea = units === "metric" ? windowAreaMetric : windowAreaImperial;
    const coverage = units === "metric" ? coverageMetric : coverageImperial;

    // Wall area = perimeter × height
    const perimeter = 2 * (L + W);
    const grossWallArea = perimeter * H;

    // Subtract doors and windows
    const subtractions = doors * doorArea + windows * windowArea;
    const netWallArea = Math.max(0, grossWallArea - subtractions);

    // Paint needed = area × coats ÷ coverage
    const paintNeeded = (netWallArea * coats) / coverage;

    const unitLabel = units === "metric" ? "liters" : "gallons";
    const areaUnit = units === "metric" ? "sq m" : "sq ft";
    const coverageLabel =
      units === "metric" ? `${coverage} sq m/L` : `${coverage} sq ft/gal`;

    return {
      value: round(paintNeeded, 3),
      unit: unitLabel,
      valueRounded: roundUp(paintNeeded, 1),
      breakdown: [
        { label: "wall area", value: `${formatNumber(round(netWallArea, 1))} ${areaUnit}` },
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
        `paint = (${formatNumber(round(netWallArea, 1))} × ${coats}) ÷ ${coverage} = ${formatNumber(round(paintNeeded, 3))} ${unitLabel}`,
        `rounded up to ${formatNumber(roundUp(paintNeeded, 1))} ${unitLabel}`,
      ],
    };
  },

  formulaDescription:
    "paint = (perimeter × height − doors − windows) × coats ÷ coverage",

  methodology: [
    "The calculator figures total wall area as perimeter times ceiling height, then subtracts a standard area for each door (21 sq ft / 2 sq m) and window (15 sq ft / 1.4 sq m) you enter. The net area is multiplied by the number of coats and divided by coverage per gallon or liter.",
    "Coverage is set at 350 square feet per gallon (approximately 9 square meters per liter), which is the average for most interior latex paints on primed drywall. Check your specific paint can — coverage can range from 250 to 400 sq ft per gallon depending on the paint type, finish, and surface texture.",
    "The result is rounded up to the nearest tenth of a gallon or liter — because you can't buy 2.67 gallons. The exact calculated amount is shown alongside so you can see the difference.",
    "Ceilings are not included in this calculation. Use the ceiling paint calculator separately, or add the ceiling area (length × width) manually and recalculate.",
  ],

  sources: [
    {
      name: "Benjamin Moore — Paint Coverage Chart",
      url: "https://www.benjaminmoore.com/en-us/paint-colors/paint-coverage",
      note: "Industry-standard 350-400 sq ft/gal for interior latex",
    },
    {
      name: "Sherwin-Williams — How Much Paint Do I Need",
      url: "https://www.sherwin-williams.com/homeowners/color/painting-tips/how-much-paint-do-i-need",
      note: "Reference for coverage assumptions and coat recommendations",
    },
  ],

  related: [
    {
      name: "Exterior paint calculator",
      slug: "exterior-paint-calculator",
      description: "For siding, trim, and outdoor walls",
    },
    {
      name: "Ceiling paint calculator",
      slug: "ceiling-paint-calculator",
      description: "Length × width, accounting for ceiling coverage rates",
    },
    {
      name: "Paint cost calculator",
      slug: "paint-cost-calculator",
      description: "Includes paint, primer, and supplies",
    },
    {
      name: "Primer calculator",
      slug: "primer-calculator",
      description: "How much primer to buy for a room",
    },
  ],

  faq: [
    {
      question: "How many gallons of paint do I need for an average room?",
      answer:
        "For a typical 12 × 14 ft bedroom with 8 ft ceilings and two coats, you'll need about 2.5 gallons. Larger living rooms with 9-10 ft ceilings usually need 3 gallons for two coats. The calculator above gives you the exact amount for your specific dimensions.",
    },
    {
      question: "Should I buy one or two coats' worth?",
      answer:
        "Always plan for two coats unless you're painting the same color over existing paint in good condition. Two coats give you uniform color, better coverage over primer marks, and a more durable finish. If you're changing color drastically (e.g., dark to light), you may need three coats plus primer.",
    },
    {
      question: "How much extra paint should I buy?",
      answer:
        "The rounded-up amount above already gives you a small buffer. For very large rooms or textured walls, consider adding 10-15% extra — textured surfaces absorb more paint than smooth drywall. Keep leftover paint for touch-ups; stored properly it lasts 2-3 years.",
    },
    {
      question: "Does this calculator include the ceiling?",
      answer:
        "No, this calculator covers walls only. Ceiling paint is usually a different product (flat white) with different coverage rates. Calculate the ceiling separately: length × width ÷ 350 × coats.",
    },
    {
      question: "Why does paint cover less than the can says?",
      answer:
        "Manufacturer coverage claims assume ideal conditions: smooth primed drywall, recommended film thickness, single coat. In real-world conditions with textured walls, heavy-body paint, or absorbent surfaces, actual coverage is often 10-20% lower. The 350 sq ft/gal figure used here is a realistic average.",
    },
    {
      question: "What if my walls have a heavy texture?",
      answer:
        "Textured walls (orange peel, knockdown, stucco) increase actual surface area and absorb more paint. Add 10-15% to the calculated amount. For heavy texture like popcorn or smooth concrete, add 20%.",
    },
    {
      question: "How accurate is the 350 sq ft per gallon number?",
      answer:
        "It's the widely cited industry average for interior latex paint on primed drywall. Premium paints often claim 400-450 sq ft/gal and can achieve it under good conditions. Budget paints may only cover 250-300. Check your specific paint can and adjust expectations accordingly.",
    },
    {
      question: "Do I need primer? Does the calculator include it?",
      answer:
        "The calculator is for paint only, not primer. You need primer if you're painting over bare drywall, dark colors (going lighter), patched repairs, or stained surfaces. Primer typically covers the same area as paint — use the primer calculator for a separate estimate.",
    },
  ],
};
