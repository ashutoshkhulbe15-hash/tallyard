import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-line">
      <div className="container-wide flex items-center justify-between h-16">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-ink hover:text-accent transition-colors"
          aria-label="Tallyard home"
        >
          tallyard
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-8 text-sm text-ink-muted">
            <li>
              <Link href="/calculators" className="hover:text-ink transition-colors">
                Calculators
              </Link>
            </li>
            <li>
              <Link href="/guides" className="hover:text-ink transition-colors">
                Guides
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-ink transition-colors">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
