import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function BoardFeetSVG() {
  return (
    <svg viewBox="0 0 680 160" width="100%" height="auto" role="img" aria-label="One board foot equals a piece 1 inch thick, 12 inches wide, 12 inches long. A 2x4x8 works out to 5.33 board feet using thickness times width times length divided by 144.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>What is a board foot?</text>
      <rect x="60" y="48" width="100" height="50" rx="4" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1" />
      <text x="110" y="70" textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.accent}>12&quot; × 12&quot; × 1&quot;</text>
      <text x="110" y="86" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>= 1 board foot</text>
      <text x="185" y="78" fontSize="18" fontWeight="700" fill={GUIDE_SVG.ink}>=</text>
      <text x="220" y="70" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>thickness × width × length ÷ 144</text>
      <text x="220" y="90" fontSize="10" fill={GUIDE_SVG.inkFaint}>(all measured in inches, nominal)</text>

      <line x1="20" y1="112" x2="660" y2="112" stroke={GUIDE_SVG.slateSoft} />
      <text x="20" y="132" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>Worked example, a 2×4×8:</text>
      <text x="200" y="132" fontSize="11" fill={GUIDE_SVG.inkMuted}>2 × 4 × 96 ÷ 144 = <tspan fontWeight="700" fill={GUIDE_SVG.accent}>5.33 board feet</tspan></text>
      <text x="20" y="150" fontSize="9" fill={GUIDE_SVG.inkFaint}>Board feet use nominal dimensions (2 and 4), not actual. Length is 8 ft = 96 in.</text>
    </svg>
  );
}

function NominalVsActualSVG() {
  const sizes = [
    { nominal: "2×4", actual: '1.5" × 3.5"' },
    { nominal: "2×6", actual: '1.5" × 5.5"' },
    { nominal: "2×8", actual: '1.5" × 7.25"' },
    { nominal: "2×10", actual: '1.5" × 9.25"' },
    { nominal: "2×12", actual: '1.5" × 11.25"' },
    { nominal: "4×4", actual: '3.5" × 3.5"' },
  ];
  const headerY = 70; const rowH = 26;
  return (
    <svg viewBox="0 0 680 240" width="100%" height="auto" role="img" aria-label="Nominal vs actual lumber sizes: a 2x4 is actually 1.5 by 3.5 inches.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Nominal vs actual lumber sizes</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Lumber is sold by nominal size but the actual milled dimensions are smaller</text>
      <rect x="120" y={headerY-18} width="440" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"Nominal (label)",x:230},{l:"Actual (milled)",x:440}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {sizes.map((s,i)=>{const y=headerY+10+i*rowH;return(
        <g key={s.nominal}>{i%2===0&&<rect x="120" y={y-4} width="440" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="230" y={y+12} textAnchor="middle" fontSize="12" fontWeight="700" fill={GUIDE_SVG.ink}>{s.nominal}</text>
          <text x="440" y={y+12} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{s.actual}</text>
        </g>
      )})}
    </svg>
  );
}

function PricingSVG() {
  const months = [
    {m:"Nov",h:30},{m:"Dec",h:28},{m:"Jan",h:32},{m:"Feb",h:36},
    {m:"Mar",h:52},{m:"Apr",h:60},{m:"May",h:58},{m:"Jun",h:48},
    {m:"Jul",h:44},{m:"Aug",h:42},{m:"Sep",h:38},{m:"Oct",h:34},
  ];
  return (
    <svg viewBox="0 0 680 160" width="100%" height="auto" role="img" aria-label="Seasonal lumber pricing: spring months March through May run 15 to 25 percent higher than winter.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Lumber price by season</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Framing lumber tracks building demand. Winter is the cheap window.</text>
      {months.map((mo,i)=>{
        const x=60+i*48; const y=120-mo.h;
        const spring = ["Mar","Apr","May"].includes(mo.m);
        return (
          <g key={mo.m}>
            <rect x={x} y={y} width="30" height={mo.h} rx="2" fill={spring?GUIDE_SVG.warm:GUIDE_SVG.slate} opacity={spring?0.75:0.5} />
            <text x={x+15} y="135" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint}>{mo.m}</text>
          </g>
        );
      })}
      <text x="640" y="60" textAnchor="end" fontSize="9" fill={GUIDE_SVG.warm} fontWeight="600">spring peak</text>
    </svg>
  );
}

export function LumberCalculatorExpansion() {
  return (
    <>
      <GuideByline updated="July 13, 2026" reviewedAgainst="American Lumber Standards Committee PS 20, Western Wood Products Association board-foot references, the AWC National Design Specification, and 2026 Home Depot and Lowe's retail pricing" />

      <h2>Board feet, lineal feet, and pieces: three ways to buy the same wood</h2>

      <p>Lumber yards sell hardwood by the board foot. Big-box stores sell framing lumber by the piece. Contractors quote in lineal feet. These are three different units for the same material, and mixing them up is the fastest way to order the wrong amount. The calculator above converts between all three, but knowing what each unit means lets you check any quote or cut list before the wood is on the truck.</p>

      <p>The board foot is the one people trip over, because it&apos;s a unit of volume, not length. A single board foot is a piece one inch thick, twelve inches wide, and twelve inches long, or any shape that adds up to the same 144 cubic inches. Lineal feet just measures length regardless of the board&apos;s cross-section, so ten lineal feet of 2×4 and ten lineal feet of 2×12 are the same lineal number but wildly different amounts of wood. Pieces are what the store shelf actually holds. This page and the calculator move between all three.</p>

      <h2>How to calculate board feet</h2>

      <Figure number={1} caption="Board feet use the nominal thickness and width (the 2 and 4 in a 2x4), times the length in inches, divided by 144. A standard 2x4x8 is 5.33 board feet.">
        <BoardFeetSVG />
      </Figure>

      <p>The formula is thickness times width times length, all in inches, divided by 144. The only trick is that board feet use the <em>nominal</em> dimensions, the numbers on the label (2 and 4 for a 2×4), not the smaller actual milled size. That&apos;s a deliberate convention: board feet measure how much wood you&apos;re paying for at the sawmill&apos;s rough dimension, before planing.</p>

      <p>Walk through a 2×4×8. Thickness 2, width 4, length 96 inches (that&apos;s the 8 feet). Multiply: 2 times 4 times 96 is 768. Divide by 144 and you get 5.33 board feet. A 2×6×8 is 2 times 6 times 96 over 144, which is 8 board feet. A 1×12×10 (a shelf board) is 1 times 12 times 120 over 144, or 10 board feet. Once the pattern clicks it&apos;s quick, and the calculator does it for a whole list at once, but being able to check a single piece by hand keeps a lumber yard from overcharging you on a hardwood order.</p>

      <MethodologyNote>
        <p>Board foot formula: nominal thickness times nominal width times length in inches, divided by 144. Nominal-to-actual conversions follow American Lumber Standards Committee PS 20 and WWPA references. Weight estimates use typical kiln-dried density for SPF (about 2.1 lb per board foot) and green or treated southern yellow pine (about 3.5 to 4.2 lb per board foot). Pricing reflects 2026 retail at Home Depot and Lowe&apos;s.</p>
      </MethodologyNote>

      <h2>Converting between board feet, linear feet, and square feet</h2>

      <p>These conversions come up constantly and they confuse people because the units measure different things: linear feet is length, square feet is area, board feet is volume. You can only convert between them if you know the board&apos;s dimensions, and that&apos;s the step people skip.</p>

      <p>Linear feet to board feet needs the thickness and width. A linear foot of 2×6 is (2 times 6 times 12) over 144, or 1 board foot per linear foot, so 40 linear feet of 2×6 is 40 board feet. Linear feet to square feet needs the width: a board that&apos;s 5.5 inches wide (an actual 2×6 face) covers 5.5 over 12, or 0.458 square feet per linear foot, so 40 linear feet of it covers about 18.3 square feet of surface. This is the calculation you want when you&apos;re figuring how many linear feet of decking or fence board it takes to cover a given area.</p>

      <p>Board feet to square feet is the same idea from the other direction: divide the board feet by the thickness in inches to get square feet of one-inch-thick coverage. The reason no single number works for all of these is that a &quot;foot&quot; of lumber means a different quantity depending on which dimension you&apos;re holding fixed. The calculator asks for the board size precisely so it can do these conversions correctly instead of guessing.</p>

      <h2>Nominal sizes are not actual sizes</h2>

      <Figure number={2} caption="A 2x4 is not 2 inches by 4 inches. It is 1.5 by 3.5 after milling and drying. This matters for any calculation involving coverage or fit, though board-foot pricing still uses the nominal numbers.">
        <NominalVsActualSVG />
      </Figure>

      <Callout label="Why the difference?">Raw lumber is sawn to nominal dimensions (2 inches by 4 inches). Then it is dried, losing about 1/4 inch to shrinkage, and planed smooth, losing another 1/4 inch per face. The result is 1.5 by 3.5 inches. This has been standardized since 1964. Everyone in construction knows it, but first-time builders measuring openings or figuring coverage from nominal dimensions end up short. Use nominal for board-foot pricing and actual for anything involving fit.</Callout>

      <h2>How much your lumber weighs</h2>

      <p>Weight matters more than people expect, and not just for the drive home. It decides whether you can carry a piece alone, whether your trailer is over its rating, and how much a stack loads a floor or a truck bed. Weight depends on the species and, heavily, on moisture: green or freshly treated lumber can weigh nearly twice its kiln-dried equivalent because it&apos;s full of water.</p>

      <ComparisonTable
        columns={[{title:"Board"},{title:"Kiln-dried SPF"},{title:"Pressure-treated"}]}
        rows={[
          {label:"2×4×8",values:["~11 lb","~17-22 lb"]},
          {label:"2×6×8",values:["~17 lb","~28-34 lb"]},
          {label:"2×8×8",values:["~22 lb","~36-44 lb"]},
          {label:"4×4×8",values:["~22 lb","~36-44 lb"]},
          {label:"Per board foot",values:[<strong key="a">~2.1 lb</strong>,<strong key="b">~3.5-4.2 lb</strong>]},
        ]}
        caption="Pressure-treated lumber is heavy because it is often still wet with treatment chemicals when you buy it. A treated 2x8x8 is a genuine two-person lift. Weights drop as treated lumber dries over the following weeks."
      />

      <p>A practical rule: kiln-dried framing SPF runs about 2 pounds per board foot, and wet pressure-treated stock runs closer to 4. So a bunk of treated deck joists weighs about double what the same count of dry SPF studs would, which is worth knowing before you rent a trailer or plan to carry it upstairs.</p>

      <h2>Species: what to use where</h2>

      <ComparisonTable
        columns={[{title:"SPF (framing)"},{title:"Pressure-treated"},{title:"Cedar/redwood"}]}
        rows={[
          {label:"Use",values:["Interior walls, roof framing","Deck, fence, ground contact","Outdoor furniture, siding, trim"]},
          {label:"Relative cost",values:["1× (baseline)","1.5-2× SPF","2-4× SPF"]},
          {label:"Ground contact OK?",values:["No (rots within 2 yr)","Yes (chemical treatment)","Yes (natural oils, limited)"]},
          {label:"Paintable?",values:["Yes","After 6 months cure","Yes (or leave natural)"]},
        ]}
        caption="SPF is for anything that stays dry. PT is for anything exposed to weather or ground. Cedar is the premium natural option for looks."
      />

      <h2>What lumber costs, and when to buy</h2>

      <Figure number={3} caption="Lumber prices track commodity markets and building demand. Spring (March through May) typically runs 15 to 25 percent above the winter low.">
        <PricingSVG />
      </Figure>

      <Scenario location="Denver, CO">
        A homeowner building a <a href="/shed-calculator">10×12 shed</a> priced his lumber list in February at $1,400. By the time he started buying in April, the same list was $1,720, a 23 percent jump as building-season demand hit. For a large project, buying framing lumber in the winter window (November through February) commonly saves 10 to 25 percent. If you do buy ahead, store it flat and stacked on stickers, covered but not sealed, because it needs airflow to keep from molding and warping.
      </Scenario>

      <h2>Buying at a lumberyard versus a big-box store</h2>

      <p>Where you buy changes the unit you&apos;re quoted in and the quality you get, and it&apos;s worth knowing before you show up with a list. Big-box stores (Home Depot, Lowe&apos;s) sell framing lumber by the piece at a marked shelf price, which is convenient for small jobs and lets you hand-pick boards, though the picked-over bins mean more culling. A dedicated lumberyard sells by the board foot, especially for hardwoods and better softwood grades, and will quote a whole tally at once. For a big framing order the yard is usually cheaper per board foot and the stock is straighter, but you need to speak their unit, which is board feet, not pieces.</p>

      <p>Hardwoods are almost always sold by the board foot and often in random widths and lengths, so the board-foot math on this page is exactly how you check a hardwood quote. A quote of &quot;40 board feet of red oak at $6&quot; is $240, and knowing that a 1×6×8 oak board is 4 board feet lets you sanity-check how many boards that is (ten of them). Walking in able to do that conversion is the difference between taking the counter&apos;s word and knowing your order.</p>

      <h2>Board feet versus square feet, and when each matters</h2>

      <p>These two get conflated because both sound like &quot;how much wood,&quot; but they answer different questions. Board feet measures volume, what you pay for, and it&apos;s the right unit for pricing and for structural stock where thickness matters. Square feet measures surface area, what you cover, and it&apos;s the right unit for decking, flooring, siding, and paneling where you care about the face, not the thickness.</p>

      <p>A concrete case: for a deck surface you think in square feet of decking to cover the frame, but you buy the decking boards in linear or board feet, so you convert. A 5/4×6 deck board (actual face about 5.5 inches) covers roughly 0.46 square feet per linear foot, so a 200-square-foot deck needs about 435 linear feet of board before waste. Get the unit wrong here and you either strand yourself short or haul back an extra bunk. The calculator keeps the units straight so you order the right amount the first time.</p>

      <h2>Where lumber orders go wrong</h2>

      <p><strong>Calculating coverage from nominal size.</strong> The big one. Framing a wall or laying out decking using 2 inches by 4 inches instead of 1.5 by 3.5 throws off every spacing and coverage number. Use nominal only for board-foot pricing; use actual for fit.</p>

      <p><strong>Confusing lineal feet with board feet.</strong> Ordering &quot;40 feet of 2×6&quot; is ambiguous. If the yard reads it as board feet and you meant lineal, you get far less wood than you planned. State the unit every time.</p>

      <p><strong>Forgetting the waste factor.</strong> Every cut list generates offcuts, and some boards arrive crowned, split, or twisted and go straight to the cull pile. Add about 10 percent to framing lumber and 15 percent to trim and finish stock, where appearance rules out more pieces.</p>

      <p><strong>Ignoring moisture weight.</strong> People rent a trailer for the piece count, not the weight, and discover treated lumber is nearly double what they estimated. Check the weight before you load.</p>

      <p>For framing projects, pair this calculator with the <a href="/stud-spacing-calculator">stud spacing calculator</a> for wall layouts and the <a href="/stair-calculator">stair calculator</a> for stringer sizing. For a <a href="/deck-calculator">deck</a>, the deck calculator handles joist and beam sizing directly, and the board-foot math here tells you what that framing costs.</p>
    </>
  );
}
