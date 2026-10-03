import { reconcileCalculator } from "@/lib/reconcile-calculator";
import { MortarCalculatorExpansion } from "@/content/mortar-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { formatNumber , ceilQuantity } from "@/lib/format";

export const mortarCalculatorConfig: CalculatorConfig = {
  slug: "mortar-calculator",
  title: "Mortar Calculator",
  description:
    "Bags of mortar mix for brick, block, and stone walls. Accounts for joint width, brick size, and mortar type so you order the right amount.",
  categoryLabel: "Masonry",
  category: "concrete",

  bannerHeadline: "Mix right.",
  bannerTags: ["Bags by wall area", "Joint width math", "Type S / N / M"],

  howTo: {
    name: "How to calculate mortar for brick or block",
    description:
      "Estimate bags of mortar from unit count, then pick the ASTM C270 type the job requires.",
    steps: [
      {
        name: "Count the masonry units",
        text: "Wall area times units per square foot: about 6.9 modular bricks or 1.125 standard 8x8x16 blocks per square foot.",
      },
      {
        name: "Apply the coverage rate",
        text: "One 80 pound bag of premixed mortar lays roughly 35 to 40 bricks or 12 to 15 blocks at a 3/8 inch joint. Wider joints and larger units consume more.",
      },
      {
        name: "Adjust for joint width",
        text: "A 1/2 inch joint uses roughly a third more mortar than a 3/8 inch joint over the same wall, since joint volume scales directly with width.",
      },
      {
        name: "Choose the mortar type",
        text: "Type N for general above-grade work, Type S at or near grade and for chimneys, Type M below grade, and Type O for repointing older masonry.",
      },
      {
        name: "Add waste and buy whole bags",
        text: "Add 10 percent for droppings and the board, then round up. Mortar must be used within about 2.5 hours of mixing, so mix in batches rather than all at once.",
      },
    ],
  },

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
        "About 30 bags of 80 lb mortar per 1,000 standard bricks at 3/8 inch joints, since one bag lays roughly 35 bricks. Half inch joints raise it to about 40 bags. Concrete block uses far more: roughly 77 bags per 1,000 units, because the joints are much longer."
    },
    {
      question: "What is the difference between Type S, Type N, and Type M mortar?",
      answer:
        "Type S is the default for exterior walls and structural applications: it has the best bond strength and weather resistance. Type N is for interior and above-grade non-structural work. Type M has the highest compressive strength and is used below grade (retaining walls, foundations).",
    },
    {
      question: "Can I use mortar instead of grout?",
      answer:
        "No. Mortar bonds bricks or blocks together and has sand for body. Grout fills joints between tiles and is much thinner. They are different products with different formulations. Use the grout calculator for tile projects.",
    },
    {
      question: "How long does a bag of mortar last once opened?",
      answer:
        "Unopened bags last about 12 months in dry storage and opened bags one to two months. ASTM C270 sets a 2.5 hour board life for mixed mortar. Retempering with a small amount of water to replace evaporation is acceptable within that window; adding water to mortar that has begun to stiffen from hydration is not, and permanently weakens the bond.",
    },
  ],

  sources: [
    {
      name: "ASTM C270: Mortar for Unit Masonry",
      url: "https://www.astm.org/c0270-19ae01.html",
      note: "The specification defining Types M, S, N, O, and K and their proportions",
    },
    {
      name: "BIA Technical Note 8: Mortars for Brickwork",
      url: "https://www.gobrick.com/resources/technical-notes",
      note: "Mortar selection by exposure and the case against overly strong mortar",
    },
    {
      name: "Portland Cement Association: Masonry Mortar",
      url: "https://www.cement.org/cement-concrete/products/masonry",
      note: "Mixing practice, retempering limits, and cement to lime ratios",
    },
    {
      name: "NPS Preservation Brief 2: Repointing Mortar Joints",
      url: "https://www.nps.gov/orgs/1739/upload/preservation-brief-02-repointing-mortar-joints.pdf",
      note: "Why historic masonry requires soft mortar and how to match an existing mix",
    },
    {
      name: "Quikrete and Sakrete: Mortar Mix Coverage Data",
      url: "https://www.quikrete.com/productlines/mortarmix.asp",
      note: "Published bag coverage of 37 to 40 bricks or about 13 blocks per 80 lb bag, which this calculator is calibrated to",
    },
    {
      name: "ANSI A118.4: Modified Dry-Set Cement Mortar",
      url: "https://www.tcnatile.com/products-and-services/publications/ansi-standards/",
      note: "The separate standard governing thinset, which is tile adhesive rather than masonry mortar",
    },
  ],

  methodology: [
    "Mortar volume per unit is calibrated to manufacturer published coverage rather than to nominal joint geometry alone. Geometry alone suggests about 13 cubic inches per modular brick, but real masonry consumes closer to 30 once furrowed bed joints, generously buttered head joints, and board loss are counted, which is why Quikrete publishes 37 bricks per 80 lb bag and Sakrete about 40.",
    "An 80 lb bag of premixed mortar yields about 0.6 cubic feet, or 1,037 cubic inches, which lays roughly 35 standard bricks or 13 concrete blocks at 3/8 inch joints. These are manufacturer published coverage rates and already account for the extra mortar real masonry consumes over nominal joint geometry.",
    "A 5 percent margin is added on top. It is deliberately modest because the per-unit volumes already carry the waste built into manufacturer coverage figures; adding a further 10 to 15 percent would double count it.",
    "Mortar type (S, N, M) does not change the volume calculation. All three types yield the same volume per bag. The type affects bond strength, compressive strength, and weather resistance. Type S is the default for exterior residential masonry.",
    "Concrete block uses far more mortar per unit than brick because each unit has much longer joint lines. A standard 8x8x16 block takes roughly 80 cubic inches at a 3/8 inch joint, so one 80 lb bag lays about 13 blocks against 35 bricks.",
  ],

  related: [
    { name: "Brick calculator", slug: "brick-calculator", description: "Brick count for the same wall" },
    { name: "Concrete calculator", slug: "concrete-calculator", description: "Footings under masonry walls" },
    { name: "Rebar calculator", slug: "rebar-calculator", description: "Reinforcement in block walls" },
    { name: "Chimney calculator", slug: "chimney-calculator", description: "Flue size and height for a masonry chimney" },
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

    // Mortar volume per unit in cubic inches, calibrated to manufacturer
    // published coverage (Quikrete: 37 brick or 13 block per 80 lb bag;
    // Sakrete: ~40 brick). These figures already include the extra mortar
    // real masonry consumes over nominal joint geometry: furrowed beds,
    // generously buttered heads, and board loss.
    const brickSpecs: Record<string, BrickSpec> = {
      standard: {
        bricksPerSqFt: jointWidth <= 0.375 ? 6.75 : jointWidth <= 0.5 ? 6.16 : 5.5,
        mortarPerBrick: jointWidth <= 0.375 ? 30.5 : jointWidth <= 0.5 ? 41.0 : 51.0,
      },
      modular: {
        bricksPerSqFt: jointWidth <= 0.375 ? 7.0 : jointWidth <= 0.5 ? 6.4 : 5.7,
        mortarPerBrick: jointWidth <= 0.375 ? 29.6 : jointWidth <= 0.5 ? 39.9 : 49.4,
      },
      king: {
        bricksPerSqFt: jointWidth <= 0.375 ? 5.0 : jointWidth <= 0.5 ? 4.6 : 4.1,
        mortarPerBrick: jointWidth <= 0.375 ? 31.7 : jointWidth <= 0.5 ? 42.5 : 53.0,
      },
      block: {
        bricksPerSqFt: 1.125,
        mortarPerBrick: jointWidth <= 0.375 ? 79.8 : jointWidth <= 0.5 ? 106.0 : 133.0,
      },
    };

    const spec = brickSpecs[brickSize] || brickSpecs.standard;
    const totalBricks = wallArea * spec.bricksPerSqFt;
    const totalMortarCuIn = totalBricks * spec.mortarPerBrick;

    // An 80 lb bag of premixed mortar yields about 0.6 cubic feet of mixed
    // mortar, which is 1,037 cubic inches.
    const cuInPerBag = 1037;
    const bagsExact = totalMortarCuIn / cuInPerBag;
    // 5% margin only: the per-unit volumes above already carry the waste
    // built into manufacturer coverage figures.
    const bags = ceilQuantity(bagsExact * 1.05);

    const brickCount = ceilQuantity(totalBricks * 1.05); // 5% brick waste

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
      breakdown: [
        { label: "Wall area", value: `${formatNumber(wallArea, 0)} ft²` },
        { label: "Bricks needed (with 5% waste)", value: `${formatNumber(brickCount, 0)} bricks` },
        { label: `${mortarTypeLabel} mortar (80-lb bags)`, value: `${bags} bags` },
        { label: "Estimated mortar cost", value: `$${formatNumber(totalCost, 0)}` },
      ],
    };
  },
};

reconcileCalculator(mortarCalculatorConfig);
