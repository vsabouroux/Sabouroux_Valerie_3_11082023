// Ajout de l'événement click sur le bouton "modifier"de la page accueil "loguée" pour ouvrir la modale
// Récupérez les éléments DOM pertinents
const btnModifier = document.querySelector(".modifier-button");
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close");

// Fonction pour ouvrir la modale lorsque le bouton est cliqué
function ouvrirModal() {
  modal.style.display = "block";
}

// Fonction pour fermer la modale
function fermerModal() {
  modal.style.display = "none";
}

// Ajout gestionnaire d'événement click au bouton "Modifier"
btnModifier.addEventListener("click", ouvrirModal);

// Ajout gestionnaire d'événement click au bouton de fermeture (X)
closeBtn.addEventListener("click", fermerModal);

// Ferme ture de la modale si l'utilisateur clique en dehors de celle-ci
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    fermerModal();
  }
});
ouvrirModal();
fermerModal();
