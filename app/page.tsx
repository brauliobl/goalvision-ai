"use client";

import { useState } from "react";

const sports = ["Todos", "Futebol", "Basquetebol", "Ténis", "Voleibol"];
const sampleMatches = [
  { sport: "Futebol", league: "ANÁLISE DE DEMONSTRAÇÃO", home: "Equipa Azul", away: "Equipa Dourada", time: "A aguardar dados", market: "1X2 · Golos · Ambas marcam" },
  { sport: "Basquetebol", league: "ANÁLISE DE DEMONSTRAÇÃO", home: "Lobos BC", away: "Águias BC", time: "A aguardar dados", market: "Vencedor · Total de pontos" },
  { sport: "Ténis", league: "ANÁLISE DE DEMONSTRAÇÃO", home: "Jogador A", away: "Jogador B", time: "A aguardar dados", market: "Vencedor · Sets" },
  { sport: "Voleibol", league: "ANÁLISE DE DEMONSTRAÇÃO", home: "Clube Norte", away: "Clube Sul", time: "A aguardar dados", market: "Vencedor · Total de sets" },
];

export default function Home() {
  const [active, setActive] = useState("Todos");
  const [query, setQuery] = useState("");
  const filtered = sampleMatches.filter((m) =>
    (active === "Todos" || m.sport === active) &&
    (m.home + " " + m.away + " " + m.sport).toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#"><span className="brand-mark">GV</span><span>GoalVision <b>AI</b></span></a>
        <nav><a href="#modalidades">Modalidades</a><a href="#como-funciona">Como funciona</a><a href="#sobre">Sobre</a></nav>
        <a className="header-cta" href="#jogos">Explorar análises <span>↗</span></a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse" /> INTELIGÊNCIA DESPORTIVA</div>
          <h1>Vê o jogo.<br /><em>Entende os dados.</em></h1>
          <p>Uma nova forma de acompanhar o desporto. Estatísticas, contexto e probabilidades explicadas com clareza — em várias modalidades.</p>
          <div className="hero-actions"><a className="primary-btn" href="#jogos">Começar a explorar <span>→</span></a><a className="text-btn" href="#como-funciona">Conhecer a plataforma</a></div>
          <div className="hero-note"><span>✦</span> Decisões informadas começam com bons dados.</div>
        </div>
        <div className="hero-visual" aria-label="Painel ilustrativo de análise desportiva">
          <div className="visual-glow" />
          <div className="visual-card">
            <div className="visual-head"><span>GV / MATCH CENTER</span><span className="live-tag">● DEMO</span></div>
            <div className="visual-match"><div className="team"><div className="team-icon blue">A</div><span>Equipa Azul</span></div><div className="versus">VS</div><div className="team"><div className="team-icon gold">B</div><span>Equipa Dourada</span></div></div>
            <div className="visual-divider" />
            <div className="visual-stats"><div><small>PROBABILIDADE</small><strong>—</strong><span>À espera de dados reais</span></div><div><small>CONFIANÇA</small><strong>—</strong><span>Sem previsão publicada</span></div></div>
            <div className="chart-placeholder"><div className="chart-line" /><div className="chart-labels"><span>FORMA</span><span>GOLOS</span><span>CONTEXTO</span></div></div>
            <p className="demo-caption">Pré-visualização da interface · Sem dados ao vivo</p>
          </div>
          <div className="floating-chip"><span>✦</span> Análise multid desportiva</div>
        </div>
      </section>

      <section className="trust-strip"><div><strong>01</strong><span>Dados antes de opiniões</span></div><div><strong>02</strong><span>Probabilidades, não certezas</span></div><div><strong>03</strong><span>Várias modalidades</span></div></section>

      <section className="matches section" id="jogos">
        <div className="section-heading"><div><div className="eyebrow">CENTRO DE ANÁLISES</div><h2>Explora as modalidades</h2><p>Escolhe uma modalidade e consulta a estrutura de análise.</p></div><span className="demo-pill">MODO DE PRÉ-VISUALIZAÇÃO</span></div>
        <div className="filters" id="modalidades">{sports.map((s) => <button key={s} className={active === s ? "filter active" : "filter"} onClick={() => setActive(s)}>{s}</button>)}</div>
        <div className="search-wrap"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Pesquisar equipa ou modalidade..." /></div>
        <div className="match-grid">{filtered.map((m) => <article className="match-card" key={m.sport}><div className="card-top"><span className="sport-label">{m.sport}</span><span className="awaiting">EM PREPARAÇÃO</span></div><div className="league">{m.league}</div><div className="teams"><div><span className="mini-crest">{m.home.slice(0,1)}</span><b>{m.home}</b></div><span className="vs">VS</span><div><span className="mini-crest alt">{m.away.slice(0,1)}</span><b>{m.away}</b></div></div><div className="card-bottom"><span>{m.market}</span><span>↗</span></div></article>)}</div>
        {filtered.length === 0 && <p className="empty">Não encontrámos resultados para essa pesquisa.</p>}
        <p className="notice">Os confrontos acima são exemplos visuais. As análises reais só serão apresentadas quando houver fontes de dados verificáveis ligadas à plataforma.</p>
      </section>

      <section className="how section" id="como-funciona"><div className="eyebrow">SIMPLES E TRANSPARENTE</div><h2>Como funciona</h2><div className="steps"><div><span>01</span><h3>Escolhe o jogo</h3><p>Encontra o encontro e a modalidade que queres acompanhar.</p></div><div><span>02</span><h3>Consulta os dados</h3><p>Forma recente, desempenho, ausências e estatísticas relevantes.</p></div><div><span>03</span><h3>Compreende o cenário</h3><p>Probabilidades acompanhadas de explicações e fatores de risco.</p></div></div></section>

      <section className="about section" id="sobre"><div><div className="eyebrow">A NOSSA VISÃO</div><h2>O desporto é mais do que um resultado.</h2></div><p>O GoalVision AI nasce para tornar a análise desportiva mais acessível, organizada e transparente. Queremos apoiar os adeptos com informação útil, sem promessas de resultados garantidos.</p></section>

      <footer><a className="brand" href="#"><span className="brand-mark">GV</span><span>GoalVision <b>AI</b></span></a><span>© 2026 GoalVision AI · Feito para quem vê além do jogo.</span><a href="#sobre">Sobre o projeto ↑</a></footer>
    </main>
  );
}