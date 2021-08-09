let panierQuantity;
if (localStorage.getItem("teddies") == null) {
    panierQuantity = 0;
    
} else {
    panierQuantity = JSON.parse(localStorage.getItem("teddies")).length;
}
document
    .getElementById("panierQuantity")
    .innerText = panierQuantity;