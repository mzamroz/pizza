import test from 'node:test';
import assert from 'node:assert/strict';
import { scorePizza, insidePizza, counts, orders, pizzaCoverage, orderIndexForServed, levelFromServed } from './engine.js';

/** Rozrzuca przepis równomiernie: 8 wycinków × 3 pierścienie (środek / środek / brzeg). */
function spreadRecipe(recipe){
  const pieces=[];
  const entries=Object.entries(recipe);
  let i=0;
  const total=Object.values(recipe).reduce((a,b)=>a+b,0);
  for(const [id,n] of entries){
    for(let k=0;k<n;k++,i++){
      const sector=i%8;
      const ring=Math.floor(i/8)%3;
      const a=sector*Math.PI/4+.12;
      const r=[80,175,280][ring];
      pieces.push({id,x:450+Math.cos(a)*r,y:450+Math.sin(a)*r});
    }
  }
  assert.equal(pieces.length,total);
  return pieces;
}

test('exact recipe spread over rings and slices earns near-full reward',()=>{
  const pieces=spreadRecipe(orders[0].recipe);
  const cov=pizzaCoverage(pieces);
  assert.ok(cov.coverage>=0.7,`coverage ${cov.coverage}`);
  const result=scorePizza(pieces,orders[0].recipe,120);
  assert.equal(result.accuracy,100);
  assert.ok(result.coverage>=70);
  assert.equal(result.stars,3);
  assert.ok(result.earned>=100);
});

test('clustered correct counts score lower due to poor coverage',()=>{
  const recipe=orders[0].recipe;
  const pieces=[];
  for(const [id,n] of Object.entries(recipe))
    for(let i=0;i<n;i++) pieces.push({id,x:450+i*3,y:450});
  const clustered=scorePizza(pieces,recipe,120);
  const spread=scorePizza(spreadRecipe(recipe),recipe,120);
  assert.equal(clustered.accuracy,100);
  assert.ok(clustered.coverage<spread.coverage);
  assert.ok(clustered.score<spread.score);
  assert.ok(clustered.stars<=2);
});

test('an empty pizza earns no reward',()=>{
  assert.equal(scorePizza([],orders[0].recipe,120).earned,0);
  assert.equal(scorePizza([],orders[0].recipe,120).coverage,0);
});

test('extra and wrong ingredients cannot improve recipe accuracy',()=>{
  const recipe={salami:2};
  const correct=[{id:'salami',x:300,y:300},{id:'salami',x:600,y:600}];
  assert.equal(scorePizza(correct,recipe,100).accuracy,100);
  assert.equal(scorePizza([...correct,{id:'olive',x:450,y:300}],recipe,100).accuracy,50);
  assert.equal(scorePizza([...correct,...correct],recipe,100).accuracy,0);
});

test('ingredients must stay inside the topped area',()=>{
  assert.equal(insidePizza(450,450),true);
  assert.equal(insidePizza(792,450),true);
  assert.equal(insidePizza(793,450),false);
  assert.equal(insidePizza(NaN,450),false);
  assert.equal(insidePizza(0,0),false);
});

test('counts are derived from remaining pieces',()=>{
  assert.deepEqual(counts([{id:'basil'},{id:'salami'},{id:'basil'}]),{basil:2,salami:1});
});

test('order pool grows with level',()=>{
  assert.equal(levelFromServed(0),1);
  assert.equal(levelFromServed(3),2);
  assert.equal(levelFromServed(6),3);
  assert.ok(orderIndexForServed(0)<3);
  const early=new Set([...Array(6)].map((_,s)=>orderIndexForServed(s)));
  assert.ok([...early].every(i=>(orders[i].minLevel||1)<=2));
  const late=orderIndexForServed(9);
  assert.ok((orders[late].minLevel||1)<=3);
  assert.ok(orders.some(o=>o.minLevel===3));
  assert.ok(orders.length>=10);
});
