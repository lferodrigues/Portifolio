
const jogos = [
  [6,14,27,35,41,57],
  [6,23,25,34,43,47],
  [15,22,24,30,31,45],
  [24,33,36,44,49,52],
  [26,27,36,37,55,58],
  [12,32,38,39,55,57],
  [1,3,6,14,21,33],
  [11,35,39,41,51,52],
  [1,2,5,36,41,45],
  [1,2,22,45,47,53],
  [1,5,10,13,14,50],
  [4,9,15,24,43,58],
  [1,15,28,50,54,55],
  [1,39,46,50,53,54],
  [4,7,16,21,26,27],
  [10,16,27,38,41,60],
  [3,10,20,34,35,53],
  [1,3,20,22,23,40],
  [7,21,26,34,51,55],
  [3,19,23,26,38,60],
  [3,13,16,31,51,53],
  [27,36,44,52,55,56],
  [13,33,42,47,48,56],
  [12,26,29,34,35,40],
  [16,29,32,37,47,58],
  [19,33,46,50,58,59],
  [4,7,14,18,40,50],
  [7,16,39,48,59,60],
  [8,31,41,43,52,58],
  [6,11,14,45,51,58],
  [18,19,25,39,47,51],
  [7,12,17,27,34,44],
  [9,22,27,44,50,56],
  [6,7,17,31,54,58],
  [3,8,31,34,52,60],
  [2,12,16,19,40,52],
  [4,11,23,27,41,44],
  [10,22,34,37,38,45],
  [2,12,17,26,38,42],
  [5,9,14,17,39,42],
  [3,19,30,34,38,40],
  [4,9,24,26,46,55],
  [15,29,31,36,41,60],
  [12,15,44,54,56,60],
  [12,19,22,39,59,60],
  [8,12,27,31,42,50],
  [9,20,30,32,59,60],
  [13,15,31,43,49,50],
  [12,22,37,47,49,52],
  [4,6,19,27,33,54],
  [6,8,14,19,25,42],
  [13,15,24,31,37,48],
  [10,19,37,40,41,51],
  [13,23,27,40,46,51],
  [1,31,35,36,57,58],
  [7,37,42,50,53,58],
  [3,10,26,44,50,54],
  [7,10,18,34,46,54],
  [8,9,18,25,26,34],
  [10,25,37,47,48,57],
  [12,21,27,39,46,51],
  [1,15,24,26,35,41],
  [22,23,33,44,56,59],
  [2,11,15,28,52,60],
  [4,25,40,44,47,48],
  [10,11,19,37,43,53],
  [20,31,39,46,54,60],
  [4,6,35,37,49,56],
  [1,18,20,25,48,54],
  [24,28,45,46,55,58],
  [16,18,33,34,48,55],
  [1,13,30,31,56,58],
  [9,11,17,29,42,58],
  [3,17,24,31,32,54],
  [6,16,17,20,35,49],
  [4,15,44,46,49,53],
  [9,17,24,33,45,47],
  [3,34,36,38,57,59],
  [12,20,21,30,35,39],
  [3,6,35,36,41,50],
  [5,43,51,52,56,58],
  [12,22,26,30,38,44],
  [2,3,39,40,49,52],
  [2,23,25,44,51,55],
  [4,30,31,40,50,56],
  [7,12,29,47,50,57],
  [12,30,36,43,50,53],
  [3,7,21,23,41,51],
  [8,15,33,44,51,57],
  [3,5,20,35,42,48],
  [1,9,11,12,23,35],
  [23,27,30,46,49,58],
  [2,7,20,29,39,55],
  [7,18,24,48,55,57],
  [5,10,32,34,48,60],
  [10,20,26,29,51,55],
  [1,8,13,17,19,57],
  [24,25,31,44,45,57],
  [2,3,6,15,25,47],
  [3,9,14,38,40,47],
  [22,29,38,48,54,60],
  [2,10,26,30,37,41],
  [3,4,19,22,26,58],
  [3,23,24,28,32,59],
  [8,14,30,45,51,59],
  [9,17,20,29,32,48],
  [34,35,36,43,47,54],
  [4,13,16,23,26,54],
  [6,17,21,25,45,57],
  [20,34,37,44,49,59],
  [10,13,17,22,32,56],
  [1,2,34,44,51,58],
  [9,11,16,33,39,47],
  [23,27,29,30,41,46],
  [4,13,19,28,33,38],
  [3,32,38,42,45,58],
  [13,17,19,22,24,31],
  [20,22,35,39,47,48],
  [9,13,18,26,37,50],
  [10,18,29,42,45,55],
  [14,42,48,49,52,53],
  [3,13,21,22,28,56],
  [6,8,11,23,30,31],
  [2,13,18,25,32,47],
  [2,14,18,36,48,52],
  [1,4,11,16,36,49],
  [13,18,25,40,41,53],
  [15,16,32,34,49,60],
  [4,12,14,16,24,48],
  [12,15,24,39,44,47],
  [9,19,20,22,29,34],
  [2,4,11,16,27,30],
  [2,7,16,32,33,55],
  [3,5,9,11,54,56],
  [1,5,15,21,24,45],
  [12,16,17,24,41,49],
  [24,29,40,42,47,60],
  [12,21,39,44,47,57],
  [11,26,30,38,42,58],
  [33,34,41,42,45,49],
  [13,40,46,50,51,59],
  [16,22,31,38,39,51],
  [17,18,19,29,45,49],
  [8,29,51,55,58,60],
  [2,4,8,18,21,40],
  [1,2,4,36,46,53],
  [1,9,10,11,49,57],
  [8,15,27,40,45,51],
  [14,22,24,25,33,49],
  [14,19,27,48,49,56],
  [6,12,23,28,37,54],
  [1,24,34,37,43,54],
  [15,22,23,26,47,58],
  [10,11,24,40,55,59],
  [3,4,5,23,48,60],
  [1,6,10,19,33,37],
  [19,20,22,33,42,56],
  [1,8,10,23,29,53],
  [2,12,27,30,40,55],
  [4,14,24,33,44,52],
  [5,11,30,38,50,57],
  [9,16,33,53,56,58],
  [10,27,33,37,39,45],
  [2,15,33,37,40,53],
  [18,23,30,32,43,48],
  [17,18,21,32,49,60],
  [4,9,23,45,48,54],
  [7,22,33,45,52,54],
  [12,15,24,27,28,53],
  [6,7,14,37,38,57],
  [6,14,19,22,34,51],
  [3,14,33,38,44,50],
  [4,25,26,28,30,49],
  [5,15,21,27,42,49],
  [3,5,33,39,42,56],
  [1,5,6,30,57,58],
  [3,35,38,39,42,48],
  [15,24,36,42,44,59],
  [4,35,37,38,47,50],
  [17,28,31,35,41,53],
  [18,19,36,41,51,52],
  [9,19,38,42,45,50],
  [5,22,36,37,44,52],
  [2,17,28,30,45,60],
  [11,16,26,29,44,57],
  [23,28,30,42,48,52],
  [3,15,36,46,52,59],
  [9,17,23,34,51,54],
  [7,24,44,45,55,59],
  [15,30,36,38,52,55],
  [2,5,13,23,34,58],
  [1,9,16,22,30,59],
  [3,8,18,29,45,60],
  [4,12,14,25,37,49],
  [6,10,20,32,42,53],
  [7,11,19,28,38,56],
  [8,15,21,33,43,52],
  [2,10,17,26,39,50],
  [1,6,18,22,41,55],
  [3,9,12,28,34,51]
];


/* =====================
   CONFIGURAÇÕES
===================== */
const TOKEN_CORRETO = "Mega2025@";
const ITENS_POR_PAGINA = 10;

let paginaAtual = 1;
let acertosPorJogo = [];

/* =====================
   LOGIN
===================== */
function login() {
  const token = document.getElementById("token").value.trim();

  if (token === TOKEN_CORRETO) {
    sessionStorage.setItem("autenticado", "true");
    document.getElementById("login").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    carregarJogos();
  } else {
    document.getElementById("loginError").innerText = "Token inválido";
  }
}

/* =====================
   CARREGAR JOGOS
===================== */

function carregarJogos() {
  acertosPorJogo = new Array(jogos.length).fill(0);
  paginaAtual = 1;
  renderizarTabela();
}

/* =====================
   Leitura da Imagem
===================== */

function gerarNomeImagem(index) {
  const numero = (index + 1).toString().padStart(2, "0");
  return `Assets/img/${numero}.jpg`;
}

function verificarAcessoImagem(event, index) {
  const autenticado = sessionStorage.getItem("autenticado");

  if (!autenticado) {
    event.preventDefault();
    alert("Acesso negado. Faça login para visualizar o jogo.");
    location.reload(); // volta para a tela inicial
    return false;
  }

  window.open(gerarNomeImagem(index), "_blank");
}

/* =====================
   RENDERIZAÇÃO + PAGINAÇÃO
===================== */
function renderizarTabela() {
  const tbody = document.getElementById("tabelaJogos");
  const filtro = parseInt(document.getElementById("filtroAcertos").value);

  tbody.innerHTML = "";

  const jogosFiltrados = jogos
  .map((jogo, index) => ({
    jogo,
    index,
    acertos: acertosPorJogo[index]
  }))
  .filter(item => filtro === 0 || item.acertos >= filtro)
  .sort((a, b) => b.acertos - a.acertos); // ordem decrescente

  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const fim = inicio + ITENS_POR_PAGINA;
  const pagina = jogosFiltrados.slice(inicio, fim);

  pagina.forEach(item => {
    const tr = document.createElement("tr");
    if (item.acertos >= 4) {
  tr.classList.add("destaque");
}


   tr.innerHTML = `
  <td>${item.index + 1}</td>
  <td>${item.jogo.join(", ")}</td>
  <td>
    <span 
      class="icon-img"
      onclick="verificarAcessoImagem(event, ${item.index})"
      title="Visualizar imagem do jogo"
    >
      🖼️
    </span>
  </td>
  <td>${gerarBadge(acertosPorJogo[item.index])}</td>
`;


    tbody.appendChild(tr);
  });

  const totalPaginas = Math.ceil(jogosFiltrados.length / ITENS_POR_PAGINA);
  document.getElementById("paginaInfo").innerText =
    `Página ${paginaAtual} de ${totalPaginas || 1}`;
}

/* =====================
   CONFERÊNCIA
===================== */
function conferir() {
  const numeros = document.getElementById("numerosSorteados").value
    .split(",")
    .map(n => parseInt(n.trim()))
    .filter(n => !isNaN(n));

  if (numeros.length !== 6) {
    alert("Digite exatamente 6 números.");
    return;
  }

  let quadras = 0;
  let quinas = 0;
  let senas = 0;

  jogos.forEach((jogo, index) => {
    const acertos = jogo.filter(n => numeros.includes(n)).length;
    acertosPorJogo[index] = acertos;

    if (acertos === 4) quadras++;
    if (acertos === 5) quinas++;
    if (acertos === 6) senas++;
  });

  // Exibir resumo
  document.getElementById("resultado").innerHTML = `
    ✅ Resultado da Conferência:
    Quadras: ${quadras} | Quinas: ${quinas} | Senas: ${senas}
  `;

  paginaAtual = 1;
  renderizarTabela();
}


/* =====================
   BADGES
===================== */
function gerarBadge(acertos) {
  if (acertos === 6) return `<span class="badge sena">Sena</span>`;
  if (acertos === 5) return `<span class="badge quina">Quina</span>`;
  if (acertos === 4) return `<span class="badge quadra">Quadra</span>`;
  return acertos;
}

/* =====================
   FILTRO
===================== */
function aplicarFiltro() {
  paginaAtual = 1;
  renderizarTabela();
}

/* =====================
   PAGINAÇÃO
===================== */
function proximaPagina() {
  paginaAtual++;
  renderizarTabela();
}

function paginaAnterior() {
  if (paginaAtual > 1) {
    paginaAtual--;
    renderizarTabela();
  }
}

/* =====================
   MODO ESCURO
===================== */
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
