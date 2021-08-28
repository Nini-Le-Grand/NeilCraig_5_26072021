let id = getId();
let quantity = 1;

fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(response => response.json())
    .then(product => {
        displayTeddy(product)
        displayCartQuantity()
        listenIncreaseQty()
        listenDecreaseQty()
        ListenAddToCart(product)
    })
    .catch(error => {
        alert(error)
    })

function getId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}  

function displayTeddy(product) {
    $('#product').innerHTML = render(product);
}

function render(product) {
    let options = '';
    for(color of product.colors) {  
        options += `<option value="${color}">
                        ${color}
                    </option>`;          
    }

    return `<div class="product__picture">
                <img src="${product.imageUrl}">
            </div>
            <div class="product__information">

                <div class="product__header">
                    <h3 class="product__title">
                        ${product.name}
                    </h3>
                    <p class="product__price">
                        ${product.price/100}€
                    </p>
                </div>

                <p class="product__description">
                    ${product.description}
                </p>
                
                <form class="product__color">
                    <label for"coloris">
                        Coloris disponibles
                    </label>
                    <select name="color" id="coloris" class="product__coloriSelect">
                        ${options}
                    </select>
                </form>
                <p class="product__reference">
                    Référence : ${product._id}
                </p>
            </div>`;
}

function listenIncreaseQty() {
    $('#increaseQty').addEventListener("click", function() {
        quantity = increaseQty(quantity);
    })
}

function listenDecreaseQty() {
    $("#decreaseQty").addEventListener("click", function() {
        if (quantity > 1) {
            quantity = decreaseQty(quantity);
        }
    })
}

 function increaseQty(quantity) {
    quantity = quantity + 1;
    $("#quantity").innerText = quantity;
    return quantity;
}

function decreaseQty(quantity) {
    quantity = quantity - 1;
    $("#quantity").innerText = quantity;
    return quantity;
}

function ListenAddToCart(product) {
    $("#putInCart").addEventListener ("click", function() {
        setProductQuantity(product);
        addProductToCart(product);
        addToEmptyCart(product);
        resetQty();
        redirect();
    })
}

function addProductToCart(product) {
    if (!!getStore("teddies") && !hasProduct(product)) {
        let items = getStore("teddies")
        product.qty = quantity;
        items.push(product);
        setStore("teddies", items)
    }
}

function addToEmptyCart(product) {
    if (!getStore("teddies")) {
        product.qty = quantity;
        setStore("teddies", [product])
    }
}

function hasProduct(product) {
    return getStore("teddies").find(e => e._id == product._id)
}

function setProductQuantity(product) {
    if (!!getStore("teddies") && hasProduct(product)) {
        let items = getStore("teddies")
        for (item of items) {
            if (item._id == product._id) {
                item.qty = item.qty + quantity;
            }
        }
        setStore("teddies", items);
    }
}

function resetQty() {
    quantity = 1;
    $("#quantity").innerText = quantity;
}

function redirect() {
    $("#redirect").style.visibility = "visible";
}