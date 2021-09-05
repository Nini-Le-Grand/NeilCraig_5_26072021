navbarPosition();

let contactInfo = {
    firstName: "Neil",
    lastName: "Craig",
    address: "120 rue Charonne",
    city: "Paris",
    email: "NC@e.com",
    }
let productList = []
setProductList()
let request = {
    contact: contactInfo,
    products: productList,
}


//console.log(productList);
//console.log(request);
fetch("http://localhost:3000/api/teddies/order", {
    method: "POST",
    headers: {
    'Accept': 'application/json', 
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(request)
})
.then(response => response.json())


.then((data) => {
    //console.log(data);
    display("#orderId", data.orderId)
    display("#firstName", data.contact.firstName)
    display("#lastName", data.contact.lastName)
    display("#adress", data.contact.address)
    display("#city", data.contact.city)
    display("#email", data.contact.email)
    display("#productQty", displayCartQuantity())
    displayCart()
})

function displayCart() {
    let items =getStore("teddies")
    let total = 0;
    
    for (item of items) {
        total += (item.price * item.quantity)
        $("#products").innerHTML += 
            `<div class="item">
                <div class="case hide">${item._id}</div>
                <div class="case">${item.name}</div>
                <div class="case">${item.quantity}</div>
                <div class="case">${unitPrice(item.price)}</div>
                <div class="case">${unitPrice(item.price * item.quantity)}</div>
            </div>`
    }
    let taxes = total * (20 / 100)
    console.log(taxes);
    display("#total", unitPrice(total))
    display("#taxe", unitPrice(taxes))
}



function setProductList() {
    let items = getStore("teddies")
    for (item of items) {
        for( i = 0; i < item.qty; i++) {
            productList.push(item._id);
        }
    }
}




/*$("#products").innerHTML += 
        `<div>
            <div id="_id">${item._id}</div>
            <div id="name">${item.name}</div>
            <div id="quantity">${item.qty}</div>
            <div id="price">${item.price}</div>
            <div id="totalPrice">${item.price * item.qty}</div>
        </div>`*/