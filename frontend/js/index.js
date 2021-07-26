class Teddy {
    constructor(jsonTeddy){
        jsonTeddy && Object.assign(this, jsonTeddy);
    }
}

fetch("http://localhost:3000/api/teddies")
    .then( response => response.json()) 
    .then( jsonListTeddy => {
        
        for(let jsonTeddy of jsonListTeddy){
            let teddy = new Teddy(jsonTeddy);
            document
            .getElementById('teddiesArticle')
            .innerHTML += 
                `<article class="article">
                    <div class="article__picture">
                        <img src="${teddy.imageUrl}">
                    </div>
                    <div class="article__information">
                        <div class="article__information__header">
                            <h3 class="article__title">
                                ${teddy.name}
                            </h3>
                            <p class="article__price">
                                ${teddy.price/100}€
                            </p>
                        </div>
                        <p class="article__description">
                            Description :<br>
                            ${teddy.description}
                        </p>
                        <div class="article__color">
                            <p>
                                coloris disponibles : 
                            </p>
                            <ul id="coloris_${teddy._id}" class="article__color__list">
                                
                            </ul>
                        </div>
                        <p class="article__reference">
                            Référence : ${teddy._id}
                        </p>
                        <div class="article__boutons">
                            <a href="">
                                <div class="article__boutons__voirProduit">
                                    Voir le produit
                                </div>
                            </a>
                            <a href="">
                                <div class="article__boutons__addPanier">
                                    Ajouter au panier
                                </div>
                            </a>
                        </div>
                    </div>
                </article>`;
              
                for(let teddyColor of teddy.colors) {
                    document
                    .getElementById(`coloris_${teddy._id}`)
                    .innerHTML += ` <li>
                                        ${teddyColor}<span style="background-color:${teddyColor};" class="colorPicker"></span>
                                    </li>`
                    //let color = teddyColor;  {background-color: ${teddyColor}}
                    //console.log(teddy.colors);
                    console.log(teddyColor);
                }
        }
        })

    .catch( error => {
        alert(error)
    })

