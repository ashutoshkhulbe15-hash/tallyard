/**
 * Shared color tokens for guide SVGs. Matches the V3 visual system used
 * across Tallyard. Kept in one place so guide visualizations stay
 * consistent even when the author draws custom diagrams.
 */
import { FigureLightbox } from "./FigureLightbox";

export const GUIDE_SVG = {
  // Surface
  bgWarm: "#F7F9F6",
  bgSurface: "#FFFFFF",
  // Ink
  ink: "#0B100D",
  inkMuted: "#333330",
  inkFaint: "#6F6E66",
  // Accent (verify green) — use for highlights, totals, the answer
  accent: "#147A46",
  accentSoft: "#E7F3EC",
  // Walnut — dark callouts, compressor boxes, the answer blocks
  walnut: "#0B100D",
  // Secondary tints for "the other option" in comparisons — cool slate
  slate: "#B4C4D0",
  slateSoft: "#EAF0F5",
  // Semantic for cold/hot indicators
  cool: "#6B91AD",
  warm: "#B9791A",
  line: "rgba(26, 24, 20, 0.14)",
} as const;

/**
 * Wrapper that gives every SVG a figure caption slot and a consistent
 * container treatment. Captions sit below the drawing in small muted
 * text, the way figures work in editorial layouts.
 */
export function Figure({
  children,
  caption,
  number,
}: {
  children: React.ReactNode;
  caption?: React.ReactNode;
  number?: number;
}) {
  return (
    <figure className="my-8 -mx-2 md:mx-0">
      <FigureLightbox>{children}</FigureLightbox>
      {(caption || number) && (
        <figcaption className="text-xs text-ink-faint mt-2 px-2 md:px-0 leading-relaxed">
          {number && (
            <span className="font-semibold text-ink-muted">
              Fig. {number}.{" "}
            </span>
          )}
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * A small byline strip for guides. Do not display unverified update dates
 * supplied by older article modules.
 */
export function GuideByline({
  reviewedAgainst,
}: {
  updated: string; // retained for compatibility until dates are verified
  reviewedAgainst?: string; // e.g. "DOE, EPA, and Energy Star data"
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-faint mb-8 pb-6 border-b border-line">
      <span className="font-semibold text-ink-muted">
        Tallyard Editorial
      </span>
      {reviewedAgainst && (
        <>
          <span aria-hidden="true">·</span>
          <span>Source references: {reviewedAgainst}</span>
        </>
      )}
    </div>
  );
}

/**
 * Methodology note — the "How we got these numbers" disclosure at
 * the top of a guide. Builds E-E-A-T by being transparent about
 * inputs and limitations.
 */
export function MethodologyNote({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <details className="my-6 group">
      <summary className="cursor-pointer text-sm font-semibold text-accent hover:text-accent-hover transition-colors list-none inline-flex items-center gap-1.5">
        <span className="inline-block w-1 h-1 rounded-full bg-accent" />
        How we calculated these numbers
        <span className="text-ink-faint font-normal transition-transform group-open:rotate-180">
          ▾
        </span>
      </summary>
      <div className="mt-3 pl-3.5 border-l-2 border-line text-sm text-ink-muted leading-relaxed space-y-2">
        {children}
      </div>
    </details>
  );
}

/**
 * Scenario card for an explicitly hypothetical illustration.
 */
export function Scenario({
  location,
  children,
}: {
  location: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-6 p-5 bg-bg-warm rounded-lg border border-line">
      <div className="text-[10px] uppercase tracking-[0.12em] text-accent font-bold mb-2">
        Hypothetical example · {location}
      </div>
      <div className="text-sm text-ink leading-relaxed">{children}</div>
      <p className="text-[10px] text-ink-faint mt-3 italic">
        Hypothetical illustration, not a documented project or verified quote. Check current local prices and requirements before using these figures.
      </p>
    </div>
  );
}
