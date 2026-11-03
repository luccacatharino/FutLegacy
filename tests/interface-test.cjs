const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path'),root=path.resolve(__dirname,'..');let html='',stored=null;const elements={};const context=new Proxy({},{get:(o,k)=>o[k]||(()=>{})});const app={get innerHTML(){return html},set innerHTML(v){html=v},querySelectorAll:()=>[]};const node=()=>({innerHTML:'',textContent:'',style:{},children:[],insertAdjacentHTML(){},querySelectorAll:()=>[]});const canvas={width:1100,height:660,getContext:()=>context};const document={body:{dataset:{}},querySelector:s=>s==='#app'?app:s==='#match-canvas'?canvas:elements[s]||null,querySelectorAll:()=>[]};const ctx=vm.createContext({console,document,localStorage:{getItem:()=>null,setItem:(k,v)=>stored=JSON.parse(v)},clearInterval(){},clearTimeout(){},setTimeout:()=>1,cancelAnimationFrame(){},requestAnimationFrame:()=>1,performance:{now:()=>1}});const scripts=[...fs.readFileSync(root+'/index.html','utf8').matchAll(/<script src="([^?"]+)/g)].map(m=>m[1]);scripts.forEach(file=>vm.runInContext(fs.readFileSync(root+'/'+file,'utf8'),ctx,{filename:file}));
vm.runInContext(`
const click=d=>document.onclick({target:{closest:()=>({dataset:d})}});
c={comp:'lib',formation:'4-3-3',cards:[],rerolls:3,seenOffers:[]};offer();const originalCampaign=c;click({comp:'ucl'});render('menu');if(c!==originalCampaign)throw Error('setup navigation overwrote current campaign');
if(Object.keys(FL.comps).join(',')!=='lib,ucl,wc')throw Error('removed mode still available');
for(const comp of Object.keys(FL.comps))for(const formation of Object.keys(FL.formations)){
 c={comp,formation,cards:Array(11).fill(null),rerolls:3,seenOffers:[]};selectedSlot=0;offer();render('draft');const firstOffer=c.offer;click({action:'reroll'});if(c.offer===firstOffer||c.rerolls!==2||!c.seenOffers.includes(firstOffer))throw Error('reroll reused roster');const initialTeam=FL.teams.find(t=>t.id===c.offer),filter=initialTeam.cards[0].pos;document.onchange({target:{id:'position-filter',value:filter}});if((app.innerHTML.match(/data-pick=/g)||[]).length!==FL.sortedCards(initialTeam.cards,filter).length)throw Error('position filter');document.onchange({target:{id:'position-filter',value:'all'}});
 for(let i=0;i<11;i++){
  const team=FL.teams.find(t=>t.id===c.offer),ordered=FL.sortedCards(team.cards);let prev=Infinity;for(const p of ordered){if(p.ovr>prev)throw Error('sort');prev=p.ovr}
  const options=ordered.flatMap(p=>FL.openSlots(c.cards,formation,p).map(slot=>({p,...slot}))).sort((a,b)=>b.fit-a.fit||b.p.ovr-a.p.ovr),choice=options[0],count=c.cards.filter(Boolean).length,draw=c.offer;
  click({pick:choice.p.id});if(c.cards.filter(Boolean).length!==count||c.offer!==draw)throw Error('selection consumed early');if(!app.innerHTML.includes('ESCOLHA ONDE ELE VAI JOGAR'))throw Error('placement missing');
  click({action:'cancel-pick'});if(c.pendingPick)throw Error('cancel');click({pick:choice.p.id});click({place:String(choice.index)});
  if(c.cards.filter(Boolean).length!==count+1)throw Error('placement');
 }
 if(view!=='lineup'||FL.lineupIssues(c.cards,formation).length)throw Error('invalid XI');
 const saved=JSON.parse(JSON.stringify(c));if(!saved.seenOffers?.length)throw Error('seen not persisted');
 c.tournament=FL.createTournament(c);render('tournament');if(!app.innerHTML.includes('PRÓXIMO CONFRONTO')||!app.innerHTML.includes('Artilharia')||!app.innerHTML.includes('Calendário completo'))throw Error('tournament UI');
}
console.log('PASS 24 UI drafts, sorted offers, player then position, cancel, valid XI, 8 formations, 3 competitions, tournament calendar/leaders, saved seen ids.');
`,ctx);
for(const id of ['#score','#minute','#match-action','#possession','#live-stats','#feed','#goals'])elements[id]=node();vm.runInContext(`play()`,ctx);assert(html.includes('match-canvas'));app.onclick({target:{closest:()=>({dataset:{action:'speed-4'}})}});app.onclick({target:{closest:()=>({dataset:{action:'skip'}})}});assert(html.includes('APITO FINAL'));assert(html.includes('Gols e assistências'));assert(stored.campaign.tournament.results.length>0);console.log('PASS canvas playback starts, 4x control, skip commits once, final stats and goals saved without animations.');
