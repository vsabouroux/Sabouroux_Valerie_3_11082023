// récupération des WORKS sur le localhost du BackEnd
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((projets) => {
    // Traitement des données récupérées ici
    console.log(projets);
    genererProjets(projets);
  })
  .catch((error) => {
    console.error(
      "Une erreur s'est produite lors de la récupération des données :",
      error
    );
  });
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
    const categoryElement = document.createElement("button");
    categoryElement.innerText = projet.category.name;

    // liaisons pour affichage sur la page web
    divGallery.appendChild(projetElement);
    projetElement.appendChild(imageElement);
    projetElement.appendChild(titleElement);
    divFiltres.appendChild(categoryElement);
  }
}
//creation des boutons
const divFiltres = document.querySelector(".filtres");

const boutonTous = document.querySelector(".filter_active");
boutonTous.addEventListener("click", function () {
  genererProjets(projets);
});
// fonction .filter pour les autres boutons
