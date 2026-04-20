import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

function SlabThicknessSVG() {
  const slabs = [
    { label: "Walkway", thick: '3.5"', use: "Foot traffic only", psi: "2,500", y: 65 },
    { label: "Patio", thick: '4"', use: "Furniture, grills", psi: "3,000", y: 105 },
    { label: "Driveway", thick: '5"', use: "Passenger vehicles", psi: "3,500", y: 145 },
    { label: "Garage floor", thick: '6"', use: "Vehicles + storage", psi: "3,500", y: 185 },
    { label: "Heavy equipment", thick: '8"', use: "Trucks, RVs", psi: "4,000", y: 225 },
  ];
  const maxW = 400;
  const thickMap: Record<string, number> = { '3.5"': 175, '4"': 200, '5"': 250, '6"': 300, '8"': 400 };

  return (
    <svg viewBox="0 0 680 280" width="100%" height="auto" role="img"
      aria-label="Slab thickness guide showing walkways at 3.5 inches, patios at 4 inches, driveways at 5, garage floors at 6, and heavy equipment pads at 8 inches.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Recommended slab thickness by use</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Thicker slabs need more concrete per square foot — and cost more</text>
      {slabs.map((s) => (
        <g key={s.label}>
          <text x="125" y={s.y + 14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{s.label}</text>
          <rect x="135" y={s.y} width={thickMap[s.thick]} height="22" rx="3" fill={GUIDE_SVG.accent} opacity="0.6" />
          <text x={142 + thickMap[s.thick]} y={s.y + 14} fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{s.thick}</text>
          <text x={210 + maxW} y={s.y + 14} fontSize="10" fill={GUIDE_SVG.inkFaint}>{s.use} · {s.psi} PSI</text>
        </g>
      ))}
    </svg>
  );
}

function BagVsReadyMixSVG() {
  return (
    <svg viewBox="0 0 680 200" width="100%" height="auto" role="img"
      aria-label="Comparison showing that for jobs under 1 cubic yard, bags are practical. Over 1 yard, ready-mix delivery is cheaper and faster.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Bags vs ready-mix: the crossover</text>
      <rect x="40" y="55" width="260" height="110" rx="8" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} strokeWidth="1" />
      <text x="170" y="82" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.slate}>BAGS (80 lb)</text>
      <text x="170" y="105" textAnchor="middle" fontSize="24" fontWeight="700" fill={GUIDE_SVG.ink}>Under 1 yd³</text>
      <text x="170" y="125" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>~45 bags per yard · $7–9 per bag</text>
      <text x="170" y="145" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}>$315–405 per yard (materials only)</text>
      <rect x="380" y="55" width="260" height="110" rx="8" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1" />
      <text x="510" y="82" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.accent}>READY-MIX TRUCK</text>
      <text x="510" y="105" textAnchor="middle" fontSize="24" fontWeight="700" fill={GUIDE_SVG.ink}>1+ yd³</text>
      <text x="510" y="125" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkMuted}>$125–175 per yard delivered</text>
      <text x="510" y="145" textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}>Minimum order usually 1 yd³</text>
      <text x="340" y="190" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint} fontStyle="italic">At 1 yd³ the break-even is clear: ready-mix costs half what bags cost and takes 10 minutes vs 2 hours of mixing.</text>
    </svg>
  );
}

function CoverageTableSVG() {
  const rows = [
    { thick: '4"', sqft: 81, bags80: 56 },
    { thick: '5"', sqft: 65, bags80: 69 },
    { thick: '6"', sqft: 54, bags80: 83 },
    { thick: '8"', sqft: 40, bags80: 112 },
  ];
  const headerY = 70;
  const rowH = 30;

  return (
    <svg viewBox="0 0 680 240" width="100%" height="auto" role="img"
      aria-label="Coverage table: 1 cubic yard of concrete covers 81 square feet at 4 inches thick, 65 at 5 inches, 54 at 6 inches, and 40 at 8 inches.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>How far does 1 cubic yard go?</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Square feet covered per yard, by thickness</text>
      <rect x="60" y={headerY - 18} width="560" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{ l: "Thickness", x: 160 }, { l: "Coverage (1 yd³)", x: 340 }, { l: "80-lb bags per yd³", x: 520 }].map((h) => (
        <text key={h.l} x={h.x} y={headerY - 2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {rows.map((r, i) => {
        const y = headerY + 10 + i * rowH;
        return (
          <g key={r.thick}>
            {i % 2 === 0 && <rect x="60" y={y - 4} width="560" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4" />}
            <text x="160" y={y + 14} textAnchor="middle" fontSize="12" fontWeight="600" fill={GUIDE_SVG.ink}>{r.thick}</text>
            <text x="340" y={y + 14} textAnchor="middle" fontSize="12" fill={GUIDE_SVG.accent} fontWeight="600">{r.sqft} ft²</text>
            <text x="520" y={y + 14} textAnchor="middle" fontSize="12" fill={GUIDE_SVG.inkMuted}>{r.bags80} bags</text>
          </g>
        );
      })}
    </svg>
  );
}

function WasteFactorSVG() {
  const scenarios = [
    { label: "Simple rectangle, flat grade", waste: "5%", color: GUIDE_SVG.slate, w: 50 },
    { label: "Rectangle, uneven subgrade", waste: "10%", color: GUIDE_SVG.inkFaint, w: 100 },
    { label: "Irregular shape, slight slope", waste: "12%", color: GUIDE_SVG.inkMuted, w: 120 },
    { label: "Steps, curves, or forms on slope", waste: "15%", color: GUIDE_SVG.accent, w: 150 },
  ];

  return (
    <svg viewBox="0 0 680 210" width="100%" height="auto" role="img"
      aria-label="Waste factor guide: simple flat slabs need 5% overage, uneven subgrade 10%, irregular shapes 12%, and complex forms with steps or curves need 15%.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>How much extra to order</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Coming up short on a pour is far more expensive than having 0.25 yd³ left over</text>
      {scenarios.map((s, i) => {
        const y = 65 + i * 34;
        return (
          <g key={s.label}>
            <text x="280" y={y + 14} textAnchor="end" fontSize="11" fill={GUIDE_SVG.ink}>{s.label}</text>
            <rect x="290" y={y} width={s.w * 2} height="20" rx="3" fill={s.color} opacity="0.6" />
            <text x={300 + s.w * 2} y={y + 14} fontSize="12" fontWeight="700" fill={GUIDE_SVG.ink}>+{s.waste}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function ConcreteCalculatorExpansion() {
  return (
    <>
      <GuideByline
        updated="April 18, 2026"
        reviewedAgainst="Quikrete product specs, ASTM C94, and ready-mix industry standards"
      />

      <h2>One quarter-yard short: why concrete estimation has zero margin for error</h2>
      <p>A contractor in Ohio told me about a driveway pour that went sideways in 2024. The homeowner measured his driveway at 18 × 50 feet, plugged it into a calculator online, and ordered 11 cubic yards. What he forgot was that the apron near the garage was 6 inches thick, not 4. That two-inch difference across 18 × 8 feet added 0.9 yards he didn&apos;t order. The truck ran dry 6 feet from the end. The batch plant couldn&apos;t send another truck for 3 hours. The cold joint where the two pours met cracked through by the following spring.</p>
      <p>Concrete estimation comes down to three decisions: how thick, how much waste to add, and whether to use bags or call a truck. The volume formula itself — length times width times thickness divided by 27 — is the easy part.</p>

      <MethodologyNote>
        <p>
          Coverage and bag yields use Quikrete and Sakrete 80-lb bag
          specifications. Ready-mix pricing reflects 2025-2026 batch
          plant quotes from the National Ready Mixed Concrete Association
          (NRMCA) regional data. PSI recommendations follow ACI 332
          residential standards.
        </p>
      </MethodologyNote>

      <h2>The formula: cubic feet to cubic yards</h2>
      <p>Concrete is sold by the cubic yard. One cubic yard equals 27 cubic feet. The formula for any rectangular slab is:</p>
      <p><strong>Volume = length (ft) × width (ft) × thickness (ft) ÷ 27</strong></p>
      <p>The one thing people get wrong every time: thickness has to be in feet, not inches. A 4-inch slab is 0.333 feet thick (4 ÷ 12). Forget that conversion and your order is off by a factor of 12. The calculator at the top handles this automatically — you enter inches and it converts.</p>
      <p>For a quick mental shortcut on 4-inch slabs: divide your total square footage by 81. That gives you cubic yards. A 10 × 10 patio (100 sq ft) at 4 inches = 100 ÷ 81 = 1.23 yards. Round up to 1.5 and you&apos;re safe.</p>

      <h2>How thick should your slab be?</h2>
      <Figure number={1} caption="The right thickness depends on what the slab supports. A walkway that only handles foot traffic is fine at 3.5 inches. A driveway that parks a full-size truck needs 5-6 inches.">
        <SlabThicknessSVG />
      </Figure>
      <p>Thickness is the single biggest variable in how much concrete you need. Going from 4 inches to 6 inches on a 400 sq ft driveway adds 50% more concrete — roughly 2.5 extra cubic yards, or $375 more in material. But skipping that thickness on a driveway that parks heavy vehicles means cracking within 3-5 years and tearing it out to start over. The thickness table above isn&apos;t a suggestion — it&apos;s what the concrete will demand from you eventually.</p>

      <h2>Bags vs ready-mix delivery</h2>
      <Figure number={2} caption="Under 1 cubic yard, bags are practical if you have a mixer and patience. Over 1 yard, ready-mix delivery costs half as much and pours in minutes.">
        <BagVsReadyMixSVG />
      </Figure>
      <Callout label="The real math on bags">A single cubic yard requires 45 bags of 80-lb concrete mix, each needing water and 3-5 minutes of mixing. That&apos;s 3,600 pounds of lifting and 3+ hours of mixing for one yard. A ready-mix truck delivers the same yard in 10 minutes. For anything over 0.5 cubic yards, the labor savings alone justify the delivery fee.</Callout>

      <ComparisonTable
        columns={[{ title: "Bags (80 lb)" }, { title: "Ready-mix truck" }]}
        rows={[
          { label: "Cost per yd³", values: ["$315–405", "$125–175"] },
          { label: "Minimum order", values: ["1 bag", "1 yd³ (most plants)"] },
          { label: "Time to pour 1 yd³", values: ["3–4 hours mixing", "10 minutes"] },
          { label: "Best for", values: ["Fence posts, small pads, repairs", "Driveways, patios, slabs, footings"] },
          { label: "Quality control", values: ["Variable (your mix ratio)", "Consistent (batched to spec)"] },
        ]}
        caption="Ready-mix is cheaper AND better quality for anything over half a yard. Bags are for small, isolated pours where truck access is impossible."
      />

      <h2>How far does a yard of concrete go?</h2>
      <Figure number={3} caption="Coverage drops fast as thickness increases. One yard covers 81 sq ft at 4 inches but only 40 sq ft at 8 inches. This is why driveway pours cost dramatically more than patio pours for the same surface area.">
        <CoverageTableSVG />
      </Figure>

      <h2>How much extra to order</h2>
      <p>Never order the exact calculated amount. Subgrade is never perfectly level, forms shift slightly during the pour, and some concrete always gets left in the chute, spilled, or wasted. The question is how much buffer to add.</p>
      <Figure number={4} caption="Waste factor depends on site complexity. A flat, rectangular slab on prepared ground needs only 5% extra. Steps, curves, or sloped sites need 15%.">
        <WasteFactorSVG />
      </Figure>
      <p>The calculator above adds a 10% waste factor by default, which handles most residential pours. If your site is unusually flat and simple, you can mentally reduce to 5%. If you&apos;re pouring steps, curved edges, or anything on a slope, bump to 15%. The golden rule: half a yard left over costs $75. Coming up half a yard short costs $500+ in emergency delivery fees, cold joint repairs, and your own frustration.</p>

      <Scenario location="Denver, CO">
        A homeowner poured a 12 × 20 patio at 4 inches thick. Calculated
        volume: 2.96 yd³. He ordered 3 yards exactly — no waste factor.
        The subgrade had a 1.5-inch dip in one corner from settling after
        a sprinkler repair. That dip alone ate 0.3 extra yards. He was
        short. The batch plant sent a short-load truck for the remaining
        0.5 yards at a $175 delivery fee plus the concrete itself. Total
        overspend from skipping waste factor: $250.
      </Scenario>

      <h2>Reinforcement: rebar vs wire mesh vs fiber</h2>
      <ComparisonTable
        columns={[{ title: "Rebar grid" }, { title: "Wire mesh" }, { title: "Fiber mix" }]}
        rows={[
          { label: "Best for", values: ["Driveways, structural slabs", "Patios, walkways", "Small pads, non-structural"] },
          { label: "Cost", values: ["$0.50–1.00 / ft²", "$0.15–0.30 / ft²", "$0.10–0.20 / ft² (added to mix)"] },
          { label: "Crack control", values: ["Excellent — holds cracks tight", "Good — limits crack width", "Fair — reduces surface cracking"] },
          { label: "Installation", values: ["Set on chairs before pour", "Lay flat, pull up during pour", "Pre-mixed, no install"] },
        ]}
        caption="Rebar is the standard for any load-bearing slab. Wire mesh is the budget option for patios. Fiber is a supplement, not a replacement for steel."
      />
      <p>A common mistake — and one the <a href="/rebar-calculator">rebar calculator</a> can help you avoid — is laying wire mesh flat on the subgrade and pouring concrete on top. The mesh needs to be in the middle third of the slab to work — pull it up during the pour or set it on rebar chairs beforehand. Mesh sitting on the ground does nothing for crack control.</p>

      <h2>Cost to pour concrete in 2026</h2>
      <ComparisonTable
        columns={[{ title: "DIY" }, { title: "Professional" }]}
        rows={[
          { label: "Concrete (per yd³)", values: ["$125–175", "$125–175"] },
          { label: "Forms + rebar", values: ["$50–100", "Included"] },
          { label: "Labor", values: ["$0 (hard labor)", "$8–15 per ft²"] },
          { label: "Finishing", values: ["Broom finish (DIY-friendly)", "Stamped, exposed, or troweled"] },
          { label: "10×10 slab (4\") total", values: [<strong key="d">$250–350</strong>, <strong key="p">$800–1,500</strong>] },
        ]}
        caption="DIY is viable for simple slabs under 100 sq ft. Larger pours need a crew — concrete waits for nobody."
      />
      <p>The hidden cost of DIY concrete is time pressure. Once the truck arrives, you have about 90 minutes before the concrete starts setting. A 10×10 pad is manageable alone. A 400 sq ft driveway needs 3-4 people working in coordinated sequence: one directing the chute, one spreading, one screeding, one bull-floating. If you don&apos;t have a crew, hire the pour out.</p>
    </>
  );
}
