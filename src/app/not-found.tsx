import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page not found | Tallyard",
  description: "This page doesn't exist on Tallyard.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="container-content py-24 text-center">
      <p className="text-xs uppercase tracking-wide text-accent font-bold mb-3">404</p>
      <h1 className="text-3xl font-semibold tracking-tight mb-4">
        This page doesn&apos;t exist
      </h1>
      <p className="text-base text-ink-muted mb-8 max-w-prose mx-auto">
        The calculator or page you&apos;re looking for hasn&apos;t been
        built yet, or the URL is out of date. Try browsing our full list
        of tools.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/calculators"
          className="inline-flex items-center px-5 py-2.5 text-sm font-semibold bg-accent hover:bg-accent-hover text-white rounded-md transition-colors"
        >
          Browse calculators
        </Link>
        <Link
          href="/"
          className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-ink border border-line-strong hover:border-accent hover:text-accent rounded-md transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
