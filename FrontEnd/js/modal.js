// Ajout de l'événement click sur le bouton "modifier"de la page accueil "loguée" pour ouvrir la modale
// Récupération des éléments DOM, MAIS est-ce que l'on peut ls récupérer lorsqu'ils sont créés depuis js ?
//const buttonModifier = document.querySelector(".modifier-button");
const modifierButton = document.querySelector(".modifier-button");
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close");
const modalcontent = document.querySelector(".modal-content");
const modalAjoutPhoto = document.getElementById("modal-ajout-photo");
const ajouterPhotoButton = document.querySelector(".add-new-projet");
const imageNewProjet = document;

// Fonction pour fermer la modale
function fermerModal() {
  modal.style.display = "none";
}
// Fonction pour ouvrir la modale
function ouvrirModal() {
  modal.style.display = "block";
}

// Fonction pour fermer la modale
function fermerModalPhoto() {
  modalAjoutPhoto.style.display = "none";
}
// Fonction pour ouvrir la modale
function ouvrirModalPhoto() {
  modalAjoutPhoto.style.display = "block";
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

//Ecoute de l'événement clic pour redirection vers la 2ème modale
// ajouterPhoto.addEventListener("click", () => {
//   //je ferais bien une fonction "ouvrir 2ème modale" dans la fonction genererProjetsInModal
// });

// Sélection de la deuxième modale

// Gestionnaire d'événement pour ouvrir la deuxième modale
ajouterPhotoButton.addEventListener("click", () => {
  // Affiche la deuxième modale
  ouvrirModalPhoto();
  //pour envoyer les choix de catégories sur la page web pour que l'utilisateur en sélectionne une
  const categorieSelect = document.getElementById("categorie");

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categorieSelect.appendChild(option);
  });
  //pour ajouter une photo et la placer dans l'espace créé à cet effet
  const ajouterNewPhoto = document.getElementById("img");

  const uploadButton = document.getElementById("uploadButton");

  uploadButton.addEventListener("click", () => {
    fileInput.click(); // Ouvre la boîte de dialogue de sélection de fichiers

    fileInput.addEventListener("change", (event) => {
      const selectedFile = event.target.files[0]; // Récupère le fichier sélectionné

      if (selectedFile) {
        const image = new Image();
        image.src = URL.createObjectURL(selectedFile);

        // Ajoute l'image à l'élément "ajouterNewPhoto"
        ajouterNewPhoto.appendChild(image);

        // Ferme la modal après avoir ajouté la photo
        fermerModalPhoto();
      }
    });
  });

  fermerModal();
});
