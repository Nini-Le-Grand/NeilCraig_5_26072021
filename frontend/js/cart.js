navbarPosition();
display("#panierQuantity", getCartQuantity())
hasItemInCart();


function calcTotalPrice(items) {
    let totalPrice = 0;
    for(item of items) {
        for(option of item.options) {
            totalPrice += (item.price * option.quantity)
        }
    }
    return totalPrice;
}

function showForm() {
    $("#form-section").style.visibility = "visible";
}

function getButtonId(items, table, operator) {
    for(item of items) {
        for(option of item.options) {
            let color = option.color.replace( /\s+/g, '');
            let buttonId = item._id + color + operator
            table.push(buttonId)
        }
    }
}

function hasItemInCart() {
    if(!getStore("products")) {
        display("#cart", "Le panier est vide");
    }
    else {
        display('#cart-items', setCartDisplay());
        showForm();
        listenToEmptyCart();
        listenIncreaseQty();
        listenDecreaseQty();
        calcTotalPrice( getStore("products"));
        display( "#quantity-items", getCartQuantity());
        display( "#totalHTPrice", currency( calcTotalPrice( getStore("products")) * 8 / 10 ));
        display( "#taxes", currency( calcTotalPrice( getStore("products")) * 2 / 10 ));
        display( "#totalPrice", currency( calcTotalPrice( getStore("products") )));
    }
}

function listenIncreaseQty() {
    let items = getStore("products");
    let ids = [];
    getButtonId(items, ids, "add");
    ids.forEach( e => {
        document.getElementById(e).addEventListener('click', function()  {
            items.forEach( item => {
                let options = item.options;
                options.forEach( option => {
                    increaseQuantity(e, items, item, options, option);
                    location.reload();
                })
            })
        })
    })
}

function increaseQuantity(e, items, item, options, option) {
    let color = option.color.replace( /\s+/g, '');
    if (e.includes(item._id) && e.includes(color)) {
        option.quantity += 1; 
        item.options = options;
        setStore("products", items);
    }
}

function listenDecreaseQty() {
    let items = getStore("products");
    let ids = [];
    getButtonId(items, ids, "sub");
    ids.forEach( e => document.getElementById(e).addEventListener('click', function()  {
        items.forEach( item => {
            let options = item.options;
            options.forEach( option => {
                if(option.quantity > 1) {
                    decreaseQuantity(e, items, item, options, option);
                } else if(option.quantity == 1) {
                    deleteProduct(e, items, item, options, option);
                }
            })
        })
    }))
}

function listenToEmptyCart() {
    $("#empty-cart").addEventListener("click", function() {
        emptyCart()
    })
}

function emptyCart() {
    display("#alert", renderEmptyCartAlert());
    $("#redirect").style.visibility = "visible";
    listenToQuitAlert()
    listenToValidateEmptyCart()
}

function listenToQuitAlert() {
    $("#no").addEventListener("click", function() {
        $("#redirect").style.visibility = "hidden";
    })
}

function listenToValidateEmptyCart() {
    $("#yes").addEventListener("click", function(e) {
        localStorage.clear();
        document.location.href ="../../index.html"
    })
}

function renderEmptyCartAlert() {
    return `<div id="redirect" class="redirect-container">
                <div class="message-box">
                    <p class="question">
                        Êtes-vous sûr de vouloir vider le panier ?
                    </p>
                    <div class="choix-btns">
                        <button type button id="no" class="choix-btn">
                            Non
                        </button>
                        <button id="yes" class="choix-btn">
                            Oui
                        </button>
                    </div>
                </div>
            </div>`
}

function deleteProduct(e, items, item, options, option) {
    let color = option.color.replace( /\s+/g, '');
    if (e.includes(item._id) && e.includes(color)) {
        if(item.options.length > 1) {
            deleteOption(items, item, options, option);
        } else if(item.options.length == 1 && items.length > 1) {
            deleteItem(items, item);
        } else if(items.length == 1 && options.length == 1) {
            emptyCart();
        }
    }
}

function deleteOption(items, item, options, option) {
    options.splice(options.indexOf(option), 1);
    item.options = options;
    setStore("products", items);
    location.reload()
}

function deleteItem(items, item) {
    items.splice(items.indexOf(item), 1)
    setStore("products", items);
    location.reload()
}

function decreaseQuantity(e, items, item, options, option) {
    let color = option.color.replace( /\s+/g, '');
    if (e.includes(item._id) && e.includes(color)) {
        option.quantity -= 1; 
        item.options = options;
        setStore("products", items);
        location.reload()
    }
}

function setCartDisplay() {
    let cartDisplay = '';
    let items = getStore("products");
    items.forEach( item => {
        cartDisplay += renderCart(item)
    })
    return cartDisplay;
}

function setOptionDisplay(item) {
    let optionDisplay = '';
    item.options.forEach( option => {
        optionDisplay += renderOptionLine(item, option)
    })
    return optionDisplay;
}

function renderCart(item) {
    return `<div class="cart-product">
                <div class="cart-image">
                    <img src="${item.imageUrl}">
                </div>
                <div class="cart-option">
                    ${setOptionDisplay(item)}
                </div>
            </div>`
}

function renderOptionLine(item, option) {
    let color = option.color.replace( /\s+/g, '');
    let buttonIdMinus = item._id + color + 'sub';
    let buttonIdPlus = item._id + color + 'add';
    return `<div class="product-line">
                <div class="item-option">
                    ${option.color}
                </div>
                <div class="item-price">
                    ${currency(item.price)}
                </div>
                <div class="item-quantity">
                    <div class="cart-quantity-display">
                        ${option.quantity}
                    </div>
                    <div class="cart-quantity-buttons">
                        <button class="cart-quantity-button-sub" id="${buttonIdMinus}">-</button>
                        <button class="cart-quantity-button-add" id="${buttonIdPlus}">+</button>
                    </div>
                </div>
                <div class="item-total-price">
                    ${currency(item.price * option.quantity)}
                </div>
            </div>`
}