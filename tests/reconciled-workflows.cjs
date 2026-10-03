const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const load=require('../scripts/load-source.cjs');
const {configs}=load('src/configs/index.ts');
const {convertCalculatorValues}=load('src/lib/calculator-values.ts');
const originals=require('./original-workflows.json');
function defaults(c){return Object.fromEntries(c.inputs.map(i=>[i.id,i.defaultImperial]));}
test('all original calculator controls, FAQ questions, sources and long articles remain connected',()=>{
  for(const old of originals){
    const c=configs[old.slug];
    for(const id of old.inputs) assert.ok(c.inputs.some(i=>i.id===id),`${old.slug}: ${id}`);
    for(const question of old.faqQuestions) assert.ok(c.faq.some(q=>q.question===question),`${old.slug}: ${question}`);
    for(const url of old.sourceUrls) assert.ok(c.sources.some(s=>s.url===url),`${old.slug}: ${url}`);
    assert.equal(typeof c.ContentExpansion,'function',old.slug);
    assert.ok(c.methodology.length>=3,old.slug);
    assert.equal(c.howTo,undefined,`${old.slug}: no unsupported HowTo schema`);
  }
  const shell=fs.readFileSync(path.join(__dirname,'../src/components/CalculatorPage.tsx'),'utf8');
  assert.doesNotMatch(shell,/OriginalCalculatorNotes/);
  assert.match(shell,/<config.ContentExpansion/);
});
test('restored topsoil bag count is 134 in both physical unit presentations',()=>{
  const c=configs['topsoil-calculator'];const v={...defaults(c),length:20,width:10,depth:6};
  for(const [unit,values] of [['imperial',v],['metric',convertCalculatorValues(c.inputs,v,'imperial','metric')]]){
    const r=c.calculate(values,unit);assert.equal(r.breakdown.find(row=>row.label==='bags (0.75 cu ft)').value,'134');
  }
});
test('stud spacing keeps a 16-inch interval, not a feet value labelled inches',()=>{
  const c=configs['stud-spacing-calculator'];const v={...defaults(c),wallLength:12,spacing:16,corners:0,doors:0,windows:0};
  for(const [unit,values] of [['imperial',v],['metric',convertCalculatorValues(c.inputs,v,'imperial','metric')]]){
    const r=c.calculate(values,unit);assert.equal(r.valueRounded,10);assert.equal(r.breakdown.find(row=>row.label==='actual line-stud interval').value,'16 in');
  }
});
test('heat-pump scenario retains the original inputs without silently capping the result',()=>{
  const c=configs['heat-pump-calculator'];const r=c.calculate(defaults(c),'imperial');
  assert.equal(r.valueRounded,6.67);assert.match(r.unit,/illustrative/);
  assert.ok(r.breakdown.some(row=>row.label==='equipment selection' && /not performed/.test(row.value)));
  assert.doesNotMatch(JSON.stringify(c.faq),/through 2032/);
});
test('pool requires exact product strength and converts liquid mass only from exact density',()=>{
  const c=configs['pool-chlorine-calculator'];const v={...defaults(c),volume:10000,currentPpm:1,targetPpm:3,availableChlorinePct:10,density:0,chlorineType:'liquid'};
  assert.throws(()=>c.calculate({...v,availableChlorinePct:''},'imperial'));
  const mass=c.calculate(v,'imperial');assert.equal(mass.unit,'g');assert.ok(Math.abs(mass.value-757.0823568)<1e-7);
  const volume=c.calculate({...v,density:1.1},'imperial');assert.equal(volume.unit,'fl oz');assert.ok(Math.abs(volume.value*29.5735295625*1.1-mass.value)<1e-7);
});
test('restored finite tables reject unsupported cord and drain loads instead of recommending their last row',()=>{
  const cord=configs['extension-cord-calculator'];
  assert.throws(()=>cord.calculate({...defaults(cord),amps:20,length:200,appliance:'custom'},'imperial'),/No listed cord/);
  const drain=configs['drain-pipe-calculator'];
  assert.throws(()=>drain.calculate({...defaults(drain),toilets:100,pipeType:'horizontal'},'imperial'),/exceeds the listed/);
});
test('snow estimate and framing worksheet do not claim verified roof capacity or select a header',()=>{
  const snow=configs['snow-load-calculator'];const s=snow.calculate(defaults(snow),'imperial');
  assert.doesNotMatch(JSON.stringify(s),/within capacity|to spare|% of capacity|design capacity/);
  const stud=configs['stud-spacing-calculator'];const r=stud.calculate(defaults(stud),'imperial');
  assert.doesNotMatch(JSON.stringify(r),/2×8 minimum|recommended header size/);
  assert.match(stud.faq.find(item=>item.question==='What size header do I need?').answer,/no universal header size/);
});
test('dimensioned restored main outputs convert using exact physical conversion factors',()=>{
  const cases=[['topsoil-calculator',.764554857984,'cubic meters'],['grout-calculator',.45359237,'kg'],['snow-load-calculator',.45359237,'kg total estimated weight on roof'],['shed-calculator',.09290304,'m² footprint'],['rainwater-calculator',3.785411784,'liters'],['attic-ventilation-calculator',6.4516,'cm² NFVA'],['vanity-calculator',2.54,'cm'],['countertop-calculator',.09290304,'m²']];
  for(const [slug,factor,unit] of cases){const c=configs[slug];const v=defaults(c);const a=c.calculate(v,'imperial');const b=c.calculate(convertCalculatorValues(c.inputs,v,'imperial','metric'),'metric');assert.equal(b.unit,unit,slug);assert.ok(Math.abs(b.value-a.value*factor)<Math.max(1,Math.abs(b.value))*1e-9,slug);}
});
test('all original descriptive calculator metadata and canonical URLs are restored',()=>{
  for(const old of originals){
    const metadata=load(`src/app/${old.slug}/page.tsx`).metadata;
    assert.deepEqual(metadata,old.metadata,old.slug);
  }
});
test('42 restored workflow examples match results captured from the original deployed archive',()=>{
  const intentional=new Set(['asphalt-calculator','concrete-calculator','gravel-calculator','mulch-calculator','paint-calculator','wire-size-calculator','heat-pump-calculator','pool-chlorine-calculator']);
  let checked=0;
  for(const old of originals){if(intentional.has(old.slug))continue;
    const result=configs[old.slug].calculate(old.example.inputs,'imperial');
    assert.equal(result.valueRounded,old.example.primary.rounded,old.slug);
    assert.equal(result.unit,old.example.primary.unit,old.slug);
    checked++;
  }
  assert.equal(checked,42);
});
