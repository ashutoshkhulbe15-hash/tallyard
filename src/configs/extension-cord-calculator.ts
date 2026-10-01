import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

const conductorResistanceOhmsPerKft: Record<string, number> = {
  "18": 6.385,
  "16": 4.016,
  "14": 2.525,
  "12": 1.588,
  "10": 0.999,
};

export const extensionCordCalculatorConfig: CalculatorConfig = {
  slug: "extension-cord-calculator",
  title: "Extension Cord Voltage-Drop Estimator",
  description:
    "Estimate resistive voltage drop for a user-selected copper conductor gauge, current, length, and voltage. Does not recommend or certify a cord's safe load.",
  categoryLabel: "Electrical",
  category: "hvac",
  bannerHeadline: "Estimate voltage drop.",
  bannerTags: ["User-selected gauge", "Resistive estimate", "Not a safety rating"],
  inputs: [
    {
      id: "amps",
      label: "Current draw from equipment nameplate",
      type: "number",
      unitImperial: "A",
      defaultImperial: 12,
      min: 0.1,
      max: 100,
      step: 0.5,
      help: "Enter the specified operating current. This tool does not estimate motor starting current or cord ampacity.",
    },
    {
      id: "length",
      label: "One-way cord length",
      type: "select",
      defaultImperial: 50,
      options: [
        { label: "25 ft (7.6 m)", value: 25 },
        { label: "50 ft (15.2 m)", value: 50 },
        { label: "100 ft (30.5 m)", value: 100 },
        { label: "150 ft (45.7 m)", value: 150 },
        { label: "200 ft (61 m)", value: 200 },
      ],
      help: "Use the full one-way route length. The estimate doubles it for the outgoing and return conductors.",
    },
    {
      id: "gauge",
      label: "Conductor size to evaluate",
      type: "select",
      defaultImperial: "12",
      options: [
        { label: "18 AWG", value: "18" },
        { label: "16 AWG", value: "16" },
        { label: "14 AWG", value: "14" },
        { label: "12 AWG", value: "12" },
        { label: "10 AWG", value: "10" },
      ],
    },
    {
      id: "voltage",
      label: "Supply voltage",
      type: "select",
      defaultImperial: 120,
      options: [
        { label: "120 V", value: 120 },
        { label: "240 V", value: 240 },
      ],
    },
    {
      id: "location",
      label: "Use location",
      type: "select",
      defaultImperial: "indoor",
      options: [
        { label: "Indoor, dry", value: "indoor" },
        { label: "Outdoor or damp/wet exposure", value: "outdoor" },
      ],
      help: "Confirm the cord's product marking and suitability for its environment; this calculator does not evaluate jacket ratings.",
    },
  ],
  calculate: (values, units) => {
    const amps = Math.max(0, Number(values.amps) || 0);
    const lengthFt = Number(values.length) || 0;
    const gauge = String(values.gauge || "12");
    const voltage = Number(values.voltage) || 120;
    const location = String(values.location || "indoor");
    const resistance = conductorResistanceOhmsPerKft[gauge] ?? conductorResistanceOhmsPerKft["12"];
    const dropVolts = (2 * amps * resistance * lengthFt) / 1000;
    const dropPercent = voltage > 0 ? (dropVolts / voltage) * 100 : 0;
    const outputLength = units === "metric" ? lengthFt * 0.3048 : lengthFt;
    const lengthUnit = units === "metric" ? "m" : "ft";
    const outputVoltage = Math.max(0, voltage - dropVolts);

    return {
      value: round(dropVolts, 2),
      unit: "estimated voltage drop (V)",
      valueRounded: round(dropVolts, 2),
      breakdown: [
        { label: "evaluated conductor", value: `${gauge} AWG copper reference resistance` },
        { label: "current", value: `${formatNumber(amps)} A` },
        { label: "one-way length", value: `${formatNumber(round(outputLength, 1))} ${lengthUnit}` },
        { label: "supply voltage", value: `${formatNumber(voltage)} V` },
        { label: "estimated resistive drop", value: `${formatNumber(round(dropVolts, 2))} V (${formatNumber(round(dropPercent, 2))}%)` },
        { label: "calculated load-end voltage", value: `${formatNumber(round(outputVoltage, 2))} V (simplified estimate)` },
        { label: "environment", value: location === "outdoor" ? "verify cord's outdoor/environment rating" : "verify cord's product rating" },
      ],
      formulaSteps: [
        `reference conductor resistance = ${resistance} Ω per 1,000 ft for ${gauge} AWG copper`,
        `estimated loop resistance = 2 × ${formatNumber(amps)} A × ${resistance} Ω/kft × ${lengthFt} ft ÷ 1,000 = ${formatNumber(round(dropVolts, 2))} V drop`,
        `percentage drop = ${formatNumber(round(dropVolts, 2))} V ÷ ${formatNumber(voltage)} V × 100 = ${formatNumber(round(dropPercent, 2))}%`,
        "This does not verify cord ampacity, listing, temperature rating, plug/receptacle, grounding, or safe use.",
      ],
    };
  },
  formulaDescription:
    "approximate resistive drop = 2 × current × reference conductor resistance × one-way length",
  methodology: [
    "The estimate uses a reference DC resistance for copper conductor sizes and doubles the one-way cord length to represent outgoing and return conductors. Actual voltage drop depends on the cord's listed construction, conductor temperature, load characteristics, connections, and supply conditions.",
    "This tool does not recommend a gauge or determine a cord's current rating. Cord suitability also depends on product listing, insulation and temperature ratings, number of conductors, grounding, plug/receptacle, environment, duty cycle, and equipment instructions. Check the exact cord marking and manufacturer's documentation; consult a qualified electrician where needed.",
    "Do not use this estimate to justify a cord, adapter, damaged cord, permanent wiring, or a load beyond the product's marked ratings. Workplace use may have additional requirements.",
  ],
  sources: [
    {
      name: "OSHA 29 CFR 1926.405: Wiring Methods, Components, and Equipment for General Use",
      url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.405",
      note: "Workplace requirements for flexible cords and temporary wiring; the calculator does not determine compliance.",
    },
    {
      name: "UL 817: Cord Sets and Power-Supply Cords",
      url: "https://www.shopulstandards.com/ProductDetail.aspx?productId=UL817",
      note: "Product safety standard reference; verify the cord's listing and markings.",
    },
    {
      name: "Electrical Safety Foundation International: Extension Cord Safety",
      url: "https://www.esfi.org/extension-cord-safety-tips/",
      note: "Consumer safety guidance for selecting and using extension cords.",
    },
  ],
  related: [
    { name: "Wire size calculator", slug: "wire-size-calculator", description: "Preliminary permanent-circuit conductor estimate; not cord selection" },
    { name: "BTU calculator", slug: "btu-calculator", description: "Estimate room air-conditioner capacity from its area guide" },
  ],
  faq: [
    {
      question: "Does this tell me which extension cord to buy?",
      answer: "No. Select a conductor size to see a simplified voltage-drop estimate only. Check the cord's marked current and environmental ratings, listing, plug configuration, and equipment instructions before use.",
    },
    {
      question: "Does a low voltage-drop result mean the cord is safe?",
      answer: "No. It does not check ampacity, temperature rise, construction, grounding, damage, connections, environment, or duty cycle. A low calculated drop is not a safety approval.",
    },
    {
      question: "Why does length affect voltage drop?",
      answer: "The simplified estimate accounts for current traveling out and back through the cord conductors. Longer conductor length increases estimated resistive drop; actual performance depends on the specific cord and operating conditions.",
    },
    {
      question: "Can I use this for permanent wiring or a generator installation?",
      answer: "No. This is not a wiring design or generator connection guide. Follow the equipment manufacturer's instructions and applicable electrical requirements; use a qualified electrician for installations.",
    },
  ],
};
