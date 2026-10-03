import { CountertopCalculatorExpansion } from "@/content/countertop-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber, ceilQuantity } from "@/lib/format";

export const countertopCalculatorConfig: CalculatorConfig = {
  ContentExpansion: CountertopCalculatorExpansion,
  slug: "countertop-calculator",
  title: "Countertop Calculator",
  description:
    "Estimate countertop surface area and a separate island preset from simple measurements. This is not a fabrication or slab-order plan.",
  categoryLabel: "Flooring",
  category: "flooring",

  bannerHeadline: "Top cleanly.",
  bannerTags: ["Kitchen or bath", "ft² + linear ft", "Any depth"],

  inputs: [
    {
      id: "linearFt",
      label: "Counter linear feet",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 18,
      defaultMetric: 5.5,
      min: 1,
      step: 0.5,
      help: "Enter the combined measured length of the counter sections being estimated.",
    },
    {
      id: "depth",
      label: "Counter depth",
      type: "select",
      defaultImperial: 25.5,
      options: [
        { label: '22" (bath vanity)', value: 22 },
        { label: '25.5" (kitchen standard)', value: 25.5 },
        { label: '30" (deep kitchen)', value: 30 },
        { label: '42" (island with overhang)', value: 42 },
      ],
      help: "Choose the measured depth. Island dimensions can be entered as a separate preset below.",
    },
    {
      id: "island",
      label: "Include island",
      type: "select",
      defaultImperial: "no",
      options: [
        { label: "No", value: "no" },
        { label: "Small (4×2 ft)", value: "small" },
        { label: "Medium (6×3 ft)", value: "medium" },
        { label: "Large (8×4 ft)", value: "large" },
      ],
    },
    {
      id: "waste",
      label: "Waste factor",
      type: "select",
      defaultImperial: 10,
      options: [
        { label: "10%", value: 10 },
        { label: "15%", value: 15 },
        { label: "20%", value: 20 },
      ],
    },
  ],

  calculate: (values, units) => {
    const linearFtInput = Number(values.linearFt) || 0;
    const depthIn = Number(values.depth) || 25.5;
    const islandSize = String(values.island || "no");
    const waste = Number(values.waste) || 10;

    const linearFt = units === "metric" ? linearFtInput * 3.281 : linearFtInput;

    // Main counter area
    const mainArea = linearFt * (depthIn / 12);

    // Island additions
    const islandAreas: Record<string, { area: number; edges: number }> = {
      no: { area: 0, edges: 0 },
      small: { area: 8, edges: 12 },
      medium: { area: 18, edges: 18 },
      large: { area: 32, edges: 24 },
    };
    const island = islandAreas[islandSize] || islandAreas["no"];
    const islandArea = island.area;
    const islandLinearEdge = island.edges;

    // Total area
    const rawArea = mainArea + islandArea;
    const areaWithWaste = rawArea * (1 + waste / 100);

    // Total linear edge (for edge treatments, backsplash planning)
    // Main counter edge: linearFt (front) + depth/12 × 2 ends (if counters are rectangles)
    // Simplified: edge = linearFt (front) + islandLinearEdge (full perimeter)
    const totalLinearEdge = linearFt + islandLinearEdge;

    const areaFactor = units === "metric" ? 0.092903 : 1;
    const lengthFactor = units === "metric" ? 0.3048 : 1;
    const areaUnit = units === "metric" ? "m²" : "ft²";
    const lengthUnit = units === "metric" ? "m" : "ft";
    const displayArea = areaWithWaste * areaFactor;
    const displayMainArea = mainArea * areaFactor;
    const displayIslandArea = islandArea * areaFactor;
    const displayEdge = totalLinearEdge * lengthFactor;

    return {
      value: round(displayArea, 1),
      unit: areaUnit,
      valueRounded: ceilQuantity(displayArea),
      breakdown: [
        { label: "main counter", value: `${formatNumber(round(displayMainArea, 1))} ${areaUnit}` },
        ...(islandArea > 0
          ? [{ label: "island preset", value: `${formatNumber(round(displayIslandArea, 1))} ${areaUnit}` }]
          : []),
        { label: "linear edge", value: `${formatNumber(round(displayEdge, 1))} ${lengthUnit}` },
      ],
      formulaSteps: [
        `main area = ${formatNumber(round(linearFt, 1))} ft × ${depthIn}"/12 = ${formatNumber(round(mainArea, 1))} ft²`,
        islandArea > 0
          ? `island (${islandSize}) = ${islandArea} ft² with ${islandLinearEdge} ft edge`
          : "island: none",
        `raw area = ${formatNumber(round(mainArea, 1))} + ${islandArea} = ${formatNumber(round(rawArea, 1))} ft²`,
        `with ${waste}% waste = ${formatNumber(round(rawArea, 1))} × ${(1 + waste / 100).toFixed(2)} = ${formatNumber(round(areaWithWaste, 1))} ft²`,
        `linear edge = ${formatNumber(round(linearFt, 1))} (main front) + ${islandLinearEdge} (island) = ${formatNumber(round(totalLinearEdge, 1))} ft`,
      ],
      composition: {
        unit: areaUnit,
        total: round(displayArea, 1),
        segments: [
          { label: "Main counter", amount: round(displayMainArea, 1), shade: "primary" },
          ...(islandArea > 0
            ? [{ label: "Island preset", amount: round(displayIslandArea, 1), shade: "secondary" as const }]
            : []),
          {
            label: "Waste buffer",
            amount: round((areaWithWaste - rawArea) * areaFactor, 1),
            shade: "tertiary",
          },
        ],
      },
    };
  },

  formulaDescription:
    "area = (linear ft × depth) + island + waste; linear edge = main front + island perimeter",

  methodology: [
    "Kitchen counter area is linear feet (front edge) times depth. Standard kitchen counters are 25.5 inches deep, just under 2.125 linear feet. A 20-foot run of kitchen counter has 42.5 square feet of surface. Bathroom vanities use 22-inch depth typically.",
    "Island presets represent simplified rectangular surface-area assumptions. Enter the actual island dimensions and overhangs in a project plan; the preset is not a fabrication template.",
    "The waste percentage is an editable planning allowance, not a universal fabrication standard. A fabricator should determine slab layout, seams, cutouts, edge details, and order quantity from a measured template.",
    "This calculator does not estimate material costs, slab count, cutouts, edge treatments, or installation. Request a current itemized quote based on a final template.",
  ],

  sources: [
    {
      name: "Natural Stone Institute: DSDM Chapter 17 — Stone Counter and Lavatory Tops",
      url: "https://pubs.naturalstoneinstitute.org/resources/library/?cat1=25&event=getAdvancedSearch&gosearch=1&mode=advancedSearch",
      note: "Industry reference covering field measurements, countertop details, cutouts, seams, and support; this calculator does not create a fabrication template.",
    },
    {
      name: "Natural Stone Institute: Dimension Stone Design Manual",
      url: "https://pubs.naturalstoneinstitute.org/resources/library/",
      note: "Thickness standards, overhang limits, and support requirements for stone tops",
    },
    {
      name: "NKBA: Kitchen Planning Guidelines",
      url: "https://kb.nkba.org/info/kitchen-bath-planning-guidelines/",
      note: "Standard counter depths, island clearances, and seating overhang dimensions",
    },
    {
      name: "ASTM C615: Standard Specification for Granite Dimension Stone",
      url: "https://www.astm.org/c0615_c0615m-18e01.html",
      note: "The material standard granite slabs are graded against",
    },
    {
      name: "ISFA: Engineered Stone Fabrication Guidance",
      url: "https://www.isfanow.org/",
      note: "Quartz handling, seaming, and heat tolerance practice",
    },
  ],

  related: [
    { name: "Backsplash calculator", slug: "backsplash-calculator", description: "Kitchen tile above counter" },
    { name: "Vanity calculator", slug: "vanity-calculator", description: "Size a bathroom vanity" },
    { name: "Tile calculator", slug: "tile-calculator", description: "Floor and wall tile" },
    { name: "Kitchen cabinet calculator", slug: "kitchen-cabinet-calculator", description: "The cabinet run your new counter sits on" },
  ],

  faq: [
    {
      question: "How do I estimate countertop surface area?",
      answer:
        "For a simple rectangular run, multiply its length by its depth, then add separate pieces such as islands. This is a planning estimate only; counters often have varying depths, cutouts, seams, and overhangs.",
    },
    {
      question: "How do I measure my kitchen counters?",
      answer:
        "Measure the front edge of each counter section in linear feet: the stove run, the sink run, any peninsula or island edge. Sum them. Don't double-count corners, an L-shaped kitchen with 8 ft along one wall and 6 ft along the other is 14 linear feet, not 15. The calculator needs this total linear figure.",
    },
    {
      question: "Why does the waste factor apply to countertops?",
      answer:
        "The selected percentage is only a user-controlled planning allowance. Actual material ordering depends on the material, dimensions, seam and cutout layout, and fabricator's nesting plan.",
    },
    {
      question: "What about an island overhang for seating?",
      answer:
        "Use the actual island dimensions, including any seating overhang, in your measurements. Support requirements depend on material, thickness, span, and the fabricator or engineer's details.",
    },
    {
      question: "Do I need to account for the backsplash?",
      answer:
        "A separate backsplash is not included in this estimate. Measure it independently; the backsplash calculator can help estimate its area.",
    },
    {
      question: "Can I install countertops myself?",
      answer:
        "Installation methods and handling risks depend on the material and product. Follow manufacturer instructions and use qualified fabricators/installers for heavy, cut-to-fit, or high-risk work.",
    },
  ],
};
