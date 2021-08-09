
fetch("http://localhost:3000/api/teddies")
.then(response => response.json())
.then(teddies => displayTeddies(teddies))
.catch(error => {alert(error)})

function displayTeddies(teddies) {
        for(let teddy of teddies){
            displayTeddyHTML(teddy);
        }
}

function displayTeddyHTML(teddy) {
    document.getElementById('teddiesArticle').innerHTML += renderTeddyHTML(teddy);
}

function renderTeddyHTML(teddy) {
    return `<article class="article">
            <div class="containerArticle">
                <h3 class="article__title">
                    ${teddy.name} 
                </h3>
                <div class="article__picture">
                    <img src="${teddy.imageUrl}">
                </div>
                <div class="article__bouton">
                    <a href="./frontend/pages/article.html?id=${teddy._id}" class="article__bouton__link">
                        Voir le produit
                    </a>    
                </div>
            </div>
        </article>`;
}