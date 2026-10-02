import { DrainPipeCalculatorExpansion } from "@/content/drain-pipe-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber } from "@/lib/format";

export const drainPipeCalculatorConfig: CalculatorConfig = {
  ContentExpansion: DrainPipeCalculatorExpansion,
  slug: "drain-pipe-calculator",
  title: "Drain Pipe Calculator",
  description:
    "Add illustrative drainage fixture-unit loads using selected IPC 2021 residential fixture assumptions. Does not size drain, branch, stack, sewer, or vent piping.",
  categoryLabel: "Plumbing",
  category: "hvac",
  bannerHeadline: "Tally fixture loads.",
  bannerTags: ["IPC 2021 example values", "Fixture-unit subtotal", "Not pipe sizing"],
  inputs: [
    {
      id: "toiletClass",
      label: "Water-closet assumption for all toilets",
      type: "select",
      defaultImperial: "flushTank16",
      options: [
        { label: "Private flush tank, up to 1.6 gpf (3 DFU)", value: "flushTank16" },
        { label: "Private flush tank, over 1.6 gpf (4 DFU)", value: "flushTankOver16" },
        { label: "Flushometer tank, public or private (4 DFU)", value: "flushometerTank" },
      ],
      help: "Only these listed water-closet values are represented; this is not a complete public-fixture load calculation.",
    },
    ...([
      ["toilets", "Toilets", 1],
      ["lavatories", "Bathroom lavatories", 2],
      ["kitchenSinks", "Kitchen sinks", 1],
      ["showers", "Single showerhead or bathtub (baseline assumption)", 1],
      ["washers", "Residential clothes washers", 0],
    ] as const).map(([id, label, defaultImperial]) => ({
      id,
      label,
      type: "number" as const,
      defaultImperial,
      min: 0,
      step: 1,
    })),
  ],
  calculate: (values) => {
    const counts = {
      toilets: Math.max(0, Number(values.toilets) || 0),
      lavatories: Math.max(0, Number(values.lavatories) || 0),
      kitchenSinks: Math.max(0, Number(values.kitchenSinks) || 0),
      showers: Math.max(0, Number(values.showers) || 0),
      washers: Math.max(0, Number(values.washers) || 0),
    };
    const toiletClass = String(values.toiletClass || "flushTank16");
    const toiletDfu = toiletClass === "flushometerTank" ? 4 : toiletClass === "flushTankOver16" ? 4 : 3;
    const rates = { lavatories: 1, kitchenSinks: 2, showers: 2, washers: 2 };
    const components = {
      toilets: counts.toilets * toiletDfu,
      lavatories: counts.lavatories * rates.lavatories,
      kitchenSinks: counts.kitchenSinks * rates.kitchenSinks,
      showers: counts.showers * rates.showers,
      washers: counts.washers * rates.washers,
    };
    const total = Object.values(components).reduce((sum, load) => sum + load, 0);
    const rows = Object.entries(components).map(([fixture, dfu]) => ({
      label: fixture.replace(/([A-Z])/g, " $1").toLowerCase(),
      value: `${formatNumber(dfu)} DFU`,
    }));

    return {
      value: total,
      unit: "illustrative DFU subtotal",
      valueRounded: round(total, 1),
      breakdown: [
        ...rows,
        { label: "pipe sizing", value: "not calculated" },
        { label: "assumption set", value: "selected IPC 2021 private-residential values" },
      ],
      formulaSteps: [
        `toilet assumption = ${toiletClass} (${toiletDfu} DFU each)`,
        `toilets = ${counts.toilets} × ${toiletDfu} = ${components.toilets} DFU`,
        `bathroom lavatories = ${counts.lavatories} × ${rates.lavatories} = ${components.lavatories} DFU`,
        `kitchen sinks = ${counts.kitchenSinks} × ${rates.kitchenSinks} = ${components.kitchenSinks} DFU`,
        `showers or bathtubs = ${counts.showers} × ${rates.showers} = ${components.showers} DFU`,
        `residential clothes washers = ${counts.washers} × ${rates.washers} = ${components.washers} DFU`,
        `illustrative subtotal = ${formatNumber(total)} DFU`,
        "No pipe size, vent size, slope, or code-compliance result is calculated.",
      ],
    };
  },
  formulaDescription: "illustrative fixture-unit subtotal = Σ(fixture count × selected example DFU value)",
  methodology: [
    "This worksheet adds a selected subset of residential fixture-unit values from the 2021 International Plumbing Code. Values depend on fixture type and applicable code edition; the toilet dropdown makes one assumption for every toilet entered. The shower value represents a baseline single-head case, not multi-head or high-flow showers. A domestic kitchen sink value covers a disposer, dishwasher, or both in the cited table, so they are not added separately here.",
    "The subtotal is not a pipe-size recommendation. Drain and vent design depends on the locally adopted code, fixture details, pipe layout, slope, developed length, venting, connections, and other requirements not entered here.",
    "Do not use this result for permit drawings or construction. Confirm the applicable local requirements and have plumbing design reviewed by a licensed plumbing professional or the authority having jurisdiction.",
  ],
  sources: [
    {
      name: "2021 International Plumbing Code, Chapter 7: Sanitary Drainage",
      url: "https://codes.iccsafe.org/content/IPC2021P1/chapter-7-sanitary-drainage",
      note: "Table 709.1 fixture-unit values; this page implements only selected example values and no pipe-sizing tables.",
    },
    {
      name: "International Code Council: Digital Codes",
      url: "https://codes.iccsafe.org/",
      note: "Check the code edition and amendments adopted by the local jurisdiction.",
    },
  ],
  related: [
    { name: "Water heater calculator", slug: "water-heater-calculator", description: "Estimate tank gallons or tankless flow rate" },
    { name: "Vanity calculator", slug: "vanity-calculator", description: "Plan a bathroom vanity footprint" },
  ],
  faq: [
    {
      question: "Does this tell me what pipe diameter to install?",
      answer: "No. It only adds illustrative fixture-unit values. It does not size a branch, stack, building drain, sewer, or vent.",
    },
    {
      question: "Why does the toilet selection matter?",
      answer: "Assigned fixture-unit values vary by water-closet type and flush characteristics. The selected dropdown assumption is applied to every toilet count; verify each actual fixture and the locally adopted code. The example values here are from IPC 2021, not every plumbing code.",
    },
    {
      question: "Can this be used for permit or construction plans?",
      answer: "No. It omits the layout, slope, lengths, venting, fittings, local amendments, and other design checks. Have a licensed plumbing professional or local authority verify the design.",
    },
  ],
};
