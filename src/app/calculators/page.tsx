import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All calculators",
  description: "Every Tallyard calculator, organized by project type.",
};

export default function CalculatorsIndexPage() {
  return (
    <div className="container-content py-16">
      <p className="text-xs uppercase tracking-wide text-ink-faint mb-3">
        Index
      </p>
      <h1 className="text-3xl font-semibold tracking-tight mb-4">
        All calculators
      </h1>
      <p className="text-base text-ink-muted mb-10 max-w-prose">
        Calculators are rolling out in batches. This page will be the full directory once
        the initial forty are live.
      </p>
      <div className="p-6 border border-line rounded-md bg-surface">
        <p className="text-sm text-ink-muted">
          First calculator coming next week: <Link href="/paint-calculator" className="text-accent hover:underline">paint calculator</Link>.
        </p>
      </div>
    </div>
  );
}
