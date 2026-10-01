import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

const roofPitches: Record<string, number> = {
  "0/12": 0,
  "3/12": 3,
  "4/12": 4,
  "6/12": 6,
  "8/12": 8,
  "10/12": 10,
  "12/12": 12,
};

export const roofingCalculatorConfig: CalculatorConfig = {
  slug: "roofing-calculator",
  title: "Roof Surface Area Calculator",
  description:
    "Estimate sloped surface area for a simple rectangular roof plane from its horizontal footprint and pitch. Does not calculate a roof material order.",
  categoryLabel: "Roofing",
  category: "roofing",
  bannerHeadline: "Estimate roof area.",
  bannerTags: ["Rectangular footprint", "Pitch adjusted", "Area only"],
  inputs: [
    {
      id: "length",
      label: "Footprint length",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 40,
      defaultMetric: 12,
      min: 0.1,
      step: 1,
      help: "Use the horizontal footprint dimension; account for overhangs if the area estimate should include them.",
    },
    {
      id: "width",
      label: "Footprint width",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 30,
      defaultMetric: 9,
      min: 0.1,
      step: 1,
    },
    {
      id: "pitch",
      label: "Roof pitch (rise / 12 inches run)",
      type: "select",
      defaultImperial: "6/12",
      options: Object.keys(roofPitches).map((pitch) => ({
        label: pitch === "0/12" ? "0/12 (flat geometry)" : pitch,
        value: pitch,
      })),
    },
  ],
  calculate: (values, units) => {
    const length = Math.max(0, Number(values.length) || 0);
    const width = Math.max(0, Number(values.width) || 0);
    const pitch = String(values.pitch || "6/12");
    const rise = roofPitches[pitch] ?? 6;
    const slopeFactor = Math.sqrt(1 + (rise / 12) ** 2);
    const footprintArea = length * width;
    const roofArea = footprintArea * slopeFactor;
    const areaUnit = units === "metric" ? "m²" : "ft²";
    const precision = units === "metric" ? 2 : 1;
    const roundedArea = round(roofArea, precision);

    return {
      value: roofArea,
      unit: `${areaUnit} estimated surface area`,
      valueRounded: roundUp(roofArea, precision),
      breakdown: [
        { label: "horizontal footprint", value: `${formatNumber(round(footprintArea, precision))} ${areaUnit}` },
        { label: "pitch", value: pitch },
        { label: "estimated sloped surface", value: `${formatNumber(roundedArea)} ${areaUnit}` },
        { label: "scope", value: "simple planar geometry; no material takeoff" },
      ],
      formulaSteps: [
        `footprint area = ${formatNumber(length)} × ${formatNumber(width)} = ${formatNumber(round(footprintArea, precision))} ${areaUnit}`,
        `slope factor = √(1 + (${rise}/12)²) = ${formatNumber(round(slopeFactor, 4))}`,
        `estimated surface area = footprint area × slope factor = ${formatNumber(roundedArea)} ${areaUnit}`,
        "No allowance is added for waste, ridges, hips, valleys, penetrations, or product coverage.",
      ],
      composition: {
        unit: areaUnit,
        total: roundedArea,
        segments: [{ label: "Estimated planar roof area", amount: roundedArea, shade: "primary" }],
      },
    };
  },
  formulaDescription: "planar roof surface area = horizontal footprint area × √(1 + (pitch rise ÷ 12)²)",
  methodology: [
    "This geometric estimate multiplies a rectangular horizontal footprint by the slope factor for one constant pitch. It assumes a simple planar roof shape with uniform pitch; it does not infer the number or geometry of roof planes.",
    "The result is area only. It does not include waste, bundles, squares, ridge caps, starter strips, underlayment, flashing, fasteners, or ordering quantities. Roof coverings have product-specific coverage and installation limits; use current manufacturer documentation and a measured roof takeoff for purchasing.",
    "Do not climb onto a roof to measure it. Complex roofs, overhangs, dormers, hips, valleys, penetrations, multiple pitches, and low-slope assemblies require separate measurements and qualified assessment. This is not a structural, code, or material-suitability check.",
  ],
  sources: [
    {
      name: "National Roofing Contractors Association: Technical Resources",
      url: "https://www.nrca.net/technical",
      note: "Professional roofing information; no product coverage rates are assumed by this calculator.",
    },
    {
      name: "Asphalt Roofing Manufacturers Association: Technical Resources",
      url: "https://www.asphaltroofing.org/technical/",
      note: "Consult product-specific application guidance for material coverage and installation requirements.",
    },
  ],
  related: [
    { name: "Snow load calculator", slug: "snow-load-calculator", description: "Estimate uniform snow/ice weight only; not roof capacity" },
    { name: "Gutter calculator", slug: "gutter-calculator", description: "Estimate linear gutter length from dimensions" },
    { name: "Chimney opening-area calculator", slug: "chimney-calculator", description: "Measure fireplace opening area only—not chimney sizing" },
  ],
  faq: [
    {
      question: "Does this estimate the number of shingle bundles?",
      answer: "No. It estimates geometric roof surface area only. Bundle coverage, starter products, ridge products, and waste vary by product and roof layout; use the manufacturer's current coverage details and a measured takeoff.",
    },
    {
      question: "Can I use a house footprint as the roof area?",
      answer: "The calculator adjusts a rectangular horizontal footprint by a single pitch. Actual roof planes, overhangs, dormers, hips, valleys, and penetrations can change the measured area; complex roofs require a plane-by-plane takeoff.",
    },
    {
      question: "Does a 0/12 result mean a roof covering is suitable?",
      answer: "No. Zero pitch is included only as a geometric case. Material suitability, drainage, membrane details, and code requirements depend on the specific assembly and local rules.",
    },
  ],
};
