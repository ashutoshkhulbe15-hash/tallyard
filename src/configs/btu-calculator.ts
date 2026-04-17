import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const btuCalculatorConfig: CalculatorConfig = {
  slug: "btu-calculator",
  title: "BTU Calculator",
  description:
    "Air conditioner BTU size for any room. Accounts for climate, insulation, sun exposure, and occupancy so you buy the right unit.",
  categoryLabel: "HVAC",
  category: "hvac",

  bannerHeadline: "Size correctly.",
  bannerTags: ["Cooling + heating", "Climate-adjusted", "Room by room"],

  inputs: [
    {
      id: "length",
      label: "Room length",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 14,
      defaultMetric: 4.3,
      min: 5,
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
      min: 5,
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
      min: 6,
      step: 0.5,
    },
    {
      id: "climate",
      label: "Climate",
      type: "select",
      defaultImperial: "moderate",
      options: [
        { label: "Cool (most of the year)", value: "cool" },
        { label: "Moderate", value: "moderate" },
        { label: "Hot (summers 90°F+)", value: "hot" },
      ],
    },
    {
      id: "sun",
      label: "Sun exposure",
      type: "select",
      defaultImperial: "moderate",
      options: [
        { label: "Shaded / north-facing", value: "shaded" },
        { label: "Average", value: "moderate" },
        { label: "Very sunny / south-facing", value: "sunny" },
      ],
    },
    {
      id: "occupancy",
      label: "Regular occupants",
      type: "number",
      defaultImperial: 2,
      min: 0,
      step: 1,
      help: "Add 600 BTU per person beyond two",
    },
  ],

  calculate: (values, units) => {
    const L = Number(values.length) || 0;
    const W = Number(values.width) || 0;
    const H = Number(values.height) || 0;
    const climate = String(values.climate || "moderate");
    const sun = String(values.sun || "moderate");
    const occupancy = Number(values.occupancy) || 2;

    // Convert to sq ft if metric (BTU formulas are designed for sq ft)
    const areaInSqFt =
      units === "metric" ? L * W * 10.764 : L * W;
    const heightMultiplier =
      units === "metric" ? (H > 2.4 ? 1 + (H - 2.4) * 0.05 : 1) : H > 8 ? 1 + (H - 8) * 0.05 : 1;

    // Base: 20 BTU per square foot
    const baseBtu = areaInSqFt * 20;
    const heightAdjusted = baseBtu * heightMultiplier;

    // Climate adjustment
    const climateMultiplier =
      climate === "cool" ? 0.9 : climate === "hot" ? 1.15 : 1.0;
    const climateAdjusted = heightAdjusted * climateMultiplier;

    // Sun adjustment
    const sunAdjusted =
      sun === "sunny"
        ? climateAdjusted * 1.1
        : sun === "shaded"
          ? climateAdjusted * 0.9
          : climateAdjusted;

    // Occupancy: standard assumes 2 people; add 600 BTU per additional
    const occupancyBtu = Math.max(0, occupancy - 2) * 600;
    const totalBtu = sunAdjusted + occupancyBtu;

    // Round to nearest 500 BTU for practical unit sizing
    const btuRounded = Math.ceil(totalBtu / 500) * 500;

    const areaUnitLabel = units === "metric" ? "m²" : "ft²";
    const displayArea = units === "metric" ? L * W : areaInSqFt;

    return {
      value: Math.round(totalBtu),
      unit: "BTU/hr",
      valueRounded: btuRounded,
      breakdown: [
        { label: "area", value: `${formatNumber(round(displayArea, 1))} ${areaUnitLabel}` },
        { label: "climate", value: climate },
        { label: "sun", value: sun },
      ],
      formulaSteps: [
        units === "metric"
          ? `area = ${L} × ${W} = ${formatNumber(round(L * W, 2))} m² = ${formatNumber(round(areaInSqFt, 0))} ft²`
          : `area = ${L} × ${W} = ${formatNumber(round(areaInSqFt, 0))} ft²`,
        `base BTU = area × 20 = ${formatNumber(round(areaInSqFt, 0))} × 20 = ${formatNumber(round(baseBtu, 0))} BTU`,
        heightMultiplier !== 1
          ? `height adjustment (${H}${units === "metric" ? "m" : "ft"} tall) ×${heightMultiplier.toFixed(2)} = ${formatNumber(round(heightAdjusted, 0))} BTU`
          : `height adjustment: standard 8ft, no change`,
        `climate ×${climateMultiplier} = ${formatNumber(round(climateAdjusted, 0))} BTU`,
        sun !== "moderate"
          ? `sun adjustment ×${sun === "sunny" ? "1.1" : "0.9"} = ${formatNumber(round(sunAdjusted, 0))} BTU`
          : `sun: average, no adjustment`,
        occupancyBtu > 0
          ? `occupancy (${occupancy - 2} extra people × 600) = +${occupancyBtu} BTU`
          : `occupancy: 2 people or fewer, no addition`,
        `total = ${formatNumber(round(totalBtu, 0))} BTU`,
        `rounded up to nearest 500: ${formatNumber(btuRounded)} BTU`,
      ],
      composition: {
        unit: "BTU",
        total: round(totalBtu, 0),
        segments: [
          { label: "Base cooling", amount: round(climateAdjusted, 0), shade: "primary" },
          ...(sun !== "moderate"
            ? [{
                label: "Sun",
                amount: round(Math.abs(sunAdjusted - climateAdjusted), 0),
                shade: "secondary" as const,
              }]
            : []),
          ...(occupancyBtu > 0
            ? [{
                label: "Extra occupants",
                amount: occupancyBtu,
                shade: "tertiary" as const,
              }]
            : []),
        ],
      },
    };
  },

  formulaDescription:
    "BTU = area × 20 × height × climate × sun + occupancy adjustment",

  methodology: [
    "The baseline formula is 20 BTU per hour per square foot of room area — a well-established rule of thumb for typical homes with average insulation and 8-foot ceilings. This covers most residential rooms in temperate climates.",
    "Ceiling height above 8 feet adds about 5% per additional foot. A room with 10-foot ceilings has 10% more air volume to cool, and the calculator adjusts for that automatically.",
    "Climate adjustment reflects how hard the AC has to work. Cool climates (Seattle, Pacific Northwest) subtract 10% because peak temperatures rarely exceed 85°F. Hot climates (Phoenix, Florida) add 15% because the unit runs harder during prolonged 90°F+ days.",
    "Sun exposure matters because sunny rooms gain significant heat through windows. South-facing rooms or rooms with large windows add 10%. North-facing or shaded rooms reduce 10%.",
    "Occupancy: each person adds about 600 BTU of body heat. The baseline assumes 2 people; add 600 BTU per additional regular occupant (including pets, which contribute about half that).",
    "The result is rounded up to the nearest 500 BTU because AC units are sold in standard sizes: 5,000 BTU (small window), 8,000 BTU (medium window), 10,000-12,000 BTU (large window or small portable), 18,000-24,000 BTU (mini-split), and so on. Round up to the next standard size — undersizing is worse than oversizing within reason, though gross oversizing leads to humidity problems.",
  ],

  sources: [
    {
      name: "Energy Star — Room Air Conditioners",
      url: "https://www.energystar.gov/products/room_air_conditioners",
      note: "Baseline 20 BTU per sq ft recommendation",
    },
    {
      name: "ACCA Manual J (Residential Load Calculation)",
      url: "https://www.acca.org/standards",
      note: "Industry reference for HVAC sizing",
    },
  ],

  related: [
    { name: "Insulation calculator", slug: "insulation-calculator", description: "R-value and square footage" },
    { name: "Heat pump calculator", slug: "heat-pump-calculator", description: "Heating BTU for any climate" },
    { name: "Ductwork calculator", slug: "ductwork-calculator", description: "CFM and duct sizing" },
    { name: "Solar calculator", slug: "solar-calculator", description: "System size for your usage" },
  ],

  faq: [
    {
      question: "What size AC do I need for a 200 sq ft bedroom?",
      answer:
        "A 200 sq ft room in a moderate climate needs about 4,000-5,000 BTU, which means a standard 5,000 BTU window unit works. Bump up to 6,000 if the room has lots of sun or is in a hot climate. The calculator above gives you the exact number for your specific room.",
    },
    {
      question: "What happens if my AC is too big?",
      answer:
        "An oversized AC will cool the room quickly but turn off before removing enough humidity, leaving the room cold and clammy. It also cycles on and off more frequently, which wastes energy and wears out the compressor. Size correctly, not bigger.",
    },
    {
      question: "What happens if my AC is too small?",
      answer:
        "Undersized units run constantly without reaching the set temperature on hot days. They waste energy, burn out faster from continuous operation, and can't keep up during peak heat. If you're between sizes, round up to the next standard size.",
    },
    {
      question: "Does this work for mini-split systems?",
      answer:
        "Yes — same BTU calculation. Mini-splits are commonly 9,000 / 12,000 / 18,000 / 24,000 BTU. Pick the nearest size above your calculated need. Multi-zone systems should calculate each zone separately and sum.",
    },
    {
      question: "Does this work for central air?",
      answer:
        "Central AC is sized in tons (1 ton = 12,000 BTU). A whole-house calculation is more complex because it includes duct losses, multiple rooms, and heat gain through the attic. For rough sizing, add up individual rooms and divide by 12,000 to get tons. For accurate sizing, a pro should do a Manual J load calculation.",
    },
    {
      question: "How does climate affect sizing?",
      answer:
        "AC sizing is based on the design temperature — the peak summer temperature your unit must handle. Hot climates have higher design temps (95-105°F), so the unit must move more heat. Cool climates rarely exceed 85°F, so smaller units suffice. The 10% / 15% adjustments in the calculator roughly cover this.",
    },
    {
      question: "Does the calculator cover heating BTU?",
      answer:
        "Not directly — heating sizing requires factoring in insulation, windows, and outdoor design temperature. For a quick estimate, cooling BTU is usually 70-80% of heating BTU for the same space, but use a heat pump calculator for accurate heating sizing.",
    },
    {
      question: "Should I size for worst-case or average?",
      answer:
        "For peak summer days. Use the calculator's default hot-climate setting if you experience prolonged 90°F+ days. Undersizing to save money on cooler days backfires during July-August heat waves, when the unit runs nonstop and still can't catch up.",
    },
  ],
};
