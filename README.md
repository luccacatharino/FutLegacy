# FutLegacy — Beta 0.6

Draft de futebol histórico para navegador. HTML, CSS e JavaScript puro, sem instalação ou APIs para jogar.

- [Jogar](https://luccacatharino.github.io/FutLegacy/)
- [Acervo e auditoria](https://luccacatharino.github.io/FutLegacy/docs/AUDITORIA.html)
- [Alterações e limites](docs/BETA-06.md)

## Interface 0.6

Formações visíveis, troca de posição pelo campo, sorteio manual com animação no painel de jogadores e navegação Voltar. A eliminação mostra o grupo ou o caminho do mata-mata com agregados. O link “Fotos da galeria” foi removido do rodapé; as fotos permanecem no início.

As fotos foram renovadas e seus contextos estão identificados. Ainda faltam imagens licenciadas de ação na competição exata para Zidane, Ronaldo, Riquelme, Paredes e Ronaldinho. Maradona aparece pelo Boca: ele nunca disputou a Libertadores. Créditos em docs/PHOTO-CREDITS.html.

## Conteúdo

| Modo | Clubes/seleções | Elencos | Cartas |
| --- | ---: | ---: | ---: |
| Libertadores | 40 | 104 | 1.482 |
| Champions | 34 | 85 | 1.347 |
| Copa | 55 | 299 | 6.065 |
| Total | — | **488** | **8.894** |

Inclui 86 versões vice-campeãs de clubes, além das campeãs. A cobertura de campeões continua com 54 elencos dos 27 clubes da Libertadores e 46 dos 24 clubes europeus, conforme os checklists documentados.

As competições jogáveis são históricas fictícias, misturando temporadas. Os elencos são recortes reais, não necessariamente listas integrais dos inscritos. As notas e atributos são editoriais, não oficiais.

**As novas fichas da Copa usam avaliações provisórias, identificadas no draft.** Fatos de participação, nomes e posições foram consultados no arquivo público do 7a0; notas, atributos, imagens e código daquele jogo não foram importados. Irlanda 2002, Sérvia 2022 e Brasil 2026 dessa referência aguardam desambiguação de nomes. Veja o [relatório](docs/cup-import-report.json).

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

Logo próprio em SVG, identidade em azul, violeta, âmbar e ciano. A galeria alterna 15 fotos licenciadas, entre Europa, Copas e América do Sul: [licenças e autores](docs/PHOTO-CREDITS.html).

Escudos e fotos são locais. Alguns clubes e seleções novos usam emblemas tipográficos próprios, sem reproduzir o escudo oficial: [lista](docs/beta-badge-fallbacks.json).

## Executar e desenvolver

Abra **index.html**. Os pacotes usam scripts clássicos compatíveis com `file://` e GitHub Pages. O salvamento usa localStorage e depende das permissões do navegador.

Para desenvolvimento, com Node.js:

    node tests/run.cjs

O compilador gera os pacotes offline a partir de `data/lib.json`, `data/ucl.json` e `data/wc.json`, além dos cadastros por competição e ano em `data/players` e `data/rosters`. Draft, formação, motor, competição, animação, interface e salvamento estão separados em `js`. Veja [arquitetura](docs/ARQUITETURA.md).

Os testes cobrem integridade, campeões, 100 mil sorteios por modo, drafts e campeonatos completos, agregado, pênaltis, estatísticas, velocidade, desafios e conquistas. A auditoria estrutural não substitui a revisão histórica humana.

O repositório mantém seu histórico original e publica a raiz de `main` no GitHub Pages. Não há build ou dependências de runtime.
