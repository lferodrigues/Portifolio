 const input = document.getElementById('documento');

    input.addEventListener('input', function () {
      let value = this.value.replace(/\D/g, '');

      if (value.length <= 11) {
        // CPF: 000.000.000-00
        this.value = value
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      } else {
        // CNPJ: 00.000.000/0000-00
        this.value = value
          .replace(/^(\d{2})(\d)/, '$1.$2')
          .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
          .replace(/\.(\d{3})(\d)/, '.$1/$2')
          .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
      }
    });

    function gerarCodigo() {
      const docInput = document.getElementById('documento').value;
      const docNumeros = docInput.replace(/\D/g, '');

      if (docNumeros.length !== 11 && docNumeros.length !== 14) {
        alert('Documento inválido. Digite um CPF (11 dígitos) ou CNPJ (14 dígitos).');
        return;
      }

      const svg = document.getElementById('barcode');
      svg.innerHTML = '';

      JsBarcode(svg, docNumeros, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 100,
        displayValue: false
      });

      document.getElementById('docTexto').textContent = docNumeros;
    }

    function gerarPDF() {
      const svg = document.getElementById('barcode');
      const docTexto = document.getElementById('docTexto').textContent;

      if (!svg || svg.innerHTML.trim() === '' || docTexto.trim() === '') {
        alert('Por favor, gere o código de barras antes de baixar o PDF.');
        return;
      }

      const element = document.getElementById('print-area');

      const opt = {
        margin:       0.5,
        filename:     'codigo-de-barras.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(element).save();
    }