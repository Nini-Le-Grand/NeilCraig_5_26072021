let listItem = getLocalStorageValues("teddies");
let totalPrice = 0;

displayCartQuantity();

fetch("http://localhost:3000/api/teddies")
.then(response => response.json())
.then(teddies => {

    if (listItem == null) {
        $('#listeProduits').innerHTML = renderEmptyCart();
    } else {
        matchItems(teddies, listItem);

        $("#itemsQuantity").innerText = displayCartQuantity();
        $("#totalHTPrice").innerText = `${totalPrice * 80 / 10000} €`;
        $("#taxes").innerText = `${totalPrice * 20 / 10000} €`;
        $("#totalPrice").innerText = `${totalPrice / 100} €`;
        $("#formulaire").style.visibility = "visible";
    }
})
.catch(error => {alert(error)})

function renderEmptyCart() {
    return 'Le panier est vide';
}

function renderCart(teddy, item) {
    return `<li class="produitPanier">
                <div>
                    <p class="namePanier">${teddy.name} x${item.q}</p>
                    <p class="pricePanier">${teddy.price / 100} €</p>
                </div>
                <div class="totalProductPrice">
                    ${teddy.price * item.q / 100} €
                </div>
            </li>`;
}

function matchItems(teddies, listItem) {
    for(item of listItem) {
        for(teddy of teddies) {
            if (teddy._id == item.id) {
                displayItemsInCart()
            }
        }
    }
}

function displayItemsInCart() {
    totalPrice += teddy.price * item.q;
    $('#listeProduits').innerHTML += renderCart(teddy, item);
}