import { AtticVentilationCalculatorExpansion } from "@/content/attic-ventilation-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const atticVentilationCalculatorConfig: CalculatorConfig = {
  ContentExpansion: AtticVentilationCalculatorExpansion,
  slug: "attic-ventilation-calculator",
  title: "Attic Ventilation Calculator",
  description: "Illustrative arithmetic for a user-selected attic-area ratio. Does not design a ventilation system or recommend vent products or quantities.",
  categoryLabel: "Roofing",
  category: "roofing",
  bannerHeadline: "Explore an area-ratio scenario.",
  bannerTags: ["Entered attic area", "Selected ratio assumption", "Not ventilation design"],
  inputs: [
    { id: "atticArea", label: "Attic floor area", type: "number", unitImperial: "ft²", unitMetric: "m²", defaultImperial: 1500, defaultMetric: 139.35, min: 0.01, step: 10 },
    {
      id: "ratio", label: "Illustrative ratio assumption", type: "select", defaultImperial: "300",
      options: [
        { label: "1:150 scenario", value: "150" },
        { label: "1:300 scenario", value: "300" },
      ],
      help: "These are arithmetic scenarios only; this tool does not determine which requirement applies.",
    },
  ],
  calculate: (values, units) => {
    const areaInput = Number(values.atticArea);
    const ratio = Number(values.ratio);
    if (![areaInput, ratio].every(Number.isFinite) || areaInput <= 0 || ![150, 300].includes(ratio)) {
      throw new Error("Enter a positive attic area and select one of the listed illustrative ratios.");
    }
    const areaSqM = units === "metric" ? areaInput : areaInput * 0.09290304;
    const nfvaSqM = areaSqM / ratio;
    const displayArea = units === "metric" ? nfvaSqM : nfvaSqM * 10.7639104167;
    const areaUnit = units === "metric" ? "m²" : "ft²";
    const intake = displayArea / 2;
    const exhaust = displayArea / 2;
    return {
      value: round(displayArea, 3),
      unit: `illustrative area (${areaUnit})`,
      valueRounded: round(displayArea, 2),
      breakdown: [
        { label: "entered attic area", value: `${formatNumber(round(areaInput, 2))} ${units === "metric" ? "m²" : "ft²"}` },
        { label: "selected scenario", value: `1:${ratio}` },
        { label: "scenario area arithmetic", value: `${formatNumber(round(displayArea, 3))} ${areaUnit}` },
        { label: "illustrative equal halves", value: `${formatNumber(round(intake, 3))} + ${formatNumber(round(exhaust, 3))} ${areaUnit}` },
      ],
      formulaSteps: [
        `entered area = ${round(areaSqM, 3)} m²`,
        `illustrative ratio scenario = ${round(areaSqM, 3)} ÷ ${ratio} = ${round(nfvaSqM, 5)} m²`,
        `displayed scenario amount = ${round(displayArea, 3)} ${areaUnit}; equal halves shown for arithmetic only`,
        "This is not a net-free-area calculation or ventilation design. Vent type, product ratings, intake/exhaust balance, assembly, climate, air sealing, moisture, and code are not assessed.",
      ],
    };
  },
  formulaDescription: "illustrative area amount = entered attic area ÷ user-selected ratio assumption",
  methodology: [
    "This worksheet divides entered attic floor area by one of two user-selected ratios and shows the result as an arithmetic scenario. The equal split is illustrative only and does not prescribe intake or exhaust placement or quantity.",
    "It does not determine whether the attic should be vented, identify the applicable code path, compute product-specific net-free area, account for obstructions or roof geometry, or size passive or powered vents. Assembly design and moisture management require project-specific review. Use approved plans, current local requirements, manufacturer data, and a qualified building professional.",
  ],
  sources: [],
  related: [
    { name: "Roof area estimator", slug: "roofing-calculator", description: "Planar area from simple entered geometry" },
    { name: "Insulation estimator", slug: "insulation-calculator", description: "Quantity estimates from product and entered assumptions" },
  ],
  faq: [
    { question: "Which ratio should I use?", answer: "This tool does not determine which requirement applies. Confirm the applicable code and assembly design with the local authority and a qualified building professional." },
    { question: "Does this tell me how many vents to install?", answer: "No. It does not use product net-free-area ratings, placement, obstruction, or system design information." },
    { question: "Can this diagnose attic moisture or ice dams?", answer: "No. Those conditions can have several causes and require a building-specific assessment." },
  ],
};
