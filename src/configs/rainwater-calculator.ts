import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const rainwaterCalculatorConfig: CalculatorConfig = {
  slug: "rainwater-calculator",
  title: "Rainfall Runoff Volume Estimator",
  description: "Estimate a rainfall-event runoff volume from a horizontal catchment area, rainfall depth, and user-selected capture factor.",
  categoryLabel: "Landscaping",
  category: "landscaping",
  bannerHeadline: "Estimate rainfall runoff.",
  bannerTags: ["Area × rainfall", "User-selected capture factor", "Not tank sizing"],
  inputs: [
    {
      id: "roofArea", label: "Horizontal catchment area", type: "number", unitImperial: "ft²", unitMetric: "m²",
      defaultImperial: 1200, defaultMetric: 111, min: 0.1, step: 10,
      help: "Use the horizontal projected area that drains to the collection point, not sloped roof surface area.",
    },
    {
      id: "rainfall", label: "Rainfall depth", type: "number", unitImperial: "in", unitMetric: "mm",
      defaultImperial: 1, defaultMetric: 25.4, min: 0.1, step: 1,
    },
    {
      id: "efficiency", label: "Assumed capture factor", type: "select", defaultImperial: 0.85,
      options: [
        { label: "100% theoretical runoff", value: 1 },
        { label: "95%", value: 0.95 }, { label: "85%", value: 0.85 },
        { label: "70%", value: 0.7 }, { label: "50%", value: 0.5 },
      ],
      help: "Choose an assumption for losses; actual capture varies with the roof, gutters, diversion, and system.",
    },
  ],
  calculate: (values, units) => {
    const areaInput = Number(values.roofArea) || 0;
    const rainfallInput = Number(values.rainfall) || 0;
    const factor = Number(values.efficiency) || 0;
    const areaM2 = units === "metric" ? areaInput : areaInput * 0.09290304;
    const rainfallMm = units === "metric" ? rainfallInput : rainfallInput * 25.4;
    const liters = areaM2 * (rainfallMm / 1000) * 1000 * factor;
    const displayed = units === "metric" ? liters : liters / 3.785411784;
    const areaUnit = units === "metric" ? "m²" : "ft²";
    const rainfallUnit = units === "metric" ? "mm" : "in";
    return {
      value: Math.round(displayed),
      unit: units === "metric" ? "L" : "gallons",
      valueRounded: Math.round(displayed),
      breakdown: [
        { label: "horizontal catchment area", value: `${formatNumber(round(areaInput, 2))} ${areaUnit}` },
        { label: "rainfall depth", value: `${formatNumber(round(rainfallInput, 2))} ${rainfallUnit}` },
        { label: "assumed capture factor", value: `${round(factor * 100, 0)}%` },
        { label: "estimated runoff volume", value: `${formatNumber(Math.round(displayed))} ${units === "metric" ? "L" : "gallons"}` },
      ],
      formulaSteps: [
        `runoff volume = horizontal area × rainfall depth × capture factor`,
        `${formatNumber(round(areaM2, 3))} m² × ${formatNumber(round(rainfallMm, 2))} mm × ${round(factor * 100, 0)}% = ${formatNumber(Math.round(liters))} L`,
        "This is an event-volume estimate; it does not model storage, demand, overflow, water quality, or annual yield.",
      ],
    };
  },
  formulaDescription: "estimated runoff (L) = horizontal catchment area (m²) × rainfall depth (mm) × selected capture factor",
  methodology: [
    "The volume calculation multiplies horizontal catchment area by rainfall depth. With square metres and millimetres, the numeric product is litres before applying the user-selected capture factor.",
    "The factor is an assumption, not a site-measured efficiency. Actual yield depends on roof material, wetting and splash losses, gutter layout, debris screens, first-flush diversion, leaks, and overflow.",
    "This tool does not size a tank, predict annual collection, estimate water demand, assess water quality or potability, or determine plumbing/code requirements. Consult local authorities and qualified professionals for system design and use.",
  ],
  sources: [
    { name: "Texas A&M AgriLife Extension: Rainwater Harvesting", url: "https://rainwaterharvesting.tamu.edu/", note: "Educational resource on rainwater harvesting; site-specific system design is outside this estimator." },
    { name: "NOAA National Centers for Environmental Information: U.S. Climate Normals", url: "https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals", note: "Source for location-specific climate normals; this calculator requires rainfall supplied by the user." },
  ],
  related: [
    { name: "Gutter calculator", slug: "gutter-calculator", description: "Estimate gutter dimensions from roof inputs" },
    { name: "Topsoil calculator", slug: "topsoil-calculator", description: "Estimate soil volume from area and selected depth" },
  ],
  faq: [
    { question: "How much runoff can a roof produce in one rainfall event?", answer: "This estimator multiplies horizontal catchment area by rainfall depth and your selected capture factor. Real collected volume can differ because of roof and gutter losses, diversion, leaks, and overflow." },
    { question: "Does this size a rain barrel or tank?", answer: "No. Storage sizing needs rainfall timing, intended demand, overflow strategy, and system constraints that are not inputs to this estimator." },
    { question: "Is collected rainwater safe to drink?", answer: "This calculator does not assess water quality or treatment. Do not assume roof runoff is potable; consult public-health and local plumbing guidance before any indoor or drinking use." },
  ],
};
