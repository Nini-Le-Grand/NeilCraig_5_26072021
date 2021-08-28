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
    $('#teddiesArticle').innerHTML += 
        `<article>
            <a href="./frontend/pages/product.html?id=${product._id}" class="link">
                <h3 class="name">
                    ${product.name} 
                </h3>
                <div class="picture">
                    <img src="${product.imageUrl}">
                </div>
                <div class="price">
                    ${UnitPrice(product)}
                </div>
            </a>    
        </article>`;
}

let navbar = $("#nav")
let sticky = navbar.offsetTop;
window.onscroll = function() {stickOnTop()};


function stickOnTop() {
    if (pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky")
    }
}