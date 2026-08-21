import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function CoverageSVG() {
  const depths = [
    { d: '1 in', sqft: 324, note: "topdressing a lawn" },
    { d: '2 in', sqft: 162, note: "overseeding, light fill" },
    { d: '4 in', sqft: 81, note: "new lawn base" },
    { d: '6 in', sqft: 54, note: "garden beds" },
    { d: '12 in', sqft: 27, note: "raised beds, deep fill" },
  ];
  const maxS = 324;
  return (
    <svg viewBox="0 0 680 272" width="100%" height="auto" role="img" aria-label="One cubic yard of topsoil covers 324 square feet at 1 inch deep, 162 at 2 inches, 81 at 4 inches, 54 at 6 inches, and 27 square feet at 12 inches.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>What one cubic yard covers</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>A cubic yard is 27 cubic feet. Spread it thinner and it goes further, in exact proportion.</text>
      {depths.map((x, i) => {
        const y = 74 + i * 38;
        const w = (x.sqft / maxS) * 236;
        return (
          <g key={x.d}>
            <text x="130" y={y + 12} textAnchor="end" fontSize="11.5" fontWeight="700" fill={i === 2 ? GUIDE_SVG.accent : GUIDE_SVG.ink}>{x.d} deep</text>
            <rect x="142" y={y} width={w} height="16" rx="3" fill={i === 2 ? GUIDE_SVG.accent : GUIDE_SVG.slate} />
            <text x={142 + w + 10} y={y + 12} fontSize="11" fontWeight="700" fill={i === 2 ? GUIDE_SVG.accent : GUIDE_SVG.inkMuted}>{x.sqft} ft&#178;</text>
            <text x="470" y={y + 12} fontSize="9.5" fill={GUIDE_SVG.inkFaint}>{x.note}</text>
          </g>
        );
      })}
      <text x="20" y="266" fontSize="9" fill={GUIDE_SVG.inkFaint}>Shortcut: square feet divided by 324, times depth in inches, equals cubic yards.</text>
    </svg>
  );
}

function WeightSVG() {
  return (
    <svg viewBox="0 0 680 244" width="100%" height="auto" role="img" aria-label="One cubic yard of topsoil weighs about 2,200 pounds dry and up to 3,000 pounds wet, equals 27 cubic feet, and equals about 36 bags at 40 pounds each.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>One cubic yard, three ways to think about it</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>The weight matters because delivery trucks and pickup beds are rated in tons, not yards</text>

      <rect x="52" y="82" width="164" height="86" rx="5" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <text x="134" y="112" textAnchor="middle" fontSize="15" fontWeight="700" fill={GUIDE_SVG.accent}>1 cubic yard</text>
      <text x="134" y="134" textAnchor="middle" fontSize="10.5" fill={GUIDE_SVG.inkMuted}>27 cubic feet</text>
      <text x="134" y="152" textAnchor="middle" fontSize="10.5" fill={GUIDE_SVG.inkMuted}>3 ft x 3 ft x 3 ft</text>

      <text x="238" y="130" fontSize="18" fill={GUIDE_SVG.inkFaint}>=</text>

      <rect x="272" y="82" width="164" height="86" rx="5" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
      <text x="354" y="112" textAnchor="middle" fontSize="15" fontWeight="700" fill={GUIDE_SVG.ink}>2,200 lb</text>
      <text x="354" y="134" textAnchor="middle" fontSize="10.5" fill={GUIDE_SVG.inkMuted}>dry screened topsoil</text>
      <text x="354" y="152" textAnchor="middle" fontSize="10.5" fill={GUIDE_SVG.warm}>up to 3,000 lb wet</text>

      <text x="458" y="130" fontSize="18" fill={GUIDE_SVG.inkFaint}>=</text>

      <rect x="492" y="82" width="164" height="86" rx="5" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1.5" />
      <text x="574" y="112" textAnchor="middle" fontSize="15" fontWeight="700" fill={GUIDE_SVG.ink}>36 bags</text>
      <text x="574" y="134" textAnchor="middle" fontSize="10.5" fill={GUIDE_SVG.inkMuted}>40 lb bags, 0.75 ft&#179; each</text>
      <text x="574" y="152" textAnchor="middle" fontSize="10.5" fill={GUIDE_SVG.inkMuted}>about 1,440 lb of product</text>

      <text x="20" y="204" fontSize="10.5" fontWeight="600" fill={GUIDE_SVG.ink}>Why the bag total weighs less</text>
      <text x="20" y="222" fontSize="10" fill={GUIDE_SVG.inkMuted}>Bagged soil is dried and often amended, so it is lighter and fluffier per cubic foot than bulk soil off a pile.</text>
      <text x="20" y="238" fontSize="9" fill={GUIDE_SVG.inkFaint}>A half ton pickup legally carries about half a cubic yard of wet topsoil. Two yards needs a delivery, not a truck bed.</text>
    </svg>
  );
}

function SoilTypesSVG() {
  const kinds = [
    { n: "Topsoil", d: "The A horizon: mineral soil with organic matter", use: "Lawns, grading, filling low spots", hl: true },
    { n: "Screened topsoil", d: "Topsoil run through a 1/2 in screen", use: "Anywhere finish quality matters" },
    { n: "Garden soil", d: "Topsoil already amended with compost", use: "Beds and borders, sold bagged" },
    { n: "Compost", d: "Decomposed organic matter, not soil", use: "An amendment, mixed 20 to 30 percent" },
    { n: "Fill dirt", d: "Subsoil, little or no organic matter", use: "Structural fill and grading only" },
  ];
  return (
    <svg viewBox="0 0 680 250" width="100%" height="auto" role="img" aria-label="Topsoil is mineral soil with organic matter; screened topsoil is sifted; garden soil is amended topsoil; compost is decomposed organic matter used as an amendment; fill dirt is subsoil for structural fill only.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>What is topsoil, and what it is not</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Five products sold side by side at every yard, and only two of them grow anything well</text>
      {kinds.map((k, i) => {
        const y = 74 + i * 34;
        return (
          <g key={k.n}>
            <rect x="26" y={y - 12} width="8" height="20" rx="2" fill={k.hl ? GUIDE_SVG.accent : GUIDE_SVG.slate} />
            <text x="44" y={y + 3} fontSize="11.5" fontWeight="700" fill={k.hl ? GUIDE_SVG.accent : GUIDE_SVG.ink}>{k.n}</text>
            <text x="190" y={y + 3} fontSize="9.5" fill={GUIDE_SVG.inkMuted}>{k.d}</text>
            <text x="466" y={y + 3} fontSize="9.5" fill={GUIDE_SVG.inkFaint}>{k.use}</text>
          </g>
        );
      })}
      <text x="20" y="244" fontSize="9" fill={GUIDE_SVG.inkFaint}>Fill dirt is cheaper for a reason. Putting it where you want grass is the most expensive saving in landscaping.</text>
    </svg>
  );
}

export function TopsoilCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="August 8, 2026"
        reviewedAgainst="USDA NRCS soil horizon definitions, Penn State Extension soil quality guidance, University of Minnesota Extension topsoil recommendations"
      />

      <h2>Everything divides by 324</h2>
      <p>
        A cubic yard of topsoil is 27 cubic feet, and spread one inch deep
        it covers 324 square feet. That single number does all the work.
        Two inches deep covers half as much, 162 square feet. Four inches
        covers 81. Twelve inches covers 27, which is to say a three by nine
        foot raised bed. Square feet divided by 324, multiplied by depth in
        inches, gives cubic yards, and the calculator above does exactly
        that with the density of your chosen material applied.
      </p>
      <p>
        What the arithmetic will not tell you is how much a yard weighs
        when it arrives, whether bags or bulk is cheaper for your job, what
        screened means on a price list, and whether the cheap material at
        the bottom of that list is topsoil at all. Those are the parts
        below.
      </p>

      <Figure
        number={1}
        caption="Coverage per cubic yard at each depth. The relationship is exactly linear, so halving the depth doubles the area covered."
      >
        <CoverageSVG />
      </Figure>

      <MethodologyNote>
        <p>
          Volume math is exact: 27 cubic feet per cubic yard, 324 square
          feet per yard at one inch of depth. Weight figures are typical
          values for screened topsoil and vary with moisture, clay
          content, and organic fraction, which is why suppliers sell by
          volume and haul by weight. The soil definitions follow USDA NRCS
          horizon terminology, where topsoil is the A horizon. Depth
          recommendations for lawns and beds follow university extension
          guidance.
        </p>
      </MethodologyNote>

      <h2>How much does a yard of topsoil weigh</h2>
      <p>
        Roughly 2,200 pounds dry, which is a little over a ton, and up to
        3,000 pounds saturated after rain. That spread is not trivia. A
        half ton pickup is rated for about 1,000 pounds of payload, which
        means it can legally carry under half a yard of wet topsoil, and
        the yard will happily load a full yard into it if you ask. Two
        yards or more is a delivery, and most suppliers set a minimum of
        two or three yards for the truck to leave the lot anyway.
      </p>
      <p>
        The comparison worth internalizing is bags against bulk. A 40 pound
        bag holds about 0.75 cubic feet, so it takes 36 bags to make one
        cubic yard. At $4 a bag that is $144, against $25 to $60 for a bulk
        yard delivered in most markets. Bags win for a single planter or a
        few low spots, where you would otherwise pay a delivery fee to move
        a wheelbarrow of soil. Bulk wins on anything past about half a
        yard, which is to say almost every real project.
      </p>

      <Figure
        number={2}
        caption="The three equivalent ways to buy one cubic yard. Bagged product weighs less for the same volume because it is dried and fluffed; it is not a different amount of soil."
      >
        <WeightSVG />
      </Figure>

      <ComparisonTable
        caption="Typical 2026 US pricing. Bulk prices are per cubic yard delivered, and most suppliers require a two or three yard minimum for delivery."
        columns={[
          { title: "Bulk, per yard" },
          { title: "Bagged equivalent", highlight: true },
          { title: "When bags win" },
        ]}
        rows={[
          { label: "Unscreened topsoil", values: ["$12-30", "not usually bagged", "Never; this is a bulk product"] },
          { label: "Screened topsoil", values: ["$25-60", "$144 (36 bags)", "Under half a yard"] },
          { label: "Garden soil mix", values: ["$35-80", "$180 (36 bags)", "Containers and single beds"] },
          { label: "Compost", values: ["$30-70", "$160 (36 bags)", "Small amendment quantities"] },
          { label: "Fill dirt", values: ["$5-20", "not bagged", "Never"] },
        ]}
      />

      <h2>Screened, unscreened, and what the words mean</h2>
      <p>
        Screened topsoil has been run through a mesh, usually a half inch
        or three eighths, which removes rocks, roots, clumps, and most of
        the debris. It rakes smooth, spreads evenly, and costs roughly
        double the unscreened equivalent. Unscreened topsoil comes off the
        pile as it was stripped, and it will contain stones, wood, and the
        occasional surprise. For filling a hole or building up a grade that
        will be buried under something else, unscreened is fine and the
        saving is real. For anything that will be seeded, sodded, or
        planted into, screened is worth the difference, because every rock
        in unscreened soil eventually becomes a rock in your lawn.
      </p>
      <p>
        Two other terms show up on the same price list. Pulverized or
        shredded topsoil has been mechanically broken up as well as
        screened, and is the finest grade. Blended or super soil is topsoil
        pre-mixed with compost at some ratio the supplier chooses, which
        can be excellent value or mostly filler depending on the yard;
        asking what the ratio is separates the two.
      </p>

      <Figure
        number={3}
        caption="The five products, in the order you will find them priced. Fill dirt at the bottom is not a budget version of topsoil; it is a different material for a different job."
      >
        <SoilTypesSVG />
      </Figure>

      <h2>Topsoil, garden soil, compost, and fill dirt</h2>
      <p>
        Topsoil is the A horizon in soil science terms: the upper layer of
        mineral soil that carries the organic matter, the biology, and most
        of the nutrients. Fill dirt is subsoil from below that layer,
        stripped of organic matter, and it is sold for structural purposes,
        filling voids, building up grade, backfilling against foundations.
        It compacts well, which is exactly why nothing grows in it. Putting
        fill dirt where you intend to grow grass is the most expensive
        saving in landscaping, because you pay again to fix it.
      </p>
      <p>
        Garden soil is topsoil already amended, usually with compost, and
        sold bagged at a premium. Compost is not soil at all; it is
        decomposed organic matter, and used alone it holds too much water
        and settles dramatically. The standard practical recipe is to mix
        compost into topsoil at 20 to 30 percent by volume for beds, which
        is why a calculator that lets you price both separately is more
        useful than one that assumes a blend.
      </p>

      <ComparisonTable
        caption="Depth by project. Existing soil quality shifts these; poor subsoil under a new lawn argues for the top of each range."
        columns={[
          { title: "Depth" },
          { title: "Yards per 1,000 ft²", highlight: true },
        ]}
        rows={[
          { label: "Topdressing an established lawn", values: ['1/4 to 1/2 in', "0.8 to 1.5"] },
          { label: "Overseeding or light repair", values: ['1 to 2 in', "3 to 6"] },
          { label: "New lawn from seed or sod", values: ['4 to 6 in', "12 to 19"] },
          { label: "Vegetable and flower beds", values: ['6 to 12 in', "19 to 37"] },
          { label: "Raised bed fill", values: ['10 to 12 in', "31 to 37"] },
        ]}
      />

      <p>
        One caution on topdressing: a quarter to a half inch at a time is
        the limit on an established lawn. Burying existing grass under two
        inches of soil smothers it, and the correct approach for a badly
        uneven lawn is several thin applications across seasons rather than
        one thick one. For a lawn being built from scratch, four to six
        inches of screened topsoil over loosened subsoil is the extension
        recommendation, and skimping here is the single most common reason
        a new lawn struggles for years.
      </p>

      <Scenario location="Indianapolis, IN">
        <p>
          A 1,200 square foot back lawn being rebuilt after a pool removal
          left the area rough and compacted. The plan is 4 inches of
          screened topsoil before seeding, plus 6 inches in two new beds
          totaling 180 square feet.
        </p>
        <p>
          Lawn: 1,200 / 324 x 4 = 14.8 cubic yards. Beds: 180 / 324 x 6 =
          3.3 yards, with compost mixed in at 25 percent, so about 2.5
          yards of topsoil and 0.8 of compost. Total order: roughly 18
          yards of screened topsoil and 1 yard of compost. At $40 delivered
          per yard that is about $760, arriving in two truckloads because
          18 yards at 2,200 pounds each is nearly 20 tons. Bagged, the same
          soil would be 648 bags and about $2,600, which is the moment the
          bags-versus-bulk question answers itself.
        </p>
      </Scenario>

      <h2>Where topsoil orders go wrong</h2>
      <p>
        <strong>Ordering by weight when the price is by volume.</strong>{" "}
        Suppliers quote cubic yards but load by the bucket and sometimes
        bill by the ton. A ton is not a yard. If a quote mixes the two,
        ask which one the price is per.
      </p>
      <p>
        <strong>Underestimating settling.</strong> Fresh topsoil settles 10
        to 20 percent as it is watered and walked on, more if it is loose
        and organic. Order the calculated amount plus a margin, or expect
        to be low.
      </p>
      <p>
        <strong>Buying fill dirt to save money.</strong> Covered above and
        the most consequential error on this page.
      </p>
      <p>
        <strong>Not asking where it came from.</strong> Topsoil is a
        stripped natural product, not a manufactured one, and quality
        varies enormously between suppliers and even between piles.
        Screened soil from a reputable yard is a known quantity; a cheap
        load from an unknown source can arrive full of clay, construction
        debris, or weed seed. Ask to look at the pile before ordering, and
        squeeze a handful: good topsoil crumbles, clay-heavy soil holds the
        shape of your fist.
      </p>

      <Callout label="Test the soil you already have first">
        A soil test through your state extension service costs $10 to $25
        and tells you pH, organic matter, and nutrient levels. It
        frequently reveals that existing soil needs amendment rather than
        replacement, which is a fraction of the cost of trucking in yards
        of new material. This is especially worth doing before a large
        order, since the test result may change what you buy or how much.
      </Callout>

      <h2>The rest of the yard</h2>
      <p>
        Topsoil usually arrives alongside other bulk material. The{" "}
        <a href="/mulch-calculator">mulch calculator</a> covers the layer
        that goes on top of finished beds, the{" "}
        <a href="/sod-calculator">sod calculator</a> handles the lawn that
        goes over the graded soil, and base material for paths and patios
        is a <a href="/gravel-calculator">gravel calculator</a> question.
        If you are capturing rain to water any of it, the{" "}
        <a href="/rainwater-calculator">rainwater calculator</a> sizes the
        catchment.
      </p>
      <p>
        Measure the area, decide the depth honestly, and order in yards.
        Running short mid-project means a second delivery fee for a
        fraction of a load, which is the most avoidable cost in the whole
        job.
      </p>
    </>
  );
}
