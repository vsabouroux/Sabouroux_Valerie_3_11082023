// Ajout de l'événement click sur le bouton "modifier"de la page accueil "loguée" pour ouvrir la modale
// Récupération des éléments DOM, MAIS est-ce que l'on peut ls récupérer lorsqu'ils sont créés depuis js ?
//const buttonModifier = document.querySelector(".modifier-button");
const modifierButton = document.querySelector(".modifier-button");
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close");
const modalcontent = document.querySelector(".modal-content");

//Récupération bouton "ajouter une photo" puis écoute évènement "click" sur ce bouton et enfin ouverture nouvelle modale pour ajouter une photo

// Fonction pour fermer la modale
function fermerModal() {
  modal.style.display = "none";
}
// Fonction pour ouvrir la modale
function ouvrirModal() {
  modal.style.display = "block";
}

if (modifierButton) {
  // Ecoute du click sur bouton "modifier" à côté de "Projets"
  modifierButton.addEventListener("click", ouvrirModal);
}

// Ajout gestionnaire d'événement click au bouton de fermeture (X)
closeBtn.addEventListener("click", fermerModal);

// Fermeture de la modale si l'utilisateur clique en dehors de celle-ci
modal.addEventListener("click", fermerModal);

// Stoper la propagation de fermeture de la modal
modalcontent.addEventListener("click", (event) => {
  event.stopPropagation();
});
