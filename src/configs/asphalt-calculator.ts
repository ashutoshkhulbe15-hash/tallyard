import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const asphaltCalculatorConfig: CalculatorConfig = {
  slug: "asphalt-calculator",
  title: "Asphalt Calculator",
  description:
    "Estimate asphalt volume and approximate weight from area, selected compacted thickness, and an explicit density assumption. Not a pavement design.",
  categoryLabel: "Masonry",
  category: "concrete",

  bannerHeadline: "Pave firmly.",
  bannerTags: ["Volume and approximate weight", "Selected thickness", "Planning estimate"],

  inputs: [
    {
      id: "shape",
      label: "Shape",
      type: "select",
      defaultImperial: "rectangular",
      options: [
        { label: "Rectangular", value: "rectangular" },
        { label: "Circular", value: "circular" },
      ],
    },
    {
      id: "length",
      label: "Length (or diameter for circular)",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 50,
      defaultMetric: 15,
      min: 2,
      step: 1,
    },
    {
      id: "width",
      label: "Width (ignored for circular)",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 12,
      defaultMetric: 3.7,
      min: 2,
      step: 1,
    },
    {
      id: "thickness",
      label: "Thickness (compacted)",
      type: "select",
      defaultImperial: 3,
      options: [
        { label: '2" / 5 cm', value: 2 },
        { label: '3" / 7.5 cm', value: 3 },
        { label: '4" / 10 cm', value: 4 },
        { label: '6" / 15 cm', value: 6 },
      ],
      help: "This is an input, not a recommended thickness. Confirm design with a qualified paving professional.",
    },
    {
      id: "waste",
      label: "Waste factor",
      type: "select",
      defaultImperial: 10,
      options: [
        { label: "5%", value: 5 },
        { label: "10%", value: 10 },
        { label: "15%", value: 15 },
      ],
    },
  ],

  calculate: (values, units) => {
    const shape = String(values.shape || "rectangular");
    const L = Number(values.length) || 0;
    const W = Number(values.width) || 0;
    const thicknessInches = Number(values.thickness) || 3;
    const waste = Number(values.waste) || 10;

    const thicknessInLinear =
      units === "metric" ? (thicknessInches * 2.5) / 100 : thicknessInches / 12;

    let area: number;
    if (shape === "circular") {
      const radius = L / 2;
      area = Math.PI * radius * radius;
    } else {
      area = L * W;
    }

    const volumeInLinearCubed = area * thicknessInLinear;

    // Asphalt density: 145 lb/ft³ (hot mix) → 1 cubic yard = 3,915 lbs = 1.96 tons
    // Convert volume → tons
    const tons =
      units === "metric"
        ? volumeInLinearCubed * 2.32 // 2.32 tonnes per m³ for compacted asphalt
        : ((volumeInLinearCubed * 145) / 2000); // lb per ft³ ÷ 2000 = tons

    const tonsWithWaste = tons * (1 + waste / 100);

    // Volume in cubic yards for reference
    const volumeInYards =
      units === "metric" ? volumeInLinearCubed : volumeInLinearCubed / 27;

    const weightUnit = units === "metric" ? "tonnes" : "tons";
    const areaUnit = units === "metric" ? "m²" : "ft²";
    const volUnit = units === "metric" ? "m³" : "yd³";

    return {
      value: round(tonsWithWaste, 2),
      unit: weightUnit,
      valueRounded: roundUp(tonsWithWaste, 1),
      breakdown: [
        { label: "area", value: `${formatNumber(round(area, 1))} ${areaUnit}` },
        {
          label: "thickness",
          value: units === "metric" ? `${thicknessInches * 2.5} cm` : `${thicknessInches}"`,
        },
        { label: "volume", value: `${formatNumber(round(volumeInYards, 2))} ${volUnit}` },
        { label: "waste", value: `${waste}%` },
      ],
      formulaSteps: [
        shape === "circular"
          ? `area = π × (${L}/2)² = ${formatNumber(round(area, 1))} ${areaUnit}`
          : `area = ${L} × ${W} = ${formatNumber(round(area, 1))} ${areaUnit}`,
        units === "metric"
          ? `thickness = ${thicknessInches * 2.5} cm = ${formatNumber(round(thicknessInLinear, 3))} m`
          : `thickness = ${thicknessInches}" = ${formatNumber(round(thicknessInLinear, 3))} ft`,
        units === "metric"
          ? `volume = ${formatNumber(round(area, 1))} × ${formatNumber(round(thicknessInLinear, 3))} = ${formatNumber(round(volumeInLinearCubed, 2))} m³`
          : `volume = ${formatNumber(round(area, 1))} × ${formatNumber(round(thicknessInLinear, 3))} = ${formatNumber(round(volumeInLinearCubed, 2))} ft³`,
        units === "metric"
          ? `tonnes = ${formatNumber(round(volumeInLinearCubed, 2))} × 2.32 = ${formatNumber(round(tons, 2))} tonnes`
          : `tons = ${formatNumber(round(volumeInLinearCubed, 2))} × 145 ÷ 2000 = ${formatNumber(round(tons, 2))} tons`,
        `with ${waste}% waste = ${formatNumber(round(tons, 2))} × ${(1 + waste / 100).toFixed(2)} = ${formatNumber(round(tonsWithWaste, 2))} ${weightUnit}`,
        `rounded up to ${formatNumber(roundUp(tonsWithWaste, 1))} ${weightUnit}`,
      ],
    };
  },

  formulaDescription:
    "tons = area × thickness × density × (1 + waste), where density = 145 lb/ft³",

  methodology: [
    "The calculator multiplies area by the selected compacted thickness, then estimates weight using an assumed density of 145 lb/ft³ (approximately 2.32 tonnes/m³). Actual mix density and order quantities vary; use supplier mix data for procurement.",
    "Rectangular areas use length × width. Circular areas (turnaround circles, cul-de-sacs) use π × radius². Enter the diameter in the length field and leave width alone: it's ignored for circular shapes.",
    "Thickness and allowance are user-selected assumptions, not recommendations. This tool does not assess traffic, subgrade, drainage, base design, mix, lifts, compaction, or local requirements. Have the pavement section specified for the site by a qualified professional.",
    "This output is a planning estimate, not an order quantity. Confirm dimensions, mix, density, delivery conditions, and quantity with the paving supplier or contractor.",
  ],

  sources: [
    {
      name: "Asphalt Institute MS-2: Asphalt Mix Design Methods",
      url: "https://www.asphaltinstitute.org/engineering/publications/",
      note: "Mix composition and compacted unit weight behind the 145 lb per cubic foot figure",
    },
    {
      name: "NAPA: Asphalt Pavement Construction",
      url: "https://www.asphaltpavement.org/expertise/construction",
      note: "Placement and compaction practice, including minimum paving temperatures",
    },
    {
      name: "Asphalt Institute: Pavement Thickness Design",
      url: "https://www.asphaltinstitute.org/engineering/",
      note: "Surface and base thickness guidance by traffic loading",
    },
    {
      name: "ASTM D6926: Preparation of Asphalt Mixture Specimens",
      url: "https://www.astm.org/d6926-20.html",
      note: "The density practice field compaction is verified against",
    },
    {
      name: "FTC: Home Improvement Contractor Fraud",
      url: "https://consumer.ftc.gov/articles/how-avoid-home-improvement-scam",
      note: "The driveway paving scam pattern and how to check a contractor",
    },
  ],

  related: [
    { name: "Concrete calculator", slug: "concrete-calculator", description: "Cubic yards for concrete slabs and driveways" },
    { name: "Gravel calculator", slug: "gravel-calculator", description: "Base gravel under asphalt or pavers" },
    { name: "Paver calculator", slug: "paver-calculator", description: "Alternative to asphalt for driveways" },
    { name: "Fence calculator", slug: "fence-calculator", description: "Perimeter for paved areas" },
  ],

  faq: [
    { question: "How is the weight estimate calculated?", answer: "The tool calculates geometric volume from area and selected compacted thickness, then multiplies by its stated density assumption. Use supplier mix data for an actual order." },
    { question: "Does this tell me what thickness or base to build?", answer: "No. Thickness is an input only. Traffic, subgrade, drainage, climate, materials, and local requirements affect pavement design; consult a qualified paving professional." },
    { question: "Is this an exact order quantity or price quote?", answer: "No. It does not model mix-specific density, construction tolerances, delivery constraints, or local pricing. Confirm quantity and current pricing with a supplier or contractor." },
  ],
};
