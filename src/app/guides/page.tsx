import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides",
  description: "In-depth guides for home improvement and DIY projects.",
};

export default function GuidesPage() {
  return (
    <div className="container-content py-16">
      <p className="text-xs uppercase tracking-wide text-ink-faint mb-3">Guides</p>
      <h1 className="text-3xl font-semibold tracking-tight mb-6">Guides</h1>
      <p className="text-base text-ink-muted max-w-prose">
        In-depth guides are coming. Each guide will pair with one or more calculators to help
        you plan, buy, and execute a project end-to-end.
      </p>
    </div>
  );
}
