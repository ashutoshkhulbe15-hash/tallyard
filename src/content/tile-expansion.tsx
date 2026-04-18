import { Figure, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function WasteByTileSizeSVG() {
  const tiles = [
    { label: "Mosaic (1–2\")", waste: "10%", w: 150 },
    { label: "Small (4×4\")", waste: "8%", w: 120 },
    { label: "Standard (12×12\")", waste: "7%", w: 105 },
    { label: "Large (12×24\")", waste: "10%", w: 150 },
    { label: "Very large (24×24\")", waste: "12%", w: 180 },
    { label: "Diagonal layout (any)", waste: "15%", w: 225 },
  ];
  return (
    <svg viewBox="0 0 680 250" width="100%" height="auto" role="img" aria-label="Waste percentage by tile size. Large format tiles waste more because partial cuts can't be reused. Diagonal layouts add 15% waste.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Waste factor by tile size and layout</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Larger tiles create bigger offcuts; diagonal cuts create more unusable pieces</text>
      {tiles.map((t, i) => {
        const y = 65 + i * 28;
        return (
          <g key={t.label}>
            <text x="200" y={y + 14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{t.label}</text>
            <rect x="210" y={y} width={t.w} height="18" rx="3" fill={i === 5 ? GUIDE_SVG.accent : GUIDE_SVG.slate} opacity="0.6" />
            <text x={218 + t.w} y={y + 13} fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>+{t.waste}</text>
          </g>
        );
      })}
    </svg>
  );
}

function TileCostSVG() {
  const types = [
    { label: "Ceramic", range: "$0.50–5", avg: "$2", life: "20–30 yr", color: GUIDE_SVG.slate },
    { label: "Porcelain", range: "$3–10", avg: "$5", life: "50+ yr", color: GUIDE_SVG.inkMuted },
    { label: "Natural stone", range: "$5–25", avg: "$12", life: "75+ yr", color: GUIDE_SVG.accent },
    { label: "Glass mosaic", range: "$8–30", avg: "$18", life: "30+ yr", color: GUIDE_SVG.accent },
  ];
  return (
    <svg viewBox="0 0 680 210" width="100%" height="auto" role="img" aria-label="Tile cost per square foot by material type: ceramic $0.50-5, porcelain $3-10, natural stone $5-25, glass mosaic $8-30.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Tile cost per square foot (material only)</text>
      {types.map((t, i) => (
        <g key={t.label}>
          <rect x={50 + i * 155} y="55" width="140" height="110" rx="8" fill={i >= 2 ? GUIDE_SVG.accentSoft : GUIDE_SVG.slateSoft} stroke={t.color} strokeWidth="1" />
          <text x={120 + i * 155} y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill={t.color}>{t.label.toUpperCase()}</text>
          <text x={120 + i * 155} y="108" textAnchor="middle" fontSize="20" fontWeight="700" fill={GUIDE_SVG.ink}>{t.range}</text>
          <text x={120 + i * 155} y="128" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>avg {t.avg}/ft² · {t.life}</text>
        </g>
      ))}
      <text x="340" y="195" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint} fontStyle="italic">Add $5–15/ft² for professional installation (mortar, grout, labor)</text>
    </svg>
  );
}

function GroutCoverageSVG() {
  const rows = [
    { tile: "12×12\" tile", joint: '1/8"', lbPerSqFt: "0.7" },
    { tile: "12×12\" tile", joint: '1/4"', lbPerSqFt: "1.7" },
    { tile: "6×6\" tile", joint: '1/8"', lbPerSqFt: "1.2" },
    { tile: "4×4\" tile", joint: '1/8"', lbPerSqFt: "1.6" },
    { tile: "2×2\" mosaic", joint: '1/16"', lbPerSqFt: "0.9" },
  ];
  const headerY = 70; const rowH = 28;
  return (
    <svg viewBox="0 0 680 230" width="100%" height="auto" role="img" aria-label="Grout usage table showing pounds per square foot by tile size and joint width.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Grout usage by tile size and joint width</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Wider joints use dramatically more grout — doubling joint width nearly triples grout needed</text>
      <rect x="60" y={headerY-18} width="560" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{l:"Tile size",x:160},{l:"Joint width",x:340},{l:"Grout (lb/ft²)",x:510}].map(h=>(
        <text key={h.l} x={h.x} y={headerY-2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {rows.map((r,i)=>{const y=headerY+10+i*rowH;return(
        <g key={r.tile+r.joint}>{i%2===0&&<rect x="60" y={y-4} width="560" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4"/>}
          <text x="160" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.ink}>{r.tile}</text>
          <text x="340" y={y+14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{r.joint}</text>
          <text x="510" y={y+14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.accent}>{r.lbPerSqFt} lb</text>
        </g>
      )})}
    </svg>
  );
}

function SubstrateSVG() {
  return (
    <svg viewBox="0 0 680 170" width="100%" height="auto" role="img" aria-label="Substrate requirements: concrete slabs are tile-ready, plywood subfloors need cement backer board, and never tile directly on plywood or OSB.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Can you tile on your subfloor?</text>
      {[
        {label:"Concrete slab",status:"Ready",note:"Clean, level, dry — tile directly",color:"#2D7F46",x:50},
        {label:"Plywood + backer board",status:"Ready",note:"1/4\" or 1/2\" cement board over plywood",color:"#2D7F46",x:260},
        {label:"Plywood or OSB alone",status:"No",note:"Flexes → cracks grout → tiles pop",color:"#B53629",x:470},
      ].map(s=>(
        <g key={s.label}>
          <rect x={s.x} y="50" width="190" height="90" rx="8" fill={s.status==="No"?"#FCEBEB":GUIDE_SVG.slateSoft} stroke={s.color} strokeWidth="1" />
          <text x={s.x+95} y="75" textAnchor="middle" fontSize="11" fontWeight="700" fill={s.color}>{s.status.toUpperCase()}</text>
          <text x={s.x+95} y="95" textAnchor="middle" fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{s.label}</text>
          <text x={s.x+95} y="115" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint}>{s.note}</text>
        </g>
      ))}
    </svg>
  );
}

export function TileCalculatorExpansion() {
  return (
    <>
      <h2>The complete guide to calculating tile</h2>
      <p>Tile math looks simple until you start cutting. A 100 sq ft bathroom floor does not need 100 sq ft of tile — it needs 100 plus waste for the cuts along walls, around the toilet flange, at the shower threshold, and along every edge where a full tile doesn&apos;t fit. The waste percentage depends on tile size, layout pattern, and room shape. Get it wrong and you&apos;re either short (and the replacement box is from a different dye lot, which means a visible color mismatch) or over by two boxes that cost $80 each.</p>

      <h2>How waste factor changes with tile size and pattern</h2>
      <Figure number={1} caption="Smaller tiles waste less per cut because the offcuts are more reusable. Very large format tiles (24×24) waste more because each cut discards a bigger piece. Diagonal layouts add 15% regardless of tile size.">
        <WasteByTileSizeSVG />
      </Figure>
      <Callout label="The dye lot problem">Tile is manufactured in batches (dye lots). Color varies slightly between batches — sometimes enough to see on the wall. Order all your tile from the same dye lot and buy 10% extra. Running short and ordering more later risks a visible mismatch that you can&apos;t fix without pulling everything up.</Callout>

      <h2>What tile costs</h2>
      <Figure number={2} caption="Material cost only. Installation adds $5–15/ft² for professional labor including mortar bed, cutting, and grouting. A 75 sq ft bathroom floor in porcelain costs $375–750 in tile plus $375–1,125 in labor.">
        <TileCostSVG />
      </Figure>
      <ComparisonTable
        columns={[{title:"DIY"},{title:"Professional"}]}
        rows={[
          {label:"Tile (100 ft² porcelain)",values:["$500","$500"]},
          {label:"Thinset mortar",values:["$25–50","Included"]},
          {label:"Grout",values:["$20–40","Included"]},
          {label:"Backer board (if needed)",values:["$100–150","Included"]},
          {label:"Tool rental (wet saw)",values:["$50–75/day","Included"]},
          {label:"Labor",values:["$0 (2–3 days)","$500–1,500"]},
          {label:"Total for 100 ft²",values:[<strong key="d">$695–815</strong>,<strong key="p">$1,000–2,000</strong>]},
        ]}
        caption="Tile is DIY-able for floors with basic cuts. Shower walls, mosaics, and large-format tile on walls should be hired out — the margin for error is thin."
      />

      <h2>Don&apos;t forget the grout</h2>
      <Figure number={3} caption="Grout quantity is surprisingly sensitive to joint width. Doubling the joint width from 1/8 to 1/4 inch nearly triples the grout needed. Use the grout calculator for exact quantities.">
        <GroutCoverageSVG />
      </Figure>
      <p>A 25-lb bag of unsanded grout covers roughly 35–95 sq ft depending on tile size and joint width. A 100 sq ft floor with 12×12 tile and 1/8-inch joints needs about 2 bags. The same floor with 1/4-inch joints needs 5 bags. That&apos;s a real cost difference — and wider joints also take longer to apply and are harder to keep even.</p>

      <h2>Substrate: what goes under the tile</h2>
      <Figure number={4} caption="Tile needs a rigid, stable substrate. Concrete is ideal. Plywood needs cement backer board on top. Never tile directly on plywood or OSB — the flex will crack grout joints within a year.">
        <SubstrateSVG />
      </Figure>
      <p>The most common DIY tile failure is tiling directly on a plywood subfloor without backer board. Plywood flexes under foot traffic. Tile and grout are rigid. Flex + rigid = cracked grout, popped tiles, and water damage in wet areas. A 1/4-inch cement backer board (Durock, Hardiebacker) costs $0.50–1.00 per sq ft and solves this permanently.</p>

      <h2>Layout planning: dry-lay before you mortar</h2>
      <p>Before opening the mortar, dry-lay your first two rows of tile without adhesive. This shows you where the cuts fall at the walls and lets you center the pattern so you don&apos;t end up with a 1-inch sliver of tile along one wall and a nearly full tile on the opposite side. Center your layout from the room&apos;s midpoint, check that both edges have cuts wider than half a tile, and adjust if needed. Five minutes of dry-fitting saves a day of rework.</p>
    </>
  );
}
