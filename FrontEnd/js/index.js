let categories = [];

// récupération des WORKS sur le localhost du BackEnd dans lesquels il y a la catégorie embarquée
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((projets) => {
    console.log(projets);
    genererProjets(projets);
    genererCategories(categories, projets);
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
  //let divFiltres = document.querySelector(".filtres");
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

    // Création du tableau catégories sans doublon
    // Vérifie si l'élément existe déjà dans le tableau avec la méthode "some()" pour vérifier si un certain critère est vrai pour au moins un élément du tableau.
    //ici si l'id de la catégorie (ds le tableau) est strictement égal à l'id du projet
    const existe = categories.find(
      (category) => category.id === projet.category.id
    );
    // Si l'élément n'existe pas, l'ajouter au tableau. le ! indique le contraire donc ici si la catégorie n'existe pas ds le tableau alors on va l'ajouter
    if (!existe) {
      categories.push({
        id: projet.category.id,
        name: projet.category.name,
      });
    }
  }
}

function genererCategories(categories, projets) {
  //console.log(categories);
  //Gere l'affichage des catégories
  //const categoryElement = document.createElement("button"); //ce bouton placé ici  affiche autant de boutons que de projets et donc qd on appelle la fonction tous les boutons associés aux projets s'affichent !
  //categoryElement.innerText = projet.category.name;
  //genererCategories(categories, works);

  //Au clic d'un bouton de catégorie, afficher les projets par catégorie
  divFiltres = document.querySelector(".filtres");

  // Création du bouton "Tous"
  const btnTous = document.createElement("button");
  btnTous.innerText = "Tous";
  btnTous.classList.add("active");

  btnTous.addEventListener("click", () => {
    filterWorks("Tous", projets, btnTous);
  });

  divFiltres.appendChild(btnTous);

  for (const category of categories) {
    // Création des boutons pour chaque catégorie
    const btnCategory = document.createElement("button");

    btnCategory.innerText = category.name;
    btnCategory.addEventListener("click", () => {
      filterWorks(category.name, projets, btnCategory);
    });

    divFiltres.appendChild(btnCategory);
  }
}

function filterWorks(category, projets, btn) {
  const exActiveFilter = document.querySelector(".filtres button.active");
  exActiveFilter.classList.remove("active");
  btn.classList.add("active");

  if (category === "Tous") {
    genererProjets(projets);
  } else {
    const projetsFiltres = projets.filter(
      (projet) => projet.category.name === category
    );
    genererProjets(projetsFiltres);
  }
}
