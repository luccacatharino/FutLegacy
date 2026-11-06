# FutLegacy — Beta 0.8

Faixas da página inicial: CR7, Lamine Yamal, Désiré Doué e Dembélé; Messi, Neymar, Luis Suárez e Arrascaeta. Duas montagens de fotos reais (aproximadamente 452 KB no total), alternadas sem abas. Créditos e contextos em `docs/PHOTO-CREDITS.html`. As três competições continuam disponíveis. Todas as fotos são de partidas: Suárez pelo Grêmio, Arrascaeta pelo Flamengo, CR7 com recorte integral e Doué com uniforme de jogo.


Draft de futebol histórico para navegador. HTML, CSS e JavaScript puro, sem instalação ou APIs para jogar.

- [Jogar](https://luccacatharino.github.io/FutLegacy/)
- [Acervo e auditoria](https://luccacatharino.github.io/FutLegacy/docs/AUDITORIA.html)
- [Alterações e limites](docs/BETA-07.md)

## Beta 0.7

Faixas com fotos reais recortadas e jogadores de 1990 em diante. Na versão 0.7.1, a Europa mostra Cristiano Ronaldo, Lamine Yamal, Désiré Doué e Dembélé. Os contextos e as licenças estão em docs/PHOTO-CREDITS.html; as montagens não representam uma partida conjunta.

O motor permite gols de falta e movimenta apoio, cobertura e avanço por função. Gols, cobranças e estatísticas vêm dos mesmos eventos, com resultado idêntico ao acelerar ou pular a animação. Normal e Rápida (3x) continuam disponíveis.

A página Beta mostra a linha do tempo das versões 0.5, 0.6, 0.7 e 0.7.1.

## Desafios com código

1. Na página inicial, escolha a competição e clique em **Criar desafio**.
2. Use **Copiar** para compartilhar o código.
3. Tanto o criador quanto o amigo colam o código no campo e clicam em **Tenho um código**.

O código reproduz o primeiro elenco. Escolhas, formação e rerolls podem mudar os sorteios seguintes. Não é multijogador online: campanhas e resultados ficam no navegador de cada pessoa. Os códigos FL5 existentes continuam aceitos.

## Conteúdo

| Modo | Clubes/seleções | Elencos | Cartas |
| --- | ---: | ---: | ---: |
| Libertadores | 40 | 104 | 1.482 |
| Champions | 34 | 85 | 1.347 |
| Copa | 55 | 299 | 6.065 |
| Total | — | **488** | **8.894** |

Inclui 86 versões vice-campeãs de clubes, além das campeãs. A cobertura de campeões continua com 54 elencos dos 27 clubes da Libertadores e 46 dos 24 clubes europeus, conforme os checklists documentados.

As competições jogáveis são históricas fictícias, misturando temporadas. Os elencos são recortes reais, não necessariamente listas integrais dos inscritos. As notas e atributos são editoriais, não oficiais.

**991 OVR individuais da Copa foram revistos em 43 seleções/edições. Restam 4.376 notas provisórias, identificadas no draft. Os atributos derivados das cartas revistas também continuam provisórios.** Fatos de participação, nomes e posições foram consultados no arquivo público do 7a0; notas, atributos, imagens e código daquele jogo não foram importados. Irlanda 2002, Sérvia 2022 e Brasil 2026 dessa referência aguardam desambiguação de nomes. Veja o [relatório](docs/cup-import-report.json).

## Como jogar

1. Escolha a competição e uma das oito formações.
2. Receba o primeiro elenco. Jogadores aparecem ordenados por OVR, com desempate pelo nome e filtro por posição.
3. Escolha um jogador e uma vaga compatível no campo.
4. Clique em **Sortear elenco** para a próxima escolha. Complete onze e revise as posições.
5. Inicie a competição.

Rerolls de **outro clube** e **outra temporada** compartilham o limite de três, configurável. Uma combinação de competição, equipe e temporada nunca reaparece no mesmo draft. Ofertas descartadas não voltam. O sorteio usa raridade ponderada, sem garantias de lendas; a troca de temporada também respeita os pesos entre as versões elegíveis do mesmo clube.

Posições compatíveis mantêm a eficiência e o OVR. Pontas podem atuar de ME e MD. Goleiros só atuam no gol. É possível trocar jogadores entre vagas compatíveis e mudar a formação antes do campeonato.

## Partidas e torneios

- Três jogos na fase de grupos dos três modos.
- Oitavas sorteadas entre primeiros e segundos de grupos diferentes.
- Libertadores e Champions com ida e volta nas oitavas, quartas e semifinais; final única. Dez partidas para um finalista.
- Copa com mata-mata em jogo único; sete partidas para um finalista.
- Sem gol fora de casa; empate agregado leva aos pênaltis após a volta. Não há prorrogação.
- Motor com passes, dribles, cruzamentos, finalizações, defesas, escanteios, faltas, pênaltis e amarelos. Gols e estatísticas vêm dos eventos.
- Campo Canvas com 22 peças, movimentação coletiva, bola visível e interpolação suave.
- **Normal** e **Rápida (3x)**, além de pular a reprodução. A velocidade não altera o resultado.
- Melhores lances, gols, assistências, classificação e calendário.
- Estilos táticos removidos; permanece a formação.

Campanhas já iniciadas mantêm seu calendário salvo. Entrosamento limitado a 4% em ações coletivas, sem alterar OVR. A base anterior recebeu aumento de 2% nos OVR e atributos, com tetos preservados; a conversão das finalizações foi reduzida.

## Registros e desafios

O Hall guarda até 50 campanhas e escalações. Conquistas são automáticas, incluindo cinco títulos seguidos, mais de 20 gols, campeão invicto e títulos nos três modos. Os indicadores da página inicial consideram as campanhas retidas no Hall.

Desafios por código compartilham o mesmo sorteio inicial. Cada participante faz suas escolhas e joga sua campanha local. Não é multiplayer ao vivo nem um ranking hospedado.

## Visual e recursos

Logo próprio em SVG, identidade em azul, violeta, âmbar e ciano. A faixa inicial alterna duas montagens de oito jogadores, entre Europa e América do Sul: [licenças e autores](docs/PHOTO-CREDITS.html).

Escudos e fotos são locais. Alguns clubes e seleções novos usam emblemas tipográficos próprios, sem reproduzir o escudo oficial: [lista](docs/beta-badge-fallbacks.json).

## Executar e desenvolver

Abra **index.html**. Os pacotes usam scripts clássicos compatíveis com `file://` e GitHub Pages. O salvamento usa localStorage e depende das permissões do navegador.

Para desenvolvimento, com Node.js:

    node tests/run.cjs

O compilador gera os pacotes offline a partir de `data/lib.json`, `data/ucl.json` e `data/wc.json`, além dos cadastros por competição e ano em `data/players` e `data/rosters`. Draft, formação, motor, competição, animação, interface e salvamento estão separados em `js`. Veja [arquitetura](docs/ARQUITETURA.md).

Os testes cobrem integridade, campeões, 100 mil sorteios por modo, drafts e campeonatos completos, agregado, pênaltis, estatísticas, velocidade, desafios e conquistas. A auditoria estrutural não substitui a revisão histórica humana.

O repositório mantém seu histórico original e publica a raiz de `main` no GitHub Pages. Não há build ou dependências de runtime.

## Grupos sem repetição de time

Nas novas campanhas, duas temporadas do mesmo clube ou seleção nunca ficam no mesmo grupo. Diferentes versões continuam elegíveis no campeonato, em grupos distintos. A seleção limita cada time a oito temporadas por torneio para garantir a distribuição em oito grupos de quatro. Campanhas já sorteadas mantêm seus grupos e resultados.

Teste específico: `node tests/group-draw-test.cjs` (3.000 sorteios com os três acervos reais, 90 calendários completos de grupos, salvamento e casos extremos).

## Beta 0.8 — refinamentos

Mais 292 cartas da Copa receberam revisão editorial individual em 13 seleções/edições (1958–2022). As fontes confirmam elenco e contexto; as notas são avaliações próprias do jogo. Ainda restam **4.084 notas provisórias**, e os atributos derivados continuam provisórios. Relatório: `docs/wc-rating-review-08.json`. As cartas das campanhas salvas não são reavaliadas retroativamente.

Trocas de posição mostram uma prévia antes da confirmação. A página inicial mantém a organização escolhida, com menos altura no celular. O resumo da campanha reúne resultados, agregados, formação, OVR, artilheiro, assistências e destaque. É possível baixar uma imagem PNG ou compartilhar/copiar um texto; tudo é gerado localmente, sem conta ou API. Registros antigos continuam funcionando, com aviso se não houver placares guardados. Novos registros salvam somente os jogos do usuário, sem animações, e respeitam o limite de 50 campanhas.

A simulação usa quem tem a bola para finalizar e favorece passes entre companheiros próximos. Apoios, coberturas, corridas sem bola e espaçamento coletivo foram refinados. Velocidades e pular partida continuam sem alterar os resultados. Balanceamento verificado com confrontos espelhados por diferença de atributos: `docs/calibration-08-report.json`.
