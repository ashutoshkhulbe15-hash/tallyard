/**
 * Core type definitions for the calculator engine.
 *
 * Every calculator in Tallyard is defined by a CalculatorConfig object.
 * The engine reads the config and renders the full page: inputs, formula,
 * result, methodology, FAQ, related calculators.
 */

export type UnitSystem = "imperial" | "metric";

export type InputType = "number" | "select";

export interface InputOption {
  label: string;
  value: string | number;
}

export interface CalculatorInput {
  /** Unique identifier used in the formula (e.g. "length", "coats") */
  id: string;
  /** Label shown to the user */
  label: string;
  /** Input type — most are numbers, some are selects */
  type: InputType;
  /** Imperial unit label (e.g. "ft", "gal", "lb") */
  unitImperial?: string;
  /** Metric unit label (e.g. "m", "L", "kg") */
  unitMetric?: string;
  /** Default value in imperial units — Option B requires sensible defaults */
  defaultImperial: number | string;
  /** Default value in metric units */
  defaultMetric?: number | string;
  /** Minimum allowed value */
  min?: number;
  /** Maximum allowed value */
  max?: number;
  /** Step for number inputs */
  step?: number;
  /** Options for select inputs */
  options?: InputOption[];
  /** Short help text shown under the input */
  help?: string;
}

export interface CalculatorResult {
  /** Primary number to display (e.g. 2.8) */
  value: number;
  /** Unit label for the primary number (e.g. "gallons") */
  unit: string;
  /** Rounded-up version for practical purchasing */
  valueRounded: number;
  /** Supporting breakdown (wall area, coverage, etc.) */
  breakdown: Array<{ label: string; value: string }>;
  /** The human-readable formula trace — shows the math step by step */
  formulaSteps: string[];
}

export interface CalculatorFAQ {
  question: string;
  answer: string;
}

export interface RelatedCalculator {
  name: string;
  slug: string;
  description: string;
}

export interface CalculatorSource {
  name: string;
  url?: string;
  note?: string;
}

export interface CalculatorConfig {
  /** URL slug — becomes the path (e.g. "paint-calculator") */
  slug: string;
  /** H1 title — e.g. "Paint Calculator" */
  title: string;
  /** Short description for SEO and subheading */
  description: string;
  /** The category breadcrumb (e.g. "Paint") */
  category: string;
  /** All inputs for this calculator */
  inputs: CalculatorInput[];
  /**
   * The calculation function. Takes input values keyed by input.id
   * plus the current unit system. Returns a structured result.
   */
  calculate: (
    values: Record<string, number | string>,
    units: UnitSystem
  ) => CalculatorResult;
  /** Human-readable formula description (e.g. "gallons = area × coats ÷ 350") */
  formulaDescription: string;
  /** Methodology notes — explains the assumptions */
  methodology: string[];
  /** Sources for coverage rates / factors */
  sources: CalculatorSource[];
  /** Related calculators to cross-link */
  related: RelatedCalculator[];
  /** FAQ entries — also used for FAQPage schema */
  faq: CalculatorFAQ[];
}
