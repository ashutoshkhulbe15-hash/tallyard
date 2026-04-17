import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-dark dark-section text-dark-ink-muted mt-24">
      <div className="container-wide pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 md:gap-12 pb-10 border-b border-line-dark">
          {/* Brand column with newsletter */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-lg font-bold tracking-tighter text-white mb-3"
              aria-label="Tallyard home"
            >
              <span
                className="w-[7px] h-[7px] rounded-full bg-accent mr-0.5"
                aria-hidden="true"
              />
              Tallyard
            </Link>
            <p className="text-sm text-dark-ink-muted leading-relaxed max-w-xs mb-5">
              Honest calculators for home improvement. One new tool every week
              — get them in your inbox.
            </p>
            <form
              action="/contact"
              method="get"
              className="flex gap-2 max-w-sm"
              aria-label="Newsletter signup (redirects to contact page)"
            >
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                aria-label="Email address"
                className="flex-1 px-3 py-2.5 bg-white/[0.06] border border-white/10 rounded-md text-sm text-white placeholder:text-dark-ink-faint focus:outline-none focus:border-accent transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-md text-sm font-semibold transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Calculators column */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Calculators</h3>
            <ul className="space-y-2.5">
              <li><Link href="/paint-calculator" className="text-sm text-dark-ink-muted hover:text-white transition-colors">Paint</Link></li>
              <li><Link href="/calculators" className="text-sm text-dark-ink-muted hover:text-white transition-colors">Concrete</Link></li>
              <li><Link href="/calculators" className="text-sm text-dark-ink-muted hover:text-white transition-colors">Tile</Link></li>
              <li><Link href="/calculators" className="text-sm text-dark-ink-muted hover:text-white transition-colors">All tools →</Link></li>
            </ul>
          </div>

          {/* Learn column */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Learn</h3>
            <ul className="space-y-2.5">
              <li><Link href="/guides" className="text-sm text-dark-ink-muted hover:text-white transition-colors">Guides</Link></li>
              <li><Link href="/methodology" className="text-sm text-dark-ink-muted hover:text-white transition-colors">Methodology</Link></li>
              <li><Link href="/about" className="text-sm text-dark-ink-muted hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2.5">
              <li><Link href="/contact" className="text-sm text-dark-ink-muted hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm text-dark-ink-muted hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-sm text-dark-ink-muted hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-xs text-dark-ink-faint">
            © {new Date().getFullYear()} Tallyard · All formulas public and cited
          </p>
          <p className="text-xs text-dark-ink-faint">
            Built with care
          </p>
        </div>
      </div>
    </footer>
  );
}
