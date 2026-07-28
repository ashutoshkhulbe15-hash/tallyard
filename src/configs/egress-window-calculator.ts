import { EgressWindowExpansion } from "@/content/egress-window-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const egressWindowCalculatorConfig: CalculatorConfig = {
  slug: "egress-window-calculator",
  title: "Egress Window Calculator",
  description:
    "Check a window against IRC R310 egress requirements: net clear opening, minimum width and height, and sill height, with a pass or fail verdict and the fix if it falls short.",
  categoryLabel: "Windows",
  category: "drywall",

  bannerHeadline: "Check the exit.",
  bannerTags: ["IRC R310 checks", "Pass / fail verdict", "Window well rules"],

  inputs: [
    {
      id: "clearWidth",
      label: "Net clear opening width",
      type: "number",
      unitImperial: "in",
      defaultImperial: 32,
      min: 10,
      step: 0.5,
      help: "The actual open width with the window fully open. From the manufacturer's egress spec sheet, not the glass or frame size.",
    },
    {
      id: "clearHeight",
      label: "Net clear opening height",
      type: "number",
      unitImperial: "in",
      defaultImperial: 26,
      min: 10,
      step: 0.5,
      help: "The actual open height with the window fully open. On a double-hung, only the open half counts.",
    },
    {
      id: "floorLevel",
      label: "Floor location",
      type: "select",
      defaultImperial: 5.7,
      options: [
        { label: "Basement or upper floor (5.7 sq ft min)", value: 5.7 },
        { label: "Grade-level floor (5.0 sq ft min)", value: 5.0 },
      ],
      help: "IRC R310 allows the smaller 5.0 sq ft opening only where the sill is at or below grade level",
    },
    {
      id: "sillHeight",
      label: "Sill height above floor",
      type: "number",
      unitImperial: "in",
      defaultImperial: 40,
      min: 0,
      step: 1,
      help: "Finished floor to the top of the sill. R310 caps this at 44 inches so the window can be climbed out of.",
    },
  ],

  calculate: (values) => {
    const w = Number(values.clearWidth) || 32;
    const h = Number(values.clearHeight) || 26;
    const minArea = Number(values.floorLevel) || 5.7;
    const sill = Number(values.sillHeight) || 40;

    const area = (w * h) / 144;
    const widthOk = w >= 20;
    const heightOk = h >= 24;
    const areaOk = area >= minArea;
    const sillOk = sill <= 44;
    const pass = widthOk && heightOk && areaOk && sillOk;

    // Minimum compliant height at this width (and width at this height) if area fails
    const needH = Math.max(24, Math.ceil(((minArea * 144) / w) * 10) / 10);
    const needW = Math.max(20, Math.ceil(((minArea * 144) / h) * 10) / 10);

    const breakdown = [
      { label: "required opening", value: `${minArea} sq ft` },
      { label: "clear width", value: `${formatNumber(w)}" ${widthOk ? "(ok, min 20\")" : "(FAILS min 20\")"}` },
      { label: "clear height", value: `${formatNumber(h)}" ${heightOk ? "(ok, min 24\")" : "(FAILS min 24\")"}` },
      { label: "sill height", value: `${formatNumber(sill)}" ${sillOk ? "(ok, max 44\")" : "(FAILS max 44\")"}` },
      { label: "verdict", value: pass ? "MEETS IRC R310" : "DOES NOT MEET R310" },
      ...(!areaOk
        ? [{ label: "to pass at this width", value: `height ≥ ${formatNumber(needH)}"` }]
        : []),
    ];

    return {
      value: round(area, 2),
      unit: "sq ft net clear",
      valueRounded: round(area, 2),
      breakdown,
      formulaSteps: [
        `net clear opening = ${formatNumber(w)}" × ${formatNumber(h)}" ÷ 144 = ${formatNumber(round(area, 2))} sq ft`,
        `required = ${minArea} sq ft (${minArea === 5.0 ? "grade-level floor" : "basement / upper floor"})`,
        `width ${formatNumber(w)}" vs 20" min → ${widthOk ? "pass" : "fail"}`,
        `height ${formatNumber(h)}" vs 24" min → ${heightOk ? "pass" : "fail"}`,
        `sill ${formatNumber(sill)}" vs 44" max → ${sillOk ? "pass" : "fail"}`,
        pass
          ? `verdict: meets IRC R310`
          : `verdict: does not meet R310${!areaOk ? ` (needs ${formatNumber(needW)}" wide or ${formatNumber(needH)}" tall)` : ""}`,
      ],
      composition: {
        unit: "sq in",
        total: Math.max(Math.round(area * 144), Math.round(minArea * 144)),
        segments: [
          { label: "Opening", amount: Math.min(Math.round(area * 144), Math.round(minArea * 144)), shade: "primary" },
          {
            label: area >= minArea ? "Margin" : "Shortfall",
            amount: Math.abs(Math.round(area * 144) - Math.round(minArea * 144)),
            shade: "secondary",
          },
        ],
      },
    };
  },

  ContentExpansion: EgressWindowExpansion,

  formulaDescription:
    "net clear sq ft = width × height ÷ 144, checked against R310: ≥5.7 sq ft (5.0 at grade), width ≥20\", height ≥24\", sill ≤44\"",

  methodology: [
    "All checks follow IRC Section R310 (Emergency Escape and Rescue Openings), which applies to every sleeping room and to basements with habitable space. The net clear opening is the unobstructed area with the window fully open: 5.7 square feet minimum, reduced to 5.0 square feet where the sill is at or below grade level.",
    "The dimensional minimums are independent of the area requirement: 20 inches of clear width and 24 inches of clear height. Meeting both minimums does not by itself meet the area requirement; a 20 by 24 inch opening is only 3.3 square feet. A 20 inch wide opening must be about 41 inches tall to reach 5.7 square feet.",
    "Sill height is limited to 44 inches above the finished floor so the opening can be reached and climbed through. Where the sill sits below grade, R310.2.3 requires a window well with at least 9 square feet of horizontal area and 36 inches of projection, with a permanent ladder or steps when the well is deeper than 44 inches.",
    "Net clear figures come from the window manufacturer's egress spec sheet, not from glass or frame dimensions. Operating style matters: a casement opens its full sash area; a double-hung or slider only opens half.",
    "Local amendments can be stricter than the model code, and replacement windows in existing openings have their own allowances in some jurisdictions. Confirm with the local building department before cutting anything.",
  ],

  sources: [
    {
      name: "IRC Section R310 (ICC Digital Codes)",
      url: "https://codes.iccsafe.org/content/IRC2021P2/chapter-3-building-planning",
      note: "The emergency escape and rescue opening requirements every check on this page implements",
    },
    {
      name: "InterNACHI - Egress Inspection Standards",
      url: "https://www.nachi.org/egress-inspections.htm",
      note: "How inspectors verify net clear opening, sill height, and wells in the field",
    },
    {
      name: "US Fire Administration - Home Escape Planning",
      url: "https://www.usfa.fema.gov/prevention/home-fires/escape-plans/",
      note: "Why the code requires a second way out of every sleeping room",
    },
    {
      name: "DOE - Basement Finishing and Moisture",
      url: "https://www.energy.gov/energysaver/insulation",
      note: "Basement wall assembly guidance for finishing around a new egress unit",
    },
  ],

  related: [
    { name: "Window sizing calculator", slug: "window-sizing-calculator", description: "Rough openings for the window you pick" },
    { name: "Stud spacing calculator", slug: "stud-spacing-calculator", description: "Headers and king studs when enlarging an opening" },
    { name: "Drywall calculator", slug: "drywall-calculator", description: "Finish the basement walls after the window is in" },
    { name: "Insulation calculator", slug: "insulation-calculator", description: "Basement wall R-value for the same project" },
  ],

  howTo: {
    name: "How to check if a window meets egress requirements",
    description: "Verify a window against IRC R310 in five steps, from measuring the net clear opening to the window well rules below grade.",
    steps: [
      { name: "Find the net clear opening", text: "Open the window fully and measure the actual clear width and height of the opening, or pull the manufacturer's egress spec sheet. On double-hung and sliding windows, only the open half counts." },
      { name: "Compute the area", text: "Multiply clear width by clear height in inches and divide by 144. The result must be at least 5.7 square feet, or 5.0 square feet where the sill is at or below grade." },
      { name: "Check the dimensional minimums", text: "Clear width must be at least 20 inches and clear height at least 24 inches, independent of the area. Hitting both bare minimums does not pass the area test." },
      { name: "Measure the sill height", text: "The top of the sill must be no more than 44 inches above the finished floor so the opening can be climbed through without equipment." },
      { name: "Check the well if below grade", text: "A below-grade window needs a well with 9 square feet of floor area projecting 36 inches from the wall, a permanent ladder if deeper than 44 inches, and any cover must open from inside without tools." },
    ],
  },

  faq: [
    {
      question: "What size does an egress window need to be?",
      answer:
        "IRC R310 requires a net clear opening of at least 5.7 square feet (5.0 at grade level), at least 20 inches wide and 24 inches tall, with the sill no more than 44 inches above the floor. Note the minimums don't stack neatly: a 20-inch-wide opening needs about 41 inches of height to reach 5.7 square feet.",
    },
    {
      question: "Does every bedroom need an egress window?",
      answer:
        "Yes. Every sleeping room needs its own emergency escape and rescue opening, and so does a basement containing habitable space. A bedroom without compliant egress is not legally a bedroom, which matters at appraisal and sale: a '3 bedroom' with one non-compliant basement room lists as a 2 bedroom.",
    },
    {
      question: "How much does it cost to add an egress window to a basement?",
      answer:
        "Cutting a new basement egress typically runs $3,500-8,000 installed: concrete sawing, the window itself, framing and lintel, the well with drainage, and permit. Enlarging an existing above-grade opening runs $1,500-3,500. Swapping a compliant-size window into an existing opening is $400-1,200.",
    },
    {
      question: "Do I need a permit for an egress window?",
      answer:
        "Yes, almost everywhere: you are modifying structure and creating a code-required opening, and below grade you are also excavating. Permits run $100-350. This is one of the worst projects to skip permitting on, because non-compliant egress surfaces at every future appraisal and sale.",
    },
    {
      question: "Can a regular window count as an egress window?",
      answer:
        "If its net clear opening meets the numbers, yes; egress is a performance spec, not a product type. In practice casements pass at the smallest overall sizes because the full sash opens clear, while double-hung and sliding windows need to be much larger since only half opens.",
    },
    {
      question: "What are the window well requirements?",
      answer:
        "A well serving an egress window needs at least 9 square feet of horizontal area, must project at least 36 inches from the foundation wall, and needs a permanent ladder or steps if it is deeper than 44 inches. A cover is allowed, but it must open from the inside without keys, tools, or special knowledge.",
    },
    {
      question: "My sill is higher than 44 inches. What are my options?",
      answer:
        "Either lower the opening (cutting the wall down, common in basements) or build a permanent platform or step below the window that effectively brings the floor up, if the local inspector accepts it. Furniture doesn't count. Ask the building department before choosing; some jurisdictions only accept a lowered sill.",
    },
  ],
};
