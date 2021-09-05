navbarPosition();
displayCartQuantity();
hasItemInCart();
listenChangeQty(decreaseQuantity, "sub");
listenChangeQty(increaseQuantity, "add");
displayTotal()

function hasItemInCart() {
    if(!getStore("teddies")) {
        display("#cart", "Le panier est vide");
    }
    else {
        display('#cart-items', renderCart())
        displayForm()
    }
}

function renderCart() {
    let items = getStore('teddies')
    let renderCart = '';
    for(item of items) {
        let productLine = '';
        for(option of item.options) {
            let color = option.color.replace( /\s+/g, '');
            let buttonIdMinus = item._id + color + 'sub';
            let buttonIdPlus = item._id + color + 'add';

            productLine +=  `<div class="product-line">
                                <div class="item-option">
                                    ${option.color}
                                </div>
                                <div class="item-price">
                                    ${unitPrice(item.price)}
                                </div>
                                <div class="item-quantity">
                                    <div class="cart-quantity-display" id="cart-quantity-display">
                                        ${option.quantity}
                                    </div>
                                    <div class="cart-quantity-buttons">
                                        <button class="cart-quantity-button-sub" id="${buttonIdMinus}">-</button>
                                        <button class="cart-quantity-button-add" id="${buttonIdPlus}">+</button>
                                    </div>
                                </div>
                                <div class="item-total-price">
                                    ${unitPrice(item.price * option.quantity)}
                                </div>
                            </div>`
        }
        renderCart +=   `<div class="cart-product">
                            <div class="cart-image">
                                <img src="${item.imageUrl}">
                            </div>
                            <div class="cart-option">
                                ${productLine}
                            </div>
                        </div>`
    }
    return renderCart
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

function listenChangeQty(event, operator) {
    let items = getStore("teddies");
    let ids = [];
    getButtonId(items, ids, operator);
    ids.forEach( e => document.getElementById(e).addEventListener('click', function()  {
        event(e)
    }))
}

function increaseQuantity(e) {
    for(item of items) {
        let options = item.options
        for(option of item.options) {
            let color = option.color.replace( /\s+/g, '');
            if (e.includes(item._id) && e.includes(color)) {
                option.quantity += 1; 
                item.options = options;
                setStore("teddies", items);
                location.reload();
            }
        }
    }
}

function decreaseQuantity(e) {
    for(item of items) {
        let options = item.options
        for(option of item.options) {
            let color = option.color.replace( /\s+/g, '');
            if (e.includes(item._id) && e.includes(color)) {
                option.quantity -= 1; 
                item.options = options;
                setStore("teddies", items);
                location.reload();
            }
        }
    }
}

function displayForm() {
    $("#formulaire").style.visibility = "visible";
}

function displayTotal() {
    let items = getStore("teddies");
    calcTotalPrice(items)
    display( "#quantity-items", displayCartQuantity() )
    display( "#totalHTPrice", unitPrice(calcTotalPrice(items) * 8 / 10) )
    display( "#taxes", unitPrice(calcTotalPrice(items) * 2 / 10) )
    display( "#totalPrice", unitPrice(calcTotalPrice(items)) )
}

function calcTotalPrice(items) {
    let totalPrice = 0;
    for(item of items) {
        for(option of item.options) {
            totalPrice += (item.price * option.quantity)
        }
    }
    return totalPrice;
}