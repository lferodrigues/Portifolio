function mascararDocumento(input) {
  let valor = input.value.replace(/\D/g, '');

  if (valor.length <= 11) {
    // CPF
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    // CNPJ
    valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
    valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
    valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
  }

  input.value = valor;
}

// Adiciona um novo cartão (container)
function adicionarContainer() {
  const area = document.getElementById("containers-area");
  const existentes = area.querySelectorAll(".container");
  const clone = existentes[0].cloneNode(true);

  const inputs = clone.querySelectorAll("input");
  const svg = clone.querySelector("svg");
  const docText = clone.querySelector(".document-text");

  if (inputs.length > 0) inputs.forEach(input => input.value = "");
  if (svg) svg.innerHTML = "";
  if (docText) docText.textContent = "";

  const botaoRemoverExistente = clone.querySelector(".remove-button");
  if (botaoRemoverExistente) botaoRemoverExistente.remove();

  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "Remover";
  botaoRemover.classList.add("remove-button");
  botaoRemover.onclick = () => removerContainer(clone);
  clone.appendChild(botaoRemover);

  area.appendChild(clone);
}

// Remove um cartão individual
function removerContainer(container) {
  container.remove();
}

function gerarTodosCodigos() {
  const containers = document.querySelectorAll(".container");

  containers.forEach(container => {
    const inputCPF = container.querySelector(".cpf-input");
    const inputNome = container.querySelector(".nome-input");
    const svg = container.querySelector("svg");
    const docText = container.querySelector(".document-text");

    if (!inputCPF || !inputNome || !svg || !docText) {
      console.warn("Elementos não encontrados.");
      return;
    }

    const valorComMascara = inputCPF.value.trim();
    const valorSemMascara = valorComMascara.replace(/\D/g, '');
    const nomeDigitado = inputNome.value.trim();

    if (valorSemMascara.length < 11) {
      alert("Digite um CPF ou CNPJ válido.");
      return;
    }

    // Mostra no console o valor codificado
    console.log(`Código de barras gerado para: ${valorSemMascara}`);

    // Mostra o nome no cartão
    docText.textContent = nomeDigitado || "Cliente Especial";

    // Limpa o SVG
    svg.innerHTML = '';

    // Gera o código de barras
    JsBarcode(svg, valorSemMascara, {
        format: "CODE128",
      displayValue: false,
      width: 3,         // Aumenta a espessura das linhas
      height: 60,       // Aumenta a altura do código de barras
      margin: 0
    });
  });
}



// Gera a versão de impressão dos cartões
function gerarPDF() {
  const containers = Array.from(document.querySelectorAll(".container"));

  if (containers.length === 0) {
    alert("Nenhum código para imprimir.");
    return;
  }

  const printArea = document.createElement("div");
  printArea.classList.add("print-area");

  containers.forEach(container => {
    const clone = container.cloneNode(true);

    const inputs = clone.querySelectorAll("input");
    const titulo = clone.querySelector("h1");

    if (inputs.length > 0) inputs.forEach(input => input.remove());
    if (titulo) titulo.remove();

    clone.classList.add("print-item");
    printArea.appendChild(clone);
  });

  document.body.appendChild(printArea);
  window.print();

  setTimeout(() => {
    printArea.remove();
  }, 1000);
}
