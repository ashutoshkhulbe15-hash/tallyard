import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function TonnageSVG() {
  return (
    <svg viewBox="0 0 680 250" width="100%" height="auto" role="img" aria-label="Asphalt tonnage formula: area in square feet times thickness in feet times 145 pounds per cubic foot, divided by 2000, gives tons. A 20 by 40 foot driveway at 3 inches is 14.5 tons.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>The asphalt tonnage formula</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Asphalt is quoted, hauled, and billed by the ton, never by the square foot</text>

      <rect x="40" y="76" width="600" height="42" rx="5" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <text x="340" y="103" textAnchor="middle" fontSize="13" fontWeight="700" fill={GUIDE_SVG.accent} fontFamily="monospace">tons = area ft&#178; x (thickness in / 12) x 145 lb/ft&#179; / 2,000</text>

      <text x="40" y="152" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>Worked: a 20 by 40 ft driveway at 3 in compacted</text>
      <text x="40" y="174" fontSize="11" fill={GUIDE_SVG.inkMuted}>800 ft&#178; x 0.25 ft = 200 ft&#179; of compacted asphalt</text>
      <text x="40" y="194" fontSize="11" fill={GUIDE_SVG.inkMuted}>200 x 145 = 29,000 lb</text>
      <text x="40" y="214" fontSize="11" fontWeight="700" fill={GUIDE_SVG.accent}>29,000 / 2,000 = 14.5 tons, plus waste</text>

      <text x="20" y="242" fontSize="9" fill={GUIDE_SVG.inkFaint}>145 lb per cubic foot is compacted hot mix. Loose from the truck it is nearer 110, which is why the number must be compacted thickness.</text>
    </svg>
  );
}

function ThicknessSVG() {
  const layers = [
    { n: "Overlay on sound asphalt", base: 0, surf: 2, note: "resurfacing only, no new base" },
    { n: "Residential driveway", base: 6, surf: 3, note: "the standard build" },
    { n: "Heavy vehicles, RV pad", base: 8, surf: 4, note: "trucks, trailers, boats" },
    { n: "Parking lot", base: 10, surf: 6, note: "commercial traffic" },
  ];
  const scale = 5;
  return (
    <svg viewBox="0 0 680 262" width="100%" height="auto" role="img" aria-label="Asphalt build-ups: 2 inch overlay with no new base, 3 inch surface over 6 inch aggregate base for residential driveways, 4 over 8 for heavy vehicles, 6 over 10 for parking lots.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Asphalt thickness, and the base underneath</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>The base matters more than the asphalt. Most driveway failures are base failures.</text>
      {layers.map((l, i) => {
        const y = 78 + i * 44;
        const bw = l.base * scale;
        const sw = l.surf * scale;
        return (
          <g key={l.n}>
            <text x="196" y={y + 14} textAnchor="end" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{l.n}</text>
            <rect x="208" y={y} width={sw * 3.4} height="20" fill={GUIDE_SVG.ink} opacity="0.82" />
            <text x={208 + sw * 3.4 + 8} y={y + 14} fontSize="10.5" fontWeight="700" fill={GUIDE_SVG.ink}>{l.surf} in</text>
            {bw > 0 && (
              <>
                <rect x={208 + sw * 3.4 + 44} y={y} width={bw * 2.6} height="20" fill={GUIDE_SVG.slate} />
                <text x={208 + sw * 3.4 + 44 + bw * 2.6 + 8} y={y + 14} fontSize="10.5" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{l.base} in base</text>
              </>
            )}
            <text x="208" y={y + 32} fontSize="9" fill={GUIDE_SVG.inkFaint}>{l.note}</text>
          </g>
        );
      })}
      <rect x="208" y="248" width="12" height="8" fill={GUIDE_SVG.ink} opacity="0.82" />
      <text x="226" y="256" fontSize="9" fill={GUIDE_SVG.inkFaint}>hot mix asphalt</text>
      <rect x="330" y="248" width="12" height="8" fill={GUIDE_SVG.slate} />
      <text x="348" y="256" fontSize="9" fill={GUIDE_SVG.inkFaint}>compacted aggregate base</text>
    </svg>
  );
}

function CostSVG() {
  const opts = [
    { n: "Sealcoating", lo: 0.15, hi: 0.35, note: "maintenance, every 2 to 4 years" },
    { n: "Overlay 2 in", lo: 2.0, hi: 4.5, note: "if the base is still sound" },
    { n: "New asphalt driveway", lo: 4.0, hi: 9.0, note: "tear out, base, and paving" },
    { n: "Recycled asphalt", lo: 2.0, hi: 5.0, note: "millings, compacted, no binder" },
    { n: "Concrete driveway", lo: 8.0, hi: 18.0, note: "for comparison" },
  ];
  const maxV = 18;
  return (
    <svg viewBox="0 0 680 262" width="100%" height="auto" role="img" aria-label="Driveway cost per square foot installed: sealcoating 15 to 35 cents, 2 inch overlay 2 to 4.50 dollars, new asphalt 4 to 9 dollars, recycled millings 2 to 5, concrete 8 to 18 dollars.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Installed cost per square foot, 2026</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Asphalt prices track crude oil, so quotes older than a season are not quotes</text>
      {opts.map((o, i) => {
        const y = 76 + i * 36;
        const x1 = 196 + (o.lo / maxV) * 330;
        const x2 = 196 + (o.hi / maxV) * 330;
        return (
          <g key={o.n}>
            <text x="188" y={y + 12} textAnchor="end" fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{o.n}</text>
            <line x1="196" y1={y + 8} x2="526" y2={y + 8} stroke={GUIDE_SVG.line} strokeWidth="1" />
            <rect x={x1} y={y} width={Math.max(6, x2 - x1)} height="16" rx="8" fill={i === 2 ? GUIDE_SVG.accent : GUIDE_SVG.slate} />
            <text x="540" y={y + 12} fontSize="10.5" fontWeight="700" fill={i === 2 ? GUIDE_SVG.accent : GUIDE_SVG.inkMuted}>${o.lo} to ${o.hi}</text>
            <text x="196" y={y + 28} fontSize="9" fill={GUIDE_SVG.inkFaint}>{o.note}</text>
          </g>
        );
      })}
      <text x="20" y="256" fontSize="9" fill={GUIDE_SVG.inkFaint}>An 800 square foot driveway: about $150 to sealcoat, $2,600 to overlay, $5,200 to replace in asphalt, $10,000 in concrete.</text>
    </svg>
  );
}

export function AsphaltCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="August 8, 2026"
        reviewedAgainst="Asphalt Institute MS-2 mix design, NAPA construction guidance, ASTM D6926 density practice"
      />

      <h2>Asphalt is bought by the ton, so everything converts to weight</h2>
      <p>
        A paving contractor quotes tons because that is what arrives on the
        truck and what the plant bills for. Your driveway is measured in
        square feet. The bridge between them is density: compacted hot mix
        asphalt weighs about 145 pounds per cubic foot, so area times
        thickness in feet times 145, divided by 2,000, gives tons. A 20 by
        40 foot driveway at 3 inches compacted is 14.5 tons before waste.
      </p>
      <p>
        The word doing the work in that sentence is compacted. Loose from
        the truck, asphalt runs nearer 110 pounds per cubic foot and
        occupies roughly a quarter more volume than it will once rolled.
        Calculate at the finished thickness you want, not the depth of the
        pile. The calculator above handles the conversion including waste;
        this page covers thickness, base, cost, and when an overlay beats a
        replacement.
      </p>

      <Figure
        number={1}
        caption="The formula and a worked example. Metric equivalent: 2.3 tonnes per cubic metre of compacted mix, which is the same density expressed differently."
      >
        <TonnageSVG />
      </Figure>

      <MethodologyNote>
        <p>
          Density of 145 pounds per cubic foot, equivalent to about 2.3
          tonnes per cubic metre, is the standard compacted unit weight for
          dense-graded hot mix asphalt and is the value this calculator
          applies. Actual mix density varies with aggregate and binder
          content, and field compaction is verified against a control
          density under ASTM D6926 practice. Thickness and base
          recommendations follow Asphalt Institute and NAPA guidance for
          residential and light commercial pavement.
        </p>
      </MethodologyNote>

      <h2>How thick should a driveway be</h2>

      <Figure
        number={2}
        caption="Surface course in dark, aggregate base in grey. Note that the base is always thicker than the asphalt, and on a residential driveway it is twice as thick."
      >
        <ThicknessSVG />
      </Figure>

      <ComparisonTable
        caption="Compacted thickness by use. Two inches of asphalt over a properly built base outlasts four inches over a poor one, which is where most driveway budgets get misallocated."
        columns={[
          { title: "Asphalt" },
          { title: "Aggregate base", highlight: true },
          { title: "Tons per 1,000 ft²" },
        ]}
        rows={[
          { label: "Overlay on sound pavement", values: ['1.5 to 2 in', "None, existing stays", "11 to 15"] },
          { label: "Residential driveway", values: ['3 in', '6 to 8 in', "18"] },
          { label: "Driveway, poor or clay soil", values: ['3 in', '10 to 12 in', "18"] },
          { label: "RV pad or heavy vehicles", values: ['4 in', '8 to 10 in', "24"] },
          { label: "Parking lot", values: ['6 in', '10 to 12 in', "36"] },
        ]}
      />

      <p>
        The most useful thing on that table is the base column. Asphalt is
        a flexible pavement, which means it distributes load rather than
        spanning it the way a concrete slab does, and it is only as good as
        what it sits on. A driveway that cracks and dips in its third
        winter almost always has a base problem: too thin, poorly
        compacted, or laid over soil that was never properly prepared.
        Adding an inch of asphalt costs meaningfully less than adding four
        inches of base, which is exactly why cut-rate quotes cut the base.
      </p>

      <h2>Asphalt driveway cost</h2>

      <Figure
        number={3}
        caption="The four ways to spend money on a driveway, plus concrete for scale. Asphalt pricing moves with crude oil, so a quote from last season is a starting point rather than a price."
      >
        <CostSVG />
      </Figure>

      <p>
        Read that chart as a decision tree. If the surface is worn but the
        pavement is structurally intact, with no alligator cracking and no
        soft spots, sealcoating at pennies per square foot buys two to four
        years. If the surface is failing but the base is sound, a 1.5 to 2
        inch overlay bonded to the existing pavement, sometimes described
        simply as asphalt on asphalt, costs roughly half of replacement. If the pavement is cracking in interlocking patterns
        or has areas that flex underfoot, the base has failed and an
        overlay will telegraph the same cracks within two years; that is a
        full removal and rebuild.
      </p>
      <p>
        On recycled asphalt, which people search for by name: an asphalt
        millings driveway is built from ground-up old pavement, spread and
        compacted without new binder.
        They cost roughly half of new hot mix, they compact into a firm
        surface that sheds water reasonably, and they darken and knit
        together over a hot summer. They are not a paved driveway. Edges
        ravel, weeds find gaps, and it needs periodic regrading. For a long
        rural driveway where the alternative is gravel, millings are
        excellent value. As a substitute for a paved suburban driveway,
        they will disappoint.
      </p>

      <h2>Asphalt repair and maintenance, in order</h2>
      <p>
        Asphalt maintenance is a sequence, and doing it out of order wastes
        the money. Clean first, then fill cracks, then patch holes, then
        sealcoat last. Sealing over an unfilled crack simply paints the
        crack; sealing over a pothole hides it for a month.
      </p>

      <ComparisonTable
        caption="What to use for each kind of damage. The dividing line between crack filler and cold patch is roughly half an inch of width."
        columns={[
          { title: "Use" },
          { title: "Rough cost", highlight: true },
          { title: "Lasts" },
        ]}
        rows={[
          { label: "Hairline to 1/2 in cracks", values: ["Rubberized asphalt crack filler", "$10-25 per gallon", "2 to 4 years"] },
          { label: "Wider cracks and edges", values: ["Cold patch, compacted", "$15-30 per 50 lb bag", "3 to 5 years"] },
          { label: "Potholes", values: ["Cold patch, or hot mix if available", "$15-30 per bag", "2 to 5 years"] },
          { label: "Surface oxidation, greying", values: ["Sealcoat after crack work", "$0.15-0.35 per ft²", "2 to 4 years"] },
          { label: "Alligator cracking", values: ["Cut out and rebuild the base", "Full section replacement", "Permanent, if done right"] },
        ]}
      />

      <p>
        Two specifics worth knowing. Cold patch asphalt is a bagged
        cold-applied mix that needs no heat, goes down in any weather, and
        is the correct answer for a homeowner filling a pothole; a 50 pound
        bag fills roughly a square foot at two inches deep. It wants to be
        compacted hard, ideally by driving over it repeatedly, because
        uncompacted patch material ravels out within a season. And
        alligator cracking, the interlocking pattern that looks like
        reptile skin, is not a surface problem at all. It means the base
        below has failed, and filling or sealing it accomplishes nothing;
        that section has to be cut out and rebuilt.
      </p>
      <p>
        On timing: crack filler and cold patch both want a dry surface and
        temperatures above about 50F, and cracks should be blown or
        brushed clean of debris and vegetation first. Anything growing in a
        crack has roots holding it open, and filling over them fails
        immediately.
      </p>

      <h2>Asphalt versus concrete</h2>

      <ComparisonTable
        caption="The real trade is upfront cost against maintenance and climate. Asphalt flexes with frost; concrete does not, which is why the geography matters."
        columns={[
          { title: "Asphalt", highlight: true },
          { title: "Concrete" },
        ]}
        rows={[
          { label: "Installed cost per ft²", values: ["$4 to $9", "$8 to $18"] },
          { label: "Life expectancy", values: ["15 to 25 years", "30 to 40 years"] },
          { label: "Maintenance", values: ["Sealcoat every 2 to 4 years", "Seal joints occasionally"] },
          { label: "Cold climates", values: ["Flexes with frost heave", "Cracks, and salt scales the surface"] },
          { label: "Hot climates", values: ["Softens above about 120F surface temp", "Unaffected"] },
          { label: "Repairs", values: ["Patch blends in reasonably", "Patch is always visible"] },
          { label: "Ready to use", values: ["24 to 48 hours", "7 days minimum"] },
        ]}
      />

      <p>
        The climate line is the one that should decide it. In the northern
        US, asphalt is the default for driveways because it moves with
        seasonal frost instead of cracking, it absorbs heat and sheds snow
        faster, and it tolerates de-icing salt that scales concrete
        surfaces. In the deep south the calculus reverses: sustained heat
        softens asphalt enough that jack stands and motorcycle kickstands
        leave dents, and concrete stays put. Everywhere in between, the
        upfront price usually wins the argument.
      </p>

      <Scenario location="Cleveland, OH">
        <p>
          A 20 by 40 foot driveway, 800 square feet, with the existing
          asphalt showing surface cracking and two soft spots near the
          apron. A contractor proposes an overlay at $2,900; a second
          proposes full removal, 8 inches of new base, and 3 inches of
          asphalt at $6,100.
        </p>
        <p>
          The soft spots settle it. Areas that flex underfoot mean the base
          has failed there, and an overlay over failed base cracks in the
          same places within two seasons, which converts $2,900 into money
          spent twice. Full rebuild tonnage: 800 x 0.25 x 145 / 2,000 =
          14.5 tons, plus 5 percent waste, so 15.2 tons ordered. In
          Cleveland the freeze-thaw cycle is the reason asphalt was the
          right material here in the first place, and the reason the base
          under it has to be built properly. Paving is scheduled for
          September; hot mix needs ground temperatures above roughly 50F to
          compact correctly, which closes the season in most of Ohio by
          late October.
        </p>
      </Scenario>

      <h2>Where asphalt jobs go wrong</h2>
      <p>
        <strong>Calculating loose depth instead of compacted.</strong>{" "}
        Asphalt compacts about 20 to 25 percent. Ordering to the loose
        depth overstates tonnage; paving to the loose depth leaves you thin
        once it is rolled. Specify compacted thickness in the contract.
      </p>
      <p>
        <strong>Paving too late in the season.</strong> Hot mix needs to be
        compacted while hot, and cold ground pulls heat out of it fast.
        Below about 50F ground temperature the mat cools before the roller
        finishes, and the result never reaches proper density. Northern
        paving seasons effectively close in late October.
      </p>
      <p>
        <strong>Sealcoating too soon.</strong> New asphalt needs 60 to 90
        days to cure and release its volatiles before it is sealed. Sealing
        a fresh driveway traps them and softens the surface. It is also the
        most common upsell offered right after a new install.
      </p>
      <p>
        <strong>Ignoring drainage.</strong> Water under a pavement destroys
        the base, and asphalt needs a slope of at least a quarter inch per
        foot to shed it. A flat driveway that ponds after rain is a
        driveway with a countdown on it, regardless of how thick the
        asphalt is.
      </p>

      <Callout label="Watch for the driveway paving scam">
        Door-to-door crews offering to pave with leftover material from a
        nearby job are a recognized fraud pattern that state attorneys
        general warn about every summer. The tells are consistent: no
        written contract, cash up front, pressure to decide immediately,
        unmarked trucks, and a price far below every other quote. Real
        paving contractors are licensed, insured, booked weeks out, and
        provide a written scope naming compacted thickness and base depth.
        Get three quotes and check the base spec in each.
      </Callout>

      <h2>The rest of the driveway</h2>
      <p>
        Base material under the asphalt runs through the{" "}
        <a href="/gravel-calculator">gravel calculator</a>, an apron or
        garage slab is a{" "}
        <a href="/concrete-calculator">concrete calculator</a> job, and if
        you are weighing a paved surface against a paver one, the{" "}
        <a href="/paver-calculator">paver calculator</a> prices that
        alternative. Grading spoil and topsoil for the edges come from the{" "}
        <a href="/topsoil-calculator">topsoil calculator</a>.
      </p>
      <p>
        Measure the area, decide the compacted thickness, and carry the
        tonnage into the conversation. A contractor who cannot tell you the
        base depth in their quote is quoting something other than what you
        asked for.
      </p>
    </>
  );
}
