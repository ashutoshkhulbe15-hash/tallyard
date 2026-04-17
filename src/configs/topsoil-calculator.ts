import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const topsoilCalculatorConfig: CalculatorConfig = {
  slug: "topsoil-calculator",
  title: "Topsoil Calculator",
  description:
    "Cubic yards of topsoil or fill dirt for any garden bed, lawn, or fill project. Converts to bags for small jobs and tons for delivery.",
  categoryLabel: "Landscaping",
  category: "landscaping",

  bannerHeadline: "Fill correctly.",
  bannerTags: ["Yards · bags · tons", "Any depth", "Garden · lawn · fill"],

  inputs: [
    {
      id: "length",
      label: "Area length",
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
      label: "Area width",
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
      defaultImperial: 6,
      options: [
        { label: '2" / 5 cm (overseeding)', value: 2 },
        { label: '4" / 10 cm (lawn repair)', value: 4 },
        { label: '6" / 15 cm (garden bed)', value: 6 },
        { label: '8" / 20 cm (raised bed)', value: 8 },
        { label: '12" / 30 cm (deep fill)', value: 12 },
      ],
      help: "2-4\" for lawns, 6-8\" for garden beds, 12\"+ for raised beds",
    },
    {
      id: "type",
      label: "Soil type",
      type: "select",
      defaultImperial: "topsoil",
      options: [
        { label: "Topsoil (1.1 t/yd³)", value: "topsoil" },
        { label: "Fill dirt (1.25 t/yd³)", value: "fill" },
        { label: "Compost (0.75 t/yd³)", value: "compost" },
        { label: "Garden mix (1.0 t/yd³)", value: "garden" },
      ],
    },
  ],

  calculate: (values, units) => {
    const L = Number(values.length) || 0;
    const W = Number(values.width) || 0;
    const depthInches = Number(values.depth) || 6;
    const type = String(values.type || "topsoil");

    const depthInLinear =
      units === "metric" ? (depthInches * 2.5) / 100 : depthInches / 12;

    const area = L * W;
    const volumeInLinearCubed = area * depthInLinear;

    const volumeInYardsOrMeters =
      units === "metric"
        ? volumeInLinearCubed
        : volumeInLinearCubed / 27;

    // Density tons per cubic yard (or metric tonnes per cubic meter — similar range)
    const densities: Record<string, number> = {
      topsoil: 1.1,
      fill: 1.25,
      compost: 0.75,
      garden: 1.0,
    };
    const density = densities[type] || 1.1;
    const tonsOrTonnes = volumeInYardsOrMeters * density;

    // Bag equivalent: standard topsoil bag is 0.75 cu ft (some are 1 cu ft, some 40 lb)
    // Using 0.75 cu ft bags (most common at Home Depot, Lowe's)
    const bagCuFt = 0.75;
    const bagSize =
      units === "metric" ? bagCuFt * 0.02832 : bagCuFt / 27;
    const bagsNeeded = Math.ceil(volumeInYardsOrMeters / bagSize);

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
        { label: "bags (0.75 cu ft)", value: `${bagsNeeded}` },
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
        `bags = ⌈${formatNumber(round(volumeInYardsOrMeters, 3))} ÷ ${bagSize.toFixed(4)}⌉ = ${bagsNeeded} bags`,
        `rounded up to ${formatNumber(roundUp(volumeInYardsOrMeters, 2))} ${unitShort}`,
      ],
    };
  },

  formulaDescription:
    "volume = area × depth, converted to cubic yards/meters (plus tons and bags)",

  methodology: [
    "The calculator multiplies bed area (length × width) by depth to compute total volume. Depth is entered in inches or centimeters and converted to feet or meters before the multiplication. Imperial volume in cubic feet is divided by 27 to convert to cubic yards (the bulk purchase unit). Metric stays in cubic meters.",
    "Weight is calculated from density. Topsoil is typically 1.1 tons per cubic yard; fill dirt is heavier (1.25 t/yd³) because it contains more clay and minerals; compost is lighter (0.75 t/yd³) because it's full of air and organic matter. Garden mix (blended topsoil and compost) sits in between at 1.0 t/yd³.",
    "Bag equivalent assumes standard 0.75 cubic foot bags, which is what most home centers carry. At that size, a cubic yard is 36 bags. Some suppliers sell 1 cu ft or 40 lb bags — 40-lb bags of topsoil are roughly 0.5 cu ft, so you'd need 54 bags per cubic yard.",
    "Proper depth depends on use: 2 inches for overseeding existing lawn, 4 inches for lawn repair or grading small areas, 6 inches for establishing new garden beds, 8 inches for raised vegetable beds (deeper root vegetables need more), 12+ inches for deep fill or drainage correction. Deeper than 12 inches typically means you're doing structural fill, not just planting soil.",
    "Bulk delivery is much cheaper than bags above about 1 cubic yard. Bulk topsoil is typically $25-50 per cubic yard plus delivery ($75-150). Bagged topsoil is $3-5 per 0.75 cu ft bag, so a yard in bags is $100-150. For jobs over 1 yard, order bulk. For small patching, bags are practical.",
  ],

  sources: [
    {
      name: "Penn State Extension — Soil and Composting",
      url: "https://extension.psu.edu/",
      note: "Density values and application depths for garden soil",
    },
    {
      name: "University of Minnesota Extension — Topsoil",
      url: "https://extension.umn.edu/",
      note: "Soil type differences and use recommendations",
    },
  ],

  related: [
    { name: "Mulch calculator", slug: "mulch-calculator", description: "Cubic yards or bags for garden beds" },
    { name: "Gravel calculator", slug: "gravel-calculator", description: "Cubic yards for driveways and paths" },
    { name: "Sod calculator", slug: "sod-calculator", description: "Square footage of sod for any yard" },
    { name: "Concrete calculator", slug: "concrete-calculator", description: "Cubic yards for slabs and footings" },
  ],

  faq: [
    {
      question: "How much topsoil do I need for a 20×10 garden bed?",
      answer:
        "For a 20×10 ft bed at 6 inches deep, you need about 3.7 cubic yards (4 tons). At 8 inches deep, 4.9 yards. The calculator above handles different depths and soil types. For a bag equivalent: ~134 × 0.75 cu ft bags.",
    },
    {
      question: "What's the difference between topsoil, fill dirt, and compost?",
      answer:
        "Topsoil is the top 4-12 inches of natural soil — good mineral content, some organic matter, supports plant growth. Fill dirt is subsoil from deeper layers — heavier clay, used for structural fill and grading but not for planting. Compost is decomposed organic matter — rich in nutrients, too loose for structural use, used as a soil amendment. Garden mix is usually 50/50 topsoil and compost.",
    },
    {
      question: "How deep should topsoil be for grass?",
      answer:
        "For overseeding existing lawn: 1/4 to 1/2 inch of compost or fine topsoil over the seed. For new lawn establishment: 4-6 inches of quality topsoil graded over the subsoil before seeding or sodding. Less than 4 inches leads to thin, shallow-rooted grass that struggles in drought.",
    },
    {
      question: "How many cubic yards in a pickup truck?",
      answer:
        "A standard full-size pickup (F-150 / Silverado bed) holds about 2 cubic yards of topsoil — but the gross weight often exceeds the truck's payload capacity. 1.5 cubic yards is a safer maximum. Small trucks (Tacoma/Ranger) top out at 1 yard. Dump trucks deliver 5-10 yards at a time.",
    },
    {
      question: "Is screened topsoil worth the extra cost?",
      answer:
        "Screened topsoil has been run through a mesh to remove rocks, clay chunks, and roots — producing a uniform, plantable product. Unscreened ('pulverized') topsoil has more debris and is ~30% cheaper. For vegetable gardens or raised beds: screened. For rough grading or lawn base: unscreened is fine.",
    },
    {
      question: "How many bags of topsoil make a cubic yard?",
      answer:
        "About 36 bags of 0.75 cu ft topsoil make one cubic yard. At $3-5 per bag that's $108-180, compared to $25-50 for bulk plus delivery. Bulk is much cheaper above about 1 cubic yard but requires truck access and somewhere to dump it.",
    },
    {
      question: "When should I add topsoil vs compost?",
      answer:
        "Add topsoil to build structure (bulk, depth, basic soil body). Add compost to improve what you already have (nutrients, microbes, water retention). For poor soil: 4-6 inches of topsoil blended with 1-2 inches of compost tilled in. For decent existing soil: just top-dress with 1-2 inches of compost annually.",
    },
    {
      question: "Does this work for raised beds?",
      answer:
        "Yes — enter the interior dimensions of the bed and the fill depth. A typical 4×8 ft raised bed at 12 inches deep needs 1.2 cubic yards of soil (about 44 × 0.75 cu ft bags). For a cheaper fill, do the bottom half in soil/fill dirt and top with garden mix — plants root in the top 8-10 inches mostly.",
    },
  ],
};
