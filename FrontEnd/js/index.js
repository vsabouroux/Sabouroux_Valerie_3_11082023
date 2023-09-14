let categories = []; // Utilisation d'un tableau pour stocker les catégories

// récupération des WORKS sur le localhost du BackEnd dans lesquels il y a la catégorie embarquée
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((projets) => {
    console.log(projets);
    genererProjets(projets);
    console.log(categories);
    genererCategories(categories); // works
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

    // liaisons pour affichage sur la page web
    divGallery.appendChild(projetElement);
    projetElement.appendChild(imageElement);
    projetElement.appendChild(titleElement);

    // ajoute const pour catégorie et alimenter le tableau sans doublon
    const categorieName = projet.category.name;
    if (!categories.includes(categorieName)) {
      categories.push({
        id: projet.category.id,
        name: projet.category.name,
      });
    }
  }
}
//j'ai enlevé works ds () de la fonction ci-dessous
function genererCategories(categories) {
  divFiltres = document.querySelector(".filtres");

  for (const categorie of categories) {
    //Créer element "element"
    const categorieElement = document.createElement("button");
    categorieElement.innerText = categorie.name;
    console.log(categorie.name);

    // element.addEventListener (filterWorks())
    categorieElement.addEventListener("click", () => {
      filterWorks(categorie); // Appel de la fonction de filtrage avec la catégorie sélectionnée
    });

    divFiltres.appendChild(categorieElement);
  }
}

function filterWorks(selectedCategory) {
  // genererProjets(projets);
  const divGallery = document.querySelector(".gallery");
  divGallery.innerHTML = ""; // Efface le contenu précédent de la galerie
}
