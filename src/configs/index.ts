import type { CalculatorConfig } from "@/lib/types";
import { paintCalculatorConfig } from "./paint-calculator";
import { concreteCalculatorConfig } from "./concrete-calculator";
import { tileCalculatorConfig } from "./tile-calculator";
import { mulchCalculatorConfig } from "./mulch-calculator";
import { drywallCalculatorConfig } from "./drywall-calculator";
import { roofingCalculatorConfig } from "./roofing-calculator";
import { btuCalculatorConfig } from "./btu-calculator";
import { gravelCalculatorConfig } from "./gravel-calculator";
import { solarCalculatorConfig } from "./solar-calculator";
import { wireSizeCalculatorConfig } from "./wire-size-calculator";
import { insulationCalculatorConfig } from "./insulation-calculator";
import { fenceCalculatorConfig } from "./fence-calculator";
import { groutCalculatorConfig } from "./grout-calculator";
import { paverCalculatorConfig } from "./paver-calculator";
import { deckCalculatorConfig } from "./deck-calculator";
import { flooringCalculatorConfig } from "./flooring-calculator";
import { topsoilCalculatorConfig } from "./topsoil-calculator";
import { sodCalculatorConfig } from "./sod-calculator";
import { asphaltCalculatorConfig } from "./asphalt-calculator";
import { lumberCalculatorConfig } from "./lumber-calculator";
import { stairCalculatorConfig } from "./stair-calculator";
import { rebarCalculatorConfig } from "./rebar-calculator";
import { brickCalculatorConfig } from "./brick-calculator";
import { wallpaperCalculatorConfig } from "./wallpaper-calculator";
import { showerTileCalculatorConfig } from "./shower-tile-calculator";
import { backsplashCalculatorConfig } from "./backsplash-calculator";
import { vanityCalculatorConfig } from "./vanity-calculator";
import { countertopCalculatorConfig } from "./countertop-calculator";
import { sidingCalculatorConfig } from "./siding-calculator";
import { gutterCalculatorConfig } from "./gutter-calculator";
import { heatPumpCalculatorConfig } from "./heat-pump-calculator";
import { waterHeaterCalculatorConfig } from "./water-heater-calculator";

export const configs: Record<string, CalculatorConfig> = {
  "paint-calculator": paintCalculatorConfig,
  "concrete-calculator": concreteCalculatorConfig,
  "tile-calculator": tileCalculatorConfig,
  "mulch-calculator": mulchCalculatorConfig,
  "drywall-calculator": drywallCalculatorConfig,
  "roofing-calculator": roofingCalculatorConfig,
  "btu-calculator": btuCalculatorConfig,
  "gravel-calculator": gravelCalculatorConfig,
  "solar-calculator": solarCalculatorConfig,
  "wire-size-calculator": wireSizeCalculatorConfig,
  "insulation-calculator": insulationCalculatorConfig,
  "fence-calculator": fenceCalculatorConfig,
  "grout-calculator": groutCalculatorConfig,
  "paver-calculator": paverCalculatorConfig,
  "deck-calculator": deckCalculatorConfig,
  "flooring-calculator": flooringCalculatorConfig,
  "topsoil-calculator": topsoilCalculatorConfig,
  "sod-calculator": sodCalculatorConfig,
  "asphalt-calculator": asphaltCalculatorConfig,
  "lumber-calculator": lumberCalculatorConfig,
  "stair-calculator": stairCalculatorConfig,
  "rebar-calculator": rebarCalculatorConfig,
  "brick-calculator": brickCalculatorConfig,
  "wallpaper-calculator": wallpaperCalculatorConfig,
  "shower-tile-calculator": showerTileCalculatorConfig,
  "backsplash-calculator": backsplashCalculatorConfig,
  "vanity-calculator": vanityCalculatorConfig,
  "countertop-calculator": countertopCalculatorConfig,
  "siding-calculator": sidingCalculatorConfig,
  "gutter-calculator": gutterCalculatorConfig,
  "heat-pump-calculator": heatPumpCalculatorConfig,
  "water-heater-calculator": waterHeaterCalculatorConfig,
};

export function getConfig(slug: string): CalculatorConfig | null {
  return configs[slug] || null;
}
