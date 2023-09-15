// une fois que l'API aura reçu les identifiants de l'utilisateur, je veux stocker en local ces données pour les gérer + userID+token
window.localStorage.setItem("email", "motdepasse", "userId", "token");
/**je veux récupérer le nom et l'email du user donc
 * je dois "écouter" qd celui-ci clique ur le bouton submit ou qu'il fait entrée ds le champ du mdp***/
let form = document.querySelector("form");

let baliseEmail = document.getElementById("email");
let valeurEmail = baliseEmail.value;
if (valeurEmail === "") {
  console.log("Le champ e-mail est vide");
} else {
  console.log("Le champ e-mail est rempli");
}
let baliseMotDePasse = document.getElementById("motdepasse");
baliseMotDePasse = baliseMotDePasse.value;
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // pourquoi le console.log(motdepasse) ne s'affiche pas ???
  //Utilisation des expressions régulières pour décrire le format des chaînes de caractères avec RegExp
  //revoir comment s'utilise regex101.com
  //   let chaine = "test";
  //  let regex = newRegExp ("^[a-z 0-9._-]$");
  //   let resultat = regex.test(chaine);
  // console.log(resultat);
});
//construction charge utile pour envoyer requête qui permettra d'ajouter les identifiants du user ds l'API
let identifiants = {
  mailUtilisateur: document.querySelector("[name=email]").value,
  motDePasse: document.querySelector("[name=motdepasse]").value,
};
//transformation charge utile au format json
//revoir car pb fonction .parse pour envoyer les chaines de caractères 
const chargeUtile = JSON.stringify(identifiants);
//envoi données avec une requête POST
fetch("http://localhost:5678/api/works/users/login", {
  method: "POST",
  body: chargeUtile,
  headers: { "content-type": "application/json" }, //propriete concerne le format de la charge utile. Ici un objet au format json
})
.then(Response=> Response.json())
.then(data=> {
    if(data.success) {
        //à la fin il faudra une redirection vers page d'accueil plut^t que connexion réussie
        messageRenvoye.innerText = 'Connexion réussie';
    } else {
        messageRenvoye.innerText = "l'email et/ou le mot de passe sont incorrects"
    }
})
.catch (error => {
    console.error("Erreur lors de la requête POST :", error);
})
;
