import { ChimneyCalculatorExpansion } from "@/content/chimney-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const chimneyCalculatorConfig: CalculatorConfig = {
  ContentExpansion: ChimneyCalculatorExpansion,
  slug: "chimney-calculator",
  title: "Chimney Calculator",
  description:
    "Calculate the geometric area of a rectangular fireplace opening. This tool does not size a flue, chimney, liner, or vent system.",
  categoryLabel: "Masonry",
  category: "concrete",
  bannerHeadline: "Measure the opening.",
  bannerTags: ["Rectangular opening area", "Unit conversion", "Not flue sizing"],
  inputs: [
    {
      id: "openingWidth",
      label: "Opening width",
      type: "number",
      unitImperial: "in",
      unitMetric: "cm",
      defaultImperial: 36,
      defaultMetric: 91.4,
      min: 0,
      step: 0.5,
      help: "Measure the clear width of the rectangular opening.",
    },
    {
      id: "openingHeight",
      label: "Opening height",
      type: "number",
      unitImperial: "in",
      unitMetric: "cm",
      defaultImperial: 30,
      defaultMetric: 76.2,
      min: 0,
      step: 0.5,
      help: "Measure the clear height of the rectangular opening.",
    },
  ],
  calculate: (values, units) => {
    const widthInput = Math.max(0, Number(values.openingWidth) || 0);
    const heightInput = Math.max(0, Number(values.openingHeight) || 0);
    const area = units === "metric"
      ? (widthInput * heightInput) / 10000
      : widthInput * heightInput;
    const unit = units === "metric" ? "m² opening area" : "in² opening area";
    const widthLabel = units === "metric" ? "cm" : "in";
    const areaLabel = units === "metric" ? "m²" : "in²";
    const roundedArea = round(area, units === "metric" ? 3 : 0);

    return {
      value: area,
      unit,
      valueRounded: roundedArea,
      breakdown: [
        { label: "opening width", value: `${formatNumber(widthInput)} ${widthLabel}` },
        { label: "opening height", value: `${formatNumber(heightInput)} ${widthLabel}` },
        { label: "scope", value: "geometric opening area only; no flue or vent sizing" },
      ],
      formulaSteps: [
        `opening area = ${formatNumber(widthInput)} ${widthLabel} × ${formatNumber(heightInput)} ${widthLabel}`,
        units === "metric"
          ? `area = ${formatNumber(widthInput * heightInput)} cm² ÷ 10,000 = ${formatNumber(roundedArea)} ${areaLabel}`
          : `area = ${formatNumber(widthInput * heightInput)} = ${formatNumber(roundedArea)} ${areaLabel}`,
        "This result is not a flue, liner, chimney-height, or vent-system recommendation.",
      ],
      composition: {
        unit: areaLabel,
        total: roundedArea,
        segments: [{ label: "Rectangular opening", amount: roundedArea, shade: "primary" }],
      },
    };
  },
  formulaDescription: "rectangular opening area = clear width × clear height",
  methodology: [
    "This calculator reports only the geometric area of a rectangular fireplace opening. It does not calculate or recommend flue area, flue shape, liner size, appliance compatibility, chimney height, termination clearance, or code compliance.",
    "Flue and vent sizing depend on the appliance or fireplace design, listed components, chimney configuration, applicable instructions, and locally adopted requirements. Have the system evaluated by a qualified chimney or venting professional before installation or modification.",
    "Do not use an area ratio from this page to select a liner or diagnose smoke, draft, fire, or carbon-monoxide problems. For suspected venting problems, stop using the appliance and obtain qualified inspection.",
  ],
  sources: [
    {
      name: "Chimney Safety Institute of America: Homeowner Resources",
      url: "https://www.csia.org/homeowner-resources/",
      note: "Professional chimney inspection and safety information; this calculator does not perform an inspection.",
    },
    {
      name: "NFPA 211: Chimneys, Fireplaces, Vents, and Solid Fuel-Burning Appliances",
      url: "https://www.nfpa.org/codes-and-standards/all-codes-and-standards/list-of-codes-and-standards/detail?code=211",
      note: "Standard reference; consult the locally adopted requirements and qualified professionals for a real installation.",
    },
  ],
  related: [
    { name: "Brick calculator", slug: "brick-calculator", description: "Estimate brick quantities for a separately designed masonry project" },
    { name: "Concrete calculator", slug: "concrete-calculator", description: "Estimate concrete volume from project dimensions" },
  ],
  faq: [
    {
      question: "Does this calculator tell me what chimney flue size I need?",
      answer: "No. It calculates only the rectangular fireplace opening area. It does not size or select a flue, liner, chimney, or vent system.",
    },
    {
      question: "Can I use an opening-area ratio to choose a liner?",
      answer: "No. Do not use this page to select a liner. Sizing depends on the appliance, listed system, configuration, instructions, and locally adopted requirements; get a qualified assessment.",
    },
    {
      question: "What should I do if smoke enters the room or I suspect a venting problem?",
      answer: "This calculator cannot diagnose draft or carbon-monoxide risks. Stop using the appliance and arrange a qualified inspection; follow emergency guidance if anyone may be exposed to carbon monoxide.",
    },
  ],
};
