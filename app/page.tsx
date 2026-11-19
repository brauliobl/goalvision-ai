"use client";

import { useEffect, useMemo, useState } from "react";

const sports=[{label:"Todos",value:"all"},{label:"Futebol",value:"football"},{label:"Basquetebol",value:"basketball"},{label:"Ténis",value:"tennis"},{label:"Críquete",value:"cricket"}];
type Match={id:string;sport:string;league:string;home:string;away:string;time:string;status:string;homeScore:any;awayScore:any};
function dateAt(n:number){const d=new Date();d.setUTCDate(d.getUTCDate()+n);return d.toISOString().slice(0,10)}
function normalize(p:any,sport:string):Match[]{const rows=Array.isArray(p)?p:(p?.matches??p?.fixtures??p?.data??p?.events??[]);if(!Array.isArray(rows))return[];return rows.map((x:any,i:number)=>{const h=x.home??x.home_team??x.team1??x.homeTeam??x.participants?.[0]?.name;const a=x.away??x.away_team??x.team2??x.awayTeam??x.participants?.[1]?.name;if(!h||!a)return null;return{id:String(x.id??x.fixture_id??x.slug??i),sport,league:x.competition?.name??x.league?.name??x.competition_name??x.league??sport,home:String(h),away:String(a),time:x.time??x.date??x.start_time??x.utcDate??"",status:x.status_text??x.status??"Agendado",homeScore:x.home_score??x.score?.home??null,awayScore:x.away_score??x.score?.away??null}}).filter(Boolean) as Match[]}
export default function Home() {
 const [active,setActive]=useState("all"),[query,setQuery]=useState(""),[matches,setMatches]=useState<Match[]>([]),[loading,setLoading]=useState(true),[error,setError]=useState(""),[refresh,setRefresh]=useState(0),[favorites,setFavorites]=useState<string[]>([]),[onlyFavorites,setOnlyFavorites]=useState(false),[dayFilter,setDayFilter]=useState("all"),[selectedMatch,setSelectedMatch]=useState<Match|null>(null);
 useEffect(()=>{try{setFavorites(JSON.parse(localStorage.getItem("gv-favorites")||"[]"))}catch{setFavorites([])}},[]);
 function toggleFavorite(id:string){setFavorites(old=>{const next=old.includes(id)?old.filter(x=>x!==id):[...old,id];try{localStorage.setItem("gv-favorites",JSON.stringify(next))}catch{}return next})}
 useEffect(()=>{let stop=false;async function load(){setLoading(true);setError("");const selected=active==="all"?["football","basketball","tennis","cricket"]:[active];try{const results=await Promise.allSettled(selected.flatMap(s=>[0,1,2].map(async n=>{const u=new URL("https://sportscore.com/api/v1/fixtures/");u.searchParams.set("sport",s);u.searchParams.set("date",dateAt(n));u.searchParams.set("limit","100");const r=await fetch(u);if(!r.ok)throw Error("API");return normalize(await r.json(),s)})));const groups=results.filter(x=>x.status==="fulfilled").map(x=>(x as PromiseFulfilledResult<Match[]>).value);if(!stop){const map=new Map<string,Match>();groups.flat().forEach(m=>map.set(m.sport+":"+m.id,m));setMatches([...map.values()]);if(groups.length===0)setError("Não foi possível carregar os jogos. Tenta novamente mais tarde.");else if(results.some(x=>x.status==="rejected"))setError("Alguns jogos não carregaram. Os resultados disponíveis estão apresentados.")}}catch{if(!stop){setMatches([]);setError("Não foi possível carregar os jogos. Tenta novamente mais tarde.")}}finally{if(!stop)setLoading(false)}}load();return()=>{stop=true}},[active,refresh]);
 const filtered=useMemo(()=>matches.filter(m=>{const text=(m.home+" "+m.away+" "+m.sport+" "+m.league).toLowerCase().includes(query.trim().toLowerCase());const fav=!onlyFavorites||favorites.includes(m.sport+":"+m.id);let day=dayFilter==="all";if(dayFilter!=="all"&&m.time){const parsed=new Date(m.time);day=!Number.isNaN(parsed.getTime())&&parsed.toISOString().slice(0,10)===dateAt(Number(dayFilter));}return text&&fav&&day}),[matches,query,onlyFavorites,favorites,dayFilter]);

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#"><span className="brand-mark">GV</span><span>GoalVision <b>AI</b></span></a>
        <nav><a href="#modalidades">Modalidades</a><a href="#premium">Premium</a><a href="#como-funciona">Como funciona</a><a href="#sobre">Sobre</a></nav>
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
        <div className="filters" id="modalidades">{sports.map((s) => <button key={s.value} className={active === s.value ? "filter active" : "filter"} onClick={() => setActive(s.value)}>{s.label}</button>)}</div>
        <div className="search-wrap"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Pesquisar equipa ou modalidade..." /></div><div className="match-tools"><button className={onlyFavorites?"filter active":"filter"} onClick={()=>setOnlyFavorites(v=>!v)}>☆ Favoritos ({favorites.length})</button><button className="filter" onClick={()=>setRefresh(v=>v+1)} disabled={loading}>↻ Atualizar jogos</button></div><div className="day-filters"><button className={dayFilter==="all"?"filter active":"filter"} onClick={()=>setDayFilter("all")}>Todos os dias</button><button className={dayFilter==="0"?"filter active":"filter"} onClick={()=>setDayFilter("0")}>Hoje</button><button className={dayFilter==="1"?"filter active":"filter"} onClick={()=>setDayFilter("1")}>Amanhã</button><button className={dayFilter==="2"?"filter active":"filter"} onClick={()=>setDayFilter("2")}>Depois</button></div>
        <p className="notice">{loading?"A carregar jogos reais…":error||"Jogos fornecidos por SportScore."}</p><div className="match-grid">{filtered.map(m=><article className="match-card" key={m.sport+m.id}><div className="card-top"><span className="sport-label">{sports.find(s=>s.value===m.sport)?.label??m.sport}</span><span className="awaiting">{m.status}</span><button className="favorite-btn" title="Adicionar/remover favorito" onClick={()=>toggleFavorite(m.sport+":"+m.id)}>{favorites.includes(m.sport+":"+m.id)?"★":"☆"}</button></div><div className="league">{m.league}</div><div className="teams"><div><span className="mini-crest">{m.home[0]}</span><b>{m.home}</b></div><span className="vs">{m.homeScore!=null&&m.awayScore!=null?m.homeScore+" - "+m.awayScore:"VS"}</span><div><span className="mini-crest alt">{m.away[0]}</span><b>{m.away}</b></div></div><div className="card-bottom"><span>{m.time?new Date(m.time).toLocaleString("pt-PT"):"Data por confirmar"}</span><button className="detail-link" onClick={()=>setSelectedMatch(m)}>Ver detalhes ↗</button></div></article>)}</div>{!loading&&!error&&filtered.length===0&&<p className="empty">{query?"Não encontrámos jogos com esse nome.":"Não há jogos disponíveis para estes filtros."}</p>}<p className="notice">Powered by <a href="https://sportscore.com/" target="_blank" rel="noreferrer">SportScore</a>. As análises probabilísticas ainda não estão ligadas a um modelo estatístico.</p>
      </section>

      <section className="how section" id="como-funciona"><div className="eyebrow">SIMPLES E TRANSPARENTE</div><h2>Como funciona</h2><div className="steps"><div><span>01</span><h3>Escolhe o jogo</h3><p>Encontra o encontro e a modalidade que queres acompanhar.</p></div><div><span>02</span><h3>Consulta os dados</h3><p>Forma recente, desempenho, ausências e estatísticas relevantes.</p></div><div><span>03</span><h3>Compreende o cenário</h3><p>Probabilidades acompanhadas de explicações e fatores de risco.</p></div></div></section>


      <section className="section" id="premium">
        <div className="section-heading"><div><div className="eyebrow">GOALVISION AI PREMIUM</div><h2>Análises mais completas</h2><p>Uma experiência avançada para quem quer aprofundar a leitura de cada encontro.</p></div><span className="demo-pill">EM PREPARAÇÃO</span></div>
        <div className="steps">
          <div><span>01</span><h3>Mercados avançados</h3><p>Probabilidades de 1X2, ambas marcam, golos, cantos e cartões, sempre que existirem dados fiáveis.</p></div>
          <div><span>02</span><h3>Jogadores e momentos</h3><p>Possíveis marcadores, resultado exato e metade mais produtiva, com explicação dos fatores considerados.</p></div>
          <div><span>03</span><h3>Relatório aprofundado</h3><p>Forma recente, confrontos diretos, ausências, pontos fortes, riscos e nível de confiança.</p></div>
        </div>
        <p className="notice">O Premium está apresentado como pré-visualização. Pagamentos, desbloqueio de conta e ligação a fontes de dados ainda não estão ativos. Nenhuma previsão garante resultados.</p>
      </section>
      <section className="about section" id="sobre"><div><div className="eyebrow">A NOSSA VISÃO</div><h2>O desporto é mais do que um resultado.</h2></div><p>O GoalVision AI nasce para tornar a análise desportiva mais acessível, organizada e transparente. Queremos apoiar os adeptos com informação útil, sem promessas de resultados garantidos.</p></section>

      <footer><a className="brand" href="#"><span className="brand-mark">GV</span><span>GoalVision <b>AI</b></span></a><span>© 2026 GoalVision AI · Feito para quem vê além do jogo.</span><a href="#sobre">Sobre o projeto ↑</a></footer>
    </main>
  );
}