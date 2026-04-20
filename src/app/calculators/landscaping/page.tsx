import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = { title: "Landscaping, deck, and fence calculators — Tallyard", description: "Calculators for deck, fence, paver, mulch, gravel, sod, topsoil, pool, and rainwater. Free tools for outdoor projects.", alternates: { canonical: "/calculators/landscaping" } };
const tools = [
  { slug: "deck-calculator", name: "Deck calculator", desc: "Decking, joists, posts, and footings by size and material." },
  { slug: "fence-calculator", name: "Fence calculator", desc: "Posts, rails, pickets, and concrete by linear footage." },
  { slug: "paver-calculator", name: "Paver calculator", desc: "Paver count, gravel base, sand, and edge restraint." },
  { slug: "mulch-calculator", name: "Mulch calculator", desc: "Cubic yards by area and depth. Bulk vs bag pricing." },
  { slug: "gravel-calculator", name: "Gravel calculator", desc: "Tons and cubic yards with compaction factor." },
  { slug: "topsoil-calculator", name: "Topsoil calculator", desc: "Cubic yards of screened or amended soil." },
  { slug: "sod-calculator", name: "Sod calculator", desc: "Pallets, rolls, or slabs by lawn area." },
  { slug: "pool-chlorine-calculator", name: "Pool chlorine calculator", desc: "Chlorine dose by pool volume and chemical type." },
  { slug: "rainwater-calculator", name: "Rainwater calculator", desc: "Collection capacity by roof area and rainfall." },
];
export default function LandscapingPillar() { return (<article>
  <section className="container-wide pt-6 md:pt-8"><div className="bg-bg-warm rounded-xl p-8 md:p-10">
    <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold"><Link href="/calculators" className="text-accent hover:text-accent-hover transition-colors">Calculators</Link><span className="mx-2">·</span><span>Landscaping</span></nav>
    <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">Landscaping, deck, and outdoor</h1>
    <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">Nine tools for everything outside the four walls. Decks, fences, patios, lawn, garden beds, pool maintenance, and rainwater.</p>
  </div></section>
  <section className="container-wide py-10"><div className="grid grid-cols-1 md:grid-cols-3 gap-5">{tools.map((t) => (<Link key={t.slug} href={`/${t.slug}`} className="block bg-surface border border-line rounded-lg p-6 hover:border-accent transition-colors group"><h2 className="text-base font-bold text-ink group-hover:text-accent transition-colors mb-2">{t.name}</h2><p className="text-sm text-ink-muted leading-relaxed">{t.desc}</p></Link>))}</div></section>
  <section className="container-content pb-16"><div className="guide-prose">
    <h2>Outdoor projects have one variable indoor projects do not: weather</h2>
    <p>Every outdoor calculator accounts for material exposure to rain, freeze-thaw, UV, and soil moisture. Fence posts in soil rot from the bottom. Mulch decomposes an inch per year. Gravel compacts 15 to 20 percent. These environmental factors are built into the waste and overage recommendations.</p>
    <h2>Hardscape: deck, fence, and patio</h2>
    <p>These three share a common foundation: concrete footings. The <Link href="/deck-calculator" className="text-accent hover:underline">deck</Link>, <Link href="/fence-calculator" className="text-accent hover:underline">fence</Link>, and <Link href="/paver-calculator" className="text-accent hover:underline">paver</Link> calculators each include footing estimates. All three have project planners that chain multiple calculations: <Link href="/planner/build-a-deck" className="text-accent hover:underline">deck planner</Link>, <Link href="/planner/install-a-fence" className="text-accent hover:underline">fence planner</Link>, and <Link href="/planner/build-a-patio" className="text-accent hover:underline">patio planner</Link>.</p>
    <h2>Softscape: mulch, topsoil, sod, and gravel</h2>
    <p>All four use the same volume formula: area × depth ÷ 324 = cubic yards. The difference is density, cost, and application depth. The calculators output in whichever unit your supplier quotes. For projects combining multiple materials, order from one landscape supply yard on the same delivery to save on fees.</p>
    <h2>Buying guides</h2>
    <p>For deck material selection, read the <Link href="/guides/composite-vs-pressure-treated-vs-cedar-deck" className="text-accent hover:underline">deck materials buying guide</Link> with 20-year total cost of ownership analysis.</p>
  </div></section>
</article>); }
