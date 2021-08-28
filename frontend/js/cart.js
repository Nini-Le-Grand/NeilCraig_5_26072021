let totalPrice = 0;

displayCartQuantity();

fetch("http://localhost:3000/api/teddies")
    .then(response => response.json())
    .then(articles => {
            displayEmptyCart()
            displayProductsInCart(articles)
            displayForm()


            //matchItems(teddies, listItem);

            /*$("#itemsQuantity").innerText = displayCartQuantity();
            $("#totalHTPrice").innerText = `${totalPrice * 80 / 10000} €`;
            $("#taxes").innerText = `${totalPrice * 20 / 10000} €`;
            $("#totalPrice").innerText = `${totalPrice / 100} €`;*/
    })
    .catch(error => alert(error))

function displayEmptyCart() {
    if (!getStore("teddies")) { renderEmptyCart() }
}

function renderEmptyCart() {
    $('#listeProduits').innerHTML = 'Le panier est vide';
}

function displayProductsInCart(products) {
    for(item of getStore("teddies")) {
        if (products.find( e => e._id == item._id)) {
            renderCart(item);
        }
     }
}

function renderCart(item) {
    $('#listeProduits').innerHTML += `<li class="produitPanier">
                <div>
                    <p class="namePanier">${item.name} x${item.qty}</p>
                    <p class="pricePanier">${UnitPrice(item)}</p>
                </div>
                <div class="totalProductPrice">
                    ${totalUnitPrice(item)}
                </div>
            </li>`;
}

function totalQty() {
    $("#itemsQuantity").innerText = displayCartQuantity()
}

function totalUnitPrice(item) {
    return Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.price*item.qty/100); 
}

function displayForm() {
    $("#formulaire").style.visibility = "visible";
}

/*
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
}*/