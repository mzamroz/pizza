export const ingredients = [
  { id:'salami', name:'Salami', color:'#b8442f' }, { id:'mushroom', name:'Pieczarki', color:'#c8b998' },
  { id:'basil', name:'Bazylia', color:'#467538' }, { id:'tomato', name:'Pomidorki', color:'#cb482d' },
  { id:'mozzarella', name:'Mozzarella', color:'#f9f0cf' }, { id:'olive', name:'Oliwki', color:'#383b28' },
  { id:'onion', name:'Czerwona cebula', color:'#aa6385' }, { id:'pepper', name:'Papryka', color:'#e9ab3c' },
  { id:'ham', name:'Szynka', color:'#d58c80' }, { id:'arugula', name:'Rukola', color:'#527337' }
];
export const orders = [
  { name:'Marco', avatar:'👨🏻', subtitle:'Mam ochotę na coś klasycznego.', title:'Pizza del giorno', quote:'Salami, pieczarki i trochę bazylii. Tak jak w mojej ulubionej pizzerii!', recipe:{salami:8,mushroom:6,basil:5}, reward:120 },
  { name:'Sofia', avatar:'👩🏽', subtitle:'Dziś wybieram włoski klasyk.', title:'La Caprese', quote:'Pomidorki, miękka mozzarella i świeża bazylia. Ma smakować jak lato!', recipe:{tomato:8,mozzarella:6,basil:6}, reward:130 },
  { name:'Luca', avatar:'🧔🏻', subtitle:'Po pracy należy się coś dobrego.', title:'Prosciutto e funghi', quote:'Poproszę szynkę z pieczarkami i oliwkami. Po trochu na każdym kawałku!', recipe:{ham:7,mushroom:7,olive:8}, reward:140 },
  { name:'Giulia', avatar:'👩🏻‍🦱', subtitle:'Kolorowo, świeżo, bez mięsa.', title:'Il Giardino', quote:'Papryka, cebula, pomidorki i rukola. Cały ogród na jednej pizzy!', recipe:{pepper:6,onion:5,tomato:6,arugula:5}, reward:150 },
  { name:'Antonio', avatar:'👨🏽‍🦳', subtitle:'Zaskocz starego pizzaiolo.', title:'La Piccola speciale', quote:'Salami i mozzarella, do tego oliwki i papryka. To mój ulubiony zestaw.', recipe:{salami:8,mozzarella:5,olive:7,pepper:6}, reward:160 }
];
export function counts(pieces) { return pieces.reduce((out,p)=>(out[p.id]=(out[p.id]||0)+1,out),{}); }
export function insidePizza(x,y) { return Number.isFinite(x) && Number.isFinite(y) && Math.hypot(x-450,y-450)<343; }
export function scorePizza(pieces,recipe,maxReward) {
  const actual=counts(pieces), required=Object.values(recipe).reduce((a,b)=>a+b,0);
  let error=0;
  for(const id of new Set([...Object.keys(actual),...Object.keys(recipe)])) error+=Math.abs((actual[id]||0)-(recipe[id]||0));
  const accuracy=Math.max(0,1-error/required);
  const bins=Array(8).fill(0);
  for(const p of pieces) bins[Math.floor(((Math.atan2(p.y-450,p.x-450)+Math.PI)/(2*Math.PI))*8)%8]++;
  const mean=pieces.length/8;
  const deviation=mean ? bins.reduce((n,x)=>n+Math.abs(x-mean),0)/(pieces.length*2) : 1;
  const spread=pieces.length ? Math.max(0,1-deviation) : 0;
  const score=Math.round(100*accuracy*(.75+.25*spread));
  return { accuracy:Math.round(accuracy*100), spread:Math.round(spread*100), score, stars:score>=90?3:score>=65?2:score>=30?1:0, earned:Math.round(maxReward*score/100) };
}
