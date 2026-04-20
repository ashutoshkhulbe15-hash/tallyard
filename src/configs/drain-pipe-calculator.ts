import { DrainPipeCalculatorExpansion } from "@/content/drain-pipe-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { formatNumber } from "@/lib/format";

export const drainPipeCalculatorConfig: CalculatorConfig = {
  slug: "drain-pipe-calculator",
  title: "Drain Pipe Calculator",
  description:
    "Drain pipe size by fixture count. Uses DFU (drainage fixture units) per IPC / UPC codes to pick the right pipe diameter for any bathroom or kitchen branch.",
  categoryLabel: "Electrical",
  category: "hvac",

  bannerHeadline: "Drain correctly.",
  bannerTags: ["DFU-based", "IPC + UPC codes", "1.5\" to 4\" pipe"],

  inputs: [
    {
      id: "toilets",
      label: "Toilets",
      type: "number",
      defaultImperial: 1,
      min: 0,
      step: 1,
      help: "Each toilet: 4 DFU (private) / 6 DFU (public)",
    },
    {
      id: "sinks",
      label: "Sinks (bath or kitchen)",
      type: "number",
      defaultImperial: 2,
      min: 0,
      step: 1,
      help: "Each sink: 1-2 DFU",
    },
    {
      id: "showers",
      label: "Showers / tubs",
      type: "number",
      defaultImperial: 1,
      min: 0,
      step: 1,
      help: "Each shower: 2 DFU, tub: 2 DFU",
    },
    {
      id: "washers",
      label: "Washing machines",
      type: "number",
      defaultImperial: 0,
      min: 0,
      step: 1,
      help: "Each washer: 3 DFU",
    },
    {
      id: "dishwashers",
      label: "Dishwashers",
      type: "number",
      defaultImperial: 1,
      min: 0,
      step: 1,
      help: "Each: 2 DFU",
    },
    {
      id: "pipeType",
      label: "Pipe run type",
      type: "select",
      defaultImperial: "horizontal",
      options: [
        { label: "Horizontal branch", value: "horizontal" },
        { label: "Vertical stack", value: "vertical" },
        { label: "Building drain (to sewer)", value: "building" },
      ],
    },
  ],

  calculate: (values) => {
    const toilets = Number(values.toilets) || 0;
    const sinks = Number(values.sinks) || 0;
    const showers = Number(values.showers) || 0;
    const washers = Number(values.washers) || 0;
    const dishwashers = Number(values.dishwashers) || 0;
    const pipeType = String(values.pipeType || "horizontal");

    // DFU per fixture (IPC 2021 Table 709.1 residential private use)
    const dfuToilets = toilets * 4;
    const dfuSinks = sinks * 1.5;
    const dfuShowers = showers * 2;
    const dfuWashers = washers * 3;
    const dfuDishwashers = dishwashers * 2;

    const totalDfu = dfuToilets + dfuSinks + dfuShowers + dfuWashers + dfuDishwashers;

    // IPC Table 710.1(1) / 710.1(2) max DFU per pipe size
    // Horizontal branch at 1/4"/ft slope:
    //   1.5" = 3 DFU, 2" = 6, 2.5" = 12, 3" = 20, 4" = 160
    // Vertical stack:
    //   1.5" = 4, 2" = 10, 2.5" = 20, 3" = 48, 4" = 240
    // Building drain at 1/4"/ft slope:
    //   2" = 21, 3" = 42, 4" = 216

    let recommendedSize: string;
    let maxDfu: number;

    if (pipeType === "horizontal") {
      if (totalDfu <= 3) { recommendedSize = "1.5\""; maxDfu = 3; }
      else if (totalDfu <= 6) { recommendedSize = "2\""; maxDfu = 6; }
      else if (totalDfu <= 12) { recommendedSize = "2.5\""; maxDfu = 12; }
      else if (totalDfu <= 20) { recommendedSize = "3\""; maxDfu = 20; }
      else { recommendedSize = "4\""; maxDfu = 160; }
    } else if (pipeType === "vertical") {
      if (totalDfu <= 4) { recommendedSize = "1.5\""; maxDfu = 4; }
      else if (totalDfu <= 10) { recommendedSize = "2\""; maxDfu = 10; }
      else if (totalDfu <= 20) { recommendedSize = "2.5\""; maxDfu = 20; }
      else if (totalDfu <= 48) { recommendedSize = "3\""; maxDfu = 48; }
      else { recommendedSize = "4\""; maxDfu = 240; }
    } else {
      // building drain
      if (totalDfu <= 21) { recommendedSize = "2\""; maxDfu = 21; }
      else if (totalDfu <= 42) { recommendedSize = "3\""; maxDfu = 42; }
      else { recommendedSize = "4\""; maxDfu = 216; }
    }

    // Special rule: any line with toilets needs ≥ 3" (toilet flush requires 3" min)
    if (toilets > 0) {
      const sizeNum = parseFloat(recommendedSize);
      if (sizeNum < 3) {
        recommendedSize = "3\" (required by toilet rule)";
      }
    }

    const utilizationPct = (totalDfu / maxDfu) * 100;

    return {
      value: parseFloat(recommendedSize),
      unit: recommendedSize,
      valueRounded: parseFloat(recommendedSize),
      breakdown: [
        { label: "total DFU", value: `${totalDfu}` },
        { label: "pipe type", value: pipeType },
        { label: "recommended", value: recommendedSize },
        { label: "at capacity", value: `${formatNumber(Math.round(utilizationPct))}% of max` },
      ],
      formulaSteps: [
        `DFU by fixture:`,
        `  ${toilets} toilets × 4 = ${dfuToilets}`,
        `  ${sinks} sinks × 1.5 = ${dfuSinks}`,
        `  ${showers} showers/tubs × 2 = ${dfuShowers}`,
        `  ${washers} washers × 3 = ${dfuWashers}`,
        `  ${dishwashers} dishwashers × 2 = ${dfuDishwashers}`,
        `total DFU = ${totalDfu}`,
        `pipe type: ${pipeType}`,
        `recommended size = ${recommendedSize}`,
        toilets > 0 ? `toilet rule: minimum 3" for any line carrying toilet waste` : "",
        `utilization: ${totalDfu} ÷ ${maxDfu} = ${Math.round(utilizationPct)}%`,
      ].filter(Boolean) as string[],
    };
  },

  ContentExpansion: DrainPipeCalculatorExpansion,

  formulaDescription:
    "total DFU = sum(fixtures × DFU rating); pipe size per IPC/UPC tables (toilet line ≥ 3\")",

  methodology: [
    "DFU (Drainage Fixture Units) is a standardized measure of drain loading developed by plumbing engineers. Each fixture contributes a specific DFU value reflecting typical discharge rate and volume: water closets (toilets) 4 DFU, bathroom sinks 1 DFU, kitchen sinks 2 DFU, showers 2 DFU, tubs 2 DFU, washers 3 DFU, dishwashers 2 DFU. The calculator uses averages for private residential use per IPC 2021 Table 709.1.",
    "Total DFU on a branch determines the minimum pipe size per IPC Table 710.1. Horizontal branches at standard 1/4\" per foot slope: 1.5\" handles 3 DFU, 2\" handles 6 DFU, 3\" handles 20 DFU, 4\" handles 160 DFU. Vertical stacks have different ratings because gravity assists flow — they handle more DFU at the same diameter.",
    "Building drains (the pipe from the building to the sewer or septic tank) follow their own table because they handle longer runs with less vertical assist. A 3\" building drain handles up to 42 DFU — enough for a 2-bathroom house. A 4\" drain handles up to 216 DFU — typical for larger homes or commercial buildings.",
    "A critical rule: any pipe carrying toilet waste must be at least 3 inches in diameter. This is not DFU-based — it's a fixed requirement because toilet waste physically requires the larger pipe to prevent clogging. The calculator applies this automatically when toilets are present.",
    "This calculator estimates pipe size for typical residential bathroom and kitchen branches. Real plumbing design also considers: vent sizing (vents are typically 1.5\" or 2\"), trap arm length limits (distance from trap to vent), fixture unit offsets and changes in direction, horizontal vs vertical transitions, and local code variations. A proper plumbing design follows IPC or UPC with cross-checks for all these factors.",
    "Not captured: combined building sewer sizing (includes gray water), cleanout locations, slope requirements (1/4\" per foot for 4\" pipe, 1/8\" per foot for 4\"+ pipe), vent requirements, or hydraulic calculations for pressurized systems. For rough-in planning this tool is useful; for permit-ready plans, hire a licensed plumber.",
  ],

  sources: [
    {
      name: "IPC 2021 — Drainage Fixture Units",
      url: "https://codes.iccsafe.org/content/IPC2021P1",
      note: "International Plumbing Code official DFU table",
    },
    {
      name: "UPC 2021 — Drainage System Design",
      url: "https://www.iapmo.org/",
      note: "Uniform Plumbing Code reference",
    },
  ],

  related: [
    { name: "Water heater calculator", slug: "water-heater-calculator", description: "Tank gallons or tankless GPM" },
    { name: "Wire size calculator", slug: "wire-size-calculator", description: "AWG for any circuit" },
    { name: "Heat pump calculator", slug: "heat-pump-calculator", description: "Heating and cooling tonnage" },
    { name: "Vanity calculator", slug: "vanity-calculator", description: "Size a bathroom vanity" },
  ],

  faq: [
    {
      question: "What size drain pipe do I need for a bathroom?",
      answer:
        "Standard full bathroom (toilet + sink + shower) = 8 DFU total. For a horizontal branch: 3\" pipe required (toilet rule). Without a toilet, 2\" pipe handles up to 6 DFU. For a half bath (toilet + sink) alone: still 3\" minimum because of the toilet. Use the calculator above for exact DFU totals.",
    },
    {
      question: "Why does a toilet always need 3-inch pipe?",
      answer:
        "Solid waste. A 1.5\" or 2\" pipe physically can't reliably pass a toilet discharge without clogging — the waste simply doesn't fit, regardless of slope or flow rate. This is a fixed rule in all plumbing codes; no DFU math changes it. Some ultra-low-flow toilets advertise 2\" drain compatibility, but most local codes still require 3\".",
    },
    {
      question: "What's the difference between a horizontal branch and a stack?",
      answer:
        "Horizontal branch: runs sideways across a joist bay, collecting fixtures on one floor. Limited capacity because gravity doesn't help flow much at 1/4\" per foot slope. Vertical stack: runs up-down through the building, collecting fixtures on multiple floors. Higher capacity because gravity assists flow. Building drain: the main line leaving the building to the sewer or septic, handles the whole house.",
    },
    {
      question: "How is DFU different from GPM?",
      answer:
        "DFU (drainage fixture units) is a loading unit for sizing drains — it accounts for fixture use frequency and typical volume. GPM (gallons per minute) is a flow rate measurement for supply piping. They're related but different: a toilet is 4 DFU for drain sizing, but when flushing actually delivers 3-4 GPM for a few seconds. DFU is the design standard for drain pipes.",
    },
    {
      question: "What about kitchen sinks with garbage disposals?",
      answer:
        "Standard residential kitchen sink: 2 DFU. Adding a disposal doesn't change the DFU. The 2\" drain that's standard for kitchen sinks handles both a sink and a disposal fine. Where things get tight: double-bowl sinks with two disposals and a dishwasher — still under 4 DFU, still 2\" pipe, but tight. Most plumbers run 2\" for kitchens regardless.",
    },
    {
      question: "Do floor drains count as DFU?",
      answer:
        "Yes, depending on use. Basement laundry floor drain: 2 DFU. Garage floor drain: 3 DFU (because it drains larger volumes and may include sediment). Bathroom floor drain: 1 DFU. The calculator doesn't have a floor drain input — if you have one, add it as a shower (2 DFU) for a close approximation.",
    },
    {
      question: "What's the slope requirement for drain pipes?",
      answer:
        "Standard for 4\" and smaller: 1/4\" per foot (2%). For 6\" and larger: 1/8\" per foot (1%). Too steep (over 1/2\" per foot) causes water to run ahead of solids, leaving solids behind. Too shallow causes solids to settle. Both lead to clogs. Always aim for the code minimum, never exceed it significantly.",
    },
    {
      question: "Do I need a permit?",
      answer:
        "Yes — virtually all plumbing work requires permits and inspections. DIY is permitted in most jurisdictions for homeowners on their own properties, but the work must pass inspection. Plumbing permit fees typically $100-500 depending on scope. Inspectors check pipe sizing, slope, venting, cleanouts, and fixture connections. Don't skip this step — failed inspections mean tearing out walls.",
    },
  ],
};
