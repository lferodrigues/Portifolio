function mascararDocumento(input) {
  let value = input.value.replace(/\D/g, '');

  if (value.length <= 11) {
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  } else {
    value = value.replace(/^(\d{2})(\d)/, '$1.$2');
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
    value = value.replace(/(\d{4})(\d)/, '$1-$2');
  }

  input.value = value;
}
function adicionarContainer() {
  const area = document.getElementById("containers-area");
  const existentes = area.querySelectorAll(".container");

  const clone = existentes[0].cloneNode(true);

  const input = clone.querySelector("input");
  const svg = clone.querySelector("svg");
  const docText = clone.querySelector(".document-text");

  if (input) input.value = "";
  if (svg) svg.innerHTML = "";
  if (docText) docText.textContent = "";

  // Remove botão antigo (se houver) para evitar duplicação
  const botaoRemoverExistente = clone.querySelector(".remove-button");
  if (botaoRemoverExistente) botaoRemoverExistente.remove();

  // Adiciona botão de remover
  const botaoRemover = document.createElement("button");
  botaoRemover.textContent = "Remover";
  botaoRemover.classList.add("remove-button");
  botaoRemover.onclick = () => removerContainer(clone);
  clone.appendChild(botaoRemover);

  area.appendChild(clone);
}

function removerContainer(container) {
  container.remove();
}



function gerarTodosCodigos() {
  const containers = document.querySelectorAll('.container');
  containers.forEach(container => {
    const input = container.querySelector('input');
    const svg = container.querySelector('svg');
    const texto = container.querySelector('.document-text');

    if (input && svg && texto) {
      let doc = input.value.replace(/\D/g, '');
      if (doc) {
        JsBarcode(svg, doc, {
          format: "CODE128",
          width: 2,
          height: 50,
          displayValue: false,
        });
        texto.textContent = doc;
      } else {
        svg.innerHTML = '';
        texto.textContent = '';
      }
    }
  });
}
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

    // Remove input e título se existirem
    const input = clone.querySelector("input");
    const titulo = clone.querySelector("h1");

    if (input) input.remove();
    if (titulo) titulo.remove();

    clone.classList.add("print-item");
    printArea.appendChild(clone);
  });

  document.body.appendChild(printArea);

  // Abre a janela de impressão
  window.print();

  // Remove a área temporária após impressão
  setTimeout(() => {
    printArea.remove();
  }, 1000);
}

const clone = container.cloneNode(true);

// Remove input (campo de texto)
const input = clone.querySelector("input");
if (input) input.remove();











