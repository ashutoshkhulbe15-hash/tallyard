import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const insulationCalculatorConfig: CalculatorConfig = {
  slug: "insulation-calculator",
  title: "Insulation Calculator",
  description:
    "R-value and square footage of insulation for any wall, attic, or floor. Rolls or batts, with climate-appropriate R-value recommendations.",
  categoryLabel: "Insulation",
  category: "drywall",

  bannerHeadline: "Insulate properly.",
  bannerTags: ["Climate-right R-values", "Batts or rolls", "Walls · attic · floors"],

  inputs: [
    {
      id: "application",
      label: "Where",
      type: "select",
      defaultImperial: "attic",
      options: [
        { label: "Attic / ceiling", value: "attic" },
        { label: "Exterior walls", value: "walls" },
        { label: "Floor / crawlspace", value: "floor" },
      ],
    },
    {
      id: "length",
      label: "Area length",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 40,
      defaultMetric: 12,
      min: 1,
      step: 0.5,
    },
    {
      id: "width",
      label: "Area width",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 30,
      defaultMetric: 9,
      min: 1,
      step: 0.5,
    },
    {
      id: "climateZone",
      label: "Climate zone",
      type: "select",
      defaultImperial: "5",
      options: [
        { label: "1 · Hot (South FL, Hawaii)", value: "1" },
        { label: "2 · Hot (TX Gulf, FL)", value: "2" },
        { label: "3 · Warm (GA, AZ, S. CA)", value: "3" },
        { label: "4 · Mixed (VA, KY, N. CA)", value: "4" },
        { label: "5 · Cold (IL, CO, NY)", value: "5" },
        { label: "6 · Cold (ND, MT, ME)", value: "6" },
        { label: "7 · Very cold (N. Minnesota, Alaska)", value: "7" },
      ],
      help: "Use IECC climate zones — mapped from your location",
    },
    {
      id: "studSpacing",
      label: "Stud/joist spacing",
      type: "select",
      defaultImperial: 16,
      options: [
        { label: '16" on center (standard)', value: 16 },
        { label: '24" on center', value: 24 },
      ],
      help: "Affects batt width selection",
    },
    {
      id: "wastePercent",
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
    const application = String(values.application || "attic");
    const L = Number(values.length) || 0;
    const W = Number(values.width) || 0;
    const zone = String(values.climateZone || "5");
    const studSpacing = Number(values.studSpacing) || 16;
    const waste = Number(values.wastePercent) || 10;

    // Recommended R-values per Energy Star / DOE zone map
    const rValues: Record<string, { attic: number; walls: number; floor: number }> = {
      "1": { attic: 30, walls: 13, floor: 13 },
      "2": { attic: 38, walls: 13, floor: 13 },
      "3": { attic: 38, walls: 20, floor: 19 },
      "4": { attic: 49, walls: 20, floor: 19 },
      "5": { attic: 49, walls: 21, floor: 30 },
      "6": { attic: 60, walls: 21, floor: 30 },
      "7": { attic: 60, walls: 21, floor: 38 },
    };
    const zoneRec = rValues[zone] || rValues["5"];
    const rValue =
      application === "attic"
        ? zoneRec.attic
        : application === "walls"
          ? zoneRec.walls
          : zoneRec.floor;

    // Area (accommodating metric)
    const area = L * W;
    const areaWithWaste = area * (1 + waste / 100);
    const areaSqFt = units === "metric" ? areaWithWaste * 10.764 : areaWithWaste;

    // Typical batt sizes (coverage per batt in sq ft)
    // 16" OC: batts cover 14.5" × 93" = ~9.36 sq ft per batt
    // 24" OC: batts cover 22.5" × 93" = ~14.5 sq ft per batt
    const battCoverage = studSpacing === 24 ? 14.5 : 9.36;
    // Batts are sold in bags; a standard bag covers ~40-60 sq ft depending on R-value
    // R-13: ~40 sq ft/bag. R-21: ~60 sq ft/bag. R-30: ~32 sq ft/bag. R-38: ~24 sq ft/bag.
    const bagCoverageMap: Record<number, number> = {
      13: 40,
      19: 48,
      20: 40,
      21: 60,
      30: 32,
      38: 24,
      49: 21,
      60: 18,
    };
    const bagCoverage = bagCoverageMap[rValue] || 40;

    const battsNeeded = Math.ceil(areaSqFt / battCoverage);
    const bagsNeeded = Math.ceil(areaSqFt / bagCoverage);

    const displayArea = units === "metric" ? areaWithWaste : areaSqFt;
    const areaUnit = units === "metric" ? "m²" : "sq ft";

    return {
      value: bagsNeeded,
      unit: bagsNeeded === 1 ? "bag" : "bags",
      valueRounded: bagsNeeded,
      breakdown: [
        { label: "target R-value", value: `R-${rValue}` },
        { label: "area", value: `${formatNumber(round(displayArea, 0))} ${areaUnit}` },
        { label: "batts", value: `~${battsNeeded} batts` },
      ],
      formulaSteps: [
        `area = ${L} × ${W} = ${formatNumber(round(area, 1))} ${units === "metric" ? "m²" : "ft²"}`,
        `with ${waste}% waste = ${formatNumber(round(areaWithWaste, 1))} ${units === "metric" ? "m²" : "ft²"}`,
        units === "metric"
          ? `as sq ft = ${formatNumber(round(areaSqFt, 0))} sq ft`
          : "",
        `target R-value for Zone ${zone} ${application} = R-${rValue}`,
        `batt coverage (${studSpacing}" OC) = ${battCoverage} sq ft per batt`,
        `batts = ⌈${formatNumber(round(areaSqFt, 0))} ÷ ${battCoverage}⌉ = ${battsNeeded} batts`,
        `bag coverage for R-${rValue} ≈ ${bagCoverage} sq ft per bag`,
        `bags = ⌈${formatNumber(round(areaSqFt, 0))} ÷ ${bagCoverage}⌉ = ${bagsNeeded} bags`,
      ].filter(Boolean) as string[],
    };
  },

  formulaDescription:
    "bags = ⌈(area × (1 + waste)) ÷ bag coverage⌉ at R-value for climate zone",

  methodology: [
    "The calculator starts with your climate zone (IECC zones 1-7 from hot to cold) and recommends the minimum R-value for your application per US DOE guidance. R-values are the industry-standard measure of thermal resistance — higher numbers mean better insulation.",
    "Recommended R-values vary by application: attics need the highest (R-30 to R-60) because heat rises and most energy loss happens through ceilings. Walls are next (R-13 to R-21). Floors over unheated spaces (R-13 to R-38) are typically less than attics because they're insulated against conductive, not convective, losses.",
    "Area includes a waste factor for cuts around obstacles (framing, wiring, pipes) and to accommodate fit. 10% is standard for straight rectangular spaces; bump to 15% for attics with lots of framing or cathedral ceilings with angles.",
    "Bag counts are approximate because bag size varies by manufacturer and R-value. Higher R-value means thicker batts, which means fewer batts fit in a bag. The calculator uses typical coverage per bag — confirm with your specific product before buying. For unfaced roll insulation, coverage per roll is different (usually 20-60 sq ft per roll depending on thickness).",
    "Stud/joist spacing determines batt width: 16-inch on center uses batts that cover 14.5 inches of space; 24-inch on center uses batts that cover 22.5 inches. Using the wrong width creates gaps that severely compromise performance — always match batt width to framing spacing.",
  ],

  sources: [
    {
      name: "US DOE — Insulation R-Value Recommendations",
      url: "https://www.energy.gov/energysaver/insulation",
      note: "Official climate zone map and R-value recommendations",
    },
    {
      name: "Energy Star — Insulation Guide",
      url: "https://www.energystar.gov/saveathome/seal_insulate",
      note: "R-value targets by zone for walls, attics, and floors",
    },
  ],

  related: [
    { name: "Drywall calculator", slug: "drywall-calculator", description: "Sheets for walls and ceilings" },
    { name: "BTU calculator", slug: "btu-calculator", description: "AC size — less with better insulation" },
    { name: "Paint calculator", slug: "paint-calculator", description: "Gallons of paint for any room" },
    { name: "Solar calculator", slug: "solar-calculator", description: "System size reduces with better insulation" },
  ],

  faq: [
    {
      question: "How much insulation do I need in my attic?",
      answer:
        "Depends on your climate zone. In cold climates (Zones 5-7), aim for R-49 to R-60 (14-20 inches of blown cellulose or fiberglass). In warm climates (Zones 1-3), R-30 to R-38 is enough (10-12 inches). The calculator above uses the DOE-recommended R-value for your zone and application.",
    },
    {
      question: "What's the difference between batts, rolls, and blown insulation?",
      answer:
        "Batts are pre-cut rectangular pieces sized for standard framing (16\" or 24\" OC), easy to install between studs/joists. Rolls are long unfaced strips you cut to length. Blown insulation (cellulose, fiberglass) is loose-fill installed with a blower — best for attics over existing insulation. This calculator handles batts; blown insulation is sold by bags with coverage specs.",
    },
    {
      question: "Is R-60 in the attic worth it over R-38?",
      answer:
        "In very cold climates (Zones 6-7), yes — the extra R-value pays back in 3-5 years through heating cost savings. In mild climates (Zones 1-3), the payback is much longer and R-30 is usually sufficient. The calculator respects these climate-specific recommendations.",
    },
    {
      question: "Can I add new insulation on top of old?",
      answer:
        "In attics, yes — install new unfaced insulation perpendicular to existing batts or over loose fill. Do NOT install faced insulation over unfaced (the vapor barrier is trapped). Always check for wet or damaged old insulation first; replace it rather than covering it.",
    },
    {
      question: "What about rim joists and band joists?",
      answer:
        "Rim joists (where floors meet foundation walls) are a major source of air leakage. Foam board + spray foam sealing at the rim is often more valuable than adding batts there. The calculator covers main wall, attic, and floor insulation only.",
    },
    {
      question: "Does R-value include air sealing?",
      answer:
        "No — R-value measures conductive heat transfer only. Air leakage (convective loss) can account for 30-40% of total heat loss in a poorly-sealed house, regardless of insulation R-value. Always air-seal (caulk, foam, weatherstripping) before or alongside adding insulation. Top areas: rim joists, attic bypasses, plumbing penetrations, electrical boxes.",
    },
    {
      question: "What's my climate zone?",
      answer:
        "The IECC climate zone map is based on heating degree days. Rough guide: Zone 1-2 = southern Florida and Texas Gulf. Zone 3 = Arizona, Georgia, Southern California. Zone 4 = Mid-Atlantic, Kentucky, Northern California. Zone 5 = Illinois, Colorado, New York. Zone 6-7 = Northern Midwest, Maine, Montana, Alaska. Look up your ZIP code at the DOE website for precision.",
    },
    {
      question: "Can I install insulation myself?",
      answer:
        "Batts and rolls are straightforward DIY — fiberglass irritates skin, so wear long sleeves, gloves, goggles, and an N95 mask. Blown insulation requires a blower (rentable from home centers) and a second person. Spray foam should be professionally installed for large areas — the chemistry is hazardous if mishandled.",
    },
  ],
};
