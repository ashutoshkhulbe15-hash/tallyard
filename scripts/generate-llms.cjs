const fs = require("node:fs");
const path = require("node:path");
const load = require("./load-source.cjs");
const { configs } = load("src/configs/index.ts");
const { guides } = load("src/guides/index.ts");
const root = path.resolve(__dirname, "..");
const calculators = Object.values(configs);
const guideList = Object.values(guides);
const header = `# Tallyard\n\n> Free calculators and guides for home-improvement planning. Each page describes its own inputs, assumptions, and limits.\n\nSite: https://www.tallyard.com\n\nThere are ${calculators.length} calculators and worksheets, ${guideList.length} reference and buying guides, and 10 project-cost guides. Tools vary in scope. Verify product coverage, project conditions, and local requirements before relying on an estimate.\n\n`;
const summary = header + "## Calculators and worksheets\n\n" + calculators.map((c) => `- [${c.title}](https://www.tallyard.com/${c.slug}): ${c.description}`).join("\n") + "\n\n## Guides\n\n" + guideList.map((g) => `- [${g.title}](https://www.tallyard.com/guides/${g.slug}): ${g.description}`).join("\n") + "\n\nProject-cost guides: https://www.tallyard.com/guides\nMethodology and limitations: https://www.tallyard.com/methodology\nDetailed calculator descriptions: https://www.tallyard.com/llms-full.txt\n";
const full = header + calculators.map((c) => [
  `## ${c.title}`, `URL: https://www.tallyard.com/${c.slug}`, c.description,
  `Formula: ${c.formulaDescription}`, "Inputs:",
  ...c.inputs.map((i) => `- ${i.label}${i.unitImperial ? ` (${i.unitImperial}${i.unitMetric && i.unitMetric !== i.unitImperial ? ` / ${i.unitMetric}` : ""})` : ""}${i.help ? `: ${i.help}` : ""}`),
  "Methodology and limits:", ...c.methodology.map((note) => `- ${note}`),
  ...(c.sources.length ? ["References:", ...c.sources.map((s) => `- ${s.name}${s.url ? `: ${s.url}` : ""}${s.note ? ` — ${s.note}` : ""}`)] : []),
  ...c.faq.flatMap((f) => [`Q: ${f.question}`, `A: ${f.answer}`]),
].join("\n\n")).join("\n\n") + "\n\n## Guides\n\n" + guideList.map((g) => `### ${g.title}\n\nURL: https://www.tallyard.com/guides/${g.slug}\n\n${g.description}\n\n${g.verdict}`).join("\n\n") + "\n";
fs.writeFileSync(path.join(root, "public", "llms.txt"), summary);
fs.writeFileSync(path.join(root, "public", "llms-full.txt"), full);
console.log(`Generated public descriptions for ${calculators.length} calculators and ${guideList.length} guides.`);
