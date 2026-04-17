import type { CalculatorConfig } from "@/lib/types";
import { paintCalculatorConfig } from "./paint-calculator";
import { concreteCalculatorConfig } from "./concrete-calculator";
import { tileCalculatorConfig } from "./tile-calculator";
import { mulchCalculatorConfig } from "./mulch-calculator";
import { drywallCalculatorConfig } from "./drywall-calculator";
import { roofingCalculatorConfig } from "./roofing-calculator";
import { btuCalculatorConfig } from "./btu-calculator";
import { gravelCalculatorConfig } from "./gravel-calculator";

export const configs: Record<string, CalculatorConfig> = {
  "paint-calculator": paintCalculatorConfig,
  "concrete-calculator": concreteCalculatorConfig,
  "tile-calculator": tileCalculatorConfig,
  "mulch-calculator": mulchCalculatorConfig,
  "drywall-calculator": drywallCalculatorConfig,
  "roofing-calculator": roofingCalculatorConfig,
  "btu-calculator": btuCalculatorConfig,
  "gravel-calculator": gravelCalculatorConfig,
};

export function getConfig(slug: string): CalculatorConfig | null {
  return configs[slug] || null;
}
