navbarPosition();
displayCartQuantity();
display("#orderId", getUrlParameter('orderId'));
display("#productQty", displayCartQuantity());
display("#lastName", getUrlParameter('lastName'));
display("#firstName", getUrlParameter('firstName'));
display("#address", getUrlParameter('address'));
display("#city", getUrlParameter('city'));
display("#email", getUrlParameter('email'));
displayCart();


function displayCart() {
    let items = getStore("teddies")
    let total = 0;
    
    for (item of items) {
        total += (item.price * item.quantity)
        $("#products").innerHTML += 
            `<div class="item">
                <div class="case hide">${item._id}</div>
                <div class="case">${item.name}</div>
                <div class="case">${item.quantity}</div>
                <div class="case">${currency(item.price)}</div>
                <div class="case">${currency(item.price * item.quantity)}</div>
            </div>`
    }
    let taxes = total * (20 / 100)
    display("#total", currency(total))
    display("#taxe", currency(taxes))
}