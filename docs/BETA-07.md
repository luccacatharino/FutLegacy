# Beta 0.7

## Fotos e interface

- Quinze aparições em três faixas, com 14 recortes transparentes distintos (Paredes aparece em duas seções).
- Apenas jogadores de 1990 em diante nas fotos iniciais. Pelé, Garrincha, Maradona, Zidane e Modrić saíram dessas faixas; o banco histórico do jogo permanece.
- Europa: Cristiano Ronaldo, Mbappé, Haaland, Lamine Yamal e Vitinha.
- Recortes locais de fotos reais; não foram usados os testes de montagens geradas. Rostos e uniformes não foram recriados. Contextos originais e licenças em PHOTO-CREDITS.html.
- Cores nas competições, transições curtas, pré-carregamento das faixas e respeito a movimento reduzido. As fotos trocam sem limpar o campo de código.
- Histórico do Beta com versões 0.5, 0.6 e 0.7 e recursos anteriores.

## Partidas

- Cobranças diretas de falta: cobrador por atributo de falta ou combinação de finalização/passe; chance limitada e defesa do goleiro consideradas.
- Gols de falta contam para placar, artilharia e melhor jogador, sem assistência. Cobranças entram nas estatísticas. O mesmo motor funciona ao assistir, acelerar e pular.
- Apoio ao portador, abertura dos pontas, avanço da linha, coberturas e aproximação dos defensores. Destinos são produzidos pelo motor e interpolados pelo Canvas. Isso ainda é uma simulação estilizada por eventos, não uma física completa de futebol.
- Velocidades mantidas: Normal e Rápida (3x).

## Copa: revisão parcial explícita

991 OVR individuais revistos em 43 seleções/edições, com titulares, reservas e desempenhos contextuais diferenciados. Notas editoriais próprias; não são números oficiais da FIFA. Preservados os limites excepcionais solicitados para Pelé, Maradona, Messi e Mbappé.

Ainda restam **4.376 OVR provisórios**. Atributos derivados das cartas revistas também continuam provisórios. Não se declara a revisão histórica individual completa. Comparações antes/depois estão em ../data/rating-reviews/wc-07.json; totais e fontes, em wc-rating-review-07.json. Três associações/nomes foram corrigidos por listas oficiais: Jonás Gutiérrez (Argentina 2010), Alberto Aquilani (Itália 2014) e Pepe Reina (Espanha 2018).

As novas notas entram nos novos elencos e drafts. Campanhas já salvas preservam suas cartas e resultados.

## Códigos

Escolha a competição → Criar desafio → Copiar. Cada participante cola o mesmo código e usa Tenho um código. O primeiro elenco é compartilhado; os resultados não são sincronizados. Não há sala online nem envio de mensagens pelo jogo.

## Verificação

Testes do motor de faltas e movimento em 500 partidas; 300.000 sorteios, 42.000 sorteios sem reposição, 24 campanhas completas e 1.736 partidas; caminhos de título de 10 jogos nos clubes e sete na Copa. UI com 24 drafts, oito formações, trocas, salvamento, ida/volta e histórico. Conferência de desktop e 375px no navegador. Os testes verificam integridade e consistência; não substituem revisão humana de todas as fontes históricas.
