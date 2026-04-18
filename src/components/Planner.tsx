"use client";

import { useState, type ReactNode } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PlannerStep {
  id: string;
  title: string;
  /** Short context explaining why this step matters */
  context: string;
  /** The inputs this step needs — rendered as form fields */
  inputs: PlannerInput[];
}

export interface PlannerInput {
  id: string;
  label: string;
  type: "number" | "select";
  unit?: string;
  defaultValue: number | string;
  min?: number;
  max?: number;
  step?: number;
  options?: Array<{ label: string; value: string | number }>;
  help?: string;
}

export interface MaterialItem {
  category: string;
  item: string;
  quantity: string;
  unit: string;
  estimatedCost?: string;
}

export interface PlannerResult {
  /** Label for the group (e.g. "Decking boards", "Concrete footings") */
  group: string;
  items: MaterialItem[];
  subtotal?: string;
}

// ---------------------------------------------------------------------------
// Wizard component
// ---------------------------------------------------------------------------

export function PlannerWizard({
  steps,
  onComplete,
  children,
}: {
  steps: PlannerStep[];
  onComplete: (values: Record<string, number | string>) => void;
  children?: ReactNode;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState<Record<string, number | string>>(() => {
    const init: Record<string, number | string> = {};
    steps.forEach((step) =>
      step.inputs.forEach((input) => {
        init[input.id] = input.defaultValue;
      })
    );
    return init;
  });
  const [completed, setCompleted] = useState(false);

  const step = steps[currentStep];
  const isLast = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      setCompleted(true);
      onComplete(values);
    } else {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleRecalculate = () => {
    setCompleted(false);
    setCurrentStep(0);
  };

  if (completed) {
    return (
      <div>
        {children}
        <button
          onClick={handleRecalculate}
          className="mt-6 px-5 py-2.5 text-sm font-semibold text-accent border border-accent rounded-md hover:bg-accent hover:text-white transition-colors"
        >
          Start over with different dimensions
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Progress dots */}
      <div className="flex items-center gap-2 mb-6">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                i === currentStep
                  ? "bg-accent text-white"
                  : i < currentStep
                    ? "bg-accent/20 text-accent"
                    : "bg-bg-warm text-ink-faint"
              }`}
            >
              {i < currentStep ? "✓" : i + 1}
            </div>
            {i < steps.length - 1 && (
              <div
                className={`w-8 h-0.5 ${
                  i < currentStep ? "bg-accent/30" : "bg-line"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step header */}
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-[0.12em] text-accent font-bold mb-1">
          Step {currentStep + 1} of {steps.length}
        </p>
        <h3 className="text-xl font-bold tracking-tight text-ink mb-2">
          {step.title}
        </h3>
        <p className="text-sm text-ink-muted leading-relaxed">
          {step.context}
        </p>
      </div>

      {/* Inputs */}
      <div className="space-y-4 mb-6">
        {step.inputs.map((input) => (
          <div key={input.id}>
            <label
              htmlFor={input.id}
              className="block text-xs font-semibold text-ink-faint uppercase tracking-wider mb-1.5"
            >
              {input.label}
              {input.unit && (
                <span className="ml-1 normal-case text-ink-faint font-normal">
                  ({input.unit})
                </span>
              )}
            </label>
            {input.type === "select" ? (
              <select
                id={input.id}
                value={values[input.id]}
                onChange={(e) => {
                  const val = e.target.value;
                  setValues((v) => ({
                    ...v,
                    [input.id]:
                      isNaN(Number(val)) ? val : Number(val),
                  }));
                }}
                className="w-full px-3 py-2.5 bg-bg-warm border border-line-strong rounded-md text-sm text-ink focus:outline-none focus:border-accent transition-colors"
              >
                {input.options?.map((opt) => (
                  <option key={String(opt.value)} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={input.id}
                type="number"
                value={values[input.id]}
                min={input.min}
                max={input.max}
                step={input.step}
                onChange={(e) =>
                  setValues((v) => ({
                    ...v,
                    [input.id]: Number(e.target.value) || 0,
                  }))
                }
                className="w-full px-3 py-2.5 bg-bg-warm border border-line-strong rounded-md text-sm text-ink focus:outline-none focus:border-accent transition-colors"
              />
            )}
            {input.help && (
              <p className="text-xs text-ink-faint mt-1">{input.help}</p>
            )}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        {currentStep > 0 && (
          <button
            onClick={handleBack}
            className="px-5 py-2.5 text-sm font-semibold text-ink-muted border border-line rounded-md hover:border-accent hover:text-accent transition-colors"
          >
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          className="px-5 py-2.5 text-sm font-semibold bg-accent hover:bg-accent-hover text-white rounded-md transition-colors"
        >
          {isLast ? "Calculate full material list" : "Next step →"}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Material list results component
// ---------------------------------------------------------------------------

export function MaterialList({
  results,
  projectName,
}: {
  results: PlannerResult[];
  projectName: string;
}) {
  const [quote, setQuote] = useState("");
  const totalCost = results.reduce((sum, r) => {
    if (!r.subtotal) return sum;
    const num = parseFloat(r.subtotal.replace(/[$,]/g, ""));
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const quoteNum = parseFloat(quote.replace(/[$,]/g, ""));
  const gap = !isNaN(quoteNum) && quoteNum > 0 ? quoteNum - totalCost : null;

  return (
    <div>
      {/* Header */}
      <div className="bg-walnut rounded-lg p-6 md:p-8 text-white mb-6">
        <p
          className="text-[10px] uppercase tracking-[0.12em] font-bold mb-2"
          style={{ color: "#D4691C" }}
        >
          Complete material list
        </p>
        <h3 className="text-2xl font-bold tracking-tight mb-1">
          {projectName}
        </h3>
        {totalCost > 0 && (
          <p className="text-walnut-ink-muted text-sm">
            Estimated materials: ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </p>
        )}
      </div>

      {/* Result groups */}
      <div className="space-y-4 mb-8">
        {results.map((group) => (
          <div
            key={group.group}
            className="bg-surface border border-line rounded-lg overflow-hidden"
          >
            <div className="px-5 py-3 bg-bg-warm border-b border-line flex items-center justify-between">
              <h4 className="text-sm font-semibold text-ink">
                {group.group}
              </h4>
              {group.subtotal && (
                <span className="text-sm font-semibold text-accent">
                  ~${group.subtotal}
                </span>
              )}
            </div>
            <div className="divide-y divide-line">
              {group.items.map((item, i) => (
                <div
                  key={i}
                  className="px-5 py-3 flex items-center justify-between"
                >
                  <div>
                    <span className="text-sm text-ink">{item.item}</span>
                    {item.estimatedCost && (
                      <span className="text-xs text-ink-faint ml-2">
                        ~{item.estimatedCost}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-semibold text-ink">
                    {item.quantity}{" "}
                    <span className="text-ink-faint font-normal">
                      {item.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quote comparison (v1 quote checker) */}
      <div className="bg-bg-warm border border-line rounded-lg p-5 md:p-6">
        <h4 className="text-sm font-semibold text-ink mb-1">
          Got a contractor quote?
        </h4>
        <p className="text-xs text-ink-muted mb-3 leading-relaxed">
          Enter what you were quoted and we&apos;ll show how it compares
          to the estimated material cost. The difference is typically
          labor, markup, and overhead.
        </p>
        <div className="flex items-center gap-3 mb-3">
          <div className="relative flex-1 max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint text-sm">
              $
            </span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="e.g. 12,500"
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="w-full pl-7 pr-3 py-2.5 bg-surface border border-line-strong rounded-md text-sm text-ink focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>
        {gap !== null && (
          <div className="p-4 bg-surface border border-line rounded-md">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-ink">
                  ${totalCost.toLocaleString()}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-ink-faint font-semibold">
                  Materials
                </div>
              </div>
              <div>
                <div className="text-lg font-bold text-accent">
                  ${Math.abs(gap).toLocaleString()}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-ink-faint font-semibold">
                  {gap >= 0 ? "Labor + markup" : "Below material cost"}
                </div>
              </div>
              <div>
                <div className="text-lg font-bold text-ink">
                  ${quoteNum.toLocaleString()}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-ink-faint font-semibold">
                  Contractor quote
                </div>
              </div>
            </div>
            {gap > 0 && totalCost > 0 && (
              <p className="text-xs text-ink-muted mt-3 text-center">
                Labor and markup is{" "}
                <strong>
                  {Math.round((gap / totalCost) * 100)}% of material cost
                </strong>
                .{" "}
                {gap / totalCost < 0.5
                  ? "This is within the typical range (30–60%)."
                  : gap / totalCost < 0.8
                    ? "This is on the higher side. Consider getting a second quote."
                    : "This is significantly above typical markup. Ask for an itemized breakdown."}
              </p>
            )}
            {gap < 0 && (
              <p className="text-xs text-ink-muted mt-3 text-center">
                The quote is below estimated material cost. This could
                mean cheaper materials, a loss-leader bid, or missing
                scope items. Ask what&apos;s included.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
