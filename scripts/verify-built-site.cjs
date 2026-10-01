const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const root = path.resolve(__dirname, "../.next/server/app");
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
}
const files = walk(root).filter((file) => file.endsWith(".html"));
let schemas = 0;
const issues = [];
for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  const route = path.relative(root, file).replace(/\.html$/, "");
  const isError = route === "_not-found";
  const isEmbed = route.startsWith("embed/");
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (!isError && !isEmbed && canonical?.[1] !== `https://www.tallyard.com${route === "index" ? "" : "/" + route}`) issues.push(`${route}: incorrect canonical ${canonical?.[1]}`);
  if (isEmbed && !/<meta name="robots" content="[^"]*noindex/.test(html)) issues.push(`${route}: embed must be noindex`);
  if (!isError && !isEmbed && /<meta name="robots" content="[^"]*noindex/.test(html)) issues.push(`${route}: unexpected noindex`);
  assert.ok(/<title>[^<]+<\/title>/.test(html), `${route}: missing title`);
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    JSON.parse(match[1]);
    schemas++;
    if (/"@type":"(?:Dataset|HowTo)"/.test(match[1])) issues.push(`${route}: unsupported schema`);
  }
  for (const match of html.matchAll(/href="([^"#]+)(?:#[^"]*)?"/g)) {
    const url = match[1].replaceAll("&amp;", "&");
    if (!url.startsWith("/") || url.startsWith("//")) continue;
    const target = url.split("?")[0];
    if (target.startsWith("/_next/")) continue;
    if (![path.join(root, target + ".html"), path.join(root, target, "index.html"), path.join(root, target + ".body"), path.resolve(__dirname, "../public", "." + target)].some((candidate) => fs.existsSync(candidate))) issues.push(`${route}: missing internal destination ${target}`);
  }
}
assert.deepEqual([...new Set(issues)], []);
console.log(`Verified ${files.length} rendered HTML pages and ${schemas} JSON-LD blocks: canonical/indexing rules and internal destinations passed.`);
