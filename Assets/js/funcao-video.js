// Bloqueia o botão direito
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Função para carregar um vídeo no iframe
function changeVideo(videoSrc) {
    const iframe = document.querySelector('.player iframe');
    iframe.src = videoSrc;
}
document.getElementById('currentYear').textContent = new Date().getFullYear();