// une fois que l'API aura reçu les identifiants de l'utilisateur, je veux stocker en local ces données pour les gérer + userID+token
// window.localStorage.setItem("email", "motdepasse", "userId", "token");
/**je veux récupérer le nom et l'email du user donc
 * je dois "écouter" qd celui-ci clique ur le bouton submit ou qu'il fait entrée ds le champ du mdp***/
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
        if (data.success) {
          //à la fin il faudra une redirection vers page d'accueil plut^t que connexion réussie
          // messageRenvoye.innerText = "Connexion réussie";
        } else {
          // messageRenvoye.innerText =
          // "l'email et/ou le mot de passe sont incorrects";
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête POST :", error);
      });
  }
});
// pourquoi le console.log(motdepasse) ne s'affiche pas ???
//Utilisation des expressions régulières pour décrire le format des chaînes de caractères avec RegExp
//revoir comment s'utilise regex101.com
//   let chaine = "test";
//  let regex = newRegExp ("^[a-z 0-9._-]$");
//   let resultat = regex.test(chaine);
// console.log(resultat);
