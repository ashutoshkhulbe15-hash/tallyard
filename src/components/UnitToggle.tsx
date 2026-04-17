"use client";

import { useUnits } from "@/lib/units";

export function UnitToggle() {
  const { units, setUnits } = useUnits();

  return (
    <div
      className="inline-flex items-center bg-surface-alt border border-line rounded-full p-0.5 text-xs"
      role="group"
      aria-label="Unit system"
    >
      <button
        type="button"
        onClick={() => setUnits("imperial")}
        aria-pressed={units === "imperial"}
        className={`px-2.5 py-1 rounded-full transition-colors font-medium ${
          units === "imperial"
            ? "bg-surface text-ink shadow-soft"
            : "text-ink-faint hover:text-ink"
        }`}
      >
        ft · gal
      </button>
      <button
        type="button"
        onClick={() => setUnits("metric")}
        aria-pressed={units === "metric"}
        className={`px-2.5 py-1 rounded-full transition-colors font-medium ${
          units === "metric"
            ? "bg-surface text-ink shadow-soft"
            : "text-ink-faint hover:text-ink"
        }`}
      >
        m · L
      </button>
    </div>
  );
}
