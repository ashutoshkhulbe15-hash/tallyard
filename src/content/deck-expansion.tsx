import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function DeckCostBySize() {
  const sizes = [
    { label: "10 × 10 (100 ft²)", pt: "$2,500–5,000", comp: "$4,000–8,000", cedar: "$3,000–4,700" },
    { label: "12 × 16 (192 ft²)", pt: "$4,800–9,600", comp: "$7,700–15,400", cedar: "$5,800–9,000" },
    { label: "16 × 20 (320 ft²)", pt: "$8,000–16,000", comp: "$13,000–25,600", cedar: "$9,600–15,000" },
    { label: "20 × 24 (480 ft²)", pt: "$12,000–24,000", comp: "$19,200–38,400", cedar: "$14,400–22,600" },
  ];
  const headerY = 70; const rowH = 30;
  return (
    <svg viewBox="0 0 680 240" width="100%" height="auto" role="img" aria-label="Deck cost by size and material, from $2,500 for a small pressure-treated deck to $38,400 for a large composite deck.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Installed deck cost by size (2026)</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Includes frame, decking, stairs, railing, and labor</text>
      <rect x="30" y={headerY-18} width="620" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"Deck size",x:120},{l:"Pressure-treated",x:300},{l:"Composite",x:440},{l:"Cedar",x:580}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {sizes.map((r,i)=>{const y=headerY+10+i*rowH;return(
        <g key={r.label}>{i%2===0&&<rect x="30" y={y-4} width="620" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="120" y={y+14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{r.label}</text>
          <text x="300" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{r.pt}</text>
          <text x="440" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{r.comp}</text>
          <text x="580" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkFaint}>{r.cedar}</text>
        </g>
      )})}
    </svg>
  );
}

function JoistSpacingSVG() {
  return (
    <svg viewBox="0 0 680 170" width="100%" height="auto" role="img" aria-label="Joist spacing requirements: 16 inches on center for straight runs, 12 inches for diagonal composite, 24 inches for ground-level platforms only.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Joist spacing requirements</text>
      {[
        {label:'16" OC (standard)',note:"PT, cedar, composite straight runs",w:280,color:GUIDE_SVG.slate,y:55},
        {label:'12" OC (close)',note:"Composite diagonal/herringbone, heavy loads",w:210,color:GUIDE_SVG.accent,y:95},
        {label:'24" OC (wide)',note:"Ground-level platforms only, some PT",w:350,color:GUIDE_SVG.inkFaint,y:135},
      ].map(s=>(
        <g key={s.label}>
          <rect x="200" y={s.y} width={s.w} height="24" rx="4" fill={s.color} opacity="0.5" />
          <text x="190" y={s.y+16} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{s.label}</text>
          <text x={210+s.w} y={s.y+16} fontSize="10" fill={GUIDE_SVG.inkFaint}>{s.note}</text>
        </g>
      ))}
    </svg>
  );
}

function FastenerGuideSVG() {
  return (
    <svg viewBox="0 0 680 190" width="100%" height="auto" role="img" aria-label="Fastener types by decking material: stainless for pressure-treated, any corrosion-resistant for cedar, hidden clips for composite.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Right fastener by material</text>
      {[
        {mat:"Pressure-treated",fastener:"Stainless steel or ACQ-rated",why:"Copper treatment corrodes standard galvanized",x:50,color:GUIDE_SVG.slate},
        {mat:"Cedar",fastener:"Stainless or hot-dip galvanized",why:"Tannins stain around plain steel fasteners",x:260,color:"#8B6B3D"},
        {mat:"Composite",fastener:"Hidden clips or color-matched screws",why:"Visible fasteners ruin the clean look",x:470,color:GUIDE_SVG.accent},
      ].map(f=>(
        <g key={f.mat}>
          <rect x={f.x} y="50" width="180" height="110" rx="8" fill={f.mat==="Composite"?GUIDE_SVG.accentSoft:GUIDE_SVG.slateSoft} stroke={f.color} strokeWidth="1" />
          <text x={f.x+90} y="74" textAnchor="middle" fontSize="11" fontWeight="700" fill={f.color}>{f.mat.toUpperCase()}</text>
          <text x={f.x+90} y="98" textAnchor="middle" fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{f.fastener}</text>
          <text x={f.x+12} y="118" fontSize="9" fill={GUIDE_SVG.inkFaint}>{f.why.substring(0,30)}</text>
          <text x={f.x+12} y="132" fontSize="9" fill={GUIDE_SVG.inkFaint}>{f.why.substring(30)}</text>
        </g>
      ))}
    </svg>
  );
}

function MaterialBreakdownSVG() {
  const items = [
    { label: "Decking boards", pct: 35, color: GUIDE_SVG.accent },
    { label: "Frame (joists, beams)", pct: 25, color: GUIDE_SVG.inkMuted },
    { label: "Labor", pct: 25, color: GUIDE_SVG.slate },
    { label: "Fasteners, posts, concrete", pct: 10, color: GUIDE_SVG.inkFaint },
    { label: "Railing + stairs", pct: 5, color: GUIDE_SVG.slateSoft },
  ];
  let cumX = 60;
  return (
    <svg viewBox="0 0 680 160" width="100%" height="auto" role="img" aria-label="Deck budget breakdown: decking boards 35%, frame 25%, labor 25%, hardware 10%, railing and stairs 5%.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Where your deck budget goes</text>
      {items.map((item) => {
        const w = item.pct * 5.6;
        const x = cumX;
        cumX += w + 2;
        return (
          <g key={item.label}>
            <rect x={x} y="55" width={w} height="40" rx="3" fill={item.color} opacity="0.7" />
            <text x={x + w / 2} y="110" textAnchor="middle" fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{item.pct}%</text>
            <text x={x + w / 2} y="125" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint}>{item.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function DeckCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="April 18, 2026"
        reviewedAgainst="NADRA deck construction standards, Trex/TimberTech install guides, and IRC 2021 R507"
      />

      <h2>The complete guide to calculating deck materials</h2>
      <p>When my neighbor built his deck in 2023, he priced the decking boards, added 10% for waste, and thought he had his budget. Then the contractor&apos;s invoice arrived. The decking boards were $3,800. The total was $11,200. Where did the other $7,400 go? Joists, beams, post brackets, concrete for 8 footings, joist hangers, a ledger board with flashing, a staircase, railing, and two days of labor. The walking surface he spent all his time choosing was barely a third of the cost.</p>

      <MethodologyNote>
        <p>
          Framing specs follow IRC 2021 Section R507 (decks). Joist
          spacing and span tables from the American Wood Council (AWC)
          DCA6 prescriptive residential wood deck construction guide.
          Composite manufacturer requirements from Trex (Transcend,
          Enhance) and TimberTech (AZEK, Pro) installation manuals.
          Pricing reflects 2026 installed costs from HomeGuide and Angi.
        </p>
      </MethodologyNote>

      <Figure number={1} caption="Budget distribution for a typical deck project. Decking boards (the part you see) are only 35% of total cost. The frame and labor together account for half.">
        <MaterialBreakdownSVG />
      </Figure>

      <h2>What a deck costs in 2026</h2>
      <Figure number={2} caption="Installed cost by size and material. A standard 16×20 pressure-treated deck runs $8,000-16,000 depending on height, stairs, railing, and regional labor rates.">
        <DeckCostBySize />
      </Figure>
      <p>The price ranges above look wide because deck costs vary with three things most online estimates ignore: deck height (ground-level needs fewer posts and no stairs; second-story needs 10-foot posts and a full staircase), railing complexity (cable rail costs 3× what wood balusters cost), and local labor rates (deck labor in the Northeast costs 40-60% more than in the Southeast).</p>

      <Callout label="The permit question">Most jurisdictions require a building permit for any attached deck over 200 sq ft or any deck over 30 inches above grade. Permits run $100–500 and require an inspection. Don&apos;t skip it — unpermitted decks create insurance gaps and complicate home sales. The inspector checks your ledger connection, footing depth, joist hangers, and railing post connections. These are the four things that fail catastrophically when done wrong.</Callout>

      <h2>Joist spacing: get this wrong and everything fails</h2>
      <Figure number={3} caption="Joist spacing is set at the framing stage before any decking goes down. Too wide and composite sags, wood bounces, and the whole deck feels spongy.">
        <JoistSpacingSVG />
      </Figure>
      <p>The most expensive mistake in deck building is framing the joists at 24-inch centers and then deciding to use composite decking. Most composite manufacturers require 16-inch centers for straight runs and 12-inch for diagonal patterns. Fixing this after the frame is built means tearing up the decking, adding blocking or additional joists, and re-laying everything. A $200 framing decision becomes a $2,000 rework.</p>

      <h2>Fasteners: the detail that causes 80% of deck callbacks</h2>
      <Figure number={4} caption="Using the wrong fastener type is the most common installation error. Standard galvanized screws corrode in contact with pressure-treated copper and leave black streaks around cedar tannins.">
        <FastenerGuideSVG />
      </Figure>

      <ComparisonTable
        columns={[{title:"Hidden clips"},{title:"Face screws"},{title:"Nails"}]}
        rows={[
          {label:"Look",values:["Clean, no visible fasteners","Screw heads visible","Visible nail heads"]},
          {label:"Cost",values:["$0.75–1.50 per ft²","$0.25–0.50 per ft²","$0.10–0.20 per ft²"]},
          {label:"Removal",values:["Individual board removal possible","Individual removal possible","Boards split during removal"]},
          {label:"Best for",values:["Composite, premium cedar","PT, standard cedar","Never for decking (framing only)"]},
        ]}
        caption="Hidden clips add $200-500 to a typical deck but eliminate visible fastener heads and allow individual board replacement. Standard for composite; optional upgrade for wood."
      />

      <Scenario location="Charlotte, NC">
        A DIYer framed a 14 × 18 composite deck at 24-inch joist spacing
        (how his pressure-treated deck from his old house was built).
        The Trex Transcend he picked requires 16-inch spacing for
        straight runs. He didn&apos;t find this out until he called Trex
        support about a warranty claim for sagging boards two years later.
        Trex denied the claim — incorrect joist spacing voids the
        warranty. Fixing it required removing all decking, adding
        intermediate joists, and re-laying 252 sq ft of boards. Cost:
        $2,800 in labor plus the lost Saturday.
      </Scenario>

      <h2>Concrete footings: what holds the deck up</h2>
      <p>Every deck post sits on a concrete footing that extends below the frost line — 36 to 48 inches deep in northern climates, 12 to 18 inches in the South. Each footing is a hole about 12 inches in diameter filled with concrete (roughly 0.6 cubic feet per footing, or 2 bags of 80-lb mix).</p>
      <p>A typical 16 × 20 deck needs 6 to 9 footings depending on beam spacing and load. At 2 bags per footing, that&apos;s 12–18 bags of concrete — about $85–130 in materials. The labor to dig, set post brackets, and pour is the time-consuming part, not the material cost.</p>
      <p>Use the <a href="/concrete-calculator">concrete calculator</a> for footing volumes and the <a href="/stair-calculator">stair calculator</a> for code-compliant stairs from deck to ground.</p>
    </>
  );
}
