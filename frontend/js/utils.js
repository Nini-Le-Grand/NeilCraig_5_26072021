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
        let items = getStore("teddies");
        let cartQuantity = 0;
        for (item of items) {
            cartQuantity += item.qty
        }
        $("#panierQuantity").innerText = cartQuantity;
    }
}