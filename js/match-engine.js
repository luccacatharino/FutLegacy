'use strict';
/* Pure seeded possession engine. Renderer consumes events; it never scores. */
FL.simulate=(home,away,seed,style='Equilibrado',captureEvents=true)=>{
 const r=FL.rng(seed),teams=[home,away],styles=Array.isArray(style)?style:[style,away.style||'Equilibrado'];
 const stats=[0,1].map(()=>({shots:0,on:0,passes:0,attempts:0,saves:0,tackles:0,corners:0,possession:0,xg:0})),score=[0,0],events=[],goals=[],ratings={},players=teams.map(t=>t.cards),shapes=teams.map(t=>t.formation||'4-3-3');
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const attr=(s,i,k)=>{let p=players[s][i];return (p.attrs[k]??p.ovr)*FL.fit(p,FL.formations[shapes[s]][i])};
 const avg=(s,k,ids)=>ids.length?ids.reduce((n,i)=>n+attr(s,i,k),0)/ids.length:teams[s].ovr;
 const field=players.map(ps=>ps.map((p,i)=>i).filter(i=>!FL.positions(ps[i]).includes('GOL'))),keepers=players.map(ps=>Math.max(0,ps.findIndex(p=>FL.positions(p).includes('GOL'))));
 const teamAttack=s=>avg(s,'pas',field[s])*.45+avg(s,'dri',field[s])*.25+teams[s].ovr*.3;
 const defence=s=>avg(s,'def',field[s].filter(i=>['ZAG','VOL','LD','LE'].includes(FL.formations[shapes[s]][i])));
 const choose=(s,attack=false,exclude=-1)=>{let ids=field[s].filter(i=>i!==exclude),ws=ids.map(i=>{let role=FL.formations[shapes[s]][i],w=attack?(['ATA','PD','PE'].includes(role)?5:role==='MEI'?3:1):(['VOL','MC','MEI'].includes(role)?3:1);return w*attr(s,i,attack?'fin':'pas')/80});let roll=r()*ws.reduce((a,b)=>a+b,0);for(let k=0;k<ids.length;k++){roll-=ws[k];if(roll<0)return ids[k]}return ids.at(-1)};
 let side=r()<.5?0:1,progress=.22,carrier=choose(side),lastPass=null;
 const base=(s,i)=>{let [y,x]=FL.layouts[shapes[s]][i];return {x:s===0?(100-x)/100:x/100,y:y/100}};
 const positions=(s,actor,to,type)=>players.map((ps,team)=>ps.map((p,i)=>{let b=base(team,i),forward=(s===team?progress-.35:progress-.5)*.13*(team?-1:1),x=clamp(b.x+forward,.05,.95),y=clamp(b.y+Math.sin(events.length*.6+i)*.012,.06,.94);if(team===s&&i===actor){x=clamp(to.x+(type==='Gol'?(s===0?-.025:.025):0),.05,.95);y=clamp(to.y,.06,.94)}return {x,y}}));
 let ball={x:.5,y:.5};
 for(let step=0;step<360;step++){
  const minute=Math.min(90,Math.floor(step/4)+1),s=side,other=1-s;stats[s].possession++;let actor=carrier,name=players[s][actor].name,type='Passe',from={...ball},to={x:s===0?progress:1-progress,y:base(s,actor).y};
  const tactic=styles[s],opponent=styles[other],chem=FL.chem(players[s]),quality=clamp((teamAttack(s)-defence(other))/450,-.055,.055),exposure=opponent==='Pressão alta'?.015:opponent==='Defensivo'?-.015:0;
  if(progress>.68&&r()<.38+(tactic==='Contra-ataque'?.015:0)){
   actor=choose(s,true);name=players[s][actor].name;stats[s].shots++;type='Finalização';
   const chance=clamp(.125+(attr(s,actor,'fin')-75)/400+quality*.55+exposure+(tactic==='Defensivo'?-.015:0),.025,.34);stats[s].xg+=chance;to={x:s===0?.985:.015,y:.43+r()*.14};
   if(r()<clamp(.43+(attr(s,actor,'fin')-75)/300+quality*.6,.22,.69)){
    stats[s].on++;const gk=keepers[other],ability=(attr(other,gk,'ref')+attr(other,gk,'han')+attr(other,gk,'pos'))/3;
    if(r()<clamp(chance/.44+(80-ability)/300,.07,.66)){
     type='Gol';score[s]++;let assist=lastPass&&lastPass.side===s&&lastPass.index!==actor?players[s][lastPass.index]:null;
     goals.push({minute,side:s,name,playerId:players[s][actor].id,assist:assist?.name||null,assistId:assist?.id||null});ratings[players[s][actor].id]=(ratings[players[s][actor].id]||0)+3;if(assist)ratings[assist.id]=(ratings[assist.id]||0)+1.2;
    }else{type='Defesa';stats[other].saves++;ratings[players[other][gk].id]=(ratings[players[other][gk].id]||0)+.25;to={x:other===0?.07:.93,y:.5};actor=gk;name=players[other][gk].name}
   }else if(r()<.24){type='Escanteio';stats[s].corners++;to={x:s===0?.96:.04,y:r()<.5?.04:.96}}
   else to={x:s===0?.99:.01,y:r()<.5?.28:.72};
   if(type==='Escanteio'){progress=.68;carrier=choose(s);lastPass=null}else{side=other;progress=.22;carrier=choose(side);lastPass=null}
  }else{
   const target=choose(s,false,carrier),defender=choose(other),passChance=clamp((.77+quality)* (1+chem)+(tactic==='Posse de bola'?.015:0)-(opponent==='Pressão alta'?.015:0),.57,.94);stats[s].attempts++;
   if(r()<passChance){const v=r();type=v<.13?'Drible':v<.29?'Condução':progress>.55&&v>.78?'Cruzamento':'Passe';const running=type==='Condução'||type==='Drible';if(!running)stats[s].passes++;if(!running){lastPass={side:s,index:carrier};carrier=target;actor=target;name=players[s][actor].name}progress=clamp(progress+.07+r()*.055+(attr(s,carrier,'vel')-70)/1500+(tactic==='Contra-ataque'?.008:0)-(tactic==='Posse de bola'?.006:0),.16,.87);to={x:s===0?progress:1-progress,y:clamp(base(s,carrier).y+(r()-.5)*.10,.07,.93)}}
   else{type=r()<.5?'Interceptação':'Desarme';stats[other].tackles++;actor=defender;name=players[other][actor].name;ratings[players[other][actor].id]=(ratings[players[other][actor].id]||0)+.08;side=other;progress=opponent==='Pressão alta'?.33:opponent==='Contra-ataque'?.31:.26;carrier=defender;lastPass=null}
  }
  const eventSide=['Interceptação','Desarme','Defesa'].includes(type)?other:s;
  if(captureEvents)events.push({minute,side:eventSide,attackSide:s,type,name,actor,from,to,x:to.x,y:to.y,positions:positions(eventSide,actor,to,type),score:[...score],stats:stats.map(z=>({...z}))});ball=to;
 }
 const all=players.flat(),best=all.slice().sort((a,b)=>(ratings[b.id]||0)-(ratings[a.id]||0)||b.ovr-a.ovr)[0];return {seed,score,stats,events,goals,motm:best.name,ratings,duration:90};
};
FL.shootout=(match,teams)=>{if(match.penalties)return;const r=FL.rng(match.result.seed+713),score=[0,0],log=[];for(let round=0;round<1000;round++){for(let side=0;side<2;side++){const ps=teams[side].cards.filter(p=>p.pos!=='GOL'),p=ps[round%ps.length],goal=r()<Math.max(.55,Math.min(.88,.73+(p.attrs.fin-75)/220));if(goal)score[side]++;log.push({side,name:p.name,goal});if(round<5){let remaining=[5-(round+1),5-round-(side===1?1:0)];if(score[0]>score[1]+remaining[1]||score[1]>score[0]+remaining[0]){match.penalties=score;match.penaltyLog=log;return}}}if(round>=4&&score[0]!==score[1])break}if(score[0]===score[1])throw Error('Série de pênaltis sem decisão após 1000 cobranças');match.penalties=score;match.penaltyLog=log};
FL.roundRobin=ids=>{let a=[...ids],rounds=[];if(a.length%2)a.push(null);for(let n=0;n<a.length-1;n++){let matches=[];for(let i=0;i<a.length/2;i++){let x=a[i],y=a[a.length-1-i];if(x!==null&&y!==null)matches.push(n%2?[y,x]:[x,y])}rounds.push(matches);a.splice(1,0,a.pop())}return [...rounds,...rounds.map(m=>m.map(([a,b])=>[b,a]))]};
FL.table=(ids,results)=>ids.map(id=>{let t={id,p:0,w:0,d:0,l:0,gf:0,ga:0};results.forEach(m=>{let s=m.ids.indexOf(id);if(s<0)return;let a=m.result.score[s],b=m.result.score[1-s];t.gf+=a;t.ga+=b;if(a>b){t.w++;t.p+=3}else if(a===b){t.d++;t.p++}else t.l++});t.gd=t.gf-t.ga;return t}).sort((a,b)=>b.p-a.p||b.w-a.w||b.gd-a.gd||b.gf-a.gf||a.id.localeCompare(b.id));
