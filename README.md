# FutLegacy

**Monte seu time. Escreva sua história.**

Reformulação do jogo de draft de futebol histórico em HTML, CSS e JavaScript puro. São **três modos ativos: Libertadores, Champions League e Copa do Mundo**. O Brasileirão foi removido a pedido.

## Acervo auditado

| Modo | Clubes/seleções | Elencos | Cartas |
| --- | ---: | ---: | ---: |
| Libertadores | 28 | 55 | 912 |
| Champions League | 24 | 48 | 777 |
| Copa do Mundo | 32 | 63 | 698 |
| Total | — | **166** | **2.387** |

A Libertadores contém os **54 elencos campeões dos 27 clubes** até 2025, mais Athletico-PR 2022. A Champions contém os **46 elencos campeões dos 24 clubes** até 2025/26, mais duas campanhas não campeãs. Clubes com um ou dois títulos têm todas essas temporadas; os demais têm três escolhas justificadas. A Copa cobre **19 edições de 1950 a 2022**, com campeões, vices e campanhas marcantes.

Os campeonatos do jogo são **históricos fictícios**, misturando temporadas. Os recortes possuem onze ou mais jogadores reais e fontes por elenco. **Não são listas integrais de todos os inscritos.** OVR e atributos são avaliações editoriais próprias, não dados oficiais. Parte dos atributos da Copa ainda usa perfis posicionais estimados e necessita revisão individual mais fina. Não se anuncia cobertura de 2026 na Copa.

Consulte [acervo navegável e auditoria](docs/AUDITORIA.html), [limites e pendências](docs/PENDENCIAS.md), [fontes da Libertadores](docs/lib-sources.md), [fontes europeias](docs/ucl-sources.md) e [fontes da Copa](docs/copa-sources.md).

## Jogar

1. Escolha uma competição, uma das oito formações e um estilo tático.
2. Um clube/seleção e uma temporada são sorteados.
3. Os atletas aparecem do maior OVR para o menor; empates são ordenados pelo nome. O filtro de posição mantém a ordenação.
4. Escolha um atleta e uma vaga compatível no campo. Só essa colocação consome a escolha.
5. O próximo elenco é sorteado. Complete onze, revise e entre no campeonato.

Um **elenco específico nunca reaparece no mesmo draft**, inclusive depois de reroll e recarregamento. Outra temporada do mesmo clube pode aparecer. Há três rerolls por padrão, ajustáveis nas configurações.

Raridades: comum 60%, competitivo 28%, elite 10%, lendário 2%. A categoria é escolhida primeiro. Categorias sem elencos inéditos elegíveis são retiradas e os pesos restantes são normalizados. Há uma redução moderada de peso para outras temporadas dos últimos clubes sorteados. Não há garantia de lendas nem favorecimento por popularidade ou ano.

Posições naturais têm 100% de eficiência; improvisações próximas têm 88%. Funções incompatíveis ficam bloqueadas. É possível mudar a formação antes do campeonato; o remanejamento mantém todos os atletas ou recusa a mudança com uma explicação.

## Partidas e torneios

- Grupos completos e oitavas, quartas, semifinal e final, com adversários reais de várias temporadas.
- Copa com três jogos de grupo; quem vai à final disputa sete partidas. Libertadores e Champions têm seis jogos de grupo e dez partidas para um finalista.
- Empates eliminatórios são resolvidos diretamente por cobranças simuladas de pênaltis. Não há prorrogação nesta versão.
- Motor próprio de posse, progressão, passes, dribles, conduções, recuperações, cruzamentos, chutes, defesas, escanteios e gols.
- Campo Canvas 2D com 22 peças, goleiros, números, redes e trajetos interpolados da bola.
- Velocidades 1x/2x/4x e pular reprodução não mudam o resultado da semente simulada.
- Classificações, calendário, chaves, próximo adversário, resultados, artilharia, assistências e destaque da partida.
- Entrosamento automático limitado a 4% em passes coletivos, sem alterar OVR. Só conecta cartas da mesma equipe/temporada documentada.
- Hall da Fama automático com até 50 campanhas e escalações. Sem moedas, níveis ou microtransações.

Posse de bola favorece conservação e desacelera a progressão; contra-ataque acelera transições; pressão alta ajuda recuperações adiantadas e abre exposição; defensivo reduz risco e produção; equilibrado mantém os parâmetros de referência.

## Executar localmente

Abra **index.html** no navegador. Não precisa instalar nada, compilar, iniciar servidor ou usar APIs. Os pacotes de dados usam scripts clássicos compatíveis com `file://`. O salvamento depende das permissões de armazenamento do navegador. GitHub Pages oferece uma origem estável para localStorage.

Todos os recursos necessários estão incluídos em `assets`. As fotos, logos e escudos têm créditos e fontes em [Créditos](docs/CREDITOS.html) e [Escudos](docs/ESCUDOS.html). Escudos podem representar a identidade atual, não necessariamente a variante exata do ano histórico.

## Organização e desenvolvimento

Veja [arquitetura](docs/ARQUITETURA.md). Os dados editoriais ficam separados por competição; cadastros normalizados de elencos e atributos ficam em `data/rosters/<competição>/<ano>.json` e `data/players/<competição>/<ano>.json`. Os pacotes offline em `js/catalogue` são gerados por `tests/build-catalogue.cjs`.

Para desenvolver e executar todos os testes, basta Node.js (somente desenvolvimento):

    node tests/run.cjs

A bateria inclui auditoria de campeões, identidade das cartas, posições, atributos de goleiros, contexto Arrascaeta90/83, 100.000 sorteios por modo, drafts completos, campeonatos completos, gols, assistências, estatísticas, pênaltis, independência da reprodução e persistência. Os relatórios ficam em `docs/*-report.json`.

A auditoria estrutural não substitui a revisão histórica humana. As limitações e a expansão pendente dos recortes estão explicitadas em `docs/PENDENCIAS.md`.

## Publicação

Repositório existente: https://github.com/luccacatharino/FutLegacy

Jogo: https://luccacatharino.github.io/FutLegacy/

O GitHub Pages publica a raiz da branch `main`. Não há build ou dependências de runtime. O histórico Git anterior foi preservado.
