// Ajout de l'événement click sur le bouton "modifier"de la page accueil "loguée" pour ouvrir la modale
// Récupération des éléments DOM, MAIS est-ce que l'on peut ls récupérer lorsqu'ils sont créés depuis js ?
//const buttonModifier = document.querySelector(".modifier-button");
const modifierButton = document.querySelector(".modifier-button");
const modal = document.getElementById("modal");
const closeBtn = document.querySelector(".close");
const modalcontent = document.querySelector(".modal-content");
const modalAjoutPhoto = document.getElementById("modal-ajout-photo");
//ajouterPhotoButton concerne le bouton sur la 1ère modale
const ajouterPhotoButton = document.querySelector(".add-new-projet");
//concerne la 2ème modale
const uploadButton = document.getElementById("uploadButton");
const imageUploaded = document.querySelector("file");

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

  // Fonction pour envoyer l'image au serveur avec titre et catégorie
  function envoyerImageAuServeur(imageUploaded, title, categorie) {
    const formData = new FormData();
    formData.append("image", imageUploaded);
    formData.append("title", title);
    formData.append("category.id", categorie);
    console.log(imageUploaded, title, categorie);
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log("L'image a été téléchargée avec succès.");
          // Ajoutez ici la logique pour gérer la réponse du serveur, si nécessaire.
        } else {
          console.error(
            "Une erreur s'est produite lors du téléchargement de l'image."
          );
        }
      })
      //sert à comprendre l'erreur de code ?
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors du téléchargement de l'image :",
          error
        );
      });
  }

  const imgInput = document.getElementById("img");

  uploadButton.addEventListener("click", () => {
    // Ouvre la boîte de dialogue de sélection de fichiers
    imgInput.click();
  });
  imgInput.addEventListener("change", (event) => {
    const selectedFile = event.target.files[0]; // Récupère le fichier sélectionné

    if (selectedFile) {
      const titreInput = document.getElementById("title");
      const titre = titreInput.value;

      const categorieSelect = document.getElementById("categorie");
      const selectedCategoryId = categorieSelect.value;

      // Envoyer l'image au serveur avec le titre et l'ID de catégorie sélectionnée
      envoyerImageAuServeur(selectedFile, titre, selectedCategoryId);

      // Ajoute l'image à l'élément "imagePreview" pour affichage
      const imagePreview = document.getElementById("imagePreview");
      imagePreview.src = URL.createObjectURL(selectedFile);
      imagePreview.style.display = "block";

      // Ferme la modal après avoir ajouté la photo
      fermerModalPhoto();
      //manque l'envoi de la nouvelle photo sur la page web
    }
  });
});
fermerModal();
