(function () {
  const autenticado = sessionStorage.getItem("autenticado");

  if (!autenticado) {
    window.location.href = "https://feliperodrigues.net/confere-mega";
  }
})();
