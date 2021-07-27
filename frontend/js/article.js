


fetch

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
                            <div class="article__boutons__voirProduit">
                                
                                    Voir le produit
                                
                            </div>   
                            <div class="article__boutons__addPanier">
                                <a href="" class="lien">
                                    Ajouter au panier
                                </a>
                            </div>  
                        </div>
                    </div>
                </article>`;

                for(let teddyColor of teddy.colors) {  
                    document
                    .getElementById(`coloris_${teddy._id}`)
                    .innerHTML += ` <li>
                                        ${teddyColor}<span style="background-color:${teddyColor};" class="colorPicker"></span>
                                    </li>`                  
                }