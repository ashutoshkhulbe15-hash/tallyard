import { ShedCalculatorExpansion } from "@/content/shed-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber, ceilQuantity } from "@/lib/format";

const SQ_FT_PER_SHEET = 32;
const SQ_M_PER_SHEET = SQ_FT_PER_SHEET * 0.092903;
const PITCH_FACTOR_6_12 = Math.sqrt(1 + (6 / 12) ** 2);

export const shedCalculatorConfig: CalculatorConfig = {
  ContentExpansion: ShedCalculatorExpansion,
  slug: "shed-calculator",
  title: "Shed Calculator",
  description:
    "Estimate floor, wall, and simple gable-roof sheathing quantities from dimensions. This is an area takeoff, not a framing plan or structural design.",
  categoryLabel: "Lumber",
  category: "drywall",
  bannerHeadline: "Estimate shed surfaces.",
  bannerTags: ["Floor · walls · roof", "6/12 gable assumption", "Preliminary area takeoff"],
  inputs: [
    {
      id: "length",
      label: "Shed length",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 10,
      defaultMetric: 3,
      min: 4,
      step: 1,
    },
    {
      id: "width",
      label: "Shed width",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 8,
      defaultMetric: 2.4,
      min: 4,
      step: 1,
    },
    {
      id: "wallHeight",
      label: "Wall height",
      type: "select",
      defaultImperial: 8,
      options: [
        { label: "6 ft (1.8 m)", value: 6 },
        { label: "8 ft (2.4 m)", value: 8 },
        { label: "10 ft (3 m)", value: 10 },
      ],
      help: "Selection values are feet in both unit modes.",
    },
  ],

  calculate: (values, units) => {
    const length = Number(values.length) || 0;
    const width = Number(values.width) || 0;
    const wallHeightFt = Number(values.wallHeight) || 8;
    const metric = units === "metric";
    const lengthFt = metric ? length / 0.3048 : length;
    const widthFt = metric ? width / 0.3048 : width;
    const wallHeight = metric ? wallHeightFt * 0.3048 : wallHeightFt;
    const floorArea = length * width;
    const perimeter = 2 * (length + width);
    const gableArea = (width * width) / 4; // two triangular ends, 6/12 pitch
    const wallArea = perimeter * wallHeight + gableArea;
    const roofArea = floorArea * PITCH_FACTOR_6_12;
    const sheetArea = metric ? SQ_M_PER_SHEET : SQ_FT_PER_SHEET;
    const areaUnit = metric ? "m²" : "ft²";
    const allowance = 1.1;
    const floorSheets = ceilQuantity((floorArea * allowance) / sheetArea);
    const wallSheets = ceilQuantity((wallArea * allowance) / sheetArea);
    const roofSheets = ceilQuantity((roofArea * allowance) / sheetArea);
    const shingleBundles = ceilQuantity(((roofArea * (metric ? 10.7639 : 1)) / 100) * 3 * allowance);

    return {
      value: round(floorArea, 2),
      unit: metric ? "m² footprint" : "ft² footprint",
      valueRounded: round(floorArea, 1),
      breakdown: [
        { label: "floor area", value: `${formatNumber(round(floorArea, 2))} ${areaUnit}` },
        { label: "floor sheathing (4×8 nominal)", value: `${floorSheets} sheets, with 10% allowance` },
        { label: "wall area incl. gable ends", value: `${formatNumber(round(wallArea, 2))} ${areaUnit}` },
        { label: "wall sheathing (4×8 nominal)", value: `${wallSheets} sheets, with 10% allowance` },
        { label: "roof area before overhangs", value: `${formatNumber(round(roofArea, 2))} ${areaUnit}` },
        { label: "roof sheathing (4×8 nominal)", value: `${roofSheets} sheets, with 10% allowance` },
        { label: "shingles", value: `about ${shingleBundles} bundles; verify package coverage` },
      ],
      formulaSteps: [
        `floor area = ${length} × ${width} = ${formatNumber(round(floorArea, 2))} ${areaUnit}`,
        `wall area = perimeter × wall height + two 6/12 gable triangles = ${formatNumber(round(wallArea, 2))} ${areaUnit}`,
        `roof area = floor area × ${formatNumber(round(PITCH_FACTOR_6_12, 3))} (6/12 pitch; no overhang) = ${formatNumber(round(roofArea, 2))} ${areaUnit}`,
        `sheet estimates = area × 1.10 allowance ÷ ${formatNumber(round(sheetArea, 3))} ${areaUnit} per nominal 4×8 sheet, rounded up`,
        `shingle bundles assume 3 bundles per 100 ft² and a 10% allowance; verify the selected product`,
        `dimensions converted to feet for reference: ${formatNumber(round(lengthFt, 2))} × ${formatNumber(round(widthFt, 2))} ft; wall height ${wallHeightFt} ft`,
      ],
    };
  },

  formulaDescription:
    "surface areas from footprint and wall height; nominal sheathing sheets = area × 1.10 ÷ 32 ft², rounded up",
  methodology: [
    "This estimator returns surface areas and preliminary sheet quantities only. It assumes a rectangular footprint, vertical walls, two triangular gable ends, and a 6/12 gable roof with no overhang. A 10% material allowance is selected for the sheet estimates; actual waste varies with layout and cuts.",
    "It does not size studs, joists, rafters, headers, beams, foundations, connectors, or fasteners. It does not account for doors, windows, openings, structural loads, local code, product-specific panel installation, or site conditions. Do not use it as a framing plan or construction approval.",
    "Shingle bundles use a generic 3-bundle-per-100-square-foot assumption plus 10%; packaging coverage varies. Follow the selected manufacturer's coverage and installation instructions.",
  ],
  sources: [
    {
      name: "APA: Engineered Wood Construction Guide",
      url: "https://www.apawood.org/publication-search",
      note: "Consult the panel grade, span rating, and installation requirements for the selected sheathing product.",
    },
  ],
  related: [
    { name: "Roofing calculator", slug: "roofing-calculator", description: "Estimate roof covering from roof dimensions and pitch" },
    { name: "Lumber calculator", slug: "lumber-calculator", description: "Convert known lumber dimensions to board feet" },
  ],
  faq: [
    {
      question: "Does this give me a complete shed material list?",
      answer: "No. It estimates surface areas, sheathing sheets, and a rough shingle bundle count for one simple 6/12 gable geometry. It does not calculate framing, openings, foundation, connectors, fasteners, or code requirements.",
    },
    {
      question: "Can I use this estimate for a lean-to or gambrel roof?",
      answer: "No. The roof estimate assumes a 6/12 gable roof. Other roof forms need their actual dimensions and geometry measured separately.",
    },
    {
      question: "Does the estimate include doors and windows?",
      answer: "No. Openings are not deducted from wall area, and their framing requirements are not calculated. Verify quantities against measured plans and product requirements.",
    },
    {
      question: "Do I need a permit to build a shed?",
      answer: "Permit, zoning, setback, and association rules vary by location and project. Confirm current requirements with your local building department before construction.",
    },
  ],
};
