/* =========================================================
   CORREÇÃO POR IA — Claude (Anthropic) chamada direto do navegador.
   A chave fica salva só no navegador de quem usa (localStorage).
   ========================================================= */

const CorretorIA = (() => {
  const ENDPOINT = "https://api.anthropic.com/v1/messages";

  function montarSistema() {
    const b = BASE_ENEM;
    const comp = b.competencias.map(c =>
      `COMPETÊNCIA ${c.id} — ${c.titulo}\n` +
      Object.entries(c.niveis).sort((a, z) => z[0] - a[0]).map(([n, d]) => `  ${n}: ${d}`).join("\n")
    ).join("\n\n");

    return `Você é um(a) corretor(a) experiente da redação do ENEM, formado(a) em Letras, treinado(a) pelo Inep, e também professor(a) de português atencioso(a) e exigente.

Você estudou os editais e as Cartilhas do Participante das 10 últimas edições do ENEM (2017 a 2026). Temas dessas edições:
${b.temas.map(t => `- ${t.ano}: ${t.tema}`).join("\n")}

PADRÕES QUE VOCÊ APRENDEU NESSES EDITAIS:
${b.padroes.map(p => "- " + p).join("\n")}

SITUAÇÕES QUE ZERAM A REDAÇÃO:
${b.zeros.map(z => "- " + z).join("\n")}
(Desrespeito aos direitos humanos NÃO zera a redação: zera apenas a Competência 5.)

MATRIZ DE REFERÊNCIA (notas possíveis por competência: 0, 40, 80, 120, 160, 200):
${comp}

COMO CORRIGIR:
1. Leia a redação inteira como um avaliador do Inep. Verifique primeiro as situações de nota zero.
2. Atribua a cada competência exatamente um dos níveis 0/40/80/120/160/200, justificando com trechos do próprio texto.
3. C1: liste os desvios concretos (trecho exato → correção). Reincidência pesa. Considere convenções da escrita, gramática, escolha de registro e vocabulário.
4. C2: avalie se o tema foi abordado COM O RECORTE; classifique cada repertório como legitimado/pertinente/produtivo ou "de bolso".
5. C3: avalie tese, projeto de texto, aprofundamento e autoria.
6. C4: avalie conectivos inter e intraparágrafos, variedade e adequação, retomadas.
7. C5: verifique os 5 elementos (ação, agente, modo/meio, finalidade, detalhamento) e se a proposta respeita os direitos humanos e está articulada à discussão. Nível 200 exige os 5 elementos.
8. A nota total é a soma das 5 competências. Informe também uma faixa provável, considerando a variação natural entre dois avaliadores do Inep (geralmente ±40 a ±80).
9. Seja honesto(a) e calibrado(a): não infle notas. Uma redação mediana costuma ficar entre 560 e 720. Notas 960–1000 são raras e exigem texto praticamente impecável.
10. Escreva em português do Brasil, num tom de professor que quer ver o aluno evoluir: direto, específico, sem rodeios.

Registre a correção chamando a ferramenta "registrar_correcao".`;
  }

  const nivel = { type: "integer", enum: [0, 40, 80, 120, 160, 200] };
  const compSchema = {
    type: "object",
    properties: {
      nota: nivel,
      justificativa: { type: "string", description: "Justificativa do nível, citando trechos do texto." }
    },
    required: ["nota", "justificativa"]
  };
  const elemento = { type: "object", properties: { presente: { type: "boolean" }, trecho: { type: "string" } }, required: ["presente", "trecho"] };

  const FERRAMENTA = {
    name: "registrar_correcao",
    description: "Registra a correção completa da redação no padrão ENEM.",
    input_schema: {
      type: "object",
      properties: {
        zero: { type: "object", properties: { anulada: { type: "boolean" }, motivo: { type: "string" } }, required: ["anulada", "motivo"] },
        c1: compSchema, c2: compSchema, c3: compSchema, c4: compSchema, c5: compSchema,
        faixa_provavel: { type: "object", properties: { min: { type: "integer" }, max: { type: "integer" } }, required: ["min", "max"] },
        parecer_geral: { type: "string", description: "Parecer do professor em 1 a 2 parágrafos." },
        pontos_fortes: { type: "array", items: { type: "string" } },
        pontos_fracos: { type: "array", items: { type: "string" } },
        como_melhorar: { type: "array", items: { type: "string" }, description: "Ações concretas e priorizadas para subir a nota." },
        desvios: {
          type: "array",
          items: {
            type: "object",
            properties: {
              trecho: { type: "string" }, correcao: { type: "string" }, explicacao: { type: "string" },
              competencia: { type: "integer", enum: [1, 2, 3, 4, 5] }
            },
            required: ["trecho", "correcao", "explicacao", "competencia"]
          }
        },
        repertorio: {
          type: "array",
          items: {
            type: "object",
            properties: {
              referencia: { type: "string" },
              classificacao: { type: "string", enum: ["legitimado, pertinente e produtivo", "legitimado e pertinente, pouco produtivo", "não legitimado", "de bolso"] },
              comentario: { type: "string" }
            },
            required: ["referencia", "classificacao", "comentario"]
          }
        },
        proposta: {
          type: "object",
          properties: { acao: elemento, agente: elemento, modo: elemento, finalidade: elemento, detalhamento: elemento, respeita_direitos_humanos: { type: "boolean" } },
          required: ["acao", "agente", "modo", "finalidade", "detalhamento", "respeita_direitos_humanos"]
        },
        reescrita: {
          type: "object",
          description: "Reescrita do trecho/parágrafo mais fraco, mostrando como ficaria em nível 200.",
          properties: { trecho_original: { type: "string" }, versao_melhorada: { type: "string" }, por_que: { type: "string" } },
          required: ["trecho_original", "versao_melhorada", "por_que"]
        }
      },
      required: ["zero", "c1", "c2", "c3", "c4", "c5", "faixa_provavel", "parecer_geral", "pontos_fortes", "pontos_fracos", "como_melhorar", "desvios", "repertorio", "proposta", "reescrita"]
    }
  };

  async function corrigir({ chave, modelo, tema, texto, metricasLocais }) {
    const conteudo =
      `TEMA PROPOSTO: ${tema || "(o participante não informou o tema — deduza pelo texto e avalie a coerência interna; mencione isso no parecer)"}\n\n` +
      `DADOS AUTOMÁTICOS (apenas referência): ${metricasLocais.palavras} palavras, ${metricasLocais.paragrafos} parágrafos, ~${metricasLocais.linhas} linhas manuscritas estimadas.\n\n` +
      `REDAÇÃO DO PARTICIPANTE:\n"""\n${texto}\n"""`;

    const resp = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": chave,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: modelo,
        max_tokens: 8000,
        system: montarSistema(),
        tools: [FERRAMENTA],
        tool_choice: { type: "tool", name: "registrar_correcao" },
        messages: [{ role: "user", content: conteudo }]
      })
    });

    if (!resp.ok) {
      let msg = `Erro ${resp.status}`;
      try { const j = await resp.json(); msg += ": " + (j.error?.message || JSON.stringify(j)); } catch (_) {}
      if (resp.status === 401) msg = "Chave de API inválida. Confira a chave nas configurações.";
      if (resp.status === 429) msg = "Limite de uso da API atingido. Aguarde um pouco e tente de novo.";
      throw new Error(msg);
    }
    const dados = await resp.json();
    const bloco = (dados.content || []).find(b => b.type === "tool_use");
    if (!bloco) throw new Error("A IA não retornou a correção no formato esperado. Tente novamente.");
    const r = bloco.input;

    const notas = { 1: r.c1.nota, 2: r.c2.nota, 3: r.c3.nota, 4: r.c4.nota, 5: r.c5.nota };
    if (r.proposta && r.proposta.respeita_direitos_humanos === false) notas[5] = 0;
    if (r.zero?.anulada) Object.keys(notas).forEach(k => notas[k] = 0);
    const total = Object.values(notas).reduce((a, b) => a + b, 0);

    return {
      origem: "ia", modelo,
      zero: r.zero, notas, total,
      justificativas: { 1: r.c1.justificativa, 2: r.c2.justificativa, 3: r.c3.justificativa, 4: r.c4.justificativa, 5: r.c5.justificativa },
      faixa: r.zero?.anulada ? { min: 0, max: 0 } : { min: Math.max(0, Math.min(r.faixa_provavel.min, total)), max: Math.min(1000, Math.max(r.faixa_provavel.max, total)) },
      parecer: r.parecer_geral,
      pontos_fortes: r.pontos_fortes, pontos_fracos: r.pontos_fracos, como_melhorar: r.como_melhorar,
      desvios: r.desvios, repertorio: r.repertorio, elementos: r.proposta, reescrita: r.reescrita
    };
  }

  return { corrigir };
})();
