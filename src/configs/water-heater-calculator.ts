import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const waterHeaterCalculatorConfig: CalculatorConfig = {
  slug: "water-heater-calculator",
  title: "Water Heater Calculator",
  description:
    "Right-size a tank or tankless water heater for your household. Based on peak-hour demand, fixture count, and household size.",
  categoryLabel: "HVAC",
  category: "hvac",

  bannerHeadline: "Heat steadily.",
  bannerTags: ["Tank or tankless", "Peak hour demand", "GPH or GPM"],

  inputs: [
    {
      id: "type",
      label: "Water heater type",
      type: "select",
      defaultImperial: "tank",
      options: [
        { label: "Tank (gas or electric)", value: "tank" },
        { label: "Tankless (on-demand)", value: "tankless" },
      ],
    },
    {
      id: "adults",
      label: "Adults in household",
      type: "number",
      defaultImperial: 2,
      min: 0,
      step: 1,
    },
    {
      id: "teens",
      label: "Teens / kids",
      type: "number",
      defaultImperial: 2,
      min: 0,
      step: 1,
      help: "School-age children through teens use adult-level hot water",
    },
    {
      id: "bathrooms",
      label: "Number of bathrooms",
      type: "number",
      defaultImperial: 2,
      min: 1,
      step: 1,
    },
    {
      id: "simultaneous",
      label: "Peak simultaneous uses",
      type: "select",
      defaultImperial: "2",
      options: [
        { label: "1 (shower only)", value: "1" },
        { label: "2 (shower + sink/dishwasher)", value: "2" },
        { label: "3 (two showers + sink)", value: "3" },
        { label: "4+ (large household morning rush)", value: "4" },
      ],
      help: "How many hot-water fixtures run at once during peak",
    },
    {
      id: "climate",
      label: "Incoming water temperature",
      type: "select",
      defaultImperial: 55,
      options: [
        { label: "Warm (70°F — Gulf, FL)", value: 70 },
        { label: "Moderate (55°F — mid-US)", value: 55 },
        { label: "Cold (45°F — N. US, Canada)", value: 45 },
        { label: "Very cold (35°F — winter, N. Plains)", value: 35 },
      ],
      help: "Tankless sizing depends heavily on incoming water temp",
    },
  ],

  calculate: (values) => {
    const type = String(values.type || "tank");
    const adults = Number(values.adults) || 0;
    const teens = Number(values.teens) || 0;
    const bathrooms = Number(values.bathrooms) || 1;
    const simultaneous = Number(values.simultaneous) || 2;
    const incomingTempF = Number(values.climate) || 55;

    const totalPeople = adults + teens;

    // TANK SIZING: based on first-hour rating (FHR) requirements
    // Peak hour demand (gallons per hour):
    // - Shower: 20 gallons per 10-minute shower
    // - Bath: 20 gallons
    // - Dishwasher: 8 gallons per cycle
    // - Washing machine: 14 gallons
    // - Sink use: 3 gallons
    // Peak hour for a typical morning: 1 shower per occupant + 1 sink use
    const peakShowers = Math.max(1, Math.min(totalPeople, simultaneous * 2));
    const peakHourDemand = peakShowers * 20 + totalPeople * 3 + (simultaneous >= 3 ? 14 : 0);

    // Tank size rule: tank should be about 70% of peak hour demand
    // (since tank heats more while you use it — the FHR, not just capacity)
    const tankSizeRaw = peakHourDemand / 1.3;

    // Standard tank sizes (gallons)
    const tankSizes = [30, 40, 50, 65, 75, 80, 100];
    let recommendedTank = tankSizes[tankSizes.length - 1];
    for (const size of tankSizes) {
      if (size >= tankSizeRaw) {
        recommendedTank = size;
        break;
      }
    }

    // TANKLESS SIZING: flow rate (GPM) needed × temp rise
    // Peak flow rate based on simultaneous fixtures:
    // - Shower: 2.5 GPM
    // - Sink: 1.5 GPM
    // - Dishwasher: 1.5 GPM
    const peakGpmMap: Record<number, number> = {
      1: 2.5,
      2: 4.0,
      3: 6.5,
      4: 8.5,
    };
    const peakGpm = peakGpmMap[simultaneous] || 4.0;

    // Temp rise needed (output 120°F − incoming)
    const tempRise = 120 - incomingTempF;

    // Tankless BTU = GPM × temp rise × 8.33 (lb/gal) × 60 (min/hr) × 1 (BTU/lb°F)
    // Simplified for installed units: electric = kW; gas = BTU/hr
    // Standard gas tankless: 120,000-199,000 BTU/hr
    // Recommended tankless BTU:
    const tanklessBtu = Math.round(peakGpm * tempRise * 500);

    // Recommended standard tankless size bracket
    let tanklessSize: string;
    if (tanklessBtu <= 120000) tanklessSize = "120,000 BTU (small)";
    else if (tanklessBtu <= 160000) tanklessSize = "160,000 BTU (medium)";
    else if (tanklessBtu <= 199000) tanklessSize = "199,000 BTU (large)";
    else tanklessSize = "Multiple units or commercial unit required";

    if (type === "tankless") {
      return {
        value: peakGpm,
        unit: "GPM needed",
        valueRounded: round(peakGpm, 1),
        breakdown: [
          { label: "recommended unit", value: tanklessSize },
          { label: "peak flow", value: `${peakGpm} GPM` },
          { label: "temp rise", value: `${tempRise}°F` },
          { label: "BTU/hr needed", value: `${formatNumber(tanklessBtu)}` },
          { label: "simultaneous uses", value: `${simultaneous}` },
        ],
        formulaSteps: [
          `peak simultaneous = ${simultaneous} fixtures`,
          `peak flow rate = ${peakGpm} GPM`,
          `incoming water = ${incomingTempF}°F, output = 120°F`,
          `temp rise = 120 − ${incomingTempF} = ${tempRise}°F`,
          `BTU needed = ${peakGpm} GPM × ${tempRise}°F × 500 = ${formatNumber(tanklessBtu)} BTU/hr`,
          `recommended: ${tanklessSize}`,
        ],
      };
    }

    // Tank type
    return {
      value: recommendedTank,
      unit: "gallon tank",
      valueRounded: recommendedTank,
      breakdown: [
        { label: "household size", value: `${totalPeople} people` },
        { label: "peak hour demand", value: `${formatNumber(peakHourDemand)} gallons` },
        { label: "bathrooms", value: `${bathrooms}` },
        { label: "first-hour rating target", value: `${formatNumber(peakHourDemand)} GPH` },
      ],
      formulaSteps: [
        `household = ${adults} adults + ${teens} teens = ${totalPeople} people`,
        `peak showers = min(${totalPeople}, ${simultaneous * 2}) = ${peakShowers}`,
        `peak hour demand = ${peakShowers} × 20 (shower) + ${totalPeople} × 3 (sinks)${simultaneous >= 3 ? " + 14 (washer)" : ""} = ${formatNumber(peakHourDemand)} gallons`,
        `raw tank size = ${formatNumber(peakHourDemand)} ÷ 1.3 = ${formatNumber(round(tankSizeRaw, 0))} gallons`,
        `recommended = ${recommendedTank} gallons (next standard size)`,
        `first-hour rating (FHR) target = ${formatNumber(peakHourDemand)} GPH`,
      ],
    };
  },

  formulaDescription:
    "tank: size = peak hour demand ÷ 1.3; tankless: GPM = peak simultaneous, BTU = GPM × temp rise × 500",

  methodology: [
    "Tank water heaters are sized by the First-Hour Rating (FHR) — how many gallons of hot water the unit can deliver in the first hour, starting with a full tank. The tank size itself is usually smaller than FHR because the heater continues to heat water as you use it. A 50-gallon tank with an FHR of 65-75 gallons is typical.",
    "Tank peak-hour demand is the total hot water you use during your busiest hour. The calculator estimates 20 gallons per shower, 3 gallons per person for sinks (hand washing, shaving), and adds 14 gallons if 3+ simultaneous uses suggest a washing machine is running too. Morning rush in a 4-person household is typically 80-100 gallons.",
    "Standard tank sizes are 30, 40, 50, 65, 75, and 80 gallons for residential. 50-gallon is the most common size for typical 3-4 person homes. 40-gallon works for 1-2 person households. 65-80 gallon for 5+ person homes or homes with large soaking tubs.",
    "Tankless water heaters are sized completely differently: by flow rate (GPM) and temperature rise. The heater must deliver hot water at your peak simultaneous flow, raising the incoming water temperature to 120°F. In cold climates with 35°F incoming water, the temp rise is 85°F — a huge demand. In warm climates with 70°F incoming water, only a 50°F rise is needed.",
    "Tankless BTU calculation: BTU/hr = GPM × temp rise × 500. A family that wants 2 simultaneous showers (5 GPM) in a cold climate (85°F rise) needs 212,500 BTU/hr — more than residential tankless can provide. They'd need two units or a large commercial unit. The same family in Florida (40°F rise) only needs 100,000 BTU, which any standard tankless handles easily.",
    "Not covered: vent sizing (gas units), electrical panel capacity (electric tankless needs large 240V circuits — a 27 kW tankless pulls 113 amps), gas line size (tankless units need ¾\" gas lines, tank heaters typically use ½\"), or water treatment (tankless is sensitive to hard water — sediment causes scale buildup requiring annual flushing).",
  ],

  sources: [
    {
      name: "US DOE — Water Heater Sizing",
      url: "https://www.energy.gov/energysaver/sizing-new-water-heater",
      note: "Official guide to first-hour rating and tank sizing",
    },
    {
      name: "Rheem/Rinnai — Tankless Sizing Guides",
      url: "https://www.rheem.com/",
      note: "Industry reference for flow rate and temperature rise",
    },
  ],

  related: [
    { name: "BTU calculator", slug: "btu-calculator", description: "Air conditioner sizing" },
    { name: "Heat pump calculator", slug: "heat-pump-calculator", description: "Home heating and cooling size" },
    { name: "Wire size calculator", slug: "wire-size-calculator", description: "Circuit wiring for electric water heaters" },
    { name: "Solar panel calculator", slug: "solar-calculator", description: "Solar to offset water heating" },
  ],

  faq: [
    {
      question: "What size water heater do I need for a family of 4?",
      answer:
        "A 50-gallon tank handles most 4-person families comfortably. Upgrade to 65-75 gallons if you have 3+ bathrooms with frequent simultaneous use, a large soaking tub, or teenagers who take long showers. For tankless, 160,000-199,000 BTU gas or 27 kW electric handles 2 simultaneous showers in cold climates.",
    },
    {
      question: "Tank or tankless — which is better?",
      answer:
        "Tankless: lasts 20+ years, endless hot water, 30% more efficient, takes less space. Tank: cheaper upfront ($400-1,000 vs $1,500-3,500), simpler install, no flow-rate limit. Tankless pays back in 8-15 years via energy savings. For homes where gas line and venting are already set up for tank, a tank is the easier swap. New construction or cold climates: tankless is increasingly the default.",
    },
    {
      question: "What's first-hour rating (FHR)?",
      answer:
        "FHR is the gallons of hot water a tank water heater can deliver in the first hour of use, starting with a full tank. More important than tank capacity when comparing heaters. A 50-gallon tank with a high-output burner might have an FHR of 80 gallons — better for busy mornings than a 75-gallon tank with a smaller burner (FHR 70 gallons).",
    },
    {
      question: "How do I calculate tankless size?",
      answer:
        "Start with peak simultaneous GPM (shower = 2.5, sink = 1.5, dishwasher = 1.5). Then determine temperature rise (120°F output − your incoming water temp). Multiply: GPM × temp rise × 500 = BTU/hr needed. For a 2-shower family in cold water: 5 GPM × 85°F × 500 = 212,500 BTU/hr, which requires two units or a commercial tankless.",
    },
    {
      question: "How long do water heaters last?",
      answer:
        "Tank water heaters: 8-12 years typical, up to 15-20 with anode rod maintenance. Tankless: 20-25 years with annual flushing. Gas tank heaters often outlast electric because the pilot/burner cycle doesn't corrode the tank lining as quickly. Hard water significantly shortens tank heater life.",
    },
    {
      question: "How much does a new water heater cost?",
      answer:
        "40-50 gallon gas tank installed: $1,200-2,500. 40-50 gallon electric tank: $900-2,000. Gas tankless: $2,500-4,500 installed (includes venting). Electric tankless: $1,500-3,500 installed (often needs panel upgrade). Heat pump water heater: $2,500-4,500 (Energy Star rebates and tax credits often available).",
    },
    {
      question: "Should I consider a heat pump water heater?",
      answer:
        "Yes if you have space (they need 1,000 cu ft of room air), don't mind unit cost ($1,500-3,000 vs $500 for a standard electric), and want lowest operating cost. Heat pump water heaters use 70% less electricity than standard electric. Pay back in 3-7 years in most climates. Don't install in unheated garages where the unit can freeze.",
    },
    {
      question: "What if I run out of hot water?",
      answer:
        "Tank: heater is undersized, OR the dip tube is broken, OR the bottom heating element (electric) is failed. For sizing issues: upgrade tank or switch to tankless. Tankless: flow exceeds capacity, OR incoming water is colder than spec, OR gas line is undersized. Verify specs match usage; larger unit may be needed.",
    },
  ],
};
