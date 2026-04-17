import Link from "next/link";
import { UnitToggle } from "./UnitToggle";

export function Header() {
  return (
    <header className="border-b border-line bg-bg sticky top-0 z-40 backdrop-blur-sm" style={{ backgroundColor: "rgba(250, 246, 239, 0.85)" }}>
      <div className="container-wide flex items-center justify-between h-16 gap-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-lg font-bold tracking-tighter text-ink hover:opacity-80 transition-opacity shrink-0"
          aria-label="Tallyard home"
        >
          <span
            className="w-[7px] h-[7px] rounded-full bg-accent"
            aria-hidden="true"
          />
          Tallyard
        </Link>
        <div className="flex items-center gap-5 md:gap-8">
          <nav aria-label="Primary" className="hidden sm:block">
            <ul className="flex items-center gap-6 md:gap-8 text-sm text-ink-muted font-medium">
              <li><Link href="/calculators" className="hover:text-ink transition-colors">Calculators</Link></li>
              <li><Link href="/guides" className="hover:text-ink transition-colors">Guides</Link></li>
              <li><Link href="/about" className="hover:text-ink transition-colors">About</Link></li>
            </ul>
          </nav>
          <UnitToggle />
        </div>
      </div>
    </header>
  );
}
