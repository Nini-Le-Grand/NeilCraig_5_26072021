navbarPosition();
display("#panierQuantity", getCartQuantity())
display("#orderId", getUrlParameter('orderId'));
display("#productQty", getCartQuantity());
display("#lastName", getUrlParameter('lastName'));
display("#firstName", getUrlParameter('firstName'));
display("#address", getUrlParameter('address'));
display("#city", getUrlParameter('city'));
display("#email", getUrlParameter('email'));
display('#products', setOrderDisplay());



function setOrderDisplay() {
    let items = getStore("products");
    let orderDisplay = '';
    let total = 0;
    items.forEach( item => {
        let options = item.options;
        options.forEach( option => {
            orderDisplay += renderProducts(item, option);
            total += (item.price * option.quantity)
        })
    })
    display("#total", currency(total))
    display("#taxe", currency(total * 2 / 10))
    return orderDisplay;
}

function renderProducts(item, option) {
    return `<div class="item">
                <div class="case-hide">${item._id}</div>
                <div class="case">${item.name}</div>
                <div class="case">${option.color}</div>
                <div class="case-center">${option.quantity}</div>
                <div class="case-end">${currency(item.price)}</div>
                <div class="case-end">${currency(item.price * option.quantity)}</div>
            </div>`
}