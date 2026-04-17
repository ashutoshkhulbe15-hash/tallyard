import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology",
  description: "How Tallyard calculators work — formulas, sources, and rounding rules.",
};

export default function MethodologyPage() {
  return (
    <div className="container-content py-16">
      <p className="text-xs uppercase tracking-wide text-ink-faint mb-3">Methodology</p>
      <h1 className="text-3xl font-semibold tracking-tight mb-8">
        How Tallyard calculators work
      </h1>
      <div className="space-y-6 text-base text-ink">
        <p>
          Every Tallyard calculator follows three principles: the formula is public, the
          sources are cited, and the answer is shown with its supporting math.
        </p>
        <div>
          <h2 className="text-lg font-semibold mb-2">Formulas</h2>
          <p className="text-ink-muted">
            Each calculator's formula is displayed on the page itself. You can see the inputs,
            how they combine, and the result. If we apply a waste factor or a rounding rule,
            that factor is shown explicitly.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Sources</h2>
          <p className="text-ink-muted">
            Coverage rates (e.g. paint coverage per gallon, mulch depth per cubic yard) come
            from manufacturer specifications and industry references. Each calculator page
            links to the sources it relies on.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Rounding</h2>
          <p className="text-ink-muted">
            Results are rounded up to practical purchase units — you can't buy 2.67 gallons
            of paint, so we show 2.8. The raw number is shown alongside for reference.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">What we don't do</h2>
          <p className="text-ink-muted">
            Tallyard calculators provide material estimates, not engineering specifications.
            For structural work, permitting, or anything safety-critical, consult a licensed
            professional.
          </p>
        </div>
      </div>
    </div>
  );
}
