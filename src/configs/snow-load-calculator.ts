import { SnowLoadCalculatorExpansion } from "@/content/snow-load-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const snowLoadCalculatorConfig: CalculatorConfig = {
  slug: "snow-load-calculator",
  title: "Snow Load Calculator",
  description:
    "Roof snow load in pounds per square foot. Compares your actual snow against design load capacity — flags when roof is over-stressed.",
  categoryLabel: "Roofing",
  category: "roofing",

  bannerHeadline: "Load safely.",
  bannerTags: ["psf + total lb", "ASCE 7 based", "Flags over-limit"],

  inputs: [
    {
      id: "snowDepth",
      label: "Snow depth on roof",
      type: "number",
      unitImperial: "in",
      unitMetric: "cm",
      defaultImperial: 18,
      defaultMetric: 45,
      min: 0,
      step: 1,
      help: "Measure snow depth on the roof (not the ground)",
    },
    {
      id: "snowType",
      label: "Snow type",
      type: "select",
      defaultImperial: "packed",
      options: [
        { label: "Fresh powder (5 lb/ft³)", value: "powder" },
        { label: "Settled / packed (15 lb/ft³)", value: "packed" },
        { label: "Wet / partially melted (25 lb/ft³)", value: "wet" },
        { label: "Ice / old snow (30-40 lb/ft³)", value: "ice" },
      ],
    },
    {
      id: "iceThickness",
      label: "Ice layer thickness (if any)",
      type: "number",
      unitImperial: "in",
      unitMetric: "cm",
      defaultImperial: 0,
      defaultMetric: 0,
      min: 0,
      step: 0.5,
      help: "Solid ice weighs 57 lb/ft³ — adds significant load",
    },
    {
      id: "roofArea",
      label: "Roof area",
      type: "number",
      unitImperial: "ft²",
      unitMetric: "m²",
      defaultImperial: 1500,
      defaultMetric: 140,
      min: 100,
      step: 50,
    },
    {
      id: "designLoad",
      label: "Design snow load",
      type: "select",
      defaultImperial: 30,
      options: [
        { label: "20 psf (mild — S. US)", value: 20 },
        { label: "30 psf (moderate — mid-US)", value: 30 },
        { label: "40 psf (heavy — NE, Midwest)", value: 40 },
        { label: "60 psf (very heavy — N. NE, UP)", value: 60 },
        { label: "80 psf (extreme — mountains)", value: 80 },
      ],
      help: "Code-specified ground snow load for your area",
    },
  ],

  calculate: (values, units) => {
    const snowDepthInput = Number(values.snowDepth) || 0;
    const snowType = String(values.snowType || "packed");
    const iceInput = Number(values.iceThickness) || 0;
    const roofAreaInput = Number(values.roofArea) || 0;
    const designLoad = Number(values.designLoad) || 30;

    const snowDepthFt = units === "metric" ? snowDepthInput / (2.54 * 12) : snowDepthInput / 12;
    const iceFt = units === "metric" ? iceInput / (2.54 * 12) : iceInput / 12;
    const roofAreaSqFt = units === "metric" ? roofAreaInput * 10.764 : roofAreaInput;

    const snowDensity: Record<string, number> = {
      powder: 5,
      packed: 15,
      wet: 25,
      ice: 35,
    };
    const density = snowDensity[snowType] || 15;

    const snowLoadPsf = snowDepthFt * density;
    const iceLoadPsf = iceFt * 57;
    const totalPsf = snowLoadPsf + iceLoadPsf;
    const totalLb = totalPsf * roofAreaSqFt;

    const overLimit = totalPsf > designLoad;
    const pctOfDesign = (totalPsf / designLoad) * 100;

    const status = overLimit
      ? `⚠ OVER design load (${round(pctOfDesign, 0)}%)`
      : pctOfDesign > 80
        ? `CAUTION (${round(pctOfDesign, 0)}% of design)`
        : `OK (${round(pctOfDesign, 0)}% of design)`;

    return {
      value: round(totalPsf, 1),
      unit: "psf",
      valueRounded: Math.ceil(totalPsf),
      breakdown: [
        { label: "snow load", value: `${round(snowLoadPsf, 1)} psf` },
        { label: "ice load", value: `${round(iceLoadPsf, 1)} psf` },
        { label: "total load", value: `${round(totalPsf, 1)} psf` },
        { label: "total weight on roof", value: `${formatNumber(round(totalLb, 0))} lb` },
        { label: "design limit", value: `${designLoad} psf` },
        { label: "status", value: status },
      ],
      formulaSteps: [
        `snow depth = ${snowDepthInput} ${units === "metric" ? "cm" : "in"} = ${round(snowDepthFt, 2)} ft`,
        `snow density = ${density} lb/ft³ (${snowType})`,
        `snow load = ${round(snowDepthFt, 2)} × ${density} = ${round(snowLoadPsf, 1)} psf`,
        iceInput > 0
          ? `ice = ${iceInput} ${units === "metric" ? "cm" : "in"} × 57 lb/ft³ = ${round(iceLoadPsf, 1)} psf`
          : "no ice layer",
        `total psf = ${round(snowLoadPsf, 1)} + ${round(iceLoadPsf, 1)} = ${round(totalPsf, 1)} psf`,
        `total weight = ${round(totalPsf, 1)} psf × ${formatNumber(round(roofAreaSqFt, 0))} ft² = ${formatNumber(round(totalLb, 0))} lb`,
        `vs design limit ${designLoad} psf: ${status}`,
      ],
      composition: {
        unit: "psf",
        total: round(totalPsf, 1),
        segments: [
          { label: "Snow", amount: round(snowLoadPsf, 1), shade: "primary" },
          ...(iceLoadPsf > 0
            ? [{ label: "Ice", amount: round(iceLoadPsf, 1), shade: "secondary" as const }]
            : []),
        ],
      },
    };
  },

  ContentExpansion: SnowLoadCalculatorExpansion,

  formulaDescription:
    "load (psf) = snow depth × density + ice × 57; compare vs design load (code-specified)",

  methodology: [
    "Snow weight varies hugely by type. Fresh powder is only about 5 pounds per cubic foot. Settled snow after a few days is 15 lb/ft³. Wet, partially melted snow is 25 lb/ft³. Old compacted snow or ice-crusted snow approaches 35 lb/ft³. Solid ice is the heaviest at 57 lb/ft³.",
    "Roof snow load in pounds per square foot (psf) is snow depth times density. A 2-foot accumulation of packed snow at 15 lb/ft³ = 30 psf. Same depth of wet snow = 50 psf. Same depth with a 1-inch ice glaze adds another 4-5 psf. Multiply by roof area to get total pounds of load the structure carries.",
    "Compare actual load against your region's design snow load — the code-specified ground snow load your roof was engineered to handle. Southern US typically 20 psf. Mid-Atlantic and central US 30-40 psf. Northeast, Great Lakes, and Rockies 50-70 psf. Mountain resort areas and Upper Peninsula can require 80+ psf design loads.",
    "When actual load approaches 80% of design, consider removing snow — heavy drifts, ice dams, or prolonged accumulation can exceed design capacity even in normal storms. When actual load exceeds design, immediate action: clear the roof (professional service in heavy loads), and consult a structural engineer to inspect for damage.",
    "Important caveats: these calculations use uniform snow distribution. Drifting concentrates snow on leeward sides, behind dormers, and in roof valleys — local loads in these areas can be 2-3× the uniform load. Flat roofs retain more snow than pitched. Unheated structures accumulate more than heated (melt from below). In doubt, call a structural engineer, not this calculator.",
    "Not captured: dynamic loads from wind+snow combinations, seismic considerations for heavy snow regions, non-uniform drift loading per ASCE 7 section 7.7, or rain-on-snow load increases. For engineering purposes, use a professional per ASCE 7-22 chapter 7 rather than this educational tool.",
  ],

  sources: [
    {
      name: "ASCE 7 — Minimum Design Loads",
      url: "https://www.asce.org/publications-and-news/civil-engineering-source/article/2022/03/01/asce-7-22",
      note: "Standard for structural design loads including snow",
    },
    {
      name: "FEMA — Snow Load Safety",
      url: "https://www.fema.gov/",
      note: "Public safety guide for roof snow assessment",
    },
  ],

  related: [
    { name: "Roofing calculator", slug: "roofing-calculator", description: "Shingle bundles for any pitch" },
    { name: "Insulation calculator", slug: "insulation-calculator", description: "R-value by climate zone" },
    { name: "Attic ventilation calculator", slug: "attic-ventilation-calculator", description: "NFVA to prevent ice dams" },
    { name: "Gutter calculator", slug: "gutter-calculator", description: "Sized for your rainfall" },
  ],

  faq: [
    {
      question: "How much does roof snow weigh?",
      answer:
        "Varies by type. One foot of fresh powder = 5 psf. One foot of packed snow = 15 psf. One foot of wet snow = 25 psf. One inch of ice = 5 psf. A 2,000 sq ft roof with 18\" of packed snow carries 45,000 lbs — the weight of 15 cars. The calculator above handles any combination.",
    },
    {
      question: "How do I know my design snow load?",
      answer:
        "Check your original building permit or plans (typically labeled 'roof snow load' in psf). If unavailable, contact your local building department — design snow loads are mapped by ZIP code per ASCE 7. Quick reference: southern US 20 psf, mid-US 30-40 psf, northern US 50+ psf, mountain areas 60-100+ psf.",
    },
    {
      question: "When should I clear snow off my roof?",
      answer:
        "When actual load exceeds about 80% of design load. For a standard 30 psf design: clear if packed snow exceeds 22 inches or wet snow exceeds 14 inches. If ice dams form, address those first (usually a separate issue from structural load). Don't wait until you see sagging — by then, damage is already happening.",
    },
    {
      question: "How do I measure roof snow depth safely?",
      answer:
        "From the ground with a long pole marked in inches (paint marks on a yardstick taped to a broom handle works). Measure at several points. Don't climb up — wet snow is slick, and structural failures are unpredictable. For professional assessment, roof rake companies provide measurement and removal services after major storms.",
    },
    {
      question: "What's the difference between ground and roof snow load?",
      answer:
        "Ground snow load (pg) is measured on flat terrain. Roof snow load is typically 70% of ground snow load due to wind scour and thermal effects on the roof. The design values in this calculator are roof loads. The heavier ground load is the input to ASCE 7 calculations; code converts it to roof load automatically.",
    },
    {
      question: "Why does wet snow weigh more?",
      answer:
        "Water is heavy (62.4 lb/ft³). Wet snow is a mix of ice crystals and liquid water — about 40% water by volume. Fresh powder is mostly air (95%+ air, 5% ice). As snow ages, melts, and refreezes, air escapes and density increases dramatically. A wet spring storm can triple the load of the equivalent depth of fresh powder.",
    },
    {
      question: "Does roof pitch affect snow load?",
      answer:
        "Yes. Steeper roofs shed snow more readily. Roofs 15° or steeper (3/12+ pitch) can reduce snow load significantly — ASCE 7 allows reductions up to 40% for very steep unobstructed roofs. Low-slope roofs (under 3/12) retain snow longer. The calculator uses actual measured depth, so you don't need to calculate pitch reduction separately.",
    },
    {
      question: "Can my roof collapse from snow?",
      answer:
        "Yes — it happens every winter in storm-affected regions. Warning signs: cracking sounds, ceiling sag, doors/windows jamming, drywall cracks, water leaking at unusual spots. If you see warning signs, evacuate and call a professional immediately. Do NOT continue using the structure — collapses progress from initial failure to total collapse quickly.",
    },
  ],
};
