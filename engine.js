export const ingredients = [
  { id:'salami', name:'Salami', color:'#b8442f' }, { id:'mushroom', name:'Pieczarki', color:'#c8b998' },
  { id:'basil', name:'Bazylia', color:'#467538' }, { id:'tomato', name:'Pomidorki', color:'#cb482d' },
  { id:'mozzarella', name:'Mozzarella', color:'#f9f0cf' }, { id:'olive', name:'Oliwki', color:'#383b28' },
  { id:'onion', name:'Czerwona cebula', color:'#aa6385' }, { id:'pepper', name:'Papryka', color:'#e9ab3c' },
  { id:'ham', name:'Szynka', color:'#d58c80' }, { id:'arugula', name:'Rukola', color:'#527337' }
];

/** minLevel: 1 = od startu, 2 = od poziomu 2, 3 = gęstsze pizze na wyższych poziomach */
export const orders = [
  { name:'Marco', avatar:'👨🏻', subtitle:'Mam ochotę na coś klasycznego.', title:'Pizza del giorno', quote:'Salami, pieczarki i trochę bazylii. Tak jak w mojej ulubionej pizzerii!', recipe:{salami:12,mushroom:9,basil:8}, reward:120, minLevel:1 },
  { name:'Sofia', avatar:'👩🏽', subtitle:'Dziś wybieram włoski klasyk.', title:'La Caprese', quote:'Pomidorki, miękka mozzarella i świeża bazylia. Ma smakować jak lato!', recipe:{tomato:12,mozzarella:9,basil:9}, reward:130, minLevel:1 },
  { name:'Luca', avatar:'🧔🏻', subtitle:'Po pracy należy się coś dobrego.', title:'Prosciutto e funghi', quote:'Poproszę szynkę z pieczarkami i oliwkami. Po trochu na każdym kawałku!', recipe:{ham:11,mushroom:11,olive:12}, reward:140, minLevel:1 },
  { name:'Giulia', avatar:'👩🏻‍🦱', subtitle:'Kolorowo, świeżo, bez mięsa.', title:'Il Giardino', quote:'Papryka, cebula, pomidorki i rukola. Cały ogród na jednej pizzy!', recipe:{pepper:9,onion:8,tomato:9,arugula:8}, reward:150, minLevel:2 },
  { name:'Antonio', avatar:'👨🏽‍🦳', subtitle:'Zaskocz starego pizzaiolo.', title:'La Piccola speciale', quote:'Salami i mozzarella, do tego oliwki i papryka. To mój ulubiony zestaw.', recipe:{salami:12,mozzarella:8,olive:11,pepper:9}, reward:160, minLevel:2 },
  { name:'Chiara', avatar:'👩🏻', subtitle:'Lekko i słodko.', title:'Cipolla dolce', quote:'Czerwona cebula, mozzarella i odrobinę bazylii. Niech będzie pełna, od środka po brzeg!', recipe:{onion:12,mozzarella:10,basil:10}, reward:145, minLevel:2 },
  { name:'Paolo', avatar:'👨🏻‍🦰', subtitle:'Po treningu coś sycącego.', title:'Prosciutto rucola', quote:'Dużo szynki, rukola na wierzchu i kilka oliwek. Każdy kawałek ma się liczyć!', recipe:{ham:12,arugula:14,olive:10}, reward:155, minLevel:2 },
  { name:'Elena', avatar:'👩🏼', subtitle:'Śródziemnomorski klimat.', title:'Mediterranea', quote:'Pomidorki, oliwki i czerwona cebula. Nie zostawiaj pustego sera w środku!', recipe:{tomato:11,olive:12,onion:10}, reward:150, minLevel:2 },
  { name:'Matteo', avatar:'👨🏻‍🍳', subtitle:'Lubię kontrast smaków.', title:'Piccante e funghi', quote:'Salami, papryka i pieczarki. Rozłóż je na całym placku, proszę.', recipe:{salami:11,pepper:11,mushroom:10}, reward:155, minLevel:2 },
  { name:'Rosa', avatar:'👵', subtitle:'Dla wnuków — wszystko naraz.', title:'La Nonna', quote:'Szynka, mozzarella, pomidorki, cebula i rukola. Gęsto, jak u mnie w domu!', recipe:{ham:10,mozzarella:9,tomato:9,onion:8,arugula:10}, reward:180, minLevel:3 },
  { name:'Nico', avatar:'🧑🏻', subtitle:'Im więcej, tym lepiej.', title:'Tutti i gusti', quote:'Salami, pieczarki, oliwki, papryka i bazylia. Zero pustych miejsc!', recipe:{salami:10,mushroom:9,olive:10,pepper:9,basil:10}, reward:190, minLevel:3 }
];

export function counts(pieces) { return pieces.reduce((out,p)=>(out[p.id]=(out[p.id]||0)+1,out),{}); }
export function insidePizza(x,y) { return Number.isFinite(x) && Number.isFinite(y) && Math.hypot(x-450,y-450)<343; }

export function levelFromServed(served) { return 1+Math.floor(served/3); }

/** Indeks zamówienia z puli odblokowanej na danym poziomie (deterministycznie z `served`). */
export function orderIndexForServed(served) {
  const level=levelFromServed(served);
  const indices=orders.map((o,i)=>i).filter(i=>(orders[i].minLevel||1)<=level);
  return indices[served%indices.length];
}

/** Pokrycie: 3 pierścienie × 8 wycinków = 24 komórki. */
export function pizzaCoverage(pieces) {
  const sectors=8, rings=3, total=sectors*rings;
  const cells=Array(total).fill(0);
  const bins=Array(sectors).fill(0);
  let center=0, mid=0, edge=0;
  for(const p of pieces){
    const dx=p.x-450, dy=p.y-450, r=Math.hypot(dx,dy);
    const sector=Math.floor(((Math.atan2(dy,dx)+Math.PI)/(2*Math.PI))*sectors)%sectors;
    const ring=r<120?0:r<230?1:2;
    cells[ring*sectors+sector]++;
    bins[sector]++;
    if(ring===0)center++;else if(ring===1)mid++;else edge++;
  }
  const filled=cells.filter(n=>n>0).length;
  const coverage=pieces.length?filled/total:0;
  const emptySectors=bins.filter(n=>n===0).length;
  return {
    coverage,
    bins,
    emptySectors,
    emptyCenter:!center,
    emptyMid:!mid,
    emptyEdge:!edge,
    center, mid, edge
  };
}

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
  const { coverage }=pizzaCoverage(pieces);
  const score=Math.round(100*accuracy*(.6+.2*spread+.2*coverage));
  return {
    accuracy:Math.round(accuracy*100),
    spread:Math.round(spread*100),
    coverage:Math.round(coverage*100),
    score,
    stars:score>=90?3:score>=65?2:score>=30?1:0,
    earned:Math.round(maxReward*score/100)
  };
}
