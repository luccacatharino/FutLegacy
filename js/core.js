/* FutLegacy: catálogo e regras compartilhadas. Scripts clássicos para file://. */
'use strict';
const FL = {teams:[],cards:[],dataVersion:3,
 rarities:['Comum','Competitivo','Elite','Lendário'],weights:[.60,.28,.10,.02],
 styles:['Equilibrado','Posse de bola','Contra-ataque','Pressão alta','Defensivo'],
 comps:{lib:{name:'Libertadores',desc:'As histórias da América em um novo confronto.'},ucl:{name:'Champions League',desc:'Campeões de toda a história europeia.'},wc:{name:'Copa do Mundo',desc:'Seleções de várias Copas. Um novo destino.'}}};
FL.slug=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
FL.rng=seed=>()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296};
FL.sortedCards=(cards,position='all')=>cards.filter(p=>position==='all'||FL.positions(p).includes(position)).slice().sort((a,b)=>b.ovr-a.ovr||a.name.localeCompare(b.name,'pt-BR'));
FL.register=rows=>{for(const row of rows){const id=row.comp+'-'+FL.slug(row.name)+'-'+row.year;if(FL.teams.some(t=>t.id===id))throw Error('Elenco duplicado '+id);const t={...row,id};t.cards=row.players.map(p=>({...p,id:id+'-'+FL.slug(p.name),playerId:p.playerId||FL.slug(p.name),team:row.name,year:row.year,season:row.season,comp:row.comp,tier:row.tier,pos:p.positions[0],links:id,dataVersion:3}));delete t.players;t.ovr=Math.round(FL.sortedCards(t.cards).slice(0,11).reduce((n,p)=>n+p.ovr,0)/11);FL.teams.push(t);FL.cards.push(...t.cards)}};
FL.positions=p=>p.positions?.length?p.positions:[p.pos];
FL.fit=(p,pos)=>{if(!p)return 0;const natural=FL.positions(p);if(natural.includes(pos))return 1;if(natural.includes('GOL')||pos==='GOL')return 0;const nearby={LD:['MD'],LE:['ME'],MD:['PD','LD','MC'],ME:['PE','LE','MC'],PD:['MD','ATA'],PE:['ME','ATA'],MC:['VOL','MEI','MD','ME'],VOL:['MC','ZAG'],ZAG:['VOL'],MEI:['MC','ATA'],ATA:['MEI']};return natural.some(n=>(nearby[n]||[]).includes(pos))?.88:0};
FL.chem=cards=>Math.min(.04,cards.reduce((n,p,i)=>n+cards.slice(i+1).filter(q=>q.links===p.links).length,0)*.003);
FL.lineupIssues=(cards,formation)=>{const slots=FL.formations[formation],picked=cards.filter(Boolean),issues=[];if(picked.length!==11)issues.push('Preencha as onze vagas.');if(new Set(picked.map(p=>p.id)).size!==picked.length)issues.push('Há cartas repetidas.');slots.forEach((pos,i)=>{if(cards[i]&&!FL.fit(cards[i],pos))issues.push(cards[i].name+' não pode atuar em '+pos)});return issues};
FL.openSlots=(cards,formation,p)=>FL.formations[formation].flatMap((pos,i)=>!cards[i]&&FL.fit(p,pos)>0?[{index:i,pos,fit:FL.fit(p,pos)}]:[]);

FL.compName=comp=>FL.comps[comp]?.name||(comp==='bra'?'Brasileirão (modo removido)':comp);

FL.averageOvr=cards=>{const chosen=cards.filter(Boolean);return chosen.length?chosen.reduce((sum,p)=>sum+p.ovr,0)/chosen.length:0};
FL.playback={eventMs:160,duration(speed=1){return this.eventMs/([1,2,4].includes(speed)?speed:1)}};
