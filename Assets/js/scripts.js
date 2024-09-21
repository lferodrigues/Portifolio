        function enviarWhatsApp() {
            var nome = document.getElementById("nome").value;
            var sobrenome = document.getElementById("sobrenome").value;
            var email = document.getElementById("email").value;
            var telefone = "32999775281";
            var mensagem = `Olá, meu nome é ${nome} ${sobrenome}, e meu email é: ${email}. Gostaria de fazer o orçamento para automatizar as redes sociais da minha empresa.`;
            var link = `https://wa.me/55${telefone}?text=${encodeURIComponent(mensagem)}`;
            window.open(link, '_blank');
        }

 // Atualiza o ano no rodapé
 document.getElementById('currentYear').textContent = new Date().getFullYear();

