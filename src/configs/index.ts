/**
 * Central registry of all calculator configs, keyed by slug.
 *
 * This is imported by the client-side Calculator component so it can
 * look up its config (including the calculate function) by slug. This
 * pattern avoids passing functions across the Server → Client boundary.
 *
 * When adding a new calculator: import its config here and add it to
 * the map. The registry is the single source of truth.
 */

import type { CalculatorConfig } from "@/lib/types";
import { paintCalculatorConfig } from "./paint-calculator";

export const configs: Record<string, CalculatorConfig> = {
  "paint-calculator": paintCalculatorConfig,
};

export function getConfig(slug: string): CalculatorConfig | null {
  return configs[slug] || null;
}
