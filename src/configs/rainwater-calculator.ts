import { RainwaterCalculatorExpansion } from "@/content/rainwater-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const rainwaterCalculatorConfig: CalculatorConfig = {
  slug: "rainwater-calculator",
  title: "Rainwater Harvesting Calculator",
  description:
    "Gallons of rainwater you can collect from your roof. Sizes barrels and tanks for any roof area and annual rainfall.",
  categoryLabel: "Landscaping",
  category: "landscaping",

  bannerHeadline: "Collect cleanly.",
  bannerTags: ["Roof area × rainfall", "Barrels or tanks", "Gallons by storm"],

  inputs: [
    {
      id: "roofArea",
      label: "Catchment roof area (footprint)",
      type: "number",
      unitImperial: "ft²",
      unitMetric: "m²",
      defaultImperial: 1200,
      defaultMetric: 111,
      min: 50,
      step: 50,
      help: "Roof footprint that drains to collection gutters",
    },
    {
      id: "rainfall",
      label: "Design rainfall",
      type: "select",
      defaultImperial: 1,
      options: [
        { label: "0.5 in (light shower)", value: 0.5 },
        { label: "1 in (common storm)", value: 1 },
        { label: "2 in (heavy storm)", value: 2 },
        { label: "Annual avg — 40 in", value: 40 },
        { label: "Annual avg — 25 in", value: 25 },
        { label: "Annual avg — 15 in (arid)", value: 15 },
      ],
      help: "Single storm for sizing, or annual for yield",
    },
    {
      id: "efficiency",
      label: "Collection efficiency",
      type: "select",
      defaultImperial: 0.85,
      options: [
        { label: "70% (first-flush diverter)", value: 0.7 },
        { label: "85% (typical)", value: 0.85 },
        { label: "95% (optimized)", value: 0.95 },
      ],
    },
    {
      id: "use",
      label: "Primary use",
      type: "select",
      defaultImperial: "garden",
      options: [
        { label: "Garden / lawn", value: "garden" },
        { label: "Toilet flushing", value: "toilet" },
        { label: "Whole-house (filtered)", value: "house" },
      ],
    },
  ],

  calculate: (values, units) => {
    const roofAreaInput = Number(values.roofArea) || 0;
    const rainfallIn = Number(values.rainfall) || 1;
    const efficiency = Number(values.efficiency) || 0.85;
    const use = String(values.use || "garden");

    const roofAreaSqFt = units === "metric" ? roofAreaInput * 10.764 : roofAreaInput;
    const gallons = roofAreaSqFt * rainfallIn * 0.623 * efficiency;

    const isAnnual = rainfallIn >= 5;

    let storageRec: string;
    if (isAnnual) {
      const suggestedTank = Math.ceil((gallons / 12) * 1.5);
      storageRec = `~${formatNumber(suggestedTank)} gal tank (1.5 months avg use)`;
    } else {
      const barrels = Math.ceil(gallons / 55);
      storageRec = `${barrels} × 55-gal barrels OR ${Math.ceil(gallons / 275)} × 275-gal tote`;
    }

    let useRate = "";
    if (use === "garden") {
      useRate = `~${formatNumber(Math.round(gallons / 50))} × 1,000 ft² garden (1" watering)`;
    } else if (use === "toilet") {
      useRate = `~${formatNumber(Math.round(gallons / 8))} person-days of toilet flushing`;
    } else {
      useRate = `~${formatNumber(Math.round(gallons / 80))} person-days of whole-house use`;
    }

    const displayGal = units === "metric" ? gallons * 3.785 : gallons;
    const volumeUnit = units === "metric" ? "L" : "gallons";

    return {
      value: Math.round(displayGal),
      unit: volumeUnit,
      valueRounded: Math.round(displayGal),
      breakdown: [
        { label: "roof area", value: `${formatNumber(round(roofAreaSqFt, 0))} ft²` },
        { label: "rainfall", value: `${rainfallIn} in` },
        { label: "efficiency", value: `${round(efficiency * 100, 0)}%` },
        { label: "storage", value: storageRec },
        { label: "use estimate", value: useRate },
      ],
      formulaSteps: [
        `1 inch rain on 1 sq ft = 0.623 gallons`,
        `roof area = ${formatNumber(round(roofAreaSqFt, 0))} ft²`,
        `rainfall = ${rainfallIn} in${isAnnual ? " (annual)" : " (storm)"}`,
        `gallons = ${formatNumber(round(roofAreaSqFt, 0))} × ${rainfallIn} × 0.623 × ${efficiency} = ${formatNumber(round(gallons, 0))} gal`,
        `storage: ${storageRec}`,
      ],
    };
  },

  ContentExpansion: RainwaterCalculatorExpansion,

  formulaDescription:
    "gallons = roof ft² × rainfall inches × 0.623 × efficiency",

  methodology: [
    "The core formula: every inch of rain on one square foot of roof produces 0.623 gallons. Multiply roof footprint by inches of rain to get theoretical gallons. Actual yield depends on collection efficiency.",
    "Collection efficiency accounts for water that doesn't make it into storage: splash over the gutter edge, evaporation on hot roofs, splash at the downspout, first-flush diversion, and filter cleaning. Well-installed systems achieve 80-90% efficiency.",
    "Roof area is the footprint (horizontal projection), not the sloped surface. A 30×40 ft house footprint collects rain from a 1,200 sq ft catchment regardless of roof pitch — steeper roofs don't catch more rain.",
    "For storm sizing, use 1-inch rainfall (common storm in most US climates). For annual yield, use your region's annual total: 40 inches Eastern US, 25 inches Midwest, 15 inches arid Southwest.",
    "Storage: for single storms, 55-gallon rain barrels are standard DIY ($80-150 each). 275-gallon IBC totes next step up. Above 1,000 gallons, move to dedicated cisterns (polyethylene or concrete, $0.50-2 per gallon installed).",
    "Not included: first-flush diverters, filters, distribution piping, pumps (for pressurized use), winterization. For whole-house or toilet use, add UV sterilization and particulate filtration (~$500-1,500 for residential systems). Check local codes — some jurisdictions restrict rainwater collection or have mandatory backflow prevention for indoor use.",
  ],

  sources: [
    {
      name: "American Rainwater Catchment Systems Association",
      url: "https://arcsa.org/",
      note: "Industry standards for residential rainwater harvesting",
    },
    {
      name: "EPA — WaterSense Rainwater Harvesting",
      url: "https://www.epa.gov/watersense",
      note: "Reference for collection efficiency and yield",
    },
  ],

  related: [
    { name: "Gutter calculator", slug: "gutter-calculator", description: "Linear feet and downspouts" },
    { name: "Roofing calculator", slug: "roofing-calculator", description: "Shingle bundles by pitch" },
    { name: "Mulch calculator", slug: "mulch-calculator", description: "Garden beds watered by harvest" },
    { name: "Pool chlorine calculator", slug: "pool-chlorine-calculator", description: "Dose for collected pool fill" },
  ],

  faq: [
    {
      question: "How much rainwater can I collect from my roof?",
      answer:
        "Roughly 600 gallons per 1,000 sq ft of roof per inch of rain (at 85% efficiency). A 2,000 sq ft roof in a 40-inch annual rainfall region yields about 42,000 gallons per year — more than most households use for outdoor irrigation.",
    },
    {
      question: "How big should my rain barrel be?",
      answer:
        "For 1 inch of rain on 1,000 sq ft of roof catchment: about 530 gallons — 10 standard 55-gallon barrels, or 2 × 275-gal IBC totes. Most DIYers start with 1-2 barrels (55-110 gallons) because that's what a single downspout realistically fills.",
    },
    {
      question: "Is rainwater safe to drink?",
      answer:
        "Not without treatment. Roof runoff picks up bird droppings, dust, leaves, and may contain roofing material leach (asphalt shingles, galvanized metal). For potable use: filter (5-micron), UV sterilize, and get it tested. For non-potable (garden, toilet, laundry), simple first-flush diversion and basic screening is usually enough.",
    },
    {
      question: "What's a first-flush diverter?",
      answer:
        "A simple device that dumps the first 10-30 gallons of a storm to storage overflow instead of your collection tank. Those first gallons wash debris, pollen, and bird droppings off the roof. After the first flush, cleaner water enters storage. Adds about $50-100 to a basic system.",
    },
    {
      question: "Is rainwater harvesting legal?",
      answer:
        "Most US states: yes, with no restrictions. Colorado: limited to 110 gallons per residence, non-potable. Utah, Oregon, others: permit required for larger systems. Check your state water rights law. For indoor use connected to plumbing, local codes require backflow prevention and sometimes permits.",
    },
    {
      question: "Does it work in arid climates?",
      answer:
        "Yes, but differently. Arid regions (15-20 inches/year) need larger storage to bridge dry periods — a month or more of use capacity rather than just storm capacity. A 2,000 sq ft roof in Tucson (12 inches/year) yields about 13,000 gallons — enough for summer garden irrigation with proper storage.",
    },
    {
      question: "What about overflow during big storms?",
      answer:
        "Critical — undersized systems overflow during large storms. Every rain barrel or tank needs an overflow pipe that directs excess water away from the foundation (4-6 feet minimum). For larger cisterns, overflow should route to a rain garden, dry well, or existing drainage. Never let overflow puddle at the foundation.",
    },
    {
      question: "How long does a rain barrel last?",
      answer:
        "Plastic rain barrels: 10-20 years (UV-resistant polyethylene). Food-grade IBC totes: 15-25 years. Galvanized metal: 30-50 years. Concrete cisterns: 50+ years. All benefit from winterization in freezing climates — drain before hard freeze or allow expansion room for ice.",
    },
  ],
};
