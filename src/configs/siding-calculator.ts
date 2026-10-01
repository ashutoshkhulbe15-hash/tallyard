import type { CalculatorConfig } from "@/lib/types";
import { formatNumber, round } from "@/lib/format";

export const sidingCalculatorConfig: CalculatorConfig = {
  slug: "siding-calculator",
  title: "Siding Area Worksheet",
  description: "Estimate cladding area from user-measured net wall surfaces and a chosen planning allowance. Does not estimate siding packages, trim, cost, or installation requirements.",
  categoryLabel: "Roofing",
  category: "roofing",
  bannerHeadline: "Measure the wall area.",
  bannerTags: ["Net measured area", "Allowance is user-selected", "No product takeoff"],
  inputs: [
    { id: "area", label: "Net wall area to cover", type: "number", unitImperial: "ft²", unitMetric: "m²", defaultImperial: 1800, defaultMetric: 167.2, min: 0.01, step: 1, help: "Enter your measured net area, including your own treatment of gables and openings." },
    { id: "allowance", label: "User-selected planning allowance", type: "select", defaultImperial: "0", options: [
      { label: "0%", value: "0" }, { label: "5%", value: "5" }, { label: "10%", value: "10" }, { label: "15%", value: "15" },
    ] },
  ],
  calculate: (values, units) => {
    const area = Number(values.area);
    const allowance = Number(values.allowance);
    if (!Number.isFinite(area) || area <= 0 || !Number.isFinite(allowance) || ![0, 5, 10, 15].includes(allowance)) {
      throw new Error("Enter a positive measured wall area and select a listed allowance.");
    }
    const totalArea = area * (1 + allowance / 100);
    const areaUnit = units === "metric" ? "m²" : "ft²";
    const squares = units === "metric" ? totalArea / 9.290304 : totalArea / 100;
    return {
      value: round(totalArea, 2),
      unit: areaUnit,
      valueRounded: round(totalArea, 1),
      breakdown: [
        { label: "entered net wall area", value: `${formatNumber(round(area, 2))} ${areaUnit}` },
        { label: "selected allowance", value: `${allowance}%` },
        { label: "area with allowance", value: `${formatNumber(round(totalArea, 2))} ${areaUnit}` },
        { label: "area in 100 ft² siding-square equivalents", value: `${formatNumber(round(squares, 2))}` },
        { label: "product quantity, trim, and cost", value: "not calculated" },
      ],
      formulaSteps: [
        `area with allowance = ${formatNumber(round(area, 2))} ${areaUnit} × (1 + ${allowance}%) = ${formatNumber(round(totalArea, 2))} ${areaUnit}`,
        `100 ft² siding-square equivalents = ${formatNumber(round(totalArea, 2))} ${areaUnit} ÷ ${units === "metric" ? "9.290304 m²" : "100 ft²"} = ${round(squares, 3)}`,
        "This does not convert area into package counts or account for exposure, laps, trim, flashing, substrate, waste characteristics, or installation requirements.",
      ],
    };
  },
  formulaDescription: "area with allowance = entered net wall area × (1 + user-selected allowance)",
  methodology: [
    "Measure the net wall surface area to be covered, including a project-specific treatment of gables and openings. Apply only the planning allowance you select. A siding square is shown as an area conversion equivalent to 100 square feet (9.290304 square metres).",
    "The worksheet does not determine how to measure or deduct openings, calculate geometry, convert to cartons or pieces, estimate trim or fasteners, assess existing cladding, specify water-resistive barriers or flashing, estimate costs, or determine code compliance. Use exact manufacturer coverage and installation documents plus project-specific measurements for purchasing and work.",
  ],
  sources: [],
  related: [
    { name: "Roof area estimator", slug: "roofing-calculator", description: "Planar roof area from simple entered geometry" },
    { name: "Insulation package estimator", slug: "insulation-calculator", description: "Package count from exact label coverage" },
    { name: "Window rectangle area", slug: "window-sizing-calculator", description: "Geometric area from entered dimensions" },
  ],
  faq: [
    { question: "Does this tell me how many cartons to buy?", answer: "No. Product exposure, laps, layout, cut plans, and the manufacturer's coverage determine product quantity. Use the exact product documentation." },
    { question: "What is a siding square?", answer: "This page uses a square only as an area equivalent of 100 square feet. It does not mean every product package covers one square." },
  ],
};
