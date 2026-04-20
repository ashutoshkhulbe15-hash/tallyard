import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

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
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>The surface you walk on is barely a third of total cost</text>
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

function DeckCostBySize() {
  const sizes = [
    { label: "10 × 10 (100 ft²)", pt: "$2,500–5,000", comp: "$4,000–8,000", cedar: "$3,000–4,700" },
    { label: "12 × 16 (192 ft²)", pt: "$4,800–9,600", comp: "$7,700–15,400", cedar: "$5,800–9,000" },
    { label: "16 × 20 (320 ft²)", pt: "$8,000–16,000", comp: "$13,000–25,600", cedar: "$9,600–15,000" },
    { label: "20 × 24 (480 ft²)", pt: "$12,000–24,000", comp: "$19,200–38,400", cedar: "$14,400–22,600" },
  ];
  const headerY = 70; const rowH = 30;
  return (
    <svg viewBox="0 0 680 240" width="100%" height="auto" role="img" aria-label="Deck cost by size and material, from $2,500 for a small PT deck to $38,400 for a large composite.">
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
    <svg viewBox="0 0 680 170" width="100%" height="auto" role="img" aria-label="Joist spacing: 16 inches OC standard, 12 inches for composite diagonal, 24 only for ground-level.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Joist spacing requirements</text>
      {[
        {label:'16" OC (standard)',note:"PT, cedar, composite straight runs",w:280,color:GUIDE_SVG.slate,y:55},
        {label:'12" OC (close)',note:"Composite diagonal, herringbone, heavy loads",w:210,color:GUIDE_SVG.accent,y:95},
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
    <svg viewBox="0 0 680 190" width="100%" height="auto" role="img" aria-label="Right fastener by material: stainless for PT, hot-dip galvanized for cedar, hidden clips for composite.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Right fastener by material</text>
      {[
        {mat:"Pressure-treated",fastener:"Stainless or ACQ-rated",why:"Copper treatment corrodes standard galvanized",x:50,color:GUIDE_SVG.slate},
        {mat:"Cedar",fastener:"Stainless or hot-dip galv.",why:"Tannins stain around plain steel",x:260,color:"#8B6B3D"},
        {mat:"Composite",fastener:"Hidden clips or color-match",why:"Visible fasteners ruin the clean look",x:470,color:GUIDE_SVG.accent},
      ].map(f=>(
        <g key={f.mat}>
          <rect x={f.x} y="50" width="180" height="110" rx="8" fill={f.mat==="Composite"?GUIDE_SVG.accentSoft:GUIDE_SVG.slateSoft} stroke={f.color} strokeWidth="1" />
          <text x={f.x+90} y="74" textAnchor="middle" fontSize="11" fontWeight="700" fill={f.color}>{f.mat.toUpperCase()}</text>
          <text x={f.x+90} y="98" textAnchor="middle" fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{f.fastener}</text>
          <text x={f.x+12} y="120" fontSize="9" fill={GUIDE_SVG.inkFaint}>{f.why}</text>
        </g>
      ))}
    </svg>
  );
}

function PermitChecklistSVG() {
  const items = [
    { check: "✓", label: "Attached deck over 200 ft²", req: "Permit required in most jurisdictions" },
    { check: "✓", label: "Any deck over 30\" above grade", req: "Railing + permit required (IRC R507.2)" },
    { check: "✓", label: "Freestanding deck under 200 ft², under 30\"", req: "Often exempt. Check local code." },
    { check: "✗", label: "Skipping the inspection", req: "Unpermitted decks void insurance and complicate sales" },
  ];
  return (
    <svg viewBox="0 0 680 200" width="100%" height="auto" role="img" aria-label="Permit checklist: decks over 200 sq ft or 30 inches above grade need permits. Never skip inspection.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Do you need a permit?</text>
      {items.map((item, i) => {
        const y = 55 + i * 35;
        const isGood = item.check === "✓";
        return (
          <g key={item.label}>
            <circle cx="35" cy={y + 8} r="8" fill={isGood ? "#EAF3DE" : "#FCEBEB"} />
            <text x="35" y={y + 12} textAnchor="middle" fontSize="9" fontWeight="700" fill={isGood ? "#2D7F46" : "#B53629"}>{item.check}</text>
            <text x="55" y={y + 5} fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{item.label}</text>
            <text x="55" y={y + 21} fontSize="10" fill={GUIDE_SVG.inkFaint}>{item.req}</text>
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

      <h2>The part of your deck you never see costs more than the part you do</h2>

      <p>
        When my neighbor built his deck in 2023, he picked composite boards, agonized over the color for two weeks, and asked the contractor to match it with a complementary railing. The decking boards came to $3,800. Then the full invoice arrived: $11,200. The other $7,400 went to things he never thought about. Joists. Beams. Post brackets. Concrete for 8 footings. Joist hangers. A ledger board with flashing. A staircase. Two days of labor. The walking surface he spent all his time choosing was barely a third of the bill.
      </p>

      <Figure number={1} caption="Decking boards get all the attention during material selection, but the frame underneath (joists, beams, posts) accounts for 25% of cost and 100% of structural integrity.">
        <MaterialBreakdownSVG />
      </Figure>

      <MethodologyNote>
        <p>
          Framing specs follow IRC 2021 Section R507 (decks). Joist spacing and span tables from the American Wood Council (AWC) DCA6 prescriptive residential wood deck construction guide. Composite requirements from Trex (Transcend, Enhance) and TimberTech (AZEK, Pro) installation manuals. Pricing reflects 2026 installed costs from HomeGuide and Angi.
        </p>
      </MethodologyNote>

      <h2>How much a deck costs by size and material</h2>

      <p>
        The price ranges below are wide for a reason. Deck costs depend on three things most online estimates ignore. First, height: a ground-level deck needs short posts and no stairs, while a second-story deck needs 10-foot posts and a full staircase. Second, railing: cable rail costs three times what wood balusters cost for the same linear footage. Third, geography: labor in the Northeast runs 40 to 60 percent more than in the Southeast.
      </p>

      <Figure number={2} caption="A standard 16×20 pressure-treated deck runs $8,000-16,000 installed. Composite roughly doubles the surface material cost but the frame cost stays the same.">
        <DeckCostBySize />
      </Figure>

      <ComparisonTable
        columns={[{title:"DIY"},{title:"Professional"}]}
        rows={[
          {label:"Decking surface (320 ft²)",values:["$1,400–3,000","$1,400–3,000"]},
          {label:"Frame lumber (joists, beams, ledger)",values:["$800–1,200","Included"]},
          {label:"Posts + concrete footings",values:["$300–500","Included"]},
          {label:"Fasteners + joist hangers",values:["$200–350","Included"]},
          {label:"Stairs + railing",values:["$400–900","Included"]},
          {label:"Labor",values:["$0 (3–5 weekends)","$3,000–7,000"]},
          {label:"Total for 16×20",values:[<strong key="d">$3,100–6,000</strong>,<strong key="p">$8,000–16,000</strong>]},
        ]}
        caption="DIY saves 50-60% but requires framing knowledge. The ledger board connection (where the deck attaches to the house) is the most structurally critical joint and the one most DIYers get wrong."
      />

      <h2>Joist spacing: the decision you cannot change later</h2>

      <p>
        Joist spacing is set during framing, before a single decking board goes down. Get it wrong and the only fix is tearing up the entire surface, adding or moving joists, and re-laying everything. This is the most expensive mistake in deck building because it turns a $200 framing decision into a $2,000 rework.
      </p>

      <Figure number={3} caption="Most composite manufacturers require 16-inch spacing for straight runs and 12-inch for diagonal patterns. Framing at 24 inches and then choosing composite later means starting over.">
        <JoistSpacingSVG />
      </Figure>

      <Scenario location="Charlotte, NC">
        A DIYer framed a 14 × 18 composite deck at 24-inch joist spacing because that is how his old pressure-treated deck was built. The Trex Transcend he chose requires 16-inch spacing for straight runs. He did not discover this until he called Trex support about sagging boards two years later. Trex denied the warranty claim. Incorrect joist spacing voids the warranty. The fix required removing all decking, adding intermediate joists, and re-laying 252 sq ft of boards. Cost: $2,800 in labor plus a lost Saturday. If he had framed at 16 inches from the start, the extra joists would have cost $180.
      </Scenario>

      <Callout label="Check the spec sheet before framing">
        Every composite manufacturer publishes a span table and joist spacing requirement. Trex Transcend and Enhance require 16-inch OC for straight, 12-inch for diagonal. TimberTech AZEK is the same. Some budget composites allow 24-inch on straight runs but void the warranty for diagonal at anything over 12. Read the spec sheet for your exact product before you set a single joist.
      </Callout>

      <h2>Fasteners: why the wrong screw ruins a $10,000 deck</h2>

      <Figure number={4} caption="Standard galvanized screws corrode within 2 years in contact with pressure-treated copper. Cedar tannins leave black streaks around plain steel. Composite needs hidden clips.">
        <FastenerGuideSVG />
      </Figure>

      <p>
        Fastener callbacks account for roughly 80 percent of deck warranty claims and service calls, according to NADRA (North American Deck and Railing Association) member surveys. The problem is almost always the same: someone used regular galvanized screws on a pressure-treated deck. The copper preservative in modern PT lumber (ACQ or CA-B) corrodes standard galvanized coating within 18 to 24 months. The screw heads turn black, stain the wood, and eventually lose holding power. Stainless steel screws or screws specifically rated for ACQ-treated lumber solve this completely. They cost twice as much per box and save the entire deck.
      </p>

      <ComparisonTable
        columns={[{title:"Hidden clips"},{title:"Face screws"},{title:"Nails"}]}
        rows={[
          {label:"Look",values:["Clean, no visible fasteners","Screw heads visible","Nail heads visible"]},
          {label:"Cost",values:["$0.75–1.50/ft²","$0.25–0.50/ft²","$0.10–0.20/ft²"]},
          {label:"Board removal",values:["Individual boards removable","Individual removal possible","Boards split during removal"]},
          {label:"Best for",values:["Composite, premium cedar","PT, standard cedar","Framing only, never for decking"]},
        ]}
        caption="Hidden clips add $200-500 to a typical deck but are standard for composite and allow individual board replacement if one gets damaged."
      />

      <h2>Permits and inspections</h2>

      <Figure number={5} caption="Most attached decks and any deck over 30 inches above grade require a building permit. The inspector checks your ledger, footings, joist hangers, and railing posts.">
        <PermitChecklistSVG />
      </Figure>

      <p>
        Permits run $100 to $500 depending on your municipality. The inspection checks four things that fail catastrophically when done wrong: the ledger board connection to the house (the leading cause of deck collapses), footing depth below frost line, joist hanger installation, and railing post connections. An unpermitted deck creates insurance gaps and complicates home sales. The inspector is not the enemy. The inspector is the person who confirms your deck will not collapse with 20 people on it during a July cookout.
      </p>

      <h2>Footings: what holds the whole thing up</h2>

      <p>
        Every deck post sits on a concrete footing that extends below the frost line. That means 36 to 48 inches deep in northern climates, 12 to 18 inches in the South. Each footing is a hole about 12 inches in diameter filled with concrete, roughly 0.6 cubic feet per footing or 2 bags of 80-lb mix.
      </p>

      <p>
        A typical 16 × 20 deck needs 6 to 9 footings depending on beam spacing and load. At 2 bags per footing, that is 12 to 18 bags of concrete, roughly $90 to $135 in materials. The labor is the expensive part, not the concrete itself. Use the <a href="/concrete-calculator">concrete calculator</a> for exact footing volumes and the <a href="/stair-calculator">stair calculator</a> for code-compliant stairs from deck to ground.
      </p>

      <p>
        One thing contractors sometimes skip on lower decks: they set posts directly on poured concrete pads instead of using post base brackets. This puts the wood in direct contact with a surface that wicks moisture. Within 5 to 8 years the post base rots from the inside out. A $4 galvanized post base bracket on every footing keeps wood above the concrete and adds decades to post life. If your contractor&apos;s quote does not include post brackets, ask why.
      </p>
    </>
  );
}
