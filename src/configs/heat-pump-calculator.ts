import { HeatPumpCalculatorExpansion } from "@/content/heat-pump-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const heatPumpCalculatorConfig: CalculatorConfig = {
  slug: "heat-pump-calculator",
  title: "Heat Pump Calculator",
  description:
    "Right-size a heat pump for your home. Sizes both heating and cooling loads based on square footage, climate zone, and insulation quality.",
  categoryLabel: "HVAC",
  category: "hvac",

  bannerHeadline: "Pump correctly.",
  bannerTags: ["Heating + cooling", "Climate zone", "Size in tons"],

  inputs: [
    {
      id: "sqFt",
      label: "Home square footage",
      type: "number",
      unitImperial: "ft²",
      unitMetric: "m²",
      defaultImperial: 2000,
      defaultMetric: 186,
      min: 400,
      step: 100,
      help: "Conditioned living area only (exclude garage, unfinished basement)",
    },
    {
      id: "climate",
      label: "Climate zone",
      type: "select",
      defaultImperial: "5",
      options: [
        { label: "1-2: Hot (FL, TX Gulf)", value: "1-2" },
        { label: "3: Warm (GA, AZ, S. CA)", value: "3" },
        { label: "4: Mixed (VA, KY, N. CA)", value: "4" },
        { label: "5: Cold (IL, CO, NY)", value: "5" },
        { label: "6: Cold (MN, ME, MT)", value: "6" },
        { label: "7: Very cold (N. MN, AK)", value: "7" },
      ],
    },
    {
      id: "insulation",
      label: "Insulation quality",
      type: "select",
      defaultImperial: "average",
      options: [
        { label: "Poor (old, minimal)", value: "poor" },
        { label: "Average (meets code)", value: "average" },
        { label: "Good (upgraded)", value: "good" },
        { label: "Excellent (energy star)", value: "excellent" },
      ],
    },
    {
      id: "ceiling",
      label: "Ceiling height",
      type: "select",
      defaultImperial: "standard",
      options: [
        { label: "Standard (8-9 ft)", value: "standard" },
        { label: "Vaulted (10-12 ft average)", value: "vaulted" },
        { label: "Cathedral (14 ft+)", value: "cathedral" },
      ],
    },
    {
      id: "windows",
      label: "Window coverage",
      type: "select",
      defaultImperial: "average",
      options: [
        { label: "Few (<10% of walls)", value: "few" },
        { label: "Average (10-20%)", value: "average" },
        { label: "Many (20%+)", value: "many" },
      ],
    },
  ],

  calculate: (values, units) => {
    const sqFtInput = Number(values.sqFt) || 0;
    const climate = String(values.climate || "5");
    const insulation = String(values.insulation || "average");
    const ceiling = String(values.ceiling || "standard");
    const windows = String(values.windows || "average");

    // Convert to sq ft if metric
    const sqFt = units === "metric" ? sqFtInput * 10.764 : sqFtInput;

    // Base BTU per sq ft by climate zone (cooling)
    // Based on ACCA Manual J guidelines (simplified)
    const coolingBtuPerSqFt: Record<string, number> = {
      "1-2": 25,
      "3": 22,
      "4": 20,
      "5": 18,
      "6": 17,
      "7": 16,
    };

    // Heating BTU per sq ft (heat pumps need more heating than cooling in cold climates)
    const heatingBtuPerSqFt: Record<string, number> = {
      "1-2": 25,
      "3": 30,
      "4": 35,
      "5": 40,
      "6": 50,
      "7": 60,
    };

    // Insulation multiplier
    const insulationMap: Record<string, number> = {
      poor: 1.25,
      average: 1.0,
      good: 0.9,
      excellent: 0.8,
    };
    const insMult = insulationMap[insulation] || 1.0;

    // Ceiling multiplier
    const ceilingMap: Record<string, number> = {
      standard: 1.0,
      vaulted: 1.15,
      cathedral: 1.3,
    };
    const ceilMult = ceilingMap[ceiling] || 1.0;

    // Windows multiplier
    const windowsMap: Record<string, number> = {
      few: 0.95,
      average: 1.0,
      many: 1.15,
    };
    const winMult = windowsMap[windows] || 1.0;

    const totalMultiplier = insMult * ceilMult * winMult;

    const coolingBtu = Math.round(
      sqFt * (coolingBtuPerSqFt[climate] || 18) * totalMultiplier
    );
    const heatingBtu = Math.round(
      sqFt * (heatingBtuPerSqFt[climate] || 40) * totalMultiplier
    );

    // Heat pump size is determined by the LARGER of the two loads
    const designBtu = Math.max(coolingBtu, heatingBtu);

    // Tons (1 ton = 12,000 BTU)
    const tons = designBtu / 12000;

    // Standard heat pump sizes (half-ton increments)
    const standardSizes = [1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0];
    let recommendedSize = standardSizes[standardSizes.length - 1];
    for (const size of standardSizes) {
      if (size >= tons) {
        recommendedSize = size;
        break;
      }
    }

    const bindingLoad = coolingBtu > heatingBtu ? "cooling" : "heating";

    const displaySqFt = units === "metric" ? sqFtInput : sqFt;
    const areaUnit = units === "metric" ? "m²" : "ft²";

    return {
      value: recommendedSize,
      unit: "tons",
      valueRounded: recommendedSize,
      breakdown: [
        { label: "home area", value: `${formatNumber(round(displaySqFt, 0))} ${areaUnit}` },
        { label: "cooling BTU", value: `${formatNumber(coolingBtu)}` },
        { label: "heating BTU", value: `${formatNumber(heatingBtu)}` },
        { label: "sized by", value: bindingLoad },
        { label: "design BTU", value: `${formatNumber(designBtu)}` },
      ],
      formulaSteps: [
        `area = ${formatNumber(round(sqFt, 0))} ft² (zone ${climate})`,
        `cooling = ${formatNumber(round(sqFt, 0))} × ${coolingBtuPerSqFt[climate]} × ${round(totalMultiplier, 2)} = ${formatNumber(coolingBtu)} BTU/hr`,
        `heating = ${formatNumber(round(sqFt, 0))} × ${heatingBtuPerSqFt[climate]} × ${round(totalMultiplier, 2)} = ${formatNumber(heatingBtu)} BTU/hr`,
        `multipliers: insulation ${insMult}× · ceiling ${ceilMult}× · windows ${winMult}×`,
        `design BTU = max(cooling, heating) = ${formatNumber(designBtu)} BTU/hr (${bindingLoad} is binding)`,
        `tons = ${formatNumber(designBtu)} ÷ 12,000 = ${round(tons, 2)}`,
        `recommended size = ${recommendedSize} tons (next standard size up)`,
      ],
      composition: {
        unit: "BTU",
        total: Math.max(coolingBtu, heatingBtu),
        segments: [
          { label: "Cooling", amount: coolingBtu, shade: "primary" },
          { label: "Heating", amount: heatingBtu, shade: "secondary" },
        ],
      },
    };
  },

  ContentExpansion: HeatPumpCalculatorExpansion,

  formulaDescription:
    "BTU = sqft × climate factor × insulation × ceiling × windows; tons = BTU ÷ 12,000",

  methodology: [
    "Heat pump sizing is more complex than pure AC sizing because it must handle both cooling in summer AND heating in winter. Heat pumps are sized by the LARGER of the two loads — in cold climates, heating drives the size; in warm climates, cooling does. The calculator computes both and picks the larger.",
    "Climate zone sets the baseline BTU per square foot. Cooling load decreases from Zone 1 (25 BTU/ft², hot) to Zone 7 (16 BTU/ft², mild summers). Heating load increases from Zone 1 (25 BTU/ft²) to Zone 7 (60 BTU/ft², very cold winters). Zone 5 (typical northern US) is where heating and cooling loads are similar; zones 6-7 are heating-dominated.",
    "Insulation quality adjusts the base BTU up or down. Poor insulation (old homes, minimal attic insulation, single-pane windows) increases load by 25%. Average insulation (meets current code) is the baseline. Good insulation (upgraded with extra attic batt, storm windows) reduces by 10%. Energy Star excellent insulation reduces by 20%.",
    "Ceiling height matters because you're heating and cooling the entire volume of the home, not just the floor area. Standard 8-9 ft ceilings are the baseline. Vaulted ceilings (10-12 ft average) add 15%. Cathedral ceilings (14+ ft) add 30%. Homes with a mix of ceiling types should use whichever is most common.",
    "Window coverage adjusts for solar gain and thermal losses. Windows are weaker thermal barriers than walls — R-3 or R-4 for good double-pane, vs R-13+ for insulated walls. Homes with lots of windows lose more heat in winter and gain more heat from sun in summer.",
    "Standard heat pump sizes are in half-ton increments from 1.5 to 5.0 tons (most residential), then 6 and 7.5 tons for larger homes. 1 ton = 12,000 BTU/hr. The calculator rounds UP to the next standard size — undersized heat pumps fail to keep up on peak hot/cold days. Oversizing by one size is fine; oversizing by 2+ sizes causes short-cycling and humidity problems.",
    "This is a simplified sizing. Professional HVAC installers use ACCA Manual J, a room-by-room load calculation that accounts for: specific window R-values, room orientation, duct losses, infiltration rates, and more. For a home purchase, use this calculator for rough estimates. For a real install, insist the contractor does Manual J — without it, sizing errors of 30-50% are common.",
  ],

  sources: [
    {
      name: "ACCA Manual J — Residential Load Calculation",
      url: "https://www.acca.org/standards",
      note: "Industry standard for HVAC load calculations",
    },
    {
      name: "Energy Star — Heat Pump Sizing",
      url: "https://www.energystar.gov/products/heat_pumps",
      note: "Baseline BTU per sq ft by climate zone",
    },
  ],

  related: [
    { name: "BTU calculator", slug: "btu-calculator", description: "Room-by-room AC sizing" },
    { name: "Insulation calculator", slug: "insulation-calculator", description: "R-value and bags" },
    { name: "Wire size calculator", slug: "wire-size-calculator", description: "Circuit wiring for heat pumps" },
    { name: "Solar panel calculator", slug: "solar-calculator", description: "Offset your heat pump electricity" },
  ],

  faq: [
    {
      question: "What size heat pump do I need for a 2,000 sq ft house?",
      answer:
        "In a mild Zone 4 climate with average insulation: a 3-ton heat pump. Cold Zone 5-6: 4 tons. Hot Zone 2: 4 tons (cooling-driven). Very cold Zone 7: 5 tons. Always size to the larger of heating or cooling. The calculator above does this automatically based on your specific inputs.",
    },
    {
      question: "Can a heat pump heat my home in cold weather?",
      answer:
        "Modern cold-climate heat pumps (2022+) work efficiently down to 5°F or lower. Standard heat pumps lose efficiency below 30°F and typically need backup heat (electric resistance strips, gas furnace) below 15-20°F. Size the heat pump for your typical heating load, not worst-case — pair with backup heat for the coldest days.",
    },
    {
      question: "Why is heating load larger than cooling load in cold climates?",
      answer:
        "The temperature differential between outside and inside is much larger in winter. On a 95°F summer day, you're cooling 25°F (to 70°F). On a 0°F winter day, you're heating 70°F. More than twice the work. Cold zones (5-7) always have heating-dominated loads; hot zones (1-3) are cooling-dominated.",
    },
    {
      question: "Should I oversize my heat pump?",
      answer:
        "No — one size up is fine, but two sizes up causes problems. An oversized heat pump short-cycles (turns on and off quickly without running long enough to remove humidity or circulate air evenly). Modern two-stage or variable-speed heat pumps handle oversizing better. Single-stage should be sized carefully — never by more than 15% over calculated load.",
    },
    {
      question: "What's the difference between a heat pump and an air conditioner?",
      answer:
        "A heat pump IS an air conditioner that can also run in reverse — moving heat from outside to inside in winter. Same core refrigeration cycle, just with a reversing valve. Most modern 'AC' installations that also need heating are now heat pumps. Furnaces are separate appliances that burn fuel (gas, oil) rather than moving heat.",
    },
    {
      question: "How much does a heat pump cost?",
      answer:
        "3-ton central heat pump installed: $7,000-15,000 in 2025-2026 US pricing. Cold-climate models (Mitsubishi, Fujitsu): $10,000-20,000. Ductless mini-split (single zone): $3,000-7,000 per zone. Federal tax credit of up to $2,000 available through 2032 for qualifying efficient models.",
    },
    {
      question: "What's SEER and HSPF?",
      answer:
        "SEER (Seasonal Energy Efficiency Ratio) measures cooling efficiency. Modern minimums: 14-15 SEER. Good: 16-18. Premium: 20+. HSPF (Heating Seasonal Performance Factor) measures heating efficiency. Modern minimums: 7.7 HSPF. Good: 9-10. Premium: 11+. Higher is better for both. Federal tax credit requires 15+ SEER2 and 8.5+ HSPF2 for heat pumps.",
    },
    {
      question: "Do I need a new electrical panel for a heat pump?",
      answer:
        "Depends on your panel capacity. A 3-ton heat pump needs a 30-amp 240V circuit. A 5-ton needs 50 amps. If you have a 100-amp service panel that's already near capacity, adding a heat pump may require a service upgrade to 200 amps ($2,000-4,000). Most homes built after 1970 have sufficient capacity. Have an electrician evaluate before installation.",
    },
  ],
  relatedGuides: [
    { name: "Heat pump vs furnace + AC", slug: "heat-pump-vs-furnace", description: "Climate-zone comparison of heat pump vs gas furnace operating costs" },
  ],
};
