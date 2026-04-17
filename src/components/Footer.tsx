import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="container-wide py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div>
            <h3 className="text-xs uppercase tracking-wide text-ink-faint mb-3 font-medium">
              Calculators
            </h3>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li><Link href="/calculators" className="hover:text-ink transition-colors">All calculators</Link></li>
              <li><Link href="/paint-calculator" className="hover:text-ink transition-colors">Paint</Link></li>
              <li><Link href="/concrete-calculator" className="hover:text-ink transition-colors">Concrete</Link></li>
              <li><Link href="/tile-calculator" className="hover:text-ink transition-colors">Tile</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-wide text-ink-faint mb-3 font-medium">
              Learn
            </h3>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li><Link href="/guides" className="hover:text-ink transition-colors">Guides</Link></li>
              <li><Link href="/methodology" className="hover:text-ink transition-colors">Methodology</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-wide text-ink-faint mb-3 font-medium">
              About
            </h3>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li><Link href="/about" className="hover:text-ink transition-colors">About Tallyard</Link></li>
              <li><Link href="/contact" className="hover:text-ink transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-wide text-ink-faint mb-3 font-medium">
              Legal
            </h3>
            <ul className="space-y-2 text-sm text-ink-muted">
              <li><Link href="/privacy" className="hover:text-ink transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-ink transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-line flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} Tallyard. Transparent calculators for DIY projects.
          </p>
          <p className="text-xs text-ink-faint">
            All formulas public and cited.
          </p>
        </div>
      </div>
    </footer>
  );
}
