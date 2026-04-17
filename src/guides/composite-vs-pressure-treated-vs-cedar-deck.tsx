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
        Every deck material article on the internet pretends this is a
        complicated decision. It isn&apos;t. Three materials dominate
        residential decking — pressure-treated pine, cedar, and composite
        — and the choice comes down to three questions: how much do you
        want to spend up front, how much maintenance are you willing to
        do, and how long are you staying in the house?
      </p>

      <p>
        Most comparisons skip the 20-year cost breakdown that actually
        matters. Pressure-treated lumber is cheaper to install but needs
        sealing every 2 years or it rots. Composite costs 2× up front but
        needs essentially nothing. Cedar splits the difference — looks
        better than pressure-treated, lasts longer, still needs periodic
        care. We&apos;re going to do the math honestly for a typical 320
        square foot deck (16 × 20 ft, standard residential size).
      </p>

      <VerdictCard verdict="Pressure-treated wins on 5-year cost. Composite wins on 20-year cost. Cedar wins on looks if you&apos;ll actually maintain it.">
        If you&apos;re staying in the house under 10 years, pressure-treated
        is fine. If you&apos;ll own it 15+ years and don&apos;t want to seal
        a deck every 2 years, composite is the rational choice. Cedar is a
        beautiful middle ground that requires a commitment to ongoing
        maintenance.
      </VerdictCard>

      <h2>The 20-year cost comparison</h2>

      <p>
        Here are the real numbers for a 320 sq ft deck, including the
        maintenance cycles each material actually requires. Material costs
        are for decking boards only — the frame (joists, beams, posts) is
        pressure-treated lumber regardless, and costs roughly the same
        across all three options.
      </p>

      <ComparisonTable
        columns={[
          { title: "Pressure-treated", subtitle: "Southern yellow pine" },
          { title: "Cedar", subtitle: "Western red cedar" },
          { title: "Composite", subtitle: "Trex, TimberTech, Azek" },
        ]}
        rows={[
          {
            label: "Decking material",
            values: ["$3–6 / ft²", "$4–8 / ft²", "$5–14 / ft²"],
          },
          {
            label: "Total installed",
            values: ["$25–50 / ft²", "$30–47 / ft²", "$40–80 / ft²"],
          },
          {
            label: "320 ft² installed",
            values: ["$8,000–16,000", "$9,600–15,000", "$13,000–26,000"],
          },
          {
            label: "Lifespan",
            values: ["10–15 years", "15–25 years", "25–50 years"],
          },
          {
            label: "Sealing required",
            values: [
              "Every 1–2 yrs",
              "Every 2–3 yrs",
              "None",
            ],
          },
          {
            label: "Annual maintenance",
            values: ["$150–300", "$120–250", "$30 (cleaning)"],
          },
        ]}
        caption="Ranges from HomeGuide, Angi, and NerdWallet, Jan 2026. Installed cost includes frame, fasteners, and labor — the frame is pressure-treated across all three."
      />

      <h2>The 20-year total cost: where assumptions matter</h2>

      <p>
        The installed cost is where most comparisons stop. For a real
        decision, you need to account for what happens after year 1. Here
        are the 20-year totals using mid-range installed prices ($38/ft²
        PT, $38/ft² cedar, $60/ft² composite) and realistic maintenance
        costs:
      </p>

      <ComparisonTable
        columns={[
          { title: "Pressure-treated" },
          { title: "Cedar" },
          { title: "Composite" },
        ]}
        rows={[
          {
            label: "Installation",
            values: ["$12,000", "$12,000", "$19,000"],
          },
          {
            label: "Sealing (× 10 or 7)",
            values: [
              "$3,000 (10 × $300)",
              "$1,750 (7 × $250)",
              "$0",
            ],
          },
          {
            label: "Replacement at year 15",
            values: ["$12,000 (decking only)", "$0", "$0"],
          },
          {
            label: "Power washing / cleaning",
            values: ["$800", "$600", "$600"],
          },
          {
            label: "20-year total",
            values: [
              <strong key="pt">$27,800</strong>,
              <strong key="cedar">$14,350</strong>,
              <strong key="comp">$19,600</strong>,
            ],
          },
          {
            label: "Per year amortized",
            values: ["$1,390 / yr", "$718 / yr", "$980 / yr"],
          },
        ]}
        caption="Sealing costs assume DIY ($75 material) or hired ($300 per job). The PT replacement at year 15 reflects realistic decking lifespan — the frame typically survives, only surface boards are replaced."
      />

      <p>
        The numbers above reveal something counterintuitive. Pressure-treated
        lumber is the <em>most expensive</em> material over 20 years on a
        maintained deck, because the sealing cost dominates and you likely
        replace the decking at year 15. Cedar, surprisingly, is the
        cheapest long-term option — but only if you actually stay on top
        of the sealing cycle. Composite sits in the middle, with the
        advantage of minimal effort.
      </p>

      <Callout label="The reality gap">
        Most homeowners don&apos;t seal pressure-treated decks on schedule.
        They seal it once in year 2, feel virtuous, then don&apos;t think
        about it for 8 years and end up with a deck that&apos;s rotting
        prematurely. If you&apos;re being honest with yourself about
        maintenance habits, composite&apos;s value proposition gets much
        stronger.
      </Callout>

      <h2>Pressure-treated: the cheapest start, the hardest ongoing</h2>

      <p>
        Pressure-treated Southern yellow pine is the default residential
        decking material. The wood is infused with copper-based preservatives
        (modern PT uses copper azole or MCA — the arsenic-based CCA was
        phased out of residential use in 2003) to resist rot and insects.
      </p>

      <p>What you get with pressure-treated:</p>

      <ul>
        <li>
          <strong>Lowest up-front cost.</strong> The cheapest way to
          cover 320 square feet of ground with a walkable surface.
        </li>
        <li>
          <strong>Widespread availability.</strong> Every lumberyard and
          home center stocks it in standard sizes (5/4 × 6 inches, 2 × 6
          inches in 8, 10, 12, 16 foot lengths).
        </li>
        <li>
          <strong>Workability.</strong> Standard carpentry tools. No
          special blades, fasteners, or techniques. A handy homeowner can
          build a PT deck over a long weekend.
        </li>
      </ul>

      <p>What you have to live with:</p>

      <ul>
        <li>
          <strong>Aggressive maintenance cycle.</strong> Seal in year 1
          (after the wood dries for 3–6 months). Re-seal every 1–2 years.
          Miss a cycle and the wood checks, cracks, and starts showing
          gray. Miss three cycles and you&apos;re replacing boards.
        </li>
        <li>
          <strong>The green tint.</strong> Fresh PT has a distinct greenish
          cast from the copper treatment. It dulls to a dirty gray within
          6 months if you don&apos;t stain it, which most people don&apos;t
          love.
        </li>
        <li>
          <strong>Warping and cupping.</strong> PT lumber ships wet. As it
          dries, boards twist, warp, and cup. The better installers let
          boards acclimate for 2–4 weeks before laying them; the cheaper
          ones install straight off the truck and you get a rippled deck
          in 6 months.
        </li>
        <li>
          <strong>Fastener corrosion.</strong> Copper-treated PT is
          corrosive to standard galvanized fasteners. Use stainless steel
          or specifically rated ACQ/MCA-compatible fasteners. A deck built
          with cheap screws has fasteners failing by year 10.
        </li>
      </ul>

      <h2>Cedar: the aesthetic compromise</h2>

      <p>
        Western red cedar is a naturally rot-resistant softwood — no
        chemical treatment needed. It&apos;s straight-grained, lightweight,
        dimensionally stable (doesn&apos;t warp like PT), and has a
        distinctive warm reddish-brown color that ages to silver-gray if
        untreated.
      </p>

      <StatGrid
        items={[
          {
            value: "7–10x",
            label: "Cedar vs PT in fewer warping issues",
          },
          {
            value: "3–5 yrs",
            label: "Cedar board lifespan without sealing",
            note: "Still functional, just weathered gray",
          },
          {
            value: "30%",
            label: "Harder to find than PT",
            note: "Lumberyards may special-order",
          },
        ]}
      />

      <p>
        Cedar&apos;s selling points are real: it looks better than PT both
        new and weathered, it&apos;s naturally rot-resistant (no chemical
        treatment), it stays straight over time, and the grain refuses the
        chemical-treatment look some people find cheap-looking on PT.
      </p>

      <p>
        Its downsides are fewer but real:
      </p>

      <ul>
        <li>
          <strong>Softness.</strong> Cedar dents easily. A dropped grill
          utensil, a dog&apos;s claws, a dragged chair — all leave marks.
          If you have kids, dogs, or use your deck heavily, cedar shows
          every interaction.
        </li>
        <li>
          <strong>Availability.</strong> Not every lumberyard stocks
          cedar decking. Smaller markets may require special-ordering,
          which adds weeks to timelines.
        </li>
        <li>
          <strong>Sealing still required.</strong> To maintain the warm
          reddish look, seal every 2–3 years with a UV-blocking stain.
          Without sealing, cedar turns silver-gray — still functional but
          not what you paid for.
        </li>
        <li>
          <strong>Regional bias.</strong> Cedar is cheaper in the Pacific
          Northwest (where it&apos;s harvested) and more expensive east of
          the Mississippi. In some Eastern markets, cedar costs more than
          composite.
        </li>
      </ul>

      <h2>Composite: the set-and-forget premium</h2>

      <p>
        Modern composite decking — the Trex, TimberTech, and Azek brands
        dominate the market — is either wood-plastic composite (WPC) or
        fully synthetic (PVC, which Azek and TimberTech&apos;s AZEK line
        are). Both are engineered to need essentially zero maintenance
        beyond occasional cleaning.
      </p>

      <p>
        Three generations of composite have shipped since 2000, and the
        old complaints (fade, staining, mold) have been mostly engineered
        out of premium modern boards with polymer capstock coatings. If
        you looked at composite 15 years ago and dismissed it, the product
        has changed considerably.
      </p>

      <ComparisonTable
        columns={[
          { title: "Capped composite", subtitle: "Trex Transcend, TimberTech AZEK" },
          { title: "PVC", subtitle: "Azek, TimberTech Vintage" },
        ]}
        rows={[
          {
            label: "Material cost",
            values: ["$5–10 / ft²", "$8–14 / ft²"],
          },
          {
            label: "Lifespan",
            values: ["25–30 years", "30–50 years"],
          },
          {
            label: "Surface temperature",
            values: ["Hot in direct sun", "Slightly cooler"],
          },
          {
            label: "Weight",
            values: ["70 lb/ft³", "50 lb/ft³ (lighter)"],
          },
          {
            label: "Warranty",
            values: ["25-yr fade/stain", "30–50-yr fade/stain"],
          },
        ]}
      />

      <p>The two things composite still can&apos;t solve:</p>

      <ul>
        <li>
          <strong>Heat retention.</strong> Dark composite in direct sun
          can reach 140°F+ — bare feet get burned. Choose lighter colors
          if your deck gets full afternoon sun. Fully capped PVC stays
          slightly cooler than WPC.
        </li>
        <li>
          <strong>Looks like plastic (sometimes).</strong> Budget composite
          still reads as plastic from some angles. Premium boards
          (TimberTech AZEK Landmark, Trex Transcend) now genuinely look
          like wood at normal viewing distances. Don&apos;t judge composite
          by what you saw 10 years ago.
        </li>
      </ul>

      <CalculatorCTA
        name="Deck calculator"
        slug="deck-calculator"
        description="Calculate boards, joists, beams, fasteners, and concrete for your deck. Includes material selector and estimates by decking type."
      />

      <h2>Climate considerations</h2>

      <p>
        Material choice changes with climate more than most comparisons
        admit. Here&apos;s what to watch:
      </p>

      <ul>
        <li>
          <strong>Hot, sunny climates</strong> (Southwest, Gulf Coast,
          Southern California): composite gets hot. Choose light colors,
          or stick with wood. Cedar handles heat well; PT is fine but
          fades quickly in UV.
        </li>
        <li>
          <strong>Cold, snowy climates</strong> (New England, Upper
          Midwest, Rockies): freeze-thaw cycles are brutal on sealed wood.
          PT without religious sealing fails fastest here. Composite is
          the lowest-maintenance option for snow regions.
        </li>
        <li>
          <strong>Hot, humid climates</strong> (Southeast, Gulf Coast):
          mold and algae thrive. Composite with anti-mold capstock (Trex
          Transcend, all PVC) handles this best. Cedar holds up OK with
          annual cleaning. PT is the most problematic.
        </li>
        <li>
          <strong>Mild climates</strong> (Pacific Northwest excluding
          Seattle rain, Mid-Atlantic coast, parts of California): every
          material works. Choose based on cost and maintenance preference.
        </li>
      </ul>

      <h2>The frame doesn&apos;t care</h2>

      <p>
        Regardless of what you choose for the surface boards, the frame
        underneath — joists, beams, posts, ledger board — is pressure-treated
        lumber. Some premium builds use steel frames, but that&apos;s 5%
        of residential decks. The frame is PT because it&apos;s hidden,
        it&apos;s cheap, and it doesn&apos;t need to look good.
      </p>

      <p>
        This matters for budgeting: the material choice only affects the
        surface — roughly 40% of your total material cost. Switching from
        PT to composite on a 320 sq ft deck might add $2,000–$4,000 in
        decking boards, not the 2× number you&apos;d get if you applied
        the ratio to the whole job.
      </p>

      <Callout label="Flashing around the ledger">
        Whatever you choose, ensure proper ledger flashing where the deck
        meets the house. The #1 cause of deck rot isn&apos;t the decking
        material — it&apos;s water getting behind the ledger board and
        rotting the rim joist of the house. Proper flashing is a 30-minute
        detail that prevents $10,000 of structural damage.
      </Callout>

      <h2>Installation differences you should know</h2>

      <ul>
        <li>
          <strong>Fasteners.</strong> PT needs stainless or ACQ-rated
          fasteners (standard galvanized corrodes). Cedar takes any
          corrosion-resistant fastener. Composite needs hidden fasteners
          for the polished look or color-matched top screws.
        </li>
        <li>
          <strong>Gapping.</strong> All three materials need gaps between
          boards for expansion. PT needs the largest gap (1/4 inch) because
          it&apos;s wet when installed and will shrink. Cedar gaps
          typically 1/8 inch. Composite requires specific manufacturer
          gapping (Trex: 1/4 inch end-to-end on 16 ft boards).
        </li>
        <li>
          <strong>Joist spacing.</strong> PT and cedar: 16 inches on center
          is standard. Composite: 12 inches on center for 45°+ diagonal
          installs, 16 inches for straight. Wider spacing causes composite
          to sag. Check your brand&apos;s spec before framing.
        </li>
      </ul>

      <h2>Bottom line</h2>

      <p>
        Here&apos;s the honest recommendation, based on situation:
      </p>

      <ul>
        <li>
          <strong>Selling within 5 years:</strong> pressure-treated. No
          point paying for long-term value you won&apos;t see.
        </li>
        <li>
          <strong>Staying 10+ years, don&apos;t like maintenance:</strong> composite.
          The math works and you&apos;ll thank yourself every spring.
        </li>
        <li>
          <strong>Want a wood look, will maintain it:</strong> cedar.
          Cheapest 20-year option if you&apos;re religious about sealing.
        </li>
        <li>
          <strong>Budget is tight, will maintain it religiously:</strong> pressure-treated
          with a commitment to the sealing cycle.
        </li>
        <li>
          <strong>Hot sunny climate:</strong> wood (PT or cedar) over dark
          composite; light composite is fine.
        </li>
      </ul>

      <p>
        Before committing, run the math for your specific deck size with
        the <a href="/deck-calculator">Tallyard deck calculator</a>. The
        lumber needed, fastener count, and concrete for footings scale
        with your dimensions — and the difference between a good estimate
        and a bad one is usually 2 extra trips to the lumberyard.
      </p>
    </>
  );
}

export const compositeVsPTVsCedarDeckGuide: GuideConfig = {
  slug: "composite-vs-pressure-treated-vs-cedar-deck",
  title: "Composite vs pressure-treated vs cedar decking: 20-year cost breakdown",
  description:
    "Real 20-year total cost of ownership for composite, pressure-treated, and cedar decking. Installation, maintenance, and when each material wins.",
  bannerHeadline: "Composite vs pressure-treated vs cedar.",
  bannerTags: ["20-year TCO", "Climate-matched", "Frame + surface"],
  categoryLabel: "Landscaping",
  category: "landscaping",
  heroValue: "20-YEAR TCO",
  publishedAt: "2026-04-18",
  readTime: "12 min read",
  Content,
  faq: [
    {
      question: "Is composite decking really worth the premium?",
      answer:
        "Over 20 years, composite costs less than pressure-treated and about 40% more than cedar, assuming you actually maintain the wood decks on schedule. If you&apos;re honest about not wanting to seal a deck every 1-2 years, composite becomes the most economical choice by a wide margin. If you love weekend maintenance projects, cedar beats it on pure dollars.",
    },
    {
      question: "How long does pressure-treated decking actually last?",
      answer:
        "With proper sealing every 1-2 years, 15-20 years. Without consistent sealing, 10-12 years before boards warp or rot. The frame underneath typically lasts 20-30 years regardless — it&apos;s the surface boards that fail first.",
    },
    {
      question: "What&apos;s the best time of year to install a deck?",
      answer:
        "Spring (after the last hard freeze) through early fall. Avoid installing pressure-treated in summer heat — boards dry out and shrink too fast, creating gaps. Avoid composite in extreme cold — PVC becomes brittle below 20°F. Cedar is flexible year-round.",
    },
    {
      question: "Can I mix materials — composite decking with a PT frame?",
      answer:
        "Yes, that&apos;s the standard approach. The frame (joists, beams, posts) is always pressure-treated regardless of surface material. Some homeowners use PT deck boards for the framing visible around the stairs and composite for the walking surface. Works fine; just match fastener types.",
    },
    {
      question: "How do I know if my composite deck is Trex vs Azek vs TimberTech?",
      answer:
        "Check the brand stamp on the bottom of any board. Trex boards stamp &apos;Trex&apos; + product line (Transcend, Enhance, Select). Azek is now TimberTech; look for &apos;AZEK&apos; or &apos;TimberTech&apos; with series name (Vintage, Reserve, Pro). Some budget composites are unbranded store private label — these are typically the oldest, least durable composite on the market.",
    },
    {
      question: "Do composite decks get too hot in direct sun?",
      answer:
        "Dark colors in full sun can reach 140°F+ — yes, too hot for bare feet. Light colors (sandy browns, tan, gray) stay 30-40°F cooler. PVC boards (Azek, TimberTech Vintage) are meaningfully cooler than WPC because of their surface composition. If your deck faces south or west with no shade, choose light composite or stick with wood.",
    },
    {
      question: "How often do I really need to seal a wood deck?",
      answer:
        "Pressure-treated: first seal 3-6 months after install (boards need to dry), then every 1-2 years. Cedar: first seal immediately after install if you want to keep the red color, then every 2-3 years. Skipping cycles doesn&apos;t immediately kill the deck but shortens lifespan by roughly 20% per missed application.",
    },
    {
      question: "What&apos;s the difference between WPC and PVC composite?",
      answer:
        "WPC (wood-plastic composite) is typically ~40% wood fiber mixed with plastic — Trex is the classic example. PVC (polyvinyl chloride) is fully synthetic — Azek started this category. PVC is lighter, slightly more expensive, fade-resistant longer, and stays cooler in sun. WPC feels more like wood, accepts routed patterns better, and costs less. Both are valid choices.",
    },
  ],
  sources: [
    {
      name: "North American Deck and Railing Association (NADRA)",
      url: "https://www.nadra.org/",
      note: "Industry reference for decking installation and materials",
    },
    {
      name: "Trex — Technical Installation Guide",
      url: "https://www.trex.com/",
      note: "Joist spacing, gapping, and fastener requirements for capped composite",
    },
    {
      name: "American Wood Council — Span Tables",
      url: "https://awc.org/",
      note: "Structural reference for deck framing with PT, cedar, and redwood",
    },
    {
      name: "HomeGuide — 2026 Deck Cost Report",
      url: "https://homeguide.com/costs/cost-to-build-a-deck",
      note: "Current installed cost ranges for all deck materials",
    },
  ],
  relatedCalculators: [
    {
      name: "Deck calculator",
      slug: "deck-calculator",
      description: "Boards, joists, beams, and fasteners for any deck",
    },
    {
      name: "Lumber calculator",
      slug: "lumber-calculator",
      description: "Board feet for framing and decking orders",
    },
    {
      name: "Concrete calculator",
      slug: "concrete-calculator",
      description: "Footings and post piers for deck support",
    },
    {
      name: "Stair calculator",
      slug: "stair-calculator",
      description: "Code-compliant stairs from deck to ground",
    },
  ],
};
