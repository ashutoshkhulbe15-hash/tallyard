import Link from "next/link";

export interface RailNavItem {
  href: string;
  label: string;
}

export interface RailToolGroup {
  heading: string;
  tools: { href: string; name: string }[];
}

interface PageRailProps {
  /** Heading for the jump-nav block, e.g. "On this page" / "In this guide" */
  navHeading: string;
  /** Anchor links to on-page sections (only pass ones that exist) */
  nav: RailNavItem[];
  /** One or more labelled groups of related links below the nav */
  toolGroups?: RailToolGroup[];
  /** Three short mono lines pinned to the bottom; middle line renders green */
  footLines: [string, string, string];
}

/**
 * The full-height left rail. Sticky, spans the viewport, and pins a status
 * block to the bottom so the column is never half-empty beside long content.
 * Hidden below 1080px (handled by .page-rail).
 */
export function PageRail({
  navHeading,
  nav,
  toolGroups = [],
  footLines,
}: PageRailProps) {
  return (
    <aside className="page-rail">
      <div className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-ink-faint mb-3.5">
        {navHeading}
      </div>
      <nav className="flex flex-col">
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-[14.5px] text-ink-muted border-l-2 border-line pl-[15px] py-2 hover:text-ink hover:border-l-accent transition-colors"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {toolGroups.map((group) => (
        <div key={group.heading}>
          <div className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-ink-faint mt-8 mb-1">
            {group.heading}
          </div>
          <div>
            {group.tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group flex items-baseline justify-between gap-2.5 py-2.5 border-b border-dashed border-line"
              >
                <span className="text-[14px] font-semibold group-hover:text-accent transition-colors">
                  {t.name}
                </span>
                <span className="font-mono text-xs text-ink-faint group-hover:text-accent transition-colors">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-auto pt-6 font-mono text-[10.5px] leading-[1.7] text-ink-faint">
        {footLines[0]}
        <br />
        <span className="text-accent">{footLines[1]}</span>
        <br />
        {footLines[2]}
      </div>
    </aside>
  );
}
