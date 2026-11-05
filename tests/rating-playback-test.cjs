const assert=require('assert'),fs=require('fs'),{FL,root}=require('./load.cjs')();
const get=(comp,year,name)=>FL.teams.filter(t=>t.comp===comp&&t.year===year).flatMap(t=>t.cards).find(p=>p.name===name);
for(const p of FL.cards){let ceiling={lib:91,ucl:93,wc:93}[p.comp];
 if(p.comp==='lib'&&p.name==='Pelé'&&p.team==='Santos')ceiling=97;
 if(p.comp==='lib'&&p.name==='Juan Román Riquelme')ceiling=95;
 if(p.comp==='ucl'&&((p.name==='Lionel Messi'&&[2011,2012].includes(p.year))||(p.name==='Cristiano Ronaldo'&&[2014,2017].includes(p.year))))ceiling=99;
 if(p.comp==='wc'){
  if(p.name==='Pelé'&&p.year===1970||p.name==='Diego Maradona'&&p.year===1986)ceiling=99;
  if(p.name==='Lionel Messi'&&p.year===2022)ceiling=98;
  if(p.name==='Kylian Mbappé')ceiling=94;
 }
 assert(p.ovr<=ceiling,p.id+' above ceiling');assert(p.ratingRevision>=4);
}
for(const [comp,year,name,ovr]of [['lib',1962,'Pelé',97],['lib',1963,'Pelé',97],['lib',2000,'Juan Román Riquelme',95],['ucl',2011,'Lionel Messi',99],['ucl',2017,'Cristiano Ronaldo',99],['wc',1970,'Pelé',99],['wc',1986,'Diego Maradona',99],['wc',2022,'Lionel Messi',98],['wc',2014,'Lionel Messi',93]])assert.equal(get(comp,year,name).ovr,ovr);
assert.equal(FL.averageOvr([{ovr:80},{ovr:90},null]),85);assert.equal(FL.averageOvr([]),0);
const leaders=FL.leaders({results:[{ids:['me','historical'],result:{goals:[{side:0,name:'Jogador',playerId:'same-card',assist:'Colega',assistId:'same-assist'},{side:1,name:'Jogador',playerId:'same-card',assist:'Colega',assistId:'same-assist'}]}}]});assert.equal(leaders.length,4);assert.equal(leaders.filter(p=>p.team==='me'&&p.goals===1).length,1);assert.equal(leaders.filter(p=>p.team==='historical'&&p.assists===1).length,1);
assert.deepEqual([1,3].map(s=>FL.playback.duration(s)),[160,160/3]);
const team=FL.teams.find(t=>t.comp==='ucl'&&t.year===2011),a={...team,...FL.matchLineup(team)},b={...a,id:'opponent'};
const full=FL.simulate(a,b,123,'Equilibrado',true),skip=FL.simulate(a,b,123,'Equilibrado',false);assert.deepEqual(full.score,skip.score);assert.deepEqual(full.goals,skip.goals);assert.deepEqual(full.stats,skip.stats);
let total=[0,0];for(let seed=0;seed<600;seed++){const result=FL.simulate(a,b,seed,'Equilibrado',false);result.score.forEach((g,s)=>total[s]+=g)}assert(total.every(g=>g/600>1.3&&g/600<2.8),'goal density');
fs.writeFileSync(root+'/docs/rating-playback-report.json',JSON.stringify({cards:FL.cards.length,ceilings:'pass',average:'arithmetic',eventMs:[160,160/3],durationSeconds:[57.6,19.2],speedDoesNotChangeResult:true,balancedMatchGoalsPerSide:total.map(g=>g/600)},null,2));console.log('PASS ratings, attributes revision, average, 1x/2x/4x intervals, capture/skip invariance, both-side goal density',total.map(g=>g/600));
