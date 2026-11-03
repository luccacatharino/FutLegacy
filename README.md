# FutLegacy

**Monte seu time. Escreva sua história.**

Versão inicial jogável de draft de futebol para navegador. HTML5, CSS3 e JavaScript puro, sem instalação, imagens externas ou APIs durante o jogo.

## Executar
Abra `index.html` no navegador. Os scripts clássicos separados funcionam também por `file://`. O armazenamento local depende das permissões do navegador; para persistência previsível, prefira o GitHub Pages ou um servidor estático. Não há build.

## Jogar
Escolha competição e formação, selecione uma vaga e escolha **um** jogador por elenco sorteado. Há três rerolls por padrão, configuráveis para futuras campanhas. A oferta anterior é descartada. Monte os onze, revise posições e inicie o campeonato. Use 1x, 2x, 4x ou pule a reprodução. A partida já tem eventos determinados, portanto a velocidade não altera seu resultado.

Raridades de elenco: comum 60%, competitivo 28%, elite 10%, lendário 2%. Não existe garantia de lendários. Caso uma raridade não tenha ofertas elegíveis, a segurança usa os elencos elegíveis restantes, sem selecionar por força.

## Implementado
- Quatro competições, três formações e cinco estilos.
- 16 elencos com onze cartas cada, IDs contextuais e avaliações editoriais próprias.
- Arrascaeta: Flamengo 2022 / Libertadores 90; Uruguai 2022 / Copa 83.
- Draft em duas etapas: selecionar o jogador e escolher uma de suas posições no campo. Posições naturais, incluindo secundárias, têm 100% de eficiência; improvisações próximas têm 88%. Vagas incompatíveis são bloqueadas e goleiros atuam exclusivamente no gol.
- Brasileirão: 20 equipes, 38 rodadas, 380 confrontos, turno/returno; classificação completa.
- Copas: 32 equipes, oito grupos, dois classificados por grupo e chaveamento cruzado. Grupos da Copa em turno único (finalista joga sete partidas). Libertadores e Champions têm seis rodadas de grupos. Mata-mata simplificado em jogo único, empate decidido por pênaltis.
- Motor determinístico por semente com eventos de posse, passes, conduções, dribles, cruzamentos, desarmes, interceptações, chutes, defesas, escanteios e gols. Estatísticas derivam dos eventos.
- Reprodução em mini campo, placar, autores, assistências e resumo.
- Entrosamento apenas de companheiros do mesmo elenco e temporada, limitado a 4%, aplicado à manutenção de passes.
- Salvamento automático de campanha, oferta e partida pendente. Hall de até 50 campanhas com IDs e snapshots compactos dos jogadores. Não guarda animações concluídas.
- Publicação estática compatível com GitHub Pages, caminhos relativos.

## Recorte e pendências — não confundir com versão final
Esta é a primeira versão funcional, não a conclusão de todos os refinamentos solicitados.

- Banco inicial enxuto: quatro elencos por competição, um por raridade. Expandir temporadas, variedade de comuns e quantidade de atletas por elenco. Ver `docs/FONTES.md`.
- Adversários sem cartas completas usam modelos de força e atribuem o marcador ao ataque da equipe, sem inventar nomes de atletas. Precisam de elencos individuais para autoria completa de gols e assistências.
- A revisão 2 substitui os atributos derivados do OVR por 176 fichas individuais, com posições e avaliações editoriais por equipe/temporada/competição. A precisão das posições secundárias e a calibração estatística continuam abertas a refinamento; ver `docs/AVALIACOES.md`.
- Motor inicial usa sobretudo força efetiva, finalização, estilo e química; não modela individualmente todas as interações dos atributos. Tática é assimétrica para jogos em que o usuário é visitante; corrigir antes de considerar o balanceamento final.
- Mini campo tem movimentos suaves por faixas e bola seguindo eventos; falta coreografia física específica para cada passe, chute, cruzamento, defesa e escanteio. Movimentos ainda não reproduzem trajetórias táticas individuais das três formações. Não há física de futebol de botão.
- Melhor da partida é uma estimativa por gols e assistências; Hall registra o melhor da última partida, ainda não um prêmio agregado de toda a campanha. Falta ranking completo de artilheiros e assistentes da competição.
- Após eliminação do usuário, a campanha é registrada e encerrada; não simula o restante do torneio para determinar o campeão adversário.
- Pontos corridos usa desempate por pontos, vitórias, saldo, gols e ID estável, sem confrontos diretos ou sorteio. Mata-mata não tem prorrogação nem ida/volta.
- Formato futuro de fase de liga da Champions ainda não implementado; o agendamento é separado do motor para permitir extensão.
- Falta QA exaustivo de acessibilidade, dispositivos móveis e recuperação de versões futuras dos saves. Há limite por quantidade de campanhas, sem política adicional por bytes.

## Código
- `js/profiles.js`: fichas individuais com posições, OVR contextual e atributos.
- `js/data.js`: elencos, cartas, raridades, elegibilidade, posicionamento e química.
- `js/engine.js`: eventos determinísticos, calendário, classificação.
- `js/tournament.js`: grupos, rodadas e progressão.
- `js/app.js`: telas, reprodução e persistência.
- `css/style.css`: identidade, campo e responsividade.
- `tests/check.cjs`: testes de integração com Node (somente desenvolvimento).

## Verificação
`node tests/check.cjs` testa 120 campanhas nas quatro competições, calendário de 380 partidas, 100.000 amostras estratificadas dos limiares de raridade, gols versus eventos, determinismo, posições e teto de química. As amostras de raridade conferem os intervalos, não constituem teste estatístico do gerador aleatório. Não substitui testes manuais da interface.

## Publicação solicitada
Repositório público **FutLegacy**, todos os arquivos versionados e GitHub Pages a partir da branch principal, pasta raiz. A entrega de publicação exige confirmar o deploy e acessar o jogo publicado. Não declarar concluída enquanto isso estiver pendente.

Os torneios são históricos fictícios: misturam equipes de anos diferentes, não reconstituem edições oficiais. Sem moedas ou progressão. Fotos e logos adicionados nesta revisão possuem fontes documentadas nos créditos.

## Interface de draft e arquivos locais

O draft agora mostra um campo vertical clicável com posições específicas para 4-3-3, 4-4-2 e 3-5-2, ofertas em lista e resumo do time. Clique em um jogador e depois escolha uma vaga compatível no campo. A carta só entra no time ao posicioná-la. As fotos de Messi, Cristiano Ronaldo, Mbappé e Neymar e as logos das competições ficam em `assets/`, sem chamadas externas para jogar. Fontes e licenças estão em `docs/CREDITOS.html` e `docs/asset-sources.json`.

Pasta local principal desta entrega: `Área de Trabalho/projetos/futlegacy`. Referências e versões anteriores ficam em subpastas dentro de `projetos/futlegacy`.


## Revisão 2 — jogador e posição

O draft agora mostra todas as posições naturais da carta, destaca no campo as vagas disponíveis e permite cancelar uma seleção antes de posicionar. Rerolls descartam a oferta e a seleção pendente. OVR e atributos foram revistos nas 176 cartas, com valores próprios para cada contexto, sem copiar notas do 7a0 ou de jogos comerciais. Critérios, exemplos, fontes e tratamento das campanhas antigas estão em [docs/AVALIACOES.md](docs/AVALIACOES.md).

## Interface preta e azul — revisão 3

A seleção de formação tem um mini campo que atualiza imediatamente ao escolher 4-3-3, 4-4-2 ou 3-5-2. A mesma distribuição é usada no draft, na revisão e no Hall. As regras de seleção de jogadores, posições naturais, improvisações, raridades e avaliações contextuais são preservadas.

Foram adicionados 111 escudos locais ao lado dos nomes nos sorteios, nas tabelas, nos confrontos, nos placares e nas cartas do histórico. A Copa usa a logo de 2026 com a taça; a Champions usa exclusivamente o símbolo de estrelas da logo, sem texto. A foto principal do Messi é da Copa de 2022. A caixa da logo do Brasileirão contém a imagem inteira, sem transbordamento.

Organização: `assets/badges/clubs`, `assets/badges/nations`, `assets/logos`, `assets/photos`. Fontes em `docs/CREDITOS.html`, `docs/ESCUDOS.html` e arquivos JSON correspondentes. Escudos identificam clubes e federações, sem afirmar que cada desenho corresponde à variante exata do ano da carta.
