//il faut mettre cette partie sur la page concernée !
const token = localStorage.getItem("token");
//création des éléments barre noire avec boutons "mode édition" et modifier et icon fontawsome
//comment vérifier que le token est bien récupéré ?
console.log(token);
if (token) {
  // Création de la barre noire
  const blackBar = document.createElement("div");
  blackBar.classList.add("black-bar"); // Ajout d'une classe CSS pour le style

  // Création de l'icône Font Awesome
  const icon = document.createElement("i");
  icon.classList.add("fa-regular", "fa-edit"); // Ajouter les classes pour l'icône d'édition

  // Création du bouton "Mode édition"
  const editButton = document.createElement("button");
  editButton.textContent = "Mode édition";
  editButton.classList.add("edit-button"); // Ajout d'une classe pour le style

  // Ajout de ces éléments ds le DOM
  document.body.insertBefore(blackBar, document.body.firstChild); // Insertion la barre noire avant le header
  blackBar.appendChild(icon); // Ajout de  l'icône à la barre noire
  blackBar.appendChild(editButton); // Ajout du bouton à la barre noire

  //   Ajoute le systemen pour afficher "logout"
}

// Fonction de déconnexion (Clear le locaStorage et recharger les pages)
