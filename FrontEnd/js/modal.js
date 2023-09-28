// Ajout de l'événement click sur le bouton "modifier"de la page accueil "loguée" pour ouvrir la modale
// Récupération des éléments DOM, MAIS est-ce que l'on peut ls récupérer lorsqu'ils sont créés depuis js ?
const buttonModifier = document.querySelector(".modifier-button");
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close");

// Ajout gestionnaire d'événement click au bouton "Modifier"
console.log(buttonModifier);
buttonModifier.addEventListener("click", ouvrirModal);
// Fonction pour ouvrir la modale lorsque le bouton "modifier"  est cliqué sur la pge accueil mode édition
function ouvrirModal() {
  console.log("Modal :", modal);
  modal.style.display = "block";
}
//j'appelle la fonction
ouvrirModal();
// Fonction pour fermer la modale
function fermerModal() {
  modal.style.display = "none";
}
// Ajout gestionnaire d'événement click au bouton de fermeture (X)
closeBtn.addEventListener("click", fermerModal);

// Fermeture de la modale si l'utilisateur clique en dehors de celle-ci
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    fermerModal();
  }
});
fermerModal();
