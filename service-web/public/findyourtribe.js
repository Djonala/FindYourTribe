
                            // écrit dans la console du navigateur dès que le script est chargé
                            // dans le <head> du html
                            console.log('ça marche !');




                            /** ----------------------------------------------------------------------------
                             * PARTIE 1 : réagir à l'événement de clique sur le bouton du formulaire
                             * @see https://developer.mozilla.org/fr/docs/Web/API/Document_Object_Model/Les_%C3%A9v%C3%A8nements_et_le_DOM
                             * -------------------------------------------------------------------------- */
                            // ici on diffère l'exécution de notre code
                            // au déclenchement de l'événement DOMContentLoaded envoyé par le navigateur
                            // lorsque la page est complètement chargée (HTML et CSS affichés à l'écran)
document.addEventListener('DOMContentLoaded', function() {
    console.log('Le chargement de la page est terminé');

                            // recherche le bouton du formulaire par un sélecteur CSS
                            // que l'on met dans la variable 'submit'
    const submit = document.querySelector('input[type="submit"]');
    console.log('Bouton Submit', submit);

                            // la variables submit est un object sur lequel on peut appeler des fonctions
                            // comme le addEventListener qui va nous permettre d'écouter et de réagir au click
                            // sur le bouton on déclenchant l'exécution de la fonction onClickSubmit
    submit.addEventListener('click', function() {
        console.log('Click sur le bouton submit');
    });
});

                            /** ----------------------------------------------------------------------------
                             * PARTIE 2 : récupérer les informations saisies dans le formulaire
                             * 
                             * Afin de clarifier le code, de l'optimiser et de le rendre réutilisable,
                             * ici nous dissocions la fonction de son context d'exécution : l'événement, en
                             * passant les fonctions callback en tant que VARIABLE.
                             * -------------------------------------------------------------------------- */

                            // ici, onContentLoaded fait référence à la fonction de même nom
                            // EN TANT QUE VARIABLE et non pas en tant que fonction exécutée.
                            // En plus simple, ne pas confondre les syntaxes :
                            // - onContentLoaded qui est la variable identifiant la fonction
                            // - onContentLoaded() qui exécute la fonction
document.addEventListener('DOMContentLoaded', onContentLoaded);

function onContentLoaded() { 
                            // recherche le formulaire de la page
    const form = document.querySelector('form');
    console.log('Formulaire', form);
                            // inscrit la fonction onFormSubmit à l'événement Submit
                            // envoyé par le navigateur lorsque le bouton <input type="submit"> 
                            // est actionné par l'utilisateur
            
    form.addEventListener('submit', onFormSubmit);

}


function onFormSubmit(event) {
                            // au submit du formulaire, le navigateur va donc déclencer l'exécution de
                            // cette fonction en passant un paramètre contenant les informations
                            // de l'événement lui-même et non du formulaire.
                            // En gros, dans event, on ne récupère pas les informations saisies dans le formulaire.
                            // Et pour éviter la soumission par défaut du formulaire, il faut l'annuler
                            // en appelant preventDefault() sur l'événement du navigateur pour lui indiquer
                            // de ne rien faire lorsque le formulaire est soumis.
  event.preventDefault();
                            // Ensuite, on récupère à la main les informations saisie dans les input
                           // Ensuite, on valide les champs un par un
  const formPrenom = checkPrenom()
  const formNom = checkNom()
  const formDDN = checkDDN()
  const formEmail = checkEmail()
  const formDepartement = checkDepartement()
  const formVille = checkVille()
  const formInstrument = checkInstrument()
  const formNomUtilisateur = checkNomUtilisateur()
  const formMDP = checkMDP()
  const formConfirmationMDP = checkConfirmationMDP()
  const formAvatar = checkAvatar()
 
  if (formPrenom && formNom && formDDN && formEmail && formDepartement && formVille && formInstrument && formNomUtilisateur && formMDP && formConfirmationMDP && formAvatar) {
    fetch('/inscription', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        prenom : formPrenom,
        nom : formNom,
        DDN : formDDN,
        email : formEmail,
        departement : formDepartement,
        ville : formVille,
        instrument : formInstrument,
        nomUtilisateur : formNomUtilisateur,
        motDePasse : formMDP,
        confirmationMotDePasse : formConfirmationMDP,
        avatar : formAvatar
      })
    }).then(function(response) {
      console.log(response);
      return response.json()
    }).then(function(responseJson) {
      console.log(responseJson);
    })
  }
}


//------------------------prenom-------
function checkPrenom() {
                      // défini l'id du span de message d'erreur que l'on va 
                      // réutiliser dans les fonctions 'displayErrorMessage'
  const spanErrorMessageId = 'prenom-error-message';
                      // recherche l'input 'prenom'
  const prenom = document.getElementById('formPrenom');
                      // défini la fonction callback de la fonction 'displayErrorMessage'
                      // qui sera appelée une fois le span créé par displayErrorMessage
                      // car c'est ici que l'on sait ou le span doit se placer.
                      //
                      // Pour rendre la fonction 'displayErrorMessage' réutilisable, elle demande au
                      // code qui l'appelle de lui fournir une fonction dans laquelle elle passe en paramètre le span
                      // de message d'erreur. Et c'est cette fonction callback qui sait
                      // ou doit se placer le span. Pas la fonction 'displayErrorMessage'.
                      // Dans notre cas, on sait que le span devra être placé après l'input dans notre document 
                      // html.
  const appendSpan = function(span) {
    prenom.after(span);
  }

                         // ici, on test le différentes validation
  if (!shouldNotBeNull(prenom)) {      // doit être renseigné
    displayErrorMessage(spanErrorMessageId, 'Champ obligatoire', appendSpan);
  } else if (!shouldHaveLength(prenom, 2)) {     // doit être de 2 lettres minimum
    displayErrorMessage(spanErrorMessageId, 'Le prenom doit être au moins de 2 lettres', appendSpan);
  } else {
                       // si pas d'erreur, on supprime les éventuelles erreurs précédentes
    removeErrorMessage(spanErrorMessageId);
    return prenom.value;
  }
}

// idem nom------------------------------------------------------
function checkNom() {
  const spanErrorMessageId = 'nom-error-message';
  const nom = document.getElementById('formNom');
  const appendSpan = function(span) {
    nom.after(span);
  }

  if (!shouldNotBeNull(nom)) {
    displayErrorMessage(spanErrorMessageId, 'Champ obligatoire', appendSpan);
  } else if (!shouldHaveLength(nom, 2)) {
    displayErrorMessage(spanErrorMessageId, 'Le nom doit être au moins de 2 lettres', appendSpan);
  } else {
    removeErrorMessage(spanErrorMessageId);
    return nom.value;
  }
}
//date de naissance-----------------------------------------------------------
function checkDDN() {
  const spanErrorMessageId = 'DDN-error-message';
  const DDN = document.getElementById('formDDN');
  const appendSpan = function(span) {
    DDN.after(span);
  }

  if (!shouldNotBeNull(DDN)) {
    displayErrorMessage(spanErrorMessageId, 'Champ obligatoire', appendSpan);
  } else if (!shouldHaveLength(DDN, 2)) {
    displayErrorMessage(spanErrorMessageId, 'La date de naissance doit être renseigné obligatoirement', appendSpan);
  } else {
    removeErrorMessage(spanErrorMessageId);
    return DDN.value;
  }
}
//idem Email----------------------------------------------------------
function checkEmail() {
    const spanErrorMessageId = 'email-error-message';
    const email = document.getElementById('formEmail');
    const appendSpan = function(span) {
      email.after(span);
    }
  
    if (!shouldNotBeNull(email)) {
      displayErrorMessage(spanErrorMessageId, 'Champ obligatoire', appendSpan);
    } else if (!shouldHaveLength(email, 2)) {
      displayErrorMessage(spanErrorMessageId, 'L\'email doit être renseigné obligatoirement', appendSpan);
    } else {
      removeErrorMessage(spanErrorMessageId);
      return email.value;
    }
  }

//idem departement-----------------------------------------------------------
function checkDepartement() {
    const spanErrorMessageId = 'departement-error-message';
    const departement = document.getElementById('formDepartement');
    const appendSpan = function(span) {
      departement.after(span);
    }
  
    if (!shouldNotBeNull(departement)) {
      displayErrorMessage(spanErrorMessageId, 'Champ obligatoire', appendSpan);
    } else if (!shouldHaveLength(departement, 2)) {
      displayErrorMessage(spanErrorMessageId, 'Le departement doit être renseigné obligatoirement', appendSpan);
    } else {
      removeErrorMessage(spanErrorMessageId);
      return departement.value;
    }
  }

  //idem ville -----------------------------------------------------------
function checkVille() {
  const spanErrorMessageId = 'ville-error-message';
  const ville = document.getElementById('formVille');
  const appendSpan = function(span) {
    ville.after(span);
  }

  if (!shouldNotBeNull(ville)) {
    displayErrorMessage(spanErrorMessageId, 'Champ obligatoire', appendSpan);
  } else if (!shouldHaveLength(ville, 2)) {
    displayErrorMessage(spanErrorMessageId, 'La ville doit être renseigné obligatoirement', appendSpan);
  } else {
    removeErrorMessage(spanErrorMessageId);
    return ville.value;
  }
}

//idem instrument-----------------------------------------------------------
function checkInstrument() {
  const spanErrorMessageId = 'instrument-error-message';
  const instrument = document.getElementById('formInstrument');
  const appendSpan = function(span) {
    instrument.after(span);
  }

  if (!shouldNotBeNull(instrument)) {
    displayErrorMessage(spanErrorMessageId, 'Champ obligatoire', appendSpan);
  } else if (!shouldHaveLength(instrument, 2)) {
    displayErrorMessage(spanErrorMessageId, 'L\'instrument doit être renseigné obligatoirement', appendSpan);
  } else {
    removeErrorMessage(spanErrorMessageId);
    return instrument.value;
  }
}

//idem nom utilisateur-----------------------------------------------------------
function checkNomUtilisateur() {
  const spanErrorMessageId = 'nom-utilisateur-error-message';
  const nomUtilisateur = document.getElementById('formNomUtilisateur');
  const appendSpan = function(span) {
    nomUtilisateur.after(span);
  }

  if (!shouldNotBeNull(nomUtilisateur)) {
    displayErrorMessage(spanErrorMessageId, 'Champ obligatoire', appendSpan);
  } else if (!shouldHaveLength(nomUtilisateur, 2)) {
    displayErrorMessage(spanErrorMessageId, 'Le nom utilisateur doit être renseigné obligatoirement', appendSpan);
  } else {
    removeErrorMessage(spanErrorMessageId);
    return nomUtilisateur.value;
  }
}

//idem mot de passe-----------------------------------------------------------
function checkMDP() {
  const spanErrorMessageId = 'mdp-error-message';
  const MDP = document.getElementById('formMDP');
  const appendSpan = function(span) {
    MDP.after(span);
  }

  if (!shouldNotBeNull(MDP)) {
    displayErrorMessage(spanErrorMessageId, 'Champ obligatoire', appendSpan);
  } else if (!shouldHaveLength(MDP, 2)) {
    displayErrorMessage(spanErrorMessageId, 'Le mot de passe doit être renseigné obligatoirement', appendSpan);
  } else {
    removeErrorMessage(spanErrorMessageId);
    return MDP.value;
  }
}

//idem confirmation mot de passe-----------------------------------------------------------
function checkConfirmationMDP() {
  const spanErrorMessageId = 'confirmation-MDP-error-message';
  const confirmationMDP = document.getElementById('formConfirmationMDP');
  const appendSpan = function(span) {
    confirmationMDP.after(span);
  }

  if (!shouldNotBeNull(confirmationMDP)) {
    displayErrorMessage(spanErrorMessageId, 'Champ obligatoire', appendSpan);
  } else if (!shouldHaveLength(confirmationMDP, 2)) {
    displayErrorMessage(spanErrorMessageId, 'La confirmation du mot de passe doit être renseigné obligatoirement', appendSpan);
  } else {
    removeErrorMessage(spanErrorMessageId);
    return confirmationMDP.value;
  }
}
//idem avatar-----------------------------------------------------------
function checkAvatar() {
  const spanErrorMessageId = 'avatar-error-message';
  const avatar = document.getElementById('formAvatar');
  const appendSpan = function(span) {
    avatar.after(span);
  }

  if (!shouldNotBeNull(avatar)) {
    displayErrorMessage(spanErrorMessageId, 'Champ obligatoire', appendSpan);
  } else if (!shouldHaveLength(avatar, 2)) {
    displayErrorMessage(spanErrorMessageId, 'L\'avatar doit être renseigné obligatoirement', appendSpan);
  } else {
    removeErrorMessage(spanErrorMessageId);
    return avatar.value;
  }
}

//------ Fonction du fichier validation --------------------------------------------
            // Cette fonction prend en paramètre un input
            // et retourne si sa valeur est définie ou non
            function shouldNotBeNull(input) {
              return !!input.value;
            }
            
                        // Cette fonction prend en paramètre un input
                        // et retourne si la longueur de sa valeur est supérieure
                        // ou égale au paramètre 'length' passé à la fonction.
                        //
                        // => le controle est ainsi dynamique car c'est
                        // le code qui appelle cette fonction qui décide de la longueur
                        // que la valeur doit respecter.
            function shouldHaveLength(input, length) {
              return input.value.length >= length;
            }
            
                        // Cette fonction prend en paramètre l'id du span
                        // qui doit être créé, ainsi que le message à afficher dans le span
                        // et une fonction callback qui est appelée pour placer dans le DOM le span
                        // créé.
            function displayErrorMessage(spanId, message, appendSpanFunction) {
                        // recherche un span existant avec l'id
              let span = document.getElementById(spanId);
              if (!span) {
                          // s'il n'existe pas, on le créer
                span = document.createElement('span');
                span.setAttribute('id', spanId);
                          // on appelle la fonction callback avec le span en paramètre
                          // qui doit le place dans le DOM.
                          // Ici, placer le span n'est pas de la responsabilité de cette fonction.
                          // C'est le code appelant qui sait où le span doit être placé.
                appendSpanFunction(span);
              }
                          // affiche le message dans le span
              span.innerHTML = message;
            }
            
                          // Cette fonction supprimer le span par son id
            function removeErrorMessage(spanId) {
              const span = document.getElementById(spanId);
              if (span) {
                span.remove();
              }
            }
