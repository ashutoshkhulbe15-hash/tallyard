import { MortarCalculatorExpansion } from "@/content/mortar-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const mortarCalculatorConfig: CalculatorConfig = {
  slug: "mortar-calculator",
  title: "Mortar Calculator",
  description:
    "Bags of mortar mix for brick, block, and stone walls. Accounts for joint width, brick size, and mortar type so you order the right amount.",
  categoryLabel: "Masonry",
  category: "concrete",

  bannerHeadline: "Mix right.",
  bannerTags: ["Bags by wall area", "Joint width math", "Type S / N / M"],

  ContentExpansion: MortarCalculatorExpansion,

  inputs: [
    {
      id: "length",
      label: "Wall length",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 20,
      defaultMetric: 6,
      min: 1,
      step: 0.5,
    },
    {
      id: "height",
      label: "Wall height",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 4,
      defaultMetric: 1.2,
      min: 1,
      step: 0.5,
    },
    {
      id: "brickSize",
      label: "Brick size",
      type: "select",
      defaultImperial: "standard",
      options: [
        { label: "Standard (3.5 × 2.25 × 8\")", value: "standard" },
        { label: "Modular (3.5 × 2.25 × 7.5\")", value: "modular" },
        { label: "King (3 × 2.75 × 9.75\")", value: "king" },
        { label: "Concrete block (8 × 8 × 16\")", value: "block" },
      ],
    },
    {
      id: "jointWidth",
      label: "Mortar joint width",
      type: "select",
      defaultImperial: "0.375",
      options: [
        { label: '3/8" (standard)', value: "0.375" },
        { label: '1/2" (wide)', value: "0.5" },
        { label: '3/4" (stone / rustic)', value: "0.75" },
      ],
    },
    {
      id: "mortarType",
      label: "Mortar type",
      type: "select",
      defaultImperial: "S",
      options: [
        { label: "Type S (exterior, structural)", value: "S" },
        { label: "Type N (interior, above-grade)", value: "N" },
        { label: "Type M (below-grade, foundation)", value: "M" },
      ],
    },
  ],

  faq: [
    {
      question: "How many bags of mortar do I need per 1,000 bricks?",
      answer:
        "With standard 3/8-inch joints, about 7 bags of 80-lb Type S mortar per 1,000 standard bricks. Wider 1/2-inch joints increase this to about 9 bags. The calculator accounts for brick size and joint width automatically.",
    },
    {
      question: "What is the difference between Type S, Type N, and Type M mortar?",
      answer:
        "Type S is the default for exterior walls and structural applications — it has the best bond strength and weather resistance. Type N is for interior and above-grade non-structural work. Type M has the highest compressive strength and is used below grade (retaining walls, foundations).",
    },
    {
      question: "Can I use mortar instead of grout?",
      answer:
        "No. Mortar bonds bricks or blocks together and has sand for body. Grout fills joints between tiles and is much thinner. They are different products with different formulations. Use the grout calculator for tile projects.",
    },
    {
      question: "How long does a bag of mortar last once opened?",
      answer:
        "Unopened bags last 12 months in dry storage. Once opened, use within 1-2 months. Mixed mortar must be used within 90 minutes to 2 hours before it begins to set. Do not add water to mortar that has started to stiffen.",
    },
  ],

  sources: [
    {
      name: "Brick Industry Association — Technical Note 8 (Mortar for Brick Masonry)",
      url: "https://www.gobrick.com/resources/technical-notes",
    },
    {
      name: "ASTM C270 — Standard Specification for Mortar for Unit Masonry",
    },
    {
      name: "Portland Cement Association — Mortar Information",
      url: "https://www.cement.org",
    },
  ],

  formulaDescription:
    "bags = (wall_area_ft² × bricks_per_ft² × joint_volume_per_brick) ÷ coverage_per_bag",

  calculate(values, units) {
    const length = Number(values.length) || 0;
    const height = Number(values.height) || 0;
    const brickSize = String(values.brickSize);
    const jointWidth = Number(values.jointWidth) || 0.375;
    const mortarType = String(values.mortarType);

    // Convert to feet if metric
    const lengthFt = units === "metric" ? length * 3.281 : length;
    const heightFt = units === "metric" ? height * 3.281 : height;

    const wallArea = lengthFt * heightFt;

    // Bricks per sq ft and mortar usage factors
    interface BrickSpec {
      bricksPerSqFt: number;
      // Mortar volume per brick in cubic inches
      mortarPerBrick: number;
    }

    const brickSpecs: Record<string, BrickSpec> = {
      standard: {
        bricksPerSqFt: jointWidth <= 0.375 ? 6.75 : jointWidth <= 0.5 ? 6.16 : 5.5,
        mortarPerBrick: jointWidth <= 0.375 ? 6.5 : jointWidth <= 0.5 ? 9.2 : 14.8,
      },
      modular: {
        bricksPerSqFt: jointWidth <= 0.375 ? 7.0 : jointWidth <= 0.5 ? 6.4 : 5.7,
        mortarPerBrick: jointWidth <= 0.375 ? 6.0 : jointWidth <= 0.5 ? 8.5 : 13.8,
      },
      king: {
        bricksPerSqFt: jointWidth <= 0.375 ? 5.0 : jointWidth <= 0.5 ? 4.6 : 4.1,
        mortarPerBrick: jointWidth <= 0.375 ? 8.8 : jointWidth <= 0.5 ? 12.0 : 18.5,
      },
      block: {
        bricksPerSqFt: 1.125,
        mortarPerBrick: jointWidth <= 0.375 ? 22.5 : jointWidth <= 0.5 ? 30.0 : 45.0,
      },
    };

    const spec = brickSpecs[brickSize] || brickSpecs.standard;
    const totalBricks = wallArea * spec.bricksPerSqFt;
    const totalMortarCuIn = totalBricks * spec.mortarPerBrick;

    // 80-lb bag covers approximately 36-40 bricks (standard) in bed and head joints
    // Using cubic inches: 1 bag of 80-lb mortar ≈ 450 cubic inches of mixed mortar
    const cuInPerBag = 450;
    const bagsExact = totalMortarCuIn / cuInPerBag;
    const bags = Math.ceil(bagsExact * 1.1); // 10% waste

    const brickCount = Math.ceil(totalBricks * 1.05); // 5% brick waste

    // Cost estimate
    const costPerBag = 7.5;
    const totalCost = bags * costPerBag;

    const mortarTypeLabel =
      mortarType === "S" ? "Type S" : mortarType === "N" ? "Type N" : "Type M";

    return {
      value: bagsExact,
      valueRounded: bags,
      unit: `bags of 80-lb ${mortarTypeLabel} mortar`,
      formulaSteps: [
        `Wall area: ${formatNumber(lengthFt, 1)} × ${formatNumber(heightFt, 1)} = ${formatNumber(wallArea, 1)} ft²`,
        `Brick count: ${formatNumber(wallArea, 1)} × ${formatNumber(spec.bricksPerSqFt, 2)} = ${formatNumber(totalBricks, 0)} bricks`,
        `Mortar volume: ${formatNumber(totalBricks, 0)} × ${formatNumber(spec.mortarPerBrick, 1)} in³ = ${formatNumber(totalMortarCuIn, 0)} in³`,
        `Bags (before waste): ${formatNumber(totalMortarCuIn, 0)} ÷ ${cuInPerBag} = ${formatNumber(bagsExact, 1)} bags`,
        `With 10% waste: ${bags} bags`,
      ],
      breakdowns: [
        { label: "Wall area", value: `${formatNumber(wallArea, 0)} ft²` },
        { label: "Bricks needed (with 5% waste)", value: `${formatNumber(brickCount, 0)} bricks` },
        { label: `${mortarTypeLabel} mortar (80-lb bags)`, value: `${bags} bags` },
        { label: "Estimated mortar cost", value: `$${formatNumber(totalCost, 0)}` },
      ],
    };
  },
};
