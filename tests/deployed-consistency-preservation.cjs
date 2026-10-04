const test=require('node:test');
const assert=require('node:assert/strict');
const load=require('../scripts/load-source.cjs');
const {configs}=load('src/configs/index.ts');
const {convertCalculatorValues}=load('src/lib/calculator-values.ts');
const before=require('./deployed-consistency-baseline.json');
test('all fifty deployed calculator physical inputs and numerical/chart outputs remain unchanged',()=>{
 assert.equal(before.length,50);
 for(const old of before){
  const c=configs[old.slug];
  assert.deepEqual(c.inputs.map(({help,label,...physical})=>physical),old.inputs,old.slug+': physical controls');
  for(const units of ['imperial','metric']){
   const values=units==='metric'?convertCalculatorValues(c.inputs,old.values,'imperial','metric'):old.values;
   const r=c.calculate(values,units);
   assert.deepEqual({value:r.value,valueRounded:r.valueRounded,unit:r.unit,displayValue:r.displayValue||null,composition:r.composition||null,diagramData:r.diagramData||null},old[units],old.slug+': '+units);
  }
 }
});
