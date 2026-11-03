const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');let html='';const root=path.resolve(__dirname,'..');const el={set innerHTML(v){html=v},get innerHTML(){return html}};const doc={querySelector:s=>s==='#app'?el:null,querySelectorAll:()=>[],body:{dataset:{}}};const saves=[];const ctx=vm.createContext({document:doc,localStorage:{getItem:()=>null,setItem:(k,v)=>saves.push(JSON.parse(v))},clearInterval(){},console});for(let f of ['data','engine','tournament','app'])vm.runInContext(fs.readFileSync(path.join(root,'js',f+'.js'),'utf8'),ctx);assert.equal((html.match(/assets\/photos\//g)||[]).length,4);assert.equal((html.match(/assets\/logos\//g)||[]).length,4);
vm.runInContext(`
for(let formation of Object.keys(FL.formations)){
 selectedSlot=0;c={comp:'wc',formation,cards:[],rerolls:3};offer();render('draft');
 const click=d=>document.onclick({target:{closest:()=>({dataset:d})}});
 click({slot:'9'});if(selectedSlot!==9)throw Error('field selection');
 let team=FL.teams.find(t=>t.id===c.offer),p=team.cards.find(p=>p.pos==='ATA');click({pick:p.id});if(c.cards.filter(Boolean).length!==1||view!=='draft')throw Error('sparse draft advanced prematurely');
 click({slot:'0'});if(selectedSlot!==0)throw Error('slot zero');
 let keeper=FL.teams.find(t=>t.id===c.offer).cards[0];click({pick:keeper.id});if(!c.cards[0]||c.cards[0].pos!=='GOL')throw Error('goalkeeper');
 let keeperId=c.cards[0].id;click({slot:'0'});if(selectedSlot===0)throw Error('occupied slot selected');
 while(c.cards.filter(Boolean).length<11){let t=FL.teams.find(t=>t.id===c.offer),pos=FL.formations[formation][selectedSlot];let p=t.cards.find(p=>p.pos===pos&&!c.cards.some(q=>q?.id===p.id))||t.cards.find(p=>FL.fit(p,pos)&&!c.cards.some(q=>q?.id===p.id));click({pick:p.id});}
 if(view!=='lineup')throw Error('not review');if(new Set(c.cards.map(p=>p.id)).size!==11)throw Error('duplicate');if(c.cards[0].id!==keeperId)throw Error('keeper changed');
 let saved=JSON.parse(JSON.stringify(c));if(saved.cards.length!==11)throw Error('save');
}
`,ctx);for(let name of ['messi','cr7','mbappe','neymar']){let b=fs.readFileSync(path.join(root,'assets/photos',name+'.jpg'));assert.equal(b[0],255);assert.equal(b[1],216)}for(let name of ['lib','bra','ucl','wc']){let s=fs.readFileSync(path.join(root,'assets/logos',name+'.svg'),'utf8');assert(s.includes('<svg'));assert(!/<script\b/i.test(s))}console.log('PASS: 3 full field-based drafts; slot 0; arbitrary position order; occupied slots; unique cards; save; 4 JPEG photos; 4 SVG logos');
