listenToSubmit()

function listenToSubmit() {
    $("#submit-btn").addEventListener("click", function (e) {
        e.preventDefault();
        if(verifyAllFieldsCompleted()) {
            verifyAllRegex()
        }
    })
}

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

function verifyAllFieldsCompleted() {
    verifyFieldCompleted('nom')
    verifyFieldCompleted('prenom')
    verifyFieldCompleted('address')
    verifyFieldCompleted('city')
    verifyFieldCompleted('email')
    verifyFieldCompleted('confirmation-email')

    if(verifyFieldCompleted('nom') && verifyFieldCompleted('prenom') && verifyFieldCompleted('address') && verifyFieldCompleted("email") && verifyFieldCompleted('confirmation-email') && verifyFieldCompleted('city')) {
        return true;
    } else {
        document.getElementById('formAlert').innerHTML = "Certains champs ne sont pas renseign??s"
        return false;
    }
    
}

function verifyAllRegex() {
    let regexName = /^(([a-zA-Z??-??]+[\s\-]{1}[a-zA-Z??-??]+)|([a-zA-Z??-??]+))$/
    let regexAddress = /^(([a-zA-Z??-??0-9]+[\s\-]{1}[a-zA-Z??-??0-9]+)){1,10}$/
    let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/
    verifyRegex(regexName, 'nom')
    verifyRegex(regexName, 'prenom')
    verifyRegex(regexAddress, 'address')
    verifyRegex(regexName, 'city')
    verifyRegex(regexEmail, 'email')
    verifyRegex(regexEmail, 'confirmation-email')

    if(verifyRegex(regexName, 'nom') && verifyRegex(regexName, 'prenom') && verifyRegex(regexAddress, 'address') && verifyRegex(regexName, 'city') && verifyRegex(regexEmail, 'email') && verifyRegex(regexEmail, 'confirmation-email')) {
        document.getElementById('formAlert').innerHTML = '';
        verifyMatchingEmail()
    } else {
        document.getElementById('formAlert').innerHTML = "Certains champs sont mal renseign??s"
    }
}

function verifyFieldCompleted(id) {
    if(document.getElementById(id).value != '') {
        document.getElementById(`${id}ValidationSaisie`).innerHTML = ''
        document.getElementById(id).classList.remove('false-border')
        document.getElementById(id).classList.add('true-border')
        return true
    }
    else {
        document.getElementById(`${id}ValidationSaisie`).innerHTML = "Ce champ est obligatoire";
        document.getElementById(`${id}ValidationSaisie`).classList.add('alertWarning')
        document.getElementById(id).classList.remove('true-border')
        document.getElementById(id).classList.add('false-border')
        return false
    }
}

function verifyMatchingEmail () {
    if (document.getElementById('email').value == document.getElementById('confirmation-email').value) {
        let request = setRequest();
        sendRequest(request);
    } else {
        document.getElementById('formAlert').innerHTML = "les addresses email renseign??es ne sont pas identiques"
        document.getElementById(`emailValidationSaisie`).innerHTML = "les addresses email ne sont pas identiques";
        document.getElementById(`emailValidationSaisie`).classList.add('alertWarning')
        document.getElementById(`confirmation-emailValidationSaisie`).classList.add('alertWarning')
        document.getElementById('email').classList.remove('true-border')
        document.getElementById('confirmation-email').classList.remove('true-border')
        document.getElementById('email').classList.add('false-border');
        document.getElementById('confirmation-email').classList.add('false-border')
    }
}

function verifyRegex(regex, id) {
    if(regex.test(document.getElementById(id).value)) {
        document.getElementById(`${id}ValidationSaisie`).innerHTML = '';
        document.getElementById(id).classList.remove('false-border')
        document.getElementById(id).classList.add('true-border')
    } else {
        document.getElementById(`${id}ValidationSaisie`).innerHTML = "Ce champ n'est pas correctement renseign??";
        document.getElementById(`${id}ValidationSaisie`).classList.add('alertWarning')
        document.getElementById(id).classList.remove('true-border')
        document.getElementById(id).classList.add('false-border')
    }
    return regex.test(document.getElementById(id).value)
}