/*-----Display teddy Information depending on its ID-----*/

let id;
getId();
fetchAPI(id);

/*-----Find Id referenced in the URL-----*/
function getId() {
    queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    id = urlParams.get('id');
}  

/*-----Fetch data of teddy using its Id-----*/
function fetchAPI(id) {
    teddy = fetch(`http://localhost:3000/api/teddies/${id}`)
        .then(response => response.json())
        .then(teddy => {
            displayProductHTML(teddy);
            sortColor(teddy);
        })
        .catch(error => {
            alert(error)
        })
}

/*-----Display object data on HTML page-----*/
function displayProductHTML(teddy) {
    return document.getElementById('product').innerHTML += 
        `<div class="product__display">
            <div class="product__picture">
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

            </div>
        </div>
        <div class="product__boutons"> 
            <button onclick="addTeddyToCart(id)" type="button" id="${teddy._id}" class="btn">
                Ajouter au panier
            </button>
        </div>`;
}

/*-----Loop through object options-----*/
function sortColor(teddy) {
    for(let teddyColor of teddy.colors) {  
        displayColorHTML(teddyColor)             
    }
}

/*-----Display options data on HTML page-----*/
function displayColorHTML(teddyColor) {
    return document.getElementById(`coloris`).innerHTML += 
        `<option value="${teddyColor}">
            ${teddyColor}
        </option>`
}



/*-----Add teddy to localStorage ONCLICK-----*/

/*-----Fetch data on teddy using its Id-----*/
function addTeddyToCart(id) {
    fetch(`http://localhost:3000/api/teddies/${id}`)
        .then(response => response.json())
        .then(teddy => {
            addTeddy(teddy);
        })
        .catch(error => {
            alert(error)
        })
}

/*-----Check local storage entry-----*/
function addTeddy(teddy) {
    let teddyString = JSON.stringify(teddy);
    if (localStorage.getItem(teddyString) == null) {
        addItemLS(teddyString);
    }
    else if (localStorage.getItem(teddyString) != null) {
        pushItemLS(teddyString);
    }
}

/*-----Add object to local storage-----*/
function addItemLS(teddyString) {
    let quantity = 1;
    localStorage.setItem(teddyString, quantity);
}

/*-----Push object quantity-----*/
function pushItemLS(teddyString) {
    let newQuantity = parseInt(localStorage.getItem(teddyString)) + 1;
    localStorage.setItem(teddyString, newQuantity);
}