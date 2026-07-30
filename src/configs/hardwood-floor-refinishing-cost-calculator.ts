import { FloorRefinishingCostExpansion } from "@/content/floor-refinishing-cost-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const floorRefinishingCostCalculatorConfig: CalculatorConfig = {
  slug: "hardwood-floor-refinishing-cost-calculator",
  title: "Hardwood Floor Refinishing Cost Calculator",
  description:
    "Cost to sand and refinish hardwood floors by area, finish type, and condition, with the screen-and-recoat alternative priced alongside a full sand.",
  categoryLabel: "Flooring",
  category: "flooring",

  bannerHeadline: "Save the floor.",
  bannerTags: ["Sand vs recoat", "Finish types priced", "2026 rates"],

  inputs: [
    {
      id: "area",
      label: "Floor area",
      type: "number",
      unitImperial: "ft²",
      defaultImperial: 500,
      min: 50,
      step: 25,
      help: "Total area to be refinished. Most crews have a minimum charge around 300 square feet.",
    },
    {
      id: "scope",
      label: "Scope",
      type: "select",
      defaultImperial: 4,
      options: [
        { label: "Full sand and refinish", value: 4 },
        { label: "Screen and recoat (buff, no sanding)", value: 1.4 },
        { label: "Sand, stain, and refinish", value: 5 },
      ],
      help: "Screen and recoat only works if the existing finish is worn but not breached down to bare wood",
    },
    {
      id: "finish",
      label: "Finish",
      type: "select",
      defaultImperial: 0,
      options: [
        { label: "Oil-based polyurethane", value: 0 },
        { label: "Water-based polyurethane", value: 0.9 },
        { label: "Hardwax oil", value: 1.4 },
      ],
      help: "Water-based dries faster and yellows less; oil-based costs least and ambers over time",
    },
    {
      id: "condition",
      label: "Floor condition",
      type: "select",
      defaultImperial: 0,
      options: [
        { label: "Normal wear", value: 0 },
        { label: "Pet stains or deep scratches", value: 0.8 },
        { label: "Previous adhesive, paint, or heavy damage", value: 1.6 },
      ],
      help: "Extra passes, board replacement, and stain removal are billed on top of the base rate",
    },
  ],

  calculate: (values) => {
    const area = Number(values.area) || 500;
    const scopeRate = Number(values.scope) || 4;
    const finishAdd = Number(values.finish) || 0;
    const conditionAdd = Number(values.condition) || 0;

    const isRecoat = scopeRate === 1.4;
    // Finish and condition adders do not apply to a screen and recoat the
    // same way: no sanding means no stain step and no damage repair.
    const effectiveFinish = isRecoat ? finishAdd * 0.5 : finishAdd;
    const effectiveCondition = isRecoat ? 0 : conditionAdd;

    const ratePerSqFt = scopeRate + effectiveFinish + effectiveCondition;
    const rawTotal = area * ratePerSqFt;
    const MINIMUM = isRecoat ? 450 : 900;
    const total = Math.max(rawTotal, MINIMUM);
    const hitMinimum = rawTotal < MINIMUM;

    const low = Math.round((total * 0.85) / 25) * 25;
    const high = Math.round((total * 1.2) / 25) * 25;
    const mid = Math.round(total / 25) * 25;

    // Replacement comparison at a mid-range installed price
    const replacementCost = area * 13;
    const savings = Math.max(0, Math.round(replacementCost - total));

    const days = isRecoat ? 1 : scopeRate === 5 ? 4 : 3;

    const breakdown = [
      { label: "rate", value: `$${round(ratePerSqFt, 2)}/ft²` },
      { label: "area", value: `${formatNumber(area)} ft²` },
      ...(hitMinimum ? [{ label: "crew minimum applied", value: `$${MINIMUM}` }] : []),
      { label: "typical range", value: `$${formatNumber(low)}-${formatNumber(high)}` },
      { label: "time on site", value: `${days} day${days > 1 ? "s" : ""} plus cure` },
      { label: "vs replacing the floor", value: `$${formatNumber(Math.round(replacementCost))} to replace, saves $${formatNumber(savings)}` },
    ];

    return {
      value: mid,
      unit: "total",
      valueRounded: mid,
      prefix: "$",
      breakdown,
      formulaSteps: [
        `base rate = $${scopeRate}/ft² (${isRecoat ? "screen and recoat" : scopeRate === 5 ? "sand, stain, refinish" : "full sand and refinish"})`,
        ...(effectiveFinish ? [`finish adder = $${round(effectiveFinish, 2)}/ft²`] : []),
        ...(effectiveCondition ? [`condition adder = $${effectiveCondition}/ft²`] : []),
        `total rate = $${round(ratePerSqFt, 2)}/ft²`,
        `${formatNumber(area)} ft² × $${round(ratePerSqFt, 2)} = $${formatNumber(Math.round(rawTotal))}`,
        ...(hitMinimum ? [`below the $${MINIMUM} crew minimum, so $${MINIMUM} applies`] : []),
        `replacing instead at ~$13/ft² installed = $${formatNumber(Math.round(replacementCost))}`,
      ],
      composition: {
        unit: "$",
        total: Math.round(replacementCost),
        segments: [
          { label: "Refinish", amount: Math.round(total), shade: "primary" },
          { label: "Saved vs replacing", amount: savings, shade: "secondary" },
        ],
      },
    };
  },

  ContentExpansion: FloorRefinishingCostExpansion,

  formulaDescription:
    "total = area × (scope rate + finish adder + condition adder), subject to the crew minimum",

  methodology: [
    "Base rates reflect typical 2026 US contractor pricing: $3-5 per square foot for a full sand and refinish, $1.20-2 per square foot for a screen and recoat, and $4-6 when a stain coat is added. Rates are per square foot of floor area, and most crews carry a minimum charge because mobilizing equipment for a small room costs the same as for a large one.",
    "A screen and recoat abrades the existing finish and adds a fresh coat without touching the wood. It only works when the finish is worn but unbroken. Once wear has gone through to bare wood, or where pet stains have penetrated the wood itself, a full sand is the only option, and the calculator prices condition adders only against sanding scopes for that reason.",
    "Finish adders reflect material and labor differences. Water-based polyurethane costs more per gallon and needs more coats, but dries in hours rather than overnight and stays clear instead of ambering. Hardwax oil costs most and is repairable in place, which is why it is common on wide-plank and European oak floors.",
    "Condition adders cover extra sanding passes, spot board replacement, and stain or adhesive removal. Pet urine that has penetrated the wood often cannot be sanded out at all and requires board replacement, which is quoted per board rather than per square foot.",
    "The replacement comparison prices new hardwood at roughly $13 per square foot installed, a mid-range figure for common species prefinished and nailed down. Refinishing is not always the cheaper answer over a long horizon: a floor with less than about 3/16 inch of wood above the tongue cannot be sanded again and is at the end of its refinishing life.",
    "Not included: furniture moving, shoe molding removal and reinstallation, and repairs to subfloor discovered once the finish is off. Each is commonly quoted separately.",
  ],

  sources: [
    {
      name: "NWFA Sand and Finish Guidelines",
      url: "https://nwfa.org/publications/",
      note: "Industry standards for abrasive sequence, coat counts, and cure times",
    },
    {
      name: "NWFA Wood Species Guide",
      url: "https://nwfa.org/wood-species/",
      note: "Species behavior under stain and finish, referenced in the blotching guidance",
    },
    {
      name: "EPA - Volatile Organic Compounds Impact on Indoor Air Quality",
      url: "https://www.epa.gov/indoor-air-quality-iaq/volatile-organic-compounds-impact-indoor-air-quality",
      note: "Health context for oil-based finish VOC content and ventilation during cure",
    },
    {
      name: "USDA Forest Products Laboratory - Wood Handbook",
      url: "https://www.fpl.fs.usda.gov/products/publications/specific_pub.php?posting_id=18519",
      note: "Wood moisture and surface preparation reference",
    },
  ],

  related: [
    { name: "Hardwood flooring cost", slug: "hardwood-flooring-cost-calculator", description: "Price a new floor by species" },
    { name: "Flooring calculator", slug: "flooring-calculator", description: "Square footage and box counts" },
    { name: "Paint calculator", slug: "paint-calculator", description: "Gallons for the same room" },
    { name: "Countertop calculator", slug: "countertop-calculator", description: "Square footage for the rest of the remodel" },
  ],

  howTo: {
    name: "How to estimate hardwood floor refinishing cost",
    description:
      "Price a hardwood refinishing job in five steps, including whether a full sand is needed at all.",
    steps: [
      {
        name: "Measure the floor area",
        text: "Measure each room and add the areas together. Include closets if they are being done. Most crews have a minimum charge around 300 square feet, so small jobs price higher per square foot.",
      },
      {
        name: "Check whether a full sand is needed",
        text: "Put a few drops of water on a worn traffic path. If it beads, the finish is intact and a screen and recoat at $1.20-2 per square foot will work. If it soaks in and darkens the wood, the finish is breached and the floor needs a full sand.",
      },
      {
        name: "Confirm there is wood left to sand",
        text: "Pull a floor vent cover and look at the board edge in cross-section. A solid floor needs about 3/16 inch above the tongue to take another sanding. Engineered floors are limited by wear layer thickness, and under 2 mm cannot be sanded at all.",
      },
      {
        name: "Pick the finish",
        text: "Oil-based polyurethane costs least and ambers over time. Water-based costs about $0.90 more per square foot, dries in hours, and stays clear. Hardwax oil costs most and can be spot repaired without redoing the whole floor.",
      },
      {
        name: "Add condition and plan the downtime",
        text: "Add for pet stains, deep scratches, or old adhesive. Then budget the time: two to three days of work for a full sand, plus cure time before furniture returns, which is two to seven days depending on finish.",
      },
    ],
  },

  faq: [
    {
      question: "How much does it cost to refinish hardwood floors?",
      answer:
        "$3-5 per square foot for a full sand and refinish, so about $1,500-2,500 for 500 square feet. Adding stain pushes it to $4-6. A screen and recoat, which skips sanding, runs $1.20-2 per square foot. Most crews apply a minimum charge of $700-900 regardless of size.",
    },
    {
      question: "Is refinishing cheaper than replacing hardwood?",
      answer:
        "Substantially. Refinishing runs $3-5 per square foot against $10-16 to install a new floor, so a 500 square foot room is roughly $2,000 versus $6,500. Refinishing only stops being an option when the floor has been sanded down to less than about 3/16 inch above the tongue.",
    },
    {
      question: "What is a screen and recoat?",
      answer:
        "A buffer with an abrasive screen scuffs the existing finish, then a fresh coat goes over it. No wood is removed. It costs a third of a full sand, takes one day, and works only if the finish is worn but not breached. Water beading on a worn traffic path means the finish is still intact and a recoat will bond.",
    },
    {
      question: "How many times can hardwood be refinished?",
      answer:
        "Solid 3/4 inch flooring typically takes four to six sandings over its life, since each removes roughly 1/32 inch. Engineered flooring depends entirely on wear layer: under 2 mm cannot be sanded, 3 mm takes about one pass, and 6 mm behaves like solid wood for several.",
    },
    {
      question: "How long does refinishing take?",
      answer:
        "Two to three days of work for a full sand and finish, four with stain. Then cure: water-based finishes accept light foot traffic within a day and furniture in two to three, while oil-based needs three to seven days before furniture returns and up to 30 days before rugs go down.",
    },
    {
      question: "Can I refinish floors myself?",
      answer:
        "It is possible, and drum sander rental runs $60-100 per day, but the skill gap is real: a drum sander left stationary for two seconds cuts a dish into the floor that shows through the finish permanently. Most DIY savings come from doing a screen and recoat instead, which uses a much more forgiving buffer.",
    },
    {
      question: "Do pet stains come out when sanding?",
      answer:
        "Surface stains usually do. Urine that has penetrated into the wood and reacted with tannins often does not, because the discoloration goes deeper than sanding removes. Those boards get replaced individually and blended into the new finish, quoted per board rather than per square foot.",
    },
  ],
};
