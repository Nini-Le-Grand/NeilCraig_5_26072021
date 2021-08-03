/*-----Display all objects from server on HTML page-----*/

fetchAPI();

/*-----Fetch data from Server-----*/
function fetchAPI() {
    fetch("http://localhost:3000/api/teddies")
    .then(response => response.json())
    .then(sortData())
    .catch(error => {alert(error)})
}

/*-----Loop through all objects-----*/
function sortData() {
    return teddies => {
        for(let teddy of teddies){
            displayHTML(teddy);
        }
    }
}

/*-----Display object data on HTML page-----*/
function displayHTML(teddy) {
    return document.getElementById('teddiesArticle').innerHTML += 
        `<article class="article">
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