
getData();
function getData() {
    if (localStorage.length == 0) {
        document.getElementById('listeProduits').innerHTML = 'Le panier est vide';
    }
    else {
        let totalPrice=0;
        for(let i = 0; i < localStorage.length; i++) {
            let teddy = JSON.parse(localStorage.key(i));
            let quantity = localStorage.getItem(localStorage.key(i));
            let quantityPrice = teddy.price/100*quantity;
            totalPrice += quantityPrice;

            document.getElementById('listeProduits').innerHTML +=
                `<li class="produitPanier">
                    <span class="namePanier">${teddy.name}</span>
                    <span class="pricePanier">${teddy.price / 100} €</span>
                    <span class="quantityPanier">Quantité : ${quantity}</span>
                </li>`;
        }
        document.getElementById('totalPrice').innerHTML = totalPrice;
        document.getElementById('formulaire').style.visibility = "visible";
    }
}




/*function getValidationSaisie () {
    return document.getElementById("validationSaisie");
}

function disableBtn (disabled) {
    if (disabled) {
        document
          .getElementById("submit-btn")
          .setAttribute("disabled", true);
    } else {
        document
            .getElementById("submit-btn")
            .removeAttribute(disabled)
    }
}

document
    .getElementById("nom")
    .addEventListener("input", function(e) {
        if (/^CODE-/.test(e.target.value)) {
            getValidationSaisie.innerHTML = "Saisie correcte";
            disableBtn(false);
        } else {
            getValidationSaisie.innerHTML = "Saisie incorrecte";
            disableBtn(true);
        }
    })*/
