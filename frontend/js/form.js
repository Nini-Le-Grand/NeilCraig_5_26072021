listenToSubmit()

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
        console.log(data);
        document.location.href = `order.html?orderId=${data.orderId}&firstName=${$("#nom").value}&lastName=${$("#prenom").value}&address=${$('#address').value}&city=${$('#city').value}&email=${$('#email').value}`
    })
}

function setCartData () {
    let productList = []
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
    let contactInfo = {
        firstName: $("#nom").value,
        lastName: $("#prenom").value,
        address: $('#address').value,
        city: $('#city').value,
        email: $('#email').value
    }
    return contactInfo;
}

function setRequest() {
    let request = {
        contact: setContactData(),
        products: setCartData(),
    }
    return request;
}

function listenToSubmit() {
    $("#formulaire").addEventListener("submit", function (e) {
        e.preventDefault();
        let request = setRequest();
        sendRequest(request);
        //verifyFields();
        //verifyAllFieldsCompleted()
        //if(!!verifyFields() && !!verifyAllFieldsCompleted()) {
        //    let request = setRequest();
        //    sendRequest(request);
        //} else {
        //    return;
        //}
    })
}

function verifyAllFieldsCompleted() {
    if(!!verifyField(nom, /^[a-zA-ZÀ-ÿ]/) && !!verifyField(prenom, /^[a-zA-ZÀ-ÿ]/) && !!verifyField(email, /\S+@\S+\.\S+/) && !!verifyField(/\S+@\S+\.\S+/) && !!verifyField(address, /^[a-zA-ZÀ-ÿ]/) && !!verifyField(city, /^[a-zA-ZÀ-ÿ]/)) {
        return true;
    } else {
        console.log("erreur");
        return;
    }
}

function verifyFields() {
    if(!!verifyRegex()) {
        return true;
    } else {
        return false;
    }
}

function verifyRegex(id, regex) {
    if($(`"#${id}"`).value !== '') {
        if (regex.test($(`"#${id}"`).value)) {
            display(`"#${id}ValidationSaisie"`, "Le champ est correctement renseigné")
            return true;
        } else {
            display(`"#${id}ValidationSaisie"`, "La saisie est invalide")
            return false;
        }
        
    } else if ($(id).value == '') {
        display(`"#${id}ValidationSaisie"`, "Veuillez renseigner ce champ")
        return false;
    }
}