import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber, ceilQuantity } from "@/lib/format";

export const deckCalculatorConfig: CalculatorConfig = {
  slug: "deck-calculator",
  title: "Decking Board Calculator",
  description:
    "Estimate deck surface area and a rough decking-board quantity for a simple rectangle. This does not size or design the supporting structure.",
  categoryLabel: "Landscaping",
  category: "landscaping",
  bannerHeadline: "Estimate deck boards.",
  bannerTags: ["Surface area", "Straight rectangular deck", "Planning estimate"],
  inputs: [
    {
      id: "length",
      label: "Deck length",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 16,
      defaultMetric: 4.9,
      min: 1,
      step: 1,
    },
    {
      id: "width",
      label: "Deck width",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 12,
      defaultMetric: 3.7,
      min: 1,
      step: 1,
    },
    {
      id: "boardWidth",
      label: "Actual decking-board face width",
      type: "number",
      unitImperial: "in",
      unitMetric: "mm",
      defaultImperial: 5.5,
      defaultMetric: 140,
      min: 1,
      step: 0.25,
      help: "Use the product's actual face width, not its nominal lumber name.",
    },
    {
      id: "gap",
      label: "Gap between boards",
      type: "number",
      unitImperial: "in",
      unitMetric: "mm",
      defaultImperial: 0.125,
      defaultMetric: 3,
      min: 0,
      step: 0.0625,
      help: "Use the decking manufacturer's installation instructions for the required gap.",
    },
    {
      id: "waste",
      label: "Cut/waste allowance",
      type: "select",
      defaultImperial: 10,
      options: [
        { label: "0%", value: 0 },
        { label: "5%", value: 5 },
        { label: "10%", value: 10 },
        { label: "15%", value: 15 },
      ],
    },
  ],
  calculate: (values, units) => {
    const lengthInput = Number(values.length) || 0;
    const widthInput = Number(values.width) || 0;
    const widthBoardInput = Number(values.boardWidth) || (units === "metric" ? 140 : 5.5);
    const gapInput = Number(values.gap) || 0;
    const waste = Number(values.waste) || 0;
    const metric = units === "metric";
    const lengthFt = metric ? lengthInput / 0.3048 : lengthInput;
    const widthFt = metric ? widthInput / 0.3048 : widthInput;
    const boardFaceIn = metric ? widthBoardInput / 25.4 : widthBoardInput;
    const gapIn = metric ? gapInput / 25.4 : gapInput;
    const areaFt2 = lengthFt * widthFt;
    const rowCoverageIn = boardFaceIn + gapIn;
    const rows = ceilQuantity((widthFt * 12) / rowCoverageIn);
    const totalLinearFt = rows * lengthFt;
    const totalWithAllowanceFt = totalLinearFt * (1 + waste / 100);
    const nominal16FtPieces = ceilQuantity(totalWithAllowanceFt / 16);
    const area = metric ? areaFt2 * 0.092903 : areaFt2;
    const areaUnit = metric ? "m²" : "ft²";
    const boardLength = metric ? round(16 * 0.3048, 2) : 16;
    const boardLengthUnit = metric ? "m" : "ft";
    const totalLinear = metric ? totalLinearFt * 0.3048 : totalLinearFt;
    const linearUnit = metric ? "m" : "ft";
    const faceWidth = metric ? widthBoardInput : boardFaceIn;
    const gap = metric ? gapInput : gapIn;
    const faceUnit = metric ? "mm" : "in";

    return {
      value: nominal16FtPieces,
      unit: `nominal ${boardLength}${boardLengthUnit} board${nominal16FtPieces === 1 ? "" : "s"}`,
      valueRounded: nominal16FtPieces,
      breakdown: [
        { label: "deck surface area", value: `${formatNumber(round(area, 1))} ${areaUnit}` },
        { label: "board rows across width", value: `${rows}` },
        { label: "estimated linear decking before allowance", value: `${formatNumber(round(totalLinear, 1))} ${linearUnit}` },
        { label: `nominal ${boardLength}${boardLengthUnit} pieces`, value: `${nominal16FtPieces} (before matching stock lengths and seams)` },
      ],
      formulaSteps: [
        `area = ${lengthInput} × ${widthInput} = ${formatNumber(round(area, 1))} ${areaUnit}`,
        `row coverage = ${faceWidth} ${faceUnit} board face + ${gap} ${faceUnit} gap`,
        `rows = ceil(deck width ÷ row coverage) = ${rows}`,
        `linear decking = rows × deck length = ${formatNumber(round(totalLinear, 1))} ${linearUnit}`,
        `apply selected ${waste}% allowance, then divide by nominal ${boardLength}${boardLengthUnit} stock length = ${nominal16FtPieces} pieces`,
      ],
      composition: {
        unit: areaUnit,
        total: round(area, 1),
        segments: [{ label: "Rectangular deck area", amount: round(area, 1), shade: "primary" }],
      },
    };
  },
  formulaDescription:
    "rows = ceiling(deck width ÷ (actual board face width + selected gap)); rough stock count = ceiling(rows × deck length × (1 + allowance) ÷ 16 ft)",
  methodology: [
    "This is a rough surface-board quantity for a simple rectangle, assuming boards run in the deck-length direction and each row covers the entered board face width plus gap. The nominal stock count assumes 16-foot (4.88 m) pieces; real stock lengths, layout, joints, border boards, picture framing, and cut optimization change the order quantity.",
    "The selected cut/waste allowance is an editable scenario, not a universal standard. Confirm actual board dimensions, spacing/gap, fastening method, and installation details in the specific decking manufacturer's instructions.",
    "This tool does not calculate joists, beams, posts, footings, ledgers, fasteners, stairs, guards, span capacity, permits, or code compliance. It is not a structural design or complete material list. Have the framing designed or reviewed for the site, loads, materials, and locally adopted code.",
  ],
  sources: [
    {
      name: "American Wood Council: Prescriptive Residential Wood Deck Construction Guide",
      url: "https://awc.org/publications/dca6/",
      note: "Reference for structural design; this calculator does not perform those checks.",
    },
  ],
  related: [
    { name: "Concrete calculator", slug: "concrete-calculator", description: "Estimate concrete volume for a separately designed project" },
    { name: "Deck stair calculator", slug: "deck-stair-calculator", description: "Planning estimate for stair geometry; verify code and site conditions" },
  ],
  faq: [
    {
      question: "Does this calculator size the deck frame?",
      answer: "No. It estimates surface area and rough decking-board quantity only. Joists, beams, posts, footings, connections, guards, stairs, and code requirements need a separate site-specific design.",
    },
    {
      question: "How accurate is the board count?",
      answer: "Treat it as an initial planning estimate for a rectangular deck with straight rows. Board lengths, seams, edge details, obstructions, product dimensions, and cutting choices affect the order quantity.",
    },
    {
      question: "What board gap should I enter?",
      answer: "Use the gap specified by the decking manufacturer for that product and installation conditions. This calculator does not determine the correct gap.",
    },
    {
      question: "Can I use this as a complete deck material list?",
      answer: "No. It omits all structural framing, connections, fasteners, stairs, guards, and code or permit checks. Obtain a complete site-specific plan before construction.",
    },
  ],
};
