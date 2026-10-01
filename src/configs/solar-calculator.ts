import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber, ceilQuantity } from "@/lib/format";

export const solarCalculatorConfig: CalculatorConfig = {
  slug: "solar-calculator",
  title: "Solar Energy-Use Scenario Estimator",
  description: "Explore a panel-count scenario from entered electricity use and explicitly selected assumptions. Not a site assessment, production forecast, or system design.",
  categoryLabel: "Solar",
  category: "solar",
  bannerHeadline: "Explore an energy scenario.",
  bannerTags: ["Entered usage", "Assumptions shown", "Not system design"],
  inputs: [
    { id: "monthlyKwh", label: "Electricity use for a 30-day period", type: "number", unitImperial: "kWh", unitMetric: "kWh", defaultImperial: 900, defaultMetric: 900, min: 0.01, step: 10, help: "Example input only; replace with your own utility-bill usage." },
    { id: "sunHours", label: "Assumed average peak-sun-hours per day", type: "number", unitImperial: "h/day", unitMetric: "h/day", defaultImperial: 4.5, defaultMetric: 4.5, min: 0.01, step: 0.1, help: "Enter a project-specific assumption. This tool does not determine local solar resource." },
    { id: "panelWatts", label: "Panel nameplate rating", type: "number", unitImperial: "W", unitMetric: "W", defaultImperial: 400, defaultMetric: 400, min: 1, step: 1, help: "Use the rating for the product being considered; this is an example value." },
    { id: "deratePercent", label: "User-selected combined derate assumption", type: "number", unitImperial: "%", unitMetric: "%", defaultImperial: 80, defaultMetric: 80, min: 0.1, max: 100, step: 1, help: "An input assumption, not a measured or universally typical system efficiency." },
  ],
  calculate: (values) => {
    const monthlyKwh = Number(values.monthlyKwh);
    const sunHours = Number(values.sunHours);
    const panelWatts = Number(values.panelWatts);
    const deratePercent = Number(values.deratePercent);
    if (![monthlyKwh, sunHours, panelWatts, deratePercent].every(Number.isFinite) || monthlyKwh <= 0 || sunHours <= 0 || panelWatts <= 0 || deratePercent <= 0 || deratePercent > 100) {
      throw new Error("Enter positive usage, sun-hour, panel-rating, and derate values; derate must not exceed 100%.");
    }
    const dailyUsage = monthlyKwh / 30;
    const derate = deratePercent / 100;
    const scenarioKw = dailyUsage / (sunHours * derate);
    const panelCount = ceilQuantity(scenarioKw * 1000 / panelWatts);
    const roundedKw = panelCount * panelWatts / 1000;
    const modeledDailyEnergy = roundedKw * sunHours * derate;
    return {
      value: panelCount,
      unit: panelCount === 1 ? "panel-equivalent scenario" : "panel-equivalent scenario",
      valueRounded: panelCount,
      breakdown: [
        { label: "30-day average daily use", value: `${formatNumber(round(dailyUsage, 2))} kWh/day` },
        { label: "scenario array nameplate", value: `${formatNumber(round(roundedKw, 2))} kW DC` },
        { label: "whole-panel arithmetic", value: `${panelCount} × ${panelWatts} W` },
        { label: "modeled daily energy under entered assumptions", value: `${formatNumber(round(modeledDailyEnergy, 2))} kWh/day` },
        { label: "roof area, production forecast, and equipment design", value: "not assessed" },
      ],
      formulaSteps: [
        `daily usage = ${monthlyKwh} kWh ÷ 30 days = ${round(dailyUsage, 3)} kWh/day`,
        `scenario array = ${round(dailyUsage, 3)} ÷ (${sunHours} h/day × ${deratePercent}%) = ${round(scenarioKw, 3)} kW DC`,
        `panel-count arithmetic = ceil(${round(scenarioKw, 3)} kW × 1,000 ÷ ${panelWatts} W) = ${panelCount}`,
        `modeled energy = ${round(roundedKw, 3)} kW × ${sunHours} h/day × ${deratePercent}% = ${round(modeledDailyEnergy, 3)} kWh/day`,
        "This is scenario arithmetic, not a location-specific production prediction, bill-offset estimate, roof assessment, or installable system design.",
      ],
    };
  },
  formulaDescription: "scenario panel count = ceil((30-day kWh ÷ 30 ÷ (entered sun-hours × entered derate)) × 1,000 ÷ panel watts)",
  methodology: [
    "Enter usage for a 30-day billing period, a daily peak-sun-hours assumption, the nameplate rating of a panel under consideration, and a combined derate assumption. The result is a mathematical scenario: daily usage divided by assumed daily energy per installed kW, converted to a whole-panel count.",
    "The tool does not establish local solar resource, annual or seasonal generation, shading, roof orientation or condition, usable roof area, electrical compatibility, storage needs, utility compensation, project cost, savings, incentives, permitting, or interconnection. Actual production and system design require a site-specific assessment, current utility terms, exact equipment data, and qualified professionals.",
  ],
  sources: [],
  related: [
    { name: "Solar installation cost guide", slug: "cost-to-install-solar", description: "Review scope and compare current local proposals" },
    { name: "Wire voltage-drop worksheet", slug: "wire-size-calculator", description: "Limited conductor arithmetic; not PV circuit design" },
  ],
  faq: [
    { question: "Does this tell me how many panels my home needs?", answer: "No. It gives a scenario from the assumptions you enter. It does not assess your site, roof, local solar resource, utility rules, or equipment." },
    { question: "Where should I get the usage and equipment values?", answer: "Use your own utility-bill data and exact product documentation. Have a qualified solar professional evaluate the site and production estimate." },
  ],
};
