/* =========================================================
   ANALISADOR LOCAL — pré-correção automática (sem IA)
   Heurísticas baseadas na matriz do ENEM. Funciona offline.
   ========================================================= */

const Analisador = (() => {
  const CARACTERES_POR_LINHA = 68; // média aproximada de uma linha manuscrita da folha oficial

  const CONECTIVOS = [
    "além disso", "ademais", "outrossim", "sobretudo", "também", "inclusive",
    "não só", "mas também", "bem como",
    "entretanto", "contudo", "todavia", "no entanto", "porém", "mas", "embora", "apesar de", "ainda que", "conquanto", "não obstante",
    "portanto", "logo", "assim", "dessa forma", "desse modo", "dessa maneira", "por conseguinte", "consequentemente", "em suma", "por fim", "diante disso", "nesse sentido", "nesse contexto", "sendo assim",
    "porque", "pois", "visto que", "uma vez que", "já que", "haja vista", "dado que", "posto que", "em virtude de", "devido a", "em razão de",
    "a fim de", "para que", "com o intuito de", "com o objetivo de", "com a finalidade de",
    "primeiramente", "em primeiro lugar", "em segundo lugar", "em segunda análise", "em primeira análise", "por outro lado", "paralelamente", "em contrapartida",
    "isto é", "ou seja", "por exemplo", "como", "conforme", "segundo", "de acordo com"
  ];

  const AGENTES = ["governo", "estado", "ministério", "ministerio", "poder público", "poder executivo", "poder legislativo", "congresso", "prefeitura", "prefeituras", "secretaria", "secretarias", "escola", "escolas", "instituições de ensino", "mídia", "mídias", "imprensa", "ong", "ongs", "organizações não governamentais", "sociedade civil", "família", "famílias", "empresas", "iniciativa privada", "sus", "inep", "mec", "ibge", "cnj", "cartórios", "universidades", "conselho", "anvisa", "senado", "câmara", "estado brasileiro", "união", "municípios"];
  const MODOS = ["por meio de", "por meio da", "por meio do", "mediante", "através de", "através da", "através do", "por intermédio", "via ", "com o auxílio", "com o apoio", "a partir de", "valendo-se de", "utilizando"];
  const FINALIDADES = ["a fim de", "afim de", "para que", "com o objetivo de", "com o intuito de", "com a finalidade de", "visando", "objetivando", "com vistas a", "de modo a", "de forma a", "para garantir", "para assegurar", "para combater", "para reduzir", "para promover", "para mitigar"];
  const ACOES = ["deve", "devem", "deverá", "deverão", "cabe", "compete", "é necessário", "é preciso", "é fundamental", "é imprescindível", "urge", "faz-se necessário", "torna-se necessário", "criar", "promover", "implementar", "ampliar", "investir", "fiscalizar", "desenvolver", "elaborar", "realizar", "garantir", "fomentar", "estabelecer", "capacitar", "veicular", "intensificar"];
  const DETALHAMENTO = ["isto é", "ou seja", "como ", "tais como", "a exemplo de", "por exemplo", "de modo que", "o qual", "a qual", "os quais", "as quais", "que ", "(", "–", "—"];

  const REPERTORIO = ["segundo", "de acordo com", "conforme", "para o filósofo", "para a filósofa", "o sociólogo", "a socióloga", "o pensador", "a pensadora", "a constituição", "constituição federal", "carta magna", "artigo", "lei ", "estatuto", "declaração universal", "ibge", "oms", "onu", "unesco", "pesquisa", "dados", "estudo", "filme", "série", "livro", "obra", "romance", "música", "canção", "século", "historicamente", "na idade média", "revolução", "durante o período"];

  const ERROS_COMUNS = [
    { re: /\ba nível de\b/gi, sug: "em nível de / no âmbito de", exp: "\"A nível de\" é considerado inadequado na norma-padrão." },
    { re: /\bconcerteza\b/gi, sug: "com certeza", exp: "Grafia: são duas palavras." },
    { re: /\bderrepente\b/gi, sug: "de repente", exp: "Grafia: são duas palavras." },
    { re: /\bporisso\b/gi, sug: "por isso", exp: "Grafia: são duas palavras." },
    { re: /\bafim de\b/gi, sug: "a fim de", exp: "Para indicar finalidade, escreve-se \"a fim de\" (separado)." },
    { re: /\bhouveram\b/gi, sug: "houve", exp: "\"Haver\" no sentido de existir é impessoal: fica no singular." },
    { re: /\bfazem (\d+|dois|três|muitos|vários) anos\b/gi, sug: "faz … anos", exp: "\"Fazer\" indicando tempo decorrido é impessoal." },
    { re: /\bmenas\b/gi, sug: "menos", exp: "\"Menos\" é invariável." },
    { re: /\bpara mim (fazer|ler|escrever|entender|estudar|ir|ver)\b/gi, sug: "para eu …", exp: "Antes de verbo no infinitivo, usa-se o pronome reto \"eu\"." },
    { re: /\bsej?e\b/gi, sug: "seja", exp: "Forma correta do subjuntivo: \"seja\"." },
    { re: /\besteje\b/gi, sug: "esteja", exp: "Forma correta do subjuntivo: \"esteja\"." },
    { re: /\batravez\b/gi, sug: "através", exp: "Grafia correta: \"através\"." },
    { re: /\bexcessão(?![A-Za-zÀ-ú])/gi, sug: "exceção", exp: "Grafia correta: \"exceção\"." },
    { re: /\bprevilégio/gi, sug: "privilégio", exp: "Grafia correta: \"privilégio\"." },
    { re: /\bimpecilho/gi, sug: "empecilho", exp: "Grafia correta: \"empecilho\"." },
    { re: /\bbeneficiente\b/gi, sug: "beneficente", exp: "Grafia correta: \"beneficente\"." },
    { re: /\bmendingo/gi, sug: "mendigo", exp: "Grafia correta: \"mendigo\"." },
    { re: /(?<![A-Za-zÀ-ú])à (fazer|ser|ter|estudar|garantir|combater|promover|criar|realizar|partir)\b/gi, sug: "a + verbo (sem crase)", exp: "Não ocorre crase antes de verbo." },
    { re: /(?<![A-Za-zÀ-ú])à (ele|eles|este|esse|isso|isto|todos|todo|cada|um|uns)\b/gi, sug: "a (sem crase)", exp: "Não ocorre crase antes de palavras masculinas, pronomes desse tipo ou artigo indefinido." },
    { re: /\bpra\b/gi, sug: "para", exp: "Registro informal; use \"para\"." },
    { re: /\bpro\b/gi, sug: "para o", exp: "Registro informal; use \"para o\"." },
    { re: /(?<![A-Za-zÀ-ú])tá(?![A-Za-zÀ-ú])/gi, sug: "está", exp: "Registro informal." },
    { re: /(?<![A-Za-zÀ-ú])né(?![A-Za-zÀ-ú])/gi, sug: "(remover)", exp: "Marca de oralidade." },
    { re: /\btipo assim\b/gi, sug: "(remover)", exp: "Marca de oralidade." },
    { re: /\ba gente\b/gi, sug: "nós / a sociedade", exp: "Registro informal; prefira \"nós\" ou um sujeito específico." },
    { re: /\bagente (vai|vê|tem|sabe|precisa|pode)\b/gi, sug: "a gente → nós", exp: "\"Agente\" (substantivo) difere de \"a gente\" — e ambos devem ser evitados nesse uso." },
    { re: /\bvc\b|\bvcs\b|\bq\b|\btb\b|\bpq\b/gi, sug: "escrever por extenso", exp: "Abreviações não são aceitas." },
    { re: /\bmais (eu|ele|ela|nós) (não|nunca)\b/gi, sug: "mas", exp: "Ideia de oposição: \"mas\" (conjunção), não \"mais\"." },
    { re: /\bbrasil\b/g, sug: "Brasil", exp: "Nome próprio com inicial maiúscula." },
    { re: /\s+,/g, sug: ",", exp: "Não há espaço antes da vírgula." },
    { re: /[,.;:!?](?=[A-Za-zÀ-ú])/g, sug: "pontuação + espaço", exp: "Falta espaço depois do sinal de pontuação." },
    { re: /\betc\.\.\./gi, sug: "etc.", exp: "Não se usa reticências após \"etc.\"." },
    { re: /\b(\w{3,}) \1\b/gi, sug: "remover repetição", exp: "Palavra repetida em sequência." }
  ];

  const STOP = new Set("a o as os de da do das dos e é em no na nos nas um uma uns umas para por com sem que se ao à às aos como mais mas ou sua seu suas seus pela pelo pelas pelos ser são está estão foi não sobre entre acerca desafios brasil brasileira brasileiro sociedade".split(" "));

  const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const radical = w => norm(w).replace(/(ções|ção|mente|idade|idades|ismo|ista|istas|ância|ência|ados|adas|ado|ada|ar|er|ir|os|as|es|s)$/, "").slice(0, 7);

  function contar(texto, lista) {
    const t = " " + texto.toLowerCase() + " ";
    const achados = [];
    lista.forEach(item => {
      const re = new RegExp("(^|[^a-zà-ú])" + item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").trim() + "(?=[^a-zà-ú]|$)", "gi");
      const m = t.match(re);
      if (m) achados.push({ item: item.trim(), vezes: m.length });
    });
    return achados;
  }

  function paragrafosDe(texto) {
    return texto.split(/\n\s*\n|\n/).map(p => p.trim()).filter(p => p.length > 0);
  }

  function frasesDe(texto) {
    return texto.split(/(?<=[.!?])\s+/).map(f => f.trim()).filter(Boolean);
  }

  function estimarLinhas(paragrafos) {
    return paragrafos.reduce((acc, p) => acc + Math.max(1, Math.ceil((p.length + 6) / CARACTERES_POR_LINHA)), 0);
  }

  function arred40(v) {
    return Math.max(0, Math.min(200, Math.round(v / 40) * 40));
  }

  function analisar(texto, tema = "") {
    texto = (texto || "").replace(/\r/g, "").trim();
    const paragrafos = paragrafosDe(texto);
    const palavras = texto ? texto.split(/\s+/).filter(Boolean) : [];
    const frases = frasesDe(texto);
    const linhas = estimarLinhas(paragrafos);
    const alertas = [];
    const zero = { anulada: false, motivo: null };

    if (!texto) { zero.anulada = true; zero.motivo = "Texto em branco."; }
    else if (linhas <= 7) { zero.anulada = true; zero.motivo = `Texto insuficiente: cerca de ${linhas} linhas estimadas (mínimo de 8).`; }
    if (linhas > 30) alertas.push(`O texto ocupa cerca de ${linhas} linhas manuscritas — a folha oficial tem 30. Linhas além disso são desconsideradas.`);
    if (paragrafos.length < 4 && texto) alertas.push(`Foram identificados ${paragrafos.length} parágrafo(s). O padrão mais seguro é 4 (introdução, 2 desenvolvimentos e conclusão).`);

    // ---- C1: desvios
    const desvios = [];
    ERROS_COMUNS.forEach(e => {
      const re = new RegExp(e.re.source, e.re.flags);
      let m;
      while ((m = re.exec(texto)) !== null) {
        desvios.push({ trecho: m[0].trim() || m[0], correcao: e.sug, explicacao: e.exp, competencia: 1 });
        if (desvios.length > 40) break;
      }
    });
    // início de frase em minúscula
    frases.forEach(f => {
      if (/^[a-zà-ú]/.test(f)) desvios.push({ trecho: f.slice(0, 30) + "…", correcao: "Iniciar com maiúscula", explicacao: "Toda frase começa com letra maiúscula.", competencia: 1 });
    });
    const frasesLongas = frases.filter(f => f.split(/\s+/).length > 55);
    frasesLongas.forEach(f => desvios.push({ trecho: f.slice(0, 50) + "…", correcao: "Dividir o período", explicacao: `Período com ${f.split(/\s+/).length} palavras: risco de truncamento e problemas de pontuação.`, competencia: 1 }));

    const nDesvios = desvios.length;
    let c1 = nDesvios === 0 ? 200 : nDesvios <= 2 ? 160 : nDesvios <= 5 ? 120 : nDesvios <= 9 ? 80 : 40;
    if (palavras.length < 120) c1 = Math.min(c1, 120);

    // ---- C2: tema e repertório
    const palavrasTema = tema ? norm(tema).split(/[^a-z0-9]+/).filter(w => w.length > 3 && !STOP.has(w)) : [];
    const radicaisTexto = new Set(palavras.map(radical));
    const presentes = palavrasTema.filter(w => radicaisTexto.has(radical(w)));
    const coberturaTema = palavrasTema.length ? presentes.length / palavrasTema.length : null;
    const repertorio = contar(texto, REPERTORIO);
    const aspas = (texto.match(/[“"«][^”"»]{3,}[”"»]/g) || []).length;
    const nomesProprios = (texto.match(/(?<![.!?]\s)(?<!^)\b[A-ZÁÉÍÓÚÂÊÔÃÕ][a-záéíóúâêôãõç]+(?:\s(?:de|da|do)?\s?[A-ZÁÉÍÓÚÂÊÔÃÕ][a-záéíóúâêôãõç]+)+/g) || []).length;
    const indRepertorio = repertorio.length + aspas + Math.min(nomesProprios, 4);

    let c2 = 120;
    if (indRepertorio >= 6) c2 = 200; else if (indRepertorio >= 3) c2 = 160; else if (indRepertorio >= 1) c2 = 120; else c2 = 80;
    if (paragrafos.length < 3) c2 = Math.min(c2, 80);
    if (coberturaTema !== null) {
      if (coberturaTema < 0.2) { c2 = Math.min(c2, 40); alertas.push("Poucas palavras-chave do tema aparecem no texto: risco de tangenciamento ou fuga ao tema."); }
      else if (coberturaTema < 0.5) { c2 = Math.min(c2, 120); alertas.push(`O recorte do tema está pouco explícito (palavras-chave ausentes: ${palavrasTema.filter(w => !presentes.includes(w)).join(", ")}).`); }
    }

    // ---- C4: coesão
    const conectivos = contar(texto, CONECTIVOS);
    const variedade = conectivos.length;
    const inicioParagrafos = paragrafos.slice(1).filter(p => CONECTIVOS.some(c => norm(p).startsWith(norm(c)))).length;
    let c4 = variedade >= 12 ? 200 : variedade >= 9 ? 160 : variedade >= 6 ? 120 : variedade >= 3 ? 80 : 40;
    if (paragrafos.length > 1 && inicioParagrafos < paragrafos.length - 1) c4 = Math.min(c4, 160);
    const repetidos = conectivos.filter(c => c.vezes >= 3 && !["como", "que", "mas", "também"].includes(c.item));
    if (repetidos.length) { c4 = Math.max(40, c4 - 40); alertas.push(`Conectivo(s) repetido(s) em excesso: ${repetidos.map(r => `"${r.item}" (${r.vezes}x)`).join(", ")}.`); }

    // ---- C5: proposta de intervenção (último parágrafo, com apoio do penúltimo)
    const conclusao = (paragrafos[paragrafos.length - 1] || "");
    const lower = conclusao.toLowerCase();
    const temItem = (lista) => lista.find(i => lower.includes(i));
    const elementos = {
      acao: { presente: !!temItem(ACOES), trecho: temItem(ACOES) || "" },
      agente: { presente: !!temItem(AGENTES), trecho: temItem(AGENTES) || "" },
      modo: { presente: !!temItem(MODOS), trecho: temItem(MODOS) || "" },
      finalidade: { presente: !!temItem(FINALIDADES), trecho: temItem(FINALIDADES) || "" },
      detalhamento: { presente: false, trecho: "" }
    };
    const virgulas = (conclusao.match(/,/g) || []).length;
    if (conclusao.split(/\s+/).length > 60 && virgulas >= 4 && DETALHAMENTO.some(d => lower.includes(d))) {
      elementos.detalhamento = { presente: true, trecho: "proposta extensa com aposto/explicação" };
    }
    const nElem = Object.values(elementos).filter(e => e.presente).length;
    const c5 = [0, 40, 80, 120, 160, 200][nElem];

    // ---- C3: projeto de texto
    const temTese = paragrafos[0] && /(\bé\b|\bdeve\b|\bpois\b|\bdevido\b|\bem razão\b|\bporque\b|\bnecessári|\bproblema|\bentrave|\bobstácul|\bdesafio|\bcausa)/i.test(paragrafos[0]);
    const tamanhos = paragrafos.map(p => p.split(/\s+/).length);
    const desenvolvimentos = paragrafos.slice(1, -1);
    const desenvolvimentoBom = desenvolvimentos.length >= 2 && desenvolvimentos.every(p => p.split(/\s+/).length >= 50);
    let c3 = 120;
    if (temTese && desenvolvimentoBom && indRepertorio >= 3) c3 = 160;
    if (temTese && desenvolvimentoBom && indRepertorio >= 5 && variedade >= 9) c3 = 200;
    if (!temTese) c3 = Math.min(c3, 120);
    if (paragrafos.length < 3) c3 = Math.min(c3, 80);
    if (coberturaTema !== null && coberturaTema < 0.2) c3 = Math.min(c3, 40);

    // Sem leitura humana/IA não dá para confirmar repertório produtivo nem autoria: teto de 160 em C2 e C3.
    c2 = Math.min(c2, 160); c3 = Math.min(c3, 160);
    const notas = { 1: arred40(c1), 2: arred40(c2), 3: arred40(c3), 4: arred40(c4), 5: arred40(c5) };
    let total = Object.values(notas).reduce((a, b) => a + b, 0);
    if (zero.anulada) { total = 0; Object.keys(notas).forEach(k => notas[k] = 0); }

    // ---- pontos fortes / fracos automáticos
    const fortes = [], fracos = [], melhorar = [];
    if (paragrafos.length === 4) fortes.push("Estrutura clássica em 4 parágrafos (introdução, dois desenvolvimentos e conclusão).");
    if (variedade >= 9) fortes.push(`Boa variedade de conectivos (${variedade} diferentes).`);
    if (indRepertorio >= 3) fortes.push("Presença de repertório sociocultural (citações, dados, leis ou referências).");
    if (nElem >= 4) fortes.push(`Proposta de intervenção com ${nElem} dos 5 elementos exigidos.`);
    if (nDesvios <= 2 && texto) fortes.push("Poucos desvios de norma-padrão detectados automaticamente.");

    if (nDesvios > 2) fracos.push(`${nDesvios} possíveis desvios de norma-padrão detectados.`);
    if (variedade < 6) fracos.push("Repertório de conectivos limitado.");
    if (indRepertorio < 2) fracos.push("Pouco ou nenhum repertório sociocultural identificável.");
    if (nElem < 5) fracos.push(`Proposta de intervenção incompleta: faltam ${Object.entries(elementos).filter(([, v]) => !v.presente).map(([k]) => NOMES_ELEMENTOS[k]).join(", ")}.`);
    if (!temTese) fracos.push("A tese não está evidente na introdução.");

    if (!elementos.agente.presente) melhorar.push("Nomeie o agente específico (ex.: \"o Ministério da Saúde\", não apenas \"o governo\").");
    if (!elementos.modo.presente) melhorar.push("Indique o meio/modo: \"por meio de…\", \"mediante…\".");
    if (!elementos.finalidade.presente) melhorar.push("Explique a finalidade: \"a fim de…\", \"com o objetivo de…\".");
    if (!elementos.detalhamento.presente) melhorar.push("Detalhe um dos elementos com aposto ou explicação (\"isto é…\", \"como…\").");
    if (variedade < 9) melhorar.push("Abra cada parágrafo com um conectivo diferente e varie os conectivos internos.");
    if (indRepertorio < 3) melhorar.push("Use ao menos um repertório legitimado por desenvolvimento e explique como ele prova seu argumento.");
    if (nDesvios > 2) melhorar.push("Revise concordância, crase e pontuação antes de entregar.");

    return {
      origem: "local",
      metricas: { palavras: palavras.length, caracteres: texto.length, paragrafos: paragrafos.length, frases: frases.length, linhas, conectivosDistintos: variedade, indicadoresRepertorio: indRepertorio, coberturaTema },
      zero, alertas, notas, total, desvios: desvios.slice(0, 30), elementos,
      conectivos, repertorio, pontos_fortes: fortes, pontos_fracos: fracos, como_melhorar: melhorar
    };
  }

  const NOMES_ELEMENTOS = { acao: "ação", agente: "agente", modo: "modo/meio", finalidade: "finalidade", detalhamento: "detalhamento" };

  return { analisar, estimarLinhas, paragrafosDe, NOMES_ELEMENTOS };
})();

if (typeof module !== "undefined") module.exports = Analisador;
