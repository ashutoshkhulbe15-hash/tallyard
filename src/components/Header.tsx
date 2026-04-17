import Link from "next/link";
import { UnitToggle } from "./UnitToggle";

export function Header() {
  return (
    <header className="bg-dark dark-section">
      <div className="container-wide flex items-center justify-between h-16 gap-4">
        <Link
          href="/"
          className="flex items-center gap-1 text-lg font-bold tracking-tighter text-white hover:opacity-80 transition-opacity shrink-0"
          aria-label="Tallyard home"
        >
          <span
            className="w-[7px] h-[7px] rounded-full bg-accent mr-0.5"
            aria-hidden="true"
          />
          Tallyard
        </Link>
        <div className="flex items-center gap-5 md:gap-8">
          <nav aria-label="Primary" className="hidden sm:block">
            <ul className="flex items-center gap-6 md:gap-8 text-sm text-dark-ink-muted font-medium">
              <li>
                <Link href="/calculators" className="hover:text-white transition-colors">
                  Calculators
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-white transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
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
