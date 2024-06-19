function enviarNecessidade() {
    var tema = document.getElementById('userInput').value.trim();
    var topico = document.getElementById('topicSelect').value;

    if (tema !== '') {
        gerarPromptProfissional(topico, tema);
    } else {
        alert('Por favor, digite o tema antes de enviar.');
    }
}

function gerarPromptProfissional(topico, tema) {
    var promptProfissional;

    switch(topico) {
        case 'Vendas':
            promptProfissional = `Crie um texto de vendas para o seguinte tema: "${tema}". Inclua detalhes sobre os benefícios, características do produto/serviço e um call-to-action claro.`;
            break;
        case 'Divulgação':
            promptProfissional = `Crie um texto de divulgação para o tema "${tema}". Inclua uma descrição atrativa, público-alvo e métodos de distribuição.`;
            break;
        case 'Post para Instagram':
            promptProfissional = `Crie um post para Instagram sobre "${tema}". O post deve ser envolvente, com hashtags relevantes e uma chamada para ação.`;
            break;
        case 'Post para LinkedIn':
            promptProfissional = `Crie um post profissional para LinkedIn sobre "${tema}". Destaque insights relevantes, boas práticas e uma chamada para ação.`;
            break;
        case 'Post Carrossel':
            promptProfissional = `Crie um post em carrossel para Instagram sobre "${tema}". Cada slide deve conter informações visuais e textuais atraentes.`;
            break;
        case 'Artigo Acadêmico':
            promptProfissional = `Desenvolva um artigo acadêmico sobre "${tema}". Inclua introdução, revisão de literatura, metodologia, resultados, discussão e conclusão.`;
            break;
        case 'Resposta de Exercício Escolar':
            promptProfissional = `Forneça uma resposta detalhada para o seguinte exercício escolar sobre "${tema}". Inclua explicações e exemplos, se necessário.`;
            break;
        case 'Fórmula de Excel':
            promptProfissional = `Crie uma fórmula de Excel para resolver o seguinte problema: "${tema}". Explique como a fórmula funciona e exemplos de uso.`;
            break;
        case 'Código em Programação':
            promptProfissional = `Escreva um código de programação para resolver o seguinte problema: "${tema}". Inclua explicações e exemplos de uso.`;
            break;
        default:
            promptProfissional = `Por favor, forneça um tema válido.`;
    }

    mostrarResposta(promptProfissional);
}

function mostrarResposta(prompt) {
    var respostaContainer = document.createElement('div');
    respostaContainer.id = 'resposta';
    respostaContainer.innerText = prompt;

    var copyButton = document.createElement('button');
    copyButton.classList.add('copy-button');
    copyButton.onclick = function() {
        copiarTexto(prompt);
    };

    var copyIcon = document.createElement('span');
    copyIcon.classList.add('copy-icon');
    copyIcon.innerHTML = '📋';

    copyButton.appendChild(copyIcon);

    var container = document.getElementById('respostaContainer');
    container.innerHTML = '';
    container.appendChild(respostaContainer);
    container.appendChild(copyButton);
}

function copiarTexto(texto) {
    navigator.clipboard.writeText(texto).then(function() {
        alert('Texto copiado para a área de transferência!');
    }, function(err) {
        alert('Erro ao copiar texto: ', err);
    });
}
// Atualiza o ano no rodapé
document.getElementById('currentYear').textContent = new Date().getFullYear();
