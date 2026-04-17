import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-content py-24 text-center">
      <p className="text-xs uppercase tracking-wide text-ink-faint mb-3">404</p>
      <h1 className="text-3xl font-semibold tracking-tight mb-4">
        This page doesn't exist
      </h1>
      <p className="text-base text-ink-muted mb-8 max-w-prose mx-auto">
        The calculator or page you're looking for hasn't been built yet, or the link is out of date.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-5 py-2.5 text-sm font-medium bg-ink text-bg rounded hover:bg-ink/90 transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}
