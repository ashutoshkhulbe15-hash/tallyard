const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const load=require('../scripts/load-source.cjs');
const {configs}=load('src/configs/index.ts');
const {convertCalculatorValues}=load('src/lib/calculator-values.ts');
function defaults(c){return Object.fromEntries(c.inputs.map(i=>[i.id,i.defaultImperial]));}
test('non-divisible stud walls keep the nominal grid and identify only the terminal remainder',()=>{
 const c=configs['stud-spacing-calculator'];
 for(const [length,count,remainder] of [[12.5,11,6],[12,10,16],[20,16,16]]){
  const v={...defaults(c),wallLength:length,spacing:16,corners:0,doors:0,windows:0};
  for(const [units,values] of [['imperial',v],['metric',convertCalculatorValues(c.inputs,v,'imperial','metric')]]){
   const result=c.calculate(values,units);
   assert.equal(result.valueRounded,count);
   assert.equal(result.breakdown.find(r=>r.label==='selected nominal line-stud spacing').value,'16 in OC');
   assert.match(result.breakdown.find(r=>r.label==='terminal interval').value,new RegExp('^'+remainder+' in;'));
   assert.ok(!result.breakdown.some(r=>r.label==='actual line-stud interval'));
  }
 }
});
test('heat-pump methods and FAQs match the scoped, uncapped load-equivalent scenario',()=>{
 const c=configs['heat-pump-calculator'];
 assert.equal(c.calculate(defaults(c),'imperial').valueRounded,6.67);
 assert.match(c.methodology[5],/uncapped load-equivalent/);
 assert.doesNotMatch(JSON.stringify(c.methodology),/rounds UP to the next standard size|Oversizing by one size is fine/);
 assert.doesNotMatch(JSON.stringify(c.faq),/one size up is fine|Federal tax credit requires/);
 assert.match(c.faq.find(f=>f.question==="What's SEER and HSPF?").answer,/unavailable.*2026/);
});
test('heat-pump article corrects 2026 tax and payback figures without dropping its sections or diagrams',()=>{
 const file=fs.readFileSync(path.join(__dirname,'../src/content/heat-pump-expansion.tsx'),'utf8');
 assert.doesNotMatch(file,/AFTER 30% ITC|Federal ITC \(30%\): -\$4,350|Yes: 30% ITC|Can stack with ITC|calculator returns a size that lands/);
 assert.match(file,/New residential 25C tax credit: \$0/);
 assert.match(file,/\$14,500 ÷ \$800 = 18\.1 years/);
 assert.match(file,/separate \$2,000 annual limit/);
 assert.equal((file.match(/<h2>/g)||[]).length,5);
 assert.equal((file.match(/<Figure number=/g)||[]).length,3);
 assert.equal((file.match(/<ComparisonTable/g)||[]).length,3);
 assert.match(file,/not an ACCA Manual J calculation/);
});
test('wire and framing descriptive copy does not claim complete compliance or select a header',()=>{
 assert.doesNotMatch(configs['wire-size-calculator'].description,/stays within code/);
 assert.match(configs['wire-size-calculator'].description,/limited worksheet/);
 const input=configs['stud-spacing-calculator'].inputs.find(i=>i.id==='bearingWall');
 assert.doesNotMatch(input.help,/2×8 or 2×10/);
 assert.match(input.help,/does not select a header/);
});
