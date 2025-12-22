const jogos = [
  [6,14,27,35,41,57],
  [6,23,25,34,43,47],
  [15,22,24,30,31,45],
  [24,33,36,44,49,52],
  [26,27,36,37,55,58],
  [2,10,19,23,35,50],
  [5,7,12,21,39,59],
  [3,11,22,29,44,60],
  [4,18,28,37,46,54],
  [1,9,16,32,40,48],
  [6,13,20,24,38,51],
  [7,14,26,33,47,53],
  [8,17,21,36,42,58],
  [2,15,23,34,45,56],
  [5,11,19,27,39,60],
  [9,18,25,31,44,50],
  [1,10,16,28,37,52],
  [3,12,20,30,41,55],
  [4,14,22,35,48,59],
  [6,17,24,33,46,58],
  [7,19,26,36,42,54],
  [2,11,21,29,40,57],
  [5,15,23,31,44,56],
  [1,9,18,27,39,52],
  [3,10,20,34,45,60],
  [4,12,22,30,41,55],
  [6,14,25,33,47,59],
  [7,16,21,36,48,54],
  [2,11,19,28,40,57],
  [5,15,23,32,44,56],
  [1,9,18,27,39,52],
  [3,10,20,34,45,60],
  [4,12,22,30,41,55],
  [6,14,25,33,47,59],
  [7,16,21,36,48,54],
  [2,11,19,28,40,57],
  [5,15,23,32,44,56],
  [1,9,18,27,39,52],
  [3,10,20,34,45,60],
  [4,12,22,30,41,55],
  [6,14,25,33,47,59],
  [7,16,21,36,48,54],
  [2,11,19,28,40,57],
  [5,15,23,32,44,56],
  [1,9,18,27,39,52],
  [3,10,20,34,45,60],
  [4,12,22,30,41,55],
  [6,14,25,33,47,59],
  [7,16,21,36,48,54],
  [2,11,19,28,40,57],
  [5,15,23,32,44,56],
  [1,9,18,27,39,52],
  [3,10,20,34,45,60],
  [4,12,22,30,41,55],
  [6,14,25,33,47,59],
  [7,16,21,36,48,54],
  [2,11,19,28,40,57],
  [5,15,23,32,44,56],
  [1,9,18,27,39,52],
  [3,10,20,34,45,60],
  [4,12,22,30,41,55],
  [6,14,25,33,47,59],
  [7,16,21,36,48,54],
  [2,11,19,28,40,57],
  [5,15,23,32,44,56],
  [1,9,18,27,39,52],
  [3,10,20,34,45,60],
  [4,12,22,30,41,55],
  [6,14,25,33,47,59],
  [7,16,21,36,48,54],
  [2,11,19,28,40,57],
  [5,15,23,32,44,56],
  [1,9,18,27,39,52],
  [3,10,20,34,45,60],
  [4,12,22,30,41,55],
  [6,14,25,33,47,59],
  [7,16,21,36,48,54],
  [2,11,19,28,40,57],
  [5,15,23,32,44,56],
  [1,9,18,27,39,52],
  [3,10,20,34,45,60],
  [4,12,22,30,41,55],
  [6,14,25,33,47,59],
  [7,16,21,36,48,54],
  [2,11,19,28,40,57],
  [5,15,23,32,44,56],
  [1,9,18,27,39,52],
  [3,10,20,34,45,60],
  [4,12,22,30,41,55],
  [6,14,25,33,47,59],
  [7,16,21,36,48,54],
  [2,11,19,28,40,57],
  [5,15,23,32,44,56]
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
   RENDERIZAÇÃO + PAGINAÇÃO
===================== */
function renderizarTabela() {
  const tbody = document.getElementById("tabelaJogos");
  const filtro = parseInt(document.getElementById("filtroAcertos").value);

  tbody.innerHTML = "";

  const jogosFiltrados = jogos
    .map((jogo, index) => ({ jogo, index }))
    .filter(item => filtro === 0 || acertosPorJogo[item.index] >= filtro);

  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const fim = inicio + ITENS_POR_PAGINA;
  const pagina = jogosFiltrados.slice(inicio, fim);

  pagina.forEach(item => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${item.index}</td>
      <td>${item.jogo.join(", ")}</td>
      <td>
        <a href="Assets/img/" target="_blank">
          <span class="icon-img">🖼️</span>
        </a>
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

  jogos.forEach((jogo, index) => {
    acertosPorJogo[index] = jogo.filter(n => numeros.includes(n)).length;
  });

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
