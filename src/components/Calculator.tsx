"use client";

import { useEffect, useMemo, useState } from "react";
import { useUnits } from "@/lib/units";
import { formatNumber } from "@/lib/format";
import type { CalculatorConfig } from "@/lib/types";

interface CalculatorProps {
  slug: string;
  /** Panel header title, e.g. "Lumber calculator". Falls back to config.title. */
  panelTitle?: string;
}

/**
 * Ledger calculator panel: a single white instrument card.
 * Head strip (title + formula badge) → mono input fields →
 * a live receipt that recalculates line by line → total → actions.
 *
 * Config is loaded dynamically per slug via webpack code splitting,
 * so each page's client bundle only pulls its own calculator.
 */
export function Calculator({ slug, panelTitle }: CalculatorProps) {
  const { units } = useUnits();
  const [config, setConfig] = useState<CalculatorConfig | null>(null);

  useEffect(() => {
    let cancelled = false;
    import(`../configs/${slug}`)
      .then((mod) => {
        if (cancelled) return;
        const found = Object.values(mod).find(
          (v): v is CalculatorConfig =>
            v !== null &&
            typeof v === "object" &&
            "slug" in (v as object) &&
            (v as CalculatorConfig).slug === slug
        );
        if (found) setConfig(found);
      })
      .catch(() => {
        // Fail silently — loading state remains visible
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const [values, setValues] = useState<Record<string, number | string>>({});
  const [valuesInit, setValuesInit] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!config || valuesInit) return;
    const params = new URLSearchParams(window.location.search);
    const initial: Record<string, number | string> = {};
    config.inputs.forEach((input) => {
      const paramVal = params.get(input.id);
      if (paramVal !== null) {
        initial[input.id] =
          input.type === "number" ? Number(paramVal) || input.defaultImperial : paramVal;
      } else {
        initial[input.id] =
          units === "metric" && input.defaultMetric !== undefined
            ? input.defaultMetric
            : input.defaultImperial;
      }
    });
    setValues(initial);
    setValuesInit(true);
  }, [config, units, valuesInit]);

  const [prevUnits, setPrevUnits] = useState(units);
  if (prevUnits !== units && config && valuesInit) {
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
    if (!config || !valuesInit) return null;
    try {
      return config.calculate(values, units);
    } catch {
      return null;
    }
  }, [values, units, config, valuesInit]);

  // Loading skeleton — same panel silhouette so the page doesn't jump.
  if (!config) {
    return (
      <div className="bg-surface border border-line rounded-lg shadow-receipt overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-line bg-surface-alt">
          <div className="h-4 w-36 bg-bg-warm rounded animate-pulse" />
          <div className="h-5 w-24 bg-bg-warm rounded-full animate-pulse" />
        </div>
        <div className="p-6 space-y-4 min-h-[320px]">
          {[1, 2, 3, 4].map((i) => (
            <div key={i}>
              <div className="h-2.5 w-20 bg-bg-warm rounded mb-2 animate-pulse" />
              <div className="h-11 bg-bg-warm rounded animate-pulse" />
            </div>
          ))}
        </div>
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
    <div className="bg-surface border border-line rounded-lg shadow-receipt overflow-hidden">
      {/* Panel head */}
      <div
        className="flex justify-between items-center gap-3 px-6 py-4 border-b border-line"
        style={{ background: "linear-gradient(#FCFDFB,#F6F8F4)" }}
      >
        <span className="text-sm font-semibold text-ink">
          {panelTitle || config.title}
        </span>
        <span className="font-mono text-[11px] text-accent bg-accent-soft px-2.5 py-1 rounded-full whitespace-nowrap">
          ✓ formula shown
        </span>
      </div>

      {/* Fields */}
      <div className="p-6 pb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {config.inputs.map((input) => {
            const unitLabel = getUnitLabel(input);
            const spanFull =
              input.type !== "number" &&
              input.options &&
              input.options.some((o) => o.label.length > 14);
            return (
              <div
                key={input.id}
                className={spanFull ? "sm:col-span-2" : undefined}
              >
                <label
                  htmlFor={input.id}
                  className="block font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-muted mb-1.5"
                >
                  {input.label}
                </label>
                {input.type === "number" ? (
                  <div className="relative">
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
                      className="w-full bg-bg border border-line rounded px-3 py-2.5 text-[14.5px] font-mono text-ink focus:border-accent focus:outline-none transition-colors"
                      inputMode="decimal"
                    />
                    {unitLabel && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-faint font-mono pointer-events-none">
                        {unitLabel}
                      </span>
                    )}
                  </div>
                ) : (
                  <LedgerSelect
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

        {/* The receipt */}
        {result && (
          <div className="mt-6 pt-2 border-t border-dashed border-line font-mono text-[13px]">
            {result.breakdown.map((b, i) => (
              <div
                key={i}
                className="flex justify-between gap-4 py-2 border-b border-dashed border-line"
              >
                <span className="text-ink-muted lowercase">{b.label}</span>
                <span className="text-ink text-right">{b.value}</span>
              </div>
            ))}

            {/* Composition segments render as receipt lines + a slim bar */}
            {result.composition && result.composition.segments.length > 0 && (
              <>
                {result.composition.segments.map((seg, i) => (
                  <div
                    key={i}
                    className="flex justify-between gap-4 py-2 border-b border-dashed border-line"
                  >
                    <span className="text-ink-muted lowercase">{seg.label}</span>
                    <span className="text-ink text-right">
                      {formatNumber(seg.amount, 0)} {result.composition!.unit}
                    </span>
                  </div>
                ))}
                <div className="h-1.5 rounded-sm overflow-hidden flex mt-3">
                  {result.composition.segments.map((seg, i) => {
                    const pct =
                      (seg.amount / result.composition!.total) * 100;
                    const color =
                      seg.shade === "primary"
                        ? "#147A46"
                        : seg.shade === "secondary"
                          ? "#9BA8A0"
                          : "#B9791A";
                    return (
                      <div
                        key={i}
                        style={{ width: `${pct}%`, backgroundColor: color }}
                      />
                    );
                  })}
                </div>
              </>
            )}

            {/* Total */}
            <div className="flex justify-between items-baseline gap-4 pt-4 pb-0.5">
              <span className="text-[11px] uppercase tracking-[0.14em] text-accent font-medium">
                You need
              </span>
              <span className="text-2xl md:text-3xl font-bold text-ink tracking-tight text-right">
                {formatNumber(result.valueRounded)}{" "}
                <span className="text-base font-medium text-ink-muted">
                  {result.unit}
                </span>
              </span>
            </div>
            {result.value !== result.valueRounded && (
              <div className="flex justify-end pb-1 text-xs text-ink-faint">
                exact: {formatNumber(result.value, 3)} {result.unit}
              </div>
            )}
          </div>
        )}

        {/* Show the math */}
        {result && result.formulaSteps.length > 0 && (
          <details className="group mt-4 mb-1">
            <summary className="cursor-pointer text-[13px] text-ink-muted hover:text-ink flex items-center gap-1.5 select-none font-medium">
              <span className="transition-transform group-open:rotate-90 inline-block">
                ›
              </span>
              Show the math
            </summary>
            <div className="mt-2 p-3.5 bg-surface-alt border border-line rounded font-mono text-xs text-ink-muted space-y-1 overflow-x-auto">
              {result.formulaSteps.map((step, i) => (
                <div key={i}>{step}</div>
              ))}
            </div>
          </details>
        )}
      </div>

      {/* Panel foot */}
      <div className="flex gap-2.5 p-6 pt-5">
        <button
          onClick={() => {
            const params = new URLSearchParams();
            Object.entries(values).forEach(([k, v]) => params.set(k, String(v)));
            const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
            navigator.clipboard.writeText(shareUrl).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            });
          }}
          className="flex-1 bg-ink text-bg text-sm font-semibold py-3 rounded hover:bg-walnut-soft transition-colors"
        >
          {copied ? "✓ Copied!" : "Copy link with my inputs"}
        </button>
        <button
          onClick={() => window.print()}
          className="px-4 bg-surface border border-line text-ink text-sm font-semibold py-3 rounded hover:border-accent hover:text-accent transition-colors"
        >
          Print
        </button>
      </div>
    </div>
  );
}

/**
 * Ledger-style select for option inputs: a native <select> in mono
 * on paper background, matching number inputs. Replaces the old
 * segmented pill buttons.
 */
function LedgerSelect({
  input,
  value,
  onChange,
}: {
  input: CalculatorConfig["inputs"][0];
  value: string | number;
  onChange: (v: string | number) => void;
}) {
  if (!input.options) return null;
  return (
    <div className="relative">
      <select
        id={input.id}
        value={String(value)}
        onChange={(e) => {
          const opt = input.options!.find(
            (o) => String(o.value) === e.target.value
          );
          onChange(opt ? opt.value : e.target.value);
        }}
        className="w-full appearance-none bg-bg border border-line rounded px-3 py-2.5 pr-8 text-[14.5px] font-mono text-ink focus:border-accent focus:outline-none transition-colors cursor-pointer"
      >
        {input.options.map((opt) => (
          <option key={opt.value} value={String(opt.value)}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none text-xs">
        ▾
      </span>
    </div>
  );
}
