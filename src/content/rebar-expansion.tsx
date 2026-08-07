import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function RebarSizeSVG() {
  const bars = [
    { size: "#3", dia: '3/8"', wt: 0.376, use: "residential slabs, driveways" },
    { size: "#4", dia: '1/2"', wt: 0.668, use: "slabs, footings, walls: the workhorse" },
    { size: "#5", dia: '5/8"', wt: 1.043, use: "footings, grade beams, retaining walls" },
    { size: "#6", dia: '3/4"', wt: 1.502, use: "structural columns and beams" },
  ];
  const maxW = 1.502;
  return (
    <svg viewBox="0 0 680 250" width="100%" height="auto" role="img" aria-label="Rebar sizes: number 3 is 3/8 inch at 0.376 pounds per foot, number 4 is 1/2 inch at 0.668, number 5 is 5/8 inch at 1.043, number 6 is 3/4 inch at 1.502.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Rebar sizes: the number is eighths of an inch</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>#4 bar = 4/8 = 1/2 inch diameter. Weight per foot is what the supplier bills by.</text>
      {bars.map((b, i) => {
        const y = 72 + i * 44;
        const w = (b.wt / maxW) * 290;
        return (
          <g key={b.size}>
            <text x="70" y={y + 13} textAnchor="end" fontSize="13" fontWeight="700" fill={GUIDE_SVG.ink}>{b.size}</text>
            <text x="112" y={y + 13} textAnchor="end" fontSize="10" fill={GUIDE_SVG.inkMuted}>{b.dia}</text>
            <rect x="124" y={y + 2} width={w} height="12" rx="6" fill={i === 1 ? GUIDE_SVG.accent : GUIDE_SVG.slate} />
            <text x={124 + w + 10} y={y + 13} fontSize="11" fontWeight="700" fill={i === 1 ? GUIDE_SVG.accent : GUIDE_SVG.inkMuted}>{b.wt} lb/ft</text>
            <text x="124" y={y + 30} fontSize="9" fill={GUIDE_SVG.inkFaint}>{b.use}</text>
          </g>
        );
      })}
    </svg>
  );
}

function LapChairSVG() {
  return (
    <svg viewBox="0 0 680 250" width="100%" height="auto" role="img" aria-label="Rebar lap splice: overlap bars 40 diameters, which is 20 inches for number 4 bar, tied in two places. Bars sit on chairs at the middle of the slab, with 3 inches of cover against earth.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>The two rules inspectors check first</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Lap length where bars meet, and bar position inside the pour</text>
      <text x="30" y="78" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>Lap splice: 40 bar diameters</text>
      <line x1="40" y1="100" x2="300" y2="100" stroke={GUIDE_SVG.inkMuted} strokeWidth="5" strokeLinecap="round" />
      <line x1="220" y1="112" x2="480" y2="112" stroke={GUIDE_SVG.inkMuted} strokeWidth="5" strokeLinecap="round" />
      <line x1="220" y1="88" x2="220" y2="124" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <line x1="300" y1="88" x2="300" y2="124" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
      <text x="260" y="82" textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.accent}>lap zone</text>
      <text x="260" y="140" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>#4 bar: 40 x 1/2&quot; = 20&quot; overlap, tied twice</text>
      <text x="30" y="178" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>Position: mid-depth on chairs, never on the dirt</text>
      <rect x="40" y="192" width="440" height="34" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.cool} strokeWidth="1" />
      <line x1="60" y1="209" x2="460" y2="209" stroke={GUIDE_SVG.accent} strokeWidth="4" strokeLinecap="round" />
      <path d="M 140 209 L 134 226 L 146 226 Z" fill={GUIDE_SVG.inkMuted} />
      <path d="M 300 209 L 294 226 L 306 226 Z" fill={GUIDE_SVG.inkMuted} />
      <text x="500" y="206" fontSize="9.5" fill={GUIDE_SVG.inkMuted}>bar at mid-depth</text>
      <text x="500" y="220" fontSize="9.5" fill={GUIDE_SVG.inkFaint}>chairs every 3-4 ft</text>
      <text x="40" y="244" fontSize="9" fill={GUIDE_SVG.inkFaint}>Minimum concrete cover: 3&quot; where cast against earth, 1-1/2&quot; elsewhere, per ACI 318.</text>
    </svg>
  );
}

export function RebarCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="August 8, 2026"
        reviewedAgainst="ASTM A615 (rebar specification), ACI 318 development and cover provisions, CRSI placement guidance"
      />

      <h2>The number on the bar is eighths of an inch</h2>
      <p>
        Rebar sizing is one of the few honest naming systems in
        construction: a #4 bar is 4/8 of an inch in diameter, a #5 is
        5/8, and so on up the ladder. That single fact unlocks the rest
        of the math, because lap lengths, weights, and spacing rules all
        key off the diameter. Residential concrete lives almost entirely
        on two sizes: #3 for slabs and driveways, #4 for footings, thicker
        slabs, and anywhere a plan note says &quot;or better.&quot;
      </p>
      <p>
        The calculator above turns a slab or footing dimension into a bar
        count, total linear feet, and weight, which is how suppliers
        quote. This page carries the size chart, the grid spacing that
        residential slabs actually use, the 40-diameter lap rule
        inspectors measure with a tape, and the mesh-versus-rebar
        question that starts arguments on every jobsite.
      </p>

      <Figure
        number={1}
        caption="The four sizes that cover nearly all residential work. Suppliers sell 20 foot sticks and bill by weight, so a #4 stick weighs about 13.4 pounds."
      >
        <RebarSizeSVG />
      </Figure>

      <MethodologyNote>
        <p>
          Bar dimensions and weights follow ASTM A615, the standard
          covering common Grade 60 deformed bar. Lap, cover, and
          development rules come from ACI 318; the 40-diameter lap cited
          here is the common field simplification for Grade 60 bar in
          residential work, and engineered drawings override it wherever
          they specify a length. Placement practice follows CRSI
          guidance.
        </p>
      </MethodologyNote>

      <h2>The rebar size chart</h2>

      <ComparisonTable
        caption="Common bar sizes per ASTM A615. A 20 foot stick of each: #3 is 7.5 lb, #4 is 13.4 lb, #5 is 20.9 lb, #6 is 30 lb."
        columns={[
          { title: "Diameter" },
          { title: "Weight per ft", highlight: true },
          { title: "Lap at 40d" },
        ]}
        rows={[
          { label: "#3", values: ['3/8"', "0.376 lb", '15"'] },
          { label: "#4", values: ['1/2"', "0.668 lb", '20"'] },
          { label: "#5", values: ['5/8"', "1.043 lb", '25"'] },
          { label: "#6", values: ['3/4"', "1.502 lb", '30"'] },
          { label: "#7", values: ['7/8"', "2.044 lb", '35"'] },
          { label: "#8", values: ['1"', "2.670 lb", '40"'] },
        ]}
      />

      <p>
        The lap column answers the overlap question directly: where two
        bars continue a run, overlap them 40 bar diameters and tie the
        lap in at least two places. For the #4 bar in a typical footing
        that is 20 inches of overlap. Laps in adjacent runs should also
        be staggered rather than lined up in one row, so the splice zone
        does not become the weak plane of the pour.
      </p>

      <h2>Slab-on-grade spacing that actually gets used</h2>
      <p>
        For a residential 4 inch slab, the standard reinforcement is #3
        or #4 bar in a grid at 12 to 18 inches on center each way, set
        at mid-depth of the slab on chairs. Driveways and anything
        carrying vehicles want the tighter 12 inch grid in #4. Footings
        run bars the long way: two #4 continuous for most one-story
        walls, three for two-story, per the typical prescriptive tables,
        with the engineered plan winning any disagreement. The chairs
        are not optional equipment. A bar lying on the vapor barrier
        does nothing except cost money; concrete cracks from the bottom
        and the steel has to be up in the section to catch it.
      </p>

      <Figure
        number={2}
        caption="Lap and position, the two things a phone photo to the inspector should show. Pulling bars up by hand mid-pour does not work; the concrete pushes them back down."
      >
        <LapChairSVG />
      </Figure>

      <h2>Rebar or wire mesh?</h2>

      <ComparisonTable
        caption="For a 4 inch residential slab. Fiber is a supplement for surface shrinkage cracking, not a replacement for steel where loads or spans matter."
        columns={[
          { title: "Rebar grid", highlight: true },
          { title: "Welded wire mesh" },
        ]}
        rows={[
          { label: "Holds position during pour", values: ["Yes, on chairs", "Rarely; sheets get walked down"] },
          { label: "Crack control", values: ["Strong, both directions", "Adequate if actually mid-depth"] },
          { label: "Cost for 400 ft² slab", values: ["$180-280", "$110-170"] },
          { label: "Best use", values: ["Driveways, garages, anything loaded", "Light-duty patios and walks"] },
        ]}
      />

      <Scenario location="Denver, CO">
        <p>
          A 20 by 20 foot driveway slab, 4 inches thick, #4 bar at 12
          inches on center both ways. Bars per direction: 20 ft at 12
          inch spacing is 19 interior bars plus edges, call it 20 runs
          each way at 19 feet after 3 inch cover, so 40 bars x 19 ft =
          760 linear feet.
        </p>
        <p>
          In 20 foot sticks that is 38 sticks. At 0.668 lb/ft the order
          weighs about 508 pounds; Denver yard pricing near $0.85 per
          foot puts the steel at roughly $645, plus a bag of ties and
          $60 of chairs. Every splice where sticks meet gets the 20
          inch lap. Freeze-thaw country rewards the tighter grid: the
          slab will crack somewhere, and the steel is what keeps the
          crack hairline instead of a trip edge.
        </p>
      </Scenario>

      <h2>Where rebar jobs go wrong</h2>
      <p>
        <strong>Bars on the dirt.</strong> The most common failure on
        DIY pours. Steel in the bottom half inch of a slab is not
        reinforcement, it is buried scrap. Chairs cost about fifteen
        cents apiece.
      </p>
      <p>
        <strong>Short laps.</strong> A 6 inch overlap where 20 is
        required fails inspection in jurisdictions that look, and fails
        the slab in the ones that do not. The 40d numbers are in the
        table above; measure them, do not eyeball them.
      </p>
      <p>
        <strong>Rusty is fine, flaky is not.</strong> Light surface
        rust actually improves bond and is nothing to sand off. Loose,
        flaking scale is a different matter and that steel goes back.
      </p>
      <p>
        <strong>Cutting cover to fit the form.</strong> Concrete
        protects the steel from corrosion only if there is enough of it:
        3 inches against earth, 1-1/2 inches to a formed face. Bars
        pushed against the form leave a rust line telegraphing through
        the surface within a few winters.
      </p>

      <Callout label="When the plan says engineered, it means it">
        Suspended slabs, retaining walls over 4 feet, and anything a
        structural drawing covers use development lengths computed for
        the actual concrete strength and bar position, which can run
        longer than the 40d field rule. The tables on this page cover
        prescriptive residential flatwork; a stamped drawing overrides
        every number here.
      </Callout>

      <h2>Steel is half the slab math</h2>
      <p>
        The other half is the pour itself: the{" "}
        <a href="/concrete-calculator">concrete calculator</a> converts
        the same slab dimensions into cubic yards, and a driveway pour
        usually sits on a compacted base the{" "}
        <a href="/gravel-calculator">gravel calculator</a> quantifies.
        For a footing supporting masonry, the{" "}
        <a href="/brick-calculator">brick calculator</a> counts what
        goes on top.
      </p>
      <p>
        Run the slab through the calculator above, buy the chairs with
        the steel, and photograph the grid before the truck arrives.
        That photo settles every future argument about what is in the
        slab.
      </p>
    </>
  );
}
