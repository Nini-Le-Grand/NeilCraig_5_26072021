let quantity = 1;
navbarPosition();


fetch(`http://localhost:3000/api/teddies/${getUrlParameter('id')}`)
    .then(response => response.json())
    .then(product => {
        displayTeddy(product)
        displayCartQuantity()
        blurArrow();
        listenToIncreaseQty();
        listenToDecreaseQty();
        ListenAddToCart(product);
    })
    .catch(error => {
        alert(error);
    })

function addNewProductToCart(product) {
    if (!!getStore("teddies") && !hasProduct(product)) {
        let items = getStore("teddies")
        delete product.colors;
        product.options = [{color: $("#coloris").value, quantity: quantity}]
        items.push(product);
        setStore("teddies", items)
    }
}

function addProductWithNewOption(product) {
    if (!!getStore("teddies") && hasProduct(product)) {
        let items = getStore("teddies");
        for (item of items) {
            if (item._id == product._id && !hasOption(item.options)) {
                let options = item.options;
                options.push({color: $("#coloris").value, quantity: quantity});
                item.options = options;
                setStore("teddies", items);
                break;
            }
        }
    }
}

function addToEmptyCart(product) {
    if (!getStore("teddies")) {
        delete product.colors;
        product.options = [{color: $("#coloris").value, quantity: quantity}]
        setStore("teddies", [product])
    }
}

function blurArrow() {
    if($("#quantity").innerText == 1) {
        $("#decreaseQty").classList.add("blur");
    } else {
        $("#decreaseQty").classList.remove("blur");
    }
}

function decreaseQty(quantity) {
    quantity = quantity - 1;
    $("#quantity").innerText = quantity;
    blurArrow();
    return quantity;
}

function displayTeddy(product) {
    $('#product').innerHTML = render(product);
}

function hasOption(items) {
    return items.find(e => e.color == $("#coloris").value)
}

function hasProduct(product) {
    return getStore("teddies").find(e => e._id == product._id)
}

function increaseQty(quantity) {
    quantity = quantity + 1;
    $("#quantity").innerText = quantity;
    blurArrow();
    return quantity;
}

function ListenAddToCart(product) {
    $("#putInCart").addEventListener ("click", function() {
        setProductQuantity(product);
        addProductWithNewOption(product)
        addNewProductToCart(product);
        addToEmptyCart(product);
        resetQty();
        redirect();
        listenBackToNav();
    })
}

function listenBackToNav () {
    $("#quit-box").addEventListener("click", function () {
        $("#redirect").style.visibility = "hidden";
    })
}

function listenToDecreaseQty() {
    $("#decreaseQty").addEventListener("click", function() {
        if (quantity > 1) {
            quantity = decreaseQty(quantity);
        }
    })
}

function listenToIncreaseQty() {
    $('#increaseQty').addEventListener("click", function() {
        quantity = increaseQty(quantity);
    })
}

function redirect() {
    $("#redirect").style.visibility = "visible";
}

function render(product) {
    let options = '';
    for(color of product.colors) {  
        options += `<option value="${color}">
                        ${color}
                    </option>`;          
    }
    return `<h3 class="name">
                ${product.name}
            </h3>
            <div class="picture">
                <img src="${product.imageUrl}">
            </div>
            <div class="product__information">

                <div class="price">
                    <p class="product__price">
                        ${currency(product.price)}
                    </p>
                </div>
                
                <h4>Description :</h4>
                <p class="description">
                    ${product.description}
                </p>
                
                <form class="color">
                    <label for="coloris" class="color-label">
                        Coloris disponibles :
                    </label>
                    </br>
                    <select name="color" id="coloris" class="color-selection">
                        ${options}
                    </select>
                </form>
                <p class="reference">
                    <span class="ref-label">Référence :</span> ${product._id}
                </p>
            </div>`;
}

function resetQty() {
    quantity = 1;
    $("#quantity").innerText = quantity;
}

function setProductQuantity(product) {
    if (!!getStore("teddies") && hasProduct(product)) {
        let items = getStore("teddies");
        for (item of items) {
            if (item._id == product._id && hasOption(item.options)) {
                let options = item.options;
                for (option of options) {
                    if ($("#coloris").value == option.color) {
                        option.quantity = option.quantity + quantity;
                        item.options = options;
                        setStore("teddies", items);
                        break;
                    }
                }
            }
        }
    }
}