import { HeatPumpCalculatorExpansion } from "@/content/heat-pump-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { formatNumber, round } from "@/lib/format";

export const heatPumpCalculatorConfig: CalculatorConfig = {
  ContentExpansion: HeatPumpCalculatorExpansion,
  slug: "heat-pump-calculator",
  title: "Heat Pump Calculator",
  description: "Convert user-provided heating and cooling loads to ton-equivalent arithmetic. This worksheet does not calculate building loads or select equipment.",
  categoryLabel: "HVAC",
  category: "hvac",
  bannerHeadline: "Convert known loads.",
  bannerTags: ["Enter verified loads", "12,000 BTU/h per ton", "No equipment selection"],
  inputs: [
    { id: "coolingBtu", label: "Cooling load from project documentation", type: "number", unitImperial: "BTU/h", unitMetric: "BTU/h", defaultImperial: 24000, defaultMetric: 24000, min: 1, step: 100 },
    { id: "heatingBtu", label: "Heating load from project documentation", type: "number", unitImperial: "BTU/h", unitMetric: "BTU/h", defaultImperial: 30000, defaultMetric: 30000, min: 1, step: 100 },
  ],
  calculate: (values) => {
    const cooling = Number(values.coolingBtu);
    const heating = Number(values.heatingBtu);
    if (![cooling, heating].every(Number.isFinite) || cooling <= 0 || heating <= 0) {
      throw new Error("Enter positive heating and cooling loads from project documentation.");
    }
    const coolingTons = cooling / 12000;
    const heatingTons = heating / 12000;
    const larger = Math.max(cooling, heating);
    return {
      value: round(larger / 12000, 3),
      unit: "ton-equivalent arithmetic",
      valueRounded: round(larger / 12000, 2),
      breakdown: [
        { label: "entered cooling load", value: `${formatNumber(cooling)} BTU/h (${round(coolingTons, 2)} ton-equivalent)` },
        { label: "entered heating load", value: `${formatNumber(heating)} BTU/h (${round(heatingTons, 2)} ton-equivalent)` },
        { label: "larger entered load", value: `${formatNumber(larger)} BTU/h (${round(larger / 12000, 2)} ton-equivalent)` },
        { label: "equipment size", value: "not selected" },
      ],
      formulaSteps: [
        `cooling ton-equivalent = ${formatNumber(cooling)} ÷ 12,000 = ${round(coolingTons, 3)}`,
        `heating ton-equivalent = ${formatNumber(heating)} ÷ 12,000 = ${round(heatingTons, 3)}`,
        "This conversion does not calculate a load, account for equipment performance at design conditions, or select capacity. Use a qualified HVAC designer and applicable load-calculation method.",
      ],
    };
  },
  formulaDescription: "ton-equivalent = user-entered load in BTU/h ÷ 12,000",
  methodology: [
    "Enter heating and cooling loads already calculated for the specific building and design conditions. This worksheet converts each input using 12,000 BTU/h per refrigeration ton and identifies the larger entered load for comparison only.",
    "It does not estimate building heat loss or gain, determine whether heating or cooling controls equipment selection, model capacity at outdoor temperatures, evaluate ducts, humidity, zoning, backup heat, or recommend equipment. Do not use the arithmetic result to purchase or size a system; obtain a qualified, project-specific design and compare exact equipment performance data.",
  ],
  sources: [],
  related: [
    { name: "Room AC capacity guide", slug: "btu-calculator", description: "A limited room air-conditioner area guide" },
    { name: "Water-heater worksheet", slug: "water-heater-calculator", description: "Theoretical water-heating rate conversion" },
  ],
  faq: [
    { question: "Does this size a heat pump?", answer: "No. It only converts two user-entered loads to ton-equivalent units. It does not calculate loads or select equipment." },
    { question: "Where should the inputs come from?", answer: "Use project-specific load calculations from a qualified HVAC professional, not a square-foot rule or this worksheet." },
  ],
};
