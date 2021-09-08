function $(parametre) {
    return document.querySelector(parametre);
}

function currency(price) {
    return Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price/100); 
}

function display(id, data)  {
    $(id).innerHTML = data
}

function getCartQuantity() {
    let quantity = 0;
    if (!!getStore("products")) {
        getStore("products").forEach( a => a.options.forEach(b => quantity += b.quantity) )
    }
    return quantity;
}

function getStore(key) {
    return JSON.parse(localStorage.getItem(key));
}

function getUrlParameter(parameter) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(parameter);
}  

function isSticky(sticky) {
    if (pageYOffset >= sticky) {
        $("#nav").classList.add("sticky")
    } else {
        $("#nav").classList.remove("sticky")
    }
}

function navbarPosition() {
    let sticky = $("#nav").offsetTop;
    window.onscroll = function() {isSticky(sticky)};
    console.log(sticky);
}

function setStore(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
}