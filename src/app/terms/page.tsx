import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Tallyard terms of use.",
};

export default function TermsPage() {
  return (
    <div className="container-content py-16">
      <p className="text-xs uppercase tracking-wide text-ink-faint mb-3">Terms</p>
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Terms of use</h1>
      <div className="space-y-5 text-base text-ink">
        <p>
          Tallyard calculators provide material estimates for planning purposes. They are not
          engineering specifications, construction documents, or professional advice.
        </p>
        <div>
          <h2 className="text-lg font-semibold mb-2">Accuracy</h2>
          <p className="text-ink-muted">
            We make every effort to ensure our calculators produce accurate estimates, but
            results depend on your inputs and on assumptions that may not match your specific
            project. Always verify quantities against manufacturer guidance for your actual
            materials before purchasing.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Liability</h2>
          <p className="text-ink-muted">
            Tallyard is not liable for material shortages, overages, or project outcomes
            based on calculator results. For structural, electrical, plumbing, permitting,
            or any safety-critical work, consult a licensed professional.
          </p>
        </div>
      </div>
    </div>
  );
}
