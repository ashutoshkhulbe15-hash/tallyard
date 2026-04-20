import type { Metadata } from "next";
import Link from "next/link";
import { BannerHeadline } from "@/components/BannerHeadline";
import FencePlannerClient from "./FencePlanner";

export const metadata: Metadata = {
  title: "Install a fence — complete material planner",
  description: "Plan your fence project: posts, rails, pickets, concrete footings, and gates. One form, full material list, quote comparison.",
  alternates: { canonical: "/planner/install-a-fence" },
};

export default function FencePlannerPage() {
  return (
    <>
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-10">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            <a href="/planner" className="text-accent hover:text-accent-hover transition-colors">Planner</a>
            <span className="mx-2">·</span><span>Fence</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">
            <BannerHeadline text="Plan your fence." />
          </h1>
          <p className="text-base md:text-lg text-ink-muted max-w-xl leading-relaxed">
            Enter your fence length and material. Get posts, rails, pickets, concrete, and gate hardware with cost estimates.
          </p>
        </div>
      </section>

      <section className="container-wide py-10 md:py-12"><FencePlannerClient /></section>

      <section className="container-content pb-16">
        <div className="pt-10 border-t border-line">
          <div className="guide-prose">
            <h2>Building a fence from survey to stain</h2>

            <h3>Before you buy anything: the property line</h3>
            <p>The most expensive fence mistake has nothing to do with materials. It is building on the wrong side of the property line. Most municipalities require fences to sit 2 to 6 inches inside your property boundary. A fence on the wrong side belongs to your neighbor, legally. If you are unsure where the line is, hire a surveyor ($300 to $500). That cost is trivial compared to tearing out a finished fence.</p>

            <h3>Permits and height limits</h3>
            <p>Many jurisdictions require a building permit for fences over 4 feet tall. Back yards typically allow 6 feet; front yards are usually limited to 4 feet or less. HOAs add another layer of rules on materials, colors, and sometimes even which direction the finished side faces. Call your building department and check your HOA covenants before ordering materials. Both calls take five minutes and save thousands in potential rework.</p>

            <h3>Order of operations</h3>
            <p>A fence project has four phases. First, mark the layout with stakes and string. Run the string from corner to corner and mark post locations at your chosen spacing (8 feet is standard for wood and vinyl). Second, dig post holes. Hole depth depends on your frost line: 18 to 24 inches in the South, 36 to 48 inches in the North. A power auger rental ($200/day) is worth every penny if you have more than 10 holes. Third, set posts in concrete. Plumb each post with a level, brace it, and pour concrete around it. Let the concrete cure 24 to 48 hours before attaching rails. Fourth, attach rails and infill. Two horizontal rails for 4-foot fences, three for 6-foot. Then pickets, panels, or mesh depending on your material.</p>

            <h3>Timeline</h3>
            <p>DIY with a helper: 2 to 4 weekends for a 200-foot fence, depending on soil conditions. Rocky or clay soil can double the post-hole phase. Professional crews finish the same fence in 2 to 3 days. The permit wait (if required) adds 1 to 2 weeks regardless.</p>

            <h3>Tools for DIY</h3>
            <p>Post hole digger or power auger, 4-foot level, string line, speed square, circular saw, drill/driver, wheelbarrow for mixing concrete, rubber mallet, and a tape measure. If you are cutting fence boards to length, a miter saw speeds things up but a circular saw works fine.</p>

            <h3>Common mistakes this planner helps you avoid</h3>
            <p>Buying too few posts (forgetting corners and gates each add extra posts), underestimating concrete (every post needs 1 to 2 bags depending on hole depth), and not accounting for gate hardware. The planner calculates all of these from your linear footage, post spacing, and gate count.</p>

            <p>For individual component calculations, use the <Link href="/fence-calculator" className="text-accent hover:underline">fence calculator</Link> or <Link href="/concrete-calculator" className="text-accent hover:underline">concrete calculator</Link>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
