import type { Metadata } from "next";
import { BannerHeadline } from "@/components/BannerHeadline";
import PatioPlannerClient from "./PatioPlanner";

export const metadata: Metadata = {
  title: "Build a patio — complete material planner",
  description: "Plan a paver patio: pavers, gravel base, bedding sand, edge restraint, and joint sand. Full material list with cost estimates.",
  alternates: { canonical: "/planner/build-a-patio" },
};

export default function PatioPlannerPage() {
  return (
    <>
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-10">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            <a href="/planner" className="text-accent hover:text-accent-hover transition-colors">Planner</a>
            <span className="mx-2">·</span><span>Patio</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">
            <BannerHeadline text="Plan your patio." />
          </h1>
          <p className="text-base md:text-lg text-ink-muted max-w-xl leading-relaxed">
            Enter patio dimensions and paver choice. Get pavers, gravel base, sand, and edge materials with cost estimates.
          </p>
        </div>
      </section>
      <section className="container-wide py-10 md:py-12"><PatioPlannerClient /></section>
    </>
  );
}
