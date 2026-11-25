/* =========================================================
   BASE DE CONHECIMENTO — Redação do ENEM
   Consolidada a partir das Cartilhas do Participante (Inep)
   e dos editais/provas de 2017 a 2026.
   ========================================================= */

const BASE_ENEM = {
  versao: "Base consolidada — editais/cartilhas Enem 2017 a 2026",

  /* Os 10 últimos temas (edições regulares) */
  temas: [
    { ano: 2026, tema: "A valorização do Sistema Único de Saúde (SUS) como direito universal", eixo: "Saúde / cidadania" },
    { ano: 2025, tema: "Perspectivas acerca do envelhecimento na sociedade brasileira", eixo: "Grupos sociais / demografia" },
    { ano: 2024, tema: "Desafios para a valorização da herança africana no Brasil", eixo: "Cultura / identidade" },
    { ano: 2023, tema: "Desafios para o enfrentamento da invisibilidade do trabalho de cuidado realizado pela mulher no Brasil", eixo: "Gênero / trabalho" },
    { ano: 2022, tema: "Desafios para a valorização de comunidades e povos tradicionais no Brasil", eixo: "Grupos sociais / cultura" },
    { ano: 2021, tema: "Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil", eixo: "Cidadania / direitos" },
    { ano: 2020, tema: "O estigma associado às doenças mentais na sociedade brasileira", eixo: "Saúde / preconceito" },
    { ano: 2019, tema: "Democratização do acesso ao cinema no Brasil", eixo: "Cultura / acesso" },
    { ano: 2018, tema: "Manipulação do comportamento do usuário pelo controle de dados na internet", eixo: "Tecnologia / sociedade" },
    { ano: 2017, tema: "Desafios para a formação educacional de surdos no Brasil", eixo: "Educação / inclusão" }
  ],

  /* Padrões identificados nos últimos 10 editais/temas */
  padroes: [
    "O tipo textual exigido é sempre o dissertativo-argumentativo, em prosa, com até 30 linhas.",
    "Os temas tratam de um problema social brasileiro com recorte específico — o recorte (\"desafios para…\", \"valorização de…\", \"invisibilidade…\") precisa aparecer de forma explícita na argumentação.",
    "Tendência recorrente de temas sobre grupos invisibilizados ou direitos de cidadania (surdos, povos tradicionais, mulheres cuidadoras, herança africana, idosos, SUS).",
    "A proposta de intervenção completa traz 5 elementos: ação, agente, modo/meio, finalidade/efeito e detalhamento — e deve estar articulada à discussão.",
    "As cartilhas recentes (2025–2026) reforçam a crítica ao \"repertório de bolso\": referências decoradas, genéricas, sem vínculo real com o tema, rendem menos na Competência 2.",
    "Desrespeito aos direitos humanos zera apenas a Competência 5 (não a redação inteira).",
    "Cópia de trechos dos textos motivadores não conta como linha escrita e rebaixa a Competência 2.",
    "Cada redação é corrigida por dois avaliadores independentes; a nota final é a média. Diferença grande entre eles leva a um terceiro avaliador e, se persistir, a uma banca."
  ],

  /* Situações de nota zero */
  zeros: [
    "Fuga total ao tema",
    "Não obediência ao tipo dissertativo-argumentativo (ex.: predomínio de narração, poema)",
    "Texto com até 7 linhas (texto insuficiente)",
    "Trecho deliberadamente desconectado do tema (ex.: receita, hino, recado)",
    "Impropérios, desenhos ou outras formas propositais de anulação",
    "Identificação do participante (nome, assinatura, rubrica) no espaço do texto",
    "Folha em branco, texto ilegível ou em língua estrangeira",
    "Cópia dos textos motivadores que, descontada, deixa 7 linhas ou menos de texto autoral"
  ],

  /* Matriz de referência — 5 competências, níveis 0 a 200 */
  competencias: [
    {
      id: 1,
      nome: "Norma-padrão",
      titulo: "Demonstrar domínio da modalidade escrita formal da língua portuguesa",
      niveis: {
        200: "Excelente domínio; desvios apenas como excepcionalidade e sem reincidência.",
        160: "Bom domínio; poucos desvios gramaticais e de convenções da escrita.",
        120: "Domínio mediano; alguns desvios.",
        80: "Domínio insuficiente; muitos desvios gramaticais, de escolha de registro e de convenções.",
        40: "Domínio precário, de forma sistemática, com desvios frequentes e diversificados.",
        0: "Desconhecimento da modalidade escrita formal."
      },
      dicas: ["Concordância verbal e nominal", "Regência e crase", "Pontuação (vírgula antes de conjunções adversativas, após adjuntos deslocados)", "Acentuação e grafia", "Evitar oralidade (\"pra\", \"tipo\", \"né\", \"a gente\")"]
    },
    {
      id: 2,
      nome: "Tema e repertório",
      titulo: "Compreender a proposta e aplicar conceitos de várias áreas para desenvolver o tema, dentro do tipo dissertativo-argumentativo",
      niveis: {
        200: "Argumentação consistente, repertório sociocultural legitimado, pertinente e produtivo; excelente domínio do texto dissertativo-argumentativo.",
        160: "Argumentação consistente e bom domínio do tipo textual (proposição, argumentação e conclusão).",
        120: "Argumentação previsível; domínio mediano do tipo textual.",
        80: "Desenvolve o tema recorrendo à cópia de trechos dos textos motivadores ou com domínio insuficiente do tipo textual.",
        40: "Tangencia o tema ou demonstra domínio precário do tipo textual, com traços de outros tipos.",
        0: "Fuga ao tema / não atendimento ao tipo dissertativo-argumentativo (anula a redação)."
      },
      dicas: ["Abordar o tema completo, com o recorte", "Repertório legitimado (fonte reconhecida), pertinente (ligado ao tema) e produtivo (usado no argumento)", "Evitar repertório de bolso"]
    },
    {
      id: 3,
      nome: "Projeto de texto",
      titulo: "Selecionar, relacionar, organizar e interpretar informações em defesa de um ponto de vista",
      niveis: {
        200: "Informações relacionadas ao tema, consistentes e organizadas, com autoria, em defesa de um ponto de vista.",
        160: "Informações organizadas, com indícios de autoria.",
        120: "Informações limitadas aos textos motivadores e pouco organizadas.",
        80: "Informações desorganizadas ou contraditórias e limitadas aos textos motivadores.",
        40: "Informações pouco relacionadas ao tema, incoerentes, sem defesa de ponto de vista.",
        0: "Informações não relacionadas ao tema e sem defesa de ponto de vista."
      },
      dicas: ["Tese clara na introdução", "Cada desenvolvimento aprofunda um argumento anunciado", "Explicar causas e consequências, não só constatar"]
    },
    {
      id: 4,
      nome: "Coesão",
      titulo: "Demonstrar conhecimento dos mecanismos linguísticos necessários para a construção da argumentação",
      niveis: {
        200: "Articula bem as partes do texto e apresenta repertório diversificado de recursos coesivos.",
        160: "Articula as partes com poucas inadequações e repertório diversificado de recursos coesivos.",
        120: "Articulação mediana, com inadequações, e repertório pouco diversificado.",
        80: "Articulação insuficiente, com muitas inadequações e repertório limitado.",
        40: "Articulação precária.",
        0: "Não articula as informações."
      },
      dicas: ["Conectivos entre parágrafos (inter) e dentro deles (intra)", "Variar conectivos — não repetir \"além disso\"", "Retomadas por pronomes, sinônimos e elipse"]
    },
    {
      id: 5,
      nome: "Proposta de intervenção",
      titulo: "Elaborar proposta de intervenção para o problema abordado, respeitando os direitos humanos",
      niveis: {
        200: "Proposta muito bem elaborada, detalhada, relacionada ao tema e articulada à discussão (5 elementos).",
        160: "Proposta bem elaborada, relacionada ao tema e articulada (4 elementos).",
        120: "Proposta mediana, relacionada ao tema e articulada (3 elementos).",
        80: "Proposta insuficiente ou não articulada à discussão (2 elementos).",
        40: "Proposta vaga, precária ou relacionada apenas ao assunto (1 elemento).",
        0: "Ausência de proposta, proposta não relacionada ao tema ou desrespeito aos direitos humanos."
      },
      dicas: ["Ação: o que fazer", "Agente: quem faz", "Modo/meio: como (\"por meio de…\")", "Finalidade: para quê (\"a fim de…\")", "Detalhamento de um dos elementos"]
    }
  ]
};

if (typeof module !== "undefined") module.exports = BASE_ENEM;
