fetch("http://localhost:3000/api/teddies")
    .then(response => response.json())
    .then(products => {
        displayProducts(products)
        displayCartQuantity()
    })
    .catch(error => {alert(error)})

function displayProducts(products) {
        for(let product of products){
            renderProduct(product);
        }
}

function renderProduct(product) {
    $('#teddiesArticle').innerHTML += `<article class="article">
            <div class="containerArticle">
                <h3 class="article__title">
                    ${product.name} 
                </h3>
                <div class="article__picture">
                    <img src="${product.imageUrl}">
                </div>
                <div class="article__bouton">
                    <a href="./frontend/pages/product.html?id=${product._id}" class="article__bouton__link">
                        Voir le produit
                    </a>    
                </div>
            </div>
        </article>`;
}

