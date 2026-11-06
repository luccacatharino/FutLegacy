'use strict';
FL.clockLabel=e=>e.clock||String(e.minute??0)+(e.added?'+'+e.added:'');
FL.periodLabel=e=>({1:'Primeiro tempo',2:'Segundo tempo',3:'Prorrogação · 1º tempo',4:'Prorrogação · 2º tempo'}[e.period]||(e.minute>90?'Prorrogação':e.minute<=45?'Primeiro tempo':'Segundo tempo'));
FL.disciplineState=()=>({yellow:[Array(11).fill(0),Array(11).fill(0)],red:[Array(11).fill(false),Array(11).fill(false)]});
FL.applyCard=(state,side,index,direct=false)=>{if(state.red[side][index])return null;const second=!direct&&state.yellow[side][index]===1;
 // Keep at least seven on the field; abandonment is outside this simulation's scope.
 if((direct||second)&&state.red[side].filter(Boolean).length>=4)return null;
 if(!direct)state.yellow[side][index]++;if(direct||second)state.red[side][index]=true;return {kind:direct||second?'red':'yellow',secondYellow:second,direct};};
FL.manpowerEffect=sentOff=>({attack:Math.max(.72,1-sentOff*.065),defence:Math.max(.80,1-sentOff*.035),retreat:Math.min(.16,sentOff*.045)});
FL.matchPeriods=(rng,extra=false)=>[1,2].map((_,i)=>({period:(extra?3:1)+i,start:(extra?90:0)+i*(extra?15:45),minutes:extra?15:45,added:Math.floor(rng()*(extra?4:9))}));
