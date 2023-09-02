// récupération des WORKS sur le localhost du BackEnd
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((projets) => {
    // Traitement des données récupérées ici
    console.log(projets);
    genererProjets(projets);

    fetch("http://localhost:5678/api/categories")
      .then((response) => response.json())
      .then((categories) => {
        console.log(projets);
        filtrerProjetsParCategories(projets);
      });
  })
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors de la récupération des données :",
      error
    );
  });

// récupération des CATEGORIES sur le localhost du BackEnd
//fetch("http://localhost:5678/api/categories")
//  .then((response) => response.json())
// .then((categories) => {
//Fonction pour create les catégories et gestion du filtre

// Traitement des données récupérées ici
//1 - btn "tous" donc PAS DE TRI sur les projets
// const boutonFiltreTous = document.querySelector(".btn-tous");
// boutonFiltreTous.addEventListener("click", function () {
//   // on vide la page pour la remettre à jour du filtre
//   document.querySelector(".gallery").innerHTML = "";
//   genererProjets(projets);
// });
// //2 filtrer les projets pour récupérer QUE les "objets"
// const boutonObjets = document.querySelector(".btn-objets");

// boutonObjets.addEventListener("click", function () {
//   const projetsFiltres = projets.filter(function (projet) {
//     return projet.category.name === "Objets";
//   });
//   console.log(projetsFiltres);
//   //document.querySelector(".gallery").innerHTML ="";
//   //genererProjets (projetsFiltres);
// });
//   console.log(categories);
// })
// .catch((error) => {
//  console.error(
//  "Une erreur s'est produite lors de la récupération des données :",
//error
//   );
// });
//création d'une fonction filtreCategories qui permet au clic de filtrer les projets en fonction du choix de l'utilisateur
function filtrerProjetsParCategories(projets) {
  const divFiltres = document.querySelector(".filtres");
  for (const projet of projets) {
    const categoryElement = document.createElement("p");
    categoryElement.innerText = projet.category.name;

    divFiltres.appendChild(categoryElement);
  }
  console.log(categories);
}

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

    // liaisons pour affichage sur la page web
    divGallery.appendChild(projetElement);
    projetElement.appendChild(imageElement);
    projetElement.appendChild(titleElement);
  }
}
