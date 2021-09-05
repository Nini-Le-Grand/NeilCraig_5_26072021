let contactInfo = {
    firstName: "Neil",
    lastName: "Craig",
    address: "120 rue Charonne",
    city: "Paris",
    email: "NC@e.com",
    }

let productList = []

let items = getStore("teddies")
    for (item of items) {
        for( i = 0; i < item.qty; i++) {
            productList.push(item._id);
        }
    }
//console.log(productList);

let request = {
    contact: contactInfo,
    products: productList,
}

//console.log(request);


$("#commande").addEventListener("submit", function send(e) {
    e.preventDefault();
    console.log("i'm here");
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
        console.log(data);
        document.location.href = "order.html"
    })
})
