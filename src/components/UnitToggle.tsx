"use client";

import { useUnits } from "@/lib/units";

export function UnitToggle() {
  const { units, setUnits } = useUnits();

  return (
    <div
      className="inline-flex items-center bg-white/8 rounded-full p-0.5 text-xs"
      role="group"
      aria-label="Unit system"
      style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
    >
      <button
        type="button"
        onClick={() => setUnits("imperial")}
        aria-pressed={units === "imperial"}
        className={`px-2.5 py-1 rounded-full transition-colors font-medium ${
          units === "imperial"
            ? "bg-white text-dark"
            : "text-dark-ink-muted hover:text-white"
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
            ? "bg-white text-dark"
            : "text-dark-ink-muted hover:text-white"
        }`}
      >
        m · L
      </button>
    </div>
  );
}
