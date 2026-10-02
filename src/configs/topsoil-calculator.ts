import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber, ceilQuantity } from "@/lib/format";

export const topsoilCalculatorConfig: CalculatorConfig = {
  slug: "topsoil-calculator",
  title: "Soil Volume Calculator",
  description:
    "Estimate soil volume from a rectangular area and user-selected depth, with an optional package-count estimate for a selected bag size.",
  categoryLabel: "Landscaping",
  category: "landscaping",
  bannerHeadline: "Estimate soil volume.",
  bannerTags: ["Rectangular area", "User-selected depth", "Optional bag estimate"],
  inputs: [
    {
      id: "length",
      label: "Area length",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 20,
      defaultMetric: 6,
      min: 0.1,
      step: 0.5,
    },
    {
      id: "width",
      label: "Area width",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 10,
      defaultMetric: 3,
      min: 0.1,
      step: 0.5,
    },
    {
      id: "depth",
      label: "Selected depth",
      type: "select",
      defaultImperial: 6,
      defaultMetric: 6,
      options: [
        { label: '2 in (5.08 cm)', value: 2 },
        { label: '4 in (10.16 cm)', value: 4 },
        { label: '6 in (15.24 cm)', value: 6 },
        { label: '8 in (20.32 cm)', value: 8 },
        { label: '12 in (30.48 cm)', value: 12 },
      ],
      help: "Values are fixed inch-based presets shown in both unit modes; depth is an input, not a recommendation.",
    },
    {
      id: "bagSize",
      label: "Bag volume for package estimate",
      type: "select",
      defaultImperial: 0.75,
      defaultMetric: 0.75,
      options: [
        { label: "0.5 ft³ bag", value: 0.5 },
        { label: "0.75 ft³ bag", value: 0.75 },
        { label: "1 ft³ bag", value: 1 },
      ],
      help: "Select a listed example size, then confirm the actual bag volume on the product label.",
    },
  ],
  calculate: (values, units) => {
    const length = Math.max(0, Number(values.length) || 0);
    const width = Math.max(0, Number(values.width) || 0);
    const depthIn = Number(values.depth) || 6;
    const bagSizeFt3 = Number(values.bagSize) || 0.75;
    const metric = units === "metric";
    const area = length * width;
    const depth = metric ? depthIn * 0.0254 : depthIn / 12;
    const cubicFeet = metric ? (area / 0.09290304) * (depthIn / 12) : area * depth;
    const volume = metric ? cubicFeet * 0.028316846592 : cubicFeet / 27;
    const areaUnit = metric ? "m²" : "ft²";
    const volumeUnit = metric ? "m³" : "yd³";
    const depthDisplay = metric ? depthIn * 2.54 : depthIn;
    const depthUnit = metric ? "cm" : "in";
    const bagSize = metric ? bagSizeFt3 * 0.028316846592 : bagSizeFt3;
    const bags = ceilQuantity(volume / bagSize);
    const roundedVolume = round(volume, metric ? 3 : 2);

    return {
      value: volume,
      unit: metric ? "cubic meters" : "cubic yards",
      valueRounded: roundUp(volume, metric ? 3 : 2),
      breakdown: [
        { label: "rectangular area", value: `${formatNumber(round(area, 2))} ${areaUnit}` },
        { label: "selected depth", value: `${formatNumber(depthDisplay)} ${depthUnit}` },
        { label: "estimated volume", value: `${formatNumber(roundedVolume)} ${volumeUnit}` },
        { label: `bags at ${formatNumber(bagSizeFt3)} ft³ each`, value: `${bags} (package estimate; check label)` },
      ],
      formulaSteps: [
        `area = ${formatNumber(length)} × ${formatNumber(width)} = ${formatNumber(round(area, 2))} ${areaUnit}`,
        `depth = ${formatNumber(depthDisplay)} ${depthUnit} = ${formatNumber(round(depth, metric ? 4 : 3))} ${metric ? "m" : "ft"}`,
        metric
          ? `volume = ${formatNumber(round(area, 2))} × ${formatNumber(round(depth, 4))} = ${formatNumber(roundedVolume)} m³`
          : `volume = ${formatNumber(round(cubicFeet, 2))} ft³ ÷ 27 = ${formatNumber(roundedVolume)} yd³`,
        `bag equivalent = ceil(${formatNumber(roundedVolume)} ${volumeUnit} ÷ ${formatNumber(round(bagSize, 5))} ${volumeUnit} per bag) = ${bags}`,
        "No soil weight or delivery quantity adjustment is estimated.",
      ],
    };
  },
  formulaDescription: "volume = rectangular area × user-selected depth; bag estimate = volume ÷ labeled package volume",
  methodology: [
    "The calculator multiplies a rectangular area by the selected depth and converts the volume to cubic yards or cubic metres. For irregular areas or varying depths, measure separate rectangles and add their volumes outside this simple calculator.",
    "The package estimate assumes the selected nominal bag volume is accurate. Actual products, settling, moisture, loose fill, grade changes, and supplier delivery quantities may differ; verify the product label and confirm bulk orders with the supplier.",
    "This tool does not recommend soil depth, evaluate soil quality, estimate mass, or advise on fill, drainage, planting, or structural use. Follow project-specific horticultural or geotechnical guidance as applicable.",
  ],
  sources: [
    {
      name: "USDA NRCS: Soils",
      url: "https://www.nrcs.usda.gov/conservation-basics/natural-resource-concerns/soils",
      note: "Background on soil properties; no generic soil density is assumed by this calculator.",
    },
    {
      name: "Penn State Extension: Soil Testing",
      url: "https://extension.psu.edu/soil-testing",
      note: "Soil quality, testing, and management guidance.",
    },
  ],
  related: [
    { name: "Mulch calculator", slug: "mulch-calculator", description: "Estimate mulch volume or bags from area and depth" },
    { name: "Gravel calculator", slug: "gravel-calculator", description: "Estimate aggregate volume and approximate weight" },
    { name: "Sod calculator", slug: "sod-calculator", description: "Estimate sod area and piece quantity" },
  ],
  faq: [
    {
      question: "How is soil volume estimated?",
      answer: "The tool multiplies the entered rectangular area by the selected depth. Split irregular areas or areas with different depths into separate rectangles and add their volumes.",
    },
    {
      question: "How many bags should I buy?",
      answer: "The optional estimate divides volume by the selected bag size. Bag fill and labeled volumes differ by product, so check the actual package before buying.",
    },
    {
      question: "Does this estimate weight or tell me what kind of soil to use?",
      answer: "No. Soil weight varies with composition and moisture, and the right material and depth depend on the project. Ask the supplier or a qualified soil/landscape professional.",
    },
  ],
};
