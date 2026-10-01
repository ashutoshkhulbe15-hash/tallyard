import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Landscaping, deck, and fence calculators: Tallyard", description: "Calculators for deck, fence, paver, mulch, gravel, sod, topsoil, pool, and rainwater. Free tools for outdoor projects.", alternates: { canonical: "/calculators/landscaping" } };
const tools = [
  { slug: "deck-calculator", name: "Deck calculator", desc: "Decking, joists, posts, and footings by size and material." },
  { slug: "fence-calculator", name: "Fence calculator", desc: "Posts, rails, pickets, and concrete by linear footage." },
  { slug: "paver-calculator", name: "Paver calculator", desc: "Estimate paver count from area, nominal face size, and selected allowance." },
  { slug: "mulch-calculator", name: "Mulch calculator", desc: "Estimate volume and nominal bag count from area and selected depth." },
  { slug: "gravel-calculator", name: "Gravel calculator", desc: "Estimate aggregate volume and approximate weight from area and depth." },
  { slug: "topsoil-calculator", name: "Topsoil calculator", desc: "Estimate soil volume and optional bag count from area and selected depth." },
  { slug: "sod-calculator", name: "Sod calculator", desc: "Estimate area and piece count using a selected example package format." },
  { slug: "pool-chlorine-calculator", name: "Pool chlorine mass estimator", desc: "Theoretical mass from measured values and user-entered label strength; not a dosing recommendation." },
  { slug: "rainwater-calculator", name: "Rainfall runoff estimator", desc: "Estimate event runoff volume from area and rainfall; does not size storage." },
];
export default function LandscapingPillar() { return (<article>
  <section className="container-wide pt-6 md:pt-8"><div className="pt-2 pb-8 md:pb-10 border-b border-line">
    <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5"><Link href="/calculators" className="text-accent hover:text-accent-hover transition-colors">Calculators</Link><span className="mx-2">·</span><span>Landscaping</span></nav>
    <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">Landscaping, deck, and outdoor</h1>
    <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">Nine tools for everything outside the four walls. Decks, fences, patios, lawn, garden beds, pool maintenance, and rainwater.</p>
  </div></section>
  <section className="container-wide py-10"><div className="grid grid-cols-1 md:grid-cols-3 gap-5">{tools.map((t) => (<Link key={t.slug} href={`/${t.slug}`} className="block bg-surface border border-line rounded-lg p-6 hover:border-accent transition-colors group"><h2 className="text-base font-bold text-ink group-hover:text-accent transition-colors mb-2">{t.name}</h2><p className="text-sm text-ink-muted leading-relaxed">{t.desc}</p></Link>))}</div></section>
  <section className="container-content pb-16"><div className="guide-prose">
    <h2>Outdoor projects have one variable indoor projects do not: weather</h2>
    <p>Outdoor material quantities depend on site conditions, product specifications, and layout. These calculators provide limited planning estimates from the inputs shown; they do not account for every weather, soil, installation, or compaction factor. Confirm product requirements and quantities with a qualified contractor or supplier before ordering.</p>
    <h2>Hardscape: deck, fence, and patio</h2>
    <p>Decks, fences, and patios need different support details. Footing depth, post installation, and edge restraint depend on the design, soil, climate, and local rules; do not apply one frost-depth rule to all three. Have a qualified contractor verify structural details and contact 811 before digging.</p>
    <p>The <Link href="/deck-calculator" className="text-accent hover:underline">deck calculator</Link> estimates deck surface area and a rough surface-board quantity; it does not design framing. The <Link href="/fence-calculator" className="text-accent hover:underline">fence calculator</Link> provides a straight-run takeoff, not a complete layout or structural design. The <Link href="/paver-calculator" className="text-accent hover:underline">paver calculator</Link> estimates count from rectangular area and nominal paver face dimensions; it does not estimate base, bedding, or jointing materials. Verify structural and installation details against the project design and local requirements.</p>
    <p>For a checklist of project costs to compare in written bids, see the dedicated guides: <Link href="/cost-to-build-a-deck" className="text-accent hover:underline">cost to build a deck</Link> and <Link href="/cost-to-build-a-fence" className="text-accent hover:underline">cost to build a fence</Link>.</p>
    <h2>Softscape: mulch, topsoil, sod, and gravel</h2>
    <p>For a rectangular area, volume is area multiplied by depth after converting both to consistent units. Actual material density, settling, coverage, and packaging vary by product, so check supplier specifications before ordering.</p>
    <p>The <Link href="/mulch-calculator" className="text-accent hover:underline">mulch calculator</Link> estimates volume and a nominal bag count from entered area and selected depth. The <Link href="/gravel-calculator" className="text-accent hover:underline">gravel calculator</Link> estimates volume and approximate weight using its stated density assumption; supplier material and moisture can change actual weight.</p>
    <p>The <Link href="/topsoil-calculator" className="text-accent hover:underline">topsoil calculator</Link> estimates soil volume and optional bag count from entered area, depth, and package volume. The <Link href="/sod-calculator" className="text-accent hover:underline">sod calculator</Link> estimates area and pieces for an example package format; verify available piece dimensions and coverage with the supplier. Neither tool recommends a material grade, installation depth, or pallet quantity.</p>
    <p>For projects that combine multiple materials, ask local suppliers whether they can provide the products and delivery arrangement you need. Availability, minimum quantities, and delivery fees vary.</p>
    <h2>Water: pool maintenance and rainwater collection</h2>
    <p>The <Link href="/pool-chlorine-calculator" className="text-accent hover:underline">pool chlorine mass estimator</Link> performs a theoretical mass-balance calculation from water volume, measured free chlorine, a user-entered target, and an available-chlorine fraction by weight taken from the product label. It does not select a target, identify a treatment, diagnose water, or provide application directions. Follow the exact product label and current health guidance; chlorine targets depend on pool conditions, including stabilizer use. See <a href="https://www.cdc.gov/healthy-swimming/about/home-pool-and-hot-tub-water-treatment-and-testing.html" className="text-accent hover:underline" target="_blank" rel="noreferrer">CDC residential pool testing guidance</a>.</p>
    <p>The <Link href="/rainwater-calculator" className="text-accent hover:underline">rainfall runoff estimator</Link> estimates event volume from horizontal catchment area, rainfall depth, and a user-selected capture factor. It does not predict annual yield, tank size, water demand, or potability; use location-specific rainfall data and qualified guidance for system planning.</p>
    <h2>Buying guides</h2>
    <p>For deck material selection, read the <Link href="/guides/composite-vs-pressure-treated-vs-cedar-deck" className="text-accent hover:underline">deck materials buying guide</Link> to compare exact products, maintenance instructions, warranties, and complete local project quotes.</p>
  </div></section>
</article>); }
