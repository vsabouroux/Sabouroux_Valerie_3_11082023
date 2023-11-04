// Ajout de l'événement click sur le bouton "modifier"de la page accueil "loguée" pour ouvrir la modale
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

const cadrePhoto = document.querySelector(".cadre-photo");
const photoIcon = document.querySelector(".fa-regular.fa-image");
const detailsImg = document.querySelector(".cadre-photo .detailsImg");
const uploadButton = document.getElementById("uploadButton");
const imageUploaded = document.querySelector("file");
const imgInput = document.getElementById("img");
const imagePreview = document.getElementById("imagePreview");
const ajoutSubmitButton = document.querySelector(".valider-button");

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
  photoIcon.style.display = "block";
  uploadButton.style.display = "block";
  detailsImg.style.display = "block";
  imagePreview.style.display = "none";
  resetForm(); // Appelle la fonction pour réinitialiser le formulaire
}
// Fonction pour ouvrir la 2ème modale
function ouvrirModalPhoto() {
  modalAjoutPhoto.style.display = "block";
}
//Fonction pour revenir à la page précédente
function revenirPagePrecedente() {
  modal.style.display = "block";
  photoIcon.style.display = "block";
  uploadButton.style.display = "block";
  detailsImg.style.display = "block";
  imagePreview.style.display = "none";
}

if (modifierButton) {
  // Ecoute du click sur bouton "modifier" à côté de "Projets" sur page "loguée"
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

// Sélection de la DEUXIEME modale

// Gestion de l'événement pour ouvrir la deuxième modale
ajouterPhotoButton.addEventListener("click", () => {
  // Affiche la deuxième modale
  ouvrirModalPhoto();
  //Gestion de l'événement pour fermer la  modale
  closeBtn.addEventListener("click", fermerModal);
  fermerModal();
});
uploadButton.addEventListener("click", (e) => {
  e.preventDefault();
  // Ouvre la boîte de dialogue de sélection de fichiers
  console.log(imgInput);
  imgInput.click();
});

imgInput.addEventListener("change", (event) => {
  const selectedFile = event.target.files[0]; // Récupère le fichier sélectionné

  if (selectedFile) {
    // Ajoute l'image à l'élément "imagePreview" pour affichage
    const imagePreview = document.getElementById("imagePreview");
    imagePreview.src = URL.createObjectURL(selectedFile);
    imagePreview.style.display = "block";
    // Une image a été sélectionnée, alors l'icône, le bouton et le texte sont masqués
    photoIcon.style.display = "none";
    uploadButton.style.display = "none";
    detailsImg.style.display = "none";
    imagePreview.style.display = "block";
  } else {
    // Aucune image n'a été sélectionnée, alors l'icône, le bouton et le texte restent dans le cadre-photo
    photoIcon.style.display = "block";
    uploadButton.style.display = "block";
    detailsImg.style.display = "block";
    imagePreview.style.display = "none";
  }
});

// GESTION du formulaire en cours pour réinitialiser le formulaire d'ajout qd l'utilisateur à cliquer sur le bouton "valider"
// Ajout gestionnaire d'événement click au bouton de fermeture (X)
closeBtnPhoto.addEventListener("click", fermerModalPhoto);
//fermerModalPhoto();
backArrow.addEventListener("click", revenirPagePrecedente);
backArrow.addEventListener("click", fermerModalPhoto);

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

formPhoto.addEventListener("submit", (e) => {
  e.preventDefault();
  envoyerImageAuServeur();

  //Pour réinitialiser le formulaire après envoi des données au serveur
  formPhoto.reset();
});

//Fonction pour réinitialiser le formulaire si l'utilisateur ne va pas au bout du formulaire
function resetForm() {
  const imagePreview = document.getElementById("imagePreview");
  const titreInput = document.getElementById("title");
  const categorieSelect = document.getElementById("categorie");

  // Réinitialise les champs du formulaire
  imagePreview.style.display = "none";
  titreInput.value = "";
  categorieSelect.selectedIndex = 0;
  imgInput.value = ""; // Réinitialise le champ de téléchargement de fichier

  disabledBtnSubmit();
}
// Changement du style du bouton"valider" quand l'utilisateur a correctement renseigné le formulaire d'ajout de photo
// Celui-ci passe du gris au vert
// Fonction pour vérifier les conditions et mettre à jour le style du bouton "Valider"
const titreInput = document.getElementById("title");
function checkFormValidity() {
  console.log("Bouton avant mise à jour :", ajoutSubmitButton.classList);
  if (imgInput.files.length > 0 && titreInput.value.trim() !== "") {
    ajoutSubmitButton.classList.remove("valider-button-disabled");
    ajoutSubmitButton.classList.add("valider-button-enabled");
    ajoutSubmitButton.disabled = false;
  } else {
    disabledBtnSubmit();
  }
  console.log("Bouton après mise à jour :", ajoutSubmitButton.classList);
}

function disabledBtnSubmit() {
  ajoutSubmitButton.classList.remove("valider-button-enabled");
  ajoutSubmitButton.classList.add("valider-button-disabled");
  ajoutSubmitButton.disabled = true;
}

// Écoute des événements "input" sur les champs du formulaire
imgInput.addEventListener("input", checkFormValidity);
titreInput.addEventListener("input", checkFormValidity);

// Au chargement de la page, vérifie l'état initial du bouton "Valider"
