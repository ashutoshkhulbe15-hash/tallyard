import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const asphaltCalculatorConfig: CalculatorConfig = {
  slug: "asphalt-calculator",
  title: "Asphalt Calculator",
  description:
    "Tons of asphalt for any driveway or parking area. Accounts for typical 145 lb/ft³ density and standard compaction depths.",
  categoryLabel: "Masonry",
  category: "concrete",

  bannerHeadline: "Pave firmly.",
  bannerTags: ["Tons and yards", "Standard density", "Driveways · lots · paths"],

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
        { label: '2" / 5 cm (residential overlay)', value: 2 },
        { label: '3" / 7.5 cm (standard driveway)', value: 3 },
        { label: '4" / 10 cm (heavy use)', value: 4 },
        { label: '6" / 15 cm (parking lot)', value: 6 },
      ],
      help: "3\" is standard for residential driveways; 4\"+ for trucks",
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
    "The calculator multiplies area by compacted thickness to get volume, then converts volume to weight using asphalt's typical density of 145 pounds per cubic foot (hot-mix asphalt, after compaction). For metric, that's approximately 2.32 tonnes per cubic meter.",
    "Rectangular areas use length × width. Circular areas (turnaround circles, cul-de-sacs) use π × radius². Enter the diameter in the length field and leave width alone — it's ignored for circular shapes.",
    "Thickness is the finished, compacted thickness — not the loose lift thickness the crew shovels down. Hot asphalt compacts about 25% under the roller, so 4 inches of loose material becomes 3 inches compacted. When ordering, you want enough material for the compacted thickness; waste factor covers the compaction loss.",
    "Standard compacted thicknesses: 2 inches for a residential overlay over existing asphalt or concrete; 3 inches for a new residential driveway on prepared base; 4 inches for driveways that bear trucks or RVs; 6 inches for parking lots with heavy truck traffic. Anything thicker than 6 inches is typically poured in multiple lifts.",
    "Waste factor of 10% is standard — covers material that cools during transit, trimmings around edges, and the truck's 'last drop' that often isn't fully usable. Use 5% for simple rectangular driveways with a pumper or chute delivery; 15% for complex shapes or when material has to be wheeled to the site in buckets.",
    "This calculator does not include: the gravel base layer under asphalt (typically 4-8 inches of compacted crushed stone — use the gravel calculator), edge forms, curbing, or drainage. A proper asphalt installation is asphalt + base + drainage planning + final sealing.",
  ],

  sources: [
    {
      name: "National Asphalt Pavement Association (NAPA)",
      url: "https://www.asphaltpavement.org/",
      note: "Industry standards for asphalt density and compaction",
    },
    {
      name: "Asphalt Institute — Pavement Design Guide",
      url: "https://www.asphaltinstitute.org/",
      note: "Thickness requirements by traffic loading",
    },
  ],

  related: [
    { name: "Concrete calculator", slug: "concrete-calculator", description: "Cubic yards for concrete slabs and driveways" },
    { name: "Gravel calculator", slug: "gravel-calculator", description: "Base gravel under asphalt or pavers" },
    { name: "Paver calculator", slug: "paver-calculator", description: "Alternative to asphalt for driveways" },
    { name: "Fence calculator", slug: "fence-calculator", description: "Perimeter for paved areas" },
  ],

  faq: [
    {
      question: "How many tons of asphalt do I need for a 50×12 driveway?",
      answer:
        "For a 50×12 ft driveway at 3 inches compacted thickness with 10% waste, you need about 12 tons of hot-mix asphalt. At 4 inches (for heavier vehicles), 16 tons. The calculator above handles different shapes and thicknesses.",
    },
    {
      question: "How thick should my asphalt driveway be?",
      answer:
        "3 inches compacted for standard passenger-car driveways on properly prepared 4-6 inch gravel base. 4 inches for driveways that see heavy trucks, RVs, or have marginal subgrade. 6 inches for commercial parking lots. Going thinner saves money short-term but dramatically shortens pavement life.",
    },
    {
      question: "What's the difference between tons and cubic yards of asphalt?",
      answer:
        "Asphalt is sold by the ton (weight) because density is very consistent for hot-mix. 1 cubic yard ≈ 1.96 tons at typical compacted density. The calculator shows both so you can match whatever your supplier quotes.",
    },
    {
      question: "How much does asphalt cost?",
      answer:
        "In 2025-2026 US market: $100-170 per ton delivered and placed for hot-mix asphalt driveways. Small jobs (under 10 tons) carry a minimum charge. Parking lots and large commercial jobs run $80-120 per ton. Sealcoating is separate ($0.10-0.25 per sq ft every 2-3 years).",
    },
    {
      question: "Do I need a base under asphalt?",
      answer:
        "Yes — asphalt alone over dirt fails quickly. Standard residential: 4-6 inches of compacted crushed stone (#57 or #3) under 3 inches of asphalt. Frost-prone climates may need 8-10 inches of base. Skipping base saves initial cost but leads to cracking and sinking within 2-3 years.",
    },
    {
      question: "Can I DIY an asphalt driveway?",
      answer:
        "Not really — hot-mix asphalt arrives at 275-300°F and must be placed and compacted within 1-2 hours before it cools below workable temperature. Cold patch asphalt (bagged product) is available for small pothole repairs and can be DIY'd, but it's not suitable for a full driveway — it never fully cures and lasts only 1-2 years.",
    },
    {
      question: "When is the best time to lay asphalt?",
      answer:
        "Warm, dry weather: 50°F or above ambient temperature, dry surface, no rain in the forecast for 24 hours. In the US, April-October for most regions. Cold-weather placement is possible with 'warm mix' asphalt but is harder to compact properly and costs more.",
    },
    {
      question: "How long before I can drive on it?",
      answer:
        "48-72 hours for light passenger-car use. 7 days before parking in the same spot repeatedly (asphalt continues to cure for weeks; heavy static loads can leave depressions). Sealcoating should wait 6-12 months to allow full cure before adding surface treatment.",
    },
  ],
};
