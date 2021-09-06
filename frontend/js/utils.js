function $(parametre) {
    return document.querySelector(parametre);
}

function currency(item) {
    return Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(item/100); 
}

function display(id, data)  {
    $(id).innerHTML = data
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

function getStore(key) {
    return JSON.parse(localStorage.getItem(key));
}

function getUrlParameter(parameter) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}  

function navbarPosition() {
    let sticky = $("#nav").offsetTop;
    window.onscroll = function() {stickOrNot(sticky)};
}

function renderCartQty(cartQuantity) {
    $("#panierQuantity").innerText = cartQuantity;
}

function setStore(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
}

function stickOrNot(sticky) {
    if (pageYOffset >= sticky) {
        $("#nav").classList.add("sticky")
    } else {
        $("#nav").classList.remove("sticky")
    }
}