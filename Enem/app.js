/* =========================================================
   APP — interface do Corretor de Redação ENEM
   ========================================================= */
(() => {
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const lista = arr => (arr && arr.length ? arr.map(i => `<li>${esc(i)}</li>`).join("") : "<li>—</li>");

  const CHAVE_LS = "enem_corretor_chave", MODELO_LS = "enem_corretor_modelo", HIST_LS = "enem_corretor_historico", RASCUNHO_LS = "enem_corretor_rascunho";
  const ls = {
    get(k) { try { return localStorage.getItem(k); } catch (_) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (_) {} },
    del(k) { try { localStorage.removeItem(k); } catch (_) {} }
  };

  const CORES = { 1: "var(--c1)", 2: "var(--c2)", 3: "var(--c3)", 4: "var(--c4)", 5: "var(--c5)" };
  const DICAS = [
    "O recorte do tema é tão importante quanto o tema: \"desafios para…\" pede que você discuta desafios.",
    "Proposta nota 200 = ação + agente + modo/meio + finalidade + detalhamento.",
    "Repertório bom é legitimado, pertinente e produtivo. Citação decorada sem conexão com o argumento é \"repertório de bolso\".",
    "Comece cada parágrafo com um conectivo diferente para garantir a coesão interparágrafos.",
    "Desrespeitar os direitos humanos zera a Competência 5.",
    "Copiar os textos motivadores não conta como linha e derruba a Competência 2.",
    "Escreva entre 25 e 30 linhas: textos curtos costumam perder em aprofundamento (C3)."
  ];

  const EXEMPLO_TEMA = "A valorização do Sistema Único de Saúde (SUS) como direito universal";
  const EXEMPLO = `Na obra "Vidas Secas", de Graciliano Ramos, a família de Fabiano vive à margem da sociedade, sem acesso a serviços básicos. Fora da ficção, essa realidade ainda atinge milhões de brasileiros, o que evidencia a importância da valorização do Sistema Único de Saúde como direito universal. Nesse contexto, o subfinanciamento público e a desinformação da população são entraves que precisam ser superados.

Em primeiro lugar, cabe destacar a insuficiência de recursos destinados ao SUS. Segundo a Constituição Federal de 1988, a saúde é direito de todos e dever do Estado. Entretanto, os investimentos não acompanham a demanda, o que gera longas filas, falta de profissionais e precarização das unidades básicas. Dessa forma, o direito previsto na lei não se concretiza plenamente, sobretudo para as populações mais pobres, que dependem exclusivamente da rede pública.

Além disso, a desvalorização do sistema decorre da desinformação. Grande parte da população desconhece que vacinação, transplantes e vigilância sanitária são serviços do SUS. Consequentemente, muitos cidadãos enxergam o sistema apenas como sinônimo de atendimento precário, o que enfraquece sua defesa social e legitima cortes orçamentários, haja vista a baixa pressão popular por melhorias.

Portanto, é necessário que o Ministério da Saúde, órgão responsável pela gestão federal do sistema, amplie o financiamento da atenção básica, por meio da destinação de verbas específicas aprovadas pelo Congresso Nacional, a fim de reduzir filas e garantir atendimento digno. Ademais, a mídia deve veicular campanhas informativas sobre os serviços oferecidos pelo SUS, com o intuito de fortalecer a valorização do sistema. Assim, a realidade de Fabiano ficará restrita à ficção.`;

  /* ---------- Inicialização ---------- */
  const tema = $("#tema"), redacao = $("#redacao");
  $("#ano").textContent = new Date().getFullYear();
  $("#lista-temas").innerHTML = BASE_ENEM.temas.map(t => `<option value="${esc(t.tema)}">ENEM ${t.ano}</option>`).join("");
  $("#numeros").innerHTML = Array.from({ length: 30 }, (_, i) => `<li>${i + 1}</li>`).join("");
  let iDica = 0;
  const trocarDica = () => { $("#dica-rotativa").textContent = DICAS[iDica++ % DICAS.length]; };
  trocarDica(); setInterval(trocarDica, 9000);

  const rasc = JSON.parse(ls.get(RASCUNHO_LS) || "null");
  if (rasc) { tema.value = rasc.tema || ""; redacao.value = rasc.texto || ""; }

  /* ---------- Métricas ao vivo ---------- */
  function atualizarAoVivo() {
    const r = Analisador.analisar(redacao.value, tema.value);
    const m = r.metricas;
    $("#m-palavras").textContent = m.palavras;
    $("#m-paragrafos").textContent = m.paragrafos;
    $("#m-linhas").textContent = m.linhas;
    $("#m-conectivos").textContent = m.conectivosDistintos;
    const cont = $("#contador-linhas");
    cont.textContent = `~${m.linhas} / 30 linhas`;
    cont.classList.toggle("alerta", m.linhas > 30 || (m.linhas > 0 && m.linhas <= 7));
    const barra = $("#barra-linhas");
    barra.style.width = Math.min(100, (m.linhas / 30) * 100) + "%";
    barra.style.background = m.linhas > 30 || m.linhas <= 7 ? "var(--caneta)" : m.linhas < 20 ? "var(--ambar)" : "var(--verde)";
    $("#check-proposta").innerHTML = Object.entries(r.elementos).map(([k, v]) =>
      `<li class="${v.presente ? "ok" : ""}"><span class="marca-ck">✓</span>${esc(Analisador.NOMES_ELEMENTOS[k])}</li>`).join("");
    ls.set(RASCUNHO_LS, JSON.stringify({ tema: tema.value, texto: redacao.value }));
  }
  let tmr;
  [tema, redacao].forEach(el => el.addEventListener("input", () => { clearTimeout(tmr); tmr = setTimeout(atualizarAoVivo, 150); }));
  atualizarAoVivo();

  /* ---------- Configuração da IA ---------- */
  function atualizarStatusIA() {
    const tem = !!ls.get(CHAVE_LS);
    $("#status-ia").classList.toggle("ok", tem);
    $("#aviso-modo").innerHTML = tem
      ? `Correção completa por IA ativada (${esc(ls.get(MODELO_LS) || "claude-sonnet-5-5")}).`
      : `Modo pré-correção automática. Para a correção completa de professor, <a href="#" id="link-config">configure a IA</a>.`;
    const l = $("#link-config"); if (l) l.onclick = e => { e.preventDefault(); abrirConfig(); };
  }
  function abrirConfig() {
    $("#chave").value = ls.get(CHAVE_LS) || "";
    $("#modelo").value = ls.get(MODELO_LS) || "claude-sonnet-5-5";
    $("#painel-config").showModal();
  }
  $("#btn-config").onclick = abrirConfig;
  $("#btn-salvar-chave").onclick = () => {
    const v = $("#chave").value.trim();
    if (v) ls.set(CHAVE_LS, v); else ls.del(CHAVE_LS);
    ls.set(MODELO_LS, $("#modelo").value);
    $("#painel-config").close(); atualizarStatusIA();
  };
  $("#btn-apagar-chave").onclick = () => { ls.del(CHAVE_LS); $("#chave").value = ""; atualizarStatusIA(); };
  atualizarStatusIA();

  /* ---------- Painéis ---------- */
  document.querySelectorAll("[data-abrir]").forEach(b => b.onclick = () => {
    const id = b.dataset.abrir;
    if (id === "painel-historico") renderHistorico();
    $("#" + id).showModal();
  });
  document.querySelectorAll("[data-fechar]").forEach(b => b.onclick = () => b.closest("dialog").close());
  document.querySelectorAll("dialog").forEach(d => d.addEventListener("click", e => { if (e.target === d) d.close(); }));

  $("#conteudo-base").innerHTML = `
    <p>${esc(BASE_ENEM.versao)}. Antes de corrigir, o corretor carrega estes temas, regras e padrões.</p>
    <h3>Os 10 últimos temas</h3>
    <ul class="linha-tempo">${BASE_ENEM.temas.map(t => `<li><b>${t.ano}</b>${esc(t.tema)}<small>${esc(t.eixo)}</small></li>`).join("")}</ul>
    <h3>Padrões identificados</h3>
    <ul>${lista(BASE_ENEM.padroes)}</ul>
    <h3>O que zera a redação</h3>
    <ul>${lista(BASE_ENEM.zeros)}</ul>
    <h3>As 5 competências</h3>
    ${BASE_ENEM.competencias.map(c => `<p><b>C${c.id} · ${esc(c.nome)}</b> — ${esc(c.titulo)}.<br><small>Nível 200: ${esc(c.niveis[200])}</small></p>`).join("")}`;

  /* ---------- Botões ---------- */
  $("#btn-exemplo").onclick = () => { tema.value = EXEMPLO_TEMA; redacao.value = EXEMPLO; atualizarAoVivo(); };
  $("#btn-limpar").onclick = () => { if (!redacao.value || confirmarLimpar()) { redacao.value = ""; tema.value = ""; atualizarAoVivo(); $("#resultado").hidden = true; } };
  function confirmarLimpar() { return window.confirm("Apagar o texto da folha?"); }

  $("#btn-corrigir").onclick = async () => {
    const texto = redacao.value.trim();
    if (!texto) { redacao.focus(); return; }
    const local = Analisador.analisar(texto, tema.value);
    const chave = ls.get(CHAVE_LS);
    const res = $("#resultado"), load = $("#carregando"), cont = $("#conteudo-resultado");
    res.hidden = false; cont.innerHTML = "";
    res.scrollIntoView({ behavior: "smooth" });

    if (!chave) { renderResultado(local, local); salvarHistorico(local); return; }

    load.hidden = false; $("#btn-corrigir").disabled = true;
    try {
      const ia = await CorretorIA.corrigir({ chave, modelo: ls.get(MODELO_LS) || "claude-sonnet-5-5", tema: tema.value.trim(), texto, metricasLocais: local.metricas });
      renderResultado(ia, local); salvarHistorico(ia);
    } catch (err) {
      cont.innerHTML = `<div class="bloco fraco"><h3>Não foi possível corrigir com a IA</h3><p>${esc(err.message)}</p><p>Mostrando a pré-correção automática abaixo.</p></div>`;
      const div = document.createElement("div"); cont.appendChild(div);
      renderResultado(local, local, div);
    } finally {
      load.hidden = true; $("#btn-corrigir").disabled = false;
    }
  };

  /* ---------- Renderização ---------- */
  function circulo(total) {
    const r = 96, c = 2 * Math.PI * r, frac = total / 1000;
    return `<div class="nota-circulo">
      <svg width="220" height="220"><circle cx="110" cy="110" r="${r}" stroke="rgba(255,255,255,.15)" stroke-width="14" fill="none"/>
      <circle cx="110" cy="110" r="${r}" stroke="${total >= 800 ? "#4ade80" : total >= 600 ? "#fbbf24" : "#f87171"}" stroke-width="14" fill="none" stroke-linecap="round"
        stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - frac)}" style="transition:stroke-dashoffset 1s"/></svg>
      <div class="valor"><div><strong>${total}</strong><small>de 1000</small></div></div></div>`;
  }

  function rotuloNota(t) {
    if (t >= 960) return "Excelente — nível nota mil";
    if (t >= 840) return "Muito bom — redação competitiva";
    if (t >= 720) return "Bom — acima da média nacional";
    if (t >= 560) return "Mediano — dá para subir bastante";
    if (t > 0) return "Precisa de atenção";
    return "Redação zerada";
  }

  function renderResultado(r, local, alvo) {
    const cont = alvo || $("#conteudo-resultado");
    const ehIA = r.origem === "ia";
    const faixa = ehIA ? r.faixa : { min: Math.max(0, r.total - 120), max: Math.min(1000, r.total + 80) };
    const justif = ehIA ? r.justificativas : justificativasLocais(r);
    const alertas = local.alertas || [];

    const comps = BASE_ENEM.competencias.map(c => {
      const n = r.notas[c.id];
      return `<div class="comp" style="--cor:${CORES[c.id]}">
        <div class="num">Competência ${c.id}</div>
        <h4>${esc(c.nome)}</h4>
        <div class="pts">${n}<small> /200</small></div>
        <div class="niveis">${[40, 80, 120, 160, 200].map(v => `<span class="${n >= v ? "on" : ""}"></span>`).join("")}</div>
        <p>${esc(justif[c.id] || c.niveis[n])}</p>
      </div>`;
    }).join("");

    const desvios = (r.desvios || []).length ? `
      <div class="bloco"><h3>Correções no texto</h3>
      <table><thead><tr><th>Trecho</th><th>Correção</th><th>Por quê</th><th>C</th></tr></thead><tbody>
      ${r.desvios.map(d => `<tr><td class="riscado">${esc(d.trecho)}</td><td class="corrigido">${esc(d.correcao)}</td><td>${esc(d.explicacao)}</td><td><span class="tag">C${esc(d.competencia)}</span></td></tr>`).join("")}
      </tbody></table></div>` : "";

    const el = r.elementos || {};
    const proposta = `<div class="bloco"><h3>Proposta de intervenção</h3><div class="elementos">
      ${["acao", "agente", "modo", "finalidade", "detalhamento"].map(k => {
        const e = el[k] || {};
        return `<div class="elem ${e.presente ? "ok" : ""}"><b>${e.presente ? "✓" : "✗"} ${esc(Analisador.NOMES_ELEMENTOS[k])}</b><span>${esc(e.trecho || (e.presente ? "" : "Não identificado"))}</span></div>`;
      }).join("")}</div>
      ${ehIA && el.respeita_direitos_humanos === false ? `<p class="zerada">A proposta desrespeita os direitos humanos: Competência 5 zerada.</p>` : ""}</div>`;

    const repertorio = ehIA && (r.repertorio || []).length ? `<div class="bloco"><h3>Repertório sociocultural</h3>
      <table><thead><tr><th>Referência</th><th>Avaliação</th><th>Comentário</th></tr></thead><tbody>
      ${r.repertorio.map(x => `<tr><td><b>${esc(x.referencia)}</b></td><td><span class="tag">${esc(x.classificacao)}</span></td><td>${esc(x.comentario)}</td></tr>`).join("")}
      </tbody></table></div>` : "";

    const reescrita = ehIA && r.reescrita ? `<div class="bloco"><h3>Como ficaria melhor</h3>
      <div class="reescrita"><div class="antes"><h5>Seu trecho</h5>${esc(r.reescrita.trecho_original)}</div>
      <div class="depois"><h5>Versão nível 200</h5>${esc(r.reescrita.versao_melhorada)}</div></div>
      <p class="nota-pequena">${esc(r.reescrita.por_que)}</p></div>` : "";

    const ctaIA = !ehIA ? `<div class="bloco cta-ia"><h3>Quer a correção completa de professor?</h3>
      <p>Esta é a pré-correção automática: ela mede estrutura, conectivos, desvios comuns e a proposta, mas não lê o texto como um avaliador. Com a IA ativada você recebe nota justificada por competência, análise do repertório, correção de cada desvio e uma reescrita do seu trecho mais fraco.</p>
      <button class="btn-primario" id="cta-config">Ativar correção por IA</button></div>` : "";

    cont.innerHTML = `
      <div class="placar">
        ${circulo(r.total)}
        <div>
          <span class="selo-origem">${ehIA ? "Correção por IA · " + esc(r.modelo) : "Pré-correção automática (estimativa)"}</span>
          <h2>${rotuloNota(r.total)}</h2>
          <p class="faixa">Se fosse o ENEM real: provavelmente entre <b>${faixa.min}</b> e <b>${faixa.max}</b> pontos.</p>
          ${r.zero?.anulada ? `<div class="zerada">Redação anulada: ${esc(r.zero.motivo)}</div>` : ""}
          ${alertas.length ? `<ul class="alertas">${lista(alertas)}</ul>` : ""}
        </div>
      </div>
      <div class="grade-comp">${comps}</div>
      ${ehIA && r.parecer ? `<div class="bloco"><h3>Parecer do professor</h3><p class="parecer">${esc(r.parecer)}</p></div>` : ""}
      <div class="tres">
        <div class="bloco forte"><h3>Pontos fortes</h3><ul>${lista(r.pontos_fortes)}</ul></div>
        <div class="bloco fraco"><h3>Pontos fracos</h3><ul>${lista(r.pontos_fracos)}</ul></div>
        <div class="bloco melhora"><h3>O que melhorar</h3><ol>${lista(r.como_melhorar)}</ol></div>
      </div>
      ${proposta}${repertorio}${desvios}${reescrita}${ctaIA}
      <div class="acoes-res">
        <button class="btn-secundario" onclick="window.print()">Imprimir / salvar PDF</button>
        <button class="btn-secundario" onclick="document.querySelector('#redacao').focus();window.scrollTo({top:0,behavior:'smooth'})">Reescrever e corrigir de novo</button>
      </div>`;
    const cta = cont.querySelector("#cta-config"); if (cta) cta.onclick = abrirConfig;
  }

  function justificativasLocais(r) {
    const m = r.metricas;
    return {
      1: `${r.desvios.length} possível(is) desvio(s) detectado(s) automaticamente.`,
      2: m.coberturaTema === null ? `Tema não informado. ${m.indicadoresRepertorio} indício(s) de repertório.` : `${Math.round(m.coberturaTema * 100)}% das palavras-chave do tema presentes; ${m.indicadoresRepertorio} indício(s) de repertório.`,
      3: `${m.paragrafos} parágrafo(s). Autoria e aprofundamento só são avaliados pela IA (teto de 160 nesta estimativa).`,
      4: `${m.conectivosDistintos} conectivo(s) diferente(s) encontrado(s).`,
      5: `${Object.values(r.elementos).filter(e => e.presente).length} de 5 elementos identificados na conclusão.`
    };
  }

  /* ---------- Histórico ---------- */
  function salvarHistorico(r) {
    const h = JSON.parse(ls.get(HIST_LS) || "[]");
    h.unshift({ data: new Date().toISOString(), tema: tema.value.trim() || "(tema não informado)", total: r.total, notas: r.notas, origem: r.origem, texto: redacao.value });
    ls.set(HIST_LS, JSON.stringify(h.slice(0, 20)));
  }
  function renderHistorico() {
    const h = JSON.parse(ls.get(HIST_LS) || "[]");
    const c = $("#conteudo-historico");
    if (!h.length) { c.innerHTML = "<p>Nenhuma correção ainda. Suas correções ficam salvas neste navegador.</p>"; return; }
    c.innerHTML = h.map((x, i) => `<div class="hist-item"><div><p>${new Date(x.data).toLocaleString("pt-BR")} · ${x.origem === "ia" ? "IA" : "automática"}</p>
      <b>${esc(x.tema)}</b><p>C1 ${x.notas[1]} · C2 ${x.notas[2]} · C3 ${x.notas[3]} · C4 ${x.notas[4]} · C5 ${x.notas[5]}</p></div>
      <div style="text-align:right"><strong>${x.total}</strong><br><button class="btn-link" data-carregar="${i}">Abrir texto</button></div></div>`).join("")
      + `<button class="btn-secundario" id="limpar-hist">Apagar histórico</button>`;
    c.querySelectorAll("[data-carregar]").forEach(b => b.onclick = () => {
      const x = h[+b.dataset.carregar]; tema.value = x.tema.startsWith("(") ? "" : x.tema; redacao.value = x.texto; atualizarAoVivo();
      $("#painel-historico").close(); window.scrollTo({ top: 0, behavior: "smooth" });
    });
    $("#limpar-hist").onclick = () => { ls.del(HIST_LS); renderHistorico(); };
  }
})();
