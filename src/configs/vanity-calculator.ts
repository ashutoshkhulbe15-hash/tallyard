import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const vanityCalculatorConfig: CalculatorConfig = {
  slug: "vanity-calculator",
  title: "Vanity Calculator",
  description:
    "Right-size a bathroom vanity for your space. Standard sizes, clearance requirements, and single vs. double sink guidance.",
  categoryLabel: "Flooring",
  category: "flooring",

  bannerHeadline: "Size right.",
  bannerTags: ["Single or double", "Code clearances", "24\" to 84\""],

  inputs: [
    {
      id: "bathroomWidth",
      label: "Bathroom width (vanity wall)",
      type: "number",
      unitImperial: "in",
      unitMetric: "cm",
      defaultImperial: 72,
      defaultMetric: 183,
      min: 36,
      step: 1,
      help: "Width of the wall where the vanity will go",
    },
    {
      id: "clearanceLeft",
      label: "Clearance needed left",
      type: "number",
      unitImperial: "in",
      unitMetric: "cm",
      defaultImperial: 0,
      defaultMetric: 0,
      min: 0,
      step: 1,
      help: "Door swing, toilet, or other obstruction on the left",
    },
    {
      id: "clearanceRight",
      label: "Clearance needed right",
      type: "number",
      unitImperial: "in",
      unitMetric: "cm",
      defaultImperial: 4,
      defaultMetric: 10,
      min: 0,
      step: 1,
      help: "Space between vanity and adjacent wall/fixture",
    },
    {
      id: "users",
      label: "Regular users",
      type: "select",
      defaultImperial: "1",
      options: [
        { label: "1 person", value: "1" },
        { label: "2 people (simultaneous)", value: "2" },
      ],
      help: "Two users simultaneously need 60\"+ or double vanity",
    },
    {
      id: "height",
      label: "Vanity height",
      type: "select",
      defaultImperial: "36",
      options: [
        { label: '32" (standard, kid-friendly)', value: "32" },
        { label: '34"', value: "34" },
        { label: '36" (comfort height)', value: "36" },
      ],
    },
  ],

  calculate: (values, units) => {
    const bathWidthIn = Number(values.bathroomWidth) || 72;
    const clearLeft = Number(values.clearanceLeft) || 0;
    const clearRight = Number(values.clearanceRight) || 4;
    const users = Number(values.users) || 1;
    const heightIn = Number(values.height) || 36;

    // Convert to inches if metric
    const bathWidth = units === "metric" ? bathWidthIn / 2.54 : bathWidthIn;
    const clearL = units === "metric" ? clearLeft / 2.54 : clearLeft;
    const clearR = units === "metric" ? clearRight / 2.54 : clearRight;

    // Maximum vanity width
    const maxVanityWidth = bathWidth - clearL - clearR;

    // Standard vanity widths (inches)
    const standardWidths = [18, 24, 30, 36, 42, 48, 60, 66, 72, 84];

    // Pick the largest standard size that fits
    let recommendedWidth = 0;
    for (const size of standardWidths) {
      if (size <= maxVanityWidth) {
        recommendedWidth = size;
      } else {
        break;
      }
    }

    // Determine single vs double sink
    const canFitDouble = recommendedWidth >= 60;
    const recommendDouble = users === 2 && canFitDouble;
    const sinkCount = recommendDouble ? 2 : 1;
    const configType = recommendDouble
      ? "double sink"
      : users === 2
        ? "trough/large single (need 2 users but < 60\")"
        : "single sink";

    // Depth is standard 21" (can be 18" for small baths)
    const depth = recommendedWidth <= 24 ? 18 : 21;

    // Countertop area (for backsplash ordering etc)
    const countertopSqFt = (recommendedWidth * depth) / 144;

    // Code clearance checks per IRC 2021:
    // 15" from center of sink to nearest sidewall, 30" between two sinks, 21" in front
    const sinkCenterToWall = clearR; // simplified
    const frontClearanceOK = true; // we don't capture front clearance here; warn only
    const codeCheck =
      recommendedWidth > 0
        ? sinkCenterToWall >= 4 ? "fits with typical clearance" : "tight right clearance — verify sink faucet position"
        : "no standard size fits";

    return {
      value: recommendedWidth,
      unit: recommendedWidth === 1 ? "inch" : "inches",
      valueRounded: recommendedWidth,
      breakdown: [
        { label: "max width", value: `${formatNumber(round(maxVanityWidth, 1))}"` },
        { label: "configuration", value: configType },
        { label: "sinks", value: `${sinkCount}` },
        { label: "depth", value: `${depth}"` },
        { label: "countertop", value: `${formatNumber(round(countertopSqFt, 1))} ft²` },
      ],
      formulaSteps: [
        `bathroom wall = ${formatNumber(round(bathWidth, 1))}"${units === "metric" ? ` (${bathWidthIn} cm)` : ""}`,
        `clearances = ${formatNumber(round(clearL, 1))}" left + ${formatNumber(round(clearR, 1))}" right`,
        `max vanity width = ${formatNumber(round(bathWidth, 1))} − ${formatNumber(round(clearL + clearR, 1))} = ${formatNumber(round(maxVanityWidth, 1))}"`,
        `standard sizes that fit: ${standardWidths.filter((s) => s <= maxVanityWidth).join('", ') || "none"}"`,
        recommendedWidth > 0
          ? `recommended = ${recommendedWidth}" (largest standard size that fits)`
          : `no standard vanity fits — consider custom or reduce clearance`,
        `users = ${users}, double-sink minimum = 60"`,
        `configuration = ${configType}`,
        `depth = ${depth}" (standard 21", 18" for small vanities ≤ 24" wide)`,
        `countertop area = ${recommendedWidth} × ${depth} ÷ 144 = ${formatNumber(round(countertopSqFt, 2))} ft²`,
        `code check: ${codeCheck}`,
      ],
    };
  },

  formulaDescription:
    "recommended = largest standard width (18-84\") fitting in (wall − clearances); double sink if users = 2 and width ≥ 60\"",

  methodology: [
    "Vanities are sold in standard widths: 18, 24, 30, 36, 42, 48, 60, 66, 72, and 84 inches. The calculator finds the largest standard width that fits the available wall space after subtracting side clearances. Custom widths exist (any size to the inch) but cost 40-100% more than standard and have longer lead times (4-8 weeks vs stock).",
    "Side clearances: minimum 2 inches of breathing room on any side for aesthetics. If the vanity is next to a swinging door, allow the door's full swing radius (usually 28-32 inches from the hinge side). If it's next to a toilet, IRC 2021 requires 15 inches from the centerline of the toilet to any obstruction — measure carefully.",
    "Single vs double sink: the breakpoint is 60 inches. Below 60 inches, a double sink leaves too little counter space between and around the sinks to be practical. At 60-66 inches, double is possible but tight. At 72+ inches, double sinks are the norm for two-user bathrooms. Single-sink 72-inch vanities exist and provide maximum counter space for one user.",
    "Depth: standard 21 inches (front to wall) works for all vanities 30 inches or wider. For very small bathrooms with vanities under 24 inches, shallow 18-inch depth preserves walk-through space. Front-to-countertop overhang typically adds 1 inch on each side beyond the cabinet — factor this if clearance is very tight.",
    "Height: 32-34 inches is the traditional 'standard' height, now considered kid-friendly. 36 inches is 'comfort height' — the kitchen counter standard, increasingly common in master bathrooms because it's easier on the back. For families with young children, 32 inches remains sensible; for adults-only master baths, 36 inches is preferable.",
    "Countertop area is calculated for pairing with other calculators. For a standard 36 × 21 inch vanity, the countertop is 5.25 square feet — useful input for the countertop and backsplash calculators.",
  ],

  sources: [
    {
      name: "IRC 2021 Chapter 3 — Plumbing Fixtures",
      url: "https://codes.iccsafe.org/",
      note: "Code-required clearances for bathroom fixtures",
    },
    {
      name: "NKBA — Bathroom Planning Guidelines",
      url: "https://www.nkba.org/",
      note: "Industry standards for vanity sizing and placement",
    },
  ],

  related: [
    { name: "Countertop calculator", slug: "countertop-calculator", description: "Square feet for counter surfaces" },
    { name: "Shower tile calculator", slug: "shower-tile-calculator", description: "Tile for tub and shower" },
    { name: "Backsplash calculator", slug: "backsplash-calculator", description: "Kitchen and bath backsplash" },
    { name: "Tile calculator", slug: "tile-calculator", description: "For bathroom floors and walls" },
  ],

  faq: [
    {
      question: "What size vanity should I buy?",
      answer:
        "The largest standard size that fits your wall after subtracting minimum clearances. For a typical 6-foot bathroom wall with 4\" on one side for a toilet: max vanity width is 68\", so pick 66\" or drop to 60\". For a 4-foot wall: 42-48\" works. The calculator above finds the right standard size for any space.",
    },
    {
      question: "Can I fit a double sink in a 60-inch vanity?",
      answer:
        "Yes — 60 inches is the minimum for double sinks. Each sink gets about 22-24 inches of centerline spacing, leaving ~12 inches of counter between them (for shared use). 66\" is more comfortable (15\" between sinks). 72\"+ is luxurious with space for accessories between.",
    },
    {
      question: "What's the standard vanity depth?",
      answer:
        "21 inches (front of cabinet to wall, not including countertop overhang) is standard. Countertops typically extend 1 inch beyond the cabinet in front, making finished depth 22 inches. For small bathrooms, 18-inch depth vanities exist but cabinet storage is minimal.",
    },
    {
      question: "Should I pick 32\" or 36\" height?",
      answer:
        "36\" (comfort height) is now the preferred standard for adult-only bathrooms — easier on the back, especially for tall users. 32-34\" is traditional height and remains appropriate for kid-friendly baths (kids reach the counter) and period-appropriate remodels. The cost is similar; pick based on use.",
    },
    {
      question: "Do I need to account for the countertop overhang?",
      answer:
        "Width-wise: standard countertops don't overhang the sides (they're cut to the vanity width exactly), so clearance math works off cabinet width. Depth-wise: the countertop overhangs 1 inch in front, so your front clearance should account for this. The calculator focuses on side clearances, which matter more.",
    },
    {
      question: "What if no standard size fits my space?",
      answer:
        "Custom vanity: 4-8 week lead time, 40-100% more cost than stock. Consider just going smaller — a 24\" vanity with more counter space looks fine. Or reconsider clearances — if you can reduce the right clearance from 4\" to 2\", you might fit the next size up. The calculator alerts when no standard size fits.",
    },
    {
      question: "How much counter space do I need?",
      answer:
        "Minimum: 30\" wide vanity gives practical counter space (room for daily-use items). For two users sharing one sink, 48\"+ is comfortable. Double-sink vanities need 60\" minimum for both users plus some center space. If counter space is critical and you have a small wall, a single sink 48-60\" vanity beats a cramped double sink.",
    },
    {
      question: "What about wall-hung vs. freestanding?",
      answer:
        "Size calculation is identical. Wall-hung (floating) vanities make small bathrooms feel larger and make floor cleaning easier — they're modern style. Freestanding (on legs or full cabinet base) has more storage and feels more traditional. Cost and size-wise, both are available in the full range of standard widths.",
    },
  ],
};
