import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const gravelCalculatorConfig: CalculatorConfig = {
  slug: "gravel-calculator",
  title: "Gravel Calculator",
  description:
    "Estimate aggregate volume from area and selected depth, with an approximate weight based on a stated material-density assumption. Not a site or pavement design.",
  categoryLabel: "Landscaping",
  category: "landscaping",

  bannerHeadline: "Gravel smarter.",
  bannerTags: ["Volume and approximate weight", "Selected depth", "Planning estimate"],

  inputs: [
    {
      id: "length",
      label: "Length",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 20,
      defaultMetric: 6,
      min: 1,
      step: 0.5,
    },
    {
      id: "width",
      label: "Width",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 10,
      defaultMetric: 3,
      min: 0.5,
      step: 0.5,
    },
    {
      id: "depth",
      label: "Depth",
      type: "select",
      defaultImperial: 4,
      options: [
        { label: '2" / 5 cm', value: 2 },
        { label: '3" / 7.5 cm', value: 3 },
        { label: '4" / 10 cm', value: 4 },
        { label: '6" / 15 cm', value: 6 },
        { label: '8" / 20 cm', value: 8 },
      ],
      help: "Depth is an input assumption, not a recommendation. Choose it from a project-specific plan or supplier guidance.",
    },
    {
      id: "type",
      label: "Gravel type",
      type: "select",
      defaultImperial: "crushed",
      options: [
        { label: "Crushed stone (approx.)", value: "crushed" },
        { label: "Pea gravel (approx.)", value: "pea" },
        { label: "River rock (approx.)", value: "river" },
        { label: "Sand (approx.)", value: "sand" },
      ],
    },
  ],

  calculate: (values, units) => {
    const L = Number(values.length) || 0;
    const W = Number(values.width) || 0;
    const depthInches = Number(values.depth) || 4;
    const type = String(values.type || "crushed");

    const depthInLinear =
      units === "metric"
        ? (depthInches * 0.0254)
        : depthInches / 12;

    const area = L * W;
    const volumeInLinearCubed = area * depthInLinear;

    const volumeInYardsOrMeters =
      units === "metric"
        ? volumeInLinearCubed
        : volumeInLinearCubed / 27;

    // Imperial assumptions are US short tons per cubic yard.
    const densities: Record<string, number> = {
      crushed: 1.4,
      pea: 1.4,
      river: 1.35,
      sand: 1.5,
    };
    const density = densities[type] || 1.4;
    // Convert US short tons/yd³ to metric tonnes/m³.
    const densityForUnits = units === "metric" ? density * (0.90718474 / 0.764554858) : density;
    const tonsOrTonnes = volumeInYardsOrMeters * densityForUnits;

    const unitShort = units === "metric" ? "m³" : "yd³";
    const weightUnit = units === "metric" ? "tonnes" : "tons";

    return {
      value: round(volumeInYardsOrMeters, 3),
      unit: units === "metric" ? "cubic meters" : "cubic yards",
      valueRounded: roundUp(volumeInYardsOrMeters, 2),
      breakdown: [
        {
          label: "area",
          value: `${formatNumber(round(area, 1))} ${units === "metric" ? "m²" : "ft²"}`,
        },
        {
          label: "depth",
          value: units === "metric" ? `${formatNumber(round(depthInches * 2.54, 1))} cm` : `${depthInches}"`,
        },
        {
          label: "weight",
          value: `${formatNumber(round(tonsOrTonnes, 2))} ${weightUnit}`,
        },
      ],
      formulaSteps: [
        `area = ${L} × ${W} = ${formatNumber(round(area, 2))} ${units === "metric" ? "m²" : "ft²"}`,
        units === "metric"
          ? `depth = ${formatNumber(round(depthInches * 2.54, 1))} cm = ${formatNumber(round(depthInLinear, 4))} m`
          : `depth = ${depthInches}" = ${formatNumber(round(depthInLinear, 3))} ft`,
        units === "metric"
          ? `volume = ${formatNumber(round(area, 2))} × ${formatNumber(round(depthInLinear, 3))} = ${formatNumber(round(volumeInYardsOrMeters, 3))} m³`
          : `volume = ${formatNumber(round(area, 2))} × ${formatNumber(round(depthInLinear, 3))} = ${formatNumber(round(volumeInLinearCubed, 2))} ft³ ÷ 27 = ${formatNumber(round(volumeInYardsOrMeters, 3))} yd³`,
        `weight = ${formatNumber(round(volumeInYardsOrMeters, 3))} × ${formatNumber(round(densityForUnits, 3))} = ${formatNumber(round(tonsOrTonnes, 2))} ${weightUnit}`,
        `rounded up to ${formatNumber(roundUp(volumeInYardsOrMeters, 2))} ${unitShort}`,
      ],
    };
  },

  formulaDescription:
    "volume = area × depth, weight = volume × density (tons per yd³ or tonnes per m³)",

  methodology: [
    "Volume is calculated by multiplying the entered area by the selected depth, with conversion to cubic yards or cubic metres. It assumes the entered dimensions describe a simple rectangle.",
    "Weight is approximate and uses editable-in-code reference assumptions by material type. Actual bulk density depends on gradation, moisture, source, and packing; confirm weight and order quantity with the aggregate supplier.",
    "Depth is entered by the user and is not a recommendation. This tool does not assess subgrade, drainage, compaction, traffic, layer design, or local requirements. Use a project-specific specification for construction.",
  ],

  sources: [
    {
      name: "ASTM D448: Standard Sizes of Coarse Aggregate",
      url: "https://www.astm.org/d0448-12r17.html",
      note: "The gradation numbering behind #57, #8, and the other size designations",
    },
    {
      name: "AASHTO M43: Sizes of Aggregate for Road Construction",
      url: "https://store.transportation.org/",
      note: "The parallel highway specification most suppliers reference for base material",
    },
    {
      name: "USDA NRCS: Gravel Road Construction and Maintenance",
      url: "https://www.nrcs.usda.gov/resources/guides-and-instructions",
      note: "Base depth, crowning, and compaction practice for unpaved surfaces",
    },
    {
      name: "University of Minnesota Extension: Driveway Base",
      url: "https://extension.umn.edu/",
      note: "Residential driveway build-up and drainage recommendations",
    },
    {
      name: "NCMA: Aggregate Base for Segmental Pavements",
      url: "https://ncma.org/resource-library/",
      note: "Compaction lift depth and geotextile use over weak subgrade",
    },
  ],

  related: [
    { name: "Mulch calculator", slug: "mulch-calculator", description: "Cubic yards or bags for garden beds" },
    { name: "Sod calculator", slug: "sod-calculator", description: "Sod for the lawn beside the gravel path" },
    { name: "Topsoil calculator", slug: "topsoil-calculator", description: "Cubic yards or bags of topsoil" },
    { name: "Asphalt calculator", slug: "asphalt-calculator", description: "Tons of asphalt for a driveway over this base" },
  ],

  faq: [
    { question: "How is aggregate volume calculated?", answer: "The calculator multiplies the entered length and width by the selected depth. Irregular areas or changing depths should be split into sections and calculated separately." },
    { question: "How accurate is the weight estimate?", answer: "It is approximate. Aggregate density varies with material gradation, moisture, and source; ask the supplier for the density or tonnage used for the product you are ordering." },
    { question: "Does this recommend a driveway or base depth?", answer: "No. Depth is only an input. The required layer design depends on project-specific soil, drainage, traffic, material, and local conditions." },
    { question: "Does this calculate current aggregate prices?", answer: "No. Pricing, minimum loads, and delivery fees vary by supplier and location. Request a current quote for the specified material and quantity." },
  ],
};
