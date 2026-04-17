import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const extensionCordCalculatorConfig: CalculatorConfig = {
  slug: "extension-cord-calculator",
  title: "Extension Cord Calculator",
  description:
    "Right extension cord gauge for any tool, appliance, or outdoor device. Accounts for amps, length, and voltage drop.",
  categoryLabel: "Electrical",
  category: "hvac",

  bannerHeadline: "Cord safely.",
  bannerTags: ["Any tool or appliance", "Indoor or outdoor", "AWG sizing"],

  inputs: [
    {
      id: "appliance",
      label: "What are you powering?",
      type: "select",
      defaultImperial: "custom",
      options: [
        { label: "Small electronics (< 5 amps)", value: "small" },
        { label: "Power tool / small appliance (5-10 amps)", value: "medium" },
        { label: "Heater / large tool (10-15 amps)", value: "large" },
        { label: "Heavy equipment (15-20 amps)", value: "xlarge" },
        { label: "Enter exact amps", value: "custom" },
      ],
      help: "Check the appliance label or manual for amp rating",
    },
    {
      id: "amps",
      label: "Amps (if custom)",
      type: "number",
      unitImperial: "A",
      defaultImperial: 12,
      min: 0.1,
      max: 20,
      step: 0.5,
      help: "Only used if 'Enter exact amps' is selected above",
    },
    {
      id: "length",
      label: "Cord length",
      type: "select",
      defaultImperial: 50,
      options: [
        { label: "25 ft / 7.5 m", value: 25 },
        { label: "50 ft / 15 m", value: 50 },
        { label: "100 ft / 30 m", value: 100 },
        { label: "150 ft / 45 m", value: 150 },
        { label: "200 ft / 60 m", value: 200 },
      ],
    },
    {
      id: "location",
      label: "Use location",
      type: "select",
      defaultImperial: "outdoor",
      options: [
        { label: "Indoor (dry)", value: "indoor" },
        { label: "Outdoor (or wet areas)", value: "outdoor" },
      ],
      help: "Outdoor cords need weather-rated jackets (SJTW or W rating)",
    },
  ],

  calculate: (values) => {
    const appliance = String(values.appliance || "custom");
    const customAmps = Number(values.amps) || 12;
    const length = Number(values.length) || 50;
    const location = String(values.location || "outdoor");

    // Map preset to amp loading
    const applianceAmps: Record<string, number> = {
      small: 4,
      medium: 9,
      large: 14,
      xlarge: 18,
      custom: customAmps,
    };
    const amps = applianceAmps[appliance] || customAmps;

    // Extension cord gauge table (at typical 3% voltage drop on 120V):
    // Gauge     | 25 ft max | 50 ft max | 100 ft max | 150 ft max
    // 18 AWG    | 7 A       | 5 A       | -          | -
    // 16 AWG    | 13 A      | 10 A      | 7 A        | -
    // 14 AWG    | 15 A      | 13 A      | 10 A       | 7 A
    // 12 AWG    | 20 A      | 15 A      | 13 A       | 10 A
    // 10 AWG    | 20 A      | 20 A      | 15 A       | 13 A
    const gaugeTable: Record<number, Record<string, number>> = {
      25: { "18": 7, "16": 13, "14": 15, "12": 20, "10": 20 },
      50: { "18": 5, "16": 10, "14": 13, "12": 15, "10": 20 },
      100: { "18": 0, "16": 7, "14": 10, "12": 13, "10": 15 },
      150: { "18": 0, "16": 0, "14": 7, "12": 10, "10": 13 },
      200: { "18": 0, "16": 0, "14": 5, "12": 7, "10": 10 },
    };
    const row = gaugeTable[length] || gaugeTable[50];

    const gauges = ["18", "16", "14", "12", "10"];
    let recommendedGauge = "10";
    for (const g of gauges) {
      if (row[g] >= amps) {
        recommendedGauge = g;
        break;
      }
    }

    // Rated capacity of the recommended gauge at this length
    const capacityAtGauge = row[recommendedGauge];

    // Voltage drop for reference (simplified)
    const ohmsPerKFt: Record<string, number> = {
      "18": 6.385,
      "16": 4.016,
      "14": 2.525,
      "12": 1.588,
      "10": 0.999,
    };
    const vDrop =
      (2 * amps * (ohmsPerKFt[recommendedGauge] || 2.525) * length) / 1000;
    const vDropPct = (vDrop / 120) * 100;

    const jacketRating =
      location === "outdoor" ? "SJTW or W-rated (weather-resistant)" : "SJT, SVT (indoor OK)";

    return {
      value: Number(recommendedGauge),
      unit: `AWG ${recommendedGauge}`,
      valueRounded: Number(recommendedGauge),
      breakdown: [
        { label: "load", value: `${amps} A` },
        { label: "length", value: `${length} ft` },
        { label: "recommended", value: `${recommendedGauge} AWG` },
        { label: "rated for", value: `${capacityAtGauge} A at this length` },
        { label: "voltage drop", value: `~${round(vDropPct, 1)}%` },
        { label: "jacket", value: jacketRating },
      ],
      formulaSteps: [
        `load = ${amps} A (${appliance === "custom" ? "custom" : appliance})`,
        `length = ${length} ft`,
        `location = ${location}`,
        `checking gauges for ${length}-ft length at ${amps}A minimum:`,
        ...gauges.map(
          (g) =>
            `  ${g} AWG: rated ${row[g]}A ${row[g] >= amps ? "✓" : "✗"}`
        ),
        `recommended = ${recommendedGauge} AWG`,
        `voltage drop = 2 × ${amps} × ${ohmsPerKFt[recommendedGauge]}Ω × ${length}ft / 1000 = ${round(vDrop, 2)}V (${round(vDropPct, 1)}%)`,
        `required jacket: ${jacketRating}`,
      ],
    };
  },

  formulaDescription:
    "smallest AWG where ampacity at given length ≥ load; voltage drop = 2 × I × R × L / 1000",

  methodology: [
    "Extension cord gauges are rated by how much current they can handle at a specific length while keeping voltage drop under 3%. The three key variables: amps (the appliance load), length (how far from the outlet), and whether outdoor conditions require weather-rated jackets.",
    "Voltage drop math follows the same formula as the wire size calculator: VD = 2 × I × R × L / 1000, where R is the resistance per 1000 feet of that gauge. Lower gauge numbers mean thicker copper, less resistance, less voltage drop. A 12 AWG cord has about 40% less resistance than a 14 AWG cord.",
    "Length matters enormously. At 25 feet, a 16 AWG cord handles 13 amps. At 100 feet, the same 16 AWG cord is only rated for 7 amps — the extra length means the same current produces more voltage drop. For long runs with heavy loads, always step up one or two gauges.",
    "The appliance presets are practical compromises. 'Small electronics' (lamps, phones, laptops) are usually under 5 amps. 'Power tools' (drills, circular saws, small air compressors) are 5-10 amps. 'Heaters and large tools' (space heaters, portable ACs, table saws) run 10-15 amps. 'Heavy equipment' (RV loads, large compressors, industrial tools) can draw 15-20 amps.",
    "Outdoor cords need jacket ratings that survive moisture and UV: SJTW or W-rated (e.g., '12/3 SJTW' means 12 AWG, 3 conductors, thermoplastic jacket, weather-resistant). Indoor cords (SJT, SVT) aren't rated for outdoor use and degrade quickly in sun and rain. Running an indoor cord outside is a fire hazard if the jacket cracks.",
    "For continuous loads (tools running more than 3 hours straight, or appliances that cycle frequently), derate by 20%: pick a cord rated for 125% of the load. Also: never daisy-chain extension cords — every connection point adds resistance. Use one long cord, not three short ones.",
  ],

  sources: [
    {
      name: "OSHA — Extension Cord Safety",
      url: "https://www.osha.gov/",
      note: "Workplace safety standards for extension cord use",
    },
    {
      name: "UL Standards for Cord Sets",
      url: "https://www.ul.com/",
      note: "Industry standard for jacket ratings and ampacity",
    },
  ],

  related: [
    { name: "Wire size calculator", slug: "wire-size-calculator", description: "AWG for permanent circuit wiring" },
    { name: "Solar panel calculator", slug: "solar-calculator", description: "System size for home electricity" },
    { name: "Heat pump calculator", slug: "heat-pump-calculator", description: "Heating and cooling sizing" },
    { name: "BTU calculator", slug: "btu-calculator", description: "AC sizing by room" },
  ],

  faq: [
    {
      question: "What gauge extension cord do I need for a 15-amp tool?",
      answer:
        "Depends on length. For 25 feet: 14 AWG is sufficient (rated 15A). For 50 feet: 12 AWG is needed (rated 15A at 50 ft; 14 AWG drops to 13A rated). For 100 feet: 10 AWG (12 AWG is rated only 13A at 100 ft). Always size up for long runs — voltage drop reduces tool power and can overheat motors.",
    },
    {
      question: "What happens if I use a cord that's too thin?",
      answer:
        "Undersized cords overheat under load, melting insulation and causing fires. Even before fire: voltage drop causes motors to run hot and lose power (circular saws bog down, refrigerators short-cycle), LEDs dim, and electronic devices may not power on at all. The cord itself may feel warm or hot — that's a warning sign to upgrade.",
    },
    {
      question: "Can I use an indoor cord outside temporarily?",
      answer:
        "Not safely. Indoor jackets (SJT, SVT) crack when exposed to UV and moisture, which exposes the internal conductors and creates shock/fire risk. 'Temporary' use tends to become regular use. Outdoor-rated cords (SJTW, W) cost only 20-30% more and last years in weather. Always use the right cord.",
    },
    {
      question: "What do the numbers on an extension cord mean?",
      answer:
        "A marking like '12/3 SJTW 300V' means: 12 = 12 AWG gauge, 3 = three conductors (hot, neutral, ground), SJTW = thermoplastic jacket, weather-resistant, 300V = voltage rating. Higher numbers after AWG mean more conductors (mostly you want 3 for grounding safety). Lower AWG numbers mean thicker wire.",
    },
    {
      question: "Can I daisy-chain extension cords?",
      answer:
        "No — every connection point adds resistance and creates a potential arc point. If you need 100 feet, use a 100-foot cord, not two 50-foot cords. Never connect a smaller gauge cord after a larger gauge (defeats the voltage drop math entirely). For long distances with heavy loads, consider a temporary single cord of the right gauge.",
    },
    {
      question: "How many amps does a typical power tool draw?",
      answer:
        "Corded drill: 6-10 amps. Circular saw: 12-15 amps. Reciprocating saw: 8-14 amps. Miter saw: 13-15 amps. Angle grinder: 6-12 amps. Small shop vacuum: 6-10 amps. Large shop vacuum: 12 amps. Always check the tool's nameplate — stated amperage is the sustained load, motors draw more during startup.",
    },
    {
      question: "What about 240V extension cords?",
      answer:
        "For 240V equipment (welders, RV hookups, large shop tools), you need a dedicated 240V extension cord with the appropriate NEMA plug (10-30, 14-30, 6-50, etc.). Gauge math is similar but voltage drop at 240V is percentage-wise lower for the same cord length. Never use a 240V cord on 120V circuits or vice versa.",
    },
    {
      question: "Should I use a surge protector on extension cord runs?",
      answer:
        "For sensitive electronics (computers, TVs, audio equipment), yes — at the OUTLET end of the cord. Don't run surge protectors on thin extension cords or daisy-chain them. For tools and appliances, surge protection isn't needed. For outdoor use, pick outdoor-rated GFCI protection at the source instead of surge suppression.",
    },
  ],
};
