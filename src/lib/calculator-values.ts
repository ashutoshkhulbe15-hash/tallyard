import type { CalculatorConfig, CalculatorInput, CalculatorResult, UnitSystem } from "./types";

// Factors convert imperial field values to the metric units declared by that field.
// The temperature field is a temperature rise, so it uses a scale without an offset.
const metricFactors: Record<string, number> = {
  "ft:m": 0.3048,
  "in:cm": 2.54,
  "in:mm": 25.4,
  "ft²:m²": 0.09290304,
  "ft²/package:m²/package": 0.09290304,
  "ft²/roll:m²/roll": 0.09290304,
  "ft²/gal:m²/L": 0.09290304 / 3.785411784,
  "bricks/ft²:bricks/m²": 1 / 0.09290304,
  "GPM:L/min": 3.785411784,
  "°F:°C": 5 / 9,
  "gal:L": 3.785411784,
};

export function convertCalculatorValues(
  inputs: CalculatorInput[],
  values: Record<string, number | string>,
  from: UnitSystem,
  to: UnitSystem,
): Record<string, number | string> {
  if (from === to) return { ...values };
  return Object.fromEntries(inputs.map((input) => {
    const value = values[input.id];
    if (input.type !== "number" || value === "" || !Number.isFinite(Number(value))) return [input.id, value];
    if (!input.unitImperial || !input.unitMetric || input.unitImperial === input.unitMetric) return [input.id, value];
    const factor = metricFactors[`${input.unitImperial}:${input.unitMetric}`];
    if (!factor) throw new Error(`Unsupported unit conversion for ${input.label}.`);
    const converted = Number(value) * (to === "metric" ? factor : 1 / factor);
    return [input.id, Number(converted.toPrecision(12))];
  }));
}

export function getCalculatorInputBounds(input: CalculatorInput, units: UnitSystem) {
  const factor = units === "metric" && input.unitImperial && input.unitMetric && input.unitImperial !== input.unitMetric ? metricFactors[`${input.unitImperial}:${input.unitMetric}`] : 1;
  if (!factor) throw new Error(`Unsupported unit conversion for ${input.label}.`);
  return { min: input.min === undefined ? undefined : input.min * factor, max: input.max === undefined ? undefined : input.max * factor };
}

export function validateCalculatorValues(config: CalculatorConfig, values: Record<string, number | string>, units: UnitSystem = "imperial"): void {
  for (const input of config.inputs) {
    const value = values[input.id];
    if (input.type === "number") {
      if (value === "" || value === undefined || !Number.isFinite(Number(value))) throw new Error(`Enter a finite number for ${input.label}.`);
      const number = Number(value);
      const bounds = getCalculatorInputBounds(input, units);
      if (bounds.min !== undefined && number < bounds.min) throw new Error(`${input.label} must be at least ${bounds.min}.`);
      if (bounds.max !== undefined && number > bounds.max) throw new Error(`${input.label} must be at most ${bounds.max}.`);
      if (input.step === 1 && (!input.unitImperial || input.unitImperial === "units") && !Number.isInteger(number)) throw new Error(`${input.label} must be a whole number.`);
    } else if (!input.options?.some((option) => String(option.value) === String(value))) {
      throw new Error(`Choose a listed option for ${input.label}.`);
    }
  }
}

export function validateCalculatorResult(result: CalculatorResult): void {
  if (!Number.isFinite(result.value) || !Number.isFinite(result.valueRounded) ||
      (result.composition && (!Number.isFinite(result.composition.total) || result.composition.segments.some((segment) => !Number.isFinite(segment.amount))))) {
    throw new Error("These inputs exceed the supported calculation range. Reduce the values and try again.");
  }
}
