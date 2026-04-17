import type { GuideConfig } from "@/lib/guides-types";
import {
  VerdictCard,
  ComparisonTable,
  Callout,
  StatGrid,
  CalculatorCTA,
} from "@/components/GuideComponents";

function Content() {
  return (
    <>
      <p>
        You&apos;ve narrowed a siding replacement down to two finalists:
        vinyl and fiber cement. Every article you&apos;ve read has given
        you a different answer, and half of them were written by someone
        selling one or the other. The real answer depends on three numbers
        most comparisons gloss over: installed cost, 30-year total cost of
        ownership, and what your specific situation values more — up-front
        savings or long-term durability.
      </p>

      <p>
        We&apos;re going to walk through those numbers for a typical
        1,100 square foot siding job (a standard two-story home with
        gables and average window count), then give you a clear decision
        framework. No affiliate links, no lead capture, no agenda.
      </p>

      <VerdictCard verdict="Vinyl wins on cost. Fiber cement wins on longevity, fire resistance, and premium look. Over 30 years, fiber cement costs about 2× more — mostly because of the repainting cycle vinyl doesn&apos;t need.">
        For most homeowners on a budget or in areas without wildfire risk,
        vinyl is the practical choice. Fiber cement is worth the premium
        when fire safety matters, when you&apos;ll own the house 20+ years,
        or when you want a painted-wood aesthetic without wood&apos;s rot
        problems.
      </VerdictCard>

      <h2>The cost comparison, with math</h2>

      <p>
        Both materials fall into the same general price band per square
        foot installed, but the ranges reflect huge differences in grade,
        complexity, and regional labor markets. Here are the numbers for
        mid-grade installations in 2026 US markets:
      </p>

      <ComparisonTable
        columns={[
          { title: "Vinyl", subtitle: "PVC lap siding" },
          { title: "Fiber cement", subtitle: "James Hardie or equiv." },
        ]}
        rows={[
          {
            label: "Material only",
            values: ["$2–6 / ft²", "$3–8 / ft²"],
          },
          {
            label: "Installed cost",
            values: ["$3–12 / ft²", "$5–14 / ft²"],
          },
          {
            label: "Typical 1,100 ft² job",
            values: ["$8,000–10,000", "$10,000–13,000"],
          },
          {
            label: "Weight",
            values: ["~60 lb / 100 ft²", "~300 lb / 100 ft²"],
          },
          {
            label: "Install labor",
            values: ["1–2 days", "3–5 days"],
          },
        ]}
        caption="Ranges from Angi, HomeGuide, and NerdWallet, Jan 2026. 1,100 ft² reflects a typical two-story, 2,000 sq ft home after gables and openings."
      />

      <p>
        The up-front gap is real — about $2,000–$3,000 for the job size
        above — but it&apos;s not catastrophic. Where the numbers diverge
        seriously is over the ownership period.
      </p>

      <h2>The 30-year total cost of ownership</h2>

      <p>
        Vinyl is famously maintenance-free. You hose it off occasionally,
        replace a cracked panel after a hailstorm, and do essentially
        nothing else for decades. Fiber cement is not maintenance-free —
        the caulking needs refreshing every 10 years, and the paint needs
        redoing every 10–15 years. That paint cycle is the single biggest
        cost difference over the long run, and it&apos;s where most
        comparisons wave their hands.
      </p>

      <p>Here&apos;s the math for an 1,100 sq ft job held 30 years:</p>

      <ComparisonTable
        columns={[
          { title: "Vinyl" },
          { title: "Fiber cement" },
        ]}
        rows={[
          {
            label: "Installation",
            values: ["$8,800", "$11,000"],
          },
          {
            label: "Repaints (every 12 yrs)",
            values: ["$0 (color-through)", "$9,000 (2 × $4,500)"],
          },
          {
            label: "Caulk refresh (every 10 yrs)",
            values: ["$0", "$2,400 (3 × $800)"],
          },
          {
            label: "Cleaning, minor repairs",
            values: ["$800", "$600"],
          },
          {
            label: "30-year total",
            values: [
              <strong key="v">$9,600</strong>,
              <strong key="f">$23,000</strong>,
            ],
          },
          {
            label: "Per year (amortized)",
            values: ["$320 / yr", "$767 / yr"],
          },
        ]}
        caption="Conservative estimate. Repaint cost assumes hiring a professional; DIY paint cuts that ~60%. Vinyl does have small ongoing repair costs — panels chip from hail, fade slightly over 20+ years, and may need section replacement."
      />

      <p>
        At face value, fiber cement costs about 2.4× what vinyl costs
        over 30 years. But this comparison assumes you actually repaint
        fiber cement on schedule — many homeowners let it go 20+ years
        between paint jobs, which drops the long-term gap considerably
        but also degrades curb appeal.
      </p>

      <Callout label="The hidden variable">
        If you plan to sell within 10 years, the repaint cycle for fiber
        cement might only hit you once or not at all. Over a shorter hold
        period, the TCO gap shrinks dramatically, and fiber cement&apos;s
        resale premium (typically $3,000–$8,000 on mid-market homes) can
        offset the up-front cost entirely.
      </Callout>

      <h2>Lifespan: what actually fails, and when</h2>

      <StatGrid
        items={[
          {
            value: "20–40 yrs",
            label: "Vinyl lifespan",
            note: "Cracks from cold, fades under UV, warps near heat sources",
          },
          {
            value: "50+ yrs",
            label: "Fiber cement lifespan",
            note: "Paint fails first, not the material itself",
          },
        ]}
      />

      <p>
        Both materials have good warranties (30 years for vinyl, 30 for
        fiber cement), but real-world lifespans differ more than warranty
        periods suggest. Vinyl&apos;s failure modes are worth knowing:
      </p>

      <ul>
        <li>
          <strong>UV fading.</strong> South-facing vinyl in hot, sunny
          climates fades noticeably by year 15. Northern climates? Still
          looks new at 25 years.
        </li>
        <li>
          <strong>Cold brittleness.</strong> Below 20°F, a thrown baseball
          or falling branch can crack vinyl. Fiber cement takes the same
          impact and doesn&apos;t move.
        </li>
        <li>
          <strong>Heat warping.</strong> Grills, BBQs, or reflected sun
          from windows can soften and warp vinyl within inches of the
          heat source. A melted strip of siding isn&apos;t rare; it&apos;s
          the single most common vinyl repair call.
        </li>
        <li>
          <strong>Hail.</strong> Tennis-ball-sized hail cracks vinyl
          panels outright. Fiber cement shows dents but rarely fails
          structurally.
        </li>
      </ul>

      <p>
        Fiber cement&apos;s failure mode is different: the material lasts
        essentially forever, but the paint on top doesn&apos;t. Expect to
        repaint every 10–15 years. Skip the repaint and you&apos;ll get
        chalky, patchy siding that still structurally holds up but looks
        terrible. That&apos;s the trade.
      </p>

      <h2>Fire performance: when it matters, when it doesn&apos;t</h2>

      <p>
        Fiber cement carries a Class 1(A) fire spread rating — the highest
        available for exterior cladding. It doesn&apos;t burn, doesn&apos;t
        feed a fire, and won&apos;t release toxic fumes. Vinyl, on the
        other hand, melts starting around 165°F and ignites at higher
        temperatures.
      </p>

      <p>
        For most of the country, this doesn&apos;t matter much. For three
        situations, it matters enormously:
      </p>

      <ol>
        <li>
          <strong>Wildfire-prone regions.</strong> California, Oregon,
          Washington, Colorado, and parts of the Southwest have
          Wildland-Urban Interface (WUI) zones where local codes
          increasingly require Class A rated exterior cladding. Fiber
          cement qualifies; vinyl does not.
        </li>
        <li>
          <strong>Side yards close to neighbors.</strong> If your house is
          within 10 feet of a neighbor&apos;s, a fire at their home can
          melt your vinyl before firefighters arrive. Fiber cement
          provides a real buffer.
        </li>
        <li>
          <strong>Insurance discounts.</strong> Some insurers offer 5–15%
          premium discounts on homes with Class A cladding. Over 20 years,
          this can recoup much of the fiber cement premium.
        </li>
      </ol>

      <Callout label="Quick check">
        Ask your insurance agent what discount they offer for Class A
        exterior cladding on a home built in your area. If it&apos;s
        meaningful (8%+), fiber cement often pencils out within 5–8 years.
      </Callout>

      <h2>When vinyl is the right answer</h2>

      <p>
        Vinyl siding is the best value for homeowners in most of the
        country. It dominates the residential siding market for good
        reason. Specific situations where vinyl wins cleanly:
      </p>

      <ul>
        <li>
          <strong>Budget renovation.</strong> You need a fresh exterior
          look now for under $10,000 and you&apos;ll worry about the
          long-term view later.
        </li>
        <li>
          <strong>Rental properties.</strong> Landlords want low
          maintenance and durability against tenant turnover impacts.
          Vinyl&apos;s ability to replace individual panels makes repairs
          cheap.
        </li>
        <li>
          <strong>Simple rectangular homes.</strong> Ranch-style houses
          without complex trim or cut details are where vinyl installs
          fastest and looks best. The style plays to vinyl&apos;s
          strengths.
        </li>
        <li>
          <strong>Mild climates with no wildfire risk.</strong> Mid-Atlantic,
          Midwest (outside blizzard belts), and Southeast outside hurricane
          zones. Conditions are gentle enough that vinyl&apos;s 30-year
          lifespan is achievable.
        </li>
        <li>
          <strong>Short hold periods.</strong> If you&apos;ll sell within
          10 years, the TCO gap never fully materializes. Install vinyl,
          keep the cash, move on.
        </li>
      </ul>

      <h2>When fiber cement is worth the premium</h2>

      <ul>
        <li>
          <strong>Wildfire zones.</strong> Non-negotiable. Class A rated
          cladding saves lives and homes.
        </li>
        <li>
          <strong>Long-term ownership.</strong> If you&apos;ll own the
          house 20+ years, fiber cement&apos;s durability catches up to
          vinyl on total cost when you factor in the avoided
          vinyl-replacement cycle (most vinyl gets replaced around year
          30; fiber cement routinely hits 50).
        </li>
        <li>
          <strong>Premium homes and neighborhoods.</strong> On homes above
          ~$500,000, fiber cement is increasingly the baseline buyer
          expectation. Vinyl on a high-end home can look budget even if it
          costs the same to install.
        </li>
        <li>
          <strong>Wind-prone areas.</strong> Fiber cement&apos;s weight is
          an advantage — it&apos;s much harder to tear off in hurricanes
          or tornado winds. Coastal Florida and Gulf Coast builders
          increasingly default to fiber cement for this reason.
        </li>
        <li>
          <strong>Architectural detail.</strong> Fiber cement holds sharper
          shadow lines, accepts trim work, and looks like painted wood.
          Craftsman, farmhouse, and Colonial styles are hard to execute
          convincingly in vinyl.
        </li>
      </ul>

      <CalculatorCTA
        name="Siding calculator"
        slug="siding-calculator"
        description="Get squares and linear feet for your specific house. Accounts for gables, openings, and material-specific waste factors."
      />

      <h2>Installation gotchas that matter more than material choice</h2>

      <p>
        One thing both materials share: a bad installer ruins either one.
        A good installer can make either one last. More siding failures
        come from installation errors than from material defects, and the
        differences between a good and bad install aren&apos;t visible for
        5–10 years.
      </p>

      <p>Four things to check regardless of material:</p>

      <ol>
        <li>
          <strong>House wrap underneath.</strong> Tyvek or similar
          weather-resistive barrier (WRB) should be installed under either
          material. This is where water management happens — the siding
          itself is just the rain screen. If an installer suggests skipping
          WRB, find another installer.
        </li>
        <li>
          <strong>Flashing around windows and doors.</strong> Every opening
          needs head flashing, proper kickout flashings at roof junctions,
          and correct integration with the WRB. This is invisible once
          siding is up but causes 80% of siding-related water damage.
        </li>
        <li>
          <strong>Expansion gaps (vinyl) or joint details (fiber cement).</strong> Vinyl
          expands and contracts significantly with temperature — 1/4 inch
          over a 12-foot panel on a hot day. Nailing it tight locks it in
          place and it buckles. Fiber cement doesn&apos;t move much but
          needs properly flashed joints.
        </li>
        <li>
          <strong>Fastener type and spacing.</strong> Fiber cement needs
          corrosion-resistant fasteners (stainless or hot-dipped galvanized)
          at proper spacing per manufacturer specs. Vinyl needs proper nail
          depth — not tight, not loose — which sounds simple but has a real
          failure rate even among experienced crews.
        </li>
      </ol>

      <h2>The middle path: insulated vinyl</h2>

      <p>
        If you want vinyl&apos;s economics but more thermal performance
        and a sturdier feel, insulated vinyl (fused to a foam backer) is a
        real option. It costs $1–3 per square foot more than standard
        vinyl and adds roughly R-2 to R-3 of continuous insulation.
        That&apos;s not enormous, but it&apos;s meaningful as part of a
        whole-house energy upgrade — and the foam backing makes the panels
        feel substantially more solid and less prone to oil-canning.
      </p>

      <p>
        Insulated vinyl doesn&apos;t match fiber cement&apos;s fire
        performance or longevity, but it closes the aesthetic and
        performance gap for a fraction of the cost increment.
      </p>

      <h2>Bottom line</h2>

      <p>
        Run the math on your actual situation using the{" "}
        <a href="/siding-calculator">Tallyard siding calculator</a> to
        get squares and board feet for your house, then multiply by the
        per-square-foot ranges above to get your project budget. If the
        installed cost gap is under $3,000 and you&apos;ll own the house
        more than 15 years, fiber cement is usually worth it. Otherwise,
        good-quality vinyl is a legitimate choice nobody should feel
        embarrassed about.
      </p>

      <p>
        Whatever you pick, spend more effort vetting the installer than
        the material. A great installer doing vinyl will outlast a bad
        installer doing fiber cement.
      </p>
    </>
  );
}

export const vinylVsFiberCementGuide: GuideConfig = {
  slug: "vinyl-vs-fiber-cement-siding",
  title: "Vinyl vs fiber cement siding: the real 30-year cost",
  description:
    "Honest comparison of vinyl and fiber cement siding with real 30-year TCO math. Cost, lifespan, fire performance, and when each one wins.",
  bannerHeadline: "Vinyl vs fiber cement siding.",
  bannerTags: ["30-year TCO", "Cost + lifespan", "Fire performance"],
  categoryLabel: "Roofing",
  category: "roofing",
  heroValue: "30-YEAR TCO",
  publishedAt: "2026-04-18",
  readTime: "11 min read",
  Content,
  faq: [
    {
      question: "Is fiber cement really twice as expensive as vinyl?",
      answer:
        "Installed, fiber cement runs about 25–30% more than vinyl up front. Over 30 years including repaint cycles, the total cost of ownership for fiber cement is about 2–2.4× vinyl. The gap narrows substantially if you hold the house less than 15 years or skip scheduled repaints.",
    },
    {
      question: "Does fiber cement siding increase home value more than vinyl?",
      answer:
        "On homes above about $500,000, yes — typically $3,000–$8,000 of resale premium, which recoups most of the installation cost difference. On mid-market homes ($200,000–$400,000), the resale bump is smaller and may not fully offset the upgrade cost. On rental and entry-level homes, vinyl and fiber cement generally appraise similarly.",
    },
    {
      question: "Can I paint vinyl siding to avoid the repainting issue?",
      answer:
        "Technically yes, but it voids most vinyl warranties and the paint fails faster than on fiber cement because vinyl flexes with temperature. If you want painted-wood aesthetics, fiber cement is the right choice — vinyl is color-through for a reason.",
    },
    {
      question: "What about engineered wood siding like LP SmartSide?",
      answer:
        "Engineered wood sits between vinyl and fiber cement on price and performance. Installed cost $5–10/ft², good lifespan (25–40 years), but also needs painting every 7–10 years. If you like the look but want an easier-to-install alternative to fiber cement, it&apos;s worth considering — especially for DIY-friendly projects.",
    },
    {
      question: "How do I know if my area requires Class A fire-rated siding?",
      answer:
        "Call your local building department. Wildland-Urban Interface (WUI) zones in California, Oregon, Washington, Colorado, Montana, and the Southwest have increasingly strict requirements. Even outside WUI zones, some HOAs and insurance companies require or incentivize Class A cladding.",
    },
    {
      question: "Will my insurance rates drop if I switch to fiber cement?",
      answer:
        "Sometimes. Major insurers offer 5–15% discounts for Class A rated cladding, particularly in fire-prone regions. Ask your agent to quote with and without fiber cement before committing — the savings can recoup the premium within 5–8 years.",
    },
    {
      question: "Can I install fiber cement siding myself?",
      answer:
        "Technically yes, but it&apos;s significantly harder than vinyl. Fiber cement is heavy (300 lb per 100 ft² vs 60 lb for vinyl), requires specialized carbide-tipped cutting tools, produces silica dust that needs respiratory protection, and has less forgiving installation tolerances. Most DIYers tackle vinyl but hire out fiber cement.",
    },
    {
      question: "Does the siding choice affect my home&apos;s energy performance?",
      answer:
        "Standard siding of either type provides minimal R-value (less than R-1). The meaningful energy decision is what you put underneath — rigid foam continuous insulation, housewrap with tape air sealing, and proper window flashing. Insulated vinyl adds R-2 to R-3, which is a small but real gain. Fiber cement alone doesn&apos;t change your HERS score.",
    },
  ],
  sources: [
    {
      name: "James Hardie — Installation and Performance Specifications",
      url: "https://www.jameshardie.com/",
      note: "Manufacturer reference for fiber cement fire rating, lifespan, and maintenance",
    },
    {
      name: "Vinyl Siding Institute — Product Standards",
      url: "https://www.vinylsiding.org/",
      note: "Industry standards for vinyl siding performance and certification",
    },
    {
      name: "Angi — 2026 Siding Cost Report",
      url: "https://www.angi.com/articles/fiber-cement-siding-vs-vinyl-siding.htm",
      note: "Current installed cost ranges for vinyl and fiber cement",
    },
    {
      name: "ICC — International Wildland-Urban Interface Code",
      url: "https://codes.iccsafe.org/",
      note: "WUI regulations for fire-rated exterior cladding",
    },
  ],
  relatedCalculators: [
    {
      name: "Siding calculator",
      slug: "siding-calculator",
      description: "Squares and linear feet for any house exterior",
    },
    {
      name: "Insulation calculator",
      slug: "insulation-calculator",
      description: "R-value by climate zone for walls and attic",
    },
    {
      name: "Paint calculator",
      slug: "paint-calculator",
      description: "Gallons for exterior repaint cycles",
    },
    {
      name: "Gutter calculator",
      slug: "gutter-calculator",
      description: "Pair with new siding — drainage matters",
    },
  ],
};
