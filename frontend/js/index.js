navbarPosition();

fetch("http://localhost:3000/api/teddies")
    .then(response => response.json())
    .then(products => {
        display("#panierQuantity", getCartQuantity())
        display("#products", setProductsDisplay(products))
    })
    .catch(error => {alert(error)})

function setProductsDisplay(products) {
    let productsRender = '';
    products.forEach(product => productsRender += renderProduct(product));
    return productsRender;
}

function renderProduct(product) {
    return  `<article>
                <a href="./frontend/pages/product.html?id=${product._id}" class="link">
                    <h3 class="name">
                        ${product.name} 
                    </h3>
                    <div class="picture">
                        <img src="${product.imageUrl}">
                    </div>
                    <div class="price">
                        ${currency(product.price)}
                    </div>
                </a>    
            </article>`;
}