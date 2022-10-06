/* récupérer l'id du produit dans l'UR de la page */
let url = new URL(window.location.href);
let productId = url.searchParams.get("id");
//console.log(productId);

/* récupérer le produit demandé grâce à son id passé en url */
fetch("http://localhost:3000/api/products/" + productId)
.then(function(res) {
    if (res.ok) {
      return res.json();
    }
})
.then(function(article){
  /* Creation du DOM pour le produit */
  let productImage = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImage);
  productImage.src = article.imageUrl;
  productImage.alt = article.altTxt;
  
  let productName = document.getElementById("title");
  productName.innerText = article.name;

  let productPrice = document.getElementById("price");
  productPrice.innerText = article.price;

  let productDescription = document.getElementById("description");
  productDescription.innerText = article.description;

  /* boucle pour récupérer et afficher les options de couleurs du produit */
  for (let color of article.colors) {
    //console.log(color);
    let productColor = document.createElement("option");
    document.querySelector("#colors").appendChild(productColor);
    productColor.productColor = color;
    productColor.innerText = color;
  }

  /* gestion du panier */
  let addToCart = document.getElementById("addToCart");

  addToCart.addEventListener("click", function() {
    let productAdded = 
    {
      id: productId,
      color: document.querySelector("#colors").value,
      quantity: parseInt(document.querySelector("#quantity").value)
    }

    let cart = JSON.parse(localStorage.getItem("product"));
    
    /* fonction pour ajouter un produit au panier*/
    const addProduct = () => {
      cart.push(productAdded);
      localStorage.setItem("product", JSON.stringify(cart));
      if (productAdded.quantity == 1) {
        alert("Votre article a bien été ajouté au panier.");
      }
      else if (productAdded.quantity > 1) {
        alert("Vos articles ont bien été ajoutés au panier.");
      }
    }

    if (productAdded.color == "") {
      alert("Veuillez sélectionner une couleur");
    }
    else if (productAdded.quantity == 0){
      alert("Veuillez renseigner une quantité");
    }
    else if (productAdded.quantity <= 0 || productAdded.quantity > 100){
      alert("Quantité invalide");
    }
    else {
      /* si le panier existe déjà */
      if(cart) {
        let foundProduct = cart.find(p => p.id == productAdded.id && p.color == productAdded.color);
        /* si le produit est déjà dans le panier */
        if (foundProduct) {
          let newQuantity = foundProduct.quantity + productAdded.quantity;
          foundProduct.quantity = newQuantity;
          localStorage.setItem("product", JSON.stringify(cart));
          alert("Vos articles ont bien été ajoutés au panier.");
        }
        
        /*si le produit n'est pas encore dans le panier */
        else {
          addProduct();
        }
      }
      /* si le panier est vide */
      else {
        cart = [];
        addProduct();
      }
    }
  })
})