import type { ReactNode } from "react";

/**
 * VerdictCard — dark walnut card that opens each guide with the punchline.
 * Mirrors the visual identity of the calculator result card.
 */
export function VerdictCard({
  label = "Bottom line",
  verdict,
  children,
}: {
  label?: string;
  verdict: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="bg-walnut walnut-section rounded-lg p-7 md:p-8 text-white my-8">
      <div
        className="text-xs uppercase tracking-[0.12em] font-bold mb-3"
        style={{ color: "#D4691C" }}
      >
        {label}
      </div>
      <p className="text-xl md:text-2xl font-bold tracking-tight leading-snug mb-3 text-white">
        {verdict}
      </p>
      {children && (
        <div className="text-base text-walnut-ink-muted leading-relaxed">
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * ComparisonTable — a simple three-column comparison table that renders
 * well on mobile (stacks) and desktop (side-by-side).
 */
export interface ComparisonColumn {
  /** Column header (e.g. "Vinyl") */
  title: string;
  /** Optional subtitle (e.g. "PVC lap siding") */
  subtitle?: string;
  /** Whether this column is the recommended pick (highlights with accent border) */
  highlight?: boolean;
}

export interface ComparisonRow {
  label: string;
  /** One value per column, in order */
  values: ReactNode[];
}

export function ComparisonTable({
  columns,
  rows,
  caption,
}: {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
  caption?: string;
}) {
  const colCount = columns.length;
  // On mobile, tables with 3+ data columns get horizontal scroll.
  // Tables with 1-2 data columns fit without scrolling.
  const needsScroll = colCount > 2;

  return (
    <div className="my-8 -mx-4 md:mx-0 overflow-x-auto">
      <table
        className={`w-full bg-surface border border-line rounded-lg overflow-hidden text-sm ${
          needsScroll ? "min-w-[480px]" : ""
        }`}
      >
        <thead>
          <tr className="bg-bg-warm border-b border-line">
            <th className="text-left font-semibold text-ink-faint uppercase tracking-wider text-[11px] px-3 md:px-4 py-3">
              &nbsp;
            </th>
            {columns.map((col, i) => (
              <th
                key={i}
                className={`text-left font-semibold px-3 md:px-4 py-3 ${
                  col.highlight
                    ? "bg-accent-soft border-b-2 border-accent"
                    : ""
                }`}
              >
                <div className="text-xs md:text-sm text-ink font-semibold">
                  {col.title}
                </div>
                {col.subtitle && (
                  <div className="text-xs text-ink-faint font-normal mt-0.5">
                    {col.subtitle}
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={i < rows.length - 1 ? "border-b border-line" : ""}
            >
              <td className="text-xs font-semibold text-ink-faint uppercase tracking-wider px-3 md:px-4 py-3 align-top">
                {row.label}
              </td>
              {row.values.map((val, j) => (
                <td
                  key={j}
                  className={`text-xs md:text-sm text-ink px-3 md:px-4 py-3 align-top ${
                    columns[j]?.highlight ? "bg-accent-soft/40" : ""
                  }`}
                >
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && (
        <p className="text-xs text-ink-faint mt-2 px-4 md:px-0">{caption}</p>
      )}
    </div>
  );
}

/**
 * Callout — a light terracotta-bordered note for important asides.
 * Used for "watch out" warnings, "quick tip" insights, etc.
 */
export function Callout({
  label = "Note",
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="my-6 p-5 bg-bg-warm border-l-4 border-accent rounded-r-md">
      <div className="text-[11px] uppercase tracking-[0.08em] font-bold text-accent mb-2">
        {label}
      </div>
      <div className="text-sm text-ink leading-relaxed">{children}</div>
    </div>
  );
}

/**
 * KeyStat — highlights a single data point inside prose flow.
 * Usage: <KeyStat value="$24,000" label="30-year fiber cement total" />
 */
export function KeyStat({
  value,
  label,
}: {
  value: ReactNode;
  label: ReactNode;
}) {
  return (
    <div className="my-6 p-5 bg-surface border border-line rounded-lg inline-flex flex-col items-start">
      <div className="text-3xl md:text-4xl font-bold tracking-tighter text-accent leading-none">
        {value}
      </div>
      <div className="text-xs text-ink-faint uppercase tracking-wider mt-2 font-semibold">
        {label}
      </div>
    </div>
  );
}

/**
 * StatGrid — a grid of KeyStat-style cards, used for side-by-side numbers.
 */
export function StatGrid({
  items,
}: {
  items: Array<{ value: ReactNode; label: ReactNode; note?: ReactNode }>;
}) {
  return (
    <div className="my-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="p-5 bg-surface border border-line rounded-lg"
        >
          <div className="text-3xl md:text-4xl font-bold tracking-tighter text-accent leading-none">
            {item.value}
          </div>
          <div className="text-xs text-ink-faint uppercase tracking-wider mt-2 font-semibold">
            {item.label}
          </div>
          {item.note && (
            <div className="text-xs text-ink-muted mt-2 leading-snug">
              {item.note}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * CalculatorCTA — an inline promo pointing readers to a specific calculator.
 * Shows up mid-article where the reader is ready to "try the math yourself."
 */
export function CalculatorCTA({
  name,
  slug,
  description,
}: {
  name: string;
  slug: string;
  description: string;
}) {
  return (
    <a
      href={`/${slug}`}
      className="my-8 flex items-start gap-4 p-5 bg-walnut rounded-lg text-white hover:opacity-95 transition-opacity no-underline"
    >
      <div className="flex-1">
        <div
          className="text-[11px] uppercase tracking-[0.12em] font-bold mb-2"
          style={{ color: "#D4691C" }}
        >
          Try the math yourself
        </div>
        <div className="text-lg font-semibold text-white mb-1">{name}</div>
        <div className="text-sm text-walnut-ink-muted leading-relaxed">
          {description}
        </div>
      </div>
      <div
        className="text-2xl font-bold leading-none mt-2 shrink-0"
        style={{ color: "#D4691C" }}
      >
        →
      </div>
    </a>
  );
}
