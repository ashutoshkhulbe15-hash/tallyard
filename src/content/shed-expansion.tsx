import {
  Figure,
  GuideByline,
  Scenario,
} from "@/components/GuideChrome";
import { GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

/**
 * Labeled framing cross-section. The linkable hero asset: every part the
 * calculator counts, shown assembled on a gable shed.
 */
function FramingSVG() {
  return (
    <svg
      viewBox="0 0 680 440"
      width="100%"
      height="auto"
      role="img"
      aria-label="Cross-section of a gable shed showing floor joists, floor sheathing, bottom plate, wall studs at 16 inches on center, doubled top plate, rafters at 24 inches on center, ridge board, roof sheathing with shingles, and siding, all sitting on a gravel, slab, or skid foundation."
    >
      <defs>
        <pattern
          id="shedwood"
          width="6"
          height="6"
          patternTransform="rotate(45)"
          patternUnits="userSpaceOnUse"
        >
          <rect width="6" height="6" fill={GUIDE_SVG.accentSoft} />
          <line x1="0" y1="0" x2="0" y2="6" stroke={GUIDE_SVG.accent} strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </defs>
      <text x="24" y="28" fontSize="14" fontWeight="700" fill={GUIDE_SVG.ink}>
        How a gable shed frames up (10 × 8, 6/12 pitch)
      </text>

      <rect x="90" y="360" width="500" height="14" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} strokeWidth="1" />
      <text x="340" y="371" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkMuted} fontFamily="monospace">
        gravel pad / concrete slab / pressure-treated skids
      </text>

      <rect x="100" y="336" width="480" height="20" fill="url(#shedwood)" stroke={GUIDE_SVG.accent} strokeWidth="1" />
      {[140, 180, 220, 300, 380, 460, 520].map((x) => (
        <line key={x} x1={x} y1="336" x2={x} y2="356" stroke={GUIDE_SVG.accent} strokeWidth="1" opacity="0.5" />
      ))}

      <rect x="100" y="328" width="480" height="8" fill={GUIDE_SVG.accent} opacity="0.85" />

      <rect x="108" y="180" width="10" height="148" fill="url(#shedwood)" stroke={GUIDE_SVG.accent} strokeWidth="1" />
      <rect x="562" y="180" width="10" height="148" fill="url(#shedwood)" stroke={GUIDE_SVG.accent} strokeWidth="1" />
      {[200, 290, 380, 472].map((x) => (
        <rect key={x} x={x} y="180" width="8" height="148" fill="url(#shedwood)" stroke={GUIDE_SVG.accent} strokeWidth="0.6" opacity="0.55" />
      ))}

      <rect x="100" y="320" width="480" height="9" fill={GUIDE_SVG.accent} opacity="0.7" />
      <rect x="100" y="171" width="480" height="9" fill={GUIDE_SVG.accent} opacity="0.7" />
      <rect x="100" y="180" width="480" height="4" fill={GUIDE_SVG.accent} opacity="0.5" />

      <line x1="104" y1="172" x2="340" y2="70" stroke={GUIDE_SVG.accent} strokeWidth="5" strokeLinecap="round" />
      <line x1="576" y1="172" x2="340" y2="70" stroke={GUIDE_SVG.accent} strokeWidth="5" strokeLinecap="round" />
      <line x1="104" y1="172" x2="88" y2="179" stroke={GUIDE_SVG.accent} strokeWidth="5" strokeLinecap="round" />
      <line x1="576" y1="172" x2="592" y2="179" stroke={GUIDE_SVG.accent} strokeWidth="5" strokeLinecap="round" />
      <rect x="335" y="64" width="10" height="14" fill={GUIDE_SVG.accent} />
      <line x1="100" y1="166" x2="340" y2="62" stroke={GUIDE_SVG.ink} strokeWidth="2" opacity="0.55" />
      <line x1="580" y1="166" x2="340" y2="62" stroke={GUIDE_SVG.ink} strokeWidth="2" opacity="0.55" />

      <rect x="100" y="180" width="5" height="140" fill={GUIDE_SVG.warm} opacity="0.6" />
      <rect x="575" y="180" width="5" height="140" fill={GUIDE_SVG.warm} opacity="0.6" />

      <g fontFamily="monospace" fontSize="10" fill={GUIDE_SVG.ink}>
        <line x1="345" y1="66" x2="470" y2="50" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="474" y="53">ridge board (2×6)</text>
        <line x1="450" y1="120" x2="560" y2="104" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="564" y="107">rafters (2×6, 24&quot; OC)</text>
        <line x1="200" y1="128" x2="120" y2="96" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="18" y="94">roof sheathing +</text>
        <text x="18" y="106">shingles</text>
        <line x1="150" y1="175" x2="120" y2="210" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="14" y="214">double top plate</text>
        <line x1="245" y1="250" x2="600" y2="250" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="604" y="244">wall studs</text>
        <text x="604" y="256">(2×4, 16&quot; OC)</text>
        <line x1="103" y1="290" x2="30" y2="290" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="14" y="288">siding</text>
        <line x1="300" y1="324" x2="600" y2="318" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="604" y="321">bottom plate</text>
        <line x1="250" y1="331" x2="604" y2="345" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="604" y="348">floor sheathing (3/4&quot; T&amp;G)</text>
        <line x1="160" y1="346" x2="30" y2="360" stroke={GUIDE_SVG.inkFaint} strokeWidth="0.75" />
        <text x="14" y="358">floor joists</text>
        <text x="14" y="370">(2×6, 16&quot; OC)</text>
      </g>
    </svg>
  );
}

export function ShedCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="April 20, 2026"
        reviewedAgainst="IRC 2021 R105.2 (permit exemptions), APA wood-frame construction guides, AWC Wood Frame Construction Manual"
      />

      <h2>What you are actually building</h2>
      <p>
        A 2×4 is not two inches by four. It is one and a half by three and a
        half, and a shed is full of small lies like that one. The
        &quot;8-foot&quot; studs stacked at the lumberyard are 92 and 5/8 inches
        long, cut short on purpose so the wall finishes out to eight feet once
        the plates go on top. None of this is hard. It just trips up the person
        who measures once, buys once, and finds out at the saw horses that the
        numbers do not add up.
      </p>
      <p>
        Underneath the lies, a shed is simple. Joists across a base, walls of
        studs, a roof of rafters, and a skin of sheathing and siding over all of
        it. The same parts holding up your house, minus the plumbing and minus
        the inspector counting your nails. The calculator at the top of this page
        takes your length, width, wall height, and roof style and hands back the
        lumber, sheathing, and shingle counts, so you are not doing arithmetic in
        the checkout line with a full cart and a line building behind you.
      </p>
      <p>
        One rule before you spend a dollar. Size the shed for the person you will
        be in three years, not for the empty yard you are staring at today. An
        8×10 feels enormous when it is empty. It is full the first time you own a
        mower, a wheelbarrow, a workbench, and the four cans of paint you swear
        you are going to use. Torn between two sizes? Take the bigger one. Every
        single time.
      </p>

      <Figure
        number={1}
        caption="Every part the calculator counts, assembled. Floor joists carry the deck, studs carry the walls, rafters carry the roof, and sheathing ties each plane together before the siding and shingles go on."
      >
        <FramingSVG />
      </Figure>

      <h2>Foundations</h2>
      <p>
        The base is the one part you cannot redo without tearing the shed apart,
        so it is the first decision and the one worth slowing down for. Three
        options cover nearly every backyard shed built in the United States. The
        right one comes down to three things: how big the shed is, what the
        ground is like, and whether your winters freeze hard enough to move it.
      </p>

      <ComparisonTable
        columns={[
          { title: "Gravel pad", subtitle: "+ skids", highlight: true },
          { title: "Concrete piers" },
          { title: "Poured slab" },
        ]}
        rows={[
          {
            label: "Best for",
            values: [
              "Small to mid sheds, mild ground",
              "Mid sheds, uneven or sloped lots",
              "Large or heavy sheds, freeze country",
            ],
          },
          {
            label: "Typical size range",
            values: ["Up to ~160 ft²", "100–200 ft²", "Any, best over 200 ft²"],
          },
          {
            label: "Rough material cost",
            values: ["$150–400", "$300–600", "$800–2,000"],
          },
          {
            label: "Rots or cracks?",
            values: ["Neither", "Neither", "Can crack in frost"],
          },
          {
            label: "Reversible later",
            values: ["Yes, rake it out", "Mostly", "No, it is permanent"],
          },
        ]}
        caption="A gravel pad with pressure-treated skids is the default for good reason: cheap, forgiving of slope, and nothing in it can crack. Step up to concrete only when size, weight, or frost forces you to."
      />

      <p>
        The gravel pad is the workhorse. Four to six inches of compacted crushed
        stone, raked level, with pressure-treated 4×4 skids sitting on top to
        carry the floor frame. It drains, it shrugs off a little slope, and it
        will never crack because there is nothing in it to crack. Under roughly
        160 square feet in a climate that does not freeze hard, this is usually
        the whole answer. Buy the stone by weight, not by guess. The{" "}
        <a href="/gravel-calculator">gravel calculator</a> turns your pad
        dimensions into tons so you are not a half-ton short when the delivery
        truck is already tilting its bed.
      </p>
      <p>
        Concrete earns its keep when the shed is big, heavy, or going up where
        the ground freezes. A poured slab is your floor and your foundation in
        one, and it never rots. But it costs more, it takes longer, and there is
        no undo button once it cures. In frost country you may need footings that
        reach below the frost line. Skip that and the shed heaves up every winter
        and settles every spring, and by March the door will not close because
        the whole box has racked out of square. Slab volume and bag counts come
        straight out of the{" "}
        <a href="/concrete-calculator">concrete calculator</a>.
      </p>

      <Callout label="Permit check">
        Most jurisdictions exempt a shed under 120 square feet, which is a 10×12
        or smaller, from a building permit under IRC section R105.2. Go bigger
        and you almost certainly need one. Add electrical wiring or plumbing and
        you need a permit no matter the size. Setback rules, the required
        distance from your property lines, usually apply either way, and your HOA
        does not care what the building department says. Sort all of this before
        you pour anything. A retroactive permit costs more than the original, and
        a shed on the wrong side of a setback line gets moved at your expense.
      </Callout>

      <h2>The frame, piece by piece</h2>
      <p>
        Floor first. 2×6 joists, 16 inches on center, running the short way
        across the shed, boxed in front and back by rim joists and topped with
        3/4-inch tongue-and-groove plywood. A 10×12 needs 8 or 9 joists and 4
        sheets of decking. Keep the whole frame up off the dirt on those skids.
        Air moving underneath is the difference between a floor that is still
        solid in twenty years and one that goes spongy in five because it sat wet
        against the ground the whole time.
      </p>
      <p>
        Walls are 2×4 studs at 16 inches on center, a single bottom plate, a
        doubled top plate, and extra studs stacked at each corner so the box does
        not rack in the wind. Building tight on budget? Bump to 24-inch spacing
        with the{" "}
        <a href="/stud-spacing-calculator">stud spacing calculator</a> and save a
        handful of studs per wall. Two warnings. The calculator does not cut
        holes for doors and windows, so add lumber for headers and trim wherever
        you frame an opening. And it is the header people forget, then they come
        up two boards short on a Sunday afternoon when the yard is closed.
      </p>
      <p>
        The roof is where sheds stop being identical, and it is worth choosing on
        purpose instead of defaulting to a gable because it is the shape you have
        seen a hundred times.
      </p>

      <ComparisonTable
        columns={[
          { title: "Gable", subtitle: "peak in the middle", highlight: true },
          { title: "Lean-to", subtitle: "single slope" },
          { title: "Gambrel", subtitle: "barn style" },
        ]}
        rows={[
          { label: "Material use", values: ["Moderate", "Lowest", "Highest"] },
          { label: "Build difficulty", values: ["Medium", "Easiest", "Hardest"] },
          {
            label: "Headroom / storage",
            values: ["Good", "Limited", "Best (loft space)"],
          },
          {
            label: "Sheds rain and snow",
            values: ["Well", "Well if pitched right", "Well"],
          },
          {
            label: "Best when",
            values: [
              "You want the standard, do-anything shed",
              "Small shed against a wall or fence",
              "You need every cubic foot of storage",
            ],
          },
        ]}
        caption="Gable is the default for a reason. Lean-to is the fast, cheap option for a small shed tucked against something. Gambrel buys you a usable loft at the price of more lumber and fussier cuts."
      />

      <p>
        A gable roof has rafters running from the eaves up to a ridge board at
        the peak. At the standard 6/12 pitch, each rafter length works out to the
        square root of the run squared plus the rise squared, plus about a foot of
        overhang past the wall. Rafters sit 24 inches on center for most sheds.
        Roof sheathing is 7/16-inch OSB in 4×8 sheets, then shingles at three
        bundles per square with 10 percent added for waste. The lean-to trades
        that peak for a single slope from a tall wall down to a short one, which
        uses the least material of the three and frames up fastest. The gambrel,
        the barn shape, folds four slopes together to open up a loft overhead. You
        pay for that headroom in rafters, sheathing, and patience, because the
        compound cuts are the fussiest framing on any small building.
      </p>

      <h2>How the sheathing math works</h2>
      <p>
        Sheathing is the OSB or plywood skin that goes over the framing before any
        siding or roofing. Sheets are 4×8 feet, which is 32 square feet each, so
        the math never changes: total area divided by 32, rounded up, plus a
        little for waste. Walls are the easy case. A 10×12 shed with 8-foot walls
        has a 44-foot perimeter, and 44 times 8 is 352 square feet, which comes to
        11 sheets before you subtract the door and window openings. Cut those
        openings out and save the scraps for patching. The roof works the same way
        once you have the roof area: divide by 32 and add 10 percent for the cuts
        at the gable ends. If you want to price the framing lumber underneath all
        of this, the <a href="/lumber-calculator">lumber calculator</a> converts
        your board list into board feet.
      </p>

      <h2>A real 10×12, start to finish</h2>
      <p>
        Numbers on their own are abstract, so here is a full one. This is the
        material list the calculator produces for the most common shed people
        build, a 10×12 with 8-foot walls and a standard gable roof.
      </p>

      <Scenario location="Standard 10×12 gable shed, 8-ft walls, 6/12 pitch">
        Floor: 9 joists of 2×6 at 16 inches on center, plus 2 rim joists, plus 4
        sheets of 3/4-inch tongue-and-groove decking. Walls: 44 studs of 2×4 at
        16 inches on center, roughly 130 linear feet of 2×4 plate stock for the
        one bottom and two top plates, and 11 sheets of 7/16-inch wall sheathing.
        Roof: 12 rafters of 2×6 at about 7 feet each, a ridge board, 7 sheets of
        roof sheathing, and 8 bundles of shingles. Siding: 11 sheets of T1-11 or
        your chosen exterior. That is the framing package. It does not include the
        foundation, the door, fasteners, or finish. In 2026 prices, expect the
        lumber, sheathing, roofing, and siding here to land somewhere around
        $1,400 to $2,200 depending on your region and whether you catch a sale.
      </Scenario>

      <p>
        Notice what that list leaves out, because the leftovers are where budgets
        blow up. No foundation, no door or windows, no fasteners, no paint or
        stain, no hurricane ties or hardware. Those extras routinely add 20 to 30
        percent on top of the framing number. If the shed is going to be heated or
        finished inside, the{" "}
        <a href="/insulation-calculator">insulation calculator</a> and{" "}
        <a href="/drywall-calculator">drywall calculator</a> handle the interior,
        and both of those are their own line item nobody remembers on the first
        pass.
      </p>

      <h2>What it costs, three ways</h2>
      <p>
        You can get the same shed three different ways, and the price gap between
        them is mostly your own weekends. Here is how a 10×12 breaks down across
        the three common paths.
      </p>

      <ComparisonTable
        columns={[
          { title: "DIY", subtitle: "from dimensional lumber", highlight: true },
          { title: "Kit", subtitle: "pre-cut, you assemble" },
          { title: "Pro-built", subtitle: "delivered or on-site" },
        ]}
        rows={[
          {
            label: "Framing + sheathing",
            values: ["$1,400–2,200", "Included", "Included"],
          },
          {
            label: "Foundation",
            values: ["$150–2,000", "$150–2,000", "Often included"],
          },
          {
            label: "Door, windows, hardware",
            values: ["$200–600", "Included", "Included"],
          },
          {
            label: "Your time",
            values: ["2–4 weekends", "1–2 weekends", "None"],
          },
          {
            label: "All-in for a 10×12",
            values: [
              <strong key="d">$2,000–4,000</strong>,
              <strong key="k">$3,000–6,000</strong>,
              <strong key="p">$5,000–10,000</strong>,
            ],
          },
        ]}
        caption="Building from dimensional lumber saves 40 to 60 percent against a kit or a pro-built shed. What you trade for it is two to four weekends and the willingness to fix your own mistakes."
      />

      <p>
        The DIY route wins on cost by a wide margin, but be honest with yourself
        about the trade. A kit removes the cutting and the head-scratching over
        rafter angles, which is worth real money if your weekends are scarce or
        your saw skills are new. A pro-built shed removes everything except
        writing the check. There is no wrong answer here. There is only the
        version that matches how much time you actually have.
      </p>

      <h2>Where sheds go wrong</h2>
      <p>
        Most shed regrets trace back to a handful of the same mistakes, and every
        one of them is cheaper to avoid than to fix. Building on bare dirt or an
        unlevel base tops the list, because a floor frame in contact with the
        ground wicks moisture and rots from the bottom up, and an out-of-level
        base racks every door and window you hang. Undersizing is next, and it is
        the one nobody believes until they live it. The 8×10 that looked huge is
        full within a year.
      </p>
      <p>
        Then there is the paperwork nobody wants to do. Skipping the permit and
        setback check feels harmless right up until a neighbor complains or you go
        to sell the house, and a shed one foot over the line becomes your problem
        to move. Forgetting the header lumber over openings, leaving sheathing and
        framing exposed to weather for weeks because the roofing is not ready, and
        buying siding before subtracting the door and window openings all show up
        on the same weekend, usually the one where the yard is closed. None of
        these are skill problems. They are planning problems, which means the
        calculator and a careful material list solve most of them before you ever
        pick up a saw.
      </p>
    </>
  );
}
