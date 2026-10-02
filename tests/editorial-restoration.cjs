const test=require("node:test");
const assert=require("node:assert/strict");
const load=require("../scripts/load-source.cjs");
const {configs}=load("src/configs/index.ts");
const notes=require("../src/content/original-calculator-editorial.json");
const baseline=require("./editorial-baseline.json");

test("all 50 original calculator articles, methods, FAQs, and references remain connected",()=>{
  assert.equal(Object.keys(notes).length,50);
  for(const [slug,config] of Object.entries(configs)) {
    assert.equal(typeof config.ContentExpansion,"function",slug);
    assert.ok(notes[slug].description,slug);
    assert.ok(notes[slug].methodology.length,slug);
    assert.ok(notes[slug].faq.length,slug);
    assert.ok(baseline.pages.find(page=>page.route==='/'+slug)?.chunks.length,slug);
  }
});

test("the original editorial comparison covers all 80 affected routes",()=>{
  assert.equal(new Set(baseline.pages.map(page=>page.route)).size,80);
  assert.equal(baseline.pages.filter(page=>page.route.startsWith('/guides/')).length,6);
  assert.equal(baseline.pages.filter(page=>page.route.startsWith('/cost-to-')).length,10);
  assert.equal(baseline.pages.filter(page=>page.route.startsWith('/calculators/')).length,8);
  assert.equal(baseline.pages.filter(page=>page.route.startsWith('/planner/')).length,6);
});
