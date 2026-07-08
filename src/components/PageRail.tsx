"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export interface RailNavItem {
  href: string;
  label: string;
}

export interface RailToolGroup {
  heading: string;
  tools: { href: string; name: string }[];
}

interface PageRailProps {
  navHeading: string;
  nav: RailNavItem[];
  toolGroups?: RailToolGroup[];
  footLines: [string, string, string];
}

/**
 * Full-height sticky left rail with scroll-spy: the nav link whose section
 * is currently in view gets highlighted. Sticky, spans the viewport, pins a
 * status block to the bottom. Hidden below 1080px (via .page-rail).
 */
export function PageRail({
  navHeading,
  nav,
  toolGroups = [],
  footLines,
}: PageRailProps) {
  const ids = nav.map((n) => n.href.replace("#", ""));
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    if (ids.length === 0) return;
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    // The active section is the last one whose top has scrolled above the
    // trigger line just under the sticky header.
    const onScroll = () => {
      const trigger = 120;
      let current = sections[0].id;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= trigger) {
          current = el.id;
        } else {
          break;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(",")]);

  return (
    <aside className="page-rail">
      <div className="font-mono text-[10.5px] tracking-[0.16em] uppercase text-ink-faint mb-3.5">
        {navHeading}
      </div>
      <nav className="flex flex-col">
        {nav.map((item) => {
          const isActive = item.href.replace("#", "") === active;
          return (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive ? "true" : undefined}
              className={`text-[14.5px] border-l-2 pl-[15px] py-2 transition-colors ${
                isActive
                  ? "text-ink font-semibold border-l-accent"
                  : "text-ink-muted border-l-line hover:text-ink hover:border-l-accent"
              }`}
            >
              {item.label}
            </a>
          );
        })}
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
