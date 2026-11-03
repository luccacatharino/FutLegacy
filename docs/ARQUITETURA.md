# Arquitetura da reformulação

O projeto funciona com scripts clássicos em ordem explícita no `index.html`. Não faz requisições para carregar dados durante o jogo e abre diretamente por `file://`.

| Parte | Arquivo/pasta |
| --- | --- |
| Catálogo, identidade das cartas e regras compartilhadas | `js/core.js` |
| Oito formações, posições e remanejamento de atletas | `js/formations.js` |
| Sorteio ponderado sem reposição | `js/draft.js` |
| Dados editoriais por competição | `data/lib.json`, `data/ucl.json`, `data/wc.json` |
| Cadastros normalizados por competição e temporada | `data/players/`, `data/rosters/` |
| Pacotes locais gerados para o navegador | `js/catalogue/` |
| Motor puro, eventos e cobranças de pênaltis | `js/match-engine.js` |
| Grupos, calendário e chaves | `js/competitions.js` |
| Animação Canvas sem alterar resultados | `js/match-view.js` |
| Interface e fluxo de navegação | `js/app.js` |
| Identidade visual e responsividade | `css/identity.css` |
| Persistência e resumo sem animações | `js/storage.js` |
| Migração e compatibilidade com cartas antigas | `data/legacy/`, `js/catalogue/legacy.js` |
| Auditoria e testes | `tests/`, relatórios em `docs/` |

## Sorteio

A chave de um elenco é competição + clube/seleção + temporada. A campanha salva `seenOffers`. A oferta é registrada imediatamente ao ser exibida, portanto escolher um atleta, usar reroll, recarregar ou mudar a formação não devolve o elenco ao banco. Uma campanha nova inicia a lista vazia.

Primeiro são construídas as categorias com elencos inéditos e jogadores compatíveis com as vagas livres. A categoria usa os pesos 60/28/10/2; categorias vazias são removidas e as demais são normalizadas proporcionalmente. Em seguida se sorteia um elenco da categoria. Outras temporadas dos últimos três clubes sorteados têm peso multiplicado por 0,7. O ajuste não bloqueia clubes, não muda a categoria sorteada e não privilegia anos recentes ou popularidade.

Não há garantia de lendas nem aumento por número de tentativas. O esgotamento natural de categorias pode alterar a distribuição ao longo de um draft sem reposição. A configuração de três rerolls é independente das probabilidades.

Ao mudar de formação, um emparelhamento procura redistribuir todos os atletas preservando suas compatibilidades. A mudança é recusada se não houver distribuição válida; nenhum atleta é descartado silenciosamente. Se a oferta atual deixar de atender uma vaga, a segurança a descarta e busca um elenco inédito elegível, sem selecionar por força.

## Motor e reprodução

O motor mantém posse, progressão territorial, jogador portador e último passe. Qualidade, função, goleiro, formação, estilo e entrosamento afetam ações. O placar só aumenta num evento de gol. Estatísticas e assistências são registradas na mesma sequência de eventos. A mesma semente e os mesmos times produzem o mesmo resultado com ou sem os eventos gráficos.

O Canvas interpola as posições dos jogadores e os trajetos da bola produzidos pelo motor. Velocidade e pular partida só alteram a reprodução. Resultados de outras partidas e campanhas encerradas guardam resumos compactos, sem quadros da animação. Após eliminação, o restante da chave é simulado para definir o campeão real daquele torneio fictício.

## Limites herdados e migração

A chave de salvamento anterior é preservada. Cartas e ofertas antigas conhecidas recebem os novos identificadores. A versão anterior não salvava histórico de rerolls, então não é possível reconstruir ofertas descartadas antes desta atualização. A garantia integral de não repetição aplica-se a novos drafts; drafts antigos preservam os elencos que podem ser reconstruídos a partir das escolhas e da oferta corrente. Campanhas antigas do Brasileirão, removido a pedido, ficam retidas no armazenamento, mas não são modos ativos.

O Hall guarda até 50 campanhas e snapshots das cartas para que mudanças futuras no catálogo não apaguem a escalação histórica.

## Conferência no navegador publicado

A URL com `?qa=1` usa uma chave de armazenamento isolada (`futlegacy-qa-v3`) com as mesmas regras, dados e motor. Serve para testar uma campanha inteira sem sobrescrever a campanha normal do usuário. Não altera probabilidades, atributos ou resultados.

## Eliminatórias com duas partidas

Formato 3: knockoutRounds guarda pares, índice da fase, rodada inicial e número de jogos. As duas rodadas são agendadas antes da ida, invertendo mandos na volta. O agregado fica na orientação dos times da partida atual; tieSummary normaliza para a orientação da chave. Somente a última perna decide classificação e pênaltis; não há gol fora. A final e a Copa usam uma partida. Saves na fase de grupos são migrados; eliminatórias antigas já iniciadas mantêm sua programação. O agregado ao vivo soma somente o resultado da ida ao placar dos eventos já mostrados, sem revelar o resultado futuro.
