document.forms["commande"].addEventListener("submit", function(e) {
    e.preventDefault();
    console.log(document.forms);
    if (this["nom"] =! this["prenom"]) {
        
        $("#validationSaisieEmail").innerText = `les adresses email renseignées ne correspondent pas`

    }
})