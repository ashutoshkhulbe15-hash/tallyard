import type { Metadata } from "next";
import Link from "next/link";
import { HomeDirectory } from "./HomeDirectory";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tallyard — Free home improvement calculators that show their work",
    description: "45 calculators for paint, concrete, roofing, decking, fencing, and more.",
    url: "https://www.tallyard.com",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Tallyard" }],
  },
  twitter: { card: "summary_large_image", images: ["/og-default.png"] },
};

const projectPaths = [
  {
    goal: "OUTDOOR BUILD",
    name: "Building a deck",
    meta: "4 tools · 1 planner",
    steps: [
      { n: "1", label: "Deck boards + joists", href: "/deck-calculator" },
      { n: "2", label: "Footings (concrete)", href: "/concrete-calculator" },
      { n: "3", label: "Stairs", href: "/stair-calculator" },
      { n: "4", label: "Railing + fasteners", href: "/planner/build-a-deck" },
    ],
  },
  {
    goal: "INTERIOR ROOM",
    name: "Redoing a room",
    meta: "4 tools",
    steps: [
      { n: "1", label: "Paint", href: "/paint-calculator" },
      { n: "2", label: "Flooring", href: "/flooring-calculator" },
      { n: "3", label: "Drywall", href: "/drywall-calculator" },
      { n: "4", label: "Baseboard lumber", href: "/lumber-calculator" },
    ],
  },
  {
    goal: "POUR + SET",
    name: "Concrete + masonry",
    meta: "6 tools",
    steps: [
      { n: "1", label: "Concrete volume", href: "/concrete-calculator" },
      { n: "2", label: "Rebar grid", href: "/rebar-calculator" },
      { n: "3", label: "Gravel base", href: "/gravel-calculator" },
      { n: "", label: "Brick · Mortar · Asphalt", href: "/calculators/masonry" },
    ],
  },
  {
    goal: "SYSTEMS",
    name: "Heating, cooling + power",
    meta: "7 tools",
    steps: [
      { n: "1", label: "BTU / heat pump size", href: "/heat-pump-calculator" },
      { n: "2", label: "Water heater", href: "/water-heater-calculator" },
      { n: "3", label: "Wire gauge", href: "/wire-size-calculator" },
      { n: "", label: "Solar · Cords", href: "/calculators/electrical-solar" },
    ],
  },
];

const proof = [
  {
    fx: "832 sf ÷ 350 sf/gal = ",
    fxb: "2.38 gal",
    title: "Shows the formula",
    body: "Every input, every intermediate step, every rounding rule is on the page. If the answer looks off, you can trace it.",
  },
  {
    fx: "coverage: ",
    fxb: "Sherwin-Williams TDS",
    title: "Cites the source",
    body: "Rates and code minimums come from manufacturer data, the IRC / IPC / NEC, and industry references — all linked.",
  },
  {
    fx: "2.38 gal → ",
    fxb: "1 gal + 2 qt",
    title: "Rounds to buyable",
    body: "You can't buy 2.38 gallons. Results round up to real purchase units, with the raw number shown beside them.",
  },
];

const guides = [
  {
    slug: "vinyl-vs-fiber-cement-siding",
    title: "Vinyl vs fiber cement siding",
    desc: "30-year total-cost math, fire ratings, and the repaint cycle nobody talks about.",
    tag: "ROOFING",
    time: "11 min",
  },
  {
    slug: "composite-vs-pressure-treated-vs-cedar-deck",
    title: "Composite vs PT vs cedar decking",
    desc: "20-year cost breakdown — pressure-treated turns out to be the most expensive option.",
    tag: "LANDSCAPING",
    time: "12 min",
  },
  {
    slug: "heat-pump-vs-furnace",
    title: "Heat pump vs furnace + AC",
    desc: "Climate-zone-by-zone operating costs, with the federal tax credit math worked through.",
    tag: "HVAC",
    time: "14 min",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ===== 1. HERO: headline + worked-calculation receipt ===== */}
      <section className="container-wide pt-10 md:pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
          {/* Left: headline */}
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent mb-5 font-medium flex items-center gap-2.5">
              <span className="w-7 h-px bg-accent inline-block" aria-hidden="true" />
              Free · No signup · Formulas public
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tighter leading-[1.02] mb-6 max-w-3xl">
              Calculators that <span className="accent-italic">show their work.</span>
            </h1>
            <p className="text-base md:text-lg text-ink-muted max-w-xl leading-relaxed mb-8">
              Free tools for home improvement projects. Every formula public,
              every source cited. No signup, no email capture, no affiliate
              agenda.
            </p>
            <div className="flex flex-wrap gap-3 mb-9">
              <Link
                href="/calculators"
                className="inline-flex items-center px-5 py-3 text-sm font-semibold bg-ink hover:-translate-y-px text-bg rounded-md transition-all hover:shadow-lg"
              >
                Browse all calculators
              </Link>
              <Link
                href="/guides"
                className="inline-flex items-center px-5 py-3 text-sm font-semibold text-ink border border-line hover:border-ink-muted bg-surface rounded-md transition-colors"
              >
                Read buying guides
              </Link>
            </div>
            <div className="flex gap-8">
              {[
                { value: "45", label: "calculators" },
                { value: "10", label: "cost guides" },
                { value: "0", label: "signup forms" },
              ].map((stat) => (
                <div key={stat.label}>
                  <b className="font-mono text-xl font-bold tracking-tight block">{stat.value}</b>
                  <span className="text-xs text-ink-faint uppercase tracking-[0.08em]">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: animated worked-calculation receipt */}
          <div className="relative bg-surface border border-line rounded-lg shadow-receipt overflow-hidden">
            <span className="absolute -top-[1px] right-6 bg-amber text-white font-mono text-[10.5px] tracking-[0.1em] px-2.5 py-1 rounded-b uppercase z-10">
              Worked example
            </span>
            <div className="flex justify-between items-center px-5 py-4 border-b border-line bg-surface-alt">
              <span className="font-semibold text-sm">Paint calculator — 12 × 14 ft bedroom</span>
              <span className="font-mono text-[11px] text-accent bg-accent-soft px-2 py-1 rounded-full font-medium whitespace-nowrap ml-3">
                ✓ formula shown
              </span>
            </div>
            <div className="p-5 font-mono text-[13.5px]">
              <div className="receipt-line flex justify-between py-2 border-b border-dashed border-line">
                <span className="text-ink-muted">wall area (2 coats)</span>
                <span className="font-medium">832 sq ft</span>
              </div>
              <div className="receipt-line flex justify-between py-2 border-b border-dashed border-line">
                <span className="text-ink-muted">− doors &amp; windows</span>
                <span className="font-medium">−62 sq ft</span>
              </div>
              <div className="receipt-line flex justify-between py-2 border-b border-dashed border-line">
                <span className="text-ink-muted">÷ coverage rate</span>
                <span className="font-medium">350 sq ft/gal</span>
              </div>
              <div className="receipt-line flex justify-between py-2 border-b border-dashed border-line">
                <span className="text-ink-muted">raw result</span>
                <span className="font-medium">2.20 gal</span>
              </div>
              <div className="receipt-line flex justify-between py-2 border-b border-dashed border-line">
                <span className="text-ink-muted">round to buyable</span>
                <span className="font-medium">1 gal + 2 qt</span>
              </div>
              <div className="receipt-total flex justify-between pt-4 pb-1 font-bold text-base">
                <span>You need</span>
                <span className="text-accent">2.5 gallons</span>
              </div>
              <div className="receipt-source mt-3.5 pt-3.5 border-t border-line text-[11.5px] text-ink-faint flex gap-2 items-center font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-none" aria-hidden="true" />
                Coverage rate: Sherwin-Williams technical data sheet, interior latex
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. PROJECT PATHS — start by what you're building ===== */}
      <section className="container-wide pt-4 md:pt-6">
        <div className="border-t border-line pt-14">
          <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-faint mb-2">
            Where to start · <span className="text-accent">by what you&apos;re building</span>
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-7">
            Tell us the project, not the <span className="accent-italic">tool.</span>
          </h2>
          <div className="flex flex-col gap-3.5">
            {projectPaths.map((p) => (
              <div
                key={p.name}
                className="border border-line rounded-xl bg-surface overflow-hidden hover:border-accent transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-[230px_1fr]">
                  <div
                    className="p-6 md:border-r border-line border-b md:border-b-0"
                    style={{ background: "linear-gradient(#FCFDFB,#F6F8F4)" }}
                  >
                    <div className="font-mono text-[10px] tracking-[0.1em] text-accent mb-2">
                      {p.goal}
                    </div>
                    <h3 className="text-lg font-bold tracking-tight leading-tight">
                      {p.name}
                    </h3>
                    <div className="font-mono text-[11px] text-ink-faint mt-2">
                      {p.meta}
                    </div>
                  </div>
                  <div className="p-6 flex items-center flex-wrap gap-2">
                    {p.steps.map((s, i) => (
                      <span key={s.label} className="flex items-center gap-2">
                        <Link
                          href={s.href}
                          className="inline-flex items-center gap-2 text-[13px] font-medium text-ink bg-surface-alt border border-line rounded-lg px-3 py-2 hover:border-accent hover:bg-accent-soft transition-colors"
                        >
                          {s.n && (
                            <span className="font-mono text-[10px] text-accent">
                              {s.n}
                            </span>
                          )}
                          {s.label}
                        </Link>
                        {i < p.steps.length - 1 && (
                          <span className="font-mono text-xs text-ink-faint">
                            →
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. PROOF — why you can trust the number ===== */}
      <section className="container-wide pt-14 md:pt-16">
        <div className="border border-line rounded-xl bg-surface overflow-hidden">
          <div className="flex justify-between items-center px-6 py-3.5 border-b border-line bg-surface-alt">
            <span className="font-semibold text-sm">
              Why you can trust the number
            </span>
            <span className="font-mono text-[11px] text-accent bg-accent-soft px-2.5 py-1 rounded-full whitespace-nowrap ml-3">
              ✓ every tool, every time
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {proof.map((p, i) => (
              <div
                key={p.title}
                className={`p-6 border-line ${i < proof.length - 1 ? "border-b md:border-b-0 md:border-r" : ""}`}
              >
                <div className="font-mono text-[11px] text-ink-faint mb-3 pb-3 border-b border-dashed border-line">
                  {p.fx}
                  <b className="text-accent font-medium">{p.fxb}</b>
                </div>
                <h3 className="text-base font-semibold mb-1.5">{p.title}</h3>
                <p className="text-[12.5px] text-ink-muted leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. DIRECTORY — search-first, browse everything ===== */}
      <section className="container-wide pt-14 md:pt-16">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 mb-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Or start typing your project
            <span className="font-mono text-[13px] text-accent font-medium ml-2.5 tracking-normal align-middle">
              45 TOOLS · 8 CATEGORIES
            </span>
          </h2>
          <div className="font-mono text-[11.5px] text-ink-muted">
            EVERY TOOL:{" "}
            <b className="text-accent font-medium">FORMULA + SOURCE</b> · NO
            SIGNUP
          </div>
        </div>
        <HomeDirectory />
      </section>

      {/* ===== 5. GUIDES — decisions that need real math ===== */}
      <section className="container-wide pt-14 md:pt-16">
        <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-faint mb-2">
          Before you buy · <span className="text-accent">decisions that need real math</span>
        </p>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Buying guides
          </h2>
          <Link
            href="/guides"
            className="text-sm text-ink-muted hover:text-accent transition-colors font-medium"
          >
            All guides →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-line">
          {guides.map((g, i) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className={`group py-7 border-line ${i < guides.length - 1 ? "md:border-r border-b md:border-b-0" : ""} ${i > 0 ? "md:pl-6" : ""} md:pr-6`}
            >
              <div className="flex justify-between items-center font-mono text-[10px] tracking-[0.06em] mb-2.5">
                <span className="text-amber">{g.tag}</span>
                <span className="text-ink-faint">{g.time}</span>
              </div>
              <h3 className="text-lg font-bold tracking-tight leading-snug mb-2 group-hover:text-accent transition-colors">
                {g.title}
              </h3>
              <p className="text-[13px] text-ink-muted leading-relaxed">
                {g.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== 6. PLEDGE — running manifesto ===== */}
      <section className="container-wide py-14 md:py-20">
        <div className="border border-line border-l-[3px] border-l-accent rounded-r-xl bg-surface px-8 py-9 md:px-10">
          <div className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-accent mb-4">
            The pledge
          </div>
          <p className="text-base md:text-lg leading-[1.75] text-ink max-w-[74ch]">
            <b className="font-bold">
              No email gates. No lead generation. No affiliate bias. No hidden
              formulas.
            </b>{" "}
            You never sign up, log in, or hand over an email to use a tool. We
            don&apos;t sell your zip code to contractors or run &quot;get 3 free
            quotes&quot; forms. Guide recommendations follow what the numbers
            say, not which link pays the highest commission. And if we can&apos;t
            show you how we got a number, we don&apos;t publish the calculator —{" "}
            <span className="accent-italic">
              transparency isn&apos;t a feature, it&apos;s the whole point.
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
