import type { Metadata } from "next";
import Link from "next/link";
import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

export const metadata: Metadata = {
  title: "How much does it cost to replace a roof? (2026 prices)",
  description: "A new roof costs $7,000 to $15,000 for a standard 2,000 ft² home with architectural shingles. Full line-item breakdown with hidden costs most bids leave out.",
  alternates: { canonical: "/cost-to-replace-a-roof" },
};

function LineItemSVG() {
  const items = [
    { label: "Shingles", pct: 35, cost: "$2,800–5,250" },
    { label: "Tear-off + dumpster", pct: 15, cost: "$1,200–2,250" },
    { label: "Underlayment + ice shield", pct: 10, cost: "$800–1,500" },
    { label: "Flashing, drip edge, vents", pct: 10, cost: "$800–1,500" },
    { label: "Labor", pct: 30, cost: "$2,400–4,500" },
  ];
  let cumX = 40;
  return (
    <svg viewBox="0 0 680 150" width="100%" height="auto" role="img" aria-label="Roof cost breakdown: shingles 35%, tear-off 15%, underlayment 10%, accessories 10%, labor 30%.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Line-item breakdown for a 20-square roof</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Shingles are barely a third of the total. The rest is tear-off, accessories, and labor.</text>
      {items.map((item) => {
        const w = item.pct * 5.8;
        const x = cumX;
        cumX += w + 2;
        return (
          <g key={item.label}>
            <rect x={x} y="55" width={w} height="35" rx="3" fill={item.label === "Shingles" ? GUIDE_SVG.accent : GUIDE_SVG.slate} opacity="0.6" />
            <text x={x + w / 2} y="108" textAnchor="middle" fontSize="9" fontWeight="600" fill={GUIDE_SVG.ink}>{item.pct}% · {item.label}</text>
            <text x={x + w / 2} y="122" textAnchor="middle" fontSize="8" fill={GUIDE_SVG.inkFaint}>{item.cost}</text>
          </g>
        );
      })}
    </svg>
  );
}

function ShingleTierSVG() {
  const tiers = [
    { label: "3-tab (basic)", cost: "$90–120/sq", life: "15–20 yr", warranty: "25 yr limited" },
    { label: "Architectural (standard)", cost: "$120–180/sq", life: "25–30 yr", warranty: "Lifetime limited" },
    { label: "Designer (premium)", cost: "$200–400/sq", life: "30–50 yr", warranty: "Lifetime enhanced" },
  ];
  const headerY = 65; const rowH = 30;
  return (
    <svg viewBox="0 0 680 200" width="100%" height="auto" role="img" aria-label="Shingle tiers: 3-tab $90-120 per square, architectural $120-180, designer $200-400.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Asphalt shingle tiers</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>One square = 100 ft² of roof. A 2,000 ft² footprint with a 6/12 pitch needs about 24 squares.</text>
      <rect x="30" y={headerY - 18} width="620" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{ l: "Tier", x: 120 }, { l: "Cost/square", x: 290 }, { l: "Real lifespan", x: 430 }, { l: "Warranty", x: 575 }].map(h => (
        <text key={h.l} x={h.x} y={headerY - 2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {tiers.map((t, i) => { const y = headerY + 10 + i * rowH; return (
        <g key={t.label}>{i % 2 === 0 && <rect x="30" y={y - 4} width="620" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4" />}
          <text x="120" y={y + 14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{t.label}</text>
          <text x="290" y={y + 14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{t.cost}</text>
          <text x="430" y={y + 14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{t.life}</text>
          <text x="575" y={y + 14} textAnchor="middle" fontSize="10" fill={GUIDE_SVG.inkFaint}>{t.warranty}</text>
        </g>
      ); })}
    </svg>
  );
}

function PitchMultiplierSVG() {
  const pitches = [
    { pitch: "4/12 (low)", mult: "1.05×", w: 105 },
    { pitch: "6/12 (standard)", mult: "1.12×", w: 130 },
    { pitch: "8/12 (moderate)", mult: "1.20×", w: 160 },
    { pitch: "10/12 (steep)", mult: "1.30×", w: 200 },
    { pitch: "12/12 (very steep)", mult: "1.41×", w: 240 },
  ];
  return (
    <svg viewBox="0 0 680 220" width="100%" height="auto" role="img" aria-label="Pitch multiplier: 4/12 is 1.05x footprint, 12/12 is 1.41x.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Roof pitch multiplier (actual area vs footprint)</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Steeper roofs have more surface area to cover. A 12/12 pitch adds 41% more shingles than a flat roof.</text>
      {pitches.map((p, i) => {
        const y = 65 + i * 28;
        return (
          <g key={p.pitch}>
            <text x="175" y={y + 14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{p.pitch}</text>
            <rect x="185" y={y} width={p.w} height="18" rx="3" fill={i >= 3 ? GUIDE_SVG.accent : GUIDE_SVG.slate} opacity="0.6" />
            <text x={193 + p.w} y={y + 13} fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{p.mult}</text>
          </g>
        );
      })}
    </svg>
  );
}

function HiddenCostsSVG() {
  const costs = [
    { item: "Decking repair (rot/damage)", range: "$500–3,000", note: "Found during tear-off. Cannot be quoted in advance." },
    { item: "Code-required upgrades", range: "$200–800", note: "Ice shield, drip edge, or ventilation per current code" },
    { item: "Pipe boot replacement", range: "$50–150 each", note: "Old rubber boots crack. Replace all during re-roof." },
    { item: "Chimney flashing", range: "$300–800", note: "Step flashing and counter-flashing around masonry" },
    { item: "Skylight re-flash or replace", range: "$300–1,500 each", note: "Old skylights leak after re-roofing if not addressed" },
  ];
  return (
    <svg viewBox="0 0 680 220" width="100%" height="auto" role="img" aria-label="Hidden roof costs: deck repair, code upgrades, pipe boots, chimney flashing, skylights.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>What the bid might not include</text>
      {costs.map((c, i) => {
        const y = 55 + i * 32;
        return (
          <g key={c.item}>
            <text x="245" y={y + 6} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{c.item}</text>
            <text x="255" y={y + 6} fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{c.range}</text>
            <text x="255" y={y + 22} fontSize="9" fill={GUIDE_SVG.inkFaint}>{c.note}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function CostToReplaceRoof() {
  return (
    <article>
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-10">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            <Link href="/" className="text-accent hover:text-accent-hover transition-colors">Home</Link>
            <span className="mx-2">·</span><span>Cost guides</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">How much does it cost to replace a roof?</h1>
          <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">A 2,000 ft² home with architectural shingles costs $8,000 to $15,000. The shingles are barely a third of that. Here is where the rest goes.</p>
        </div>
      </section>

      <section className="container-content py-10 md:py-14">
        <div className="guide-prose">
          <GuideByline updated="April 20, 2026" reviewedAgainst="RS Means, HomeGuide, and regional roofing contractor associations" />

          <h2>What the bid does not show you</h2>

          <p>A roofing bid looks simple: "$450 per square, 22 squares, total $9,900." But that single line conceals a dozen decisions the contractor made about your roof that affect both cost and longevity. Which underlayment (15-lb felt at $15/roll or synthetic at $65/roll)? How far does the ice and water shield run (code minimum at the eaves, or up the valleys too)? Are they replacing pipe boots or leaving the old cracked rubber? Is the drip edge new or reused? Each answer changes the invoice by hundreds and the roof life by years.</p>

          <p>The first thing to ask any roofer for is an itemized bid. If they give you a per-square lump number, ask them to break it out. The breakdown tells you what you are actually getting.</p>

          <Figure number={1} caption="Shingles account for about 35% of a roof replacement. Labor is 30%. Tear-off, underlayment, and accessories are the remaining 35% that most homeowners overlook.">
            <LineItemSVG />
          </Figure>

          <MethodologyNote>
            <p>Cost data from RS Means 2026 residential roofing section, HomeGuide contractor surveys, and GAF/Owens Corning distributor pricing. Pitch multipliers from standard trigonometric roof area calculation. Shingle lifespan data from manufacturer warranty terms cross-referenced with ARMA (Asphalt Roofing Manufacturers Association) field performance studies.</p>
          </MethodologyNote>

          <h2>Shingle quality: the tier that changes the 20-year math</h2>

          <Figure number={2} caption="3-tab shingles save 25-40% up front but last half as long as architectural. Over 30 years, two 3-tab roofs cost more than one architectural roof.">
            <ShingleTierSVG />
          </Figure>

          <p>Architectural shingles are the default for residential re-roofing in 2026. They cost 30 to 50 percent more per square than 3-tab but last 25 to 30 years versus 15 to 20. The math over 30 years is straightforward. One architectural roof at $12,000 versus two 3-tab roofs at $9,000 each ($18,000 total). The cheaper shingle costs $6,000 more over the life of the house.</p>

          <h2>Pitch changes everything</h2>

          <Figure number={3} caption="Your roof has more surface area than your house footprint. A 6/12 pitch adds 12%. A 12/12 pitch adds 41%. The steeper the roof, the more material and labor you need.">
            <PitchMultiplierSVG />
          </Figure>

          <p>A 2,000 square foot house with a 6/12 pitch has about 2,240 square feet of actual roof surface — 22.4 squares. The same house with a 12/12 pitch has 2,820 square feet — 28.2 squares. That is 6 additional squares of shingles, underlayment, and labor. At $450 per square, pitch alone adds $2,700 to the project. The <Link href="/roofing-calculator" className="text-accent hover:underline">roofing calculator</Link> applies the correct multiplier for your pitch automatically.</p>

          <Callout label="Steep roofs cost more per square, too">Roofs above 8/12 pitch require scaffolding or roof jacks for worker safety. This adds $500 to $1,500 in access equipment rental and slows the crew down. Steep roofs also use more nails per shingle (6 instead of 4) per manufacturer wind warranty requirements. Both factors increase the per-square labor rate above the standard $100-150 range.</Callout>

          <h2>Hidden costs that appear after tear-off</h2>

          <Figure number={4} caption="Decking damage is the biggest surprise. You cannot see it until the old shingles come off. Good contractors include a per-sheet contingency in the bid.">
            <HiddenCostsSVG />
          </Figure>

          <Scenario location="Portland, OR">
            A homeowner got a bid for $11,200 to re-roof a 1,800 ft² ranch with architectural shingles. The bid included a $500 contingency for decking repair. During tear-off, the crew found 14 sheets of water-damaged OSB in a valley area where the old flashing had failed. Replacing those sheets cost $1,100 (14 sheets × $35/sheet + labor). The homeowner approved the overage. Without the contingency line in the original bid, this would have been a surprise change order. Always ask whether the bid includes a decking contingency, and if not, what the per-sheet rate will be.
          </Scenario>

          <ComparisonTable
            columns={[{ title: "Overlay (2nd layer)" }, { title: "Full tear-off + replace" }]}
            rows={[
              { label: "Cost", values: ["$4,000–8,000", "$7,000–15,000"] },
              { label: "Lifespan", values: ["10–15 yr (shorter)", "25–30 yr (full)"] },
              { label: "Inspection possible?", values: ["No (deck hidden)", "Yes (deck exposed)"] },
              { label: "Weight on structure", values: ["Double (two layers)", "Single layer"] },
              { label: "Code compliant?", values: ["Only if 1 existing layer", "Always"] },
            ]}
            caption="Overlay saves 40-50% but you cannot inspect the decking, the shingles last shorter, and you can only overlay once. Most roofers recommend full tear-off."
          />

          <h2>When to replace vs repair</h2>

          <p>Repair makes sense when damage is localized (a few missing shingles after a storm, a single leak around a pipe boot). Replace makes sense when the roof is within 5 years of its expected lifespan, when more than 30 percent of the surface shows granule loss or curling, or when multiple leaks suggest systemic failure. A repair on a 22-year-old architectural roof is borrowing time. The money is better spent toward replacement.</p>

          <p>For exact material quantities, use the <Link href="/roofing-calculator" className="text-accent hover:underline">roofing calculator</Link>. For a complete material list including ventilation and gutters, use the <Link href="/planner/replace-a-roof" className="text-accent hover:underline">roof replacement planner</Link>. For ventilation sizing during the re-roof, the <Link href="/attic-ventilation-calculator" className="text-accent hover:underline">attic ventilation calculator</Link> sizes ridge and soffit vents.</p>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: "How much does it cost to replace a roof? (2026 prices)",
        datePublished: "2026-04-14", dateModified: "2026-04-20",
        author: { "@type": "Person", name: "Ash K.", url: "https://www.tallyard.com/about" },
        publisher: { "@type": "Organization", name: "Tallyard", url: "https://www.tallyard.com" },
        mainEntityOfPage: "https://www.tallyard.com/cost-to-replace-a-roof",
      }) }} />
    </article>
  );
}
