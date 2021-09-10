navbarPosition();
display("#panierQuantity", getCartQuantity())

fetch(`http://localhost:3000/api/teddies/${getUrlParameter('id')}`)
    .then(response => response.json())
    .then(product => {
        display("#product", render(product))
        display("#quantity", 1)
        blurArrow();
        listenToIncreaseQty()
        listenToDecreaseQty()
        ListenToAddToCart(product);
    })
    .catch(error => {
            alert(error);
        })

function addNewProductToCart(product) {
    if (!!getStore("products") && !hasProduct(product)) {
        let items = getStore("products");
        product.options = [{color: $("#coloris").value, quantity: parseInt($("#quantity").innerText)}];
        items.push(product);
        setStore("products", items);
    }
}

function addProductWithNewOption(product) {
    if (!!getStore("products") && hasProduct(product)) {
        let items = getStore("products");
        for (item of items) {
            if (item._id == product._id && !hasOption(item.options)) {
                let options = item.options;
                options.push({color: $("#coloris").value, quantity: parseInt($("#quantity").innerText)});
                item.options = options;
                setStore("products", items);
                break;
            }
        }
    }
}

function addToEmptyCart(product) {
    if (!getStore("products")) {
        product.options = [{color: $("#coloris").value, quantity: parseInt($("#quantity").innerText)}]
        setStore("products", [product])
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
    quantity -= 1;
    display("#quantity", quantity)
    blurArrow();
}

function hasOption(items) {
    return items.find(e => e.color == $("#coloris").value)
}

function hasProduct(product) {
    return getStore("products").find(e => e._id == product._id)
}

function increaseQty(quantity) {
    quantity += 1;
    display("#quantity", quantity)
    blurArrow();
}

function ListenToAddToCart(product) {
    $("#putInCart").addEventListener ("click", function() {
        setProductQuantity(product);
        addProductWithNewOption(product)
        addNewProductToCart(product);
        addToEmptyCart(product);
        redirect();
    })
}

function listenBackToNavigation () {
    $("#quit-box").addEventListener("click", function () {
        $("#redirect").style.visibility = "hidden";
        location.reload();
    })
}

function listenToDecreaseQty() {
    $("#decreaseQty").addEventListener("click", function() {
        let quantity = parseInt($("#quantity").innerText)
        if (quantity > 1) {
            decreaseQty(quantity);
        }
    })
}

function listenToIncreaseQty() {
    $('#increaseQty').addEventListener("click", function() {
        let quantity = parseInt($("#quantity").innerText)        
        increaseQty(quantity);
    })
    
}

function redirect() {
    $("#redirect").style.visibility = "visible";
    listenBackToNavigation();
}

function render(product) {
    let options = '';
    for(color of product.colors) {  
        options += `<option value="${color}">
                        ${color}
                    </option>`;          
    }
    return `<h2 class="name">
                ${product.name}
            </h2>
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

function setProductQuantity(product) {
    if (!!getStore("products") && hasProduct(product)) {
        let items = getStore("products");
        for (item of items) {
            if (item._id == product._id && hasOption(item.options)) {
                let options = item.options;
                for (option of options) {
                    if ($("#coloris").value == option.color) {
                        option.quantity += parseInt($("#quantity").innerText);
                        item.options = options;
                        setStore("products", items);
                        break;
                    }
                }
            }
        }
    }
}