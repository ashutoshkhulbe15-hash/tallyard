import { StairCalculatorExpansion } from "@/content/stair-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const stairCalculatorConfig: CalculatorConfig = {
  slug: "stair-calculator",
  title: "Stair Calculator",
  description:
    "Stair stringer length, rise, run, and tread count for any height. Meets IRC code limits on rise and tread dimensions.",
  categoryLabel: "Lumber",
  category: "drywall",

  bannerHeadline: "Step safely.",
  bannerTags: ["IRC-compliant", "Stringer + treads", "Any rise"],

  inputs: [
    {
      id: "totalRise",
      label: "Total rise (floor to floor)",
      type: "number",
      unitImperial: "in",
      unitMetric: "cm",
      defaultImperial: 108,
      defaultMetric: 275,
      min: 10,
      step: 1,
      help: "Typical floor-to-floor: 108\" / 275 cm for 9 ft ceilings",
    },
    {
      id: "idealRiser",
      label: "Target riser height",
      type: "select",
      defaultImperial: 7.5,
      options: [
        { label: '7" / 18 cm (shallow)', value: 7 },
        { label: '7.5" / 19 cm (comfortable)', value: 7.5 },
        { label: '7.75" / 20 cm (IRC max)', value: 7.75 },
      ],
      help: "IRC maximum is 7.75\" / 20 cm. 7-7.5\" is most comfortable.",
    },
    {
      id: "treadDepth",
      label: "Tread depth (run)",
      type: "select",
      defaultImperial: 11,
      options: [
        { label: '10" / 25.5 cm (IRC min)', value: 10 },
        { label: '11" / 28 cm (standard)', value: 11 },
        { label: '12" / 30.5 cm (comfortable)', value: 12 },
      ],
      help: "IRC minimum 10\". Deeper treads = more comfortable but longer stair run.",
    },
    {
      id: "stairWidth",
      label: "Stair width",
      type: "number",
      unitImperial: "in",
      unitMetric: "cm",
      defaultImperial: 36,
      defaultMetric: 91,
      min: 24,
      step: 1,
      help: "IRC minimum 36\". Typical residential 36-42\". Wider = more comfortable.",
    },
  ],

  calculate: (values, units) => {
    const totalRise = Number(values.totalRise) || 0;
    const idealRiser = Number(values.idealRiser) || 7.5;
    const treadDepth = Number(values.treadDepth) || 11;
    const stairWidth = Number(values.stairWidth) || 36;

    // Convert to inches if metric
    const totalRiseInches = units === "metric" ? totalRise / 2.54 : totalRise;
    const idealRiserInches = units === "metric" ? idealRiser / 2.54 : idealRiser;
    const treadDepthInches = units === "metric" ? treadDepth / 2.54 : treadDepth;
    const stairWidthInches = units === "metric" ? stairWidth / 2.54 : stairWidth;

    // Number of risers: divide total rise by ideal riser and round
    const rawRisers = totalRiseInches / idealRiserInches;
    const numRisers = Math.round(rawRisers);

    // Actual riser height (equal distribution)
    const actualRiser = totalRiseInches / numRisers;

    // Treads = risers - 1 (last step is the landing/floor)
    const numTreads = numRisers - 1;

    // Total run (horizontal distance)
    const totalRun = numTreads * treadDepthInches;

    // Stringer length (hypotenuse of total rise and total run)
    const stringerLength = Math.sqrt(
      totalRiseInches * totalRiseInches + totalRun * totalRun
    );

    // Check IRC compliance
    const riserIRCOK = actualRiser <= 7.75 && actualRiser >= 4;
    const treadIRCOK = treadDepthInches >= 10;
    const rulePlus = Math.abs(actualRiser * 2 + treadDepthInches - 25); // "rule of 25"
    const compliance =
      riserIRCOK && treadIRCOK
        ? "IRC-compliant"
        : !riserIRCOK
          ? "riser out of range"
          : "tread too shallow";

    const displayRise =
      units === "metric" ? round(actualRiser * 2.54, 1) : round(actualRiser, 3);
    const displayRun =
      units === "metric" ? round(totalRun * 2.54, 1) : round(totalRun, 1);
    const displayStringer =
      units === "metric" ? round(stringerLength * 2.54, 1) : round(stringerLength, 2);
    const lengthUnit = units === "metric" ? "cm" : "in";

    return {
      value: numRisers,
      unit: numRisers === 1 ? "riser" : "risers",
      valueRounded: numRisers,
      breakdown: [
        { label: "treads", value: `${numTreads}` },
        { label: "actual rise", value: `${formatNumber(displayRise)} ${lengthUnit}` },
        { label: "total run", value: `${formatNumber(displayRun)} ${lengthUnit}` },
        { label: "stringer length", value: `${formatNumber(displayStringer)} ${lengthUnit}` },
        { label: "compliance", value: compliance },
      ],
      formulaSteps: [
        `total rise = ${totalRise} ${units === "metric" ? "cm" : "in"}${units === "metric" ? ` (${formatNumber(round(totalRiseInches, 1))}")` : ""}`,
        `ideal riser = ${idealRiser} ${units === "metric" ? "cm" : "in"}${units === "metric" ? ` (${formatNumber(round(idealRiserInches, 2))}")` : ""}`,
        `raw risers = ${formatNumber(round(totalRiseInches, 1))} ÷ ${formatNumber(round(idealRiserInches, 2))} = ${formatNumber(round(rawRisers, 2))}`,
        `risers (rounded) = ${numRisers}`,
        `actual riser = ${formatNumber(round(totalRiseInches, 1))} ÷ ${numRisers} = ${formatNumber(round(actualRiser, 3))}" (${formatNumber(round(actualRiser * 2.54, 1))} cm)`,
        `treads = ${numRisers} − 1 = ${numTreads}`,
        `total run = ${numTreads} × ${treadDepthInches}" = ${formatNumber(round(totalRun, 1))}"`,
        `stringer = √(${formatNumber(round(totalRiseInches, 1))}² + ${formatNumber(round(totalRun, 1))}²) = ${formatNumber(round(stringerLength, 2))}"`,
        `IRC check: riser ≤ 7.75" and ≥ 4"? ${riserIRCOK ? "✓" : "✗"}; tread ≥ 10"? ${treadIRCOK ? "✓" : "✗"}`,
        `rule of 25: 2R + T = ${formatNumber(round(actualRiser * 2 + treadDepthInches, 2))} (target ~24-25)`,
      ],
    };
  },

  ContentExpansion: StairCalculatorExpansion,

  howTo: {
    name: "How to calculate stairs, stringers, rise and run",
    description:
      "Find the number of steps, exact rise and run, stringer length, and stringer count for any staircase from your total floor-to-floor rise.",
    steps: [
      {
        name: "Measure total rise",
        text: "Measure the exact vertical distance from the lower finished floor to the upper finished floor in inches. Every other number depends on this, so be precise.",
      },
      {
        name: "Find the step count",
        text: "Divide total rise by a target riser height (7 to 7.5 inches is the comfortable range) and round up to a whole number. That is your riser count.",
      },
      {
        name: "Get the actual rise and run",
        text: "Divide total rise by the riser count for the actual rise per step, which is now identical across every step. Pair it with a 10 to 11 inch run.",
      },
      {
        name: "Calculate the stringer length",
        text: "Stringer length is the square root of total rise squared plus total run squared. Round up to the next standard 2x12 length.",
      },
      {
        name: "Set the stringer count",
        text: "Use 3 stringers for a 36-inch-wide stair and add one for every 16 to 18 inches of extra width. Add one more if the treads are composite or thin decking.",
      },
    ],
  },

  formulaDescription:
    "risers = round(total rise ÷ ideal riser); treads = risers − 1; stringer = √(rise² + run²)",

  methodology: [
    "The calculator divides total vertical rise by your target riser height and rounds to the nearest whole number, because stair risers must all be equal. Once you know the riser count, actual riser height is total rise divided by that count. A 108-inch total rise targeting 7.5-inch risers gives 14 risers at about 7.71 inches each, close to target and identical across the flight.",
    "The number of treads is always one less than the number of risers, because the last step at the top is the upper floor itself. This is the classic off-by-one: 14 risers means 13 treads.",
    "Total run is treads times tread depth. A 14-riser, 13-tread staircase at 11-inch treads needs 143 inches, nearly 12 feet, of horizontal space. This is the most commonly underestimated dimension when planning a staircase, so measure your available run before committing to a layout.",
    "Stringer length is the hypotenuse of rise and run, from the Pythagorean theorem. Round up to the next standard 2x12 length (8, 10, 12, 14, 16, 20 feet) and add a little for top and bottom mounting.",
    "IRC 2021 R311.7 compliance: riser height up to 7.75 inches with no more than 3/8 inch variation between any two risers, tread depth at least 10 inches, width at least 36 inches, and a stringer throat of at least 3.5 inches after notching. The calculator checks these. Some municipalities are stricter, so verify with your building department before cutting.",
    "The rule of 25 is a carpenter comfort guideline: 2 times the riser plus the tread lands around 24 to 25 inches. A 7.5-inch rise with a 10-inch tread hits 25; a 7-inch rise with an 11-inch tread also hits 25. Most comfortable stairs land near that number.",
  ],

  sources: [
    {
      name: "IRC 2021 Section R311.7: Stairways",
      url: "https://codes.iccsafe.org/content/IRC2021P2/chapter-3-building-planning",
      note: "Riser, tread, width, headroom, and landing requirements",
    },
    {
      name: "AWC: Wood Frame Construction Manual",
      url: "https://awc.org/publications/",
      note: "Stringer sizing and framing standards",
    },
    {
      name: "AWC: Span Tables for Joists and Rafters",
      url: "https://awc.org/codes-standards/publications/stjr-2015",
      note: "Basis for 2x12 stringer spans and spacing",
    },
    {
      name: "IRC 2021 Section R311.7.5: Handrails",
      url: "https://codes.iccsafe.org/content/IRC2021P2/chapter-3-building-planning",
      note: "Handrail height and graspability for stairs",
    },
  ],

  related: [
    { name: "Lumber calculator", slug: "lumber-calculator", description: "Board feet for stringers and treads" },
    { name: "Deck calculator", slug: "deck-calculator", description: "Boards, joists, and deck stairs" },
    { name: "Concrete calculator", slug: "concrete-calculator", description: "For stair footings and landings" },
    { name: "Stud spacing calculator", slug: "stud-spacing-calculator", description: "Framing for stair walls and landings" },
  ],

  faq: [
    {
      question: "How many stairs do I need for an 8-foot ceiling?",
      answer:
        "For a floor-to-floor rise of about 8.75 feet (105 inches - 8 ft ceiling plus floor assembly), you need 14 risers and 13 treads with a 7.5\" target. For a 9-foot ceiling (about 117 inches total rise), 16 risers and 15 treads. The calculator above handles any rise.",
    },
    {
      question: "What's the IRC code for stair dimensions?",
      answer:
        "IRC 2021 residential: risers 4\"-7.75\" (variation ≤ 3/8\" between any two risers), treads minimum 10\", stair width minimum 36\". Handrails required if more than 4 risers. Some local codes are stricter - always check before building.",
    },
    {
      question: "How long should my stair stringer be?",
      answer:
        "The calculated stringer length is the actual slope length. For lumber ordering, round up to the next standard length (2×12 stringers come in 2-foot increments from 8 to 20 ft). A 108-inch rise at 7.5\" risers needs a stringer about 155 inches long - order a 14-foot stringer (168 inches) with extra for cutting.",
    },
    {
      question: "How many stringers do I need?",
      answer:
        "Minimum 2 (one each side) for stairs up to 36\" wide. Add a middle stringer for stairs 36\"+ wide or when treads are 1\" or thinner. Always add a middle stringer for commercial or exterior stairs, and for any stair carrying heavy loads.",
    },
    {
      question: "What's the rule of 25?",
      answer:
        "A comfort test: 2 × riser height + tread depth should be around 24-25 inches. Below 23 feels steep and unsafe; above 26 feels awkward. Most comfortable stairs: 7\" rise + 11\" tread = 25. Code allows stairs outside this range but experienced carpenters use it as a design target.",
    },
    {
      question: "Can I adjust tread depth if my space is tight?",
      answer:
        "Yes, down to 10\" (IRC minimum). Below that is not code-compliant. If you're truly tight on horizontal space, consider a winder stair (wedge-shaped treads turning at a corner) or a spiral stair - both consume less horizontal space than a straight run but are harder to navigate with furniture.",
    },
    {
      question: "How do I measure total rise if the floor isn't finished?",
      answer:
        "Measure from the top of the lower finished floor surface to the top of the upper finished floor surface. If either floor is unfinished, add the finish thickness: typical hardwood adds 3/4\", tile adds 1\" with underlayment, carpet with pad adds 1/2\". Miss this step and your top or bottom riser will be uneven.",
    },
    {
      question: "What about landings?",
      answer:
        "Required by IRC for any stair with more than 12 risers in a single run, or at any turn. Landings must be at least as deep as the stair is wide (so a 36\" wide stair needs a 36\" deep landing). The calculator treats the stair as a single straight run - for L-shaped or U-shaped stairs, calculate each run separately.",
    },
  ],
  relatedGuides: [
    { name: "Composite vs PT vs cedar decking", slug: "composite-vs-pressure-treated-vs-cedar-deck", description: "20-year cost breakdown for all three decking materials" },
  ],
};
