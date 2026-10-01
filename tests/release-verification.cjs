const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const load = require("../scripts/load-source.cjs");
const { configs } = load("src/configs/index.ts");
const { guides } = load("src/guides/index.ts");
const { convertCalculatorValues, validateCalculatorValues, validateCalculatorResult } = load("src/lib/calculator-values.ts");
const root = path.resolve(__dirname, "..");

test("release owns the strict lint configuration and dependencies used during build", () => {
  const lint = fs.readFileSync(path.join(root, "eslint.config.mjs"), "utf8");
  const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  assert.ok(lint.includes('eslint-config-next/core-web-vitals'));
  assert.ok(lint.includes('eslint-config-next/typescript'));
  assert.equal(pkg.scripts.lint, "eslint src --max-warnings=0");
  assert.ok(pkg.scripts.prebuild.includes("npm run lint"));
  assert.equal(pkg.devDependencies["eslint-config-next"], pkg.dependencies.next);
  assert.ok(pkg.devDependencies.eslint);
});

test("framework migration keeps matched React versions, runtime requirement, and static feed", () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  const lock = JSON.parse(fs.readFileSync(path.join(root, "package-lock.json"), "utf8"));
  assert.equal(pkg.engines.node, ">=20.9.0");
  assert.equal(pkg.dependencies.react, pkg.dependencies["react-dom"]);
  assert.equal(lock.packages["node_modules/next"].version, pkg.dependencies.next);
  assert.equal(lock.packages["node_modules/react"].version, pkg.dependencies.react);
  assert.equal(lock.packages["node_modules/react-dom"].version, pkg.dependencies["react-dom"]);
  assert.equal(pkg.scripts.build, "next build --webpack");
  const feed = fs.readFileSync(path.join(root, "src/app/feed.xml/route.ts"), "utf8");
  assert.ok(feed.includes('export const dynamic = "force-static"'));
  const embed = fs.readFileSync(path.join(root, "src/app/embed/[slug]/page.tsx"), "utf8");
  assert.ok(embed.includes("params: Promise<{ slug: string }>"));
  assert.equal((embed.match(/await params/g) || []).length, 2);
});

function exampleValues(config) {
  const values = Object.fromEntries(config.inputs.map((input) => [input.id, input.defaultImperial]));
  // Test data for fields intentionally left at zero until the visitor supplies a label or quote.
  for (const key of ["coveragePerPackage", "coveragePerBag", "unitsPerArea", "availableChlorinePct", "equipment", "materialRate", "quotedRate"]) {
    if (key in values && Number(values[key]) === 0) values[key] = 10;
  }
  if (config.slug === "pool-chlorine-calculator") Object.assign(values, { currentPpm: 1, targetPpm: 3 });
  return values;
}

test("all 50 calculators are present in routes, the sitemap, and the index", () => {
  const entries = Object.entries(configs);
  assert.equal(entries.length, 50);
  const urls = load("src/app/sitemap.ts").default().map((entry) => entry.url);
  assert.equal(new Set(urls).size, urls.length);
  const index = fs.readFileSync(path.join(root, "src/app/calculators/CalculatorIndex.tsx"), "utf8").split("const COST_GUIDES")[0];
  const indexed = [...index.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
  assert.equal(new Set(indexed).size, entries.length);
  const header = fs.readFileSync(path.join(root, "src/components/Header.tsx"), "utf8");
  const searchable = [...header.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
  for (const slug of searchable) assert.ok(fs.existsSync(path.join(root, "src/app", slug, "page.tsx")), `${slug}: search destination`);
  for (const [slug, config] of entries) {
    assert.equal(config.slug, slug);
    assert.ok(fs.existsSync(path.join(root, "src/app", slug, "page.tsx")), slug);
    assert.ok(urls.includes(`https://www.tallyard.com/${slug}`), `${slug}: sitemap`);
    assert.ok(indexed.includes(slug), `${slug}: index`);
    assert.ok(searchable.includes(slug), `${slug}: search`);
    for (const related of config.related) assert.ok(configs[related.slug] || fs.existsSync(path.join(root, "src/app", related.slug, "page.tsx")), `${slug}: broken related page ${related.slug}`);
    for (const guide of config.relatedGuides || []) assert.ok(guides[guide.slug] || fs.existsSync(path.join(root, "src/app", guide.slug, "page.tsx")), `${slug}: broken guide ${guide.slug}`);
  }
});

test("all calculators produce finite results for valid example inputs in both unit systems", () => {
  for (const config of Object.values(configs)) {
    const imperial = exampleValues(config);
    const metric = convertCalculatorValues(config.inputs, imperial, "imperial", "metric");
    for (const [units, values] of [["imperial", imperial], ["metric", metric]]) {
      validateCalculatorValues(config, values, units);
      const result = config.calculate(values, units);
      validateCalculatorResult(result);
      assert.ok(result.breakdown.length, `${config.slug}: ${units} breakdown`);
      assert.ok(result.formulaSteps.length, `${config.slug}: ${units} math`);
    }
  }
});

test("unit switching preserves every entered physical input and every select value", () => {
  for (const config of Object.values(configs)) {
    const before = exampleValues(config);
    const metric = convertCalculatorValues(config.inputs, before, "imperial", "metric");
    const restored = convertCalculatorValues(config.inputs, metric, "metric", "imperial");
    for (const input of config.inputs) {
      const expected = before[input.id];
      if (input.type === "number") assert.ok(Math.abs(restored[input.id] - expected) <= Math.max(1, Math.abs(expected)) * 1e-9, `${config.slug}: ${input.id}`);
      else assert.equal(restored[input.id], expected, `${config.slug}: select ${input.id}`);
    }
  }
});

test("blank, nonfinite, negative, and unlisted URL inputs cannot reach calculator arithmetic", () => {
  for (const config of Object.values(configs)) {
    const values = exampleValues(config);
    for (const input of config.inputs) {
      if (input.type === "number") {
        for (const invalid of ["", NaN, Infinity, -Infinity]) assert.throws(() => validateCalculatorValues(config, { ...values, [input.id]: invalid }), undefined, `${config.slug}: ${input.id}`);
        if (input.min !== undefined && input.min >= 0) assert.throws(() => validateCalculatorValues(config, { ...values, [input.id]: -1 }));
      } else assert.throws(() => validateCalculatorValues(config, { ...values, [input.id]: "invalid-option" }));
    }
  }
  assert.throws(() => validateCalculatorResult({ value: Infinity, valueRounded: Infinity }), /supported calculation range/);
});

test("paint uses entered label coverage and metric conversion preserves the physical estimate", () => {
  const paint = configs["paint-calculator"];
  const values = { ...exampleValues(paint), length: 20, width: 10, height: 8, coverage: 400, doors: 1, windows: 2, coats: 2 };
  const imperial = paint.calculate(values, "imperial");
  const metric = paint.calculate(convertCalculatorValues(paint.inputs, values, "imperial", "metric"), "metric");
  assert.equal(imperial.value, 2.145); // ((2(20+10)×8 - 21 - 30) × 2) / 400
  assert.ok(Math.abs(metric.value / 3.785411784 - imperial.value) < 0.0005);
  assert.equal(imperial.valueRounded, 3);
});

test("package arithmetic is stable when a physical area is converted to metric", () => {
  for (const slug of ["tile-calculator", "flooring-calculator", "insulation-calculator", "shower-tile-calculator", "backsplash-calculator", "brick-calculator", "wallpaper-calculator", "grout-calculator"]) {
    const config = configs[slug];
    const values = exampleValues(config);
    assert.equal(config.calculate(values, "imperial").valueRounded, config.calculate(convertCalculatorValues(config.inputs, values, "imperial", "metric"), "metric").valueRounded, slug);
  }
});

test("stale price and full-takeoff promises are absent from changed calculator metadata", () => {
  for (const slug of ["countertop-calculator", "shed-calculator", "fence-calculator"]) {
    const source = fs.readFileSync(path.join(root, "src/app", slug, "page.tsx"), "utf8");
    assert.doesNotMatch(source, /Cost by Material|Full material list, cost breakdown|concrete for any fence|Includes gates and corners/);
  }
});
