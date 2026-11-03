/* Avaliações editoriais próprias; fontes e recorte em docs/FONTES.md. */
const FL = {};
FL.formations={'4-3-3':['GOL','LD','ZAG','ZAG','LE','VOL','MC','MEI','PD','ATA','PE'],'4-4-2':['GOL','LD','ZAG','ZAG','LE','VOL','MC','MD','ME','ATA','ATA'],'3-5-2':['GOL','ZAG','ZAG','ZAG','MD','VOL','MC','MEI','ME','ATA','ATA']};
FL.rarities=['Comum','Competitivo','Elite','Lendário'];
FL.weights=[.60,.28,.10,.02];
FL.styles=['Equilibrado','Posse de bola','Contra-ataque','Pressão alta','Defensivo'];
FL.teams=[];
FL.dataVersion=2;
function roster(comp,name,year,tier,names){const id=comp+'-'+name.replace(/\W/g,'')+'-'+year;const rows=CARD_PROFILES[comp+'|'+name+'|'+year];if(!rows||rows.length!==names.split('|').length)throw Error('Missing contextual profiles: '+id);const team={id,name,year,tier,comp,ovr:Math.round(rows.reduce((n,p)=>n+p.ovr,0)/rows.length)};team.cards=names.split('|').map((name,i)=>{const profile=rows[i];return {id:id+'-'+i,playerId:name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(),name,team:team.name,year,comp,tier,pos:profile.positions[0],positions:[...profile.positions],ovr:profile.ovr,links:id,attrs:{...profile.attrs},dataVersion:2}});FL.teams.push(team);}
const fla22='Santos|Rodinei|David Luiz|Léo Pereira|Filipe Luís|Thiago Maia|João Gomes|Arrascaeta|Everton Ribeiro|Gabriel Barbosa|Pedro';
const pal21='Weverton|Marcos Rocha|Gustavo Gómez|Luan|Piquerez|Danilo|Zé Rafael|Raphael Veiga|Dudu|Deyverson|Rony';
const fla19='Diego Alves|Rafinha|Rodrigo Caio|Pablo Marí|Filipe Luís|Willian Arão|Gerson|Arrascaeta|Everton Ribeiro|Gabriel Barbosa|Bruno Henrique';
const ath22='Bento|Khellven|Pedro Henrique|Thiago Heleno|Abner|Fernandinho|Alex Santana|Hugo Moura|Vitinho|Vitor Roque|Vitor Bueno';
roster('lib','Athletico-PR',2022,0,ath22);
roster('lib','Palmeiras',2021,1,pal21);
roster('lib','Flamengo',2022,2,fla22);
roster('lib','Flamengo',2019,3,fla19);
roster('bra','Athletico-PR',2019,0,'Santos|Jonathan|Léo Pereira|Thiago Heleno|Márcio Azevedo|Wellington|Bruno Guimarães|Léo Cittadini|Nikão|Marco Ruben|Rony');
roster('bra','Palmeiras',2019,1,'Weverton|Marcos Rocha|Gustavo Gómez|Luan|Diogo Barbosa|Felipe Melo|Bruno Henrique|Gustavo Scarpa|Dudu|Luiz Adriano|Willian');
roster('bra','Santos',2019,2,'Everson|Victor Ferraz|Lucas Veríssimo|Gustavo Henrique|Jorge|Alison|Carlos Sánchez|Diego Pituca|Marinho|Eduardo Sasha|Soteldo');
roster('bra','Flamengo',2019,3,fla19);
roster('ucl','Inter',2023,0,'André Onana|Denzel Dumfries|Matteo Darmian|Francesco Acerbi|Alessandro Bastoni|Marcelo Brozović|Nicolò Barella|Hakan Çalhanoğlu|Federico Dimarco|Edin Džeko|Lautaro Martínez');
roster('ucl','Manchester United',2011,1,'Edwin van der Sar|Fábio|Rio Ferdinand|Nemanja Vidić|Patrice Evra|Michael Carrick|Ryan Giggs|Park Ji-sung|Antonio Valencia|Wayne Rooney|Javier Hernández');
roster('ucl','Manchester City',2023,2,'Ederson|Kyle Walker|Rúben Dias|Manuel Akanji|Nathan Aké|Rodri|İlkay Gündoğan|Kevin De Bruyne|Bernardo Silva|Erling Haaland|Jack Grealish');
roster('ucl','Barcelona',2011,3,'Víctor Valdés|Dani Alves|Gerard Piqué|Javier Mascherano|Éric Abidal|Sergio Busquets|Xavi|Andrés Iniesta|Pedro|Lionel Messi|David Villa');
roster('wc','Uruguai',2022,0,'Sergio Rochet|Guillermo Varela|José Giménez|Diego Godín|Mathías Olivera|Matías Vecino|Federico Valverde|Arrascaeta|Facundo Pellistri|Luis Suárez|Darwin Núñez');
roster('wc','Croácia',2022,1,'Dominik Livaković|Josip Juranović|Dejan Lovren|Joško Gvardiol|Borna Sosa|Marcelo Brozović|Mateo Kovačić|Luka Modrić|Mario Pašalić|Andrej Kramarić|Ivan Perišić');
roster('wc','França',2022,2,'Hugo Lloris|Jules Koundé|Raphaël Varane|Dayot Upamecano|Theo Hernández|Aurélien Tchouaméni|Adrien Rabiot|Antoine Griezmann|Ousmane Dembélé|Olivier Giroud|Kylian Mbappé');
roster('wc','Argentina',2022,3,'Emiliano Martínez|Nahuel Molina|Cristian Romero|Nicolás Otamendi|Nicolás Tagliafico|Enzo Fernández|Rodrigo De Paul|Alexis Mac Allister|Ángel Di María|Julián Álvarez|Lionel Messi');
FL.comps={lib:{name:'Libertadores',icon:'◈',desc:'A glória eterna começa em uma escolha.',year:2022,pool:'Flamengo|Palmeiras|Vélez Sarsfield|Athletico-PR|River Plate|Boca Juniors|Estudiantes|Talleres|Colón|Emelec|Barcelona SC|Independiente del Valle|Universidad Católica|Colo-Colo|Peñarol|Nacional|Cerro Porteño|Libertad|Olimpia|The Strongest|Always Ready|Deportivo Táchira|Caracas|Deportes Tolima|Deportivo Cali|Alianza Lima|Sporting Cristal|Fortaleza|Corinthians|Atlético-MG|Red Bull Bragantino|América-MG'},bra:{name:'Brasileirão',icon:'▥',desc:'20 equipes. 38 rodadas. Uma conquista.',year:2019,pool:'Flamengo|Santos|Palmeiras|Grêmio|Athletico-PR|São Paulo|Internacional|Corinthians|Fortaleza|Goiás|Bahia|Vasco|Atlético-MG|Fluminense|Botafogo|Ceará|Cruzeiro|CSA|Chapecoense|Avaí'},ucl:{name:'Champions League',icon:'✦',desc:'Seu elenco no maior palco europeu.',year:2023,pool:'Manchester City|Inter|Real Madrid|Milan|Bayern|Benfica|Chelsea|Napoli|Liverpool|Porto|Tottenham|Borussia Dortmund|Paris Saint-Germain|Club Brugge|RB Leipzig|Eintracht Frankfurt|Ajax|Rangers|Atlético de Madrid|Bayer Leverkusen|Barcelona|Viktoria Plzeň|Sporting|Marseille|Salzburg|Dinamo Zagreb|Shakhtar Donetsk|Celtic|Sevilla|Copenhagen|Juventus|Maccabi Haifa'},wc:{name:'Copa do Mundo',icon:'♜',desc:'Sete partidas para escrever seu nome.',year:2022,pool:'Argentina|França|Croácia|Marrocos|Brasil|Inglaterra|Portugal|Países Baixos|Japão|Coreia do Sul|Austrália|Estados Unidos|Suíça|Senegal|Polônia|Espanha|Alemanha|Bélgica|Uruguai|Gana|Camarões|Sérvia|Tunísia|Dinamarca|México|Arábia Saudita|Equador|Catar|Irã|País de Gales|Costa Rica|Canadá'}};
FL.cards=FL.teams.flatMap(t=>t.cards);
FL.positions=p=>p.positions?.length?p.positions:[p.pos];
// Only adjacent tactical functions can be improvised. No blanket outfield eligibility.
FL.fit=(p,pos)=>{const natural=FL.positions(p);if(natural.includes(pos))return 1;if(natural.includes('GOL')||pos==='GOL')return 0;const adjacent={LD:['MD'],LE:['ME'],MD:['PD','LD'],ME:['PE','LE'],PD:['MD'],PE:['ME'],MC:['VOL','MEI'],VOL:['MC'],MEI:['MC']};return natural.some(n=>(adjacent[n]||[]).includes(pos))?.88:0;};
FL.openSlots=(cards,formation,p)=>FL.formations[formation].flatMap((pos,i)=>!cards[i]&&FL.fit(p,pos)>0?[{index:i,pos,fit:FL.fit(p,pos)}]:[]);
FL.lineupIssues=(cards,formation)=>{const slots=FL.formations[formation];const issues=[];if(cards.filter(Boolean).length!==slots.length)issues.push('Preencha as onze vagas.');if(new Set(cards.filter(Boolean).map(p=>p.id)).size!==cards.filter(Boolean).length)issues.push('Há cartas repetidas.');slots.forEach((pos,i)=>{if(cards[i]&&!FL.fit(cards[i],pos))issues.push(cards[i].name+' não pode atuar em '+pos+'.')});return issues;};
FL.chem=cards=>Math.min(.04,cards.reduce((n,p,i)=>n+cards.slice(i+1).filter(q=>q.links===p.links).length,0)*.003);
FL.tier=r=>r<.6?0:r<.88?1:r<.98?2:3;
FL.offer=(comp,cards,slots,rng=Math.random)=>{const eligible=t=>t.cards.some(p=>!cards.some(q=>q.id===p.id)&&slots.some(s=>FL.fit(p,s)>0));let pool=FL.teams.filter(t=>t.comp===comp&&eligible(t));let tier=FL.tier(rng());let same=pool.filter(t=>t.tier===tier);pool=same.length?same:pool;return pool[Math.floor(rng()*pool.length)];};

FL.placeDraftPlayer=(campaign,id,index)=>{if(!Number.isInteger(index)||index<0||index>=FL.formations[campaign.formation].length||campaign.cards[index])return false;const p=FL.teams.find(t=>t.id===campaign.offer)?.cards.find(p=>p.id===id);if(!p||campaign.cards.some(q=>q?.id===p.id)||!FL.fit(p,FL.formations[campaign.formation][index]))return false;campaign.cards[index]=p;delete campaign.pendingPick;campaign.rulesVersion=2;return true;};
