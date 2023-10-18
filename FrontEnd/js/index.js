let categories = [];

// récupération des WORKS sur le localhost du BackEnd dans lesquels il y a la catégorie embarquée
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((projets) => {
    console.log(projets);
    genererProjets(projets);
    genererCategories(categories, projets);
    console.log(categories);
    genererProjetsInModal(projets);
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
    // avec find c'est plus simple
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

    createCategorieOption(category);
  }
}

function createCategorieOption(category) {}

function filterWorks(nameCategory, projets, btn) {
  const exActiveFilter = document.querySelector(".filtres button.active");
  exActiveFilter.classList.remove("active");
  btn.classList.add("active");

  if (nameCategory === "Tous") {
    genererProjets(projets);
  } else {
    const projetsFiltres = projets.filter(
      (projet) => projet.category.name === nameCategory
    );
    genererProjets(projetsFiltres);
  }
}

function genererProjetsInModal(projets) {
  const projetsModal = document.querySelector(".projets-modal");
  //probleme avec "deleteProjet" ???
  const deleteProjet = document.querySelector(".projets-modal");
  projetsModal.innerHTML = ""; // Efface le contenu précédent de la modal

  projets.forEach((projet) => {
    const projetDiv = document.createElement("div");
    projetDiv.classList.add("projet-modal");

    // Création de l'image du projet
    const imageElement = document.createElement("img");
    imageElement.src = projet.imageUrl;
    projetDiv.appendChild(imageElement);

    // Création du bouton "éditer" sous la photo mais pas fonctionnel
    const editButton = document.createElement("button");
    editButton.textContent = "éditer";
    editButton.classList.add("button", "editbutton");
    projetDiv.appendChild(editButton);

    // Création de l'icône "trash" en haut à droite de l'image
    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fas", "fa-trash", "trash-icon");
    projetDiv.appendChild(trashIcon);

    // Ajout du projet à la modal
    projetsModal.appendChild(projetDiv);

    // Gestion du clic sur l'icône "trash"
    trashIcon.addEventListener("click", () => {
      // Gestion du clic sur l'icône "trash"
      // Demander une confirmation à l'utilisateur avant de supprimer le projet
      const confirmation = window.confirm("Voulez-vous supprimer ce projet ?");

      if (confirmation) {
        // Supprimer le projet du DOM
        projetsModal.removeChild(projetDiv);

        // Vérification de l'authorisation pour supprimer le projet du serveur
        const token = localStorage.getItem("token");

        const requestOptions = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ajoutez le jeton d'authentification dans l'en-tête
          },
        };
        fetch(`http://localhost:5678/api/works/${projet.id}`, requestOptions)
          //method: "DELETE",
          //  body: chargeUtile,
          //  headers: { "content-type": "application/json" }, //pour l'instant cela ne fonctionne pas bien car je pense que cela vient du fait que je ne sais pas
          //encore dire que l'utilisateur qui veut supprimer le projet est bien authorisé à le faire puisque Token renvoyé
          //est-ce que cette partie devrait être dans la pge login avec la ref au Token ? si oui comment alors faire le lien avec cette pge ?
          .then((response) => {
            if (response.ok) {
              console.log("Le projet a été supprimé avec succès.");
            } else {
              console.error(
                "Une erreur s'est produite lors de la suppression du projet."
              );
            }
          })
          .catch((error) => {
            console.error(
              "Une erreur s'est produite lors de la suppression du projet :",
              error
            );
          });
      }
    });
  });
}
