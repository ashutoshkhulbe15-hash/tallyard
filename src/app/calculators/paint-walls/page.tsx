import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Paint, wallpaper, and drywall calculators — Tallyard",
  description:
    "Everything you need to estimate wall projects: paint gallons, wallpaper rolls, and drywall sheets. Free calculators with material lists and cost estimates.",
  alternates: { canonical: "/calculators/paint-walls" },
};

const tools = [
  { slug: "paint-calculator", name: "Paint calculator", desc: "Gallons of paint by room size, coat count, and sheen. Accounts for doors and windows." },
  { slug: "wallpaper-calculator", name: "Wallpaper calculator", desc: "Rolls needed by wall dimensions and pattern repeat. Handles standard and euro rolls." },
  { slug: "drywall-calculator", name: "Drywall calculator", desc: "Sheets, mud, tape, screws, and corner bead. Picks thickness by wall type (standard, ceiling, fire-rated)." },
];

export default function PaintWallsPillar() {
  return (
    <article>
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-10">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            <Link href="/calculators" className="text-accent hover:text-accent-hover transition-colors">Calculators</Link>
            <span className="mx-2">·</span><span>Paint + walls</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">
            Paint, wallpaper, and drywall
          </h1>
          <p className="text-base md:text-lg text-ink-muted max-w-2xl leading-relaxed">
            Three tools that cover every wall surface in a house. Whether you are painting a bedroom, papering an accent wall, or hanging drywall in a basement finish, start here.
          </p>
        </div>
      </section>

      {/* Tool cards */}
      <section className="container-wide py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {tools.map((t) => (
            <Link key={t.slug} href={`/${t.slug}`} className="block bg-surface border border-line rounded-lg p-6 hover:border-accent transition-colors group">
              <h2 className="text-lg font-bold text-ink group-hover:text-accent transition-colors mb-2">{t.name}</h2>
              <p className="text-sm text-ink-muted leading-relaxed">{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Pillar content */}
      <section className="container-content pb-16">
        <div className="guide-prose">
          <h2>Wall projects share one problem: surface area math</h2>

          <p>Every wall project starts with the same measurement. Walk the room perimeter, multiply by wall height, subtract doors and windows. That number — gross wall area minus openings — drives paint gallons, wallpaper rolls, and drywall sheets. The formulas diverge from there because each material has its own coverage rate and waste factor, but the starting measurement is identical. If you measure once and measure accurately, the calculators above do the rest.</p>

          <p>The three materials interact more than most people realize. New drywall needs primer before paint (bare paper absorbs finish coats unevenly, leaving visible seams). Wallpaper goes over painted walls, not bare drywall (the paste bonds poorly to paper face and tears it during removal). And removing old wallpaper often damages the drywall surface underneath, requiring skim-coating before repainting. Understanding the sequence saves a trip to the store mid-project.</p>

          <h2>Paint: the most common home improvement project in America</h2>

          <p>More homeowners paint a room in any given year than do any other home improvement project. The reason is practical: paint changes a room for $100 to $300 in materials and a Saturday afternoon. No permits, no contractors, no structural risk. The most common mistake is buying the wrong amount. One gallon covers 350 to 400 square feet with one coat. A 12 × 14 room with 8-foot ceilings has about 350 square feet of wall after subtracting a door and two windows. That is one gallon per coat, two gallons for two coats.</p>

          <p>Where people get in trouble is color changes. Going from dark to light (or light to dark) requires primer plus two topcoats, tripling the paint needed compared to a same-color refresh. The <Link href="/paint-calculator" className="text-accent hover:underline">paint calculator</Link> accounts for this by letting you specify coat count and primer separately.</p>

          <h3>Sheen selection by room</h3>
          <p>Flat (matte) hides wall imperfections but marks easily. Use it on ceilings and low-traffic rooms. Eggshell and satin are the default for living rooms and bedrooms: washable, with a soft luster that does not show every roller mark. Semi-gloss is for kitchens, bathrooms, and trim — it resists moisture and cleans easily but highlights every bump and imperfection on the wall surface. If your walls are not smooth, skip semi-gloss on the walls and use it only on trim.</p>

          <h2>Wallpaper: pattern repeat is the hidden cost</h2>

          <p>Wallpaper seems straightforward: measure the wall, buy that many square feet of paper. But pattern repeat changes the math significantly. A wallpaper with a 24-inch pattern repeat means every strip must be aligned vertically with the one next to it. To align the pattern, you waste the length of one repeat at the top of every other strip. On a 10-foot wall with a 24-inch repeat, that is 2 feet of waste per alternating strip — about 10 to 15 percent more paper than the raw wall area suggests.</p>

          <p>The <Link href="/wallpaper-calculator" className="text-accent hover:underline">wallpaper calculator</Link> handles this by asking for the repeat distance and calculating actual strips needed. It also accounts for the difference between standard US rolls (27 inches wide, 27 square feet per roll) and euro rolls (20.5 inches wide, 56 square feet per double roll).</p>

          <h2>Drywall: the sheets are cheap, the finishing is not</h2>

          <p>A 4×8 sheet of half-inch drywall costs $10 to $15. Hanging it takes 10 minutes with a drill and drywall screws. The expensive part is what comes after: three coats of joint compound (mud), paper tape on every seam, corner bead on every outside corner, and 3 to 5 days of drying and sanding between coats. The finishing supplies (mud, tape, screws, corner bead) often cost as much as the sheets themselves, and the labor is where professionals earn their money.</p>

          <p>A common strategy for DIYers is to hang the drywall themselves and hire a professional finisher for the taping and mudding. Hanging is physical labor (sheets are heavy) but not skill-dependent. Finishing is a learned skill that takes years to master — an experienced finisher produces invisible joints in one pass that take a beginner three passes and twice the sanding. The <Link href="/drywall-calculator" className="text-accent hover:underline">drywall calculator</Link> estimates both sheets and finishing supplies so you can price the full project.</p>

          <h3>Which thickness to use</h3>
          <p>Half-inch (1/2") for standard walls. Five-eighths (5/8") for ceilings (sag-resistant) and for any wall between a garage and living space (fire-rated Type X, required by code). Quarter-inch (1/4") only for resurfacing over damaged plaster or for bending around curves. If you are doing a basement finish, check your local code — some jurisdictions require 5/8" Type X on all basement walls, not just garage-adjacent ones.</p>

          <h2>Project sequencing: what goes first</h2>

          <p>In a room renovation that involves multiple wall surfaces, the order matters. Drywall goes up first (it is the structural surface). Priming and painting come after the drywall is finished (taped, mudded, and sanded). Wallpaper goes last, over painted walls, on accent walls or feature walls. If you are doing a full room renovation, this sequence prevents rework.</p>

          <p>For rooms where you are doing walls and ceilings, paint the ceiling before the walls. Ceiling paint drips. If you paint the walls first, you will spend an hour touching up drips on freshly painted walls. Paint the ceiling, let it dry, tape the ceiling line, then paint the walls. The tape protects the finished ceiling edge from wall-color splatters.</p>

          <h2>Common pitfalls across all wall projects</h2>

          <p>Not subtracting doors and windows. A standard interior door is about 20 square feet. A standard window is 12 to 15 square feet. In a room with two windows and a door, that is 45 to 50 square feet you do not need to cover. On a 350 square foot room, that is 15 percent less material. The calculators subtract openings automatically, but if you are estimating manually, do not forget them.</p>

          <p>Not accounting for the second coat. Two coats of paint is standard on any color change. Two coats of primer on bare drywall. Wallpaper is one layer but needs sizing adhesive underneath (one additional product). Drywall mud is three coats minimum. Every wall project involves at least two applications of something. Budget accordingly.</p>

          <h2>Related tools</h2>

          <p>For trim and baseboard calculations, the <Link href="/lumber-calculator" className="text-accent hover:underline">lumber calculator</Link> handles linear footage. For the flooring that meets the wall, the <Link href="/flooring-calculator" className="text-accent hover:underline">flooring calculator</Link> picks up where the wall calculators leave off. If your wall project involves <Link href="/insulation-calculator" className="text-accent hover:underline">insulation</Link> behind the drywall, calculate insulation first since it goes in before the sheets.</p>
        </div>
      </section>
    </article>
  );
}
