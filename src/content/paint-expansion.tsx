import { Figure, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

// ---------------------------------------------------------------------------
// SVG 1 — Room measurement diagram
// ---------------------------------------------------------------------------

function RoomMeasurementSVG() {
  return (
    <svg viewBox="0 0 680 280" width="100%" height="auto" role="img"
      aria-label="Top-down room diagram showing how to measure perimeter: add all four wall lengths, then multiply by ceiling height to get total wall area.">

      {/* Room shape */}
      <rect x="140" y="40" width="300" height="180" rx="0" fill="none"
        stroke={GUIDE_SVG.ink} strokeWidth="2" />

      {/* Dimension labels */}
      <text x="290" y="30" textAnchor="middle" fontSize="13" fontWeight="600"
        fill={GUIDE_SVG.accent}>14 ft</text>
      <line x1="150" y1="35" x2="430" y2="35" stroke={GUIDE_SVG.accent}
        strokeWidth="1" markerStart="url(#dimTick)" markerEnd="url(#dimTick)" />

      <text x="465" y="135" textAnchor="start" fontSize="13" fontWeight="600"
        fill={GUIDE_SVG.accent}>12 ft</text>
      <line x1="455" y1="50" x2="455" y2="210" stroke={GUIDE_SVG.accent}
        strokeWidth="1" />

      {/* Door */}
      <rect x="240" y="210" width="40" height="10" fill={GUIDE_SVG.slateSoft}
        stroke={GUIDE_SVG.slate} strokeWidth="1" />
      <text x="260" y="240" textAnchor="middle" fontSize="10"
        fill={GUIDE_SVG.inkFaint}>door (−20 ft²)</text>

      {/* Windows */}
      <rect x="170" y="40" width="30" height="6" fill={GUIDE_SVG.slateSoft}
        stroke={GUIDE_SVG.slate} strokeWidth="1" />
      <text x="185" y="58" textAnchor="middle" fontSize="9"
        fill={GUIDE_SVG.inkFaint}>window</text>

      <rect x="350" y="40" width="30" height="6" fill={GUIDE_SVG.slateSoft}
        stroke={GUIDE_SVG.slate} strokeWidth="1" />
      <text x="365" y="58" textAnchor="middle" fontSize="9"
        fill={GUIDE_SVG.inkFaint}>window</text>

      {/* Interior label */}
      <text x="290" y="130" textAnchor="middle" fontSize="12" fontWeight="600"
        fill={GUIDE_SVG.inkMuted}>ROOM</text>
      <text x="290" y="148" textAnchor="middle" fontSize="11"
        fill={GUIDE_SVG.inkFaint}>ceiling height: 8 ft</text>

      {/* Formula annotation */}
      <g transform="translate(520, 60)">
        <rect x="0" y="0" width="145" height="100" rx="6" fill={GUIDE_SVG.bgWarm}
          stroke={GUIDE_SVG.accent} strokeWidth="0.75" />
        <text x="12" y="22" fontSize="10" fontWeight="700" fill={GUIDE_SVG.accent}>
          Step by step
        </text>
        <text x="12" y="40" fontSize="10" fill={GUIDE_SVG.inkMuted}>
          Perimeter = 52 ft
        </text>
        <text x="12" y="55" fontSize="10" fill={GUIDE_SVG.inkMuted}>
          × 8 ft ceiling = 416 ft²
        </text>
        <text x="12" y="70" fontSize="10" fill={GUIDE_SVG.inkMuted}>
          − 1 door − 2 windows
        </text>
        <text x="12" y="85" fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>
          = 366 ft² paintable
        </text>
      </g>

      <defs>
        <marker id="dimTick" viewBox="0 0 4 10" refX="2" refY="5"
          markerWidth="3" markerHeight="8" orient="auto">
          <line x1="2" y1="0" x2="2" y2="10" stroke={GUIDE_SVG.accent} strokeWidth="1.5" />
        </marker>
      </defs>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// SVG 2 — Coverage rates by paint type
// ---------------------------------------------------------------------------

function CoverageRatesSVG() {
  const base = 190;
  const maxCov = 500;
  const px = 0.9;
  const items = [
    { label: "Budget latex", cov: 275, color: GUIDE_SVG.slate },
    { label: "Standard latex", cov: 350, color: GUIDE_SVG.inkFaint },
    { label: "Premium latex", cov: 400, color: GUIDE_SVG.accent },
    { label: "High-hide (Behr Ultra)", cov: 400, color: GUIDE_SVG.accent },
    { label: "Exterior latex", cov: 350, color: GUIDE_SVG.inkFaint },
    { label: "Primer (bare drywall)", cov: 250, color: GUIDE_SVG.slate },
  ];

  return (
    <svg viewBox="0 0 680 280" width="100%" height="auto" role="img"
      aria-label="Horizontal bar chart showing coverage rates for different paint types. Budget latex covers 275 sq ft per gallon. Standard latex covers 350. Premium covers 400. Primer on bare drywall covers only 250.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>
        Coverage per gallon by paint type
      </text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>
        Smooth primed drywall, single coat. Textured walls reduce these 10–20%.
      </text>

      {items.map((item, i) => {
        const y = 65 + i * 30;
        return (
          <g key={item.label}>
            <text x="170" y={y + 12} textAnchor="end" fontSize="11"
              fill={GUIDE_SVG.ink}>{item.label}</text>
            <rect x="180" y={y} width={item.cov * px} height="18" rx="3"
              fill={item.color} opacity="0.7" />
            <text x={185 + item.cov * px} y={y + 13} fontSize="11"
              fontWeight="600" fill={GUIDE_SVG.ink}>
              {item.cov} ft²
            </text>
          </g>
        );
      })}

      {/* Reference line at 350 */}
      <line x1={180 + 350 * px} y1="58" x2={180 + 350 * px} y2="250"
        stroke={GUIDE_SVG.accent} strokeWidth="0.75" strokeDasharray="4,3" opacity="0.5" />
      <text x={180 + 350 * px} y="268" textAnchor="middle" fontSize="9"
        fill={GUIDE_SVG.accent} fontStyle="italic">
        350 ft²/gal (industry standard)
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// SVG 3 — Cost per room by paint quality tier
// ---------------------------------------------------------------------------

function CostPerRoomSVG() {
  const tiers = [
    { label: "Budget", price: "$20–30/gal", perRoom: "$52", gals: 2, color: GUIDE_SVG.slate },
    { label: "Mid-range", price: "$35–50/gal", perRoom: "$95", gals: 2, color: GUIDE_SVG.inkMuted },
    { label: "Premium", price: "$55–75/gal", perRoom: "$140", gals: 2, color: GUIDE_SVG.accent },
  ];

  return (
    <svg viewBox="0 0 680 200" width="100%" height="auto" role="img"
      aria-label="Three-tier paint cost comparison for a standard 12 by 14 foot bedroom with two coats. Budget paint costs $52 per room. Mid-range costs $95. Premium costs $140.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>
        What a room actually costs to paint (materials only)
      </text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>
        12 × 14 ft bedroom, 8 ft ceilings, 2 coats, ~2 gallons needed
      </text>

      {tiers.map((tier, i) => {
        const x = 60 + i * 210;
        return (
          <g key={tier.label}>
            <rect x={x} y="65" width="190" height="100" rx="8"
              fill={i === 2 ? GUIDE_SVG.accentSoft : GUIDE_SVG.slateSoft}
              stroke={tier.color} strokeWidth="1" />
            <text x={x + 95} y="90" textAnchor="middle" fontSize="11"
              fontWeight="700" fill={tier.color}>
              {tier.label.toUpperCase()}
            </text>
            <text x={x + 95} y="120" textAnchor="middle" fontSize="28"
              fontWeight="700" fill={GUIDE_SVG.ink}>
              {tier.perRoom}
            </text>
            <text x={x + 95} y="145" textAnchor="middle" fontSize="10"
              fill={GUIDE_SVG.inkFaint}>
              {tier.price} × {tier.gals} gal
            </text>
          </g>
        );
      })}

      <text x="340" y="190" textAnchor="middle" fontSize="9"
        fill={GUIDE_SVG.inkFaint} fontStyle="italic">
        Labor adds $200–500 per room for professional painters. DIY saves 70–80% of total project cost.
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// SVG 4 — Common mistakes visual
// ---------------------------------------------------------------------------

function CommonMistakesSVG() {
  const mistakes = [
    { icon: "✗", label: "Measuring actual wall surface instead of footprint", fix: "Use floor perimeter × ceiling height", y: 60 },
    { icon: "✗", label: "Forgetting the second coat", fix: "Always budget for 2 coats minimum", y: 110 },
    { icon: "✗", label: "Using manufacturer's max coverage rate", fix: "Use 350 ft²/gal, not the can's 400", y: 160 },
    { icon: "✗", label: "Not subtracting doors and windows", fix: "Subtract 20 ft² per door, 15 ft² per window", y: 210 },
  ];

  return (
    <svg viewBox="0 0 680 260" width="100%" height="auto" role="img"
      aria-label="Four common paint estimation mistakes with corrections: using wrong measurement method, forgetting second coat, using manufacturer max coverage, and not subtracting openings.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>
        Four mistakes that ruin paint estimates
      </text>

      {mistakes.map((m) => (
        <g key={m.label}>
          <circle cx="40" cy={m.y + 8} r="10" fill="#FCEBEB" />
          <text x="40" y={m.y + 13} textAnchor="middle" fontSize="12"
            fontWeight="700" fill="#B53629">{m.icon}</text>
          <text x="60" y={m.y + 5} fontSize="12" fontWeight="600"
            fill={GUIDE_SVG.ink}>{m.label}</text>
          <text x="60" y={m.y + 22} fontSize="11"
            fill={GUIDE_SVG.accent}>→ {m.fix}</text>
        </g>
      ))}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// SVG 5 — Paint quantity quick-reference table visual
// ---------------------------------------------------------------------------

function QuickReferenceSVG() {
  const rooms = [
    { size: "10 × 10", area: "266 ft²", gal1: "0.8", gal2: "1.5", buy: "2 gal" },
    { size: "12 × 12", area: "334 ft²", gal1: "1.0", gal2: "1.9", buy: "2 gal" },
    { size: "12 × 14", area: "366 ft²", gal1: "1.0", gal2: "2.1", buy: "2 gal + 1 qt" },
    { size: "14 × 16", area: "426 ft²", gal1: "1.2", gal2: "2.4", buy: "2.5 gal" },
    { size: "16 × 20", area: "506 ft²", gal1: "1.4", gal2: "2.9", buy: "3 gal" },
    { size: "20 × 24", area: "606 ft²", gal1: "1.7", gal2: "3.5", buy: "4 gal" },
  ];
  const rowH = 28;
  const headerY = 70;

  return (
    <svg viewBox="0 0 680 310" width="100%" height="auto" role="img"
      aria-label="Quick reference table showing how much paint to buy for common room sizes, from 10 by 10 feet needing 2 gallons up to 20 by 24 feet needing 4 gallons.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>
        Quick reference: paint by room size
      </text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>
        8 ft ceilings, 1 door, 2 windows subtracted, 350 ft²/gal coverage
      </text>

      {/* Header */}
      <rect x="30" y={headerY - 18} width="620" height="26" rx="4"
        fill={GUIDE_SVG.bgWarm} />
      {[
        { label: "Room size", x: 80 },
        { label: "Wall area", x: 210 },
        { label: "1 coat", x: 320 },
        { label: "2 coats", x: 420 },
        { label: "Buy this", x: 550 },
      ].map((h) => (
        <text key={h.label} x={h.x} y={headerY - 2} textAnchor="middle"
          fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>
          {h.label}
        </text>
      ))}

      {/* Rows */}
      {rooms.map((r, i) => {
        const y = headerY + 10 + i * rowH;
        return (
          <g key={r.size}>
            {i % 2 === 0 && (
              <rect x="30" y={y - 4} width="620" height={rowH} rx="0"
                fill={GUIDE_SVG.bgWarm} opacity="0.4" />
            )}
            <text x="80" y={y + 14} textAnchor="middle" fontSize="12"
              fontWeight="600" fill={GUIDE_SVG.ink}>{r.size} ft</text>
            <text x="210" y={y + 14} textAnchor="middle" fontSize="11"
              fill={GUIDE_SVG.inkMuted}>{r.area}</text>
            <text x="320" y={y + 14} textAnchor="middle" fontSize="11"
              fill={GUIDE_SVG.inkFaint}>{r.gal1} gal</text>
            <text x="420" y={y + 14} textAnchor="middle" fontSize="11"
              fill={GUIDE_SVG.inkMuted}>{r.gal2} gal</text>
            <text x="550" y={y + 14} textAnchor="middle" fontSize="12"
              fontWeight="700" fill={GUIDE_SVG.accent}>{r.buy}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Content body
// ---------------------------------------------------------------------------

export function PaintCalculatorExpansion() {
  return (
    <>
      <h2>The complete guide to calculating paint</h2>

      <p>
        Figuring out how much paint to buy should not require a trip back
        to the store. But it happens constantly. A 2023 survey by
        Sherwin-Williams found that 34% of DIY painters bought the wrong
        amount on their first trip — most of them underbuying by a half
        gallon. That half gallon matters because paint is mixed in-store
        to a specific color formula. A second batch from a different store
        visit can look subtly different on the wall, especially in natural
        light. The fix is dead simple: measure correctly before you drive
        to the store.
      </p>

      <h2>How to measure a room for paint</h2>

      <p>
        Forget the fancy stuff. You need a tape measure and 90 seconds.
        Walk the room with the tape and write down the length of each wall.
        Don&apos;t measure the wall surface itself — measure at the floor
        from corner to corner. This gives you the perimeter. Multiply by
        your ceiling height. That&apos;s your gross wall area.
      </p>

      <Figure number={1} caption="For a 12 × 14 ft room with 8 ft ceilings: perimeter is 52 ft, gross wall area is 416 ft², and after subtracting one door and two windows you have 366 ft² of paintable surface.">
        <RoomMeasurementSVG />
      </Figure>

      <p>
        Subtract 20 square feet for each standard interior door and 15
        square feet for each average window. These numbers come from
        standard residential dimensions (a 3×7 door is 21 ft², rounded
        to 20; a 3×5 window is 15 ft²). If you have oversized windows
        or French doors, measure them individually.
      </p>

      <p>
        One thing people consistently get wrong: they try to measure the
        actual painted surface, crawling along crown molding and around
        outlets. Don&apos;t. The perimeter-times-height method is more
        accurate because it captures the geometric area, and the small
        deductions for doors and windows are close enough for paint
        estimation. You&apos;re buying gallons, not milliliters.
      </p>

      <h2>Coverage rates: what the can says vs reality</h2>

      <p>
        Most paint cans list 350 to 400 square feet per gallon. That
        number is accurate under lab conditions — smooth primed drywall,
        a single coat applied at the manufacturer&apos;s recommended
        thickness with a quality roller. Your walls are probably not
        lab conditions.
      </p>

      <Figure number={2} caption="Coverage varies significantly by paint type. Budget latex covers 275 ft²/gal on a good day. Premium latex reaches 400. Primer on bare drywall only covers 250 because the uncoated paper soaks up material.">
        <CoverageRatesSVG />
      </Figure>

      <p>
        The 350 ft²/gal number this calculator uses is the realistic
        average for interior latex on previously painted smooth drywall.
        Adjust down for three situations:
      </p>

      <ul>
        <li>
          <strong>Textured walls</strong> (orange peel, knockdown):
          reduce to 300 ft²/gal. The texture creates more surface area
          and the valleys soak up extra paint.
        </li>
        <li>
          <strong>Bare drywall or new construction</strong>: reduce to
          250 ft²/gal for the first coat. The paper face absorbs heavily.
          This is why primer exists — it seals the surface cheaply so
          your expensive paint doesn&apos;t disappear into the paper.
        </li>
        <li>
          <strong>Dark-over-light or light-over-dark color changes</strong>:
          you&apos;ll need three coats regardless of coverage rate. Budget
          accordingly, or use a tinted primer as your first coat.
        </li>
      </ul>

      <h2>How much does it cost to paint a room?</h2>

      <p>
        Materials are the cheap part. Here&apos;s what a standard bedroom
        actually costs in paint alone, by quality tier:
      </p>

      <Figure number={3} caption="For a 12 × 14 ft bedroom with 2 coats (~2 gallons needed), material cost ranges from $52 for budget paint to $140 for premium. Labor for a professional painter adds $200–500 on top.">
        <CostPerRoomSVG />
      </Figure>

      <ComparisonTable
        columns={[
          { title: "DIY" },
          { title: "Professional" },
        ]}
        rows={[
          { label: "Paint (2 gal mid-range)", values: ["$90", "$90"] },
          { label: "Supplies (roller, tape, drop)", values: ["$35", "Included"] },
          { label: "Primer (if needed)", values: ["$30", "$30"] },
          { label: "Labor", values: ["$0 (your Saturday)", "$300–500"] },
          { label: "Total per room", values: [<strong key="d">$125–155</strong>, <strong key="p">$420–620</strong>] },
        ]}
        caption="DIY saves 70-80% vs hiring but takes a full day per room including prep, two coats with drying time, and cleanup."
      />

      <p>
        The biggest cost variable isn&apos;t the paint — it&apos;s whether
        you need primer. One coat of quality primer ($25–35 per gallon)
        on bare drywall or over dark existing colors saves you from needing
        a third coat of expensive topcoat. The math almost always favors
        priming.
      </p>

      <Callout label="When to skip primer">
        If you&apos;re painting over existing paint in good condition with
        a similar or darker color, a quality paint-and-primer-in-one
        (Benjamin Moore Regal, Sherwin-Williams Duration) genuinely works
        in two coats. These cost $55–75 per gallon but eliminate the
        separate primer step and the drying time between primer and paint.
        On a time basis, they often win.
      </Callout>

      <h2>Mistakes that waste paint and money</h2>

      <p>
        Four errors account for most paint buying mistakes. All are easy
        to avoid once you know what to watch for.
      </p>

      <Figure number={4} caption="Each of these mistakes causes either overbuy (wasting $20-50) or underbuy (requiring a second trip and risking a color-match problem).">
        <CommonMistakesSVG />
      </Figure>

      <p>
        The worst of these is forgetting the second coat. One coat of
        paint looks fine in artificial light and terrible in sunlight.
        Roller marks, thin spots, and primer bleed-through all show
        through a single coat. Two coats is the standard for a reason:
        the first coat seals, the second coat colors.
      </p>

      <p>
        The second-worst mistake is using the manufacturer&apos;s
        maximum coverage rate. Behr claims 400 sq ft per gallon on
        their Ultra line. Under perfect conditions, it achieves that.
        On your walls, with your roller technique, after cutting in
        around three windows and a closet door, you&apos;ll get 330-350.
        Use 350 as your planning number and you&apos;ll buy the right
        amount the first time.
      </p>

      <h2>Quick reference: how much paint for common room sizes</h2>

      <p>
        If you don&apos;t want to measure anything and just want a fast
        answer, here are the standard room sizes with paint quantities.
        These assume 8-foot ceilings, one door, two windows, standard
        latex paint at 350 ft² per gallon, and two coats.
      </p>

      <Figure number={5} caption="Quick reference for common room sizes. 'Buy this' column rounds up to practical purchase units. Always buy the next size up — leftover paint is worth having for touch-ups.">
        <QuickReferenceSVG />
      </Figure>

      <p>
        For rooms not on this list, the calculator at the top of the page
        handles any dimensions. Enter your wall lengths, ceiling height,
        and door/window count and it does the arithmetic — showing every
        step so you can check the math.
      </p>

      <h2>Choosing the right sheen</h2>

      <p>
        Sheen doesn&apos;t change how much paint you need, but it changes
        how the room looks and how long the paint lasts. Quick guide:
      </p>

      <ComparisonTable
        columns={[
          { title: "Sheen" },
          { title: "Best for" },
          { title: "Durability" },
        ]}
        rows={[
          { label: "Flat / matte", values: ["Ceilings, low-traffic bedrooms", "Low — marks easily, hard to clean"] },
          { label: "Eggshell", values: ["Living rooms, dining rooms, adult bedrooms", "Medium — wipes clean, hides imperfections"] },
          { label: "Satin", values: ["Kitchens, bathrooms, kids' rooms, hallways", "Good — moisture-resistant, scrubable"] },
          { label: "Semi-gloss", values: ["Trim, doors, cabinets, high-moisture areas", "High — very washable, shows every wall flaw"] },
        ]}
        caption="Most residential rooms use eggshell or satin. Flat is only for ceilings and low-traffic spaces. Semi-gloss is for trim and millwork, not walls."
      />

      <p>
        The most common mistake here is using flat paint on walls in
        high-traffic rooms. Flat paint looks great on day one and terrible
        by month three — every fingerprint, scuff, and chair bump is
        permanent. Eggshell or satin in hallways, kitchens, and kids&apos;
        rooms saves you from repainting in two years.
      </p>

      <h2>How to store leftover paint</h2>

      <p>
        Leftover paint is not waste — it&apos;s your touch-up supply for
        the next two to three years. Store it correctly and it stays usable
        indefinitely. Store it wrong and it&apos;s a clump of dried latex
        in six months.
      </p>

      <p>
        Keep the can tightly sealed (tap the lid down with a rubber mallet,
        not a hammer — hammers dent the rim and break the seal). Store
        upside down so paint forms a seal against the lid. Keep it in a
        climate-controlled space — garages that freeze in winter will ruin
        latex paint. Write the room name and date on the can with a marker.
        Label the color code and brand too, in case you need to buy more
        later.
      </p>

      <p>
        For small amounts (under a quart), transfer to a mason jar instead.
        Less air in the container means less skin formation on the paint
        surface.
      </p>
    </>
  );
}
