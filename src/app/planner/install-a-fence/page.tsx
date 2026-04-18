import type { Metadata } from "next";
import { BannerHeadline } from "@/components/BannerHeadline";
import FencePlannerClient from "./FencePlanner";

export const metadata: Metadata = {
  title: "Install a fence — complete material planner",
  description: "Plan your fence project: posts, rails, pickets, concrete footings, and gates. One form, full material list, quote comparison.",
  alternates: { canonical: "/planner/install-a-fence" },
  openGraph: { title: "Install a fence — complete material planner", url: "https://www.tallyard.com/planner/install-a-fence", type: "website" },
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
            Enter your fence length and material. Get posts, rails, pickets, concrete, and gate hardware — then compare against a contractor quote.
          </p>
        </div>
      </section>
      <section className="container-wide py-10 md:py-12"><FencePlannerClient /></section>
    </>
  );
}
