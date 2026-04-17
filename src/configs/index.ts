import type { CalculatorConfig } from "@/lib/types";
import { paintCalculatorConfig } from "./paint-calculator";
import { concreteCalculatorConfig } from "./concrete-calculator";
import { tileCalculatorConfig } from "./tile-calculator";
import { mulchCalculatorConfig } from "./mulch-calculator";

export const configs: Record<string, CalculatorConfig> = {
  "paint-calculator": paintCalculatorConfig,
  "concrete-calculator": concreteCalculatorConfig,
  "tile-calculator": tileCalculatorConfig,
  "mulch-calculator": mulchCalculatorConfig,
};

export function getConfig(slug: string): CalculatorConfig | null {
  return configs[slug] || null;
}
