import { FenceCalculatorExpansion } from "@/content/fence-expansion";
import type { CalculatorConfig } from "@/lib/types";
import { round, roundUp, formatNumber } from "@/lib/format";

export const fenceCalculatorConfig: CalculatorConfig = {
  slug: "fence-calculator",
  title: "Fence Calculator",
  description:
    "Posts, rails, and pickets for any fence length. Includes concrete for post holes and accounts for gates and corners.",
  categoryLabel: "Landscaping",
  category: "landscaping",

  bannerHeadline: "Fence neatly.",
  bannerTags: ["Posts · rails · pickets", "Includes concrete", "Gates and corners"],

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
      help: "Tight = more posts but stronger. 8 ft is standard for wood fences.",
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
        { label: "Yes — assume 5.5\" wide", value: "yes" },
        { label: "No — posts/rails only", value: "no" },
      ],
    },
    {
      id: "gates",
      label: "Number of gates",
      type: "number",
      defaultImperial: 1,
      min: 0,
      step: 1,
      help: "Each gate adds 2 posts (hinge + latch)",
    },
    {
      id: "corners",
      label: "Number of corners",
      type: "number",
      defaultImperial: 2,
      min: 0,
      step: 1,
      help: "Each corner adds one post if the fence changes direction",
    },
  ],

  calculate: (values, units) => {
    const length = Number(values.length) || 0;
    const postSpacing = Number(values.postSpacing) || 8;
    const height = Number(values.height) || 6;
    const includePickets = String(values.pickets || "yes") === "yes";
    const gates = Number(values.gates) || 0;
    const corners = Number(values.corners) || 0;

    // Convert length to feet for calculation if metric
    const lengthFt = units === "metric" ? length * 3.281 : length;
    const postSpacingFt = units === "metric" ? postSpacing * 3.281 : postSpacing;

    // Posts: one per spacing, plus one at the end, plus gate posts (2 per gate), plus corner posts
    const sectionPosts = Math.ceil(lengthFt / postSpacingFt) + 1;
    const totalPosts = sectionPosts + gates + corners;

    // Rails: typically 2 rails per section (top and bottom) for 4-ft fences, 3 rails for 6-ft+
    const railsPerSection = height >= 6 ? 3 : 2;
    const sections = Math.ceil(lengthFt / postSpacingFt);
    const rails = sections * railsPerSection;

    // Pickets: at 5.5" wide with 0.25" gap = 5.75" per picket; total length / 5.75"
    const picketWidthIn = 5.75;
    const picketCount = includePickets
      ? Math.ceil((lengthFt * 12) / picketWidthIn)
      : 0;

    // Concrete: typically 1 bag (60 lb) per post for 4-ft fences, 2 bags per post for 6-ft+
    // This gives ~0.5 cu ft per post for 4ft, 1 cu ft per post for 6ft+
    const bagsPerPost = height >= 6 ? 2 : 1;
    const concreteBags = totalPosts * bagsPerPost;

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
        { label: "concrete bags", value: `${concreteBags} × 60 lb` },
      ],
      formulaSteps: [
        `length = ${length} ${units === "metric" ? "m" : "ft"}${units === "metric" ? ` ≈ ${formatNumber(round(lengthFt, 1))} ft` : ""}`,
        `sections = ⌈${formatNumber(round(lengthFt, 1))} ÷ ${formatNumber(round(postSpacingFt, 1))}⌉ = ${sections} sections`,
        `section posts = ${sections} + 1 = ${sectionPosts}`,
        `total posts = ${sectionPosts} + ${gates * 2 / 2} gate posts × 2 + ${corners} corners = ${totalPosts}`,
        `rails = ${sections} sections × ${railsPerSection} rails = ${rails}`,
        includePickets
          ? `pickets = ⌈(${formatNumber(round(lengthFt, 1))} × 12) ÷ ${picketWidthIn}⌉ = ${picketCount}`
          : "",
        `concrete = ${totalPosts} posts × ${bagsPerPost} bag${bagsPerPost > 1 ? "s" : ""} = ${concreteBags} × 60 lb bags`,
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

  ContentExpansion: FenceCalculatorExpansion,

  formulaDescription:
    "posts = ⌈length ÷ spacing⌉ + 1 + gates × 2 + corners, pickets = length × 12 ÷ picket width",

  methodology: [
    "Posts are calculated by dividing the fence length by the post spacing (typically 8 feet) and adding one for the final end post. Each gate adds two posts (a hinge post and a latch post, both reinforced compared to regular line posts). Each corner adds one post where the fence changes direction.",
    "Rails (horizontal 2×4s that support the pickets) are usually 2 per section for fences up to 4 feet tall, and 3 per section for 6-foot-plus fences. The extra middle rail prevents sagging on tall fences.",
    "Picket count assumes standard 5.5-inch wide cedar or pine pickets with a 0.25-inch gap between each (for wood movement and airflow), giving 5.75 inches per picket. Narrower pickets or tighter spacing increases the count — recalculate manually if needed. For shadowbox or board-on-board fences, picket count roughly doubles.",
    "Concrete for post holes: standard guidance is 1 bag of 60-lb ready-mix per post for fences 4 feet or shorter, and 2 bags per post for 6-foot or taller fences. This assumes 8-12 inch diameter holes, 2-3 feet deep. Freezing climates require deeper holes (below frost line) which may need more concrete.",
    "The calculator does not include: gate hardware (hinges, latches, brackets), finish nails or screws (estimate 2-3 lbs per section), stain or preservative (see paint calculator), or post caps. These are typically selected separately based on style preference.",
  ],

  sources: [
    {
      name: "This Old House — Fence Installation Guide",
      url: "https://www.thisoldhouse.com/fences",
      note: "Standard post spacing and rail count recommendations",
    },
    {
      name: "Family Handyman — Build a Privacy Fence",
      url: "https://www.familyhandyman.com/",
      note: "Concrete per post and picket spacing reference",
    },
  ],

  related: [
    { name: "Concrete calculator", slug: "concrete-calculator", description: "Cubic yards for post holes and footings" },
    { name: "Paint calculator", slug: "paint-calculator", description: "Stain or paint for fence sections" },
    { name: "Gravel calculator", slug: "gravel-calculator", description: "Gravel for post hole drainage" },
    { name: "Lumber calculator", slug: "lumber-calculator", description: "Board feet for framing and pickets" },
  ],

  faq: [
    {
      question: "How many fence posts do I need for 100 feet of fence?",
      answer:
        "For 100 feet with 8-foot post spacing, you need 13 line posts (12 sections + 1 end post). Add 2 posts per gate and 1 per corner. So a straight 100-ft run with 1 gate and 2 corners needs 17 posts total. The calculator above does this math for you.",
    },
    {
      question: "What's the best post spacing?",
      answer:
        "8 feet on center is standard for most wood fences — balances strength with cost. 6 feet OC makes a more rigid fence that resists wind better, good for exposed sites or privacy fences. 10 feet OC is used for horizontal rail fences where pickets span further — not recommended for solid privacy fences because rails can sag between posts.",
    },
    {
      question: "How deep should fence posts go?",
      answer:
        "At minimum 1/3 of the total post length, or 24-36 inches — whichever is deeper. In frost-prone climates, posts must go below the frost line (varies by region: 36 inches in Chicago, 48 inches in Minneapolis). Shallower posts will heave up over winters.",
    },
    {
      question: "How much concrete per fence post?",
      answer:
        "For 4-ft fence: 1 bag (60 lb) of ready-mix per post — fills a 9\" diameter × 24\" deep hole. For 6-ft privacy fence: 2 bags per post — fills a 10-12\" diameter × 30-36\" deep hole. For 8-ft tall or heavy-gate posts: 3 bags. Always leave a slight cone of concrete above grade for water runoff.",
    },
    {
      question: "Can I skip concrete and just use dirt?",
      answer:
        "For short fences (under 4 ft) in well-drained soil, tamped crushed gravel works and actually drains better than concrete. For any 6-ft+ privacy fence, or clay soils, or frost-prone areas: use concrete. The cost is minimal compared to re-doing a leaning fence in two years.",
    },
    {
      question: "How do I handle a slope?",
      answer:
        "Two options: racked (pickets follow the ground angle, rails stay level) or stepped (each section is level, creating stairs). Racked is simpler and cheaper; stepped looks more formal. Post spacing stays the same either way. For racked installations, pickets need to be trimmed at angles — adds 5-10% to picket count.",
    },
    {
      question: "What about gates?",
      answer:
        "Each gate adds 2 posts (a heavy hinge post and a latch post), typically sized up one dimension (use 6×6 if line posts are 4×4). Gates 4+ feet wide need a diagonal brace or sag cables to prevent dropping over time. Standard residential gate widths: 3-4 ft for walk-throughs, 5-6 ft for narrow drive access, 8-12 ft for driveways.",
    },
    {
      question: "Does the calculator work for chain-link or vinyl?",
      answer:
        "Partially — the post count math is identical. Chain-link uses 1-5/8\" or 2\" galvanized posts set in concrete, with no rails (top rail only). Vinyl uses engineered panels that replace pickets+rails+some posts with a single 8-ft section. For those materials, use the post count and ignore the rail/picket outputs.",
    },
  ],
};
