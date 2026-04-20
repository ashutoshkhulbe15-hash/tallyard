import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
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
    <svg viewBox="0 0 680 250" width="100%" height="auto" role="img" aria-label="Waste by tile size: small tiles waste less, large format and diagonal layouts waste more.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Waste factor by tile size and layout</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Larger tiles create bigger offcuts. Diagonal cuts produce more unusable pieces.</text>
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
    { label: "Ceramic", range: "$0.50–5", life: "20–30 yr", color: GUIDE_SVG.slate },
    { label: "Porcelain", range: "$3–10", life: "50+ yr", color: GUIDE_SVG.inkMuted },
    { label: "Natural stone", range: "$5–25", life: "75+ yr", color: GUIDE_SVG.accent },
    { label: "Glass mosaic", range: "$8–30", life: "30+ yr", color: GUIDE_SVG.accent },
  ];
  return (
    <svg viewBox="0 0 680 210" width="100%" height="auto" role="img" aria-label="Tile cost: ceramic $0.50-5, porcelain $3-10, stone $5-25, glass $8-30.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Tile cost per square foot (material only)</text>
      {types.map((t, i) => (
        <g key={t.label}>
          <rect x={50 + i * 155} y="55" width="140" height="110" rx="8" fill={i >= 2 ? GUIDE_SVG.accentSoft : GUIDE_SVG.slateSoft} stroke={t.color} strokeWidth="1" />
          <text x={120 + i * 155} y="80" textAnchor="middle" fontSize="11" fontWeight="700" fill={t.color}>{t.label.toUpperCase()}</text>
          <text x={120 + i * 155} y="108" textAnchor="middle" fontSize="20" fontWeight="700" fill={GUIDE_SVG.ink}>{t.range}</text>
          <text x={120 + i * 155} y="128" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>{t.life}</text>
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
    <svg viewBox="0 0 680 230" width="100%" height="auto" role="img" aria-label="Grout usage: doubling joint width nearly triples grout needed.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Grout usage by tile size and joint width</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Wider joints use dramatically more grout. Doubling width nearly triples the amount.</text>
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
    <svg viewBox="0 0 680 170" width="100%" height="auto" role="img" aria-label="Concrete slab: tile-ready. Plywood + backer board: ready. Plywood alone: never.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Can you tile on your subfloor?</text>
      {[
        {label:"Concrete slab",status:"Ready",note:"Clean, level, dry. Tile directly.",color:"#2D7F46",x:50},
        {label:"Plywood + backer board",status:"Ready",note:"1/4\" or 1/2\" cement board over ply.",color:"#2D7F46",x:260},
        {label:"Plywood or OSB alone",status:"No",note:"Flexes. Cracks grout. Tiles pop.",color:"#B53629",x:470},
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

function LayoutPlanSVG() {
  return (
    <svg viewBox="0 0 680 180" width="100%" height="auto" role="img" aria-label="Layout planning: find center, dry-lay from center outward, check edge cuts are wider than half a tile.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Dry-lay planning checklist</text>
      {[
        {step:"1",label:"Find the room centerpoint",note:"Measure both directions. Mark with chalk lines.",y:55},
        {step:"2",label:"Dry-lay tiles from center outward",note:"No mortar. Just place them to see where cuts fall.",y:90},
        {step:"3",label:"Check edge cuts on all walls",note:"If any edge piece is narrower than half a tile, shift the centerline.",y:125},
        {step:"4",label:"Mark the adjusted start line",note:"This is where your first mortared tile goes. Everything aligns from here.",y:160},
      ].map(s=>(
        <g key={s.step}>
          <circle cx="35" cy={s.y+2} r="10" fill={GUIDE_SVG.accentSoft} />
          <text x="35" y={s.y+6} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.accent}>{s.step}</text>
          <text x="55" y={s.y} fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{s.label}</text>
          <text x="55" y={s.y+16} fontSize="10" fill={GUIDE_SVG.inkFaint}>{s.note}</text>
        </g>
      ))}
    </svg>
  );
}

export function TileCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="April 18, 2026"
        reviewedAgainst="TCNA Handbook, Daltile/MSI product specs, and NTCA installation standards"
      />

      <h2>The dye lot problem nobody warns you about</h2>

      <p>
        A tile installer in Phoenix told me about the call he dreads most. It comes at 2 PM on a Saturday: &quot;I am three tiles short and the store is out of my dye lot.&quot; This happens twice a month during renovation season. The homeowner measured the floor, bought exactly that many tiles, and forgot that every row along the wall needs a cut. Every cut creates a scrap piece. Some scraps start the next row, some go in the trash because they are an inch wide and fragile.
      </p>

      <p>
        Three tiles short on a porcelain floor means pulling out a tile from behind the toilet to use in a visible spot, or waiting two weeks for the same dye lot to ship from the warehouse. And dye lot is not a technicality. Tile is manufactured in batches. Color varies slightly between batches, sometimes enough to see on the wall under natural light. Order all your tile from the same dye lot, and order 10 percent more than you calculate. That extra box is your insurance against a color mismatch that cannot be fixed without tearing everything up.
      </p>

      <Callout label="Keep the extras">
        After the job is done, store the leftover tiles. When a tile cracks in year 3 (a chair leg, a dropped pan), you need an exact match. Tiles get discontinued. Dye lots are never repeated. Two spare tiles now save a $500 floor repair later.
      </Callout>

      <MethodologyNote>
        <p>
          Waste percentages follow Tile Council of North America (TCNA) installation guidelines. Grout coverage rates calculated from joint geometry (width × depth × tile perimeter / tile area). Tile pricing reflects 2026 retail from Floor &amp; Decor, Home Depot, and MSI distributor pricing. Substrate recommendations follow ANSI A108 standards.
        </p>
      </MethodologyNote>

      <h2>First question: can your subfloor handle tile?</h2>

      <p>
        Before calculating how many tiles to buy, make sure the surface underneath can support them. This is the step most DIYers skip, and it is the reason most DIY tile floors fail within two years. Tile and grout are rigid. Subfloors flex. When rigid material sits on a flexing surface, grout cracks, tiles pop, and water gets underneath.
      </p>

      <Figure number={1} caption="Tile needs a rigid, stable substrate. Concrete is ideal. Plywood needs cement backer board on top. Never tile directly on plywood or OSB.">
        <SubstrateSVG />
      </Figure>

      <p>
        Three checks before ordering materials. First, level: place a 6-foot straightedge on the subfloor and look for gaps. Anything over 3/16 inch needs leveling compound ($0.50 to $1.00 per square foot). Second, moisture: on concrete subfloors, test with a calcium chloride kit. Readings over 3 pounds per 1,000 square feet per 24 hours mean you need a moisture barrier. Third, bounce: walk across the room. If the floor visibly flexes underfoot, the joists may need sistering or blocking before tile goes down. Flexible subfloors crack rigid tile installations within a year.
      </p>

      <p>
        The most common DIY tile failure is tiling directly on a plywood subfloor without backer board. A quarter-inch cement backer board (Durock, HardieBacker) costs $0.50 to $1.00 per square foot and solves this permanently. It adds 30 minutes of work and prevents 100 percent of flex-related failures.
      </p>

      <h2>How waste changes with size and pattern</h2>

      <Figure number={2} caption="Smaller tiles waste less per cut because offcuts are more reusable. Large format (24×24) wastes more because each cut discards a bigger piece.">
        <WasteByTileSizeSVG />
      </Figure>

      <p>
        Diagonal layouts add 15 percent waste regardless of tile size because every edge cut is at an angle, producing triangular offcuts that cannot start the next row. Herringbone is even worse: 18 to 20 percent. If you have your heart set on a diagonal or herringbone pattern, budget accordingly. The tile is the same price per square foot either way, but you need 10 to 15 percent more of it.
      </p>

      <Scenario location="San Diego, CA">
        A couple tiled a 72 sq ft bathroom floor with 12×24 porcelain (MSI Veneto Gray). They ordered 80 sq ft, budgeting 11 percent waste. The room had an alcove for the tub and a diagonal cut around the toilet flange. Actual waste hit 16 percent because large format tiles create big offcuts at every wall, and the diagonal cuts around plumbing could not be reused. They were 4 tiles short. MSI happened to have the same dye lot in stock at a local distributor. For large format tile in rooms with alcoves or multiple cutouts, 15 to 18 percent waste is realistic.
      </Scenario>

      <h2>What tile actually costs</h2>

      <Figure number={3} caption="Material cost only. Installation adds $5-15/ft² for professional labor including mortar bed, cutting, and grouting.">
        <TileCostSVG />
      </Figure>

      <ComparisonTable
        columns={[{title:"DIY"},{title:"Professional"}]}
        rows={[
          {label:"Tile (100 ft² porcelain)",values:["$500","$500"]},
          {label:"Thinset mortar",values:["$25–50","Included"]},
          {label:"Grout",values:["$20–40","Included"]},
          {label:"Backer board (if needed)",values:["$100–150","Included"]},
          {label:"Wet saw rental",values:["$50–75/day","Included"]},
          {label:"Labor",values:["$0 (2–3 days)","$500–1,500"]},
          {label:"Total for 100 ft²",values:[<strong key="d">$695–815</strong>,<strong key="p">$1,000–2,000</strong>]},
        ]}
        caption="Tile is DIY-able for floors with basic straight cuts. Shower walls, mosaics, and large-format tile on walls should be hired out. The margin for error is thin and the rework cost is high."
      />

      <p>
        The wet saw rental is the line item people forget. A quality tile wet saw costs $50 to $75 per day to rent. You cannot cut porcelain with a score-and-snap cutter (it shatters), and you cannot cut curves or notches around toilet flanges without a wet saw. Budget for at least a full day rental, possibly two. Returning the saw with the tank full of milky water earns you a cleaning surcharge at most rental shops, so drain and rinse it before bringing it back.
      </p>

      <h2>Grout: the part that ties it together</h2>

      <Figure number={4} caption="Grout quantity is surprisingly sensitive to joint width. Going from 1/8 to 1/4 inch nearly triples the grout needed.">
        <GroutCoverageSVG />
      </Figure>

      <p>
        A 25-pound bag of unsanded grout covers roughly 35 to 95 square feet depending on tile size and joint width. A 100 square foot floor with 12×12 tile and 1/8-inch joints needs about 2 bags. The same floor with 1/4-inch joints needs 5 bags. That is a real cost and time difference. Wider joints also take longer to apply and are harder to keep even. Use the <a href="/grout-calculator">grout calculator</a> for exact quantities based on your tile and joint dimensions.
      </p>

      <p>
        Sanded grout is for joints wider than 1/8 inch. Unsanded grout is for 1/8 inch and narrower. Using unsanded grout in wide joints causes cracking because it shrinks too much. Using sanded grout in narrow joints is difficult to work because the sand grains do not fit. Match the grout type to your joint width.
      </p>

      <h2>Layout planning saves the entire project</h2>

      <Figure number={5} caption="Five minutes of dry-fitting before you open the mortar prevents the most common tile layout mistake: a 1-inch sliver along one wall.">
        <LayoutPlanSVG />
      </Figure>

      <p>
        Before opening the mortar, dry-lay your first two rows of tile without adhesive. Start from the center of the room, not from a wall. This shows you where the cuts fall at the edges and lets you adjust the starting point so that both sides of the room have cuts wider than half a tile. A bathroom floor with a full tile along the tub and a 1-inch sliver along the opposite wall looks like a mistake. Centering the layout prevents this.
      </p>

      <p>
        For shower walls specifically, the <a href="/shower-tile-calculator">shower tile calculator</a> handles three-wall layouts with niche openings. For kitchen backsplashes, use the <a href="/backsplash-calculator">backsplash calculator</a>, which subtracts outlets and window openings from the tiled area.
      </p>

      <p>
        One last thing. Lippage. When tiles are not pressed to equal depth in the mortar bed, one edge sits higher than its neighbor. On large format tiles (12×24 and bigger), even 1/32 of an inch of lippage catches socks and looks terrible in raking light. Use a leveling clip system (Raimondi, Spin Doctor, or similar) for any tile larger than 12×12. The clips cost $0.10 to $0.25 each and add $30 to $60 to a typical bathroom floor. They guarantee flat tile edges with zero guesswork. Professional tilers use them routinely. DIYers who skip them regret it the first time they walk across the floor barefoot.
      </p>
    </>
  );
}
