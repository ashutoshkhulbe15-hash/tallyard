import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Tallyard builds transparent calculators for home improvement and DIY projects.",
};

export default function AboutPage() {
  return (
    <div className="container-content py-16">
      <p className="text-xs uppercase tracking-wide text-ink-faint mb-3">About</p>
      <h1 className="text-3xl font-semibold tracking-tight mb-8">
        About Tallyard
      </h1>
      <div className="space-y-5 text-base text-ink">
        <p>
          Tallyard builds transparent calculators for home improvement and DIY projects.
        </p>
        <p>
          Most online calculators are either buried in retail sites trying to sell you something, or
          generic aggregator tools that give you a number without explaining it. Tallyard is different.
          Every calculator shows its formula, cites its coverage rates and sizing factors, and walks you
          through the math so you can adjust it for your situation.
        </p>
        <p>
          No signup. No email capture. No dark patterns. The tools are free and will stay free.
        </p>
      </div>
    </div>
  );
}
