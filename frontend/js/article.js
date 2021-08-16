let id = getId();
let quantity = 0;

displayCartQuantity();

fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(response => response.json())
    .then(teddy => 
        displayTeddy(teddy),
        )
    .catch(error => {
        alert(error)
    })

function getId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}  

function displayTeddy(teddy) {
    $('#product').innerHTML = render(teddy);
}

function render(teddy) {
    let choices = '';
    for(color of teddy.colors) {  
        choices += `<option value="${color}">
                        ${color}
                    </option>`;          
    }

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
                        ${choices}
                    </select>
                </form>
                <p class="product__reference">
                    Référence : ${teddy._id}
                </p>
            </div>`;
}

$('#oneMore').addEventListener("click", function() {
    quantity = addOneToTotal(quantity);
})

$("#oneLess").addEventListener("click", function() {
    if (quantity == 0) {
        return;
    } else {
        quantity = substractOneToTotal(quantity);
    }
})

function addOneToTotal(total) {
    total = total + 1;
    $("#quantity").innerText = total;
    return total;
}

function substractOneToTotal(total) {
    total = total - 1;
    $("#quantity").innerText = total;
    return total;
}

$("#ajout").addEventListener ("click", function() {
    fetch(`http://localhost:3000/api/teddies/${id}`)
            .then(response => response.json())
            .then(teddy => {
                let teddyList = [];
                let item = {
                    id: teddy._id,
                    q: quantity,
                }
                
                if (quantity == 0) {
                    return;
                } else {
                    if (!getLocalStorageValues("teddies")) {
                        teddyList.push(item);
                        setLocalStorageValues("teddies", teddyList);
                        displayCartQuantity()
                    } else {
                        teddyList = getLocalStorageValues("teddies");
                        for(i = 0; i < teddyList.length; i++) {
                            if (teddyList[i].id == item.id) {
                                teddyList[i].q = teddyList[i].q + quantity;
                                setLocalStorageValues("teddies", teddyList);
                            } 
                            else if (!teddyList.some(e => e.id === item.id)) {
                                teddyList.push(item);
                                setLocalStorageValues("teddies", teddyList);
                            }

                        }
                        displayCartQuantity()
                    }
                }
                quantity = resetQuantityChoice(quantity)
            })
})

function resetQuantityChoice(quantity) {
    quantity = 0;
    $("#quantity").innerText = quantity;
    return quantity;
}