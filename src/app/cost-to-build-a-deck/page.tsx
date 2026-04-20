import type { Metadata } from "next";
import Link from "next/link";
import { Figure, GuideByline, MethodologyNote, Scenario, GUIDE_SVG } from "@/components/GuideChrome";
import { ComparisonTable, Callout } from "@/components/GuideComponents";

export const metadata: Metadata = {
  title: "How much does it cost to build a deck? (2026 prices)",
  description:
    "Deck costs range from $25 to $80 per square foot installed. A 320 ft² pressure-treated deck runs $8,000-16,000. Composite doubles the surface cost. Full breakdown with DIY savings.",
  alternates: { canonical: "/cost-to-build-a-deck" },
  openGraph: {
    title: "How much does it cost to build a deck? (2026)",
    description: "Full cost breakdown: materials, labor, permits, and the hidden costs most estimates miss.",
    url: "https://www.tallyard.com/cost-to-build-a-deck",
    type: "article",
  },
};

function CostByMaterialSVG() {
  const mats = [
    { label: "Pressure-treated pine", low: 25, high: 50, color: GUIDE_SVG.slate },
    { label: "Cedar", low: 30, high: 55, color: "#8B6B3D" },
    { label: "Composite (Trex, TimberTech)", low: 40, high: 80, color: GUIDE_SVG.accent },
    { label: "Tropical hardwood (ipe)", low: 55, high: 100, color: GUIDE_SVG.inkMuted },
  ];
  return (
    <svg viewBox="0 0 680 200" width="100%" height="auto" role="img" aria-label="Deck cost per square foot installed: pressure-treated $25-50, composite $40-80, ipe $55-100.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Installed cost per square foot by material (2026)</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Includes frame, decking surface, stairs, railing, footings, and labor</text>
      {mats.map((m, i) => {
        const y = 65 + i * 32;
        const xStart = 230 + m.low * 2.5;
        const w = (m.high - m.low) * 2.5;
        return (
          <g key={m.label}>
            <text x="220" y={y + 14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{m.label}</text>
            <rect x={xStart} y={y} width={w} height="20" rx="3" fill={m.color} opacity="0.6" />
            <text x={xStart - 5} y={y + 14} textAnchor="end" fontSize="10" fill={GUIDE_SVG.inkFaint}>${m.low}</text>
            <text x={xStart + w + 5} y={y + 14} fontSize="10" fill={GUIDE_SVG.inkFaint}>${m.high}/ft²</text>
          </g>
        );
      })}
    </svg>
  );
}

function BudgetBreakdownSVG() {
  const items = [
    { label: "Decking boards", pct: 30, color: GUIDE_SVG.accent },
    { label: "Frame lumber (joists, beams, ledger)", pct: 20, color: GUIDE_SVG.inkMuted },
    { label: "Concrete footings + posts", pct: 8, color: GUIDE_SVG.slate },
    { label: "Fasteners + hardware", pct: 7, color: GUIDE_SVG.inkFaint },
    { label: "Stairs + railing", pct: 10, color: "#8B6B3D" },
    { label: "Labor", pct: 25, color: GUIDE_SVG.walnut },
  ];
  let cumX = 40;
  return (
    <svg viewBox="0 0 680 150" width="100%" height="auto" role="img" aria-label="Deck budget breakdown: decking 30%, frame 20%, labor 25%, stairs/railing 10%.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Where your money goes on a professionally built deck</text>
      {items.map((item) => {
        const w = item.pct * 5.8;
        const x = cumX;
        cumX += w + 2;
        return (
          <g key={item.label}>
            <rect x={x} y="50" width={w} height="40" rx="3" fill={item.color} opacity="0.65" />
            <text x={x + w / 2} y="105" textAnchor="middle" fontSize="10" fontWeight="600" fill={GUIDE_SVG.ink}>{item.pct}%</text>
            <text x={x + w / 2} y="120" textAnchor="middle" fontSize="8" fill={GUIDE_SVG.inkFaint}>{item.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

function SizeCostSVG() {
  const sizes = [
    { size: "10×10 (100 ft²)", pt: "$2,500–5,000", comp: "$4,000–8,000" },
    { size: "12×16 (192 ft²)", pt: "$5,000–9,600", comp: "$7,700–15,400" },
    { size: "16×20 (320 ft²)", pt: "$8,000–16,000", comp: "$12,800–25,600" },
    { size: "20×24 (480 ft²)", pt: "$12,000–24,000", comp: "$19,200–38,400" },
  ];
  const headerY = 65; const rowH = 28;
  return (
    <svg viewBox="0 0 680 210" width="100%" height="auto" role="img" aria-label="Total deck cost by size: 10x10 from $2,500, 20x24 up to $38,400.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Total installed cost by deck size</text>
      <rect x="40" y={headerY - 18} width="600" height="26" rx="4" fill={GUIDE_SVG.bgWarm} />
      {[{ l: "Deck size", x: 140 }, { l: "Pressure-treated", x: 340 }, { l: "Composite", x: 520 }].map(h => (
        <text key={h.l} x={h.x} y={headerY - 2} textAnchor="middle" fontSize="10" fontWeight="700" fill={GUIDE_SVG.inkMuted}>{h.l}</text>
      ))}
      {sizes.map((s, i) => { const y = headerY + 10 + i * rowH; return (
        <g key={s.size}>{i % 2 === 0 && <rect x="40" y={y - 4} width="600" height={rowH} fill={GUIDE_SVG.bgWarm} opacity="0.4" />}
          <text x="140" y={y + 14} textAnchor="middle" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{s.size}</text>
          <text x="340" y={y + 14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.inkMuted}>{s.pt}</text>
          <text x="520" y={y + 14} textAnchor="middle" fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{s.comp}</text>
        </g>
      ); })}
    </svg>
  );
}

function RegionalSVG() {
  const regions = [
    { region: "South / Southeast", mult: "0.85×", note: "Lower labor rates" },
    { region: "Midwest", mult: "1.0×", note: "National average" },
    { region: "Northeast", mult: "1.3×", note: "Higher labor + permits" },
    { region: "West Coast", mult: "1.4×", note: "Highest labor + seismic code" },
  ];
  return (
    <svg viewBox="0 0 680 180" width="100%" height="auto" role="img" aria-label="Regional cost multipliers: South 0.85x, Midwest 1.0x, Northeast 1.3x, West Coast 1.4x.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Regional cost multipliers</text>
      <text x="20" y="43" fontSize="10" fill={GUIDE_SVG.inkFaint}>Multiply the base cost by your region&apos;s factor. A $10,000 Midwest deck costs ~$14,000 in Seattle.</text>
      {regions.map((r, i) => {
        const y = 65 + i * 28;
        const w = parseFloat(r.mult) * 200;
        return (
          <g key={r.region}>
            <text x="165" y={y + 14} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{r.region}</text>
            <rect x="175" y={y} width={w} height="18" rx="3" fill={i >= 2 ? GUIDE_SVG.accent : GUIDE_SVG.slate} opacity="0.6" />
            <text x={183 + w} y={y + 13} fontSize="11" fontWeight="700" fill={GUIDE_SVG.ink}>{r.mult}</text>
            <text x={183 + w + 35} y={y + 13} fontSize="9" fill={GUIDE_SVG.inkFaint}>{r.note}</text>
          </g>
        );
      })}
    </svg>
  );
}

function HiddenCostsSVG() {
  const costs = [
    { item: "Building permit", range: "$100–500", note: "Required for most attached decks" },
    { item: "Deck stain/seal (wood only)", range: "$200–600", note: "Needed within 6 months of build" },
    { item: "Demolition of old deck", range: "$500–1,500", note: "If replacing existing structure" },
    { item: "Grading / drainage", range: "$300–1,000", note: "If ground slopes toward house" },
    { item: "Electrical (outlet, lighting)", range: "$400–1,200", note: "Optional but common request" },
  ];
  return (
    <svg viewBox="0 0 680 220" width="100%" height="auto" role="img" aria-label="Hidden deck costs: permit $100-500, stain $200-600, demo $500-1,500, grading $300-1,000.">
      <text x="20" y="26" fontSize="13" fontWeight="600" fill={GUIDE_SVG.ink}>Costs most online estimates leave out</text>
      {costs.map((c, i) => {
        const y = 55 + i * 32;
        return (
          <g key={c.item}>
            <text x="200" y={y + 6} textAnchor="end" fontSize="11" fontWeight="600" fill={GUIDE_SVG.ink}>{c.item}</text>
            <text x="210" y={y + 6} fontSize="11" fill={GUIDE_SVG.accent} fontWeight="600">{c.range}</text>
            <text x="210" y={y + 22} fontSize="9" fill={GUIDE_SVG.inkFaint}>{c.note}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function CostToBuildDeck() {
  return (
    <article>
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-10">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            <Link href="/" className="text-accent hover:text-accent-hover transition-colors">Home</Link>
            <span className="mx-2">·</span><span>Cost guides</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">
            How much does it cost to build a deck?
          </h1>
          <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">
            A 320 square foot pressure-treated deck costs $8,000 to $16,000 installed. Composite runs $12,800 to $25,600 for the same size. Here is where every dollar goes.
          </p>
        </div>
      </section>

      <section className="container-content py-10 md:py-14">
        <div className="guide-prose">
          <GuideByline
            updated="April 20, 2026"
            reviewedAgainst="HomeGuide, Angi, and NADRA contractor cost surveys"
          />

          <h2>The real number, not the range</h2>

          <p>Most deck cost articles give you a range so wide it is useless: "$15 to $80 per square foot." That 5× spread exists because they lump a ground-level platform made of pressure-treated pine with a second-story composite deck that has cable railing and a spiral staircase. Those are not the same project. Here is how to find your actual number.</p>

          <p>Start with the three things that determine 90 percent of the final price: deck size (square footage), material choice (pressure-treated, cedar, composite, or hardwood), and height above ground (ground-level needs short posts and no stairs; elevated needs tall posts, a full staircase, and sometimes an engineer-stamped plan). Everything else is a line-item detail.</p>

          <Figure number={1} caption="Pressure-treated is the budget baseline. Composite roughly doubles the surface cost but the frame underneath (always pressure-treated lumber regardless of surface material) stays the same price.">
            <CostByMaterialSVG />
          </Figure>

          <MethodologyNote>
            <p>
              Cost data aggregated from HomeGuide 2025-2026 contractor surveys, Angi project cost database, and NADRA (North American Deck and Railing Association) member pricing reports. Regional multipliers from RS Means residential cost data. All prices are fully installed including materials, labor, permits, and standard railing. Prices do not include demolition of existing structures.
            </p>
          </MethodologyNote>

          <h2>Where the money actually goes</h2>

          <Figure number={2} caption="The decking surface you walk on is about 30% of the total cost. The other 70% goes to the invisible structure, hardware, and labor. This is why composite decks are not 2× the price of wood decks — only the surface layer changes; the frame is the same.">
            <BudgetBreakdownSVG />
          </Figure>

          <p>The frame lumber (joists, beams, ledger board) is always pressure-treated regardless of your decking surface material. A composite deck has the same frame as a wood deck. The surface boards, fasteners, and railing change. The frame does not. This is why composite costs 1.6 to 2 times more than wood overall, not 2 to 3 times more: only the surface layer is more expensive.</p>

          <h2>Cost by deck size</h2>

          <Figure number={3} caption="Cost scales roughly linearly with area. A 320 ft² deck is not quite double the cost of a 192 ft² deck because mobilization, permits, and minimum stair costs are fixed.">
            <SizeCostSVG />
          </Figure>

          <p>The most popular residential deck size is 12 × 16 or 16 × 20. Smaller than 10 × 10 and the per-square-foot cost rises because fixed costs (permit, mobilization, minimum stair) are spread over less area. Larger than 20 × 24 and the per-square-foot cost drops slightly because framing becomes more efficient with longer spans. Use the <Link href="/deck-calculator" className="text-accent hover:underline">deck calculator</Link> to get an exact material list for your dimensions.</p>

          <h2>DIY vs professional: where the savings actually are</h2>

          <ComparisonTable
            columns={[{ title: "DIY" }, { title: "Professional" }]}
            rows={[
              { label: "Decking surface (320 ft²)", values: ["$1,400–3,000", "$1,400–3,000"] },
              { label: "Frame lumber", values: ["$800–1,200", "Included"] },
              { label: "Posts + concrete footings", values: ["$300–500", "Included"] },
              { label: "Fasteners + joist hangers", values: ["$200–350", "Included"] },
              { label: "Stairs + railing", values: ["$400–900", "Included"] },
              { label: "Permit", values: ["$100–500", "$100–500"] },
              { label: "Labor", values: ["$0 (3–5 weekends)", "$3,000–8,000"] },
              { label: "Total (16×20 PT)", values: [<strong key="d">$3,200–6,450</strong>, <strong key="p">$8,000–16,000</strong>] },
            ]}
            caption="DIY saves 50-60% but requires framing knowledge. The ledger board connection (where the deck attaches to the house) is the most safety-critical joint and the one most DIYers get wrong."
          />

          <Callout label="The ledger board is not optional">
            The ledger board connection is responsible for more deck collapses than any other single failure point. It must be lag-bolted (not nailed) into the rim joist of the house, with self-adhesive flashing behind it to prevent water infiltration. If you DIY everything else, consider hiring a contractor to install just the ledger. It takes 2 hours of professional time and prevents the catastrophic failure mode.
          </Callout>

          <h2>Regional pricing: the same deck costs 40% more in Seattle than in Atlanta</h2>

          <Figure number={4} caption="Labor rates are the primary driver of regional variation. Material costs vary less than 10% across regions, but labor varies 40% or more.">
            <RegionalSVG />
          </Figure>

          <Scenario location="Denver, CO">
            A homeowner got three bids for a 14 × 20 composite deck, 4 feet above grade with stairs and cable railing. Bid A: $18,500. Bid B: $22,000. Bid C: $16,200. The spread was $5,800 between highest and lowest. Bid C was from a one-man crew who subcontracted the railing. Bid B included architect-stamped plans (required in this jurisdiction for decks over 30 inches). Bid A was the sweet spot: licensed, insured, pulled the permit, and included a 2-year warranty on workmanship. Always get at least three bids and compare what is included, not just the bottom line.
          </Scenario>

          <h2>The costs most estimates leave out</h2>

          <Figure number={5} caption="Permits, staining, demolition, grading, and electrical are real costs that appear on the final invoice but rarely in online cost estimates.">
            <HiddenCostsSVG />
          </Figure>

          <p>If you are replacing an existing deck, demolition and disposal adds $500 to $1,500 depending on size and how the old deck was built. Decks screwed together come apart in a day. Decks nailed together with ring-shank nails take twice as long because every board fights you. If your yard slopes toward the house, grading the area under and around the deck to direct water away adds $300 to $1,000 but prevents the foundation moisture problems that eventually cost far more.</p>

          <h2>Financing and return on investment</h2>

          <p>A deck addition recoups 60 to 75 percent of its cost at resale according to Remodeling Magazine&apos;s Cost vs Value report. A $12,000 deck adds roughly $7,200 to $9,000 in home value. That makes it one of the better-returning exterior projects (behind only garage doors and manufactured stone veneer). It does not fully pay for itself, but it comes closer than a kitchen or bathroom remodel typically does.</p>

          <p>For exact material quantities, use the <Link href="/deck-calculator" className="text-accent hover:underline">deck calculator</Link>. For a complete material list with quote comparison, the <Link href="/planner/build-a-deck" className="text-accent hover:underline">deck project planner</Link> chains decking, frame, footings, and stairs into one tool. For material selection help, read the <Link href="/guides/composite-vs-pressure-treated-vs-cedar-deck" className="text-accent hover:underline">composite vs pressure-treated vs cedar buying guide</Link>.</p>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "How much does it cost to build a deck? (2026 prices)",
            description: "Deck costs range from $25 to $80/ft² installed. Full breakdown by material, size, region, and DIY vs professional.",
            datePublished: "2026-04-15",
            dateModified: "2026-04-20",
            author: { "@type": "Person", name: "Ash K.", url: "https://www.tallyard.com/about" },
            publisher: { "@type": "Organization", name: "Tallyard", url: "https://www.tallyard.com" },
            mainEntityOfPage: "https://www.tallyard.com/cost-to-build-a-deck",
          }),
        }}
      />
    </article>
  );
}
