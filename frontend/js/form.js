submit()

function sendRequest(request) {
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
        document.location.href = `order.html?orderId=${data.orderId}&firstName=${$("#nom").value}&lastName=${$("#prenom").value}&address=${$('#address').value}&city=${$('#city').value}&email=${$('#email').value}`
    })
}

function setCartData () {
    productList = []
    let items = getStore("products");
    for(item of items) {
        for(option of item.options) {
            for(i = 0; i < option.quantity; i++) {
                productList.push(item._id);
            }
        }
        
    }
    return productList;
}

function setContactData() {
    contactInfo = {
        firstName: $("#nom").value,
        lastName: $("#prenom").value,
        address: $('#address').value,
        city: $('#city').value,
        email: $('#email').value
    }
    return contactInfo;
}

function setRequest(contactInfo, productList) {
    let request = {
        contact: contactInfo,
        products: productList,
    }
    return request;
}

function submit() {
    $("#formulaire").addEventListener("submit", function (e) {
        e.preventDefault();
        let contactInfo = {}
        contactInfo = setContactData();
        let productList = []
        productList = setCartData();
        let request = setRequest(contactInfo, productList);
        sendRequest(request);
    })
}