import type { Metadata } from "next";
import { BannerHeadline } from "@/components/BannerHeadline";
import DeckPlannerClient from "./DeckPlanner";

export const metadata: Metadata = {
  title: "Build a deck — complete material planner",
  description:
    "Plan your entire deck project in one tool. Get a complete material list for decking, frame, concrete footings, stairs, railing, and fasteners. Compare against contractor quotes.",
  alternates: { canonical: "/planner/build-a-deck" },
  openGraph: {
    title: "Build a deck — complete material planner",
    description:
      "Plan your entire deck project: decking, frame, footings, stairs, railing, and fasteners in one tool.",
    url: "https://www.tallyard.com/planner/build-a-deck",
    type: "website",
  },
};

export default function DeckPlannerPage() {
  return (
    <>
      {/* Banner */}
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-10">
          <nav
            aria-label="Breadcrumb"
            className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold"
          >
            <a
              href="/planner"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              Planner
            </a>
            <span className="mx-2">·</span>
            <span>Deck</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-[1.05] mb-3 text-ink">
            <BannerHeadline text="Plan your deck." />
          </h1>
          <p className="text-base md:text-lg text-ink-muted max-w-xl leading-relaxed">
            Enter your dimensions once. Get a complete material list for
            decking, frame, concrete footings, stairs, railing, and
            fasteners — then compare it against your contractor&apos;s
            quote.
          </p>
        </div>
      </section>

      {/* Planner */}
      <section className="container-wide py-10 md:py-12">
        <DeckPlannerClient />
      </section>
    </>
  );
}
