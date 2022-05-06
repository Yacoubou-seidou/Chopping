let panier = document.getElementById("panier");
let container = document.getElementById("container");
let btnBuy = document.querySelectorAll(".btn-buy");
let totelEl = document.getElementById("total-el");
let products = document.getElementById("products");
let nombre = document.getElementById("nomb");
let charette = document.getElementById("charette");
let chartEl = document.querySelectorAll(".chart-el");
let j = 0;
let total = 0;
let myArr = [
  {
    image: "patel.jpeg",
    nom: "Sweet Item",
    prix: 5,
  },
  {
    image: "patel2.jpeg",
    nom: "Cupcake Item",
    prix: 5,
  },
  {
    image: "patel3.jpeg",
    nom: "Cake Item",
    prix: 5,
  },
  {
    image: "patel5.jpeg",
    nom: "Dougoout Item",
    prix: 10,
  },
  {
    image: "patel6.jpeg",
    nom: "Sweet Item",
    prix: 10,
  },
  {
    image: "patel7.jpeg",
    nom: "Cupcake item",
    prix: 10,
  },
  {
    image: "patel8.jpeg",
    nom: "Bistella",
    prix: 15,
  },
  {
    image: "patel9.png",
    nom: "Sweet Item",
    prix: 15,
  },
  {
    image: "patel4.jpeg",
    nom: "Sweet Item",
    prix: 15,
  },
];
//add produit
(function displayProduit() {
  for (let i = 0; i < myArr.length; i++) {
    products.innerHTML += `    <div
            class="sucreri grow"
            style="background: url(${myArr[i].image}) center/ cover no-repeat"
          >
            <button class="btn-buy" id="btn-buy">
              <i class="fa-solid fa-cart-shopping"></i>
            </button>
            <div class="titre">
              <h4>${myArr[i].nom}</h4>
              <h4><span class= "noir">$</span><span class= "noir">${myArr[i].prix}</span></h4>
            </div>
          </div>`;
  }
})();
//produit au pannier
products.querySelectorAll(".btn-buy").forEach((btn) => {
  btn.addEventListener("click", function () {
    console.log("Hello World");
    alert("Produit Ajouter");
    //dom pour recuperer les variables
    let titreEl = this.parentNode.children[1].children[0].textContent;
    let priceEl =
      this.parentNode.children[1].children[1].children[1].textContent;
    priceEl = parseInt(priceEl);
    let bgEl = this.parentNode.style.background;
    console.log(bgEl);
    console.log(priceEl);
    //ajouter au pannier

    container.innerHTML += ` <div class='chart-el '>
              <div  class='cercle' style= 'background: ${bgEl}'></div>
              <div class='donne'>
                <h5>Cart Item</h5>
                <h5><span class= 'noir'>$</span><span class= 'noir'>${priceEl}</span></h5>
              </div>
              <button class='delete'>
                <i class='fa-solid fa-trash-can'></i>
              </button>
            </div>`;
    total += priceEl;
    //le noombre de produit
    j++;
    nombre.innerHTML = `${j} items - $ ${total} `;
    totelEl.innerHTML = `$ ${total}`;
    //supprimer un produit
    container.querySelectorAll(".delete").forEach((btn) => {
      btn.addEventListener("click", function () {
        alert("Produit Retirer");
        //les variables
        let removeEl = this.parentNode;
        container.removeChild(removeEl);
        let priceEl =
          this.parentNode.children[1].children[1].children[1].textContent;
        priceEl = parseInt(priceEl);
        total -= priceEl;
        //retrait des elements
        j--;
        nombre.innerHTML = `${j} items - $ ${total} `;
        totelEl.innerHTML = `$ ${total}`;
      });
    });
  });
});
let etat;
//afficher les produit
panier.addEventListener("click", function () {
  if (etat === false) {
    charette.style.visibility = "visible";
    charette.style.transform = "translateX(-100%)";
    charette.style.transition = "transform 1s";
    etat = true;
  } else {
    charette.style.visibility = "hidden";
    etat = false;
  }
});
