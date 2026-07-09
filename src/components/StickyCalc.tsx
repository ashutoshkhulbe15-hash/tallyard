"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Sticky wrapper that handles calculators taller than the viewport.
 *
 * Plain `position: sticky; top: 20px` pins the element's TOP, so a tall
 * calculator's bottom (the result + buttons) stays below the fold while
 * scrolling. Instead we compute the sticky `top` so that:
 *   - if the element fits, it pins near the header (top: 20px)
 *   - if it's taller than the viewport, top goes negative just enough that
 *     the element's BOTTOM rests at the viewport bottom — so scrolling down
 *     reveals the result and it then holds in view.
 */
export function StickyCalc({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(80);

  useEffect(() => {
    const HEADER = 80; // gap below the sticky site header
    const BOTTOM_GAP = 16;

    const recalc = () => {
      const el = ref.current;
      if (!el) return;
      const elHeight = el.offsetHeight;
      const vh = window.innerHeight;
      if (elHeight + HEADER + BOTTOM_GAP <= vh) {
        // Fits: pin under the header.
        setTop(HEADER);
      } else {
        // Taller than viewport: anchor the bottom to the viewport bottom.
        setTop(vh - elHeight - BOTTOM_GAP);
      }
    };

    recalc();
    window.addEventListener("resize", recalc);
    // Re-measure if the calculator's height changes (e.g. inputs expand,
    // "show the math" opens). ResizeObserver covers content-driven changes.
    let ro: ResizeObserver | null = null;
    if (ref.current && "ResizeObserver" in window) {
      ro = new ResizeObserver(recalc);
      ro.observe(ref.current);
    }
    return () => {
      window.removeEventListener("resize", recalc);
      ro?.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className="lg:sticky" style={{ top: `${top}px` }}>
      {children}
    </div>
  );
}
