# Posições e avaliações contextuais — revisão 2

Esta revisão cobre as 176 cartas dos 16 elencos iniciais. Os números são **avaliações editoriais próprias**, não notas oficiais, medições físicas ou notas copiadas de outros jogos. Não existe um único OVR objetivamente correto. As fontes abaixo sustentam o contexto esportivo e as funções principais; a conversão desse contexto em notas e a simplificação das funções em posições do jogo são escolhas editoriais, abertas a revisão.

## Como escolher e posicionar

1. Clique em um jogador do elenco sorteado. Isso apenas o seleciona; a oferta não é consumida.
2. Veja todas as posições naturais da carta e as vagas livres correspondentes.
3. Clique em uma vaga no campo ou em um botão de posição. Só nesse momento a carta entra no time e outro elenco é sorteado.
4. É possível cancelar ou selecionar outro jogador antes de posicionar. Um reroll descarta também a seleção pendente.

Posições naturais cadastradas para a carta têm eficiência de 100%. Uma posição secundária natural não perde nota por aparecer depois da principal. Algumas funções vizinhas admitem improvisação com eficiência de 88%, sempre identificada em dourado; isso não transforma a vaga em posição natural. Não há mais a antiga regra que aceitava qualquer jogador de linha em qualquer lugar com 82% de eficiência. Goleiros atuam apenas no gol. Zagueiros não viram atacantes.

Exemplos de funções simplificadas nesta edição: Messi / Barcelona 2011 (ATA, PD, MEI), Griezmann / França 2022 (MEI, MC), Dimarco / Inter 2023 (ME, LE), Hugo Moura / Athletico-PR 2022 (VOL, MC), Pedro / Flamengo 2022 (ATA). As posições refletem funções do recorte, e não todas as posições já ocupadas em toda a carreira. Ser versátil não significa ter todas as posições liberadas.

## O que foi corrigido

A versão anterior atribuía a posição pelo índice do jogador no array e calculava seus atributos como diferenças fixas do OVR. Isso gerava funções erradas e valores incoerentes. Cada carta agora tem uma ficha explícita em `js/profiles.js`, com posições, OVR e seis atributos individuais. Goleiros também têm reflexos, manejo, posicionamento, mergulho, reposição e um contra um próprios.

Foram revistas todas as fichas, sem multiplicador automático de raridade. Entre os critérios editoriais estão qualidade técnica, função, protagonismo, regularidade, desempenho e nível dos adversários naquele torneio. Notas altas em uma competição não migram automaticamente para outra equipe ou ano. Os valores não foram obtidos por uma fórmula estatística; faltam dados padronizados de todas as temporadas para uma calibração desse tipo.

| Carta | OVR | Alguns atributos / contexto |
| --- | ---: | --- |
| Messi — Barcelona 2011 / Champions | 98 | VEL 95, DRI 99, PAS 95; papel central no ataque de Guardiola |
| Messi — Argentina 2022 / Copa | 97 | VEL 78, DRI 97, PAS 98; criação e definição, sem copiar a velocidade de 2011 |
| Mbappé — França 2022 / Copa | 97 | VEL 99, FIN 96; protagonismo ofensivo na campanha |
| Griezmann — França 2022 / Copa | 93 | PAS 96; criação a partir do meio-campo |
| Giroud — França 2022 / Copa | 87 | VEL 56, FIN 91, FIS 87; referência de área |
| Pedro — Flamengo 2022 / Libertadores | 92 | VEL 66, FIN 94; destaque como finalizador |
| Arrascaeta — Flamengo 2022 / Libertadores | 90 | PAS 93, DRI 91 |
| Arrascaeta — Uruguai 2022 / Copa | 83 | PAS 84, DRI 85; contexto diferente da campanha pelo clube |
| Luis Suárez — Uruguai 2022 / Copa | 78 | VEL 58, FIN 82; não recebe a nota do auge europeu |
| Rodri — Manchester City 2023 / Champions | 94 | PAS 94, DEF 93; construção e proteção do meio |
| Onana — Inter 2023 / Champions | 90 | REF 92, reposição 88; carta forte em elenco de raridade comum |
| Gabriel Barbosa — Flamengo 2019 / Brasileirão | 93 | FIN 95; protagonismo na competição |
| Gabriel Barbosa — Flamengo 2019 / Libertadores | 92 | FIN 94; avaliação separada do Brasileiro |

Ano final da temporada: Champions 2011 corresponde a 2010/11 e Champions 2023 a 2022/23. Os números de atributos usam a escala do próprio jogo, não unidades reais de velocidade ou percentuais estatísticos.

## Fontes de contexto consultadas

- [Guia de jogabilidade do 7a0](https://7a0.com.br/como-jogar) — referência de fluxo. Não usamos seu código ou banco de notas.
- [UEFA: relatório técnico da Champions 2010/11](https://www.uefa.com/multimediafiles/download/technicalreport/competitions/ucl/01/68/34/73/1683473_download.pdf) e [estatísticas da final / elenco do Barcelona](https://editorial.uefa.com/resources/0282-18407a7a3056-fed61d05639b-1000/ucl_202223_finals_md13.pdf).
- [UEFA: relatório técnico da Champions 2022/23](https://editorial.uefa.com/resources/0282-185d226d2e4a-000e3c8aa053-1000/ucl_technical_report_part_one_2022-23.pdf).
- [UEFA: Rodri, jogador da Champions 2022/23](https://www.uefa.com/uefachampionsleague/news/0282-183b473eaf28-b2fde4465718-1000--rodri-named-2022-23-uefa-champions-league-player-of-the-s/).
- [UEFA: análise tática da Inter contra o Milan em 2023](https://www.uefa.com/uefachampionsleague/news/0281-180d448e6271-a27c73962882-1000--in-the-zone-inter-1-0-milan-performance-analysis/).
- [FIFA: o novo papel de Griezmann no meio-campo em 2022](https://www.fifa.com/en/articles/world-cup-qatar-2022-griezmann-plays-different-role-to-same-effect-france-beat-england-quarter-final).
- [FFF: destaques franceses no Mundial de 2022](https://www.fff.fr/article/9141-les-bleus-au-tableau-d-honneur.html).
- [CBF: campeonato e artilharia de 2019](https://www.cbf.com.br/futebol-brasileiro/tabelas/campeonato-brasileiro/serie-a/2019?documento=Regulamento).
- [CONMEBOL: guia da final de 2022](https://cdn.conmebol.com/wp-content/uploads/2022/10/Guia-de-Medios-Final-CONMEBOL-Libertadores-2022.pdf).
- [Estatísticas da Libertadores 2022](https://as.com/resultados/futbol/copa_libertadores/2022/ranking/jugadores/).
- [Palmeiras: campanha de 2021, escalações e trocas de função](https://www.palmeiras.com.br/noticias/jogo-a-jogo-a-campanha-do-tricampeonato-palestrino/).
- [Santos: escalação e desempenho em 2019](https://www.santosfc.com.br/santos-fc-goleia-goias-por-6-a-1-na-vila-belmiro-e-segue-na-lideranca-do-brasileirao/).

As demais fontes dos elencos continuam em `FONTES.md`. Esta é uma revisão editorial dos dados, não uma certificação de cada posição secundária por rastreamento de todos os minutos de cada atleta. Novas evidências podem refinar as fichas.

## Campanhas salvas

Campanhas ainda no draft ou na revisão recebem as fichas revistas pelo ID da carta. Uma escalação antiga que use uma função agora incompatível não pode iniciar o torneio até ser ajustada. Os seletores permitem reposicionar; a ação explícita “Reabrir vagas incompatíveis” libera apenas as vagas inválidas, sem gastar rerolls. O restante do time é preservado. Campeonatos já iniciados e snapshots antigos do Hall da Fama conservam suas fichas salvas.

## Validação

`node tests/ui-check.cjs`: testa 36 drafts completos nas quatro competições e nas três formações, seleção sem consumo, cancelamento, posicionamento, improvisações, bloqueio de posições incompatíveis, rerolls e as 176 fichas.

`node tests/check.cjs`: testa 120 campanhas completas, calendário, probabilidades por intervalo, determinismo e correspondência entre eventos, gols e estatísticas.
