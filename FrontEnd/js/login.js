//Récupération du token pour stockage dans le localStorage (pour maintenir l'authentification de l'utilisateur pour qu'il puisse continuer à interagir sur le site)
//c'est le serveur qui crée ce token après envoi des infos par l'utilisateur

let form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const baliseEmail = document.getElementById("email");
  const baliseMotDePasse = document.getElementById("motdepasse");

  if (baliseEmail.value && baliseMotDePasse.value) {
    console.log("Le champ e-mail est rempli");

    //construction charge utile pour envoyer requête qui permettra d'ajouter les identifiants du user ds l'API
    const identifiants = {
      email: baliseEmail.value,
      password: baliseMotDePasse.value,
    };
    //transformation charge utile au format json
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
          localStorage.setItem("token", data.token);
          // Rediriger vers la page d'accueil
          window.location.href = "index.html";
          //à partir du moment où il y a un token ds le localStorage alors afficher la barre d'étition et les 2 boutons (new version) pour les modifs sur la page HTML
          // Est-ce que le token existe dans le localStorage cf. admin.js le console.log
        } else {
          // Afficher un message d'erreur
          const messageRenvoye = document.querySelector(".message");
          messageRenvoye.innerHTML =
            "L'email et/ou le mot de passe sont incorrects";
        }
      })
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
