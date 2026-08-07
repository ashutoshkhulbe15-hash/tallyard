"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Click-to-expand wrapper for guide figures. Renders the figure box as
 * normal; on click, shows the same content full-screen on a dimmed
 * backdrop. Escape or any click closes it. No dependencies, no portals:
 * the overlay is fixed-position and only mounted while open.
 */
export function FigureLightbox({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <>
      <div
        className="group relative bg-surface border border-line rounded-lg p-4 md:p-6 overflow-hidden cursor-zoom-in transition-colors hover:border-accent"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        aria-label="Expand diagram"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        <span
          aria-hidden
          className="absolute top-2 right-2.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint bg-bg-warm border border-line px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        >
          ⤢ expand
        </span>
        {children}
      </div>
      {open && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center cursor-zoom-out p-[4vh_4vw]"
          style={{ background: "rgba(11, 16, 13, 0.78)" }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Expanded diagram"
        >
          <div className="bg-bg rounded-xl p-5 md:p-8 w-[min(1100px,94vw)] max-h-[92vh] overflow-auto [&_svg]:w-full [&_svg]:h-auto">
            {children}
          </div>
        </div>
      )}
    </>
  );
}
