import type { Metadata } from "next";
import Link from "next/link";
import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

export const metadata: Metadata = {
  title: "How much does it cost to build a fence? (2026 prices)",
  description: "A 200 LF wood privacy fence costs $4,500-7,000 installed. Vinyl runs $6,000-9,000. Chain link $2,500-4,000. Full per-foot breakdown by material.",
  alternates: { canonical: "/cost-to-build-a-fence" },
};

function PerFootSVG() {
  const mats = [
    { label: "Chain link (4 ft)", low: 10, high: 25, color: GUIDE_SVG.inkFaint },
    { label: "Pressure-treated wood (6 ft)", low: 15, high: 35, color: GUIDE_SVG.slate },
    { label: "Cedar (6 ft)", low: 20, high: 40, color: "#8B6B3D" },
    { label: "Vinyl / PVC (6 ft)", low: 20, high: 45, color: GUIDE_SVG.inkMuted },
    { label: "Aluminum (4–5 ft)", low: 25, high: 55, color: GUIDE_SVG.accent },
    { label: "Wrought iron", low: 30, high: 100, color: GUIDE_SVG.accent },
  ];
  return (
    <svg viewBox="0 0 680 260" width="100%" height="auto" role="img" aria-label="Fence cost per linear foot: chain link $10-25, wood $15-35, vinyl $20-45, aluminum $25-55.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Installed cost per linear foot (2026)</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Includes posts, rails, infill, concrete, one gate, and labor</text>
      {mats.map((m, i) => {
        const y = 65 + i * 30;
        const xStart = 240 + m.low * 2.5;
        const w = (m.high - m.low) * 2.5;
        return (
          <g key={m.label}>
            <text x="230" y={y + 14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{m.label}</text>
            <rect x={xStart} y={y} width={w} height="20" rx="3" fill={m.color} opacity="0.6" />
            <text x={xStart - 5} y={y + 14} textAnchor="end" fontSize="10" fill={GUIDE_SVG.inkFaint}>${m.low}</text>
            <text x={xStart + w + 5} y={y + 14} fontSize="10" fill={GUIDE_SVG.inkFaint}>${m.high}/ft</text>
          </g>
        );
      })}
    </svg>
  );
}

function TotalBySizeSVG() {
  const sizes = [
    { label: "Small yard (100 LF)", wood: "$2,500", vinyl: "$3,200", chain: "$1,700" },
    { label: "Medium yard (200 LF)", wood: "$5,000", vinyl: "$6,400", chain: "$3,400" },
    { label: "Large yard (350 LF)", wood: "$8,750", vinyl: "$11,200", chain: "$5,950" },
  ];
  const headerY = 65; const rowH = 30;
  return (
    <svg viewBox="0 0 680 180" width="100%" height="auto" role="img" aria-label="Total fence cost by yard size: medium 200 LF wood $5,000, vinyl $6,400, chain $3,400.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Total project cost by yard size</text>
      <rect x="40" y={headerY - 18} width="600" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{ l: "Yard", x: 140 }, { l: "Wood (PT)", x: 310 }, { l: "Vinyl", x: 440 }, { l: "Chain link", x: 560 }].map(h => (
        <text key={h.l} x={h.x} y={headerY - 2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {sizes.map((s, i) => { const y = headerY + 10 + i * rowH; return (
        <g key={s.label}>{i % 2 === 0 && <rect x="40" y={y - 4} width="600" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4" />}
          <text x="140" y={y + 14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{s.label}</text>
          <text x="310" y={y + 14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{s.wood}</text>
          <text x="440" y={y + 14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{s.vinyl}</text>
          <text x="560" y={y + 14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkFaint}>{s.chain}</text>
        </g>
      ); })}
    </svg>
  );
}

function LifetimeCostSVG() {
  const mats = [
    { label: "Pressure-treated", install: "$5,000", maint20yr: "$3,600", total: "$8,600" },
    { label: "Cedar", install: "$6,000", maint20yr: "$2,000", total: "$8,000" },
    { label: "Vinyl", install: "$6,400", maint20yr: "$0", total: "$6,400" },
    { label: "Aluminum", install: "$9,000", maint20yr: "$0", total: "$9,000" },
  ];
  const headerY = 65; const rowH = 28;
  return (
    <svg viewBox="0 0 680 210" width="100%" height="auto" role="img" aria-label="20-year cost: PT $8,600 total, cedar $8,000, vinyl $6,400, aluminum $9,000.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>20-year total cost of ownership (200 LF fence)</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Install + maintenance. PT needs staining every 2-3 years at $300-600 per application.</text>
      <rect x="40" y={headerY - 18} width="600" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{ l: "Material", x: 140 }, { l: "Install", x: 300 }, { l: "Maint. (20 yr)", x: 430 }, { l: "Total", x: 570 }].map(h => (
        <text key={h.l} x={h.x} y={headerY - 2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {mats.map((m, i) => { const y = headerY + 10 + i * rowH; return (
        <g key={m.label}>{i % 2 === 0 && <rect x="40" y={y - 4} width="600" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4" />}
          <text x="140" y={y + 14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{m.label}</text>
          <text x="300" y={y + 14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{m.install}</text>
          <text x="430" y={y + 14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{m.maint20yr}</text>
          <text x="570" y={y + 14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="700">{m.total}</text>
        </g>
      ); })}
    </svg>
  );
}

function DIYSavingsSVG() {
  return (
    <svg viewBox="0 0 680 130" width="100%" height="auto" role="img" aria-label="DIY fence saves $2,000-4,000 on a 200 LF fence. Biggest cost: post hole digging.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>DIY vs professional (200 LF wood privacy)</text>
      <rect x="60" y="50" width="240" height="60" rx="8" fill={GUIDE_SVG.accentSoft} stroke={GUIDE_SVG.accent} strokeWidth="1" />
      <text x="180" y="74" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.accent}>DIY</text>
      <text x="180" y="96" textAnchor="middle" fontSize="18" fontWeight="700" fill={GUIDE_SVG.ink}>$2,500–3,500</text>
      <rect x="380" y="50" width="240" height="60" rx="8" fill={GUIDE_SVG.slateSoft} stroke={GUIDE_SVG.slate} strokeWidth="1" />
      <text x="500" y="74" textAnchor="middle" fontSize="11" fontWeight="700" fill={GUIDE_SVG.slate}>PROFESSIONAL</text>
      <text x="500" y="96" textAnchor="middle" fontSize="18" fontWeight="700" fill={GUIDE_SVG.ink}>$4,500–7,000</text>
      <text x="340" y="128" textAnchor="middle" fontSize="9" fill={GUIDE_SVG.inkFaint} fontStyle="italic">DIY savings: $2,000–3,500. Requires power auger rental ($200/day) and 2-4 weekends.</text>
    </svg>
  );
}

export default function CostToBuildFence() {
  return (
    <article>
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-10">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            <Link href="/" className="text-accent hover:text-accent-hover transition-colors">Home</Link>
            <span className="mx-2">·</span><span>Cost guides</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">How much does it cost to build a fence?</h1>
          <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">A 200 linear foot wood privacy fence costs $4,500 to $7,000 installed. Vinyl runs $6,400. Chain link drops to $3,400. The per-foot price tells you which material fits your budget.</p>
        </div>
      </section>

      <section className="container-content py-10 md:py-14">
        <div className="guide-prose">
          <GuideByline updated="April 20, 2026" reviewedAgainst="AFA, HomeAdvisor, and regional fence contractor pricing databases" />

          <h2>Fence cost comes down to one number: price per linear foot</h2>

          <p>Forget total project estimates until you know the per-foot installed price for your material. That single number, multiplied by your fence length, gives you a ballpark within 15 percent of the final invoice. Everything else (gates, corners, terrain) adjusts the total, but the per-foot rate is the foundation of any fence budget.</p>

          <Figure number={1} caption="Chain link is the budget option at $10-25/ft. Pressure-treated wood privacy is the most common residential fence at $15-35/ft. Wrought iron tops out at $100/ft for ornamental work.">
            <PerFootSVG />
          </Figure>

          <MethodologyNote>
            <p>Pricing from HomeAdvisor, Angi, and Fixr project cost databases for 2025-2026. Per-foot costs include posts, rails, infill material, concrete for every post hole, one standard gate, and professional labor. Does not include survey, permit, or grading.</p>
          </MethodologyNote>

          <h2>Total project cost by yard size</h2>

          <Figure number={2} caption="Linear footage scales linearly. A typical suburban back yard runs 150 to 250 linear feet. Corner lots and large lots can exceed 400.">
            <TotalBySizeSVG />
          </Figure>

          <p>Measure your fence line before calling contractors. Walk the perimeter with a tape measure (or use Google Maps satellite view to estimate). The most common mistake is underestimating fence length. A 60 × 80 foot back yard with fencing on three sides (no fence along the house wall) is 200 linear feet, not the 100 feet many people guess.</p>

          <h2>The cheapest fence to install is the most expensive fence to own</h2>

          <Figure number={3} caption="Vinyl costs 28% more to install than pressure-treated wood but costs 25% less over 20 years because it needs zero maintenance. Cedar sits in the middle on both metrics.">
            <LifetimeCostSVG />
          </Figure>

          <p>Pressure-treated pine needs staining or sealing every 2 to 3 years. Each application costs $300 to $600 for a 200-foot fence (material plus a weekend of your time). Over 20 years, that adds $3,000 to $6,000 to the original install price. Cedar cuts the maintenance schedule in half (seal every 3 to 5 years, or skip sealing and let it gray naturally). Vinyl and aluminum eliminate maintenance entirely. The install premium pays for itself within 5 to 8 years in saved stain costs and weekends.</p>

          <h2>DIY saves $2,000 to $3,500</h2>

          <Figure number={4} caption="Materials for a 200 LF wood fence run $2,200-3,000. Professional labor adds $2,000-4,000. DIY is physically demanding but not technically difficult.">
            <DIYSavingsSVG />
          </Figure>

          <ComparisonTable
            columns={[{ title: "DIY" }, { title: "Professional" }]}
            rows={[
              { label: "Materials (200 LF wood)", values: ["$2,200–3,000", "$2,200–3,000"] },
              { label: "Power auger rental", values: ["$200/day", "Included"] },
              { label: "Concrete (26 posts)", values: ["$280", "Included"] },
              { label: "Labor", values: ["$0 (2–4 weekends)", "$2,000–4,000"] },
              { label: "Permit (if required)", values: ["$100–300", "$100–300"] },
              { label: "Total", values: [<strong key="d">$2,780–3,780</strong>, <strong key="p">$4,500–7,300</strong>] },
            ]}
            caption="The power auger is the critical rental. Digging 26 post holes by hand takes two full days. The auger does it in 3-4 hours."
          />

          <Scenario location="Austin, TX">
            A homeowner fenced a 220 LF back yard with 6-foot pressure-treated privacy panels. Two bids came in at $5,200 and $6,800. He did it himself: $2,800 in materials (boards, posts, concrete, hardware), $200 for a one-day power auger rental, and three weekends of work. Total: $3,000. He saved $2,200 compared to the lower bid. The hardest part was not the digging or building; it was keeping the fence line straight across 220 feet of uneven ground. A string line between corner posts solved this.
          </Scenario>

          <Callout label="Survey before you build">A property survey ($300-500) confirms where your boundary is. Most codes require fences to sit 2-6 inches inside the property line. Building on the wrong side means the fence legally belongs to your neighbor. The survey costs less than one section of fence and prevents the most expensive fence mistake there is.</Callout>

          <p>For exact material quantities, use the <Link href="/fence-calculator" className="text-accent hover:underline">fence calculator</Link>. For a full material list with quote comparison, try the <Link href="/planner/install-a-fence" className="text-accent hover:underline">fence project planner</Link>.</p>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "How much does it cost to build a fence? (2026 prices)",
        datePublished: "2026-04-12", dateModified: "2026-04-20",
        author: { "@type": "Person", name: "Ash K.", url: "https://www.tallyard.com/about" },
        publisher: { "@type": "Organization", name: "Tallyard", url: "https://www.tallyard.com" },
        mainEntityOfPage: "https://www.tallyard.com/cost-to-build-a-fence",
      }) }} />
    </article>
  );
}
