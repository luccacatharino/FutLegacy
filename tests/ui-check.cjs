const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');const root=path.resolve(__dirname,'..');let html='';let stored;const app={set innerHTML(v){html=v}};const doc={querySelector:s=>s==='#app'?app:null,querySelectorAll:()=>[],body:{dataset:{}}};const ctx=vm.createContext({document:doc,localStorage:{getItem:()=>null,setItem:(k,v)=>stored=JSON.parse(v)},clearInterval(){},console});for(const f of ['profiles','data','engine','tournament','badges','app'])vm.runInContext(fs.readFileSync(path.join(root,'js',f+'.js'),'utf8'),ctx);assert.equal((html.match(/assets\/photos\//g)||[]).length,4);
vm.runInContext(`
const click=d=>document.onclick({target:{closest:()=>({dataset:d})}});
for(let comp of Object.keys(FL.comps))for(let formation of Object.keys(FL.formations))for(let trial=0;trial<3;trial++){
 selectedSlot=0;c={comp,formation,cards:[],rerolls:3};offer();render('draft');let step=0;
 while(c.cards.filter(Boolean).length<11&&step++<12){const team=FL.teams.find(t=>t.id===c.offer),available=team.cards.filter(p=>!c.cards.some(q=>q?.id===p.id)&&FL.openSlots(c.cards,formation,p).length),p=available[Math.floor(Math.random()*available.length)];if(!p)throw Error('stuck');let oldOffer=c.offer,oldCount=c.cards.filter(Boolean).length;
 click({pick:p.id});if(c.cards.filter(Boolean).length!==oldCount||c.offer!==oldOffer||c.pendingPick!==p.id)throw Error('pick consumed before positioning');
 if(step===1){click({action:'cancel-pick'});if(c.pendingPick||c.offer!==oldOffer||c.rerolls!==3)throw Error('cancel');click({pick:p.id});}
 const legal=FL.openSlots(c.cards,formation,p),natural=legal.filter(x=>x.fit===1),slot=(natural.length?natural:legal)[0];
 let wrong=FL.formations[formation].findIndex((pos,i)=>!c.cards[i]&&!FL.fit(p,pos));if(wrong>=0){click({place:String(wrong)});if(c.cards.filter(Boolean).length!==oldCount)throw Error('invalid position accepted')}
 click(step%2?{slot:String(slot.index)}:{place:String(slot.index)});
 if(c.cards.filter(Boolean).length!==oldCount+1||c.pendingPick)throw Error('position not committed once');
 }
 if(view!=='lineup'||FL.lineupIssues(c.cards,formation).length)throw Error('invalid XI');if(new Set(c.cards.map(p=>p.id)).size!==11)throw Error('duplicates');FL.createTournament(c);
}
let b=FL.teams.find(t=>t.comp==='ucl'&&t.name==='Barcelona');let messi=b.cards.find(p=>p.name==='Lionel Messi');if(FL.fit(messi,'ATA')!==1||FL.fit(messi,'PD')!==1||FL.fit(messi,'MEI')!==1||FL.fit(messi,'ZAG')!==0)throw Error('Messi eligibility');
c={comp:'ucl',formation:'4-3-3',cards:[],rerolls:3,offer:b.id};render('draft');click({pick:messi.id});const snapshot=JSON.parse(JSON.stringify(c));if(snapshot.pendingPick!==messi.id)throw Error('pending restore');let foreign=FL.teams.find(t=>t.comp==='wc').cards[0];if(FL.placeDraftPlayer(c,foreign.id,0))throw Error('foreign offer');click({action:'reroll'});if(c.pendingPick||c.rerolls!==2||c.cards.filter(Boolean).length)throw Error('reroll leaked selection');
for(const t of FL.teams){for(const p of t.cards){if(!p.positions.includes(p.pos)||new Set(p.positions).size!==p.positions.length)throw Error('profile');for(const v of [p.ovr,...Object.values(p.attrs)])if(!Number.isInteger(v)||v<1||v>99)throw Error('attribute range');if(p.pos==='GOL'&&(p.positions.length!==1||FL.fit(p,'ATA')))throw Error('keeper');}}
const find=(comp,team,year,name)=>FL.teams.find(t=>t.comp===comp&&t.name===team&&t.year===year).cards.find(p=>p.name===name);
if(find('lib','Flamengo',2022,'Arrascaeta').ovr!==90||find('wc','Uruguai',2022,'Arrascaeta').ovr!==83)throw Error('context requirement');
if(find('ucl','Inter',2023,'Federico Dimarco').positions.includes('PD'))throw Error('Dimarco');if(find('lib','Athletico-PR',2022,'Hugo Moura').pos!=='VOL')throw Error('Hugo Moura');if(find('wc','França',2022,'Olivier Giroud').attrs.vel>65)throw Error('Giroud speed');if(messi.attrs.vel<=find('wc','Argentina',2022,'Lionel Messi').attrs.vel)throw Error('season speeds');
console.log('PASS: 36 full player-first drafts in all competitions/formations; natural and adapted roles; selection/cancel/reroll; invalid/foreign placement; 176 profiles; contextual ratings; keeper validation');
`,ctx);
