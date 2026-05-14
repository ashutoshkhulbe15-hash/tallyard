import type { Metadata } from "next";
import Link from "next/link";
import { BannerHeadline } from "@/components/BannerHeadline";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tallyard — Free home improvement calculators that show their work",
    description: "45 calculators for paint, concrete, roofing, decking, fencing, and more. Every formula public, every source cited, no signup required.",
    url: "https://www.tallyard.com",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Tallyard — Calculators that show their work" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tallyard — Free home improvement calculators",
    description: "45 calculators with public formulas. No signup, no affiliate links.",
    images: ["/og-default.png"],
  },
};

const categories = [
  {
    name: "Paint + walls",
    count: 3,
    slugs: ["paint-calculator", "wallpaper-calculator", "drywall-calculator"],
    desc: "Gallons, rolls, and sheets",
  },
  {
    name: "Masonry",
    count: 5,
    slugs: ["concrete-calculator", "brick-calculator", "rebar-calculator"],
    desc: "Concrete, brick, rebar, asphalt",
  },
  {
    name: "Flooring + kitchen",
    count: 8,
    slugs: ["flooring-calculator", "tile-calculator", "kitchen-cabinet-calculator"],
    desc: "Tile, hardwood, cabinets, countertops",
  },
  {
    name: "Landscaping",
    count: 9,
    slugs: ["deck-calculator", "fence-calculator", "paver-calculator"],
    desc: "Deck, fence, mulch, gravel, sod",
  },
  {
    name: "Roofing + exterior",
    count: 6,
    slugs: ["roofing-calculator", "siding-calculator", "gutter-calculator"],
    desc: "Shingles, siding, gutters, snow load",
  },
  {
    name: "HVAC + plumbing",
    count: 4,
    slugs: ["heat-pump-calculator", "btu-calculator", "water-heater-calculator"],
    desc: "Heat pump, BTU, water heater, drain",
  },
  {
    name: "Electrical + solar",
    count: 3,
    slugs: ["solar-calculator", "wire-size-calculator", "extension-cord-calculator"],
    desc: "Panels, wire gauge, extension cords",
  },
  {
    name: "Lumber + framing",
    count: 5,
    slugs: ["lumber-calculator", "stair-calculator", "stud-spacing-calculator"],
    desc: "Board feet, stairs, studs, windows",
  },
];

const guides = [
  {
    slug: "vinyl-vs-fiber-cement-siding",
    title: "Vinyl vs fiber cement siding",
    desc: "30-year TCO math, fire ratings, and the repaint cycle nobody talks about",
    tag: "Roofing",
    time: "11 min",
  },
  {
    slug: "composite-vs-pressure-treated-vs-cedar-deck",
    title: "Composite vs PT vs cedar decking",
    desc: "20-year cost breakdown — pressure-treated is actually the most expensive option",
    tag: "Landscaping",
    time: "12 min",
  },
  {
    slug: "heat-pump-vs-furnace",
    title: "Heat pump vs furnace + AC",
    desc: "Climate-zone-by-zone operating costs with federal tax credit math",
    tag: "HVAC",
    time: "14 min",
  },
];

export default function HomePage() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Tallyard",
      url: "https://www.tallyard.com",
      description: "Free home improvement calculators with public formulas.",
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.tallyard.com/calculators?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Tallyard",
      url: "https://www.tallyard.com",
      logo: "https://www.tallyard.com/og-default.png",
      founder: { "@type": "Person", name: "Ash K.", url: "https://www.tallyard.com/about", sameAs: ["https://www.linkedin.com/in/ash-k-5baa5016a/"] },
      sameAs: ["https://www.linkedin.com/in/ash-k-5baa5016a/"],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
      {/* ===== 1. HERO ===== */}
      <section className="container-wide pt-6 md:pt-8">
        <div className="bg-bg-warm rounded-xl p-8 md:p-14 overflow-hidden">
          <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
            Home improvement · DIY
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-[1.02] mb-5 max-w-3xl">
            <BannerHeadline text="Calculators that show their work." />
          </h1>
          <p className="text-base md:text-lg text-ink-muted max-w-xl leading-relaxed mb-7">
            Free tools for home improvement projects. Every formula public,
            every source cited. No signup, no email capture, no affiliate
            agenda.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/calculators"
              className="inline-flex items-center px-5 py-3 text-sm font-semibold bg-accent hover:bg-accent-hover text-white rounded-md transition-colors"
            >
              Browse all calculators
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center px-5 py-3 text-sm font-semibold text-ink border border-line-strong hover:border-accent hover:text-accent bg-surface rounded-md transition-colors"
            >
              Read buying guides
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 2. STATS BAR ===== */}
      <section className="container-wide py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: "44", label: "calculators" },
            { value: "11", label: "categories" },
            { value: "3", label: "buying guides" },
            { value: "0", label: "signup forms" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-5 bg-surface border border-line rounded-lg text-center"
            >
              <div className="text-3xl md:text-4xl font-bold tracking-tighter text-accent leading-none">
                {stat.value}
              </div>
              <div className="text-xs text-ink-faint uppercase tracking-wider mt-2 font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 3. BROWSE BY CATEGORY ===== */}
      <section className="container-wide pb-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-2 font-semibold">
              By project type
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Browse by category
            </h2>
          </div>
          <Link
            href="/calculators"
            className="text-sm text-ink-muted hover:text-accent transition-colors font-medium hidden sm:inline"
          >
            View all 44 →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/${cat.slugs[0]}`}
              className="group block p-5 bg-surface border border-line rounded-lg hover:border-accent hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-base font-semibold text-ink">
                  {cat.name}
                </h3>
                <span className="text-[10px] uppercase tracking-wide text-accent font-semibold px-1.5 py-0.5 bg-accent-soft rounded shrink-0 ml-2">
                  {cat.count}
                </span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                {cat.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== 4. FEATURED GUIDES ===== */}
      <section className="bg-walnut">
        <div className="container-wide py-16 md:py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p
                className="text-[11px] uppercase tracking-[0.08em] mb-2 font-semibold"
                style={{ color: "#D4691C" }}
              >
                Buying guides
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                Decisions that need real math
              </h2>
            </div>
            <Link
              href="/guides"
              className="text-sm font-medium hidden sm:inline transition-colors"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              All guides →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {guides.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="block p-6 rounded-lg border transition-all hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(255,255,255,0.1)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-[10px] uppercase tracking-[0.08em] font-bold px-2 py-0.5 rounded"
                    style={{ color: "#D4691C", background: "rgba(212,105,28,0.15)" }}
                  >
                    {g.tag}
                  </span>
                  <span
                    className="text-[10px]"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {g.time}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {g.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {g.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. HOW IT WORKS ===== */}
      <section className="container-wide py-16 md:py-20">
        <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-2 font-semibold">
          How it works
        </p>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10">
          Three things every calculator <span className="accent-italic">does</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Shows the formula",
              body: "Every calculator displays the exact formula it used — not just the answer. You see every input, every intermediate step, and every rounding rule. If the answer looks wrong, you can trace it.",
            },
            {
              step: "02",
              title: "Cites the source",
              body: "Coverage rates, sizing factors, and code requirements come from manufacturer data sheets, building codes (IRC, IPC, NEC), and industry references (ACCA, NADRA, APA). Sources are linked on every page.",
            },
            {
              step: "03",
              title: "Rounds to buyable units",
              body: "You can't buy 2.67 gallons of paint. Results are rounded up to the nearest practical purchase quantity — with the raw number shown alongside so you can make your own call.",
            },
          ].map((item) => (
            <div key={item.step} className="p-6 bg-surface border border-line rounded-lg">
              <div className="text-3xl font-bold tracking-tighter text-accent leading-none mb-3">
                {item.step}
              </div>
              <h3 className="text-base font-semibold text-ink mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 6. TRUST SECTION ===== */}
      <section className="bg-bg-warm border-t border-line">
        <div className="container-content py-16 md:py-20">
          <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-2 font-semibold">
            Why Tallyard
          </p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-10">
            What we don&apos;t <span className="accent-italic">do</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7">
            {[
              {
                title: "No email gates",
                body: "You never need to sign up, log in, or hand over your email to use a calculator. The tools are free and unrestricted.",
              },
              {
                title: "No lead generation",
                body: "We don't sell your zip code to contractors. No \"get 3 free quotes\" forms, no contractor matching, no data brokering.",
              },
              {
                title: "No affiliate bias",
                body: "Guide recommendations reflect what the numbers say, not which link pays the highest commission. We don't run affiliate links.",
              },
              {
                title: "No hidden formulas",
                body: "If we can't show you how we got the number, we don't publish the calculator. Transparency isn't a feature — it's the whole point.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="text-base font-semibold text-ink mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. CTA BANNER ===== */}
      <section className="container-wide py-16 md:py-20">
        <div className="bg-walnut rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
            Start with the math
          </h2>
          <p
            className="text-base max-w-md mx-auto mb-7 leading-relaxed"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Pick a calculator, enter your measurements, and get an answer
            you can verify. No account required.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators"
              className="inline-flex items-center px-6 py-3 text-sm font-semibold bg-accent hover:bg-accent-hover text-white rounded-md transition-colors"
            >
              Browse 44 calculators
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 text-sm font-semibold rounded-md transition-colors"
              style={{
                color: "rgba(255,255,255,0.8)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              About Tallyard
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
