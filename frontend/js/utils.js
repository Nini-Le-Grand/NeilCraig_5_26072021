function $(parametre) {
    return document.querySelector(parametre);
}

function getStore(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setStore(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
}

function displayCartQuantity() {
    if (!!getStore("teddies")) {
        let cartQuantity = 0;
        getStore("teddies").forEach(item => cartQuantity += item.qty)
        renderCartQty(cartQuantity)
        return cartQuantity
    }
}

function renderCartQty(cartQuantity) {
    $("#panierQuantity").innerText = cartQuantity;
}

function UnitPrice(item) {
    return Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item.price/100); 
}

