# GoalVision AI

Plataforma de consulta de jogos e análise desportiva, com foco em clareza, várias modalidades e transparência sobre a qualidade dos dados.

## Estado atual
- Interface responsiva em português.
- Modalidades: futebol, basquetebol, ténis e críquete.
- Pesquisa de equipas e competições.
- Atalhos para competições populares, incluindo Champions League, Premier League, LaLiga, Serie A, Bundesliga, Ligue 1, Europa League, Liga Portugal, Brasileirão, Girabola e MLS.
- Calendário consultado na fonte externa SportScore.
- Favoritos e diário de jogos guardados localmente no dispositivo.
- Comparador simples de jogos e calculadora de probabilidades Poisson baseada em médias inseridas manualmente.
- Indicadores de contexto e transparência: não confundir campos básicos preenchidos com estatísticas avançadas.

## Limitações importantes
- O motor de análise não está ligado a estatísticas reais completas (forma recente, lesões, titulares, odds, cantos, cartões, etc.).
- Probabilidades calculadas com médias introduzidas manualmente são estimativas matemáticas ilustrativas.
- Jogos, resultados e dados não confirmados não devem ser inventados.
- Premium é uma pré-visualização; pagamentos e desbloqueio ainda não estão ativos.

## Executar localmente
```bash
npm install
npm run dev
```
Abra http://localhost:3000.

**Aviso:** probabilidades são estimativas, não garantias de resultado.