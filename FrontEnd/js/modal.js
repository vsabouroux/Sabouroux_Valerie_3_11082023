if (token) {
  // Récupérez les éléments DOM pertinents
  const btnModifier = document.getElementById("btnModifier");
  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".close");

  // Fonction pour ouvrir la modale
  btnModifier.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Fonction pour fermer la modale
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Fermez la modale si l'utilisateur clique en dehors de celle-ci
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}
