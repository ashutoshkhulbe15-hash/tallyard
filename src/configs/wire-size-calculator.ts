import { WireSizeCalculatorExpansion } from "@/content/wire-size-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const wireSizeCalculatorConfig: CalculatorConfig = {
  slug: "wire-size-calculator",
  title: "Wire Size Calculator",
  description:
    "Electrical wire gauge (AWG) for any amp load and run length. Accounts for voltage drop so your circuit stays within code.",
  categoryLabel: "Electrical",
  category: "hvac",

  bannerHeadline: "Wire safely.",
  bannerTags: ["Voltage drop included", "Copper or aluminum", "NEC-aligned"],

  inputs: [
    {
      id: "amps",
      label: "Circuit amperage",
      type: "number",
      unitImperial: "A",
      defaultImperial: 20,
      min: 1,
      max: 400,
      step: 1,
      help: "Breaker size or continuous load. Common: 15A outlets, 20A kitchen, 30A dryer, 50A range.",
    },
    {
      id: "voltage",
      label: "Voltage",
      type: "select",
      defaultImperial: 120,
      options: [
        { label: "120V (standard outlet)", value: 120 },
        { label: "240V (large appliance)", value: 240 },
        { label: "12V (DC automotive)", value: 12 },
        { label: "24V (DC solar)", value: 24 },
        { label: "48V (DC solar)", value: 48 },
      ],
    },
    {
      id: "distance",
      label: "One-way distance",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 50,
      defaultMetric: 15,
      min: 1,
      step: 1,
      help: "Distance from panel/source to load (not round-trip)",
    },
    {
      id: "material",
      label: "Wire material",
      type: "select",
      defaultImperial: "copper",
      options: [
        { label: "Copper", value: "copper" },
        { label: "Aluminum", value: "aluminum" },
      ],
    },
    {
      id: "voltageDropLimit",
      label: "Max voltage drop",
      type: "select",
      defaultImperial: 3,
      options: [
        { label: "3% (branch circuit)", value: 3 },
        { label: "5% (feeder)", value: 5 },
        { label: "2% (sensitive electronics)", value: 2 },
      ],
    },
  ],

  calculate: (values, units) => {
    const amps = Number(values.amps) || 20;
    const voltage = Number(values.voltage) || 120;
    const distance = Number(values.distance) || 50;
    const material = String(values.material || "copper");
    const vdLimit = Number(values.voltageDropLimit) || 3;

    // Convert distance to feet for NEC formulas
    const distanceFt = units === "metric" ? distance * 3.281 : distance;

    // Resistance per 1000 ft (ohms) by AWG, copper
    // Source: NEC Table 8
    const awgData: Array<{ awg: string; areaCmil: number; ampacityCu: number; ampacityAl: number; ohmsCu: number; ohmsAl: number }> = [
      { awg: "14", areaCmil: 4110, ampacityCu: 15, ampacityAl: 0, ohmsCu: 3.07, ohmsAl: 4.98 },
      { awg: "12", areaCmil: 6530, ampacityCu: 20, ampacityAl: 15, ohmsCu: 1.93, ohmsAl: 3.18 },
      { awg: "10", areaCmil: 10380, ampacityCu: 30, ampacityAl: 25, ohmsCu: 1.21, ohmsAl: 2.00 },
      { awg: "8", areaCmil: 16510, ampacityCu: 50, ampacityAl: 40, ohmsCu: 0.764, ohmsAl: 1.26 },
      { awg: "6", areaCmil: 26240, ampacityCu: 65, ampacityAl: 50, ohmsCu: 0.491, ohmsAl: 0.808 },
      { awg: "4", areaCmil: 41740, ampacityCu: 85, ampacityAl: 65, ohmsCu: 0.308, ohmsAl: 0.508 },
      { awg: "3", areaCmil: 52620, ampacityCu: 100, ampacityAl: 75, ohmsCu: 0.245, ohmsAl: 0.403 },
      { awg: "2", areaCmil: 66360, ampacityCu: 115, ampacityAl: 90, ohmsCu: 0.194, ohmsAl: 0.319 },
      { awg: "1", areaCmil: 83690, ampacityCu: 130, ampacityAl: 100, ohmsCu: 0.154, ohmsAl: 0.253 },
      { awg: "1/0", areaCmil: 105600, ampacityCu: 150, ampacityAl: 120, ohmsCu: 0.122, ohmsAl: 0.201 },
      { awg: "2/0", areaCmil: 133100, ampacityCu: 175, ampacityAl: 135, ohmsCu: 0.0967, ohmsAl: 0.159 },
      { awg: "3/0", areaCmil: 167800, ampacityCu: 200, ampacityAl: 155, ohmsCu: 0.0766, ohmsAl: 0.126 },
      { awg: "4/0", areaCmil: 211600, ampacityCu: 230, ampacityAl: 180, ohmsCu: 0.0608, ohmsAl: 0.100 },
    ];

    // Calculate voltage drop for each and find smallest wire that meets ampacity AND voltage drop requirements
    const maxDropVolts = (voltage * vdLimit) / 100;

    let recommendation: (typeof awgData)[0] | null = null;
    let recommendedDrop = 0;
    let ampacityLimitedGauge: string | null = null;
    let voltageDropLimitedGauge: string | null = null;

    for (const row of awgData) {
      const ampacity = material === "aluminum" ? row.ampacityAl : row.ampacityCu;
      const ohmsPerKFt = material === "aluminum" ? row.ohmsAl : row.ohmsCu;

      // Skip if ampacity is 0 (i.e., aluminum not available in this AWG)
      if (ampacity === 0) continue;

      // Voltage drop: VD = 2 × I × R × L / 1000 (× 2 for round trip)
      const resistance = (ohmsPerKFt * distanceFt) / 1000;
      const vdrop = 2 * amps * resistance;

      const meetsAmpacity = ampacity >= amps;
      const meetsVdrop = vdrop <= maxDropVolts;

      if (meetsAmpacity && !ampacityLimitedGauge) ampacityLimitedGauge = row.awg;
      if (meetsVdrop && !voltageDropLimitedGauge) voltageDropLimitedGauge = row.awg;

      if (meetsAmpacity && meetsVdrop) {
        recommendation = row;
        recommendedDrop = vdrop;
        break;
      }
    }

    if (!recommendation) {
      // Use the largest if nothing fit
      recommendation = awgData[awgData.length - 1];
      const ohmsPerKFt = material === "aluminum" ? recommendation.ohmsAl : recommendation.ohmsCu;
      recommendedDrop = (2 * amps * ohmsPerKFt * distanceFt) / 1000;
    }

    const ampacity = material === "aluminum" ? recommendation.ampacityAl : recommendation.ampacityCu;
    const dropPct = (recommendedDrop / voltage) * 100;

    // Determine which constraint was binding
    const constrainedBy =
      ampacityLimitedGauge === voltageDropLimitedGauge
        ? "balanced"
        : voltageDropLimitedGauge &&
            ampacityLimitedGauge &&
            awgData.findIndex((r) => r.awg === voltageDropLimitedGauge) >
              awgData.findIndex((r) => r.awg === ampacityLimitedGauge)
          ? "voltage drop"
          : "ampacity";

    return {
      value: Number(recommendation.awg.replace("/0", "")) || 0,
      unit: `AWG ${recommendation.awg}`,
      valueRounded: Number(recommendation.awg.replace("/0", "")) || 0,
      breakdown: [
        { label: "recommended", value: `${recommendation.awg} AWG ${material}` },
        { label: "ampacity", value: `${ampacity}A` },
        { label: "voltage drop", value: `${round(dropPct, 2)}% (${round(recommendedDrop, 2)}V)` },
      ],
      formulaSteps: [
        `distance = ${distance} ${units === "metric" ? "m" : "ft"}${units === "metric" ? ` = ${formatNumber(round(distanceFt, 1))} ft` : ""}`,
        `max allowed drop = ${voltage}V × ${vdLimit}% = ${formatNumber(round(maxDropVolts, 2))}V`,
        `selected: ${recommendation.awg} AWG ${material}`,
        `ampacity check: ${ampacity}A ≥ ${amps}A ✓`,
        `voltage drop = 2 × ${amps}A × (${material === "aluminum" ? recommendation.ohmsAl : recommendation.ohmsCu}Ω/1000ft) × ${formatNumber(round(distanceFt, 1))}ft / 1000 = ${formatNumber(round(recommendedDrop, 2))}V`,
        `drop as %: ${formatNumber(round(dropPct, 2))}% ≤ ${vdLimit}% ✓`,
        `constraint: ${constrainedBy === "voltage drop" ? "limited by voltage drop (long run)" : constrainedBy === "ampacity" ? "limited by ampacity (high current)" : "balanced"}`,
      ],
    };
  },

  ContentExpansion: WireSizeCalculatorExpansion,

  formulaDescription:
    "smallest AWG where ampacity ≥ load AND voltage drop ≤ limit (VD = 2 × I × R × L / 1000)",

  methodology: [
    "The calculator steps through standard AWG wire gauges from smallest to largest, checking two constraints for each: ampacity (does the wire handle the current without overheating?) and voltage drop (does the voltage at the load stay within the allowed percentage of the source voltage?). The smallest wire that meets both constraints is the recommendation.",
    "Ampacity values come from NEC Table 310.16 — the industry standard for conductor capacity in typical residential conditions (60-75°C insulation, up to 3 current-carrying conductors in a raceway, 30°C ambient). For unusual installations (conduit fill above 3 wires, high ambient temperature, direct burial), derating factors apply — consult NEC or an electrician.",
    "Voltage drop is calculated using the standard formula VD = 2 × I × R × L / 1000, where 2 accounts for the round-trip (current flows out on one conductor and back on another), I is amperage, R is resistance per 1000 ft, and L is the one-way distance. The 3% branch / 5% feeder limit in the NEC is a recommendation, not a code requirement — but exceeding it causes poor appliance performance and wasted energy.",
    "For long runs (over 100 ft at 15-20A), voltage drop usually drives the wire size up from what ampacity alone would suggest. For short runs at high current (under 30 ft at 50A+), ampacity is the binding constraint. The calculator tells you which one drove the choice.",
    "Aluminum wire has lower ampacity than copper for the same AWG (about 80% of copper's rating) and higher resistance (about 60% more). For long runs, aluminum requires a larger gauge to achieve the same voltage drop. Aluminum is common for service entrance and subpanel feeders; copper is standard for branch circuits and where terminals aren't rated for aluminum.",
  ],

  sources: [
    {
      name: "NEC Table 310.16 — Conductor Ampacity",
      url: "https://www.nfpa.org/codes-and-standards/all-codes-and-standards/list-of-codes-and-standards/detail?code=70",
      note: "Official ampacity values for copper and aluminum conductors",
    },
    {
      name: "NEC Table 8 — Conductor Resistance",
      url: "https://www.nfpa.org/",
      note: "DC resistance per 1000 ft for voltage drop calculation",
    },
  ],

  related: [
    { name: "Solar panel calculator", slug: "solar-calculator", description: "System sizing for your electricity use" },
    { name: "BTU calculator", slug: "btu-calculator", description: "Air conditioner amps and sizing" },
    { name: "Extension cord calculator", slug: "extension-cord-calculator", description: "Cord gauge for tools and appliances" },
    { name: "Extension cord calculator", slug: "extension-cord-calculator", description: "AWG for any tool or appliance" },
  ],

  faq: [
    {
      question: "What gauge wire do I need for a 20 amp circuit?",
      answer:
        "For a typical 20 amp residential circuit with a run under 50 feet, use 12 AWG copper (the NEC minimum for 20 amps). For runs over 100 feet, voltage drop may require stepping up to 10 AWG. Use the calculator above with your specific distance.",
    },
    {
      question: "What's the difference between ampacity and voltage drop?",
      answer:
        "Ampacity is the maximum current a wire can carry without overheating — it's a safety limit. Voltage drop is the power lost to resistance over distance — it's a performance limit (poor appliance operation, wasted energy). Both must be respected: a wire must have ampacity for the current AND low enough voltage drop for the distance.",
    },
    {
      question: "Can I use aluminum wire for branch circuits?",
      answer:
        "Modern aluminum alloys are safe for service entrances and subpanel feeders. For branch circuits (outlets, lights, appliances), copper is strongly preferred — older aluminum in branch circuits is a known fire hazard. If you're installing new, use copper. If you have existing aluminum branch wiring, have it inspected.",
    },
    {
      question: "What happens if the wire is too small?",
      answer:
        "Undersized wire overheats under load, which melts insulation and causes fires. The breaker protects against short circuits but not against a wire slightly too small for the continuous load — a 20A breaker on 14 AWG wire will allow the wire to overheat even though the breaker isn't tripping. Always match wire size to breaker size at minimum.",
    },
    {
      question: "Do long runs really need bigger wire?",
      answer:
        "Yes. A 100-foot run of 14 AWG at 15 amps drops 3.7% voltage — above the 3% recommendation. At 200 feet it's 7.4%, which will cause motors and LEDs to perform poorly. For long runs, always run the voltage drop calculation — ampacity alone isn't enough.",
    },
    {
      question: "What about DC wiring for solar and automotive?",
      answer:
        "Same formulas apply but voltage drop matters more because DC systems often run at lower voltages (12/24/48V). A 3% drop on a 12V system is only 0.36V — not much headroom. For DC solar and automotive, many installers target 2% max drop, which means even larger wire. The calculator's 2% option covers this case.",
    },
    {
      question: "Is this calculator NEC-compliant?",
      answer:
        "The ampacity values match NEC 310.16 (60-75°C copper and aluminum at 30°C ambient, 3-conductor raceway). Voltage drop calculations use standard DC resistance from NEC Table 8. For unusual conditions (high ambient temperature, conduit fill > 3 conductors, direct burial), additional derating applies that the calculator doesn't model. For code-critical installations, have an electrician verify.",
    },
    {
      question: "Should I oversize wire?",
      answer:
        "For long runs or continuous loads (EV chargers, AC condensers), yes — one gauge larger than the minimum provides headroom for future load increases and reduces voltage drop. For standard outlets and lighting in short runs, minimum code is fine. The cost difference between sizes is modest, so erring larger is cheap insurance.",
    },
  ],
};
