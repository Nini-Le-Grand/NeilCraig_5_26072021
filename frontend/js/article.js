let id = getId();

fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(response => response.json())
    .then(teddy => displayTeddyHTML(teddy))
    .catch(error => {
        alert(error)
    })

function getId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}  

function displayTeddyHTML(teddy) {
    document.getElementById('product').innerHTML = renderTeddyHTML(teddy);
    displayTeddyChoices(teddy);
}

function renderTeddyHTML(teddy) {
    return `<div class="product__picture">
                <img src="${teddy.imageUrl}">
            </div>
            <div class="product__information">

                <div class="product__header">
                    <h3 class="product__title">
                        ${teddy.name}
                    </h3>
                    <p class="product__price">
                        ${teddy.price/100}€
                    </p>
                </div>

                <p class="product__description">
                    ${teddy.description}
                </p>
                
                <form class="product__color">
                    <label for"coloris">
                        Coloris disponibles
                    </label>
                    <select name="color" id="coloris" class="product__coloriSelect">

                    </select>
                </form>
                <p class="product__reference">
                    Référence : ${teddy._id}
                </p>
            </div>`;
}

function displayTeddyChoices(teddy) {
    for(let teddyColor of teddy.colors) {  
        document.getElementById(`coloris`).innerHTML += renderChoicesHTML(teddyColor);          
    }
}

function renderChoicesHTML(teddyColor) {
    return `<option value="${teddyColor}">
                ${teddyColor}
            </option>`;
}
    
let quantity = 0;
document
    .getElementById("quantity")
    .innerText = quantity;
                    
document
    .getElementById("oneMore")
    .addEventListener("click", function() {
        quantity += 1;
        console.log(quantity);
        document
            .getElementById("quantity")
            .innerText = quantity;
    })    
                    
document
    .getElementById("oneLess")
    .addEventListener("click", function() {
        if (quantity == 0 ) {
            return;
        } else {
            quantity -= 1;
            document
                .getElementById("quantity")
                .innerText = quantity;
        }
    })

document
    .getElementById("ajout")
    .addEventListener ("click", function() {
        fetch(`http://localhost:3000/api/teddies/${id}`)
            .then(response => response.json())
            .then(teddy => {
                addTeddy(teddy);
                panierQuantity = JSON.parse(localStorage.getItem("teddies")).length;
                document
                    .getElementById("panierQuantity")
                    .innerText = panierQuantity;
                quantity = 0;
                document
                    .getElementById("quantity")
                    .innerText = quantity;
            })
            .catch(error => {
                alert(error)
            });
        })

function addTeddy(teddy) {
    for (i = 0; i < quantity; i++) {
        if (localStorage.getItem("teddies") == null) {
            let teddyList = [];
            teddyList.push(teddy._id);
            localStorage.setItem("teddies", JSON.stringify(teddyList));
        }
        else if (localStorage.getItem("teddies") != null) {
            let teddyList = getTeddyList(localStorage);
            teddyList.push(teddy._id);
            localStorage.setItem("teddies", JSON.stringify(teddyList));
        }
    }
}

function getTeddyList(localStorage) {
    return JSON.parse(localStorage.getItem("teddies"));
}


