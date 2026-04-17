import Link from "next/link";
import { UnitToggle } from "./UnitToggle";

export function Header() {
  return (
    <header className="border-b border-line">
      <div className="container-wide flex items-center justify-between h-16 gap-4">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-ink hover:text-accent transition-colors shrink-0"
          aria-label="Tallyard home"
        >
          tallyard
        </Link>
        <div className="flex items-center gap-5 md:gap-8">
          <nav aria-label="Primary" className="hidden sm:block">
            <ul className="flex items-center gap-5 md:gap-8 text-sm text-ink-muted">
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
          <UnitToggle />
        </div>
      </div>
    </header>
  );
}
