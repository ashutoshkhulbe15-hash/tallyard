import type { CalculatorConfig } from "@/lib/types";
import { round, formatNumber, ceilQuantity } from "@/lib/format";

export const fenceCalculatorConfig: CalculatorConfig = {
  slug: "fence-calculator",
  title: "Fence Calculator",
  description:
    "Preliminary posts, rails, and pickets for one straight fence run. Gates, corners, and post-hole concrete require a site-specific layout.",
  categoryLabel: "Landscaping",
  category: "landscaping",

  bannerHeadline: "Fence neatly.",
  bannerTags: ["Straight run", "Posts · rails · pickets", "Preliminary takeoff"],

  inputs: [
    {
      id: "length",
      label: "Total fence length",
      type: "number",
      unitImperial: "ft",
      unitMetric: "m",
      defaultImperial: 100,
      defaultMetric: 30,
      min: 5,
      step: 1,
    },
    {
      id: "postSpacing",
      label: "Post spacing",
      type: "select",
      defaultImperial: 8,
      options: [
        { label: '6 ft / 1.8 m', value: 6 },
        { label: '8 ft / 2.4 m (standard)', value: 8 },
        { label: '10 ft / 3 m', value: 10 },
      ],
      help: "Spacing choices are in feet in both modes; confirm the product and local design requirements.",
    },
    {
      id: "height",
      label: "Fence height",
      type: "select",
      defaultImperial: 6,
      options: [
        { label: '3 ft / 0.9 m', value: 3 },
        { label: '4 ft / 1.2 m', value: 4 },
        { label: '6 ft / 1.8 m (privacy)', value: 6 },
        { label: '8 ft / 2.4 m (tall)', value: 8 },
      ],
    },
    {
      id: "pickets",
      label: "Include picket count?",
      type: "select",
      defaultImperial: "yes",
      options: [
        { label: "Yes: assume 5.5\" wide", value: "yes" },
        { label: "No: posts/rails only", value: "no" },
      ],
    },
  ],

  calculate: (values, units) => {
    const length = Number(values.length) || 0;
    const postSpacing = Number(values.postSpacing) || 8;
    const height = Number(values.height) || 6;
    const includePickets = String(values.pickets || "yes") === "yes";
    // Convert length to feet for calculation if metric
    const lengthFt = units === "metric" ? length / 0.3048 : length;
    // Select options are labelled in feet; their values remain feet in metric mode.
    const postSpacingFt = postSpacing;

    // One straight run only. Gates and corners require a segmented layout.
    const sectionPosts = ceilQuantity(lengthFt / postSpacingFt) + 1;
    const totalPosts = sectionPosts;

    // Rails: typically 2 rails per section (top and bottom) for 4-ft fences, 3 rails for 6-ft+
    const railsPerSection = height >= 6 ? 3 : 2;
    const sections = ceilQuantity(lengthFt / postSpacingFt);
    const rails = sections * railsPerSection;

    // Pickets: at 5.5" wide with 0.25" gap = 5.75" per picket; total length / 5.75"
    const picketWidthIn = 5.75;
    const picketCount = includePickets
      ? ceilQuantity((lengthFt * 12) / picketWidthIn)
      : 0;

    // Compose total items (treating pickets as the primary output)
    const totalItems = includePickets ? picketCount : totalPosts;
    const unitLabel = includePickets ? "pickets" : totalPosts === 1 ? "post" : "posts";

    return {
      value: totalItems,
      unit: unitLabel,
      valueRounded: totalItems,
      breakdown: [
        { label: "posts", value: `${totalPosts}` },
        { label: "rails", value: `${rails}` },
        ...(includePickets ? [{ label: "pickets", value: `${picketCount}` }] : []),
        { label: "concrete bags", value: "not estimated — hole size needed" },
      ],
      formulaSteps: [
        `length = ${length} ${units === "metric" ? "m" : "ft"}${units === "metric" ? ` ≈ ${formatNumber(round(lengthFt, 1))} ft` : ""}`,
        `sections = ⌈${formatNumber(round(lengthFt, 1))} ÷ ${formatNumber(round(postSpacingFt, 1))}⌉ = ${sections} sections`,
        `section posts = ${sections} + 1 = ${sectionPosts}`,
        `posts for one straight run = ${sections} intervals + 1 end post = ${totalPosts}`,
        `rails = ${sections} sections × ${railsPerSection} rails = ${rails}`,
        includePickets
          ? `pickets = ⌈(${formatNumber(round(lengthFt, 1))} × 12) ÷ ${picketWidthIn}⌉ = ${picketCount}`
          : "",
        "Gate openings, corners, and post-hole concrete require a site-specific layout and dimensions.",
      ].filter(Boolean) as string[],
      composition: includePickets
        ? {
            unit: "items",
            total: totalPosts + rails + picketCount,
            segments: [
              { label: "Pickets", amount: picketCount, shade: "primary" },
              { label: "Rails", amount: rails, shade: "secondary" },
              { label: "Posts", amount: totalPosts, shade: "tertiary" },
            ],
          }
        : undefined,
    };
  },

  formulaDescription:
    "for one straight run, posts = ⌈length ÷ spacing⌉ + 1; pickets ≈ length × 12 ÷ assumed coverage width",

  methodology: [
    "Posts are estimated for one straight run by dividing its length by the selected maximum spacing, rounding up the interval count, and adding one end post. A layout with gates or corners must be divided into actual runs; do not add a fixed number of posts per gate or corner without a plan.",
    "Rails (horizontal 2×4s that support the pickets) are usually 2 per section for fences up to 4 feet tall, and 3 per section for 6-foot-plus fences. The extra middle rail prevents sagging on tall fences.",
    "Picket count assumes standard 5.5-inch wide cedar or pine pickets with a 0.25-inch gap between each (for wood movement and airflow), giving 5.75 inches per picket. Narrower pickets or tighter spacing increases the count: recalculate manually if needed. For shadowbox or board-on-board fences, picket count roughly doubles.",
    "Concrete bag count cannot be determined from fence height alone. Hole diameter, depth, post dimensions, and bag yield must be known; consult the local installation requirements and use a volume calculation once those dimensions are specified.",
    "The calculator does not include: gate hardware (hinges, latches, brackets), finish nails or screws (estimate 2-3 lbs per section), stain or preservative (see paint calculator), or post caps. These are typically selected separately based on style preference.",
  ],

  sources: [
    {
      name: "This Old House: How to Choose and Put Up a Fence",
      url: "https://www.thisoldhouse.com/fences/fencing-lessons",
      note: "Standard post spacing and rail count recommendations",
    },
  ],

  related: [
    { name: "Concrete calculator", slug: "concrete-calculator", description: "Cubic yards for post holes and footings" },
    { name: "Paint calculator", slug: "paint-calculator", description: "Stain or paint for fence sections" },
    { name: "Gravel calculator", slug: "gravel-calculator", description: "Gravel for post hole drainage" },
    { name: "Deck calculator", slug: "deck-calculator", description: "Boards, joists, and framing cost" },
  ],

  faq: [
    {
      question: "How many fence posts do I need for 100 feet of fence?",
      answer:
        "For one straight 100-foot run with no gates, at most 8 feet between posts means ceil(100 ÷ 8) = 13 intervals and 14 posts. A gate or corner changes the layout; draw and measure each run before ordering.",
    },
    {
      question: "What's the best post spacing?",
      answer:
        "Post spacing depends on fence height, wind exposure, material, product instructions, and local requirements. The selectable 6-, 8-, and 10-foot values are takeoff assumptions, not a structural recommendation. Have the design checked for the site.",
    },
    {
      question: "How deep should fence posts go?",
      answer:
        "Post depth and footing details depend on height, wind exposure, soil, product instructions, frost conditions, and local rules. Have the site-specific requirements confirmed before digging; contact 811 first.",
    },
    {
      question: "How much concrete per fence post?",
      answer:
        "Measure the actual hole diameter and depth and subtract the embedded post volume, then divide by the bag yield printed on your chosen product. The calculator does not have these inputs and therefore does not return a bag count.",
    },
    {
      question: "Can I skip concrete and just use dirt?",
      answer:
        "Post-setting requirements depend on the fence system, soil, wind loading, drainage, and local rules. Follow the approved design and manufacturer instructions; this calculator does not determine whether concrete, gravel, or another foundation is appropriate.",
    },
    {
      question: "How do I handle a slope?",
      answer:
        "A sloped run may be stepped or racked depending on the product and site. Both can change panel, post, and picket quantities. Measure each segment and follow the manufacturer's installation limits rather than applying the straight-run estimate unchanged.",
    },
    {
      question: "What about gates?",
      answer:
        "A gate needs a defined opening and suitable hinge/latch supports. Draw its position before estimating posts and pickets; supports may be shared with adjacent runs. Confirm gate hardware and post design with the product supplier or installer. This straight-run calculator does not model gates.",
    },
    {
      question: "Does the calculator work for chain-link or vinyl?",
      answer:
        "No. This estimator assumes a simple wood-style straight run and generic pickets and rails. Chain-link and vinyl systems have product-specific terminal posts, panels, spacing, and hardware. Use the manufacturer's layout instructions and a site-specific quote.",
    },
  ],
};
