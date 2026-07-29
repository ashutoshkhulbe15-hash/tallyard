import type { GuideConfig } from "@/lib/guides-types";
import { vinylVsFiberCementGuide } from "./vinyl-vs-fiber-cement-siding";
import { compositeVsPTVsCedarDeckGuide } from "./composite-vs-pressure-treated-vs-cedar-deck";
import { heatPumpVsFurnaceGuide } from "./heat-pump-vs-furnace";
import { wasteFactorGuide } from "./waste-factor-reference";
import { codeLimitsGuide } from "./residential-code-limits-reference";
import { spanReferenceGuide } from "./joist-span-reference";

export const guides: Record<string, GuideConfig> = {
  "vinyl-vs-fiber-cement-siding": vinylVsFiberCementGuide,
  "composite-vs-pressure-treated-vs-cedar-deck": compositeVsPTVsCedarDeckGuide,
  "heat-pump-vs-furnace": heatPumpVsFurnaceGuide,
  "waste-factor-reference": wasteFactorGuide,
  "residential-code-limits-reference": codeLimitsGuide,
  "joist-span-reference": spanReferenceGuide,
};

export function getGuide(slug: string): GuideConfig | null {
  return guides[slug] || null;
}

export function getAllGuides(): GuideConfig[] {
  return Object.values(guides);
}
