import { HardwoodFlooringCostExpansion } from "@/content/hardwood-flooring-cost-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const hardwoodFlooringCostCalculatorConfig: CalculatorConfig = {
  slug: "hardwood-flooring-cost-calculator",
  title: "Hardwood Flooring Cost Calculator",
  description:
    "Installed cost of hardwood flooring by species, solid or engineered, and installation method, with material and labor itemized and the waste factor shown.",
  categoryLabel: "Flooring",
  category: "flooring",

  bannerHeadline: "Price the floor.",
  bannerTags: ["By species", "Solid or engineered", "Material + labor split"],

  inputs: [
    {
      id: "area",
      label: "Floor area",
      type: "number",
      unitImperial: "ft²",
      defaultImperial: 400,
      min: 20,
      step: 10,
      help: "Net measured area. The 10% waste factor is applied on top of this, not included in it.",
    },
    {
      id: "species",
      label: "Species",
      type: "select",
      defaultImperial: 6.5,
      options: [
        { label: "Red oak", value: 6.5 },
        { label: "White oak", value: 8 },
        { label: "Maple", value: 7.5 },
        { label: "Hickory", value: 8.5 },
        { label: "Brazilian cherry", value: 9.5 },
        { label: "Walnut", value: 12 },
      ],
      help: "Material cost per square foot before waste. Red oak is the baseline the whole market prices against.",
    },
    {
      id: "construction",
      label: "Construction",
      type: "select",
      defaultImperial: 1,
      options: [
        { label: "Solid, 3/4 in", value: 1 },
        { label: "Engineered", value: 0.85 },
      ],
      help: "Engineered runs slightly cheaper in material and is the only option over concrete slabs",
    },
    {
      id: "finish",
      label: "Finish",
      type: "select",
      defaultImperial: 0,
      options: [
        { label: "Prefinished", value: 0 },
        { label: "Site-finished (sand and coat on site)", value: 3 },
      ],
      help: "Site finishing adds sanding, staining, and three coats, plus several days of cure time",
    },
    {
      id: "method",
      label: "Installation",
      type: "select",
      defaultImperial: 5,
      options: [
        { label: "Nail down (over subfloor)", value: 5 },
        { label: "Glue down (over slab)", value: 6.5 },
        { label: "Float (engineered click)", value: 4 },
        { label: "DIY, materials only", value: 0 },
      ],
      help: "Labor per square foot. Nail down is the standard for solid over a wood subfloor.",
    },
  ],

  calculate: (values) => {
    const area = Number(values.area) || 400;
    const speciesPrice = Number(values.species) || 6.5;
    const constructionMult = Number(values.construction) || 1;
    const finishAdd = Number(values.finish) || 0;
    const laborRate = Number(values.method) || 0;

    const WASTE = 0.1;
    const orderArea = area * (1 + WASTE);

    const materialRate = speciesPrice * constructionMult;
    const material = orderArea * materialRate;
    // Underlayment, fasteners, adhesive, transitions and trim
    const suppliesRate = laborRate === 6.5 ? 1.4 : 0.8;
    const supplies = orderArea * suppliesRate;
    const labor = area * laborRate;
    const finishing = area * finishAdd;

    const total = material + supplies + labor + finishing;
    const perSqFt = total / area;
    const low = Math.round((total * 0.88) / 50) * 50;
    const high = Math.round((total * 1.18) / 50) * 50;
    const mid = Math.round(total / 50) * 50;

    const breakdown = [
      { label: "order area (10% waste)", value: `${formatNumber(round(orderArea, 0))} ft²` },
      { label: "material", value: `$${formatNumber(Math.round(material))} ($${round(materialRate, 2)}/ft²)` },
      { label: "underlayment, fasteners, trim", value: `$${formatNumber(Math.round(supplies))}` },
      ...(labor > 0 ? [{ label: "installation labor", value: `$${formatNumber(Math.round(labor))} ($${laborRate}/ft²)` }] : []),
      ...(finishing > 0 ? [{ label: "sand and finish on site", value: `$${formatNumber(Math.round(finishing))} ($${finishAdd}/ft²)` }] : []),
      { label: "cost per sq ft installed", value: `$${round(perSqFt, 2)}` },
      { label: "typical range", value: `$${formatNumber(low)}-${formatNumber(high)}` },
    ];

    return {
      value: mid,
      unit: "total",
      valueRounded: mid,
      prefix: "$",
      breakdown,
      formulaSteps: [
        `order area = ${formatNumber(area)} ft² × 1.10 waste = ${formatNumber(round(orderArea, 0))} ft²`,
        `material = ${formatNumber(round(orderArea, 0))} ft² × $${round(materialRate, 2)} = $${formatNumber(Math.round(material))}`,
        `supplies = ${formatNumber(round(orderArea, 0))} ft² × $${suppliesRate} = $${formatNumber(Math.round(supplies))}`,
        ...(labor > 0 ? [`labor = ${formatNumber(area)} ft² × $${laborRate} = $${formatNumber(Math.round(labor))}`] : []),
        ...(finishing > 0 ? [`site finish = ${formatNumber(area)} ft² × $${finishAdd} = $${formatNumber(Math.round(finishing))}`] : []),
        `total ≈ $${formatNumber(mid)} ($${round(perSqFt, 2)}/ft² installed)`,
      ],
      composition: {
        unit: "$",
        total: Math.round(total),
        segments: [
          { label: "Material + supplies", amount: Math.round(material + supplies), shade: "primary" },
          { label: "Labor + finishing", amount: Math.round(labor + finishing), shade: "secondary" },
        ],
      },
    };
  },

  ContentExpansion: HardwoodFlooringCostExpansion,

  formulaDescription:
    "total = (area × 1.10) × (species rate + supplies) + area × (labor rate + site-finish rate)",

  methodology: [
    "Material rates are typical 2026 US retail pricing per square foot for mid-grade product in each species, before waste. Engineered construction is priced at roughly 85 percent of solid in the same species, reflecting the thinner wear layer over a plywood core.",
    "A 10 percent waste factor is applied to the ordered area for straight-lay installation in a rectangular room, matching NWFA cutting and grading allowance practice. Diagonal or herringbone layouts and irregular rooms warrant 15 percent; the waste factor reference guide covers when to adjust.",
    "Labor rates cover installation only: $4 per square foot for floating engineered click floors, $5 for nail-down over a wood subfloor, and $6.50 for glue-down over concrete, which is slower and consumes adhesive. Selecting DIY prices materials and supplies with no labor.",
    "Site finishing adds $3 per square foot covering sanding, stain, and three coats of finish. Prefinished flooring arrives with a factory finish and skips this entirely, which is why prefinished dominates residential retrofits.",
    "Supplies cover underlayment or vapor retarder, fasteners or adhesive, transitions, and shoe molding. The glue-down rate is higher because adhesive is a significant material cost in its own right.",
    "Not included: subfloor repair or leveling, removal and disposal of existing flooring, and moving furniture. Each is quoted separately and each can be significant; the article below covers typical figures.",
  ],

  sources: [
    {
      name: "NWFA Installation Guidelines",
      url: "https://nwfa.org/publications/",
      note: "Industry standard for subfloor preparation, acclimation, and installation method by construction type",
    },
    {
      name: "NWFA Wood Species Guide",
      url: "https://nwfa.org/wood-species/",
      note: "Janka hardness and characteristics for the species priced above",
    },
    {
      name: "USDA Forest Products Laboratory - Wood Handbook",
      url: "https://www.fpl.fs.usda.gov/products/publications/specific_pub.php?posting_id=18519",
      note: "Published source for wood movement, moisture content, and hardness data",
    },
    {
      name: "EPA - Formaldehyde Standards for Composite Wood",
      url: "https://www.epa.gov/formaldehyde",
      note: "TSCA Title VI compliance applying to engineered wood flooring cores",
    },
  ],

  related: [
    { name: "Flooring calculator", slug: "flooring-calculator", description: "Square footage and box count for any flooring" },
    { name: "Insulation calculator", slug: "insulation-calculator", description: "Subfloor and crawlspace R-value" },
    { name: "Countertop calculator", slug: "countertop-calculator", description: "Square footage for the rest of the remodel" },
    { name: "Floor refinishing cost", slug: "hardwood-floor-refinishing-cost-calculator", description: "Sand and refinish instead of replacing" },
  ],

  howTo: {
    name: "How to estimate hardwood flooring cost",
    description:
      "Price a hardwood floor installation in five steps, from measuring the room to deciding between prefinished and site-finished.",
    steps: [
      {
        name: "Measure net floor area",
        text: "Measure each room's length by width and add them together. Include closets, exclude permanent islands and cabinet runs. Do not add waste yet; that comes after.",
      },
      {
        name: "Pick a species and grade",
        text: "Red oak is the market baseline at roughly $6-7 per square foot for mid-grade material. White oak, maple, and hickory run higher; walnut and exotic species higher again. Character or rustic grades cost less than select grades of the same species.",
      },
      {
        name: "Choose solid or engineered",
        text: "Solid 3/4 inch works over wood subfloors above grade and can be refinished many times. Engineered is required over concrete slabs and in basements, and its wear layer thickness determines how many refinishes it will take.",
      },
      {
        name: "Add installation and finishing",
        text: "Budget $4 per square foot for floating, $5 for nail-down, $6.50 for glue-down over slab. Add about $3 per square foot if the floor will be sanded and finished on site rather than bought prefinished.",
      },
      {
        name: "Add waste and the extras nobody quotes",
        text: "Apply 10 percent waste to the order, 15 percent for diagonal layouts or irregular rooms. Then price removal of the old floor, any subfloor leveling, and transitions separately, since these are quoted as extras and routinely surprise people.",
      },
    ],
  },

  faq: [
    {
      question: "How much does hardwood flooring cost per square foot installed?",
      answer:
        "$10-16 per square foot installed for common species like red oak and maple with prefinished material and nail-down installation. White oak and hickory push $13-18, and walnut or exotics run $18-25. Material is roughly half; labor, supplies, and finishing make up the rest.",
    },
    {
      question: "Is engineered hardwood cheaper than solid?",
      answer:
        "Slightly, around 10-15 percent less in the same species, but that is not the main reason to choose it. Engineered is dimensionally stable and is the only option over a concrete slab or below grade. Solid can be refinished more times, which matters over a 40 year horizon.",
    },
    {
      question: "What is the cheapest hardwood flooring?",
      answer:
        "Red oak in a character or #2 common grade, typically $4-6 per square foot for material. It is the baseline the entire US market prices against, it stains predictably, and it is the easiest floor to find matching material for in ten years when a repair is needed.",
    },
    {
      question: "Is prefinished or site-finished better?",
      answer:
        "Prefinished costs less installed (no sanding and finishing), goes back into service immediately, and has a factory-cured finish that is typically more wear resistant. Site-finished gives a perfectly flat surface with no bevels between boards and allows custom stain, but adds about $3 per square foot and several days of dust and cure time.",
    },
    {
      question: "How much does it cost to refinish hardwood instead of replacing it?",
      answer:
        "$3-5 per square foot to sand and refinish, versus $10-16 to replace. If the existing floor is solid, structurally sound, and has at least 3/16 inch of wood above the tongue, refinishing is dramatically cheaper and produces a floor that is functionally new.",
    },
    {
      question: "What does the Janka rating actually tell me?",
      answer:
        "It measures resistance to denting, not to scratching. Red oak sits at 1290 and is the industry reference point. Hickory at 1820 dents less; walnut at 1010 dents more. Scratch resistance comes from the finish, not the wood, which is why a hard species with a worn finish still looks bad.",
    },
    {
      question: "Does hardwood need to acclimate before installation?",
      answer:
        "Yes. NWFA guidance is to deliver the flooring to the installation space and let it reach equilibrium with the room's conditions before installing, with the building's HVAC running at normal living conditions. Skipping acclimation is the leading cause of gaps in winter and cupping in summer.",
    },
  ],
};
