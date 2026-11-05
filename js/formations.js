'use strict';
FL.formations={
 '4-3-3':['GOL','LD','ZAG','ZAG','LE','VOL','MC','MEI','PD','ATA','PE'],
 '4-4-2':['GOL','LD','ZAG','ZAG','LE','VOL','MC','MD','ME','ATA','ATA'],
 '4-2-3-1':['GOL','LD','ZAG','ZAG','LE','VOL','VOL','MD','MEI','ME','ATA'],
 '4-2-4':['GOL','LD','ZAG','ZAG','LE','MC','MC','PD','ATA','ATA','PE'],
 '3-5-2':['GOL','ZAG','ZAG','ZAG','MD','VOL','MC','MEI','ME','ATA','ATA'],
 '5-3-2':['GOL','LD','ZAG','ZAG','ZAG','LE','VOL','MC','MEI','ATA','ATA'],
 '4-5-1':['GOL','LD','ZAG','ZAG','LE','MD','VOL','MC','MEI','ME','ATA'],
 '3-4-3':['GOL','ZAG','ZAG','ZAG','MD','MC','MC','ME','PD','ATA','PE']};
FL.layouts={
 '4-3-3':[[50,89],[85,73],[63,76],[37,76],[15,73],[50,60],[30,45],[70,45],[83,25],[50,17],[17,25]],
 '4-4-2':[[50,89],[85,74],[63,77],[37,77],[15,74],[38,55],[62,55],[84,40],[16,40],[65,20],[35,20]],
 '4-2-3-1':[[50,89],[85,74],[63,77],[37,77],[15,74],[35,58],[65,58],[84,37],[50,39],[16,37],[50,17]],
 '4-2-4':[[50,89],[85,74],[63,77],[37,77],[15,74],[35,51],[65,51],[85,28],[65,17],[35,17],[15,28]],
 '3-5-2':[[50,89],[75,75],[50,78],[25,75],[87,46],[50,60],[30,45],[68,40],[13,46],[65,18],[35,18]],
 '5-3-2':[[50,89],[88,66],[73,76],[50,79],[27,76],[12,66],[50,59],[27,43],[73,43],[65,20],[35,20]],
 '4-5-1':[[50,89],[85,74],[63,77],[37,77],[15,74],[87,43],[50,61],[31,48],[68,43],[13,43],[50,18]],
 '3-4-3':[[50,89],[75,75],[50,78],[25,75],[86,49],[63,53],[37,53],[14,49],[82,25],[50,17],[18,25]]};
/* Maximum-weight bipartite assignment. No player is lost when changing shape. */
FL.reform=(cards,formation)=>{const players=cards.filter(Boolean),slots=FL.formations[formation],memo=new Map();
 function solve(i,mask){if(i===players.length)return {score:0,pairs:[]};const key=i+':'+mask;if(memo.has(key))return memo.get(key);let best=null;for(let j=0;j<11;j++){let fit=FL.fit(players[i],slots[j]);if(mask>>j&1||!fit)continue;let tail=solve(i+1,mask|1<<j);if(tail&&(!best||tail.score+fit>best.score))best={score:tail.score+fit,pairs:[[i,j],...tail.pairs]}}memo.set(key,best);return best}
 const result=solve(0,0);if(!result)return null;const out=Array(11).fill(null);result.pairs.forEach(([i,j])=>out[j]=players[i]);return out};
FL.matchLineup=t=>{const starters=t.startingXI?.length===11?t.startingXI.map(name=>t.cards.find(p=>p.name===name)):t.cards.filter(p=>p.starter||p.starting);const candidates=starters.length===11&&starters.every(Boolean)?starters:t.cards.slice(0,11);let best=null;for(const formation of Object.keys(FL.formations)){let cards=FL.reform(candidates,formation);if(cards){let value=cards.reduce((n,p,i)=>n+p.ovr*FL.fit(p,FL.formations[formation][i]),0);if(!best||value>best.value)best={cards,formation,value}}}if(best)return best;
 // Match the entire registered squad to each supported formation; roster order is not a starting XI.
 for(const formation of Object.keys(FL.formations)){const slots=FL.formations[formation],owner=Array(t.cards.length).fill(-1),order=t.cards.map((p,i)=>i).sort((a,b)=>t.cards[b].ovr-t.cards[a].ovr);function assign(slot,seen){for(const i of order){if(seen.has(i)||!FL.fit(t.cards[i],slots[slot]))continue;seen.add(i);if(owner[i]<0||assign(owner[i],seen)){owner[i]=slot;return true}}return false}const slotOrder=slots.map((_,i)=>i).sort((a,b)=>t.cards.filter(p=>FL.fit(p,slots[a])).length-t.cards.filter(p=>FL.fit(p,slots[b])).length);if(slotOrder.every(slot=>assign(slot,new Set()))){const cards=Array(11);owner.forEach((slot,i)=>{if(slot>=0)cards[slot]=t.cards[i]});return {cards,formation}}}
 throw Error('Elenco sem XI válido: '+t.id)};
