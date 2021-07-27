class Teddy {                                         //  création de la classe Teddy
    constructor(jsonTeddy){                           //  attributs importés au format json
        jsonTeddy && Object.assign(this, jsonTeddy);  //  raccourci pour liste de this.attributs 
    }
}

fetch("http://localhost:3000/api/teddies")      //  appel API
    .then( response => response.json())         //  réponse au format json
    .then( jsonListTeddy => {                   //  action sur les données récupérées
        let teddy = jsonListTeddy;
        for(let jsonTeddy of jsonListTeddy){    //  boucle pour chaque objet 
            let teddy = new Teddy(jsonTeddy);   //  créer une instance de la classe Teddy
            document                            //  et dans le document html
            .getElementById('teddiesArticle')   //  récupérer l'élément dont l'id est teddiesAticle
            .innerHTML +=                       //  et y ajouter en html (+= ajouter pour chaque objet / = affiche uniquement le dernier article #finDeLaBoucle) 
                `<article class="article">
                    <div class="article__picture">
                        <img src="${teddy.imageUrl}">
                    </div>
                    <div class="article__information">
                        <h3 class="article__title">
                            ${teddy.name}
                        </h3>
                        <div class="article__boutons">
                            <div id="showTeddy${teddy._id}" class="article__boutons__showProduct">
                                Voir le produit
                            </div>   
                            <div class="article__boutons__addPanier">
                                <a href="http://localhost:3000/api/teddies/${teddy._id}" class="lien">
                                    Ajouter au panier
                                </a>
                            </div>  
                        </div>
                    </div>
                </article>`;
        }
        let openArticle = document.getElementsByClassName('article__boutons__showProduct');
        openArticle.addEventListener('click', function() {
            window.open(`http://localhost:3000/api/teddies/${teddy._id}`, '_blank')
        })
        console.log(teddy);
    })
    .catch( error => {
        alert(error)
})
