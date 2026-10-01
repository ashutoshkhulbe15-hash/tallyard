import type { CalculatorConfig } from "@/lib/types";
import { formatNumber, round, ceilQuantity } from "@/lib/format";

const sizes: Record<string, { thickness: number; width: number }> = {
  "1x4": { thickness: 1, width: 4 }, "1x6": { thickness: 1, width: 6 }, "1x8": { thickness: 1, width: 8 }, "1x12": { thickness: 1, width: 12 },
  "2x2": { thickness: 2, width: 2 }, "2x4": { thickness: 2, width: 4 }, "2x6": { thickness: 2, width: 6 }, "2x8": { thickness: 2, width: 8 }, "2x10": { thickness: 2, width: 10 }, "2x12": { thickness: 2, width: 12 },
  "4x4": { thickness: 4, width: 4 }, "4x6": { thickness: 4, width: 6 }, "6x6": { thickness: 6, width: 6 },
};

export const lumberCalculatorConfig: CalculatorConfig = {
  slug: "lumber-calculator",
  title: "Lumber Board-Foot and Lineal-Length Worksheet",
  description: "Calculate nominal board-foot and lineal-foot totals from a selected size, length, quantity, and optional user-selected allowance. No price or weight estimate.",
  categoryLabel: "Lumber",
  category: "drywall",
  bannerHeadline: "Convert dimensions to quantity.",
  bannerTags: ["Nominal dimensions", "Board feet", "No price or weight"],
  inputs: [
    { id: "size", label: "Nominal board size", type: "select", defaultImperial: "2x4", options: Object.keys(sizes).map((size) => ({ label: size.replace("x", " × "), value: size })) },
    { id: "length", label: "Length per board", type: "number", unitImperial: "ft", unitMetric: "ft", defaultImperial: 8, defaultMetric: 8, min: 0.01, step: 0.5 },
    { id: "quantity", label: "Entered board count", type: "number", defaultImperial: 1, defaultMetric: 1, min: 1, step: 1 },
    { id: "allowance", label: "User-selected planning allowance", type: "select", defaultImperial: "0", options: [
      { label: "0%", value: "0" }, { label: "5%", value: "5" }, { label: "10%", value: "10" }, { label: "15%", value: "15" },
    ] },
  ],
  calculate: (values) => {
    const size = String(values.size);
    const dims = sizes[size];
    const length = Number(values.length);
    const quantity = Number(values.quantity);
    const allowance = Number(values.allowance);
    if (!dims || ![length, quantity, allowance].every(Number.isFinite) || length <= 0 || quantity <= 0 || !Number.isInteger(quantity) || ![0, 5, 10, 15].includes(allowance)) {
      throw new Error("Enter a valid listed nominal size, positive length and whole-board count, and a listed allowance.");
    }
    const adjustedCount = ceilQuantity(quantity * (1 + allowance / 100));
    const boardFeetEach = dims.thickness * dims.width * length / 12;
    const totalBoardFeet = boardFeetEach * adjustedCount;
    const linealFeet = length * adjustedCount;
    return {
      value: round(totalBoardFeet, 2),
      unit: "nominal board feet",
      valueRounded: round(totalBoardFeet, 1),
      breakdown: [
        { label: "board count after allowance", value: `${adjustedCount}` },
        { label: "nominal board feet per piece", value: `${formatNumber(round(boardFeetEach, 3))}` },
        { label: "total nominal board feet", value: `${formatNumber(round(totalBoardFeet, 2))}` },
        { label: "total lineal length", value: `${formatNumber(round(linealFeet, 2))} ft` },
        { label: "weight and cost", value: "not estimated" },
      ],
      formulaSteps: [
        `adjusted count = ceil(${quantity} × (1 + ${allowance}%)) = ${adjustedCount}`,
        `board feet each = ${dims.thickness} in × ${dims.width} in × ${length} ft ÷ 12 = ${round(boardFeetEach, 3)}`,
        `total board feet = ${round(boardFeetEach, 3)} × ${adjustedCount} = ${round(totalBoardFeet, 2)}`,
        `lineal feet = ${length} ft × ${adjustedCount} = ${round(linealFeet, 2)} ft`,
        "Board-foot arithmetic uses nominal dimensions. Actual surfaced dimensions, grade, moisture, treatment, suitability, weight, and price are not assessed.",
      ],
    };
  },
  formulaDescription: "board feet = nominal thickness × nominal width × length in feet ÷ 12 × adjusted board count",
  methodology: ["Select a nominal size, enter board length and count, then choose whether to apply an allowance. The traditional board-foot calculation uses nominal dimensions and one board foot equals 1-inch thickness × 12-inch width × 1-foot length.", "This worksheet does not estimate actual surfaced dimensions, structural capacity, species density, treated-lumber moisture, price, grade, or whether lumber is suitable for a project. Verify exact stock and project specifications with the supplier or qualified designer."],
  sources: [],
  related: [
    { name: "Deck board area estimator", slug: "deck-calculator", description: "Surface area and rough board count from entered assumptions" },
    { name: "Shed surface estimator", slug: "shed-calculator", description: "Limited surface geometry, not a material takeoff" },
  ],
  faq: [
    { question: "Does this give a lumber price or shipping weight?", answer: "No. It calculates nominal board feet and lineal length only. Price and weight depend on exact stock and supplier data." },
    { question: "Are board feet based on actual or nominal dimensions?", answer: "The displayed board-foot arithmetic uses the selected nominal size. Actual surfaced dimensions can differ." },
  ],
};
