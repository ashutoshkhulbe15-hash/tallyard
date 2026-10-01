import type { Metadata } from "next";
import Link from "next/link";
import { BannerHeadline } from "@/components/BannerHeadline";
import PatioPlannerClient from "./PatioPlanner";

export const metadata: Metadata = {
  title: "Paver Area and Count Planner",
  description: "Estimate rectangular paved area and paver count from nominal face dimensions and a selected planning allowance. No installation design or material takeoff.",
  alternates: { canonical: "/planner/build-a-patio" },
};

export default function PatioPlannerPage() {
  return (
    <>
      <section className="container-wide pt-7 md:pt-10">
        <div className="pb-8 md:pb-10 border-b border-line">
          <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink-muted mb-5">
            <Link href="/planner" className="hover:text-accent transition-colors">Planner</Link>
            <span className="mx-2">·</span><span>Paver area and count</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.03] mb-4 text-ink">
            <BannerHeadline text="Estimate paver quantity." />
          </h1>
          <p className="text-[17px] md:text-lg text-ink-muted max-w-2xl leading-relaxed">
            Calculate rectangular area and a nominal paver count. Product coverage and layout details vary; this is not a complete project material list or installation plan.
          </p>
        </div>
      </section>

      <section className="container-wide py-10 md:py-12"><PatioPlannerClient /></section>

      <section className="container-content pb-16">
        <div className="pt-10 border-t border-line guide-prose">
          <h2>Check product coverage and project requirements</h2>
          <p>The result uses nominal paver face dimensions and a user-selected allowance. It does not account for joint widths, bond pattern, borders, cuts, reusable offcuts, or actual supplier packaging. Confirm product coverage and make a layout plan before ordering.</p>
          <p>This planner does not calculate excavation, base, bedding, jointing, drainage, edging, costs, or structural suitability. Site conditions and installation requirements vary; consult product documentation, local requirements, and a qualified contractor for project-specific design.</p>
          <p>For a separate area-based estimate, see the <Link href="/paver-calculator" className="text-accent hover:underline">paver calculator</Link>.</p>
        </div>
      </section>
    </>
  );
}
