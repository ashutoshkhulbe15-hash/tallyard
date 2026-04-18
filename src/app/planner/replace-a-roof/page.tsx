import type { Metadata } from "next";
import { BannerHeadline } from "@/components/BannerHeadline";
import RoofPlannerClient from "./RoofPlanner";

export const metadata: Metadata = {
  title: "Replace a roof — complete material planner",
  description: "Plan a full roof replacement: shingles, underlayment, ventilation, gutters, and tear-off. One form, complete material list with quote comparison.",
  alternates: { canonical: "/planner/replace-a-roof" },
};

export default function RoofPlannerPage() {
  return (
    <>
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-10">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            <a href="/planner" className="text-accent hover:text-accent-hover transition-colors">Planner</a>
            <span className="mx-2">·</span><span>Roof</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">
            <BannerHeadline text="Plan your roof replacement." />
          </h1>
          <p className="text-base md:text-lg text-ink-muted max-w-xl leading-relaxed">
            Enter your house footprint and pitch. Get shingles, underlayment, ventilation, gutters, and tear-off materials with cost estimates.
          </p>
        </div>
      </section>
      <section className="container-wide py-10 md:py-12"><RoofPlannerClient /></section>
    </>
  );
}
