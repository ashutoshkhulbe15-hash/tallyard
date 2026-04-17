import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const atticVentilationCalculatorConfig: CalculatorConfig = {
  slug: "attic-ventilation-calculator",
  title: "Attic Ventilation Calculator",
  description:
    "Square inches of intake and exhaust attic venting needed. Follows the 1:300 rule with 50/50 balanced intake and exhaust.",
  categoryLabel: "Roofing",
  category: "roofing",

  bannerHeadline: "Vent evenly.",
  bannerTags: ["1:300 rule", "Intake + exhaust", "Ridge · soffit · gable"],

  inputs: [
    {
      id: "atticArea",
      label: "Attic floor area",
      type: "number",
      unitImperial: "ft²",
      unitMetric: "m²",
      defaultImperial: 1500,
      defaultMetric: 140,
      min: 100,
      step: 50,
      help: "Footprint of the attic (typically matches conditioned floor area)",
    },
    {
      id: "ratio",
      label: "Ventilation ratio",
      type: "select",
      defaultImperial: "300",
      options: [
        { label: "1:150 (no vapor barrier)", value: "150" },
        { label: "1:300 (with vapor barrier — standard)", value: "300" },
      ],
      help: "Most modern homes have vapor barriers; use 1:300",
    },
    {
      id: "ventType",
      label: "Exhaust vent type",
      type: "select",
      defaultImperial: "ridge",
      options: [
        { label: "Ridge vent (continuous)", value: "ridge" },
        { label: "Gable vents (ends of attic)", value: "gable" },
        { label: "Roof / box vents (square)", value: "box" },
        { label: "Power vent (electric fan)", value: "power" },
      ],
    },
    {
      id: "ridgeLength",
      label: "Ridge length (if ridge vent)",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 40,
      defaultMetric: 12,
      min: 0,
      step: 1,
      help: "Only used if ridge vent selected",
    },
  ],

  calculate: (values, units) => {
    const atticAreaInput = Number(values.atticArea) || 0;
    const ratio = Number(values.ratio) || 300;
    const ventType = String(values.ventType || "ridge");
    const ridgeLengthInput = Number(values.ridgeLength) || 0;

    const atticArea =
      units === "metric" ? atticAreaInput * 10.764 : atticAreaInput;
    const ridgeLength =
      units === "metric" ? ridgeLengthInput * 3.281 : ridgeLengthInput;

    // Total NFVA (Net Free Ventilation Area) needed, in sq ft
    const totalNfvaSqFt = atticArea / ratio;
    const totalNfvaSqIn = totalNfvaSqFt * 144;

    // Balanced system: 50% intake (soffit) + 50% exhaust
    const intakeSqIn = totalNfvaSqIn / 2;
    const exhaustSqIn = totalNfvaSqIn / 2;

    // Ridge vent: typical NFVA of 12-18 sq in per linear foot
    // Using 15 sq in/ft as standard
    const ridgeVentLinearFtNeeded = ventType === "ridge" ? exhaustSqIn / 15 : 0;

    // Gable vent: typical 50-100 sq in each; using 70 sq in
    const gableVentsNeeded = ventType === "gable" ? Math.ceil(exhaustSqIn / 70) : 0;

    // Box/roof vent: typical 50 sq in each
    const boxVentsNeeded = ventType === "box" ? Math.ceil(exhaustSqIn / 50) : 0;

    // Power vent: sized in CFM
    // Rule: 1 CFM per 1.5 sq ft attic area
    const powerVentCfm =
      ventType === "power" ? Math.ceil(atticArea / 1.5) : 0;

    // Intake: soffit vents — continuous strip typical 9 sq in per linear foot
    // OR individual vents at 35 sq in each
    const soffitLinearFt = intakeSqIn / 9;
    const soffitVentsIndividual = Math.ceil(intakeSqIn / 35);

    // Check if ridge vent has enough length
    const ridgeWarning =
      ventType === "ridge" && ridgeLength > 0 && ridgeLength < ridgeVentLinearFtNeeded
        ? `WARNING: your ridge (${ridgeLength} ft) is shorter than the ${round(ridgeVentLinearFtNeeded, 1)} ft of ridge vent needed`
        : "OK";

    // Build result based on vent type
    const exhaustDesc =
      ventType === "ridge"
        ? `${round(ridgeVentLinearFtNeeded, 1)} ft of ridge vent`
        : ventType === "gable"
          ? `${gableVentsNeeded} gable vents`
          : ventType === "box"
            ? `${boxVentsNeeded} box/roof vents`
            : `${formatNumber(powerVentCfm)} CFM power vent`;

    return {
      value: Math.ceil(totalNfvaSqIn),
      unit: "sq in NFVA",
      valueRounded: Math.ceil(totalNfvaSqIn),
      breakdown: [
        { label: "total NFVA needed", value: `${formatNumber(round(totalNfvaSqIn, 0))} sq in` },
        { label: "intake (soffit)", value: `${formatNumber(round(intakeSqIn, 0))} sq in` },
        { label: "exhaust", value: `${formatNumber(round(exhaustSqIn, 0))} sq in` },
        { label: "recommended exhaust", value: exhaustDesc },
        { label: "soffit vents", value: `${round(soffitLinearFt, 1)} ft continuous or ${soffitVentsIndividual} individual` },
        ...(ridgeWarning !== "OK" ? [{ label: "⚠", value: ridgeWarning }] : []),
      ],
      formulaSteps: [
        `attic area = ${formatNumber(round(atticArea, 0))} ft²`,
        `ratio = 1:${ratio}`,
        `total NFVA = ${formatNumber(round(atticArea, 0))} ÷ ${ratio} = ${round(totalNfvaSqFt, 2)} ft² = ${formatNumber(round(totalNfvaSqIn, 0))} sq in`,
        `50/50 balanced: intake = exhaust = ${formatNumber(round(intakeSqIn, 0))} sq in each`,
        ventType === "ridge"
          ? `ridge vent at 15 sq in/ft: need ${formatNumber(round(ridgeVentLinearFtNeeded, 1))} ft`
          : ventType === "gable"
            ? `gable vents at ~70 sq in each: need ${gableVentsNeeded} vents`
            : ventType === "box"
              ? `box vents at 50 sq in each: need ${boxVentsNeeded} vents`
              : `power vent sized by attic area: ${formatNumber(powerVentCfm)} CFM (${formatNumber(round(atticArea, 0))} ÷ 1.5)`,
        `intake: ${round(soffitLinearFt, 1)} ft continuous soffit OR ${soffitVentsIndividual} individual vents at 35 sq in each`,
      ],
      composition: {
        unit: "sq in",
        total: Math.ceil(totalNfvaSqIn),
        segments: [
          { label: "Intake (soffit)", amount: Math.round(intakeSqIn), shade: "primary" },
          { label: "Exhaust", amount: Math.round(exhaustSqIn), shade: "secondary" },
        ],
      },
    };
  },

  formulaDescription:
    "NFVA = attic area ÷ ratio (1:300 or 1:150), split 50/50 between intake and exhaust",

  methodology: [
    "Attic ventilation prevents two problems: summer heat buildup (which bakes shingles from below and raises cooling bills) and winter condensation (which rots sheathing and feeds mold). The industry standard is the 1:300 rule — one square foot of Net Free Ventilation Area (NFVA) for every 300 square feet of attic floor. Homes without a vapor barrier use the stricter 1:150 ratio.",
    "NFVA is the actual open area of the vent, not the exterior dimensions. A 12 × 12 inch louvered vent has an outside area of 144 sq in but typically only 50-70 sq in of actual NFVA because the louvers and screens take up space. Always use the manufacturer's NFVA spec when sizing.",
    "Balanced ventilation requires 50% intake (low, at the soffit) and 50% exhaust (high, at the ridge or gable peak). Intake-only or exhaust-only systems short-circuit — air doesn't flow properly through the attic. Unbalanced systems are a leading cause of ice dams in cold climates and ineffective cooling in hot climates.",
    "Ridge vents provide about 12-18 sq in of NFVA per linear foot (using 15 as a standard). For a 40-foot ridge, that's 600 sq in of exhaust — enough for about 3,600 sq ft of attic using the 1:300 rule. Gable vents are typically 50-100 sq in each (use 70 as standard). Box/roof vents are about 50 sq in each. Power vents are sized in CFM (cubic feet per minute) and move air actively.",
    "The calculator recommends soffit (intake) venting based on the exhaust type. Continuous soffit strips provide about 9 sq in per linear foot; individual soffit vents provide about 35 sq in each. In most homes, you need both — continuous soffit venting along the entire eave, possibly supplemented with circular vents in specific bays where the ceiling is blocked.",
    "Common mistakes: mixing exhaust types (ridge AND gable) creates short-circuit airflow patterns; installing insulation that blocks soffit vents; using power vents without adequate intake (they pull conditioned air from the house). Fix: pick one exhaust type and size it correctly, protect soffit intake with baffles, verify attic air circulation during hot days.",
  ],

  sources: [
    {
      name: "FHA Minimum Property Standards",
      url: "https://www.hud.gov/",
      note: "Source of the 1:300 / 1:150 attic ventilation rules",
    },
    {
      name: "IRC 2021 — Attic Ventilation",
      url: "https://codes.iccsafe.org/",
      note: "Code requirements for balanced intake and exhaust",
    },
  ],

  related: [
    { name: "Roofing calculator", slug: "roofing-calculator", description: "Shingle bundles for any pitch" },
    { name: "Insulation calculator", slug: "insulation-calculator", description: "R-value and bags for attic" },
    { name: "Gutter calculator", slug: "gutter-calculator", description: "Sized for your rainfall" },
    { name: "Solar panel calculator", slug: "solar-calculator", description: "Cool attic = efficient solar" },
  ],

  faq: [
    {
      question: "How much attic ventilation do I need?",
      answer:
        "Standard rule: 1 sq ft of Net Free Ventilation Area per 300 sq ft of attic floor space, split 50/50 between intake (soffit) and exhaust (ridge or gable). For a 1,500 sq ft attic: 5 sq ft total NFVA, meaning 360 sq in intake + 360 sq in exhaust. The calculator above handles your specific attic size.",
    },
    {
      question: "What's the difference between NFVA and actual vent area?",
      answer:
        "NFVA (Net Free Ventilation Area) is the actual open space that allows air flow through a vent. Actual vent dimensions are larger because louvers, screens, and frames block some area. A 14 × 8 inch vent might have 112 sq in gross but only 45-60 sq in NFVA. Always use manufacturer NFVA specs — assuming gross area leads to under-ventilation.",
    },
    {
      question: "Should I use ridge vents or gable vents?",
      answer:
        "Continuous ridge vents provide better, more even airflow along the entire attic length. Gable vents concentrate airflow at the ends, leaving the middle stagnant. Most modern installations use ridge vents. Gable vents are common in older homes and work fine if you have enough of them and matching soffit intake.",
    },
    {
      question: "Can I mix ridge vents and gable vents?",
      answer:
        "No — this creates air short-circuits. Air takes the path of least resistance, which usually means ridge-to-gable or gable-to-gable flow that bypasses the attic space you're trying to ventilate. Pick one exhaust type. If you have existing gable vents and install ridge vents, seal the gable vents.",
    },
    {
      question: "What's a power attic vent, and should I use one?",
      answer:
        "An electric fan that actively pulls air out of the attic. Sized in CFM (about 1 CFM per 1.5 sq ft of attic). Works well if properly balanced with adequate soffit intake. But a common failure mode is insufficient intake — the fan then pulls CONDITIONED air from the house through ceiling bypasses, wasting AC. Passive ridge vents avoid this problem. Use power vents only if passive ventilation isn't feasible.",
    },
    {
      question: "Do I need ventilation if I have a conditioned attic?",
      answer:
        "No — conditioned attics (with spray foam on the roof deck, bringing the attic inside the building envelope) are NOT ventilated. The attic becomes indoor space. This is common in hot climates and with cathedral ceilings. Don't add ventilation to a conditioned attic — it defeats the purpose.",
    },
    {
      question: "What happens with insufficient attic ventilation?",
      answer:
        "Summer: attic temperatures reach 140-160°F, cooking shingles and reducing their life by 20-30%. Cooling bills increase because the hot attic radiates down through the ceiling. Winter: warm moist air from the house condenses on cold roof sheathing, causing mold and rot. In freezing weather: ice dams form when heat escapes through the roof, melts snow, and freezes at the eaves.",
    },
    {
      question: "How do I check if my attic ventilation is working?",
      answer:
        "On a hot sunny day, attic temperature should be within 10-20°F of outdoor air temperature (e.g., 95°F outside = up to 115°F attic, no hotter). If attic is 140°F+, ventilation is inadequate. In winter, frost on roof sheathing or wet insulation indicates inadequate ventilation or air leaks from the conditioned space.",
    },
  ],
};
