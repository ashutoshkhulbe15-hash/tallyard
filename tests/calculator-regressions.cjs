const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Module = require("node:module");
const ts = require("typescript");

// Load calculation configs without a browser or rendering their article content.
function loadConfig(file) {
  const filename = path.join(__dirname, "..", "src", "configs", file);
  const source = fs.readFileSync(filename, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const mod = new Module(filename, module);
  mod.filename = filename;
  mod.paths = module.paths;
  mod.require = (request) => {
    if (request.startsWith("@/content/")) return new Proxy({}, { get: () => function ArticleStub() {} });
    if (request === "@/lib/format") {
      return {
        ceilQuantity: require("../scripts/load-source.cjs")("src/lib/format.ts").ceilQuantity,
        round: (n, places = 0) => Math.round(n * 10 ** places) / 10 ** places,
        roundUp: (n, places = 0) => Math.ceil(n * 10 ** places) / 10 ** places,
        formatNumber: (n) => String(n),
      };
    }
    return require(request);
  };
  mod._compile(compiled, filename);
  return Object.values(mod.exports).find((value) => value && typeof value.calculate === "function");
}

const wire = loadConfig("wire-size-calculator.ts");
const stairs = loadConfig("stair-calculator.ts");
const snow = loadConfig("snow-load-calculator.ts");
const pool = loadConfig("pool-chlorine-calculator.ts");
const fence = loadConfig("fence-calculator.ts");
const concrete = loadConfig("concrete-calculator.ts");
const flooring = loadConfig("flooring-calculator.ts");
const tile = loadConfig("tile-calculator.ts");
const showerTile = loadConfig("shower-tile-calculator.ts");
const brick = loadConfig("brick-calculator.ts");
const mortar = loadConfig("mortar-calculator.ts");
const rebar = loadConfig("rebar-calculator.ts");
const grout = loadConfig("grout-calculator.ts");
const backsplash = loadConfig("backsplash-calculator.ts");
const windowArea = loadConfig("window-sizing-calculator.ts");
const egressArea = loadConfig("egress-window-calculator.ts");
const studPositions = loadConfig("stud-spacing-calculator.ts");
const garageOpening = loadConfig("garage-door-calculator.ts");
const atticRatio = loadConfig("attic-ventilation-calculator.ts");
const heatPumpLoads = loadConfig("heat-pump-calculator.ts");
const waterHeatRate = loadConfig("water-heater-calculator.ts");
const insulationPackages = loadConfig("insulation-calculator.ts");
const solarScenario = loadConfig("solar-calculator.ts");
const drywallPanels = loadConfig("drywall-calculator.ts");
const sidingArea = loadConfig("siding-calculator.ts");
const vanityWidth = loadConfig("vanity-calculator.ts");
const lumberQuantity = loadConfig("lumber-calculator.ts");
const gutterLength = loadConfig("gutter-calculator.ts");
const wallpaperCoverage = loadConfig("wallpaper-calculator.ts");
const hardwoodQuote = loadConfig("hardwood-flooring-cost-calculator.ts");
const refinishingQuote = loadConfig("hardwood-floor-refinishing-cost-calculator.ts");
const furnaceQuote = loadConfig("furnace-replacement-cost-calculator.ts");

test("wire sizing refuses an amperage beyond the finite conductor table", () => {
  assert.throws(() => wire.calculate({ amps: 400, voltage: 120, distance: 50,
    material: "copper", voltageDropLimit: 3 }, "imperial"), /No listed conductor/);
});

test("wire sizing uses 60°C ampacity and never reports a failed check as passing", () => {
  const result = wire.calculate({ amps: 50, voltage: 240, distance: 10,
    material: "copper", voltageDropLimit: 3 }, "imperial");
  assert.equal(result.unit, "AWG 6");
  assert.match(result.formulaSteps.join(" "), /55A ≥ 50A/);
});

test("wire sizing refuses an excessive run with no matching listed gauge", () => {
  assert.throws(() => wire.calculate({ amps: 100, voltage: 12, distance: 2000,
    material: "aluminum", voltageDropLimit: 2 }, "imperial"), /No listed conductor/);
});

test("stair imperial and metric inputs produce the same geometry", () => {
  const imperial = stairs.calculate({ totalRise: 108, targetRise: 7.5,
    treadRun: 11 }, "imperial");
  const metric = stairs.calculate({ totalRise: 274.32, targetRise: 7.5,
    treadRun: 11 }, "metric");
  assert.equal(imperial.valueRounded, 14);
  assert.equal(metric.valueRounded, imperial.valueRounded);
  assert.equal(metric.breakdown.find((row) => row.label === "tread intervals").value, "13");
  assert.match(metric.formulaSteps.join(" "), /risers = round/);
  assert.doesNotMatch(metric.breakdown.map((row) => row.label).join(" "), /verdict|IRC|code/i);
});

test("snow calculator estimates weight without claiming a safety verdict", () => {
  const result = snow.calculate({ snowDepth: 12, snowType: "packed",
    iceThickness: 0, roofArea: 1000 }, "imperial");
  assert.equal(result.breakdown.find((row) => row.label === "total pressure").value, "15 psf");
  assert.equal(result.breakdown.find((row) => row.label === "structural capacity").value,
    "not calculated");
  assert.equal(result.breakdown.some((row) => row.label === "verdict"), false);
});

test("pool estimate requires label strength and reports mass-balance mass only", () => {
  const liquidLabel = pool.calculate({ volume: 10000, currentPpm: 0,
    targetPpm: 1, availableChlorinePct: 10 }, "imperial");
  const granularLabel = pool.calculate({ volume: 10000, currentPpm: 0,
    targetPpm: 1, availableChlorinePct: 65 }, "imperial");
  assert.equal(liquidLabel.unit, "g");
  assert.ok(Math.abs(liquidLabel.value - 378.54) < 0.02);
  assert.ok(Math.abs(granularLabel.value - 58.24) < 0.02);
  assert.throws(() => pool.calculate({ volume: 10000, currentPpm: 0,
    targetPpm: 1, availableChlorinePct: 0 }, "imperial"), /available-chlorine percentage/);
});

test("cost pages do not claim an unpublished dataset or unverified schema dates", () => {
  const app = path.join(__dirname, "..", "src", "app");
  const costPages = fs.readdirSync(app).filter((name) => name.startsWith("cost-to-"));
  assert.equal(costPages.length, 10);
  for (const slug of costPages) {
    const source = fs.readFileSync(path.join(app, slug, "page.tsx"), "utf8");
    assert.doesNotMatch(source, /"@type"\s*:\s*"Dataset"/, slug);
    assert.doesNotMatch(source, /datePublished\s*:|dateModified\s*:/, slug);
  }
});

test("guide metadata does not expose unverified publication dates", () => {
  const app = path.join(__dirname, "..", "src", "app", "guides");
  for (const slug of fs.readdirSync(app)) {
    const page = path.join(app, slug, "page.tsx");
    if (!fs.existsSync(page)) continue;
    assert.doesNotMatch(fs.readFileSync(page, "utf8"), /publishedTime\s*:/, slug);
  }
});

test("sitewide editorial claims match the limited scope of active tools", () => {
  const root = path.join(__dirname, "..", "src");
  const checked = [
    "app/page.tsx",
    "app/layout.tsx",
    "app/methodology/page.tsx",
    "app/about/page.tsx",
    "app/calculators/CalculatorIndex.tsx",
    "app/HomeDirectory.tsx",
    "components/Footer.tsx",
  ];
  const text = checked.map((file) => fs.readFileSync(path.join(root, file), "utf8")).join("\n");
  assert.doesNotMatch(text, /every formula public|every source cited|within 5.?10%|2026 averages|20-year total-cost math|pressure-treated turns out to be the most expensive/i);
  const home = fs.readFileSync(path.join(root, "app/page.tsx"), "utf8");
  assert.match(home, /Illustrative worksheet example/);
  assert.match(home, /3 gallons\*/);
  assert.doesNotMatch(home, /2\.20 gal|1 gal \+ 2 qt/);
});

test("restored energy articles include a visible correction for expired federal credits", () => {
  const root = path.join(__dirname, "..", "src");
  const note = fs.readFileSync(path.join(root, "components/EnergyCreditCorrection.tsx"), "utf8");
  assert.match(note, /December 31, 2025/);
  assert.match(note, /irs.gov\/instructions\/i5695/);
  for (const file of ["components/CalculatorPage.tsx", "components/GuidePage.tsx", "app/cost-to-install-solar/page.tsx", "app/cost-to-replace-hvac/page.tsx"]) assert.match(fs.readFileSync(path.join(root,file), "utf8"), /<EnergyCreditCorrection/);
  for (const file of ["heat-pump-calculator.ts", "water-heater-calculator.ts"]) assert.equal(typeof loadConfig(file).ContentExpansion, "function");
});

test("restored siding and bathroom guides keep their figures and hypothetical examples", () => {
  for (const slug of ["cost-to-install-siding", "cost-to-remodel-a-bathroom"]) {
    const source = fs.readFileSync(path.join(__dirname,"../src/app",slug,"page.tsx"), "utf8");
    assert.match(source, /<Figure/);
    assert.match(source, /<Scenario/);
    assert.doesNotMatch(source, /"@type"\s*:\s*"Dataset"/);
  }
  assert.match(fs.readFileSync(path.join(__dirname,"../src/components/GuideChrome.tsx"),"utf8"), /hypothetical/i);
});

test("restored roof and deck cost guides keep their editorial figures", () => {
  for (const slug of ["cost-to-replace-a-roof", "cost-to-build-a-deck"]) {
    const source = fs.readFileSync(path.join(__dirname,"../src/app",slug,"page.tsx"), "utf8");
    assert.match(source, /<Figure/);
    assert.doesNotMatch(source, /datePublished\s*:|dateModified\s*:/);
  }
});

test("fence spacing is feet in both modes and unknown concrete quantity stays unknown", () => {
  const inputs = { postSpacing: 8, height: 6, pickets: "yes" };
  const imperial = fence.calculate({ ...inputs, length: 100 }, "imperial");
  const metric = fence.calculate({ ...inputs, length: 30.48 }, "metric");
  assert.equal(imperial.breakdown.find((row) => row.label === "posts").value, "14");
  assert.equal(metric.breakdown.find((row) => row.label === "posts").value, "14");
  assert.equal(metric.valueRounded, imperial.valueRounded);
  assert.match(metric.breakdown.find((row) => row.label === "concrete bags").value, /not estimated/);
});

test("concrete estimate is volume plus chosen allowance, not a delivery-price verdict", () => {
  const result = concrete.calculate({ shape: "rectangular", length: 12, width: 16,
    thickness: 4, waste: 10 }, "imperial");
  assert.equal(result.valueRounded, 2.61);
  assert.equal(result.breakdown.find((row) => row.label === "base volume").value, "2.37 yd³");
});

test("concrete imperial and metric geometry agree and reject invalid dimensions", () => {
  const imperial = concrete.calculate({ shape: "rectangular", length: 10, width: 10,
    thickness: 4, waste: 10 }, "imperial");
  const metric = concrete.calculate({ shape: "rectangular", length: 3.048, width: 3.048,
    thickness: 10.16, waste: 10 }, "metric");
  assert.ok(Math.abs(imperial.value * 0.764554858 - metric.value) < 0.002);
  assert.throws(() => concrete.calculate({ shape: "rectangular", length: -1,
    width: 10, thickness: 4, waste: 10 }, "imperial"), /positive dimensions/);
});

test("flooring, tile, and shower package counts use exact entered package coverage", () => {
  const floor = flooring.calculate({ length: 14, width: 12,
    coveragePerPackage: 20, allowance: 0.1 }, "imperial");
  const tileResult = tile.calculate({ length: 10, width: 12,
    coveragePerPackage: 20, allowance: 0.1 }, "imperial");
  const shower = showerTile.calculate({ tileArea: 80,
    coveragePerPackage: 20, allowance: 0.15 }, "imperial");
  assert.equal(floor.value, 10);
  assert.equal(tileResult.value, 7);
  assert.equal(shower.value, 5);
  assert.throws(() => flooring.calculate({ length: 14, width: 12,
    coveragePerPackage: "", allowance: 0.1 }, "imperial"), /package coverage/);
});

test("brick count requires entered coverage and applies only the chosen allowance", () => {
  const result = brick.calculate({ wallArea: 160, unitsPerArea: 6.8, allowance: 0.1 }, "imperial");
  assert.equal(result.value, 1197);
  assert.throws(() => brick.calculate({ wallArea: 160, unitsPerArea: "", allowance: 0.1 }, "imperial"), /product- and layout-specific/);
});

test("mortar packages require exact entered coverage and never assume mortar type", () => {
  const result = mortar.calculate({ unitCount: 1000, coveragePerBag: 35, allowance: 0.1 }, "imperial");
  assert.equal(result.value, 32);
  assert.doesNotMatch(result.formulaSteps.join(" "), /Type [MSN]/);
  assert.throws(() => mortar.calculate({ unitCount: 1000, coveragePerBag: "", allowance: 0.1 }, "imperial"), /exact mortar package/);
});

test("rebar reports gross grid length only and metric conversion matches imperial", () => {
  const imperial = rebar.calculate({ length: 20, width: 12, spacing: 16 }, "imperial");
  const metric = rebar.calculate({ length: 6.096, width: 3.6576, spacing: 16 }, "metric");
  assert.equal(imperial.breakdown.find((row) => row.label === "runs parallel to length").value, "10");
  assert.ok(Math.abs(imperial.value * 0.3048 - metric.value) < 0.02);
  assert.match(imperial.unit, /gross lineal/);
  assert.doesNotMatch(imperial.breakdown.map((row) => row.label).join(" "), /sticks|weight|bar size/i);
});

test("grout estimator uses exact entered product coverage rather than inferred joint yield", () => {
  const result = grout.calculate({ area: 120, coveragePerPackage: 45, allowance: 0.1 }, "imperial");
  assert.equal(result.value, 3);
  assert.throws(() => grout.calculate({ area: 120, coveragePerPackage: "", allowance: 0.1 }, "imperial"), /exact product-package coverage/);
  assert.doesNotMatch(result.formulaSteps.join(" "), /sanded|unsanded|joint width/i);
});

test("backsplash estimate requires measured area and package coverage without assumed cutouts", () => {
  const result = backsplash.calculate({ area: 27, coveragePerPackage: 12, allowance: 0.1 }, "imperial");
  assert.equal(result.value, 3);
  assert.throws(() => backsplash.calculate({ area: 27, coveragePerPackage: "", allowance: 0.1 }, "imperial"), /exact package coverage/);
  assert.match(result.formulaSteps.join(" "), /does not infer runs, openings/);
});

test("all eight categories retain their longer original editorial sections", () => {
  const root = path.join(__dirname,"../src/app/calculators");
  const categories = fs.readdirSync(root).filter(slug => fs.existsSync(path.join(root,slug,"page.tsx")));
  assert.equal(categories.length,8);
  for(const slug of categories) {
    const source = fs.readFileSync(path.join(root,slug,"page.tsx"),"utf8");
    assert.match(source, /guide-prose/, slug);
    assert.ok((source.match(/<h2/g)||[]).length >= 3,slug);
  }
});

test("planners retain the original long project guide without reactivating retired calculations", () => {
  const root = path.join(__dirname,"../src/app/planner");
  for(const slug of ["build-a-deck","install-a-fence","paint-a-room","remodel-a-bathroom","replace-a-roof"]) {
    const source = fs.readFileSync(path.join(root,slug,"page.tsx"),"utf8");
    assert.doesNotMatch(source, /<PlannerClient/);
    assert.ok((source.match(/<h[23]/g)||[]).length >= 5,slug);
  }
});

test("geometry-only building worksheets do not return code, product, or safety verdicts", () => {
  const win = windowArea.calculate({ width: 36, height: 48 }, "imperial");
  const egress = egressArea.calculate({ clearWidth: 32, clearHeight: 26 }, "imperial");
  const positions = studPositions.calculate({ wallLength: 12, spacing: 16 }, "imperial");
  const garage = garageOpening.calculate({ opening: 16, height: 7, headroom: 12, sideroom: 4 }, "imperial");
  const attic = atticRatio.calculate({ atticArea: 1500, ratio: "300" }, "imperial");
  assert.equal(win.valueRounded, 12);
  assert.ok(Math.abs(egress.value - (32 * 26 / 144)) < 0.001);
  assert.equal(positions.value, 10);
  assert.equal(garage.value, 112);
  assert.equal(attic.valueRounded, 5);
  for (const result of [win, egress, positions, garage, attic]) {
    assert.doesNotMatch(JSON.stringify(result), /MEETS IRC|FAILS|compliant|recommended vent|opener HP|header size/i);
  }
});

test("HVAC and insulation worksheets only convert supplied loads, rates, and product coverage", () => {
  const heat = heatPumpLoads.calculate({ coolingBtu: 24000, heatingBtu: 30000 }, "imperial");
  const waterImperial = waterHeatRate.calculate({ flow: 3, rise: 60 }, "imperial");
  const waterMetric = waterHeatRate.calculate({ flow: 11.36, rise: 33.33 }, "metric");
  const insulation = insulationPackages.calculate({ area: 1200, coverage: 40, allowance: "10" }, "imperial");
  assert.equal(heat.valueRounded, 2.5);
  assert.equal(heat.breakdown.find((row) => row.label === "equipment size").value, "not selected");
  assert.equal(waterImperial.valueRounded, 90000);
  assert.ok(Math.abs(waterMetric.valueRounded - 26.4) < 0.1);
  assert.equal(insulation.valueRounded, 33);
  for (const result of [heat, waterImperial, waterMetric, insulation]) {
    assert.doesNotMatch(JSON.stringify(result), /recommended|compliant|meets code|right-size/i);
  }
});

test("solar, drywall, and siding calculators stay within entered assumptions and area arithmetic", () => {
  const solar = solarScenario.calculate({ monthlyKwh: 900, sunHours: 4.5, panelWatts: 400, deratePercent: 80 }, "imperial");
  const drywallImp = drywallPanels.calculate({ area: 800, panelSize: "4x8", allowance: "10" }, "imperial");
  const drywallMetric = drywallPanels.calculate({ area: 800 * 0.09290304, panelSize: "4x8", allowance: "10" }, "metric");
  const sidingImp = sidingArea.calculate({ area: 1800, allowance: "10" }, "imperial");
  const sidingMetric = sidingArea.calculate({ area: 1800 * 0.09290304, allowance: "10" }, "metric");
  assert.equal(solar.valueRounded, 21);
  assert.equal(solar.breakdown.find((row) => row.label === "roof area, production forecast, and equipment design").value, "not assessed");
  assert.equal(drywallImp.valueRounded, 28);
  assert.equal(drywallMetric.valueRounded, drywallImp.valueRounded);
  assert.equal(sidingImp.valueRounded, 1980);
  assert.ok(Math.abs(sidingMetric.valueRounded - sidingImp.valueRounded * 0.09290304) < 0.1);
  for (const result of [solar, drywallImp, drywallMetric, sidingImp, sidingMetric]) {
    assert.doesNotMatch(JSON.stringify(result), /recommended|savings|meets code|fire-rated|house wrap/i);
  }
  for (const file of ["solar-calculator.ts", "drywall-calculator.ts", "siding-calculator.ts"]) {
    const source = fs.readFileSync(path.join(__dirname, "..", "src", "configs", file), "utf8");
    assert.match(source, /ContentExpansion:/);
    assert.doesNotMatch(source, /howTo:/);
  }
});

test("remaining sizing and quote worksheets use entered dimensions or quote values only", () => {
  const vanity = vanityWidth.calculate({ wallWidth: 72, leftClearance: 2, rightClearance: 4 }, "imperial");
  const lumber = lumberQuantity.calculate({ size: "2x4", length: 8, quantity: 10, allowance: "10" }, "imperial");
  const gutter = gutterLength.calculate({ runA: 40, runB: 35, runC: 0, runD: 0, allowance: "10" }, "imperial");
  const wallpaper = wallpaperCoverage.calculate({ area: 400, coverage: 56, allowance: "5" }, "imperial");
  const hardwood = hardwoodQuote.calculate({ area: 400, materialRate: 8, laborRate: 5, otherRate: 1, fixedExtras: 500 }, "imperial");
  const refinish = refinishingQuote.calculate({ area: 500, quotedRate: 4, fixedExtras: 300 }, "imperial");
  const furnace = furnaceQuote.calculate({ equipment: 3000, labor: 2000, venting: 500, permitOther: 400 }, "imperial");
  assert.equal(vanity.valueRounded, 66);
  assert.equal(lumber.valueRounded, 58.7); // 2×4×8 = 5.333 nominal BF × 11 boards
  assert.equal(gutter.valueRounded, 82.5);
  assert.equal(wallpaper.valueRounded, 8);
  assert.equal(hardwood.valueRounded, 6100);
  assert.equal(refinish.valueRounded, 2300);
  assert.equal(furnace.valueRounded, 5900);
  for (const result of [vanity, lumber, gutter, wallpaper, hardwood, refinish, furnace]) {
    assert.doesNotMatch(JSON.stringify(result), /recommended|code check|typical range|savings|market rate|price per board foot/i);
  }
  for (const file of ["vanity-calculator.ts", "lumber-calculator.ts", "gutter-calculator.ts", "wallpaper-calculator.ts", "hardwood-flooring-cost-calculator.ts", "hardwood-floor-refinishing-cost-calculator.ts", "furnace-replacement-cost-calculator.ts"]) {
    const config = loadConfig(file);
    assert.equal(typeof config.ContentExpansion, "function", `${file} restored expansion`);
    assert.equal(config.howTo, undefined, `${file} HowTo schema`);
  }
});
