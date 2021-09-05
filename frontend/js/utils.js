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
        let items = getStore("teddies");
        for(item of items) {
            let options = item.options
            for(option of options) {
                cartQuantity = cartQuantity + option.quantity;
            }
        }
        renderCartQty(cartQuantity)
        return cartQuantity
    }
}

function renderCartQty(cartQuantity) {
    $("#panierQuantity").innerText = cartQuantity;
}

function unitPrice(item) {
    return Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item/100); 
}

function navbarPosition() {
    let sticky = $("#nav").offsetTop;
    window.onscroll = function() {stickOrNot(sticky)};
}

function stickOrNot(sticky) {
    if (pageYOffset >= sticky) {
        $("#nav").classList.add("sticky")
    } else {
        $("#nav").classList.remove("sticky")
    }
}

function display(id, data)  {
    $(id).innerHTML = data
}