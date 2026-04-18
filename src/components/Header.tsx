"use client";

import { useState } from "react";
import Link from "next/link";
import { UnitToggle } from "./UnitToggle";

const navLinks = [
  { href: "/calculators", label: "Calculators" },
  { href: "/planner", label: "Planner" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="border-b border-line bg-bg sticky top-0 z-40 backdrop-blur-sm"
      style={{ backgroundColor: "rgba(250, 246, 239, 0.85)" }}
    >
      <div className="container-wide flex items-center justify-between h-16 gap-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-lg font-bold tracking-tighter text-ink hover:opacity-80 transition-opacity shrink-0"
          aria-label="Tallyard home"
          onClick={() => setMenuOpen(false)}
        >
          <span
            className="w-[7px] h-[7px] rounded-full bg-accent"
            aria-hidden="true"
          />
          Tallyard
        </Link>

        <div className="flex items-center gap-5 md:gap-8">
          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden sm:block">
            <ul className="flex items-center gap-6 md:gap-8 text-sm text-ink-muted font-medium">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <UnitToggle />

          {/* Mobile hamburger button */}
          <button
            className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-[2px] bg-ink transition-all duration-200 ${
                menuOpen ? "rotate-45 translate-y-[5px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-ink transition-all duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-ink transition-all duration-200 ${
                menuOpen ? "-rotate-45 -translate-y-[5px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <nav
          className="sm:hidden border-t border-line bg-bg-warm"
          aria-label="Mobile navigation"
        >
          <ul className="container-wide py-4 space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2.5 px-3 text-sm font-medium text-ink-muted hover:text-accent hover:bg-surface rounded-md transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
