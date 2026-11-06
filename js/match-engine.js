'use strict';
/* Collective movement follows the ball and tactical role, without consuming match RNG. */
FL.freeKickSkill=p=>p.attrs.fk??Math.round((p.attrs.fin??p.ovr)*.55+(p.attrs.pas??p.ovr)*.45);
FL.collectiveFrame=(shapes,side,actor,ball,type,clock,previous,actorSide=side,discipline=null)=>{
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 return shapes.map((shape,team)=>{
  const dir=team===0?1:-1,attacking=team===side,depth=team===0?ball.x:1-ball.x;
  const bases=FL.layouts[shape].map(([y,x])=>({x:team===0?1-x/100:x/100,y:y/100}));
  const red=discipline?.red[team]||[],effect=FL.manpowerEffect(red.filter(Boolean).length);
  const nearest=bases.map((p,i)=>({i,d:Math.hypot(p.x-ball.x,p.y-ball.y)})).filter(p=>p.i!==0&&!red[p.i]&&!(team===actorSide&&p.i===actor)).sort((a,b)=>a.d-b.d).slice(0,3).map(p=>p.i);
  return bases.map((base,i)=>{const role=FL.formations[shape][i],gk=role==='GOL',forward=['ATA','PE','PD'].includes(role),wide=['PE','PD','ME','MD','LE','LD'].includes(role);let x=base.x,y=base.y;
   if(red[i])return {x:.17+red.slice(0,i).filter(Boolean).length*.14,y:team===0?-.045:1.045,out:true};
   if(gk){x=base.x+dir*clamp((depth-.5)*.07,-.015,.025);y=.5+(ball.y-.5)*.18}
   else if(attacking){const push=clamp((depth-.38)*.36,-.10,.17);x+=dir*push;y+=(ball.y-.5)*.10;
    const support=nearest.indexOf(i);if(support>=0&&i!==actor){x=ball.x+dir*[-.13,.07,-.20][support];y=ball.y+(base.y<ball.y?-1:1)*[.16,.20,.09][support]}
    if(forward){x=Math.max(.10,Math.min(.90,ball.x+dir*(.12+.035*Math.sin(clock*.21+i))));y=wide?base.y+(ball.y-base.y)*.12:base.y+(ball.y-.5)*.25+.035*Math.sin(clock*.16+i)}
    if(['ZAG','VOL'].includes(role))x=team===0?Math.min(x,ball.x-.13):Math.max(x,ball.x+.13);
   }else{x+=dir*clamp((depth-.5)*.24,-.15,.08);y+=(ball.y-base.y)*.22;const press=nearest.indexOf(i);if(press===0){x=ball.x+dir*.045;y=ball.y+(base.y<ball.y?-.035:.035)}else if(press===1){x=ball.x-dir*.09;y=ball.y+(base.y<ball.y?-.12:.12)}}
   if(type==='Cobrança de falta'&&!attacking&&['ZAG','VOL','MC'].includes(role)&&i<7){x=ball.x-dir*.12;y=.43+(i%3)*.07}
   if(!gk){x-=dir*effect.retreat;y=.5+(y-.5)*(1-red.filter(Boolean).length*.04)}
   x=clamp(x,gk?.025:.06,gk?.975:.94);y=clamp(y,.06,.94);if(team===actorSide&&i===actor){x=ball.x;y=ball.y}
   const old=previous?.[team]?.[i];if(old&&!(team===actorSide&&i===actor)){x=old.x+clamp(x-old.x,-.065,.065);y=old.y+clamp(y-old.y,-.075,.075)}
   return {x,y};
  }).map((p,i,teamPositions)=>{if(p.out||i===0||team===actorSide&&i===actor)return p;let x=p.x,y=p.y;for(let j=1;j<i;j++){const q=teamPositions[j];if(q.out)continue;const dx=x-q.x,dy=y-q.y,d=Math.hypot(dx,dy);if(d<.055){const angle=d>.001?Math.atan2(dy,dx):i*2.399;x+=Math.cos(angle)*(.055-d);y+=Math.sin(angle)*(.055-d)}}return {x:clamp(x,.06,.94),y:clamp(y,.06,.94)}});
 });
};
/* Pure seeded possession engine. Renderer consumes events; it never scores. */
FL.simulate=(home,away,seed,style='Equilibrado',captureEvents=true,rules={})=>{
 const r=FL.rng(seed),teams=[home,away],styles=['Equilibrado','Equilibrado'];
 const stats=[0,1].map(()=>({shots:0,on:0,passes:0,attempts:0,saves:0,tackles:0,corners:0,possession:0,xg:0,fouls:0,yellows:0,reds:0,penalties:0,freeKicks:0})),score=[0,0],events=[],timeline=[],volume=[],goals=[],ratings={},players=teams.map(t=>t.cards),shapes=teams.map(t=>t.formation||'4-3-3'),discipline=FL.disciplineState(),periods=FL.matchPeriods(r);
 timeline.push({type:'Início de jogo',clock:'0',period:1,minute:0,order:-1,side:null,score:[0,0]});
 const stamp=(period,tick,order)=>{const played=Math.floor(tick/4)+1,added=Math.max(0,played-period.minutes),minute=period.start+Math.min(played,period.minutes);return {minute,added,clock:String(minute)+(added?'+'+added:''),period:period.period,order}};
 let periodIndex=0,periodStep=0,extraTime=false,regulationScore=null,periodSteps=(periods[0].minutes+periods[0].added)*4;
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const attr=(s,i,k)=>{let p=players[s][i];return (p.attrs[k]??p.ovr)*(teams.some(t=>t.id==='me')&&teams[s].id!=='me'?.96:1)*FL.fit(p,FL.formations[shapes[s]][i])};
 const avg=(s,k,ids)=>ids.length?ids.reduce((n,i)=>n+attr(s,i,k),0)/ids.length:teams[s].ovr;
 const field=players.map(ps=>ps.map((p,i)=>i).filter(i=>!FL.positions(ps[i]).includes('GOL'))),keepers=players.map(ps=>Math.max(0,ps.findIndex(p=>FL.positions(p).includes('GOL'))));
 const teamAttack=s=>(avg(s,'pas',field[s])*.45+avg(s,'dri',field[s])*.25+teams[s].ovr*.3)*FL.manpowerEffect(stats[s].reds).attack;
 const defence=s=>avg(s,'def',field[s].filter(i=>['ZAG','VOL','LD','LE'].includes(FL.formations[shapes[s]][i])))*FL.manpowerEffect(stats[s].reds).defence;
 const choose=(s,attack=false,exclude=-1)=>{let ids=field[s].filter(i=>i!==exclude),ws=ids.map(i=>{let role=FL.formations[shapes[s]][i],w=attack?(['ATA','PD','PE'].includes(role)?5:role==='MEI'?3:1):(['VOL','MC','MEI'].includes(role)?3:1);if(exclude>=0){const [y,x]=FL.layouts[shapes[s]][i],[cy,cx]=FL.layouts[shapes[s]][exclude],distance=Math.hypot((x-cx)/100,(y-cy)/100);w*=clamp(1.25-distance,.3,1);if(progress>.50&&['ATA','PE','PD','MEI'].includes(role))w*=1.5}return w*attr(s,i,attack?'fin':'pas')/80});let roll=r()*ws.reduce((a,b)=>a+b,0);for(let k=0;k<ids.length;k++){roll-=ws[k];if(roll<0)return ids[k]}return ids.at(-1)};
 const fouler=s=>{const ids=field[s],weights=ids.map(i=>discipline.yellow[s][i]?.22:1);let roll=r()*weights.reduce((a,b)=>a+b,0);for(let i=0;i<ids.length;i++){roll-=weights[i];if(roll<0)return ids[i]}return ids.at(-1)};
 let side=r()<.5?0:1,progress=.22,carrier=choose(side),lastPass=null;
 const base=(s,i)=>{let [y,x]=FL.layouts[shapes[s]][i];return {x:s===0?(100-x)/100:x/100,y:y/100}};
 let stepClock=0,previousPositions=null;
 const positions=(s,actor,to,type,actorSide=s)=>{const result=FL.collectiveFrame(shapes,s,actor,to,type,stepClock,previousPositions,actorSide,discipline);previousPositions=result;return result};
 let ball={x:.5,y:.5},penalty=null,freeKick=null;
 for(let step=0;periodIndex<periods.length;step++,periodStep++){
  if(periodStep>=periodSteps&&penalty===null){const end=stamp(periods[periodIndex],periodSteps-1,step-.2);periodIndex++;periodStep=0;if(periodIndex===2){regulationScore=[...score];const offset=rules.aggregateOffset||[0,0];if(rules.extraTime&&score[0]+offset[0]===score[1]+offset[1]){extraTime=true;periods.push(...FL.matchPeriods(r,true))}}timeline.push({...end,type:periodIndex>=periods.length?'Fim de jogo':periodIndex===2?'Início da prorrogação':periodIndex===3?'Intervalo da prorrogação':'Intervalo',side:null,score:[...score]});if(periodIndex>=periods.length)break;periodSteps=(periods[periodIndex].minutes+periods[periodIndex].added)*4;ball={x:.5,y:.5};progress=.22;side=periodIndex%2;carrier=choose(side);lastPass=null;penalty=null;freeKick=null}
  stepClock=step;const time=stamp(periods[periodIndex],Math.min(periodStep,periodSteps-1),step),minute=time.minute,s=side,other=1-s,goalCount=goals.length;stats[s].possession++;let card=null,setPiece=null,actor=carrier,name=players[s][actor].name,type='Passe',from={...ball},to={x:s===0?progress:1-progress,y:base(s,actor).y};
  const tactic=styles[s],opponent=styles[other],chem=FL.chem(players[s].filter((p,i)=>!discipline.red[s][i])),quality=clamp((teamAttack(s)-defence(other))/800,-.055,.055),exposure=opponent==='Pressão alta'?.015:opponent==='Defensivo'?-.015:0;
  if(penalty!==null){setPiece='penalty';actor=choose(s,true);name=players[s][actor].name;stats[s].shots++;stats[s].penalties++;stats[s].xg+=.76;to={x:s===0?.985:.015,y:.46+r()*.08};type='Finalização';if(r()<.88){stats[s].on++;const gk=keepers[other];if(r()<clamp(.83+(attr(s,actor,'fin')-80)/300-(attr(other,gk,'ref')-80)/500,.65,.93)){type='Gol';score[s]++;goals.push({minute,side:s,name,playerId:players[s][actor].id,assist:null,assistId:null,penalty:true});ratings[players[s][actor].id]=(ratings[players[s][actor].id]||0)+3}else{type='Defesa';stats[other].saves++;actor=gk;name=players[other][gk].name}}penalty=null;side=other;progress=.22;carrier=choose(side);lastPass=null;
  }else if(freeKick!==null){
   setPiece='free-kick';actor=field[s].slice().sort((a,b)=>FL.freeKickSkill(players[s][b])-FL.freeKickSkill(players[s][a]))[0];name=players[s][actor].name;
   const skill=FL.freeKickSkill(players[s][actor]),gk=keepers[other],chance=clamp(.055+(skill-75)/700+(80-attr(other,gk,'ref'))/1600,.025,.12);stats[s].freeKicks++;stats[s].shots++;stats[s].xg+=chance;type='Finalização';to={x:s===0?.985:.015,y:.43+r()*.14};
   if(r()<.48){stats[s].on++;if(r()<chance/.48){type='Gol';score[s]++;goals.push({minute,side:s,name,playerId:players[s][actor].id,assist:null,assistId:null,freeKick:true});ratings[players[s][actor].id]=(ratings[players[s][actor].id]||0)+3}else{type='Defesa';stats[other].saves++;actor=gk;name=players[other][gk].name;to={x:other===0?.07:.93,y:.5}}}else to={x:s===0?.99:.01,y:r()<.5?.28:.72};
   freeKick=null;side=other;progress=.22;carrier=choose(side);lastPass=null;
  }else if(progress>.68&&r()<.38+(tactic==='Contra-ataque'?.015:0)){
   actor=carrier;name=players[s][actor].name;stats[s].shots++;type='Finalização';
   const chance=clamp(.075+(attr(s,actor,'fin')-75)/550+quality*.55+exposure+(tactic==='Defensivo'?-.015:0),.025,.34);stats[s].xg+=chance;to={x:s===0?.985:.015,y:.43+r()*.14};
   if(r()<clamp(.45+(attr(s,actor,'fin')-75)/300+quality*.6,.22,.69)){
    stats[s].on++;const gk=keepers[other],ability=(attr(other,gk,'ref')+attr(other,gk,'han')+attr(other,gk,'pos'))/3;
    if(r()<clamp(chance/.60+(80-ability)/450,.07,.66)){
     type='Gol';score[s]++;let assist=lastPass&&lastPass.side===s&&lastPass.index!==actor?players[s][lastPass.index]:null;
     goals.push({minute,side:s,name,playerId:players[s][actor].id,assist:assist?.name||null,assistId:assist?.id||null});ratings[players[s][actor].id]=(ratings[players[s][actor].id]||0)+3;if(assist)ratings[assist.id]=(ratings[assist.id]||0)+1.2;
    }else{type='Defesa';stats[other].saves++;ratings[players[other][gk].id]=(ratings[players[other][gk].id]||0)+.25;to={x:other===0?.07:.93,y:.5};actor=gk;name=players[other][gk].name}
   }else if(r()<.24){type='Escanteio';stats[s].corners++;to={x:s===0?.96:.04,y:r()<.5?.04:.96}}
   else to={x:s===0?.99:.01,y:r()<.5?.28:.72};
   if(type==='Escanteio'){progress=.68;carrier=choose(s);lastPass=null}else{side=other;progress=.22;carrier=choose(side);lastPass=null}
   }else if(r()<.055){stats[other].fouls++;type='Falta';lastPass=null;if(progress>.63&&r()<.16){type='Pênalti';penalty=s;to={x:s===0?.89:.11,y:.5}}else{if(progress>.52&&r()<.4)freeKick=s;progress=Math.min(.74,progress+.04)}
    const sanction=r();if(sanction<.26){actor=fouler(other);card=FL.applyCard(discipline,other,actor,sanction<.003);if(card){if(type==='Pênalti')timeline.push({...time,type:'Pênalti',side:s,name:players[s][carrier].name,score:[...score]});type=card.kind==='red'?'Cartão vermelho':'Cartão amarelo';name=players[other][actor].name;if(!card.direct)stats[other].yellows++;if(card.kind==='red'){stats[other].reds++;field[other]=field[other].filter(i=>i!==actor);ratings[players[other][actor].id]=(ratings[players[other][actor].id]||0)-1.5}}else actor=carrier}
  }else{
   const target=choose(s,progress>.5,carrier),defender=choose(other),passChance=clamp((.77+quality+(attr(s,carrier,'pas')-80)/900)* (1+chem)-.015*(stats[s].reds-stats[other].reds)+(tactic==='Posse de bola'?.015:0)-(opponent==='Pressão alta'?.015:0),.57,.94);stats[s].attempts++;
   if(r()<passChance){const v=r();type=v<.13?'Drible':v<.29?'Condução':progress>.55&&v>.78?'Cruzamento':'Passe';const running=type==='Condução'||type==='Drible';if(!running)stats[s].passes++;if(!running){lastPass={side:s,index:carrier};carrier=target;actor=target;name=players[s][actor].name}progress=clamp(progress+.07+r()*.055+(attr(s,carrier,'vel')-70)/1500+(tactic==='Contra-ataque'?.008:0)-(tactic==='Posse de bola'?.006:0),.16,.87);to={x:s===0?progress:1-progress,y:clamp(base(s,carrier).y+(r()-.5)*.10,.07,.93)}}
   else{type=r()<.5?'Interceptação':'Desarme';stats[other].tackles++;actor=defender;name=players[other][actor].name;ratings[players[other][actor].id]=(ratings[players[other][actor].id]||0)+.08;side=other;to={...from};progress=clamp(side===0?to.x:1-to.x,.18,.75);carrier=defender;lastPass=null}
  }
  const eventSide=['Interceptação','Desarme','Defesa','Cartão amarelo','Cartão vermelho'].includes(type)?other:s;
  if(periodStep<periodSteps&&periodStep%4===0)volume.push({...time,home:0,away:0});const bin=volume.at(-1),depth=s===0?from.x:1-from.x,weight=Math.max(0,depth-.35)+(['Gol','Finalização','Defesa'].includes(type)?.9:type==='Cruzamento'?.45:type==='Escanteio'?.4:0);bin[s===0?'home':'away']+=weight;
  for(const g of goals.slice(goalCount))Object.assign(g,time,{volumeIndex:volume.length-1});
  const highlight={...time,type,side:eventSide,attackSide:s,name,playerId:players[eventSide][actor]?.id,actor,setPiece,secondYellow:card?.secondYellow||false,score:[...score],volumeIndex:volume.length-1};if(['Gol','Finalização','Defesa','Escanteio','Falta','Pênalti','Cartão amarelo','Cartão vermelho'].includes(type))timeline.push(highlight);
  if(captureEvents)events.push({...highlight,from,to,x:to.x,y:to.y,cards:{yellow:discipline.yellow.map(a=>[...a]),red:discipline.red.map(a=>[...a])},positions:positions(['Falta','Cartão amarelo','Cartão vermelho','Pênalti'].includes(type)?s:eventSide,actor,['Gol','Finalização'].includes(type)?from:to,setPiece==='free-kick'||freeKick!==null?'Cobrança de falta':type,eventSide),score:[...score],stats:stats.map(z=>({...z}))});ball=type==='Gol'?{x:.5,y:.5}:to;
 }
 const all=players.flat(),best=all.slice().sort((a,b)=>(ratings[b.id]||0)-(ratings[a.id]||0)||b.ovr-a.ovr)[0];return {seed,score,stats,events,timeline,volume,goals,motm:best.name,ratings,duration:extraTime?120:90,steps:stats[0].possession+stats[1].possession,periods,extraTime,regulationScore:regulationScore||[...score],cards:discipline,rules:{extraTime:!!rules.extraTime,aggregateOffset:rules.aggregateOffset||[0,0]}};
};
FL.shootout=(match,teams)=>{if(match.penalties)return;const r=FL.rng(match.result.seed+713),score=[0,0],log=[];for(let round=0;round<1000;round++){for(let side=0;side<2;side++){const eligible=teams.map((t,s)=>t.cards.filter((p,i)=>!match.result.cards?.red?.[s]?.[i]).sort((a,b)=>b.attrs.fin-a.attrs.fin)),size=Math.min(...eligible.map(p=>p.length)),ps=eligible[side].slice(0,size),p=ps[round%ps.length],goal=r()<Math.max(.55,Math.min(.88,.73+(p.attrs.fin-75)/220));if(goal)score[side]++;log.push({side,name:p.name,goal});if(round<5){let remaining=[5-(round+1),5-round-(side===1?1:0)];if(score[0]>score[1]+remaining[1]||score[1]>score[0]+remaining[0]){match.penalties=score;match.penaltyLog=log;return}}}if(round>=4&&score[0]!==score[1])break}if(score[0]===score[1])throw Error('Série de pênaltis sem decisão após 1000 cobranças');match.penalties=score;match.penaltyLog=log};
FL.roundRobin=ids=>{let a=[...ids],rounds=[];if(a.length%2)a.push(null);for(let n=0;n<a.length-1;n++){let matches=[];for(let i=0;i<a.length/2;i++){let x=a[i],y=a[a.length-1-i];if(x!==null&&y!==null)matches.push(n%2?[y,x]:[x,y])}rounds.push(matches);a.splice(1,0,a.pop())}return [...rounds,...rounds.map(m=>m.map(([a,b])=>[b,a]))]};
FL.table=(ids,results)=>ids.map(id=>{let t={id,p:0,w:0,d:0,l:0,gf:0,ga:0};results.forEach(m=>{let s=m.ids.indexOf(id);if(s<0)return;let a=m.result.score[s],b=m.result.score[1-s];t.gf+=a;t.ga+=b;if(a>b){t.w++;t.p+=3}else if(a===b){t.d++;t.p++}else t.l++});t.gd=t.gf-t.ga;return t}).sort((a,b)=>b.p-a.p||b.w-a.w||b.gd-a.gd||b.gf-a.gf||a.id.localeCompare(b.id));
