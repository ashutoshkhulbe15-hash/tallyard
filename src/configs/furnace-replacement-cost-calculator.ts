import { FurnaceReplacementCostExpansion } from "@/content/furnace-replacement-cost-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const furnaceReplacementCostCalculatorConfig: CalculatorConfig = {
  slug: "furnace-replacement-cost-calculator",
  title: "Furnace Replacement Cost Calculator",
  description:
    "Installed cost to replace a furnace, with or without central AC. Priced by furnace type, efficiency, home size, and install complexity, with the full breakdown shown.",
  categoryLabel: "HVAC",
  category: "hvac",

  bannerHeadline: "Price the swap.",
  bannerTags: ["2026 installed prices", "Repair vs replace", "AC bundle math"],

  inputs: [
    {
      id: "furnaceType",
      label: "Furnace type",
      type: "select",
      defaultImperial: 96,
      options: [
        { label: "Gas, 80% AFUE (standard)", value: 80 },
        { label: "Gas, 95-97% AFUE (condensing)", value: 96 },
        { label: "Oil furnace", value: 2 },
        { label: "Electric furnace", value: 1 },
      ],
      help: "AFUE is the share of fuel that becomes heat. Condensing units vent through PVC in the wall; 80% units use the chimney.",
    },
    {
      id: "homeSqft",
      label: "Home size",
      type: "number",
      unitImperial: "sq ft",
      defaultImperial: 1800,
      min: 600,
      step: 100,
      help: "Sets the furnace BTU size. Typical homes need 40-60 BTU per sq ft of heating capacity depending on climate.",
    },
    {
      id: "scope",
      label: "Scope",
      type: "select",
      defaultImperial: 0,
      options: [
        { label: "Furnace only", value: 0 },
        { label: "Furnace + central AC", value: 1 },
      ],
      help: "Bundling AC with the furnace shares labor and usually saves $500-1,000 vs doing them a year apart",
    },
    {
      id: "complexity",
      label: "Install complexity",
      type: "select",
      defaultImperial: 0,
      options: [
        { label: "Straight swap (same spot, same fuel)", value: 0 },
        { label: "New venting or efficiency upgrade", value: 900 },
        { label: "Tight access or duct modifications", value: 1600 },
      ],
      help: "Going from 80% to a condensing furnace means new PVC venting and a condensate drain",
    },
  ],

  calculate: (values) => {
    const type = Number(values.furnaceType) || 96;
    const sqft = Number(values.homeSqft) || 1800;
    const bundle = Number(values.scope) === 1;
    const complexityAdd = Number(values.complexity) || 0;

    // Heating BTU tier: ~45 BTU/sq ft average climate, rounded to standard cabinet sizes
    const rawBtu = sqft * 45;
    const btu = Math.min(120000, Math.max(40000, Math.ceil(rawBtu / 20000) * 20000));
    const btuK = btu / 1000;

    // Equipment cost by type
    let equipment: number;
    let labor: number;
    let typeName: string;
    if (type === 80) {
      equipment = 1400 + 15 * btuK;
      labor = 1800;
      typeName = "80% gas";
    } else if (type === 96) {
      equipment = 2200 + 20 * btuK;
      labor = 2100;
      typeName = "96% gas";
    } else if (type === 2) {
      equipment = 2800 + 20 * btuK;
      labor = 2200;
      typeName = "oil";
    } else {
      equipment = 900 + 10 * btuK;
      labor = 1600;
      typeName = "electric";
    }
    equipment = Math.round(equipment / 50) * 50;

    const permitMisc = 550; // permit, inspection, disposal, thermostat tie-in

    // AC bundle: tons from sq ft (~600 sq ft per ton), shared-labor discount baked in
    const tons = Math.min(5, Math.max(2, Math.round(sqft / 600)));
    const acAdd = bundle ? 2200 + tons * 950 + 900 : 0;

    const total = equipment + labor + complexityAdd + permitMisc + acAdd;
    const low = Math.round((total * 0.87) / 100) * 100;
    const high = Math.round((total * 1.15) / 100) * 100;
    const mid = Math.round(total / 100) * 100;

    const breakdown = [
      { label: "furnace size", value: `${formatNumber(btuK)}k BTU (${typeName})` },
      { label: "equipment", value: `$${formatNumber(equipment)}` },
      { label: "labor", value: `$${formatNumber(labor)}` },
      ...(complexityAdd ? [{ label: "venting / access", value: `$${formatNumber(complexityAdd)}` }] : []),
      { label: "permit + disposal", value: `$${formatNumber(permitMisc)}` },
      ...(bundle ? [{ label: `central AC (${tons} ton)`, value: `$${formatNumber(acAdd)}` }] : []),
      { label: "typical range", value: `$${formatNumber(low)}-${formatNumber(high)}` },
    ];

    return {
      value: mid,
      unit: "installed (typical)",
      valueRounded: mid,
      prefix: "$",
      breakdown,
      formulaSteps: [
        `furnace size = ${formatNumber(sqft)} sq ft × 45 BTU ≈ ${formatNumber(btuK)}k BTU cabinet`,
        `equipment (${typeName}) = $${formatNumber(equipment)}`,
        `labor = $${formatNumber(labor)}${complexityAdd ? ` + $${formatNumber(complexityAdd)} venting/access` : ""}`,
        `permit, disposal, tie-ins = $${formatNumber(permitMisc)}`,
        ...(bundle ? [`central AC (${tons} ton, bundled) = $${formatNumber(acAdd)}`] : []),
        `total ≈ $${formatNumber(mid)} (range $${formatNumber(low)}-${formatNumber(high)})`,
      ],
      composition: {
        unit: "$",
        total: total,
        segments: [
          { label: "Equipment", amount: equipment + acAdd, shade: "primary" },
          { label: "Labor + extras", amount: labor + complexityAdd + permitMisc, shade: "secondary" },
        ],
      },
    };
  },

  ContentExpansion: FurnaceReplacementCostExpansion,

  formulaDescription:
    "total = equipment(type, BTU) + labor + venting/access + permit & disposal [+ bundled AC]",

  methodology: [
    "Furnace size uses a simplified heating load of 45 BTU per square foot, rounded up to standard cabinet sizes (40k to 120k BTU). This approximates an average climate; a real installation should be sized with an ACCA Manual J load calculation, which accounts for insulation, windows, and local design temperature. Oversizing is the most common sizing error and causes short cycling.",
    "Equipment prices reflect typical 2026 contractor-supplied unit costs by furnace type and size. Condensing (95-97% AFUE) furnaces cost more up front and require PVC venting and a condensate drain; 80% AFUE units vent through a metal flue. AFUE ratings and minimum efficiency standards are set by DOE.",
    "Labor covers removal, setting, gas and electrical tie-in, and startup for a one-day swap by a two-person crew. The venting adder covers the PVC vent run and condensate work of an efficiency upgrade; the access adder covers attic or crawlspace installs and plenum or duct modifications.",
    "Permit, inspection, old-unit disposal, and thermostat tie-in are grouped at a flat $550, which matches most jurisdictions. Skipping the permit is not a savings; unpermitted HVAC work surfaces at home sale.",
    "The AC bundle prices a matched condenser and coil sized at roughly 600 square feet per ton, installed in the same visit. New systems use A2L refrigerants (R-454B and R-32) following the 2025 phase-down of R-410A equipment; technicians handling refrigerant must hold EPA Section 608 certification. Bundling shares labor and typically saves $500-1,000 versus separate installs.",
  ],

  sources: [
    {
      name: "DOE - Furnaces and Boilers",
      url: "https://www.energy.gov/energysaver/furnaces-and-boilers",
      note: "AFUE definitions, efficiency standards, and replacement guidance",
    },
    {
      name: "ENERGY STAR - Furnaces",
      url: "https://www.energystar.gov/products/furnaces",
      note: "Certified efficiency tiers used in the 80% vs 96% comparison",
    },
    {
      name: "ACCA Manual J",
      url: "https://www.acca.org/standards/technical-manuals/manual-j",
      note: "The residential load calculation a proper sizing quote should include",
    },
    {
      name: "EPA Section 608",
      url: "https://www.epa.gov/section608",
      note: "Refrigerant handling certification governing the AC side of a bundle",
    },
    {
      name: "EIA - Heating Fuel Data",
      url: "https://www.eia.gov/energyexplained/use-of-energy/homes.php",
      note: "Fuel price and consumption data behind the efficiency payback math",
    },
  ],

  related: [
    { name: "BTU calculator", slug: "btu-calculator", description: "Check the heating and cooling load first" },
    { name: "Heat pump calculator", slug: "heat-pump-calculator", description: "The all-electric alternative to a furnace" },
    { name: "Water heater calculator", slug: "water-heater-calculator", description: "Often shares a flue with the furnace" },
    { name: "Insulation calculator", slug: "insulation-calculator", description: "Shrink the load before buying capacity" },
  ],

  howTo: {
    name: "How to estimate furnace replacement cost",
    description: "Price a furnace replacement in five steps, from identifying your current unit to deciding whether to bundle the AC.",
    steps: [
      { name: "Identify what you have", text: "Find the data plate on the current furnace: fuel type (gas, oil, electric), input BTU, and age. A unit past 15 years or with a cracked heat exchanger is a replacement, not a repair." },
      { name: "Size the new unit", text: "Multiply home square footage by roughly 45 BTU and round up to a standard cabinet (60k, 80k, 100k BTU). Insist any installer confirms with an ACCA Manual J load calculation rather than matching the old unit's size." },
      { name: "Pick the efficiency tier", text: "Choose between an 80% AFUE furnace (cheaper, chimney-vented) and a 95-97% condensing unit (more efficient, needs PVC venting and a condensate drain). Cold climates and high gas prices favor condensing." },
      { name: "Decide on the AC bundle", text: "If the air conditioner is over 10 years old or uses R-410A, replacing it in the same visit shares labor and typically saves $500-1,000 versus a separate install a year later." },
      { name: "Add complexity and get three quotes", text: "Add venting costs for an efficiency upgrade, access costs for attic or crawlspace units, and about $550 for permit, disposal, and tie-ins. Then get three itemized quotes; per-job spreads of $2,000 are routine." },
    ],
  },

  faq: [
    {
      question: "How much does it cost to replace a furnace in 2026?",
      answer:
        "A typical gas furnace replacement runs $4,500-8,000 installed: roughly $1,900-4,600 for the unit, $1,800-2,200 in labor, plus permit, disposal, and any venting changes. Electric furnaces run cheaper ($3,000-5,500); oil furnaces higher ($6,000-9,500). Bundling central AC adds $5,000-7,500 but saves shared labor.",
    },
    {
      question: "Should I repair or replace my furnace?",
      answer:
        "Use the 50% rule: if a repair costs more than half of replacement and the furnace is past 12 years old, replace it. A cracked heat exchanger always means replacement. Below that line, single-component fixes like a flame sensor ($150-250) or ignitor ($200-400) are worth doing even on older units.",
    },
    {
      question: "Is a 96% furnace worth it over an 80% furnace?",
      answer:
        "In cold climates, usually yes: the extra 16 points of efficiency saves roughly 15-20% on gas, which pays back the $1,200-2,000 price difference in 6-10 years, faster where winters are long. In mild climates with short heating seasons, the 80% unit often pencils out better, especially if switching to condensing venting adds cost.",
    },
    {
      question: "Should I replace the furnace and AC at the same time?",
      answer:
        "If the AC is over 10 years old, yes. The installs share labor, the new coil is matched to the new furnace, and current AC equipment uses A2L refrigerants (R-454B, R-32) since the R-410A phase-down, so an old condenser paired with a new furnace is a compatibility dead end. Bundling typically saves $500-1,000 versus separate visits.",
    },
    {
      question: "How long does a furnace replacement take?",
      answer:
        "A straight swap is one day: 4-8 hours for a two-person crew. Add half a day for new PVC venting on an efficiency upgrade, and a full extra day for duct modifications or a fuel switch. You will be without heat during the work, so winter replacements are usually scheduled as the first job of the morning.",
    },
    {
      question: "How long should a furnace last?",
      answer:
        "15-20 years for gas, 20-30 for electric. Annual filter changes and keeping the blower clean do more for lifespan than any service plan. If your furnace is past 15 and needs a major component, put the repair money toward replacement.",
    },
    {
      question: "Should I consider a heat pump instead of a new furnace?",
      answer:
        "Worth pricing, especially in mild and moderate climates where modern cold-climate heat pumps handle the full season. You replace furnace and AC with one system, and some states offer electrification rebates. In severe winters, a common setup is a heat pump with the gas furnace kept as backup (dual fuel). Run the heat pump calculator to compare.",
    },
  ],
};
