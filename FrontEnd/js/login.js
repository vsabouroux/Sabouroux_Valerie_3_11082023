//Récupération du token pour stockage dans le localStorage (pour maintenir l'authentification de l'utilisateur pour qu'il puisse continuer à interagir sur le site)
//c'est le serveur qui crée ce token après envoi des infos par l'utilisateur
//const leToken =
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4";
// Stocker le token dans le localStorage
//localStorage.setItem("leToken", leToken);
//Vérification si le token a été correctement stocké
//const tokenStocke = localStorage.getItem("leToken");
//sans console.log comment vérifier que le token a bien été stocké ? certes avec getItem mais bon comment je le vois sans console.log ?!
//console.log("Token stocké :", localStorage.getItem("leToken"));

let form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const baliseEmail = document.getElementById("email");
  const baliseMotDePasse = document.getElementById("motdepasse");

  if (baliseEmail.value && baliseMotDePasse.value) {
    console.log("Le champ e-mail est rempli");

    //Suite de code
    //construction charge utile pour envoyer requête qui permettra d'ajouter les identifiants du user ds l'API
    const identifiants = {
      email: baliseEmail.value,
      password: baliseMotDePasse.value,
    };
    //transformation charge utile au format json
    //revoir car pb fonction .parse pour envoyer les chaines de caractères
    const chargeUtile = JSON.stringify(identifiants);

    //envoi données avec une requête POST
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      body: chargeUtile,
      headers: { "content-type": "application/json" }, //propriete concerne le format de la charge utile. Ici un objet au format json
    })
      .then((Response) => Response.json())
      .then((data) => {
        console.log("reponse du serveur:", data);
        if (data.token) {
          // Stocker le token dans le localStorage. l'API a vérifié que l'utilisateur est bien authorisé et à transformé son mail et mdp en une chaine de caractère "token" et le renvoie au client
          localStorage.setItem("leToken", data.token);
          // Rediriger vers la page d'accueil
          window.location.href = "index.html";
          //à partir du moment où il y a un token ds le localStorage alors afficher la barre d'étition et les 2 boutons (new version) pour les modifs sur la page HTML
          //création des éléments barre noire avec boutons "mode édition" et modifier et icon fontawsome
        } else {
          // Afficher un message d'erreur
          const messageRenvoye = document.querySelector(".message");
          messageRenvoye.innerHTML =
            "L'email et/ou le mot de passe sont incorrects";
        }
        // if (data.message) {
        // window.location.href = "index.html";
        //} else {
        //const messageRenvoye = document.querySelector(".message");
        //messageRenvoye.innerHTML =
        //"l'email et/ou le mot de passe sont incorrects";
      })
      //})
      .catch((error) => {
        console.error("Erreur lors de la requête POST :", error);
      });
  }
});

//Utilisation des expressions régulières pour décrire le format des chaînes de caractères avec RegExp
//revoir comment s'utilise regex101.com
//   let chaine = "test";
//  let regex = newRegExp ("^[a-z 0-9._-]$");
//   let resultat = regex.test(chaine);
// console.log(resultat);
