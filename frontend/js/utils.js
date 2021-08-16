function $(parametre) {
    return document.querySelector(parametre);
}

function getLocalStorageValues(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setLocalStorageValues(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
}

function displayCartQuantity() {
    let total = 0;
    let items = getLocalStorageValues("teddies");
    let hasItems = hasItemsInCart(items);
    if (!!hasItems) {
        total = calculateCartQuantity(total, items)
    }
    renderCartQuantity(total)
    return total;
}

function hasItemsInCart(items) {
    if (items != null) {
        return true;
    }
    return false;
}

function calculateCartQuantity(total, items) {
    for ( i = 0; i < items.length; i++) {
        total = total + items[i].q;
    }
    return total;
}

function renderCartQuantity(total) {
    $("#panierQuantity").innerText = total;
} 
