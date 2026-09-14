import test from 'node:test';
import assert from 'node:assert/strict';
import { scorePizza, insidePizza, counts, orders } from './engine.js';
test('exact recipe spread over eight slices earns full reward',()=>{const pieces=[];for(const [id,n]of Object.entries(orders[0].recipe))for(let i=0;i<n;i++){const a=pieces.length*Math.PI/4+.12;pieces.push({id,x:450+Math.cos(a)*200,y:450+Math.sin(a)*200});}const result=scorePizza(pieces,orders[0].recipe,120);assert.equal(result.accuracy,100);assert.equal(result.stars,3);assert.ok(result.earned>=115);});
test('an empty pizza earns no reward',()=>{assert.equal(scorePizza([],orders[0].recipe,120).earned,0);});
test('extra and wrong ingredients cannot improve recipe accuracy',()=>{const recipe={salami:2};const correct=[{id:'salami',x:300,y:300},{id:'salami',x:600,y:600}];assert.equal(scorePizza(correct,recipe,100).accuracy,100);assert.equal(scorePizza([...correct,{id:'olive',x:450,y:300}],recipe,100).accuracy,50);assert.equal(scorePizza([...correct,...correct],recipe,100).accuracy,0);});
test('ingredients must stay inside the topped area',()=>{assert.equal(insidePizza(450,450),true);assert.equal(insidePizza(792,450),true);assert.equal(insidePizza(793,450),false);assert.equal(insidePizza(NaN,450),false);assert.equal(insidePizza(0,0),false);});
test('counts are derived from remaining pieces',()=>{assert.deepEqual(counts([{id:'basil'},{id:'salami'},{id:'basil'}]),{basil:2,salami:1});});
