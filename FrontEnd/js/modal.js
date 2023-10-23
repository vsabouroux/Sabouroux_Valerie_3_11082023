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
const formPhoto = document.getElementById("formPhoto"); //pour réinitialiser le formulaire
//Concerne la 2ème modale
//Pour ouvrir, fermer et revenir en arrière sur la 2ème modale
const closeBtnPhoto = document.querySelector(".closePhoto");
const backArrow = document.getElementById("backArrow");
// Création de l'icône "image" dans le cadre bleuté de l'ajout photo ça NE FONCTIONNE PAS !!!
//const cadrePhoto = document.querySelector(".ajout-newPhotoProjet");
const cadrePhoto = document.querySelector(".cadre-photo");
const photoIcon = document.createElement("i");
photoIcon.classList.add("fa-regular", "fa-image");
//const formatImage = document.createElement("p");
//formatImage.innerText = "jpg, png : 4mo max";
const uploadButton = document.getElementById("uploadButton");

const imageUploaded = document.querySelector("file");

const imgInput = document.getElementById("img");
const ajoutSubmitButton = document.getElementById("ajout-submit");

// Fonction pour fermer la 1ère modale
function fermerModal() {
  modal.style.display = "none";
}
// Fonction pour ouvrir la 1ère modale
function ouvrirModal() {
  modal.style.display = "block";
}

// Fonction pour fermer la 2ème modale
function fermerModalPhoto() {
  modalAjoutPhoto.style.display = "none";

  // Pour mise à jour du style du bouton lorsque l'utilisateur a téléchargé une photo
  ajoutSubmitButton.classList.remove("button-disabled");
  ajoutSubmitButton.classList.add("button-enabled");
}
// Fonction pour ouvrir la 2ème modale
function ouvrirModalPhoto() {
  modalAjoutPhoto.style.display = "block";
}
//Fonction pour revenir à la page précédente
function revenirPagePrecedente() {
  modal.style.display = "block";
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

// Gestion de l'événement pour ouvrir la deuxième modale
ajouterPhotoButton.addEventListener("click", () => {
  // Affiche la deuxième modale
  ouvrirModalPhoto();
  //Gestion de l'événement pour fermer la  modale
  closeBtn.addEventListener("click", fermerModal);
  fermerModal();
  //modalAjoutPhoto.addEventListener("click", (event) => {
  //  event.stopPropagation();
  // });
});
uploadButton.addEventListener("click", () => {
  // Ouvre la boîte de dialogue de sélection de fichiers
  imgInput.click();
});

imgInput.addEventListener("change", (event) => {
  const selectedFile = event.target.files[0]; // Récupère le fichier sélectionné

  if (selectedFile) {
    // Ajoute l'image à l'élément "imagePreview" pour affichage
    const imagePreview = document.getElementById("imagePreview");
    imagePreview.src = URL.createObjectURL(selectedFile);
    imagePreview.style.display = "block";
  }
});

// GESTION du formulaire en cours pour réinitialiser le formulaire d'ajout qd l'utilisateur à cliquer sur le bouton "valider"
// Ajout gestionnaire d'événement click au bouton de fermeture (X)
closeBtnPhoto.addEventListener("click", fermerModalPhoto);
fermerModalPhoto();
backArrow.addEventListener("click", revenirPagePrecedente);
backArrow.addEventListener("click", fermerModalPhoto);

// Ferme la modal après avoir ajouté la photo
// Fonction pour envoyer l'image au serveur avec titre et catégorie
function envoyerImageAuServeur() {
  const imageUploaded = imgInput.files[0];

  const titreInput = document.getElementById("title");
  const titre = titreInput.value;

  const categorieSelect = document.getElementById("categorie");
  const selectedCategoryId = categorieSelect.value;

  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("image", imageUploaded);
  formData.append("title", titre);
  formData.append("category", selectedCategoryId);
  console.log(imageUploaded, titre, selectedCategoryId);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        console.log("L'image a été téléchargée avec succès.");

        init();

        fermerModalPhoto();
      } else {
        console.error(
          "Une erreur s'est produite lors du téléchargement de l'image."
        );
      }
    })
    //sert à comprendre l'erreur de code
    .catch((error) => {
      console.error(
        "Une erreur s'est produite lors du téléchargement de l'image :",
        error
      );
    });
}
cadrePhoto.appendChild(photoIcon);
//cadrePhoto.appendChild(formatImage);
formPhoto.addEventListener("submit", (e) => {
  e.preventDefault();
  envoyerImageAuServeur();

  // Réinitialise le style du bouton
  ajoutSubmitButton.classList.remove("button-enabled");
  ajoutSubmitButton.classList.add("button-disabled");
  formPhoto.reset();
});
