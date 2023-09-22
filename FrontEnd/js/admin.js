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
  document.body.insertBefore(blackBar, document.body.firstChild); // Insertion de la barre noire avant le header
  blackBar.appendChild(icon); // Ajout de  l'icône à la barre noire
  blackBar.appendChild(editButton); // Ajout du bouton à la barre noire

  //Mode édition sans les catégories
  //récupération des boutons puis les cacher jusqu'au clic sur logout
  const categories = document.querySelectorAll(".filtres");
  categories.forEach((category) => {
    category.style.display = "none";
  });

  //   Ajoute le systeme pour afficher "logout"
  //qd l'utilisateur est correctement connecté alors le bouton "logout" remplace "login"
  // Création du bouton "logout" pour remplacer le lien de connexion
  const btnLogin = document.querySelector("nav li a[href='login.html']");
  const logoutButton = document.createElement("button");
  logoutButton.textContent = "Logout";
  logoutButton.classList.add("logout"); // Ajout d'une classe pour le style

  // Pour remplacer le lien de connexion par le bouton "logout"
  if (btnLogin) {
    //.replaceChild() : C'est une méthode DOM JavaScript qui permet de remplacer un enfant d'un élément
    // par un autre. Dans ce cas, on remplace btnLogin par logoutButton dans l'élément parent de btnLogin.
    btnLogin.parentNode.replaceChild(logoutButton, btnLogin);
  }
}
// Fonction de déconnexion (Clear le locaStorage et recharger les pages)
//localStorage.removeItemItem("token");
function deconnexion() {
  const logoutButton = document.querySelector(".logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      // Supprimez le token du localStorage (déconnexion)
      localStorage.removeItem("token");
      // Redirigez l'utilisateur vers la page d'accueil
      window.location.href = "index.html";
    });
  }
}
deconnexion();
