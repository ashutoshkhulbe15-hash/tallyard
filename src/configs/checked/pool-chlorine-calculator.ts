import { PoolChlorineCalculatorExpansion } from "@/content/pool-chlorine-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const poolChlorineCalculatorConfig: CalculatorConfig = {
  ContentExpansion: PoolChlorineCalculatorExpansion,
  slug: "pool-chlorine-calculator",
  title: "Pool Chlorine Calculator",
  description: "Estimate available-chlorine mass from a measured ppm gap, then estimate product mass only when the label gives available chlorine by weight. Not a dosing recommendation.",
  categoryLabel: "Landscaping",
  category: "landscaping",
  bannerHeadline: "Estimate chlorine mass.",
  bannerTags: ["Use measured water values", "Enter label strength", "Not a dosing recommendation"],
  inputs: [
    {
      id: "volume", label: "Pool volume", type: "number", unitImperial: "gal", unitMetric: "L",
      defaultImperial: 15000, defaultMetric: 56800, min: 1, step: 500,
      help: "Enter documented or carefully measured volume; this tool does not calculate volume from pool dimensions.",
    },
    {
      id: "currentPpm", label: "Measured current free chlorine", type: "number", unitImperial: "ppm",
      defaultImperial: 0, min: 0, max: 10, step: 0.1,
      help: "Use a reliable test result. A test can read falsely low if chlorine is above its measurement range.",
    },
    {
      id: "targetPpm", label: "User-selected target free chlorine", type: "number", unitImperial: "ppm",
      defaultImperial: "", min: 0.1, max: 10, step: 0.1,
      help: "Enter a target determined from applicable health guidance and product instructions; this calculator does not recommend a target.",
    },
    {
      id: "availableChlorinePct", label: "Label available chlorine by product weight", type: "number", unitImperial: "%",
      defaultImperial: "", min: 0.1, max: 100, step: 0.1,
      help: "Enter the available-chlorine percentage by weight from the exact product label. Do not substitute sodium-hypochlorite percentage unless the label identifies it as available chlorine by weight.",
    },
  ],
  calculate: (values, units) => {
    const volumeInput = Number(values.volume);
    const currentPpm = Number(values.currentPpm);
    const targetPpm = Number(values.targetPpm);
    const availableChlorinePct = Number(values.availableChlorinePct);
    if (![volumeInput, currentPpm, targetPpm, availableChlorinePct].every(Number.isFinite) ||
        volumeInput <= 0 || currentPpm < 0 || currentPpm > 10 || targetPpm <= 0 || targetPpm > 10 ||
        availableChlorinePct <= 0 || availableChlorinePct > 100) {
      throw new Error("Enter a positive water volume, test results and user-selected target from 0–10 ppm, and the exact label's available-chlorine percentage by product weight (0–100%).");
    }
    const volumeLiters = units === "metric" ? volumeInput : volumeInput * 3.785411784;
    const volumeGallons = units === "metric" ? volumeInput / 3.785411784 : volumeInput;
    const ppmGap = Math.max(0, targetPpm - currentPpm);
    const availableChlorineGrams = (volumeLiters * ppmGap) / 1000;
    const productGrams = availableChlorineGrams / (availableChlorinePct / 100);
    const productMass = productGrams >= 1000 ? productGrams / 1000 : productGrams;
    const productMassUnit = productGrams >= 1000 ? "kg" : "g";
    return {
      value: round(productMass, 2),
      unit: productMassUnit,
      valueRounded: round(productMass, 1),
      breakdown: [
        { label: "water volume", value: `${formatNumber(round(volumeGallons, 0))} US gal` },
        { label: "ppm gap", value: `${formatNumber(round(ppmGap, 2))} ppm` },
        { label: "available chlorine required by arithmetic", value: `${formatNumber(round(availableChlorineGrams, 2))} g` },
        { label: "entered label fraction", value: `${round(availableChlorinePct, 2)}% by product weight` },
        { label: "estimated product mass", value: `${formatNumber(round(productMass, 2))} ${productMassUnit}` },
        { label: "important", value: "Not a use-rate or application instruction; exact product label controls" },
      ],
      formulaSteps: [
        `ppm gap = max(0, ${currentPpm} ppm measured to ${targetPpm} ppm entered target) = ${round(ppmGap, 2)} ppm`,
        `available chlorine mass = ${formatNumber(round(volumeLiters, 2))} L × ${round(ppmGap, 2)} mg/L ÷ 1000 = ${round(availableChlorineGrams, 2)} g`,
        `theoretical product mass = ${round(availableChlorineGrams, 2)} g ÷ (${round(availableChlorinePct, 2)} ÷ 100) = ${round(productGrams, 2)} g`,
        "The result is arithmetic only. Product labels may prescribe different methods, rates, limits, or conditions.",
      ],
    };
  },
  formulaDescription: "available chlorine (g) = water volume (L) × user-entered ppm gap ÷ 1000; theoretical product mass = available chlorine mass ÷ label fraction by weight",
  methodology: [
    "One part per million in water is one milligram per liter. The estimator multiplies water volume by the gap between the measured current free-chlorine value and the target entered by the user. It then divides the theoretical available-chlorine mass by the label percentage entered as a mass fraction.",
    "The calculation does not select a target, identify a product, convert liquid-product mass to volume, or account for pH, cyanuric acid, temperature, sunlight, bather load, product age, demand, circulation, or test-kit limits. Only use a label value explicitly stated as available chlorine by weight; if your label gives another concentration convention, this estimate is not applicable.",
    "This is a math estimate, not a product use rate or application instruction. Read and follow the exact product label, including handling, application, waiting, and re-entry instructions. Never mix pool chemicals. Retest water using the test manufacturer's directions; consult local public-health guidance or a qualified pool professional when unsure.",
  ],
  sources: [
    { name: "CDC: Home Pool and Hot Tub Water Treatment and Testing", url: "https://www.cdc.gov/healthy-swimming/about/home-pool-and-hot-tub-water-treatment-and-testing.html", note: "Residential guidance discusses free chlorine, pH, stabilizer context, and testing limitations; this calculator does not set a target." },
    { name: "CDC: Pool Chemical Safety", url: "https://www.cdc.gov/healthy-swimming/toolkit/pool-chemical-safety.html", note: "Pool chemical handling and storage safety information." },
    { name: "U.S. EPA: Pesticide Product Labels", url: "https://www.epa.gov/pesticide-labels", note: "Use pesticide products according to their specific labels; this estimator is not a substitute for label directions." },
  ],
  related: [],
  faq: [
    { question: "Does this tell me how much chemical to add?", answer: "No. It computes theoretical product mass from the values entered, but is not a product use rate or application instruction. Follow the exact product label and applicable guidance." },
    { question: "How do I choose the target chlorine level?", answer: "This calculator does not choose one. Target levels depend on pool conditions, stabilizer use, local health guidance, and product instructions. Consult current public-health guidance or a qualified pool professional." },
    { question: "Can I use this for liquid chlorine?", answer: "Only if the label gives available chlorine as a percentage by product weight. The result is product mass, not liquid volume; do not convert it using an assumed density. If the label uses a different concentration convention, use the label's instructions instead." },
    { question: "Why doesn't the result include tablets or shock advice?", answer: "Products and labels differ in concentration, application method, and use conditions. The estimator does not select products, diagnose water conditions, or provide shock-treatment advice." },
  ],
};
