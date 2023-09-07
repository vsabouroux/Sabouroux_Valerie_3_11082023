// récupération des WORKS sur le localhost du BackEnd dans lesquels il y a la catégorie embarquée
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((projets, categories) => {
    console.log(projets, categories);
    genererProjets(projets);
  })
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors de la récupération des données :",
      error
    );
  });

//utilisation await et async pour récupérer les catégories embarquées ds works et attendre les traitements à venir

//Chaque projet "embarque" la CATEGORIE donc idée d'inserer dans la boucle for of l'écoute du clic
//Gestion des boutons

function genererProjets(projets) {
  const divGallery = document.querySelector(".gallery");
  divGallery.innerHTML = "";

  for (const projet of projets) {
    //choix et création balises du DOM
    // const projet = projets[i]; "for ...of" remplace la boucle for avec i i++ and so on

    const projetElement = document.createElement("div");
    //création des balises du projet
    const imageElement = document.createElement("img");
    imageElement.src = projet.imageUrl;
    const titleElement = document.createElement("h3");
    titleElement.innerText = projet.title;
    // const categoryElement = document.createElement("p");
    // categoryElement.innerText = projet.category.name;
    //const categoryElement = document.createElement("button"); //ce bouton placé ici  affiche autant de boutons que de projets et donc qd on appelle la fonction tous les boutons associés aux projets s'affichent !
    //categoryElement.innerText = projet.category.name;

    // liaisons pour affichage sur la page web
    divGallery.appendChild(projetElement);
    projetElement.appendChild(imageElement);
    projetElement.appendChild(titleElement);
    // projetElement.appendChild(categoryElement);
    //divFiltres.appendChild(categoryElement);

    // création boutons catégories + boutons "Tous"

    const divFiltres = document.querySelector(".filtres");
    divFiltres.innerHTML = "";
    const tousBouttonElement = document.createElement("button");
    tousBouttonElement.innerText = "Tous";
    const categoryElement = document.createElement("button");
    categoryElement.innerText = projet.category.name;

    // liaisons pour affichage sur la page web
    divFiltres.appendChild(tousBouttonElement);
    divFiltres.appendChild(categoryElement);
  }
}

// Création d'une fonction "projetsFiltres" projets filtrés parmi les projets
// function genererProjetsFiltres(projets, categorieFiltree) {

//function genererProjetsFiltres(projets, categorieFiltree) {
// const divFiltres = document.querySelector(".filtres");
// divFiltres.innerHTML = "";

// const categories = [fetch("http://localhost:5678/api/categories")];
///  for (const projet of projets) {
//création des balises
//  const category = projet.category.name;
//  if (!categories.includes(category)) {
//    categories.push(category);
//  }
// }

// liaisons avec le DOM
//divFiltres.appendChild(projetFiltre);

//projetFiltre.appendChild(boutonsElement);
//}
//Gestion des boutons. Il faut comprendre quel est le bouton que l'utilisateur a cliqué pour pouvoir filtrer les projets en fonction du bouton
// et création du bouton "Tous"
//const tousButton = document.createElement("button");
//tousButton.innerText = "Tous";
//tousButton.addEventListener("click", () => {
// genererProjets(projets);
//  divFiltres.appendChild(tousButton);
//});

//for (const category of categories) {
// const boutonElement = document.createElement("button");
// boutonElement.innerText = category;
// boutonElement.addEventListener("click", () => {
//   const projetsFiltres = projets.filter(
//    (projet) => projet.category.name === category
//   );
//   genererProjets(projetsFiltres); // Afficher les projets filtrés
// });
//  divFiltres.appendChild(boutonElement);
//}

//} else {
//   boutonsElement.addEventListener("button", function(event) => {
//    const projetsFiltres = projets.filter (projet) {
//      return projet.category === category.name;
//   }}
//     genererProjetsFiltres(projets)
