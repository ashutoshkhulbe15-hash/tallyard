/**
 * Core type definitions for the calculator engine.
 * Each calculator is a CalculatorConfig object. The engine reads it
 * and renders the full page: banner, inputs, result, methodology, FAQ.
 */

export type UnitSystem = "imperial" | "metric";
export type InputType = "number" | "select";

export interface InputOption {
  label: string;
  value: string | number;
}

export interface CalculatorInput {
  id: string;
  label: string;
  type: InputType;
  unitImperial?: string;
  unitMetric?: string;
  defaultImperial: number | string;
  defaultMetric?: number | string;
  min?: number;
  max?: number;
  step?: number;
  options?: InputOption[];
  help?: string;
}

export interface CompositionSegment {
  label: string;
  /** The amount for this segment (in the result's unit of area/volume) */
  amount: number;
  /** Display color: 'primary' | 'secondary' | 'tertiary' — maps to terracotta shades */
  shade?: "primary" | "secondary" | "tertiary";
}

export interface CalculatorResult {
  /** Primary number to display (e.g. 2.8) */
  value: number;
  /** Unit label for the primary number (e.g. "gallons") */
  unit: string;
  /** Rounded-up for practical purchasing */
  valueRounded: number;
  /** Supporting stat rows (wall area, coverage, etc.) */
  breakdown: Array<{ label: string; value: string }>;
  /** Human-readable formula trace, step by step */
  formulaSteps: string[];
  /** Optional compositional breakdown for the bar chart */
  composition?: {
    /** The unit label for composition values (e.g. "sq ft") */
    unit: string;
    /** Total of all segments for labeling */
    total: number;
    /** The actual segments */
    segments: CompositionSegment[];
  };
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

/** Category identifies which illustration motif to use (one per vertical) */
export type CalculatorCategory =
  | "paint"
  | "concrete"
  | "flooring"
  | "landscaping"
  | "roofing"
  | "hvac"
  | "drywall"
  | "solar";

export interface CalculatorConfig {
  slug: string;
  title: string;
  description: string;
  categoryLabel: string;
  category: CalculatorCategory;

  /** V3 banner headline — e.g. "Paint smarter." The last word is styled italic. */
  bannerHeadline: string;
  /** V3 banner tags — 3 short feature chips */
  bannerTags: string[];

  inputs: CalculatorInput[];

  calculate: (
    values: Record<string, number | string>,
    units: UnitSystem
  ) => CalculatorResult;

  formulaDescription: string;
  methodology: string[];
  sources: CalculatorSource[];
  related: RelatedCalculator[];
  faq: CalculatorFAQ[];

  /** Optional links to related guides (rendered as a separate section) */
  relatedGuides?: Array<{
    name: string;
    slug: string;
    description: string;
  }>;

  /** Optional rich content expansion — rendered as a full article section
   *  below methodology and above FAQ. Uses guide-prose styling. */
  ContentExpansion?: React.ComponentType;
}
