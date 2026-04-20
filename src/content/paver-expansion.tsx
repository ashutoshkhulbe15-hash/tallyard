import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function PatternWasteSVG() {
  const patterns = [
    { label: "Running bond", waste: "5%", w: 75 },
    { label: "Stack bond", waste: "3%", w: 45 },
    { label: "Basketweave", waste: "7%", w: 105 },
    { label: "Herringbone (90°)", waste: "10%", w: 150 },
    { label: "Herringbone (45°)", waste: "15%", w: 225 },
  ];
  return (
    <svg viewBox="0 0 680 220" width="100%" height="auto" role="img" aria-label="Paver waste by pattern: running bond 5%, herringbone 45-degree 15%.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Waste factor by lay pattern</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Herringbone creates the most edge cuts but is also the strongest interlock for driveways</text>
      {patterns.map((p, i) => {
        const y = 65 + i * 28;
        return (
          <g key={p.label}>
            <text x="195" y={y + 14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{p.label}</text>
            <rect x="205" y={y} width={p.w} height="18" rx="3" fill={i >= 3 ? GUIDE_SVG.accent : GUIDE_SVG.slate} opacity="0.6" />
            <text x={213 + p.w} y={y + 13} fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>+{p.waste}</text>
          </g>
        );
      })}
    </svg>
  );
}

function BaseLayersSVG() {
  return (
    <svg viewBox="0 0 680 180" width="100%" height="auto" role="img" aria-label="Paver cross section: compacted soil, 4-6 inch gravel base, 1 inch sand, pavers on top.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>What goes under your pavers (cross section)</text>
      {[
        { label: "Pavers (2.375\")", h: 20, y: 60, color: GUIDE_SVG.accent },
        { label: "Bedding sand (1\")", h: 12, y: 82, color: "#D4A76A" },
        { label: "Compacted gravel base (4–6\")", h: 40, y: 96, color: GUIDE_SVG.slate },
        { label: "Compacted soil", h: 25, y: 138, color: GUIDE_SVG.inkFaint },
      ].map(layer => (
        <g key={layer.label}>
          <rect x="180" y={layer.y} width="320" height={layer.h} rx="2" fill={layer.color} opacity="0.5" />
          <text x="170" y={layer.y + layer.h / 2 + 4} textAnchor="end" fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{layer.label}</text>
        </g>
      ))}
    </svg>
  );
}

function PaverCostSVG() {
  const types = [
    { label: "Concrete pavers", range: "$2–6/ft²", note: "Most common, widest color selection" },
    { label: "Clay brick pavers", range: "$5–10/ft²", note: "Classic look, extremely durable" },
    { label: "Natural stone", range: "$8–25/ft²", note: "Flagstone, bluestone, travertine" },
    { label: "Porcelain pavers", range: "$6–15/ft²", note: "Modern, thin, non-porous" },
  ];
  const headerY = 70; const rowH = 30;
  return (
    <svg viewBox="0 0 680 210" width="100%" height="auto" role="img" aria-label="Paver cost: concrete $2-6, clay $5-10, stone $8-25, porcelain $6-15 per square foot.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Paver cost per square foot (material only)</text>
      <rect x="40" y={headerY-18} width="600" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"Type",x:150},{l:"Cost/ft²",x:350},{l:"Notes",x:530}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {types.map((t,i)=>{const y=headerY+10+i*rowH;return(
        <g key={t.label}>{i%2===0&&<rect x="40" y={y-4} width="600" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="150" y={y+14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{t.label}</text>
          <text x="350" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{t.range}</text>
          <text x="530" y={y+14} textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}>{t.note}</text>
        </g>
      )})}
    </svg>
  );
}

function EdgeRestraintSVG() {
  return (
    <svg viewBox="0 0 680 140" width="100%" height="auto" role="img" aria-label="Edge restraint options: plastic edging $1-2/LF, concrete curb $4-8/LF, soldier course uses pavers.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Edge restraint options</text>
      {[
        { label: "Plastic paver edging", cost: "$1–2/LF", note: "Budget, hidden, spikes every 12\"", x: 50, color: GUIDE_SVG.slate },
        { label: "Concrete curb", cost: "$4–8/LF", note: "Permanent, visible, professional look", x: 260, color: GUIDE_SVG.inkMuted },
        { label: "Soldier course", cost: "Paver cost", note: "Uses your pavers turned on edge", x: 470, color: GUIDE_SVG.accent },
      ].map(e => (
        <g key={e.label}>
          <rect x={e.x} y="50" width="180" height="65" rx="6" fill={e.label.includes("Soldier") ? GUIDE_SVG.accentSoft : GUIDE_SVG.slateSoft} stroke={e.color} strokeWidth="1" />
          <text x={e.x+90} y="72" textAnchor="middle" fontSize="10" fontWeight="700" fill={e.color}>{e.label}</text>
          <text x={e.x+90} y="90" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.ink}>{e.cost}</text>
          <text x={e.x+90} y="105" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint}>{e.note}</text>
        </g>
      ))}
    </svg>
  );
}

export function PaverCalculatorExpansion() {
  return (
    <>
      <GuideByline updated="April 20, 2026" reviewedAgainst="ICPI Tech Specs, Belgard/Pavestone installation guides" />

      <h2>The base is 80% of the project. The pavers are the last 20%.</h2>

      <p>Every paver patio, walkway, and driveway sits on a layered foundation. From bottom to top: compacted soil, 4 to 6 inches of compacted gravel, 1 inch of screeded bedding sand, and then the pavers. If any layer is wrong, the pavers move. They sink in soft spots, spread at the edges, and heave in freeze-thaw climates. Most paver failures are not paver failures. They are base failures.</p>

      <Figure number={1} caption="Four layers, each serving a different function. Skip the gravel base and the pavers sit on soil that shifts with every rain. Skip the edge restraint and they creep outward over time.">
        <BaseLayersSVG />
      </Figure>

      <MethodologyNote>
        <p>Paver counts use manufacturer coverage rates per square foot by paver size. Waste factors from ICPI (Interlocking Concrete Pavement Institute) technical bulletins. Base gravel and sand volumes include 20% compaction overage per ASTM D698. Pricing reflects 2026 retail and landscape supply yard rates.</p>
      </MethodologyNote>

      <h2>Pattern choice affects waste, strength, and cost</h2>

      <Figure number={2} caption="Herringbone creates the strongest interlock (best for driveways) but wastes 10-15% in edge cuts. Running bond is simplest with only 5% waste.">
        <PatternWasteSVG />
      </Figure>

      <p>For patios with foot traffic only, running bond is the practical default. It looks clean, installs fast, and wastes the least material. For driveways where vehicles park and turn, herringbone is the industry standard because the interlocking angle prevents individual pavers from shifting under tire loads. The 10 to 15 percent waste premium on herringbone is worth it for any surface that carries vehicle weight.</p>

      <Scenario location="Atlanta, GA">
        A homeowner laid a 400 sq ft driveway extension in running bond instead of herringbone to save on waste. Within 18 months, tire turning created a visible track where pavers had shifted 1/4 inch apart. The running bond pattern allowed lateral movement under repeated turning loads. Relaying the affected area in herringbone cost $1,200 in labor. The original herringbone waste premium would have been about $120 in extra pavers.
      </Scenario>

      <h2>What pavers cost</h2>

      <Figure number={3} caption="Concrete pavers are the value choice at $2-6/ft². Natural stone is the premium option at $8-25/ft². Installation labor adds $6-15/ft² to any material.">
        <PaverCostSVG />
      </Figure>

      <ComparisonTable
        columns={[{title:"DIY"},{title:"Professional"}]}
        rows={[
          {label:"Pavers (200 ft²)",values:["$600–1,200","$600–1,200"]},
          {label:"Gravel base + sand",values:["$200–350","Included"]},
          {label:"Edge restraint",values:["$50–100","Included"]},
          {label:"Polymeric sand",values:["$50–75","Included"]},
          {label:"Equipment rental (compactor)",values:["$100–120","Included"]},
          {label:"Labor",values:["$0 (2–3 weekends)","$1,200–3,000"]},
          {label:"Total",values:[<strong key="d">$1,000–1,850</strong>,<strong key="p">$2,000–4,500</strong>]},
        ]}
        caption="Paver patios are one of the most DIY-friendly hardscape projects. The plate compactor rental is the critical tool — without it the base will not compact properly."
      />

      <h2>Edge restraint: what keeps the whole thing together</h2>

      <Figure number={4} caption="Without edge restraint, pavers creep outward over time as the sand base shifts under load. Every paver installation needs a perimeter restraint.">
        <EdgeRestraintSVG />
      </Figure>

      <p>Plastic paver edging is the most common residential choice. It is invisible once installed (buried under mulch or turf), costs $1 to $2 per linear foot, and holds pavers firmly when spiked every 12 inches. For a more finished look, a soldier course (your pavers turned on edge along the perimeter) doubles as both restraint and decorative border. It uses more pavers but adds no separate hardware cost.</p>

      <p>Polymeric joint sand is the final step. Sweep it into every joint, mist with water, and it hardens into a semi-rigid filler that prevents weed growth and ant hills while still allowing water drainage. Regular sand washes out in the first heavy rain. Polymeric sand stays put for 3 to 5 years before needing a top-up. Budget one 50-lb bag per 50 to 60 square feet of paver surface.</p>

      <p>For gravel base calculations, use the <a href="/gravel-calculator">gravel calculator</a>. For projects that combine pavers with a concrete border or steps, the <a href="/concrete-calculator">concrete calculator</a> handles the footing math.</p>
    </>
  );
}
