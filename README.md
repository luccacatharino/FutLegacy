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
- Draft com vagas, elegibilidade, ausência de duplicatas e troca de posições com eficiência de 94% ou 82%. Goleiros exclusivamente no gol.
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
- Avaliações têm perfis por posição derivados do OVR editorial. Ainda falta calibrar individualmente os seis atributos e os atributos de goleiro com pesquisa aprofundada.
- Motor inicial usa sobretudo força efetiva, finalização, estilo e química; não modela individualmente todas as interações dos atributos. Tática é assimétrica para jogos em que o usuário é visitante; corrigir antes de considerar o balanceamento final.
- Mini campo tem movimentos suaves por faixas e bola seguindo eventos; falta coreografia física específica para cada passe, chute, cruzamento, defesa e escanteio. Movimentos ainda não reproduzem trajetórias táticas individuais das três formações. Não há física de futebol de botão.
- Melhor da partida é uma estimativa por gols e assistências; Hall registra o melhor da última partida, ainda não um prêmio agregado de toda a campanha. Falta ranking completo de artilheiros e assistentes da competição.
- Após eliminação do usuário, a campanha é registrada e encerrada; não simula o restante do torneio para determinar o campeão adversário.
- Pontos corridos usa desempate por pontos, vitórias, saldo, gols e ID estável, sem confrontos diretos ou sorteio. Mata-mata não tem prorrogação nem ida/volta.
- Formato futuro de fase de liga da Champions ainda não implementado; o agendamento é separado do motor para permitir extensão.
- Falta QA exaustivo de acessibilidade, dispositivos móveis e recuperação de versões futuras dos saves. Há limite por quantidade de campanhas, sem política adicional por bytes.

## Código
- `js/data.js`: elencos, cartas, raridades, posições, regras de química.
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

O draft agora mostra um campo vertical clicável com posições específicas para 4-3-3, 4-4-2 e 3-5-2, ofertas em lista e resumo do time. Clique em uma vaga livre antes de escolher um jogador. As fotos de Messi, Cristiano Ronaldo, Mbappé e Neymar e as logos das competições ficam em `assets/`, sem chamadas externas para jogar. Fontes e licenças estão em `docs/CREDITOS.html` e `docs/asset-sources.json`.

Pasta local principal desta entrega: `outputs/projetos/futlegacy`. Referências e versões anteriores ficam em subpastas dentro de `projetos/futlegacy`.

