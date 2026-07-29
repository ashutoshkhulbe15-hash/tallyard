import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function StairAnatomySVG() {
  return (
    <svg viewBox="0 0 680 360" width="100%" height="auto" role="img" aria-label="Deck stair anatomy: stringer, tread, riser, nosing, landing pad, and the connection to the deck rim joist, with IRC R311.7 limits labeled">
      <text x="16" y="24" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>The parts of a deck stair, and what the code says about each</text>

      {/* deck edge */}
      <rect x="40" y="60" width="90" height="16" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.ink} strokeWidth="1.5" />
      <rect x="40" y="76" width="18" height="180" fill="#fff" stroke={GUIDE_SVG.ink} strokeWidth="1.5" />
      <text x="46" y="52" fontSize="11" fill={GUIDE_SVG.inkMuted}>deck surface</text>

      {/* sawtooth stringer profile, 4 steps */}
      <path d="M 130 256 L 130 214 L 178 214 L 178 172 L 226 172 L 226 130 L 274 130 L 274 88 L 322 88 L 322 60"
        fill="none" stroke={GUIDE_SVG.ink} strokeWidth="2" />
      <line x1="130" y1="256" x2="322" y2="60" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" strokeDasharray="5,4" />

      {/* treads as thin bars */}
      {[[130, 214], [178, 172], [226, 130], [274, 88]].map(([tx, ty], i) => (
        <rect key={i} x={tx} y={ty - 6} width="48" height="6" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1.2" />
      ))}

      {/* landing pad */}
      <rect x="100" y="256" width="250" height="18" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.ink} strokeWidth="1.5" />
      <text x="110" y="290" fontSize="11" fill={GUIDE_SVG.inkMuted}>concrete landing pad, 36&#8243; deep minimum</text>

      {/* labels right side with leaders */}
      <line x1="202" y1="166" x2="400" y2="120" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" />
      <text x="406" y="124" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Tread</text>
      <text x="406" y="139" fontSize="11" fill={GUIDE_SVG.inkMuted}>run &#8805; 10&#8243; (R311.7.5.2)</text>

      <line x1="226" y1="151" x2="400" y2="168" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" />
      <text x="406" y="172" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Riser</text>
      <text x="406" y="187" fontSize="11" fill={GUIDE_SVG.inkMuted}>&#8804; 7-3/4&#8243;, equal within 3/8&#8243;</text>

      <line x1="250" y1="196" x2="400" y2="220" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" />
      <text x="406" y="224" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Stringer</text>
      <text x="406" y="239" fontSize="11" fill={GUIDE_SVG.inkMuted}>2x12, every 16&#8243; or less</text>

      <line x1="322" y1="74" x2="400" y2="68" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" />
      <text x="406" y="72" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Plumb cut at the rim</text>
      <text x="406" y="87" fontSize="11" fill={GUIDE_SVG.inkMuted}>hung on a ledger, not toe-nailed</text>

      <line x1="150" y1="250" x2="400" y2="276" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" />
      <text x="406" y="280" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>Bottom riser</text>
      <text x="406" y="295" fontSize="11" fill={GUIDE_SVG.inkMuted}>cut short by one tread thickness</text>

      <line x1="16" y1="322" x2="664" y2="322" stroke={GUIDE_SVG.inkFaint} strokeWidth="1" />
      <text x="16" y="340" fontSize="11" fill={GUIDE_SVG.inkMuted}>Total rise over 30&#8243; adds guards (R312) and a handrail (R311.7.8). Tread count is always one less than riser</text>
      <text x="16" y="354" fontSize="11" fill={GUIDE_SVG.inkMuted}>count, because the deck surface is the top step.</text>
    </svg>
  );
}

export function DeckStairExpansion() {
  return (
    <>
      <GuideByline updated="July 29, 2026" reviewedAgainst="IRC R311.7 and R312, AWC DCA 6 Prescriptive Residential Deck Construction Guide, and NADRA deck safety guidance" />

      <h2>Deck stairs, start to finish</h2>

      <p>Deck stairs come down to one division problem. Total rise divided into equal risers, none taller than 7-3/4 inches, with a tread at least 10 inches deep on each. Everything else, the stringer length, the board count, the angle, falls out of that. The calculator above runs it and draws the cut sheet you take to the saw.</p>

      <p>What makes stairs feel hard is not the arithmetic. It is that a small error repeats. Get riser height wrong by an eighth of an inch and by the fifth step you are off by more than half an inch, which is exactly the trip hazard the code is written to prevent. Measure once, calculate exactly, cut one stringer, test fit it. Then cut the rest.</p>

      <Figure number={1} caption="The parts and the limits in one drawing. The dashed line is the 2x12 the stringer gets cut from: notches must leave at least 5 inches of uncut depth behind them, which is why a 2x10 does not work.">
        <StairAnatomySVG />
      </Figure>

      <MethodologyNote>
        <p>All limits follow IRC Section R311.7 (Stairways) and R312 (Guards), 2021 edition. Stringer spacing and attachment follow AWC DCA 6. Cost figures are typical 2026 US material and labor pricing. Local amendments can be stricter than the model code; confirm with your building department before cutting.</p>
      </MethodologyNote>

      <h2>Measuring total rise without ruining everything downstream</h2>

      <p>Total rise is the top of the finished deck surface to the top of the finished landing. Both words matter. Deck boards may not be on yet; add their thickness. The landing may be dirt today and a 4 inch concrete pad next week; measure to where the pad will be, or pour it first. This one measurement drives every number on the cut sheet, and it is the input people get wrong.</p>

      <p>The way to take it: run a straight board out from the deck edge, level it, and measure straight down at the point where the stairs will land, roughly the total run away from the deck. Not at the deck edge. Yards slope, and measuring at the wrong spot builds a stair that arrives an inch above or below your pad.</p>

      <Callout label="Pour the pad first">The order that saves rework is pad, then measure, then cut. A landing pad should be at least as wide as the stairs and 36 inches deep in the direction of travel, and it needs to exist before the stringers do. The <a href="/concrete-calculator">concrete calculator</a> sizes it. Stringers resting on soil wick moisture and rot from the bottom cut up, usually within three or four seasons.</Callout>

      <h2>Laying out the stringer</h2>

      <p>The layout tool is a framing square and two stair gauges, those little brass clamps that lock onto the square. Set one at your riser height on the tongue, the short arm, and one at your tread run on the blade. Now every triangle you mark is identical, which is the whole point: consistency you cannot achieve freehand.</p>

      <p>Start at one end of the 2x12 and walk the square down the board, marking riser and tread at each position, sliding the square along so the previous tread mark lines up with the next riser mark. Mark all of them before you cut anything. Then check the count against the cut sheet, because miscounting notches is easy and the mistake only shows up after the cuts.</p>

      <p>Cutting is the part where patience pays. Run a circular saw into each corner and stop exactly at the intersection, then finish the corner with a handsaw or jigsaw. Overcutting past the corner with the circular saw is the classic damage: the kerf continues into the uncut part of the board, and the notch loses strength right where the tread load lands. It looks fine and it is not.</p>

      <p>Then the top and bottom. The top gets a plumb cut, vertical, so it meets the rim joist flat. The bottom gets a level cut, horizontal, so it sits flat on the pad, and that is the cut you shorten by one tread thickness. Test fit before touching the other stringers: set it against the deck, check the top meets the rim square and the bottom sits flat with no rocking, and put a level on a middle tread notch. If it reads level, you have your template.</p>

      <h2>What deck stairs cost</h2>

      <p>Materials for a typical four-to-five step run are cheap. Labor is not, and the landing pad is the line item people forget when they compare a DIY afternoon against a contractor quote.</p>

      <ComparisonTable
        columns={[{title:"DIY materials"},{title:"Contractor installed"}]}
        rows={[
          {label:"Pressure-treated, 4-5 steps, 36\" wide",values:["$150-400","$800-1,500"]},
          {label:"Composite treads on PT stringers",values:["$350-800","$1,400-2,200"]},
          {label:"Concrete landing pad",values:["$60-150 in bags","$400-900 poured"]},
          {label:"Railing, both sides",values:["$120-350","$600-1,400"]},
          {label:"Typical all-in",values:[<strong key="a">$300-900</strong>,<strong key="b">$1,800-3,500</strong>]},
        ]}
        caption="Labor runs $50-90 per hour and a straight stair run is most of a day for two people, more with a pour. Curved or wrap-around stairs price in a different universe."
      />

      <p>Two things move that number more than the tread material. First, whether a landing pad exists. Pouring one adds a day, a delivery or forty bags, and often an inspection, and it is easily a third of a contractor quote on a small stair. Second, whether the stairs turn. Everything on this page assumes a straight run; a stair with a landing partway down is effectively two stairs plus a framed platform, and quotes roughly double.</p>

      <p>The honest DIY assessment: stringer layout is the hardest cut most homeowners will attempt, and the failure mode is expensive in boards but not in safety, because a bad stringer looks bad immediately. If you have a circular saw, a framing square, and patience for a test fit, this is a doable weekend. If the run is over about six steps, or the stairs turn, hire it.</p>

      <p>One more thing worth understanding before buying lumber: riser height and tread run trade against each other, and the trade has a comfortable zone. Carpenters use the rule that twice the riser plus the run should land between 24 and 25 inches. A 6-7/8 inch riser with a 10-1/2 inch run gives 24-1/4, right in the middle, which is why that combination feels normal underfoot. Push risers up toward the 7-3/4 maximum with a 10 inch run and you get 25-1/2, a stair that is legal and feels steep. Outdoor stairs generally want the gentler end, because people carry things up them and they get wet.</p>

      <h2>Pressure-treated or composite treads</h2>

      <p>Stringers are pressure-treated lumber, full stop. Composite is not structural, it does not get notched, and no manufacturer rates it for stringers. The choice is only about what you walk on.</p>

      <ComparisonTable
        columns={[{title:"Pressure-treated treads"},{title:"Composite treads",highlight:true}]}
        rows={[
          {label:"Cost per step (36\" wide)",values:["$8-16","$24-45"]},
          {label:"Maintenance",values:["Seal every 2-3 years","Wash occasionally"]},
          {label:"Traction when wet",values:["Good, grain gives grip","Varies, buy the grooved side up"]},
          {label:"Heat in direct sun",values:["Moderate","Runs hot, dark colors especially"]},
          {label:"Span between stringers",values:["16\" comfortably","16\" max, some brands require 12\""]},
        ]}
        caption="Check the composite manufacturer's stair span. Several brands, Trex included, publish a tighter stringer spacing for stair treads than for deck surfaces, and it is a common inspection catch."
      />

      <Scenario location="Raleigh, North Carolina">
        <p>A deck sits 55 inches above a new concrete pad. 55 &#247; 7.75 = 7.1, round up to 8 risers. 55 &#247; 8 = 6-7/8 inches per riser, equal by construction. Treads: 8 &#8722; 1 = 7, because the deck surface is the eighth step. At a 10-1/2 inch run, total run is 73-1/2 inches, and the stringer is &#8730;(55&#178; + 73.5&#178;) = 91-3/4 inches, so 2x12x10 foot stock with room for the cuts.</p>
        <p>Three stringers at 36 inches wide. Fourteen 5/4x6 tread boards at 36 inches, two per step. The bottom riser gets cut at 5-7/8 inches instead of 6-7/8 so the installed first step matches. Rise is over 30 inches, so guards and a handrail are required. Materials came to about $310 in pressure-treated plus $95 in concrete for the pad; the same job quoted at $1,650 installed.</p>
      </Scenario>

      <h2>Where deck stairs go wrong</h2>

      <p>The bottom riser. Cut all eight notches identical, install the treads, and the first step is now a full tread thickness taller than the rest, which fails the 3/8 inch uniformity rule and trips people in the dark. The fix costs nothing and takes one line of thought at layout time: shorten the bottom riser cut by exactly the tread thickness. The cut sheet above marks it.</p>

      <p>Then attachment. Stringers should hang off the rim joist on a ledger board or metal stringer hangers, transferring load into the deck framing. Toe-nailing them to the rim is the classic failure NADRA finds in deck inspections, and it fails slowly, which is worse: the nails work loose over seasons until the whole flight moves when you step on it.</p>

      <p>Then spacing and stock. Three stringers is the minimum for a 36 inch stair and a fourth belongs on anything wider; skimping is why old stairs feel springy underfoot. Use 2x12, not 2x10, because the notch depth leaves too little material behind the cut on a 2x10. And use ground-contact rated stock for the stringers even though they are technically above ground, since the bottoms live at pad level where water sits.</p>

      <p>Finally the code items people discover at inspection. Rise over 30 inches means guards, and guards on stairs have their own geometry. A handrail must be graspable, which excludes a flat 2x4 on edge in most jurisdictions. And the landing has to be as wide as the stairs and 36 inches deep, which surprises people who planned to land on a stepping stone. When you are pricing the whole project, the <a href="/deck-calculator">deck calculator</a> covers the boards and joists, the <a href="/lumber-calculator">lumber calculator</a> converts the stringer and tread order into board feet, and the <a href="/stair-calculator">stair calculator</a> handles interior flights, which run to different numbers because interior risers are usually taller and runs shorter.</p>
    </>
  );
}
