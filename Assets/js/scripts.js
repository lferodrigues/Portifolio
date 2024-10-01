        function enviarWhatsApp() {
            var nome = document.getElementById("nome").value;
            var sobrenome = document.getElementById("sobrenome").value;
            var email = document.getElementById("email").value;
            var telefone = "32998409798";
            var mensagem = `Olá, meu nome é ${nome} ${sobrenome}, e meu email é: ${email}. Gostaria de fazer o orçamento para automatizar as redes sociais da minha empresa.`;
            var link = `https://wa.me/55${telefone}?text=${encodeURIComponent(mensagem)}`;
            window.open(link, '_blank');
        }
        function enviarWhatsApp_consultoria() {
            var nome = document.getElementById("nome").value;
            var sobrenome = document.getElementById("sobrenome").value;
            var email = document.getElementById("email").value;
            var telefone = "32998409798";
            var mensagem = `Olá, meu nome é ${nome} ${sobrenome}, e meu email é: ${email}. Gostaria de fazer o orçamento para a consultoria em Segurança da Informação.`;
            var link = `https://wa.me/55${telefone}?text=${encodeURIComponent(mensagem)}`;
            window.open(link, '_blank');
        }
        function enviarWhatsApp_mentoria() {
            var nome = document.getElementById("nome").value;
            var sobrenome = document.getElementById("sobrenome").value;
            var email = document.getElementById("email").value;
            var telefone = "32998409798";
            var mensagem = `Olá, meu nome é ${nome} ${sobrenome}, e meu email é: ${email}. Gostaria de fazer o orçamento para a Mentoria em Informatica.`;
            var link = `https://wa.me/55${telefone}?text=${encodeURIComponent(mensagem)}`;
            window.open(link, '_blank');
        }
        function enviarWhatsApp_site() {
            var nome = document.getElementById("nome").value;
            var sobrenome = document.getElementById("sobrenome").value;
            var email = document.getElementById("email").value;
            var telefone = "32998409798";
            var mensagem = `Olá, meu nome é ${nome} ${sobrenome}, e meu email é: ${email}. Gostaria de fazer o orçamento sobre o Desenvolvimento de um site para o meu negocio.`;
            var link = `https://wa.me/55${telefone}?text=${encodeURIComponent(mensagem)}`;
            window.open(link, '_blank');
        }
        function enviarWhatsApp_dev() {
            var nome = document.getElementById("nome").value;
            var sobrenome = document.getElementById("sobrenome").value;
            var email = document.getElementById("email").value;
            var telefone = "32998409798";
            var mensagem = `Olá, meu nome é ${nome} ${sobrenome}, e meu email é: ${email}. Gostaria de fazer o orçamento sobre o Desenvolvimento de um sistema para o meu negocio.`;
            var link = `https://wa.me/55${telefone}?text=${encodeURIComponent(mensagem)}`;
            window.open(link, '_blank');
        }
        function enviarWhatsApp_excel() {
            var nome = document.getElementById("nome").value;
            var sobrenome = document.getElementById("sobrenome").value;
            var email = document.getElementById("email").value;
            var telefone = "32998409798";
            var mensagem = `Olá, meu nome é ${nome} ${sobrenome}, e meu email é: ${email}. Gostaria de fazer o orçamento sobre o Desenvolvimento de uma planilha para o meu negocio.`;
            var link = `https://wa.me/55${telefone}?text=${encodeURIComponent(mensagem)}`;
            window.open(link, '_blank');
        }

 // Atualiza o ano no rodapé
 document.getElementById('currentYear').textContent = new Date().getFullYear();

