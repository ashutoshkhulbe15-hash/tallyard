"use client";

import { useMemo, useState } from "react";
import { useUnits } from "@/lib/units";
import { formatNumber } from "@/lib/format";
import { getConfig } from "@/configs";
import type { CalculatorConfig } from "@/lib/types";

interface CalculatorProps {
  slug: string;
}

export function Calculator({ slug }: CalculatorProps) {
  const { units } = useUnits();
  const config = getConfig(slug);

  const [values, setValues] = useState<Record<string, number | string>>(() => {
    const initial: Record<string, number | string> = {};
    if (!config) return initial;
    config.inputs.forEach((input) => {
      const defaultVal =
        units === "metric" && input.defaultMetric !== undefined
          ? input.defaultMetric
          : input.defaultImperial;
      initial[input.id] = defaultVal;
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
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {config.inputs.map((input) => {
          const unitLabel = getUnitLabel(input);
          return (
            <div key={input.id}>
              <label
                htmlFor={input.id}
                className="block text-sm font-semibold text-ink-muted mb-1.5"
              >
                {input.label}
                {unitLabel && (
                  <span className="text-ink-faint ml-1 font-mono text-xs font-normal">
                    ({unitLabel})
                  </span>
                )}
              </label>
              {input.type === "number" ? (
                <input
                  type="number"
                  id={input.id}
                  value={values[input.id] as number}
                  min={input.min}
                  max={input.max}
                  step={input.step || "any"}
                  onChange={(e) => {
                    const val =
                      e.target.value === "" ? "" : parseFloat(e.target.value);
                    updateValue(input.id, isNaN(val as number) ? "" : val);
                  }}
                  className="w-full bg-surface-alt border border-line-strong rounded-md px-3.5 py-2.5 text-base font-mono font-medium focus:border-accent focus:outline-none focus:bg-surface transition-colors"
                  inputMode="decimal"
                />
              ) : (
                <select
                  id={input.id}
                  value={values[input.id] as string | number}
                  onChange={(e) => updateValue(input.id, e.target.value)}
                  className="w-full bg-surface-alt border border-line-strong rounded-md px-3.5 py-2.5 text-base font-medium focus:border-accent focus:outline-none focus:bg-surface transition-colors appearance-none cursor-pointer"
                  style={{
                    backgroundImage:
                      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\' viewBox=\'0 0 12 8\'%3E%3Cpath fill=\'none\' stroke=\'%23525252\' stroke-width=\'1.5\' d=\'M1 1.5L6 6.5L11 1.5\'/%3E%3C/svg%3E")',
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                    paddingRight: "32px",
                  }}
                >
                  {input.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}
              {input.help && (
                <p className="text-xs text-ink-faint mt-1.5">{input.help}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Orange gradient result card — the D2 signature */}
      {result && (
        <div
          className="rounded-lg p-6 text-white"
          style={{
            background: "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-white/80 mb-1.5 font-semibold">
                You need
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold font-mono tracking-tighter leading-none">
                  {formatNumber(result.valueRounded)}
                </span>
                <span className="text-base text-white/80 font-sans font-normal">
                  {result.unit}
                </span>
              </div>
              {result.value !== result.valueRounded && (
                <div className="text-xs text-white/70 mt-1.5 font-mono">
                  exact: {formatNumber(result.value, 3)} {result.unit}
                </div>
              )}
            </div>
            {result.breakdown.length > 0 && (
              <div className="text-sm text-white/90 space-y-0.5 sm:text-right font-mono">
                {result.breakdown.map((b, i) => (
                  <div key={i}>
                    <span className="text-white/70">{b.label}:</span> {b.value}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {result && result.formulaSteps.length > 0 && (
        <details className="group">
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

      <div className="text-xs text-ink-faint font-mono pt-1">
        {config.formulaDescription}
      </div>
    </div>
  );
}
