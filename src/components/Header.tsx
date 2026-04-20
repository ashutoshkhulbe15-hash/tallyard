"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UnitToggle } from "./UnitToggle";

const navLinks = [
  { href: "/calculators", label: "Calculators" },
  { href: "/planner", label: "Planner" },
  { href: "/guides", label: "Guides" },
  { href: "/about", label: "About" },
];

const searchablePages = [
  { slug: "paint-calculator", label: "Paint calculator" },
  { slug: "concrete-calculator", label: "Concrete calculator" },
  { slug: "tile-calculator", label: "Tile calculator" },
  { slug: "flooring-calculator", label: "Flooring calculator" },
  { slug: "roofing-calculator", label: "Roofing calculator" },
  { slug: "deck-calculator", label: "Deck calculator" },
  { slug: "fence-calculator", label: "Fence calculator" },
  { slug: "mulch-calculator", label: "Mulch calculator" },
  { slug: "gravel-calculator", label: "Gravel calculator" },
  { slug: "insulation-calculator", label: "Insulation calculator" },
  { slug: "btu-calculator", label: "BTU / AC sizing calculator" },
  { slug: "heat-pump-calculator", label: "Heat pump calculator" },
  { slug: "solar-calculator", label: "Solar panel calculator" },
  { slug: "drywall-calculator", label: "Drywall calculator" },
  { slug: "siding-calculator", label: "Siding calculator" },
  { slug: "paver-calculator", label: "Paver calculator" },
  { slug: "stair-calculator", label: "Stair calculator" },
  { slug: "lumber-calculator", label: "Lumber calculator" },
  { slug: "wallpaper-calculator", label: "Wallpaper calculator" },
  { slug: "gutter-calculator", label: "Gutter calculator" },
  { slug: "rebar-calculator", label: "Rebar calculator" },
  { slug: "brick-calculator", label: "Brick calculator" },
  { slug: "asphalt-calculator", label: "Asphalt calculator" },
  { slug: "topsoil-calculator", label: "Topsoil calculator" },
  { slug: "sod-calculator", label: "Sod calculator" },
  { slug: "grout-calculator", label: "Grout calculator" },
  { slug: "shower-tile-calculator", label: "Shower tile calculator" },
  { slug: "backsplash-calculator", label: "Backsplash calculator" },
  { slug: "countertop-calculator", label: "Countertop calculator" },
  { slug: "kitchen-cabinet-calculator", label: "Kitchen cabinet calculator" },
  { slug: "vanity-calculator", label: "Vanity calculator" },
  { slug: "water-heater-calculator", label: "Water heater calculator" },
  { slug: "wire-size-calculator", label: "Wire size calculator" },
  { slug: "extension-cord-calculator", label: "Extension cord calculator" },
  { slug: "attic-ventilation-calculator", label: "Attic ventilation calculator" },
  { slug: "pool-chlorine-calculator", label: "Pool chlorine calculator" },
  { slug: "shed-calculator", label: "Shed calculator" },
  { slug: "rainwater-calculator", label: "Rainwater calculator" },
  { slug: "snow-load-calculator", label: "Snow load calculator" },
  { slug: "stud-spacing-calculator", label: "Stud spacing calculator" },
  { slug: "drain-pipe-calculator", label: "Drain pipe calculator" },
  { slug: "garage-door-calculator", label: "Garage door calculator" },
  { slug: "window-sizing-calculator", label: "Window sizing calculator" },
  { slug: "chimney-calculator", label: "Chimney calculator" },
  { slug: "cost-to-build-a-deck", label: "Cost to build a deck" },
  { slug: "cost-to-replace-a-roof", label: "Cost to replace a roof" },
  { slug: "cost-to-build-a-fence", label: "Cost to build a fence" },
  { slug: "cost-to-paint-a-house", label: "Cost to paint a house" },
  { slug: "cost-to-install-flooring", label: "Cost to install flooring" },
  { slug: "cost-to-remodel-a-bathroom", label: "Cost to remodel a bathroom" },
  { slug: "cost-to-pour-concrete", label: "Cost to pour concrete" },
  { slug: "cost-to-install-siding", label: "Cost to install siding" },
  { slug: "cost-to-install-solar", label: "Cost to install solar" },
  { slug: "cost-to-replace-hvac", label: "Cost to replace HVAC" },
];

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selIdx, setSelIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = query.length >= 2
    ? searchablePages.filter((p) => p.label.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];

  useEffect(() => { if (searchOpen && inputRef.current) inputRef.current.focus(); }, [searchOpen]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSearchOpen(false); setQuery(""); setSelIdx(-1); }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) { setSearchOpen(false); setQuery(""); setSelIdx(-1); }
    };
    if (searchOpen) document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [searchOpen]);

  const go = (slug: string) => { router.push("/" + slug); setSearchOpen(false); setQuery(""); setSelIdx(-1); setMenuOpen(false); };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelIdx((i) => Math.min(i + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSelIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter" && results[selIdx]) { go(results[selIdx].slug); }
  };

  return (
    <header className="border-b border-line bg-bg sticky top-0 z-40 backdrop-blur-sm" style={{ backgroundColor: "rgba(250, 246, 239, 0.85)" }}>
      <div className="container-wide flex items-center justify-between h-16 gap-3">
        <Link href="/" className="flex items-center gap-1.5 text-lg font-bold tracking-tighter text-ink hover:opacity-80 transition-opacity shrink-0" aria-label="Tallyard home" onClick={() => setMenuOpen(false)}>
          <span className="w-[7px] h-[7px] rounded-full bg-accent" aria-hidden="true" />
          Tallyard
        </Link>

        <div className="flex items-center gap-3 md:gap-5">
          {/* Search */}
          <div ref={boxRef} className="relative">
            {searchOpen ? (
              <>
                <div className="relative">
                  <input ref={inputRef} type="text" value={query} onChange={(e) => { setQuery(e.target.value); setSelIdx(-1); }} onKeyDown={onKey} placeholder="Search calculators..." className="w-48 md:w-64 text-sm py-1.5 pl-8 pr-3 border border-line rounded-md bg-surface text-ink placeholder:text-ink-faint focus:outline-none focus:border-accent" />
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-faint"><SearchIcon /></span>
                </div>
                {results.length > 0 && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-surface border border-line rounded-md shadow-lg overflow-hidden z-50">
                    {results.map((r, i) => (
                      <button key={r.slug} onClick={() => go(r.slug)} className={`block w-full text-left px-3 py-2.5 text-sm transition-colors ${i === selIdx ? "bg-bg-warm text-accent font-semibold" : "text-ink-muted hover:bg-bg-warm"}`}>
                        {r.label}
                      </button>
                    ))}
                  </div>
                )}
                {query.length >= 2 && results.length === 0 && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-surface border border-line rounded-md shadow-lg z-50 px-3 py-3 text-sm text-ink-faint">
                    No results for &ldquo;{query}&rdquo;
                  </div>
                )}
              </>
            ) : (
              <button onClick={() => setSearchOpen(true)} className="flex items-center gap-2 text-ink-faint hover:text-ink transition-colors" aria-label="Search calculators">
                <SearchIcon />
                <span className="hidden md:inline text-[10px] text-ink-faint border border-line rounded px-1.5 py-0.5 font-mono">⌘K</span>
              </button>
            )}
          </div>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden sm:block">
            <ul className="flex items-center gap-6 md:gap-8 text-sm text-ink-muted font-medium">
              {navLinks.map((link) => (
                <li key={link.href}><Link href={link.href} className="hover:text-ink transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </nav>

          <UnitToggle />

          {/* Mobile hamburger */}
          <button className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            <span className={`block w-5 h-[2px] bg-ink transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
            <span className={`block w-5 h-[2px] bg-ink transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[2px] bg-ink transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="sm:hidden border-t border-line bg-bg-warm" aria-label="Mobile navigation">
          <ul className="container-wide py-4 space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="block py-2.5 px-3 text-sm font-medium text-ink-muted hover:text-accent hover:bg-surface rounded-md transition-colors" onClick={() => setMenuOpen(false)}>
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
