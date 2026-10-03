import { reconcileCalculator } from "@/lib/reconcile-calculator";
import { gravelCalculatorConfig as checkedConfig } from "./checked/gravel-calculator";
import { GravelCalculatorExpansion } from "@/content/gravel-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const gravelCalculatorConfig: CalculatorConfig = {
  slug: "gravel-calculator",
  title: "Gravel Calculator",
  description:
    "Cubic yards of gravel, stone, or aggregate for driveways, paths, or base layers. Converts to tons for bulk ordering.",
  categoryLabel: "Landscaping",
  category: "landscaping",

  bannerHeadline: "Gravel smarter.",
  bannerTags: ["Yards and tons", "Any depth", "Drives · paths · base"],

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
      help: "Paths: 2-3\". Driveways: 4-6\". Base under slab: 4\".",
    },
    {
      id: "type",
      label: "Gravel type",
      type: "select",
      defaultImperial: "crushed",
      options: [
        { label: "Crushed stone (1.4 t/yd³)", value: "crushed" },
        { label: "Pea gravel (1.4 t/yd³)", value: "pea" },
        { label: "River rock (1.35 t/yd³)", value: "river" },
        { label: "Sand (1.5 t/yd³)", value: "sand" },
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
        ? (depthInches * 2.5) / 100
        : depthInches / 12;

    const area = L * W;
    const volumeInLinearCubed = area * depthInLinear;

    const volumeInYardsOrMeters =
      units === "metric"
        ? volumeInLinearCubed
        : volumeInLinearCubed / 27;

    // Density tons per cubic yard (or metric tons per cubic meter)
    const densities: Record<string, number> = {
      crushed: 1.4,
      pea: 1.4,
      river: 1.35,
      sand: 1.5,
    };
    const density = densities[type] || 1.4;
    // In metric, convert: tons/yd³ to tonnes/m³ — coincidentally very similar (1.3 m³/yd³),
    // so tonnes = volume × (density × 1.3) / 1.3 ≈ volume × density
    const tonsOrTonnes = volumeInYardsOrMeters * density;

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
          value: units === "metric" ? `${depthInches * 2.5} cm` : `${depthInches}"`,
        },
        {
          label: "weight",
          value: `${formatNumber(round(tonsOrTonnes, 2))} ${weightUnit}`,
        },
      ],
      formulaSteps: [
        `area = ${L} × ${W} = ${formatNumber(round(area, 2))} ${units === "metric" ? "m²" : "ft²"}`,
        units === "metric"
          ? `depth = ${depthInches * 2.5} cm = ${formatNumber(round(depthInLinear, 3))} m`
          : `depth = ${depthInches}" = ${formatNumber(round(depthInLinear, 3))} ft`,
        units === "metric"
          ? `volume = ${formatNumber(round(area, 2))} × ${formatNumber(round(depthInLinear, 3))} = ${formatNumber(round(volumeInYardsOrMeters, 3))} m³`
          : `volume = ${formatNumber(round(area, 2))} × ${formatNumber(round(depthInLinear, 3))} = ${formatNumber(round(volumeInLinearCubed, 2))} ft³ ÷ 27 = ${formatNumber(round(volumeInYardsOrMeters, 3))} yd³`,
        `weight = ${formatNumber(round(volumeInYardsOrMeters, 3))} × ${density} = ${formatNumber(round(tonsOrTonnes, 2))} ${weightUnit}`,
        `rounded up to ${formatNumber(roundUp(volumeInYardsOrMeters, 2))} ${unitShort}`,
      ],
    };
  },

  howTo: {
    name: "How to calculate gravel for a driveway or project",
    description:
      "Convert area and depth into cubic yards, then into tons, and pick the aggregate type that matches the job.",
    steps: [
      {
        name: "Measure the area",
        text: "Length times width in square feet. For a curved or irregular driveway, break it into rectangles and add them.",
      },
      {
        name: "Choose the depth",
        text: "Paths and patios take 2 to 3 inches. A driveway takes 4 to 6 inches total, usually as a base layer plus a top course.",
      },
      {
        name: "Convert to cubic yards",
        text: "Square feet divided by 324, times depth in inches. One cubic yard covers 324 square feet at one inch deep.",
      },
      {
        name: "Convert cubic yards to tons",
        text: "Crushed stone runs about 1.4 tons per cubic yard, so multiply yards by 1.4. Most suppliers price and deliver by the ton even when they quote in yards.",
      },
      {
        name: "Match the aggregate to the layer",
        text: "Use crusher run or crush and run for base, since the fines let it compact. Use #57 for drainage and for a driveway top course. Pea gravel is for paths and patios, not driveways.",
      },
    ],
  },

  ContentExpansion: GravelCalculatorExpansion,

  formulaDescription:
    "volume = area × depth, weight = volume × density (tons per yd³ or tonnes per m³)",

  methodology: [
    "Volume is calculated by multiplying area (length × width) by depth, then converting to cubic yards for imperial (÷27) or staying in cubic meters for metric. Most landscape suppliers sell gravel by the cubic yard; some also sell by the ton, which is why the calculator returns both.",
    "Density varies by gravel type but the differences are small for most applications. Crushed stone and pea gravel are about 1.4 tons per cubic yard. River rock is slightly lighter (1.35 tons/yd³) because of its rounded shape leaving more air. Sand is denser (1.5 tons/yd³) because it packs tighter.",
    "The right depth depends on the use: 2 inches for decorative paths; 3 inches for walkways; 4 inches for driveway surface layer; 4 inches for base under a concrete slab or paver installation; 6-8 inches for driveways with heavy vehicles or for deep base layers.",
    "Gravel ordered by the cubic yard is usually delivered by dump truck with a minimum load (typically 1-3 yards depending on supplier). Small quantities are more economical in bags from a home center (0.5 cu ft bags × about 60 = 1 cu yd).",
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
    {
      question: "How many cubic yards of gravel for a 20×10 driveway?",
      answer:
        "For a 20 × 10 ft driveway at 4 inches deep, you need about 2.5 cubic yards (roughly 3.5 tons). For a solid driveway base that won't sink, go 6 inches deep: 3.7 cubic yards, about 5.2 tons. Use the calculator above for exact numbers.",
    },
    {
      question: "How many tons of gravel in a cubic yard?",
      answer:
        "About 1.4 tons per cubic yard for most crushed stone and pea gravel. River rock is a bit less (1.35 tons/yd³), sand is a bit more (1.5 tons/yd³). So 1 cubic yard ≈ 2,800 lbs for typical gravel.",
    },
    {
      question: "How deep should gravel be for a driveway?",
      answer:
        "For new construction: 8 inches total (4 inches of #3 or #4 crushed stone base, topped with 4 inches of #57 or pea gravel surface). For replacing the surface only: 4 inches of new material over existing compacted base. Drivable surface needs minimum 4 inches or it sinks into the soil.",
    },
    {
      question: "How many bags of gravel equal a cubic yard?",
      answer:
        "About 60 bags of 0.5 cu ft gravel make a cubic yard. At $5-8 per bag, that's $300-500, typically more expensive than bulk delivery ($25-50 per yard + delivery fee). Bags are practical for jobs under about 0.5 yards.",
    },
    {
      question: "What's the difference between gravel types?",
      answer:
        "Crushed stone has sharp angular edges that lock together (best for bases and driveways). Pea gravel is small rounded stones (best for decorative paths, doesn't lock but drains well). River rock is larger rounded stones (decorative, heaviest aesthetic). Sand is fine and packs tight (used under pavers as a leveling layer).",
    },
    {
      question: "Do I need landscape fabric under gravel?",
      answer:
        "For driveways: no: fabric tears under vehicle weight. For paths and decorative areas: yes, a woven fabric prevents gravel from mixing with soil and blocks weeds. Buy enough fabric to cover the full area with 6-inch overlaps.",
    },
    {
      question: "How much does gravel cost?",
      answer:
        "Bulk delivered: typically $25-50 per cubic yard for crushed stone or pea gravel, plus a $75-150 delivery fee. Bagged from a home center: $5-8 per 0.5 cu ft bag. Bulk is much cheaper over about 3 yards; bags make sense for small projects.",
    },
    {
      question: "Can I use this for sand or stone dust?",
      answer:
        "Yes, the math is identical for any bulk aggregate. Select 'Sand' for approximately correct density. Stone dust is similar to sand in density (~1.5 tons/yd³).",
    },
  ],
};

reconcileCalculator(gravelCalculatorConfig, checkedConfig);
