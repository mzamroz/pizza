function rng(seed) { return ()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}; }
function ellipse(c,x,y,rx,ry,color,rotation=0){c.beginPath();c.ellipse(x,y,rx,ry,rotation,0,Math.PI*2);c.fillStyle=color;c.fill();}
export function drawIngredient(c,id,x=0,y=0,size=1,rotation=0,seed=1){
  c.save();c.translate(x,y);c.rotate(rotation);c.scale(size,size);const rand=rng(seed+12);
  c.shadowColor='#442b2b44';c.shadowBlur=3;c.shadowOffsetY=2;
  if(id==='salami'){
    const g=c.createRadialGradient(-8,-10,1,0,0,32);g.addColorStop(0,'#d66a43');g.addColorStop(.85,'#b5432b');g.addColorStop(1,'#8c3120');ellipse(c,0,0,32,30,g);c.shadowColor='transparent';
    c.lineWidth=1.2;c.strokeStyle='#e48754';c.stroke();
    for(let i=0;i<32;i++){const a=rand()*Math.PI*2,r=Math.sqrt(rand())*27;ellipse(c,Math.cos(a)*r,Math.sin(a)*r,1+rand()*2.4,1+rand()*1.7,i%4===0?'#822c22':'#eab785',rand()*3);}
  } else if(id==='mushroom'){
    c.fillStyle='#e0cbb0';c.beginPath();c.moveTo(-8,-1);c.lineTo(-11,25);c.quadraticCurveTo(0,32,11,23);c.lineTo(7,-2);c.fill();
    c.fillStyle='#d9c5a4';c.beginPath();c.moveTo(-32,5);c.bezierCurveTo(-35,-36,31,-37,32,5);c.quadraticCurveTo(0,17,-32,5);c.fill();c.shadowColor='transparent';ellipse(c,0,4,29,10,'#92775d');ellipse(c,0,5,25,6,'#b7a085');
    c.strokeStyle='#68534455';c.lineWidth=1.2;for(let i=-23;i<=23;i+=4){c.beginPath();c.moveTo(i,2);c.lineTo(i*.4,10);c.stroke();}ellipse(c,0,4,8,6,'#dfcdb0');c.strokeStyle='#f6e2be';c.beginPath();c.moveTo(-27,-7);c.quadraticCurveTo(-8,-32,17,-18);c.stroke();
  } else if(id==='basil'||id==='arugula'){
    const g=c.createLinearGradient(-17,0,20,0);g.addColorStop(0,'#31592c');g.addColorStop(.48,'#56823c');g.addColorStop(.5,'#86a655');g.addColorStop(.54,'#416f31');g.addColorStop(1,'#648b41');c.fillStyle=g;
    c.beginPath();c.moveTo(0,31);
    if(id==='basil'){c.bezierCurveTo(-40,11,-26,-25,0,-37);c.bezierCurveTo(27,-20,29,9,0,31);}else{c.bezierCurveTo(-5,21,-32,22,-15,9);c.bezierCurveTo(-35,4,-20,-7,-10,-4);c.bezierCurveTo(-27,-19,-8,-18,-4,-15);c.bezierCurveTo(-13,-39,7,-40,8,-17);c.bezierCurveTo(28,-28,27,-7,12,-5);c.bezierCurveTo(32,-5,26,13,10,11);c.bezierCurveTo(24,23,8,28,0,31);}c.fill();c.shadowColor='transparent';c.lineWidth=1;c.strokeStyle='#acc07a88';c.beginPath();c.moveTo(0,37);c.lineTo(0,-30);c.stroke();for(let i=-20;i<22;i+=10){c.beginPath();c.moveTo(0,i+8);c.lineTo(-13,i-1);c.moveTo(0,i+8);c.lineTo(13,i-1);c.stroke();}
  } else if(id==='tomato'){
    ellipse(c,0,0,28,26,'#a63220');ellipse(c,0,0,25,23,'#e6653f');c.shadowColor='transparent';ellipse(c,0,0,20,19,'#c33923');for(let i=0;i<5;i++){const a=i*Math.PI*2/5;c.save();c.rotate(a);ellipse(c,0,-11,7,9,'#e78b52');ellipse(c,0,-13,4,6,'#a64027');ellipse(c,-1,-12,1.5,3,'#f3c787');c.restore();}ellipse(c,0,0,5,5,'#e6ac74');c.strokeStyle='#f4a16a';c.lineWidth=1;c.beginPath();c.arc(0,0,24,.2,2);c.stroke();
  } else if(id==='mozzarella'){
    const g=c.createRadialGradient(-8,-10,0,0,0,33);g.addColorStop(0,'#fffcdf');g.addColorStop(.7,'#f5ebca');g.addColorStop(1,'#d9caa1');c.fillStyle=g;c.beginPath();for(let i=0;i<=28;i++){let a=i/28*Math.PI*2,r=28+Math.sin(a*5)*2;c.lineTo(Math.cos(a)*r,Math.sin(a)*r*.86);}c.closePath();c.fill();c.shadowColor='transparent';for(let i=0;i<10;i++)ellipse(c,(rand()-.5)*37,(rand()-.5)*30,1+rand()*2,1,'#d8c79844');
  } else if(id==='olive'){
    c.lineWidth=11;c.strokeStyle='#373827';c.beginPath();c.ellipse(0,0,16,14,0,0,Math.PI*2);c.stroke();c.shadowColor='transparent';c.lineWidth=3;c.strokeStyle='#70714b';c.beginPath();c.ellipse(0,-1,17,14,0,3.4,5.8);c.stroke();c.lineWidth=2;c.strokeStyle='#21261e';c.beginPath();c.ellipse(0,0,11,9,0,0,Math.PI*2);c.stroke();
  } else if(id==='onion'){
    c.lineWidth=5;c.strokeStyle='#995978';c.beginPath();c.ellipse(0,0,29,22,.15,.2,Math.PI*1.94);c.stroke();c.shadowColor='transparent';c.lineWidth=2.5;c.strokeStyle='#e0afbe';c.stroke();c.lineWidth=3;c.strokeStyle='#be829e';c.beginPath();c.ellipse(0,0,21,15,.15,.4,Math.PI*1.9);c.stroke();c.lineWidth=1.3;c.strokeStyle='#eed3d4';c.stroke();
  } else if(id==='pepper'){
    c.lineWidth=11;c.strokeStyle='#c78220';c.beginPath();c.moveTo(-28,15);c.bezierCurveTo(-18,-30,13,-31,29,8);c.stroke();c.shadowColor='transparent';c.lineWidth=7;c.strokeStyle='#ebba40';c.stroke();c.lineWidth=2;c.strokeStyle='#ffdc6c';c.beginPath();c.moveTo(-27,12);c.bezierCurveTo(-18,-25,12,-27,25,3);c.stroke();
  } else if(id==='ham'){
    c.fillStyle='#d48b7c';c.beginPath();c.moveTo(-30,-21);c.quadraticCurveTo(-2,-26,29,-13);c.lineTo(23,27);c.quadraticCurveTo(0,16,-28,26);c.closePath();c.fill();c.shadowColor='transparent';c.lineWidth=4;c.strokeStyle='#e9b7a3';c.beginPath();c.moveTo(-29,-19);c.quadraticCurveTo(-5,-25,28,-12);c.stroke();for(let i=0;i<18;i++){ellipse(c,(rand()-.5)*43,(rand()-.5)*33,1+rand()*3,.7,'#a8554b44',-.2);}c.strokeStyle='#f1c4b1aa';c.lineWidth=1;c.beginPath();c.moveTo(-21,0);c.quadraticCurveTo(0,-7,21,16);c.stroke();
  }c.restore();
}
export function makeIcon(id, width=140, height=100, single=false){const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const c=canvas.getContext('2d');const scale=Math.min(width/100,height/85);if(single){drawIngredient(c,id,width/2,height/2,scale,0,4);}else{drawIngredient(c,id,width*.4,height*.48,scale*.79,-.45,2);drawIngredient(c,id,width*.6,height*.54,scale*.83,.6,17);if(['olive','basil','arugula','pepper'].includes(id))drawIngredient(c,id,width*.43,height*.6,scale*.7,-1.1,28);}return canvas;}
export function createBase(){
  const canvas=document.createElement('canvas');canvas.width=900;canvas.height=900;const c=canvas.getContext('2d');const rand=rng(812);
  c.shadowColor='#62432070';c.shadowBlur=16;c.shadowOffsetY=10;
  const crust=c.createRadialGradient(400,380,220,450,450,402);crust.addColorStop(0,'#d59643');crust.addColorStop(.84,'#e0ac5e');crust.addColorStop(.93,'#edc281');crust.addColorStop(1,'#b67533');
  c.beginPath();for(let i=0;i<=180;i++){const a=i/180*Math.PI*2;const r=393+Math.sin(a*7)*3+Math.cos(a*11)*2;c.lineTo(450+Math.cos(a)*r,450+Math.sin(a)*r);}c.closePath();c.fillStyle=crust;c.fill();c.shadowColor='transparent';
  for(let i=0;i<550;i++){const a=rand()*Math.PI*2,r=354+rand()*36;ellipse(c,450+Math.cos(a)*r,450+Math.sin(a)*r,1+rand()*7,.7+rand()*4,['#9b532155','#fce2a860','#82502f66','#dda36388'][i%4],a);}
  c.beginPath();for(let i=0;i<=180;i++){const a=i/180*Math.PI*2,r=354+Math.sin(a*13)*3+Math.cos(a*21)*2;c.lineTo(450+Math.cos(a)*r,450+Math.sin(a)*r);}c.closePath();c.fillStyle='#a83e20';c.fill();
  c.save();c.clip();for(let i=0;i<900;i++){const x=90+rand()*720,y=90+rand()*720;ellipse(c,x,y,3+rand()*9,2+rand()*5,['#d4612e','#8c321d','#e08842'][i%3],rand()*6);}
  const cheese=c.createRadialGradient(370,320,10,450,450,350);cheese.addColorStop(0,'#f6d77b');cheese.addColorStop(.6,'#edc567');cheese.addColorStop(1,'#e8b453');
  c.beginPath();for(let i=0;i<=240;i++){const a=i/240*Math.PI*2,r=340+Math.sin(a*19)*4+Math.cos(a*37)*3;c.lineTo(450+Math.cos(a)*r,450+Math.sin(a)*r);}c.closePath();c.fillStyle=cheese;c.fill();
  for(let i=0;i<1800;i++){const a=rand()*Math.PI*2,r=Math.sqrt(rand())*340,x=450+Math.cos(a)*r,y=450+Math.sin(a)*r;ellipse(c,x,y,1+rand()*6,.7+rand()*3,['#fff1b73b','#dc9e4438','#f9e6a857','#b77e3524'][i%4],rand()*6);}
  for(let i=0;i<150;i++){const a=rand()*Math.PI*2,r=Math.sqrt(rand())*330,x=450+Math.cos(a)*r,y=450+Math.sin(a)*r;const g=c.createRadialGradient(x,y,0,x,y,8);g.addColorStop(0,'#ba6d2966');g.addColorStop(.5,'#d68c373a');g.addColorStop(1,'#dda44200');ellipse(c,x,y,8,6,g);}
  for(let i=0;i<95;i++){const a=rand()*Math.PI*2,r=Math.sqrt(rand())*340;ellipse(c,450+Math.cos(a)*r,450+Math.sin(a)*r,1.3,.7,'#62663780',rand()*6);}c.restore();return canvas;
}
