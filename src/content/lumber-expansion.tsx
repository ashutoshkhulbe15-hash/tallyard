import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function BoardFeetSVG() {
  return (
    <svg viewBox="0 0 680 130" width="100%" height="auto" role="img" aria-label="One board foot equals a piece 1 inch thick, 12 inches wide, 12 inches long.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>What is a board foot?</text>
      <rect x="80" y="50" width="100" height="50" rx="4" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1" />
      <text x="130" y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.accent}>12" × 12" × 1"</text>
      <text x="130" y="88" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>= 1 board foot</text>
      <text x="220" y="80" fontSize="18" fontWeight="700" fill={GUIDE_SVG.ink}>=</text>
      <text x="260" y="72" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>thickness × width × length ÷ 144</text>
      <text x="260" y="92" fontSize="10" fill={GUIDE_SVG.inkFaint}>(all in inches)</text>
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
  const items = [
    { label: "2×4×8 SPF (stud)", price: "$3–5", bf: "5.3 BF" },
    { label: "2×6×12 SPF", price: "$7–11", bf: "12 BF" },
    { label: "2×10×16 SPF", price: "$18–28", bf: "26.7 BF" },
    { label: "2×12×16 SPF", price: "$25–40", bf: "32 BF" },
    { label: "4×4×8 PT post", price: "$12–18", bf: "10.7 BF" },
    { label: "2×6×16 PT (deck joist)", price: "$12–18", bf: "16 BF" },
  ];
  const headerY = 70; const rowH = 26;
  return (
    <svg viewBox="0 0 680 250" width="100%" height="auto" role="img" aria-label="Lumber pricing: 2x4x8 stud costs $3-5, 2x12x16 costs $25-40.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Common lumber prices (2026 retail)</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Prices vary 20-40% by region and season. Spring is peak demand and highest prices.</text>
      <rect x="40" y={headerY-18} width="600" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"Size / species",x:170},{l:"Price each",x:380},{l:"Board feet",x:530}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {items.map((item,i)=>{const y=headerY+10+i*rowH;return(
        <g key={item.label}>{i%2===0&&<rect x="40" y={y-4} width="600" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="170" y={y+12} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{item.label}</text>
          <text x="380" y={y+12} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{item.price}</text>
          <text x="530" y={y+12} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkFaint}>{item.bf}</text>
        </g>
      )})}
    </svg>
  );
}

export function LumberCalculatorExpansion() {
  return (
    <>
      <GuideByline updated="April 20, 2026" reviewedAgainst="AWC National Design Specification, Home Depot/Lowe's 2026 pricing" />

      <h2>Board feet, lineal feet, and pieces: three ways to buy the same wood</h2>

      <p>Lumber yards sell hardwood by the board foot. Big-box stores sell framing lumber by the piece. Contractors quote in lineal feet. These are three different units for the same material, and confusing them is the fastest way to order the wrong amount. The calculator above converts between all three, but understanding the units helps you check any quote or lumber list.</p>

      <Figure number={1} caption="One board foot = a piece 1 inch thick, 12 inches wide, 12 inches long. A standard 2×4×8 contains 5.3 board feet.">
        <BoardFeetSVG />
      </Figure>

      <MethodologyNote>
        <p>Board foot formula: (thickness × width × length) ÷ 144, all in inches. Nominal-to-actual conversions per WWPA (Western Wood Products Association) standards. Pricing reflects 2026 retail at Home Depot and Lowe&apos;s for SPF (spruce-pine-fir) and pressure-treated southern yellow pine.</p>
      </MethodologyNote>

      <h2>Nominal sizes are not actual sizes</h2>

      <Figure number={2} caption="A 2×4 is not 2 inches by 4 inches. It is 1.5 by 3.5 after milling and drying. This matters for any calculation involving coverage or fit.">
        <NominalVsActualSVG />
      </Figure>

      <Callout label="Why the difference?">Raw lumber is sawn to nominal dimensions (2 inches by 4 inches). Then it is dried (losing about 1/4 inch to shrinkage) and planed smooth (losing another 1/4 inch per face). The result is 1.5 by 3.5 inches. This has been standardized since 1964. Everyone in construction knows it, but first-time builders measuring openings or calculating coverage based on nominal dimensions end up short.</Callout>

      <h2>What lumber costs right now</h2>

      <Figure number={3} caption="Lumber prices track commodity markets and spike with demand. Spring (March–May) is typically 15-25% more expensive than winter.">
        <PricingSVG />
      </Figure>

      <Scenario location="Denver, CO">
        A homeowner building a <a href="/shed-calculator">10×12 shed</a> priced his lumber list in February at $1,400. By the time he started buying in April, the same list was $1,720. Framing lumber prices had jumped 23% between February and April as building season demand hit. For large projects, buying lumber during winter months (November through February) saves 10 to 25 percent on material. Store it flat, stacked on stickers, covered but not sealed (it needs airflow to prevent mold).
      </Scenario>

      <ComparisonTable
        columns={[{title:"SPF (framing)"},{title:"Pressure-treated"},{title:"Cedar/redwood"}]}
        rows={[
          {label:"Use",values:["Interior walls, roof framing","Deck, fence, ground contact","Outdoor furniture, siding, trim"]},
          {label:"Relative cost",values:["1× (baseline)","1.5–2× SPF","2–4× SPF"]},
          {label:"Ground contact OK?",values:["No (rots within 2 yr)","Yes (chemical treatment)","Yes (natural oils, limited)"]},
          {label:"Paintable?",values:["Yes","After 6 months cure","Yes (or leave natural)"]},
        ]}
        caption="SPF is for anything that stays dry. PT is for anything exposed to weather or ground. Cedar is the premium natural option."
      />

      <p>For framing projects, pair this calculator with the <a href="/stud-spacing-calculator">stud spacing calculator</a> for wall layouts and the <a href="/stair-calculator">stair calculator</a> for stringer sizing. For <a href="/deck-calculator">deck framing</a>, the deck calculator handles joist and beam sizing automatically.</p>
    </>
  );
}
