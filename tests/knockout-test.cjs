const assert=require('assert'),fs=require('fs'),{FL,root}=require('./load.cjs')();
const realSimulate=FL.simulate,realShootout=FL.shootout;
const team=id=>({id,name:id,cards:[{id:id+'-scorer',name:id+' scorer'}]});
const c={comp:'lib',tournament:{teams:['a','b','c','d'].map(team),groups:[],schedule:[],results:[],round:0,stage:'knockout',bracket:[],knockoutRounds:[],formatVersion:3,twoLegged:true}};
FL.addKnockoutStage(c.tournament,[['a','b'],['c','d']]);
assert.equal(c.tournament.schedule.length,2);assert.deepEqual(c.tournament.schedule[1].map(x=>Array.from(x)),[['b','a'],['d','c']]);
FL.simulate=(a,b)=>{const score=c.tournament.round===0?(a.id==='a'?[2,0]:[1,0]):[1,0];return {score,stats:[{},{}],goals:score.flatMap((n,side)=>Array.from({length:n},(_,i)=>({side,minute:i+1,name:[a,b][side].name,playerId:[a,b][side].cards[0].id}))),ratings:{},seed:3}};
let shoots=0;FL.shootout=m=>{shoots++;m.penalties=[4,3];m.penaltyLog=[]};
let batch=FL.nextRound(c);assert(batch.matches.every(m=>!m.penalties));FL.commitRound(c,batch);assert.equal(shoots,0);assert.equal(c.tournament.bracket.length,1);assert(!c.tournament.done);
// A real save/reload between legs retains first-leg scores and reversed home/away identities.
c.tournament=JSON.parse(JSON.stringify(c.tournament));batch=FL.nextRound(c);
assert.deepEqual(Array.from(batch.matches[0].aggregate),[1,2]);assert(!batch.matches[0].penalties);
assert.deepEqual(Array.from(batch.matches[1].result.score),[1,0]);assert.deepEqual(Array.from(batch.matches[1].aggregate),[1,1]);assert(batch.matches[1].penalties);assert.equal(shoots,1);
FL.commitRound(c,batch);assert.deepEqual(c.tournament.bracket[1].map(x=>Array.from(x)),[['a','d']]);assert.equal(c.tournament.knockoutRounds[1].legs,1);
const tie=FL.tieSummary(c.tournament,0,['a','b']);assert.deepEqual(Array.from(tie.score),[2,1]);assert.equal(tie.winner,'a');assert.equal(tie.matches.length,2);
assert.equal(FL.tieSummary(c.tournament,0,['c','d']).winner,'d');
// A drawn first leg never starts penalties or eliminates the user.
const p={comp:'ucl',tournament:{teams:['me','r','s','t'].map(team),groups:[],schedule:[],results:[],round:0,stage:'knockout',bracket:[],knockoutRounds:[],formatVersion:3,twoLegged:true}};
FL.addKnockoutStage(p.tournament,[['me','r'],['s','t']]);FL.simulate=()=>({score:[0,0],stats:[{},{}],goals:[],ratings:{},seed:1});const first=FL.nextRound(p);assert(first.matches.every(m=>!m.penalties));FL.commitRound(p,first);assert(!p.tournament.eliminated);assert(!p.tournament.done);assert.equal(p.tournament.round,1);
FL.simulate=realSimulate;FL.shootout=realShootout;
for(const comp of ['lib','ucl','wc']){const best=FL.teams.find(t=>t.comp===comp),lineup=FL.matchLineup(best),campaign={comp,cards:lineup.cards,formation:lineup.formation,style:'Equilibrado'},t=FL.createTournament(campaign);assert.equal(t.twoLegged,comp!=='wc');const legacy={comp,tournament:{...t,formatVersion:2,knockoutRounds:undefined,twoLegged:undefined}};FL.upgradeTournament(legacy);assert.equal(legacy.tournament.formatVersion,3);assert.equal(legacy.tournament.twoLegged,comp!=='wc');legacy.tournament.stage='knockout';legacy.tournament.formatVersion=2;legacy.tournament.twoLegged=undefined;FL.upgradeTournament(legacy);assert.equal(legacy.tournament.formatVersion,2,'existing knockout must keep fixtures')}
fs.writeFileSync(root+'/docs/knockout-report.json',JSON.stringify({twoLegged:['lib','ucl'],singleFinal:true,worldCupSingleLeg:true,awayGoals:false,penaltiesOnlyAfterAggregateDraw:true,unequalReturnScoreCanNeedPenalties:true,firstLegCannotEliminate:true,saveBetweenLegs:true,legacyKnockoutsPreserved:true},null,2));console.log('PASS reversed fixtures, aggregate winners, no away goals, return-only penalties even on 1-0, no early elimination, save/reload, single final and migration.');
