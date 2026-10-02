import { SnowLoadCalculatorExpansion } from "@/content/snow-load-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber, ceilQuantity } from "@/lib/format";

export const snowLoadCalculatorConfig: CalculatorConfig = {
  ContentExpansion: SnowLoadCalculatorExpansion,
  slug: "snow-load-calculator",
  title: "Snow Load Calculator",
  description:
    "Approximate weight of a uniform snow and ice layer. This does not determine a roof's structural capacity or whether it is safe.",
  categoryLabel: "Roofing",
  category: "roofing",

  bannerHeadline: "Estimate snow weight.",
  bannerTags: ["psf + total lb", "Uniform-load estimate", "Not a safety verdict"],

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
      help: "Solid ice weighs 57 lb/ft³: adds significant load",
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
  ],

  calculate: (values, units) => {
    const snowDepthInput = Number(values.snowDepth);
    const snowType = String(values.snowType);
    const iceInput = Number(values.iceThickness);
    const roofAreaInput = Number(values.roofArea);
    if (![snowDepthInput, iceInput, roofAreaInput].every(Number.isFinite) ||
        snowDepthInput < 0 || iceInput < 0 || roofAreaInput <= 0 ||
        !["powder", "packed", "wet", "ice"].includes(snowType)) {
      throw new Error("Enter nonnegative snow and ice depths, a positive roof area, and a listed snow type.");
    }

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

    return {
      value: round(totalLb, 0),
      unit: "lb total weight on roof",
      valueRounded: ceilQuantity(totalLb),
      breakdown: [
        { label: "snow load", value: `${round(snowLoadPsf, 1)} psf` },
        { label: "ice load", value: `${round(iceLoadPsf, 1)} psf` },
        { label: "total pressure", value: `${round(totalPsf, 1)} psf` },
        { label: "roof area", value: `${formatNumber(round(roofAreaSqFt, 0))} ft²` },
        { label: "total weight", value: `${formatNumber(round(totalLb, 0))} lb (${formatNumber(round(totalLb / 2000, 1))} tons)` },
        { label: "structural capacity", value: "not calculated" },
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
        "This weight estimate does not account for drifting, roof geometry, structural condition, or the site-specific design roof load.",
      ],
      ...(totalPsf > 0 ? { composition: {
        unit: "psf",
        total: round(totalPsf, 1),
        segments: [
          { label: "Snow", amount: round(snowLoadPsf, 1), shade: "primary" },
          ...(iceLoadPsf > 0
            ? [{ label: "Ice", amount: round(iceLoadPsf, 1), shade: "secondary" as const }]
            : []),
        ],
      } } : {}),
    };
  },

  formulaDescription:
    "estimated uniform load (psf) = snow depth (ft) × assumed density + ice depth (ft) × 57",

  methodology: [
    "Snow weight varies hugely by type. Fresh powder is only about 5 pounds per cubic foot. Settled snow after a few days is 15 lb/ft³. Wet, partially melted snow is 25 lb/ft³. Old compacted snow or ice-crusted snow approaches 35 lb/ft³. Solid ice is the heaviest at 57 lb/ft³.",
    "Roof snow load in pounds per square foot (psf) is snow depth times density. A 2-foot accumulation of packed snow at 15 lb/ft³ = 30 psf. Same depth of wet snow = 50 psf. Same depth with a 1-inch ice glaze adds another 4-5 psf. Multiply by roof area to get total pounds of load the structure carries.",
    "This estimates only the weight of an assumed uniform layer. A ground snow load is not the same as a roof design load, and neither can be inferred from this calculator. Do not use the number as a capacity or safety threshold.",
    "Important caveats: these calculations use uniform snow distribution. Drifting concentrates snow on leeward sides, behind dormers, and in roof valleys: local loads in these areas can be 2-3× the uniform load. Flat roofs retain more snow than pitched. Unheated structures accumulate more than heated (melt from below). In doubt, call a structural engineer, not this calculator.",
    "Not captured: dynamic loads from wind+snow combinations, seismic considerations for heavy snow regions, non-uniform drift loading per ASCE 7 section 7.7, or rain-on-snow load increases. For engineering purposes, use a professional per ASCE 7-22 chapter 7 rather than this educational tool.",
  ],

  sources: [
    {
      name: "ASCE 7-22, Chapter 7: Snow Loads",
      url: "https://www.asce.org/publications-and-news/asce-7",
      note: "The flat roof conversion pf = 0.7 Ce Ct Is pg and the slope factor Cs",
    },
    {
      name: "ASCE 7 Hazard Tool: Snow Load by Location",
      url: "https://ascehazardtool.org/",
      note: "Returns a ground snow load for a specific latitude and longitude under ASCE 7-22",
    },
    {
      name: "IRC 2021, Table R301.2(1): Climatic and Geographic Design Criteria",
      url: "https://codes.iccsafe.org/content/IRC2021P1/chapter-3-building-planning",
      note: "The table each jurisdiction fills in with its own adopted ground snow load",
    },
    {
      name: "FEMA P-957: Snow Load Safety Guide",
      url: "https://www.fema.gov/sites/default/files/documents/fema957_snowload_guide.pdf",
      note: "Snow density values, roof distress warning signs, and safe clearing practice",
    },
    {
      name: "NRCA: Roof Snow Removal Guidance",
      url: "https://www.nrca.net/roofing-guidelines/resources",
      note: "Industry practice for clearing snow without damaging roof coverings",
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
        "Varies by type. One foot of fresh powder = 5 psf. One foot of packed snow = 15 psf. One foot of wet snow = 25 psf. One inch of ice = 5 psf. A 2,000 sq ft roof with 18\" of packed snow carries 45,000 lbs, the weight of 15 cars. The calculator above handles any combination.",
    },
    {
      question: "How do I know my design snow load?",
      answer:
        "Check the building plans or ask your local building department and a structural engineer. Ground and design roof snow loads are different values; this calculator does not determine either one.",
    },
    {
      question: "When should I clear snow off my roof?",
      answer:
        "This weight estimate cannot establish a safe removal threshold. If you see sagging, unusual cracking sounds, or sticking doors, leave the building and seek professional help. Do not climb onto a snow-covered roof.",
    },
    {
      question: "How do I measure roof snow depth safely?",
      answer:
        "From the ground with a long pole marked in inches (paint marks on a yardstick taped to a broom handle works). Measure at several points. Don't climb up: wet snow is slick, and structural failures are unpredictable. For professional assessment, roof rake companies provide measurement and removal services after major storms.",
    },
    {
      question: "What's the difference between ground and roof snow load?",
      answer:
        "Ground snow load is a location-based design input. Design roof load depends on additional roof and site factors, including exposure, thermal conditions, slope, and drifting. The weight estimated here is neither of those design values.",
    },
    {
      question: "Why does wet snow weigh more?",
      answer:
        "Water is heavy (62.4 lb/ft³). Wet snow is a mix of ice crystals and liquid water, about 40% water by volume. Fresh powder is mostly air (95%+ air, 5% ice). As snow ages, melts, and refreezes, air escapes and density increases dramatically. A wet spring storm can triple the load of the equivalent depth of fresh powder.",
    },
    {
      question: "Does roof pitch affect snow load?",
      answer:
        "Yes. Steeper roofs shed snow more readily. Roofs 15° or steeper (3/12+ pitch) can reduce snow load significantly: ASCE 7 allows reductions up to 40% for very steep unobstructed roofs. Low-slope roofs (under 3/12) retain snow longer. The calculator uses actual measured depth, so you don't need to calculate pitch reduction separately.",
    },
    {
      question: "Can my roof collapse from snow?",
      answer:
        "Yes: it happens every winter in storm-affected regions. Warning signs: cracking sounds, ceiling sag, doors/windows jamming, drywall cracks, water leaking at unusual spots. If you see warning signs, evacuate and call a professional immediately. Do NOT continue using the structure: collapses progress from initial failure to total collapse quickly.",
    },
  ],
};
