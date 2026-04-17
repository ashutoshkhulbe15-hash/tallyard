"use client";

import { useMemo, useState } from "react";
import { useUnits } from "@/lib/units";
import { formatNumber } from "@/lib/format";
import { getConfig } from "@/configs";
import type { CalculatorConfig } from "@/lib/types";

interface CalculatorProps {
  slug: string;
}

/**
 * V3 calculator: split two-column layout on desktop, stacked on mobile
 * with result first. Inputs on the left in a cream card. Dark walnut
 * result card on the right with huge number, unit, and composition bar.
 */
export function Calculator({ slug }: CalculatorProps) {
  const { units } = useUnits();
  const config = getConfig(slug);

  const [values, setValues] = useState<Record<string, number | string>>(() => {
    const initial: Record<string, number | string> = {};
    if (!config) return initial;
    config.inputs.forEach((input) => {
      initial[input.id] =
        units === "metric" && input.defaultMetric !== undefined
          ? input.defaultMetric
          : input.defaultImperial;
    });
    return initial;
  });

  const [prevUnits, setPrevUnits] = useState(units);
  if (prevUnits !== units && config) {
    const updated: Record<string, number | string> = { ...values };
    config.inputs.forEach((input) => {
      if (input.type === "number" && input.defaultMetric !== undefined) {
        const prevDefault =
          prevUnits === "metric" ? input.defaultMetric : input.defaultImperial;
        if (values[input.id] === prevDefault) {
          updated[input.id] =
            units === "metric" ? input.defaultMetric : input.defaultImperial;
        }
      }
    });
    setValues(updated);
    setPrevUnits(units);
  }

  const result = useMemo(() => {
    if (!config) return null;
    try {
      return config.calculate(values, units);
    } catch {
      return null;
    }
  }, [values, units, config]);

  if (!config) {
    return (
      <div className="p-4 bg-surface-alt border border-line rounded-md text-sm text-ink-muted">
        Calculator configuration missing.
      </div>
    );
  }

  const updateValue = (id: string, value: string | number) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const getUnitLabel = (input: CalculatorConfig["inputs"][0]): string => {
    if (units === "metric" && input.unitMetric) return input.unitMetric;
    if (input.unitImperial) return input.unitImperial;
    return "";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-7">
      {/* Result card — appears first on mobile so answer is visible immediately */}
      <div className="lg:order-2 bg-walnut walnut-section rounded-lg p-7 md:p-8 text-white flex flex-col">
        {result && (
          <>
            <div
              className="text-xs uppercase tracking-[0.12em] font-bold mb-2.5"
              style={{ color: "#D4691C" }}
            >
              You need
            </div>
            <div className="text-5xl md:text-6xl font-bold tracking-tighter leading-none mb-1">
              {formatNumber(result.valueRounded)}
            </div>
            <div className="text-base md:text-lg text-walnut-ink-muted font-medium mb-7">
              {result.unit}
            </div>

            {/* Composition bar */}
            {result.composition && result.composition.segments.length > 0 && (
              <div className="mb-5">
                <div className="flex justify-between items-baseline text-xs text-walnut-ink-muted mb-3 font-mono">
                  <span>Composition</span>
                  <span>
                    <strong className="text-white font-semibold">
                      {formatNumber(result.composition.total, 0)}
                    </strong>{" "}
                    {result.composition.unit}
                  </span>
                </div>
                <div
                  className="h-2 rounded-sm overflow-hidden flex"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  {result.composition.segments.map((seg, i) => {
                    const pct =
                      (seg.amount / result.composition!.total) * 100;
                    const color =
                      seg.shade === "primary"
                        ? "#D4691C"
                        : seg.shade === "secondary"
                          ? "#A09580"
                          : "#6B5E43";
                    return (
                      <div
                        key={i}
                        style={{ width: `${pct}%`, backgroundColor: color }}
                      />
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-xs">
                  {result.composition.segments.map((seg, i) => {
                    const color =
                      seg.shade === "primary"
                        ? "#D4691C"
                        : seg.shade === "secondary"
                          ? "#A09580"
                          : "#6B5E43";
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-walnut-ink-muted"
                      >
                        <div
                          className="w-2 h-2 rounded-sm"
                          style={{ backgroundColor: color }}
                        />
                        {seg.label}{" "}
                        <strong className="text-white font-medium font-mono ml-0.5">
                          {formatNumber(seg.amount, 0)}
                        </strong>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Plain stat rows (used when composition is not provided) */}
            {!result.composition && result.breakdown.length > 0 && (
              <div
                className="rounded-md p-4"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                {result.breakdown.map((b, i) => (
                  <div
                    key={i}
                    className="flex justify-between py-2 text-sm font-mono"
                    style={{
                      borderBottom:
                        i < result.breakdown.length - 1
                          ? "1px solid rgba(255,255,255,0.06)"
                          : "none",
                    }}
                  >
                    <span className="text-walnut-ink-muted">{b.label}</span>
                    <span className="text-white font-medium">{b.value}</span>
                  </div>
                ))}
              </div>
            )}

            {result.value !== result.valueRounded && (
              <div className="text-xs text-walnut-ink-faint mt-4 font-mono">
                exact: {formatNumber(result.value, 3)} {result.unit}
              </div>
            )}
          </>
        )}
      </div>

      {/* Input card */}
      <div className="lg:order-1 bg-surface border border-line rounded-lg p-6 md:p-7 shadow-soft">
        <div className="space-y-5">
          {config.inputs.map((input) => {
            const unitLabel = getUnitLabel(input);
            return (
              <div key={input.id}>
                <label
                  htmlFor={input.id}
                  className="block text-xs text-ink-faint font-semibold uppercase tracking-wider mb-2"
                >
                  {input.label}
                </label>
                {input.type === "number" ? (
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        id={input.id}
                        value={values[input.id] as number}
                        min={input.min}
                        max={input.max}
                        step={input.step || "any"}
                        onChange={(e) => {
                          const val =
                            e.target.value === ""
                              ? ""
                              : parseFloat(e.target.value);
                          updateValue(
                            input.id,
                            isNaN(val as number) ? "" : val
                          );
                        }}
                        className="w-full bg-bg border border-line rounded-md px-3.5 py-2.5 text-base font-mono font-semibold text-ink focus:border-accent focus:outline-none focus:bg-surface transition-colors"
                        inputMode="decimal"
                      />
                      {unitLabel && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint font-mono pointer-events-none">
                          {unitLabel}
                        </span>
                      )}
                    </div>
                    <div className="bg-walnut text-white rounded-md px-3.5 py-2 text-sm font-semibold font-mono min-w-[60px] text-center">
                      {values[input.id] === "" ? "—" : values[input.id]}
                    </div>
                  </div>
                ) : (
                  <SegmentedSelect
                    input={input}
                    value={values[input.id]}
                    onChange={(v) => updateValue(input.id, v)}
                  />
                )}
                {input.help && (
                  <p className="text-xs text-ink-faint mt-1.5">{input.help}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Formula trace */}
        {result && result.formulaSteps.length > 0 && (
          <details className="group mt-6 pt-5 border-t border-line">
            <summary className="cursor-pointer text-sm text-ink-muted hover:text-ink flex items-center gap-1.5 select-none font-medium">
              <span className="transition-transform group-open:rotate-90 inline-block">
                ›
              </span>
              Show the math
            </summary>
            <div className="mt-3 p-4 bg-surface-alt border border-line rounded-md font-mono text-xs text-ink-muted space-y-1 overflow-x-auto">
              {result.formulaSteps.map((step, i) => (
                <div key={i}>{step}</div>
              ))}
            </div>
          </details>
        )}

        <div className="text-xs text-ink-faint font-mono pt-3 mt-1">
          {config.formulaDescription}
        </div>
      </div>
    </div>
  );
}

/**
 * Segmented button group for select-type inputs. Renders each option
 * as a button, with the current value styled terracotta.
 */
function SegmentedSelect({
  input,
  value,
  onChange,
}: {
  input: CalculatorConfig["inputs"][0];
  value: string | number;
  onChange: (v: string | number) => void;
}) {
  if (!input.options) return null;
  const count = input.options.length;
  const colClass =
    count <= 2
      ? "grid-cols-2"
      : count === 3
        ? "grid-cols-3"
        : count === 4
          ? "grid-cols-4"
          : "grid-cols-2";

  return (
    <div className={`grid ${colClass} gap-2`}>
      {input.options.map((opt) => {
        const isOn = String(value) === String(opt.value);
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-3 py-2.5 rounded-md text-sm font-semibold transition-colors border ${
              isOn
                ? "bg-accent text-white border-accent"
                : "bg-bg text-ink border-line hover:border-accent hover:text-accent"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
