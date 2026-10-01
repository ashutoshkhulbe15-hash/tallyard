import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const waterHeaterCalculatorConfig: CalculatorConfig = {
  slug: "water-heater-calculator",
  title: "Water-Heating Rate Conversion Worksheet",
  description: "Convert user-entered water flow and temperature rise to a theoretical heat-transfer rate. Does not size or select a water heater.",
  categoryLabel: "HVAC",
  category: "hvac",
  bannerHeadline: "Convert a known rate.",
  bannerTags: ["Enter flow and rise", "Theoretical heat rate", "No equipment selection"],
  inputs: [
    { id: "flow", label: "User-measured flow rate", type: "number", unitImperial: "GPM", unitMetric: "L/min", defaultImperial: 3, defaultMetric: 11.36, min: 0.01, step: 0.1 },
    { id: "rise", label: "Required temperature rise", type: "number", unitImperial: "°F", unitMetric: "°C", defaultImperial: 60, defaultMetric: 33.33, min: 0.01, step: 0.1, help: "Enter the difference between incoming and target water temperatures." },
  ],
  calculate: (values, units) => {
    const flow = Number(values.flow);
    const rise = Number(values.rise);
    if (![flow, rise].every(Number.isFinite) || flow <= 0 || rise <= 0) {
      throw new Error("Enter a positive flow rate and temperature rise.");
    }
    const rate = units === "metric" ? flow * rise * 69.8 : flow * rise * 500;
    const rounded = units === "metric" ? round(rate / 1000, 3) : Math.round(rate);
    return {
      value: units === "metric" ? rate / 1000 : rate,
      unit: units === "metric" ? "theoretical kW" : "theoretical BTU/h",
      valueRounded: rounded,
      breakdown: [
        { label: "entered flow", value: `${formatNumber(round(flow, 2))} ${units === "metric" ? "L/min" : "GPM"}` },
        { label: "entered temperature rise", value: `${formatNumber(round(rise, 2))} ${units === "metric" ? "°C" : "°F"}` },
        { label: "theoretical heat-transfer rate", value: `${formatNumber(rounded)} ${units === "metric" ? "kW" : "BTU/h"}` },
        { label: "equipment selection", value: "not calculated" },
      ],
      formulaSteps: [
        units === "metric"
          ? `theoretical rate = ${flow} L/min × ${rise} °C × 69.8 W/(L/min·°C) = ${round(rate / 1000, 3)} kW`
          : `theoretical rate = ${flow} GPM × ${rise} °F × 500 = ${Math.round(rate)} BTU/h`,
        "This idealized water-heating conversion does not include equipment efficiency, recovery, storage, rated performance, distribution losses, fuel or electrical supply, or installation conditions.",
      ],
    };
  },
  formulaDescription: "theoretical heat rate from user-entered flow × temperature rise using a water heat-capacity approximation",
  methodology: [
    "This worksheet converts a user-entered flow and temperature difference into an idealized heat-transfer rate. It uses approximately 500 BTU/h per GPM per °F in customary units, or 69.8 W per L/min per °C in metric units.",
    "The result is not a water-heater capacity recommendation. It does not assess first-hour rating, draw profile, recovery, equipment efficiency, rated output at the entered conditions, fuel supply, venting, electrical service, plumbing, or local requirements. Verify exact product performance and have installation and system selection reviewed by qualified professionals.",
  ],
  sources: [],
  related: [
    { name: "Heat pump load conversion", slug: "heat-pump-calculator", description: "Convert known heating and cooling loads to ton-equivalents" },
    { name: "Drain fixture-unit worksheet", slug: "drain-pipe-calculator", description: "Limited fixture-unit subtotal, not pipe sizing" },
  ],
  faq: [
    { question: "Does this tell me which water heater to buy?", answer: "No. It calculates only a theoretical heat-transfer rate from flow and temperature rise. Compare exact product ratings and obtain project-specific selection advice." },
    { question: "What is temperature rise?", answer: "It is the target water temperature minus incoming water temperature. This worksheet does not choose either temperature for your project." },
  ],
};
