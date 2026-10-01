import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

const roomCoolingGuide = [
  { min: 100, max: 150, btu: 5000 },
  { min: 150, max: 250, btu: 6000 },
  { min: 250, max: 300, btu: 7000 },
  { min: 300, max: 350, btu: 8000 },
  { min: 350, max: 400, btu: 9000 },
  { min: 400, max: 450, btu: 10000 },
  { min: 450, max: 550, btu: 12000 },
  { min: 550, max: 700, btu: 14000 },
  { min: 700, max: 1000, btu: 18000 },
  { min: 1000, max: 1200, btu: 21000 },
  { min: 1200, max: 1400, btu: 23000 },
  { min: 1400, max: 1500, btu: 24000 },
  { min: 1500, max: 2000, btu: 30000 },
  { min: 2000, max: 2500, btu: 34000 },
];

export const btuCalculatorConfig: CalculatorConfig = {
  slug: "btu-calculator",
  title: "Room Air Conditioner Capacity Guide",
  description:
    "Estimate room air-conditioner capacity from room area using the ENERGY STAR sizing guide and its stated adjustments. Not a whole-home HVAC load calculation.",
  categoryLabel: "HVAC",
  category: "hvac",
  bannerHeadline: "Estimate room capacity.",
  bannerTags: ["Room air conditioners", "Area-based guide", "Not whole-home sizing"],
  inputs: [
    {
      id: "length",
      label: "Room length",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 14,
      defaultMetric: 4.3,
      min: 0.1,
      step: 0.5,
    },
    {
      id: "width",
      label: "Room width",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 12,
      defaultMetric: 3.7,
      min: 0.1,
      step: 0.5,
    },
    {
      id: "sun",
      label: "Sun exposure",
      type: "select",
      defaultImperial: "average",
      options: [
        { label: "Average", value: "average" },
        { label: "Heavily shaded", value: "shaded" },
        { label: "Very sunny", value: "sunny" },
      ],
    },
    {
      id: "occupancy",
      label: "Regular occupants",
      type: "number",
      defaultImperial: 2,
      min: 0,
      step: 1,
      help: "The guide adds capacity for each person above two.",
    },
    {
      id: "kitchen",
      label: "Is the room a kitchen?",
      type: "select",
      defaultImperial: "no",
      options: [
        { label: "No", value: "no" },
        { label: "Yes", value: "yes" },
      ],
    },
  ],
  calculate: (values, units) => {
    const length = Math.max(0, Number(values.length) || 0);
    const width = Math.max(0, Number(values.width) || 0);
    const area = units === "metric" ? length * width * 10.7639104167 : length * width;
    const sun = String(values.sun || "average");
    const occupants = Math.max(0, Number(values.occupancy) || 0);
    const kitchen = String(values.kitchen || "no") === "yes";
    const guide = roomCoolingGuide.find((band, index) =>
      area >= band.min && (index === roomCoolingGuide.length - 1 ? area <= band.max : area < band.max)
    );
    const outsideRange = !guide;
    const baseBtu = guide?.btu ?? 0;
    const sunMultiplier = sun === "shaded" ? 0.9 : sun === "sunny" ? 1.1 : 1;
    const afterSun = baseBtu * sunMultiplier;
    const occupantAdjustment = Math.max(0, occupants - 2) * 600;
    const kitchenAdjustment = kitchen ? 4000 : 0;
    const capacity = afterSun + occupantAdjustment + kitchenAdjustment;
    const areaLabel = units === "metric" ? "m²" : "ft²";
    const displayArea = units === "metric" ? area / 10.7639104167 : area;
    const sunLabel = sun === "shaded" ? "heavily shaded (−10%)" : sun === "sunny" ? "very sunny (+10%)" : "average (no adjustment)";

    return {
      value: outsideRange ? 0 : capacity,
      unit: outsideRange ? "guide range is 100–2,500 ft²" : "BTU/hr guide estimate",
      valueRounded: outsideRange ? 0 : Math.round(capacity),
      ...(outsideRange ? { displayValue: "Outside guide" } : {}),
      breakdown: [
        { label: "room area", value: `${formatNumber(round(displayArea, 1))} ${areaLabel}` },
        { label: "ENERGY STAR chart baseline", value: outsideRange ? "no estimate outside chart area" : `${formatNumber(baseBtu)} BTU/hr` },
        { label: "sun adjustment", value: sunLabel },
        { label: "occupancy adjustment", value: `${occupantAdjustment >= 0 ? "+" : ""}${formatNumber(occupantAdjustment)} BTU/hr (above two people)` },
        ...(kitchen ? [{ label: "kitchen adjustment", value: "+4,000 BTU/hr" }] : []),
        { label: "scope", value: "room AC guide only; not central AC, heat pump, or whole-home sizing" },
      ],
      formulaSteps: outsideRange
        ? [
            `room area = ${formatNumber(round(displayArea, 1))} ${areaLabel} (${formatNumber(round(area, 0))} ft²)`,
            "The referenced room-air-conditioner chart covers 100–2,500 ft²; no capacity estimate is provided outside that range.",
          ]
        : [
            `room area = ${formatNumber(round(displayArea, 1))} ${areaLabel} (${formatNumber(round(area, 0))} ft²)`,
            `chart capacity for ${guide.min}–${guide.max} ft² = ${formatNumber(baseBtu)} BTU/hr`,
            `sun adjustment (${sunLabel}) = ${formatNumber(afterSun)} BTU/hr`,
            `occupancy adjustment = max(0, ${occupants} − 2) × 600 = ${formatNumber(occupantAdjustment)} BTU/hr`,
            `kitchen adjustment = ${formatNumber(kitchenAdjustment)} BTU/hr`,
            `guide estimate = ${formatNumber(round(capacity))} BTU/hr`,
          ],
    };
  },
  formulaDescription:
    "ENERGY STAR room-AC area band, adjusted for sun, occupants above two, and kitchen use",
  methodology: [
    "The base capacity comes from the current ENERGY STAR room-air-conditioner area chart, which is based on an 8-foot ceiling. This is a shopping guide for room air conditioners, not a calculated heat load.",
    "The guide specifies a 10% reduction for heavily shaded rooms, a 10% increase for very sunny rooms, 600 BTU/hr for each regular occupant above two, and 4,000 BTU/hr for a kitchen. These adjustments are applied to the area-chart baseline.",
    "This estimate is not applicable to central air conditioners, heat pumps, ducted systems, multi-zone systems, or whole-home equipment selection. Higher ceilings and unusual room conditions need additional judgment. For central residential system sizing, use a qualified professional's Manual J load calculation and equipment selection process.",
  ],
  sources: [
    {
      name: "ENERGY STAR: Room Air Conditioners",
      url: "https://www.energystar.gov/products/room_air_conditioners",
      note: "Room-area capacity chart and adjustments for shade, sun, occupants, and kitchens.",
    },
    {
      name: "ACCA Manual J: Residential Load Calculation",
      url: "https://www.acca.org/standards/technical-manuals/manual-j",
      note: "Industry standard for residential heating and cooling load calculations; not implemented by this tool.",
    },
  ],
  related: [
    { name: "Heat pump calculator", slug: "heat-pump-calculator", description: "See heat-pump cost and performance assumptions" },
    { name: "Insulation calculator", slug: "insulation-calculator", description: "Estimate insulation area and R-value" },
  ],
  faq: [
    {
      question: "Is this the right size for a central AC or heat pump?",
      answer: "No. This uses the ENERGY STAR room-air-conditioner area chart. It is not a Manual J load calculation and should not be used to select central equipment or heat pumps.",
    },
    {
      question: "Why does the calculator use room area?",
      answer: "ENERGY STAR publishes a room-air-conditioner capacity chart based on area for rooms with 8-foot ceilings, with additional guidance for sun exposure, occupants, and kitchens. Unusual conditions may change the needed capacity.",
    },
    {
      question: "What if my room is outside 100–2,500 square feet?",
      answer: "The referenced chart does not provide a value outside that area range, so this calculator does not extrapolate one.",
    },
    {
      question: "Does this account for ceiling height, insulation, windows, or climate?",
      answer: "No. The base chart assumes an 8-foot ceiling and does not calculate building-envelope or climate loads. Seek product-specific guidance or a qualified HVAC load calculation when conditions differ.",
    },
  ],
};
