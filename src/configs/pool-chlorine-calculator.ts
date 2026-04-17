import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const poolChlorineCalculatorConfig: CalculatorConfig = {
  slug: "pool-chlorine-calculator",
  title: "Pool Chlorine Calculator",
  description:
    "Chlorine dose for any pool size and starting level. Handles shock, daily maintenance, and liquid or tablet math.",
  categoryLabel: "Landscaping",
  category: "landscaping",

  bannerHeadline: "Chlorinate evenly.",
  bannerTags: ["Gallons or liters", "Shock or maintain", "Liquid · tabs · granular"],

  inputs: [
    {
      id: "volume",
      label: "Pool volume",
      type: "number",
      unitImperial: "gal",
      unitMetric: "L",
      defaultImperial: 15000,
      defaultMetric: 56800,
      min: 500,
      step: 500,
      help: "L × W × avg depth × 7.5 (imperial) or 1000 (metric)",
    },
    {
      id: "currentPpm",
      label: "Current free chlorine",
      type: "number",
      unitImperial: "ppm",
      defaultImperial: 0,
      min: 0,
      max: 10,
      step: 0.5,
      help: "From your test kit. 0 means untreated or depleted.",
    },
    {
      id: "targetPpm",
      label: "Target level",
      type: "select",
      defaultImperial: 3,
      options: [
        { label: "1 ppm (minimum chlorinated)", value: 1 },
        { label: "3 ppm (normal maintenance)", value: 3 },
        { label: "5 ppm (heavy use / algae prevention)", value: 5 },
        { label: "10 ppm (shock treatment)", value: 10 },
      ],
      help: "Shock after heavy use, algae bloom, or weekly maintenance",
    },
    {
      id: "chlorineType",
      label: "Chlorine product",
      type: "select",
      defaultImperial: "liquid",
      options: [
        { label: "Liquid (10% sodium hypochlorite)", value: "liquid" },
        { label: "Granular (calcium hypochlorite 65%)", value: "granular" },
        { label: "Trichlor tablets (90%)", value: "trichlor" },
        { label: "Dichlor granular (55%)", value: "dichlor" },
      ],
    },
  ],

  calculate: (values, units) => {
    const volumeInput = Number(values.volume) || 0;
    const currentPpm = Number(values.currentPpm) || 0;
    const targetPpm = Number(values.targetPpm) || 3;
    const chlorineType = String(values.chlorineType || "liquid");

    // Convert to US gallons for calculation
    const volumeGal =
      units === "metric" ? volumeInput * 0.264172 : volumeInput;

    // How many ppm to add
    const ppmNeeded = Math.max(0, targetPpm - currentPpm);

    // Pounds of available chlorine needed to raise 10,000 gal by 1 ppm
    // = approximately 0.00013 lb of active chlorine per gallon per ppm
    // For 10,000 gal to rise 1 ppm: 0.013 lb (0.208 oz) pure chlorine
    // Normalize: oz of pure chlorine = volume (gal) × ppm × 0.0000125

    const activeChlorineOz = volumeGal * ppmNeeded * 0.0000125 * 16; // convert lb to oz

    // Product-specific concentrations
    const productConcentrations: Record<string, { pct: number; unit: "liquid" | "dry" }> = {
      liquid: { pct: 0.10, unit: "liquid" }, // 10% sodium hypochlorite
      granular: { pct: 0.65, unit: "dry" }, // 65% cal-hypo
      trichlor: { pct: 0.90, unit: "dry" }, // 90% trichlor
      dichlor: { pct: 0.55, unit: "dry" }, // 55% dichlor
    };
    const product = productConcentrations[chlorineType] || productConcentrations["liquid"];

    // Calculate amount of product needed
    // For liquid: product volume = active needed / concentration / density
    // 10% liquid chlorine is 1.2 lb/gal active
    // More practical: liquid chlorine at 10% strength, 1 gal raises 10,000 gal by about 10 ppm
    //
    // Standard industry formulas:
    // Liquid 10%: 10.5 oz per 10,000 gal per 1 ppm → scale
    // Cal-hypo 65%: 1.8 oz per 10,000 gal per 1 ppm
    // Trichlor 90%: 1.3 oz per 10,000 gal per 1 ppm
    // Dichlor 55%: 2.1 oz per 10,000 gal per 1 ppm

    const ozPer10kPerPpm: Record<string, number> = {
      liquid: 10.5,
      granular: 1.8,
      trichlor: 1.3,
      dichlor: 2.1,
    };
    const ozFactor = ozPer10kPerPpm[chlorineType] || 10.5;

    const productOz = (volumeGal / 10000) * ppmNeeded * ozFactor;

    // Convert to user-friendly units
    let displayAmount: number;
    let displayUnit: string;

    if (chlorineType === "liquid") {
      // Display in fluid ounces or gallons
      if (productOz >= 32) {
        displayAmount = productOz / 128;
        displayUnit = "gallons";
      } else {
        displayAmount = productOz;
        displayUnit = "fl oz";
      }
    } else if (chlorineType === "trichlor") {
      // Trichlor usually in tablet form (3" tablets are 8 oz each)
      displayAmount = productOz;
      displayUnit = "oz (≈ " + Math.ceil(productOz / 8) + " × 3\" tablets)";
    } else {
      // Granular weight in ounces or pounds
      if (productOz >= 16) {
        displayAmount = productOz / 16;
        displayUnit = "lb";
      } else {
        displayAmount = productOz;
        displayUnit = "oz";
      }
    }

    return {
      value: round(displayAmount, 2),
      unit: displayUnit,
      valueRounded: round(displayAmount, 1),
      breakdown: [
        { label: "pool volume", value: `${formatNumber(round(volumeGal, 0))} gal` },
        { label: "raise by", value: `${ppmNeeded} ppm` },
        { label: "target", value: `${targetPpm} ppm` },
        { label: "product", value: `${chlorineType} (${round(product.pct * 100, 0)}%)` },
      ],
      formulaSteps: [
        units === "metric"
          ? `volume = ${volumeInput} L = ${formatNumber(round(volumeGal, 0))} US gal`
          : `volume = ${formatNumber(volumeGal)} gal`,
        `current = ${currentPpm} ppm, target = ${targetPpm} ppm`,
        `need to raise = ${ppmNeeded} ppm`,
        `product: ${chlorineType}, strength = ${round(product.pct * 100, 0)}%`,
        `dosing: ${ozFactor} oz per 10,000 gal per 1 ppm`,
        `amount = (${formatNumber(round(volumeGal, 0))} ÷ 10,000) × ${ppmNeeded} × ${ozFactor} = ${round(productOz, 1)} oz`,
        `display: ${round(displayAmount, 2)} ${displayUnit}`,
      ],
    };
  },

  formulaDescription:
    "dose = (volume ÷ 10,000) × ppm needed × product factor (oz per 10k gal per ppm)",

  methodology: [
    "Pool chlorine dosing depends on three things: pool volume (the amount of water to treat), the gap between current and target chlorine levels (how many ppm to add), and the specific product's active chlorine concentration. Each type of chlorine product has a different strength, so the same ppm increase requires different amounts of different products.",
    "Standard dosing factors (ounces of product per 10,000 gallons per 1 ppm increase): liquid 10% sodium hypochlorite = 10.5 oz; calcium hypochlorite 65% granular = 1.8 oz; trichlor 90% (stabilized tablets) = 1.3 oz; dichlor 55% (stabilized granular) = 2.1 oz. Trichlor is the most concentrated by weight, but also the most acidic — regular use drops pH.",
    "Target levels depend on use: 1-3 ppm is normal maintenance for a residential pool. 3-5 ppm during heavy use or warm weather. 10 ppm is shock treatment after algae, cloudy water, or a heavy swim day. Levels above 5 ppm should drop to 3 ppm before swimming (take 4-8 hours for chlorine to break down naturally).",
    "Pool volume matters enormously. The rectangular pool formula: length × width × average depth × 7.5 (gallons) or × 1000 (liters). For a 15 × 30 ft pool with 4.5 ft average depth: 15 × 30 × 4.5 × 7.5 = 15,188 gallons. Round pools use π × radius² × depth. Irregular shapes are harder — use your pool builder's documentation.",
    "Liquid chlorine is the most common for pool maintenance — direct pour into the pool with the pump running. Granular products dissolve faster and are stronger per volume but add calcium (cal-hypo) or cyanuric acid (dichlor) that accumulates over time. Trichlor tablets go in floating dispensers or inline feeders for slow, continuous dosing.",
    "Important caveats not captured here: cyanuric acid (stabilizer) levels affect effective chlorine — a pool with high CYA (60+ ppm) needs higher free chlorine to remain sanitary. pH affects chlorine effectiveness — at pH 8.0, chlorine is only 20% effective; at pH 7.5, it's 50%+ effective. Always test and adjust pH BEFORE dosing chlorine. Use this calculator for initial dosing; retest after 30-60 minutes and adjust.",
  ],

  sources: [
    {
      name: "Pool & Hot Tub Alliance (PHTA)",
      url: "https://www.phta.org/",
      note: "Industry standards for water chemistry and dosing",
    },
    {
      name: "CDC — Model Aquatic Health Code",
      url: "https://www.cdc.gov/mahc/",
      note: "Public health guidance for pool chlorine levels",
    },
  ],

  related: [
    { name: "Mulch calculator", slug: "mulch-calculator", description: "Garden beds around pools" },
    { name: "Paver calculator", slug: "paver-calculator", description: "Pool deck pavers and base" },
    { name: "Concrete calculator", slug: "concrete-calculator", description: "Cubic yards for pool decks" },
    { name: "Gravel calculator", slug: "gravel-calculator", description: "Base material for pool surround" },
  ],

  faq: [
    {
      question: "How much chlorine do I add to a 15,000 gallon pool?",
      answer:
        "To raise 15,000 gallons from 0 to 3 ppm with 10% liquid chlorine: about 47 fl oz (less than half a gallon). With cal-hypo 65% granular: about 8 oz. With trichlor tablets: about 6 oz (around one 3-inch tab). The calculator above handles any volume and target level.",
    },
    {
      question: "What's the difference between the chlorine types?",
      answer:
        "Liquid (sodium hypochlorite, 10%) — cheapest, daily use, no residue but bulky. Cal-hypo (65%) — fast-acting, good for shock but adds calcium. Trichlor tablets (90%) — slow-release convenience, adds stabilizer (CYA). Dichlor (55%) — fast-dissolve with built-in stabilizer, good for spot treatment.",
    },
    {
      question: "How often should I add chlorine?",
      answer:
        "Daily in summer: liquid chlorine pour to maintain 2-3 ppm (typically 1-2 quarts for a medium pool). Weekly: shock treatment to 10 ppm after heavy use. With a trichlor feeder (tablets in floater or inline): replace tabs every 3-7 days. With a saltwater generator: no manual chlorine needed, just salt.",
    },
    {
      question: "When should I shock my pool?",
      answer:
        "Weekly during summer as preventive maintenance. After heavy swimmer load (pool party, kids all day). After rainstorms (especially with runoff). When you smell strong 'chlorine smell' (that's actually chloramines, meaning chlorine is depleted). When water turns cloudy or green (algae bloom).",
    },
    {
      question: "Why can't I just use more chlorine?",
      answer:
        "Chlorine above 10 ppm irritates eyes and skin, bleaches swimsuits, and breaks down quickly in sunlight (wasted). Very high levels cause corrosion of pump seals and metal fittings. More importantly: if your chlorine isn't effective, the problem is usually pH (should be 7.2-7.6) or cyanuric acid (should be 30-50 ppm) — fix those first, not more chlorine.",
    },
    {
      question: "Can I swim right after adding chlorine?",
      answer:
        "After liquid chlorine daily dosing to 3 ppm: wait 30 minutes for it to circulate. After shock to 10 ppm: wait 4-8 hours for levels to drop to safe 3 ppm. After adding cal-hypo or trichlor granular: wait for full dissolution (2-4 hours) to avoid bleached swimsuits and skin irritation. Always test before swimming.",
    },
    {
      question: "What's cyanuric acid and why does it matter?",
      answer:
        "Cyanuric acid (CYA, 'stabilizer') protects chlorine from UV degradation in sunlight. Without it, chlorine breaks down in hours. With too much (over 80 ppm), chlorine becomes ineffective against bacteria and algae. Target 30-50 ppm. Trichlor and dichlor add CYA automatically; liquid and cal-hypo don't. If your CYA is high, switch to liquid chlorine and partially drain/refill to reduce it.",
    },
    {
      question: "How do I calculate my pool volume?",
      answer:
        "Rectangular: L × W × avg depth × 7.5 (US gal) or × 1000 (liters). Round: π × radius² × avg depth × 7.5 (or 1000). Kidney/irregular: measure maximum length and width, use rectangular formula, then reduce by 15%. Average depth is (shallow + deep) ÷ 2 for pools with sloped floors. Enter the result in the calculator.",
    },
  ],
};
