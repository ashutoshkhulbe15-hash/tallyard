import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Tallyard",
  description:
    "Report a calculator error, suggest a new tool, or ask a question. We respond within 48 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-content py-12 md:py-16">
      <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
        Contact
      </p>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
        Get in touch
      </h1>

      <p className="text-base text-ink-muted leading-relaxed max-w-prose mb-10">
        Tallyard is a small project and every message gets read personally.
        Expect a response within 48 hours on business days.
      </p>

      <div className="space-y-8 max-w-prose">
        <div className="p-6 bg-surface border border-line rounded-lg">
          <h2 className="text-base font-semibold text-ink mb-2">
            Report an error
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed mb-3">
            Found a wrong formula, outdated cost figure, or broken
            calculation? This is the most helpful thing you can send. Tell
            us which calculator or guide, what you expected, and what you
            got instead.
          </p>
          <a
            href="mailto:hello@tallyard.com?subject=Error report"
            className="text-sm text-accent hover:underline font-medium"
          >
            hello@tallyard.com → Error report
          </a>
        </div>

        <div className="p-6 bg-surface border border-line rounded-lg">
          <h2 className="text-base font-semibold text-ink mb-2">
            Suggest a calculator or guide
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed mb-3">
            We prioritize new tools based on how many people need them and
            how underserved the topic is. If you needed a calculator for
            something and couldn&apos;t find a good one, we want to hear
            about it.
          </p>
          <a
            href="mailto:hello@tallyard.com?subject=Calculator suggestion"
            className="text-sm text-accent hover:underline font-medium"
          >
            hello@tallyard.com → Suggestion
          </a>
        </div>

        <div className="p-6 bg-surface border border-line rounded-lg">
          <h2 className="text-base font-semibold text-ink mb-2">
            General questions
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed mb-3">
            Anything else, including methodology questions, partnership
            inquiries, or press. We don&apos;t do sponsored content or
            paid placements, but we&apos;re happy to talk about the
            project.
          </p>
          <a
            href="mailto:hello@tallyard.com?subject=General"
            className="text-sm text-accent hover:underline font-medium"
          >
            hello@tallyard.com → General
          </a>
        </div>
      </div>
    </div>
  );
}
