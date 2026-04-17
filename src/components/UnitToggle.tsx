"use client";

import { useUnits } from "@/lib/units";

export function UnitToggle() {
  const { units, setUnits } = useUnits();

  return (
    <div
      className="inline-flex items-center bg-bg border border-line rounded-md p-0.5 text-xs"
      role="group"
      aria-label="Unit system"
    >
      <button
        type="button"
        onClick={() => setUnits("imperial")}
        aria-pressed={units === "imperial"}
        className={`px-2.5 py-1 rounded transition-colors ${
          units === "imperial"
            ? "bg-surface text-ink shadow-sm border border-line"
            : "text-ink-muted hover:text-ink"
        }`}
      >
        ft · gal
      </button>
      <button
        type="button"
        onClick={() => setUnits("metric")}
        aria-pressed={units === "metric"}
        className={`px-2.5 py-1 rounded transition-colors ${
          units === "metric"
            ? "bg-surface text-ink shadow-sm border border-line"
            : "text-ink-muted hover:text-ink"
        }`}
      >
        m · L
      </button>
    </div>
  );
}
