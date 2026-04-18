import type { Metadata } from "next";
import { BannerHeadline } from "@/components/BannerHeadline";
import BathroomPlannerClient from "./BathroomPlanner";

export const metadata: Metadata = {
  title: "Remodel a bathroom — complete material planner",
  description: "Plan a bathroom remodel: floor tile, shower tile, vanity, paint, and accessories. One form, complete material list with quote comparison.",
  alternates: { canonical: "/planner/remodel-a-bathroom" },
};

export default function BathroomPlannerPage() {
  return (
    <>
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-10">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            <a href="/planner" className="text-accent hover:text-accent-hover transition-colors">Planner</a>
            <span className="mx-2">·</span><span>Bathroom</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">
            <BannerHeadline text="Plan your bathroom remodel." />
          </h1>
          <p className="text-base md:text-lg text-ink-muted max-w-xl leading-relaxed">
            Enter room and shower dimensions. Get floor tile, shower tile, vanity, paint, and supplies with cost estimates.
          </p>
        </div>
      </section>
      <section className="container-wide py-10 md:py-12"><BathroomPlannerClient /></section>
    </>
  );
}
