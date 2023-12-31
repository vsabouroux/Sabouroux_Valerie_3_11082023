let categories = [];

// récupération des WORKS sur le localhost du BackEnd dans lesquels il y a la catégorie embarquée
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((projets) => {
    console.log(projets);
    genererProjets(projets);
    console.log(categories);
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
  let divFiltres = document.querySelector(".filtres");
  divGallery.innerHTML = "";

  for (const projet of projets) {
    //choix et création balises du DOM
    // const projet = projets[i]; "for ...of" remplace la boucle for avec i i++ and so on
    categories.push({
      id: projet.category.id,
      name: projet.category.name,
    });
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

    //const categoryElement = document.createElement("button"); //ce bouton placé ici  affiche autant de boutons que de projets et donc qd on appelle la fonction tous les boutons associés aux projets s'affichent !
    //categoryElement.innerText = projet.category.name;
    //genererCategories(categories, works);

    //Au clic d'un bouton de catégorie, afficher les projets par catégorie
    divFiltres = document.querySelector(".filtres");

    // Création du bouton "Tous"
    const btnTous = document.createElement("button");
    btnTous.innerText = "Tous";
    btnTous.addEventListener("click", () => filterWorks("Tous"));
    divFiltres.appendChild(btnTous);

    // Création des boutons pour chaque catégorie
    const btnCategory = document.createElement("button");
    btnCategory.innerText = projet.category.name;
    btnCategory.addEventListener("click", () => filterWorks(projet.category.name));
    divFiltres.appendChild(btnCategory);

   // for (const categorie of categories) {
   //   const btnCategorie = document.createElement("button");
     // btnCategorie.innerText = categorie.name;
     // btnCategorie.addEventListener("click", () => filterWorks(categorie.name));
     // divFiltres.appendChild(btnCategorie);
    //}
  }

  function filterWorks(category) {
    const divGallery = document.querySelector(".gallery");
    divGallery.innerHTML = "";

    if (category === "Tous") {
      genererProjets(projets);
    } else {
      const projetsFiltres = projets.filter(
        (projet) => projet.category.name === category
      );
      genererProjets(projetsFiltres);
    }
  }
}
//////////////reste les doublons des boutons à supprimer boucles en boucle !!!/////////: