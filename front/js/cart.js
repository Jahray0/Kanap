/* récupérer le contenu du local storage */
const cart = JSON.parse(localStorage.getItem("product"));
//console.table(cart)

/*boucle dans le panier pour traiter chaque produit*/
async function displayCart() 
{
  /*si le panier contient quelque chose*/
  if (cart) {
    let totalCartPrice = 0;

    for (let product of cart) {
      /*récupérer les informations du produit dans le local storage*/
      let item =
      {
        id: product.id,
        color: product.color,
        quantity: product.quantity,
      }
      //console.log(item)

      /*aller chercher le produit correspondant dans l'api*/
      fetch("http://localhost:3000/api/products/" + item.id)
        .then(function (res) {
          if (res.ok) {
            return res.json();
          }
        })
        .then(function (product) {
          //console.table(product)

          /*afficher le produit*/
          let article = document.createElement("article");
          document.querySelector("#cart__items").appendChild(article);
          article.className = "cart__item";
          article.setAttribute('data-id', item.id);
          article.setAttribute('data-color', item.color);

          let divImg = document.createElement("div");
          article.appendChild(divImg);
          divImg.className = "cart__item__img";

          let img = document.createElement("img");
          divImg.appendChild(img);
          img.src = product.imageUrl;
          img.alt = product.altTxt;

          let content = document.createElement("div");
          article.appendChild(content);
          content.className = "cart__item__content";

          let description = document.createElement("div");
          content.appendChild(description);
          content.className = "cart__item__content__description";

          let title = document.createElement("h2");
          description.appendChild(title);
          title.innerText = product.name;

          let color = document.createElement("p");
          description.appendChild(color);
          color.innerText = item.color;

          let price = document.createElement("p");
          description.appendChild(price);
          price.innerText = product.price + " €";
          let productPrice = product.price;
          //console.log(productPrice);

          let settings = document.createElement("div");
          content.appendChild(settings);
          settings.className = "cart__item__content__settings";

          let quantityDiv = document.createElement("div");
          settings.appendChild(quantityDiv);
          quantityDiv.className = "cart__item__content__settings__quantity";

          let quantityP = document.createElement("p");
          quantityDiv.appendChild(quantityP);
          quantityP.innerText = "Qté : ";

          let quantity = document.createElement("input");
          quantityDiv.appendChild(quantity);
          quantity.setAttribute("type", "number");
          quantity.className = "itemQuantity";
          quantity.setAttribute("name", "itemQuantity");
          quantity.setAttribute("min", "1");
          quantity.setAttribute("max", "100");
          quantity.setAttribute("value", item.quantity);

          /* modifier la quantité */
          quantity.addEventListener("change", (f) => {
            f.preventDefault();
            let idToChange = item.id;
            let colorToChange = item.color;
            cartContent = cart.find((p) => p.id === idToChange) && cart.find((p) => p.color === colorToChange);
            //console.log(cartContent);
            if (cartContent) {
              //console.log(cartContent.quantity);
              //console.log(Number(quantity.value)); 
              cartContent.quantity = Number(quantity.value);
              //console.log(cartContent.quantity);
              //console.log(cartContent); 
              localStorage.setItem("product", JSON.stringify(cart));
            }
            else {
              cart.push(product);
              localStorage.setItem("product", JSON.stringify(cart));
            }
            reloadPage();
          })

          let settingDelete = document.createElement("div");
          settings.appendChild(settingDelete);
          settingDelete.className = "cart__item__content__settings__delete";

          let deleteItem = document.createElement("p");
          settingDelete.appendChild(deleteItem);
          deleteItem.className = "deleteItem";
          deleteItem.textContent = "Supprimer";

          /*supprimer un article du panier*/
          deleteItem.addEventListener("click", (e) => {
            e.preventDefault();
            let idToDelete = item.id;
            let colorToDelete = item.color;
            //console.log(idToDelete);
            //console.log(colorToDelete);
            cartContent = cart.filter(el => el.id != idToDelete || el.color != colorToDelete);
            e.target.closest(".cart__item").remove();
            localStorage.setItem("product", JSON.stringify(cartContent));
            reloadPage();
          });
          //console.log(quantity.value);
          //console.log(productPrice);
          totalCartPrice += quantity.value * productPrice;
          //console.log(totalCartPrice);
          let totalPrice = document.getElementById("totalPrice");
          totalPrice.innerText = totalCartPrice;
        })
    }
  }
  /* si le panier est vide*/
  else if (cart == null || cart == 0) {
    document.getElementById("totalQuantity").innerText = 0;
    document.getElementById("totalPrice").innerText = 0;
  }
}
displayCart();

function reloadPage() {
  document.location.reload();
}

/*calculer le nombre total d'articles dans le panier*/
function getTotals() {
  if (cart) 
  {
    let articleQuantity = cart;
    let totalArticles = 0;

    for (let product of articleQuantity) {
      totalArticles += Number(product.quantity);
    }
    let totalQuantity = document.getElementById('totalQuantity');
    totalQuantity.textContent = totalArticles;
  }
}
getTotals();

/*formulaire*/

let form = document.querySelector(".cart__order__form");

/*regex*/
let nameRegex = new RegExp(/^[a-zA-Z]+$/);
let addressRegex = new RegExp(/^[a-zA-Z]+$/);
let emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

/*messages d'erreur*/
let firstNameError = document.getElementById("firstNameErrorMsg");
let lastNameError = document.getElementById("lastNameErrorMsg");
let addressError = document.getElementById("addressErrorMsg");
let cityError = document.getElementById("cityErrorMsg")
let emailError = document.getElementById("emailErrorMsg");

/* test de chaque champ du formulaire*/
form.firstName.addEventListener("change", () => {
  if (nameRegex.test(firstName.value) == false) 
  {
    firstNameError.innerText = "Le format du prénom  est incorrect";
  }
})

form.lastName.addEventListener("change", () => {
  if (nameRegex.test(lastName.value) == false) 
  {
    lastNameError.innerText = "Le format du nom est incorrect"
  }
})

form.address.addEventListener("change", () => {
  if (addressRegex.test(address.value) == false) 
  {
    addressError.innerText = "Format d'adresse invalide";
  }
})

form.city.addEventListener("change", () => {
  if (nameRegex.test(city.value) == false) 
  {
    cityError.innerText = "Nom de ville inconnu";
  }
})

form.email.addEventListener("change", () => {
  if (emailRegex.test(email.value) == false) 
  {
    emailError.innerText = "Format d'adresse e-mail invalide";
  }
})

let submitButton = document.getElementById('order');

//console.log(submitButton);
submitButton.addEventListener("click", function (c) {
  /* si le panier est vide */
  if (!cart) {
    alert("votre panier est vide");
  }
  else {
    c.preventDefault();
    let inputFirstName = document.getElementById("firstName").value;
    let inputLastName = document.getElementById("lastName").value;
    let inputAddress = document.getElementById("address").value;
    let inputCity = document.getElementById("city").value;
    let inputEmail = document.getElementById("email").value;

    if (!inputFirstName || !inputLastName || !inputAddress || !inputCity || !inputEmail) {
      alert("Veuillez renseigner tous les champs du formulaire")
    }
    else if (nameRegex.test(firstName.value) == false || 
             nameRegex.test(lastName.value) == false ||
             addressRegex.test(address.value) == false || 
             nameRegex.test(city.value) == false ||
             emailRegex.test(email.value) == false) {
      alert("Veuillez renseigner des coordonnées valides")
    }
    else {
      let orderProducts = [];
      for (product of cart) 
      {
        orderProducts.push(product.id);
      }

      /*objet contact et tableau de produits*/
      let myOrder =
      {
        contact:
        {
          firstName: inputFirstName,
          lastName: inputLastName,
          address: inputAddress,
          city: inputCity,
          email: inputEmail
        },
        products: orderProducts,
      }
      console.log(myOrder);

      const options =
      {
        method: "POST",
        headers:
        {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(myOrder),
      };

      fetch("http://localhost:3000/api/products/order", options)

        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          document.location.href = 'confirmation.html?orderId=' + data.orderId;
        })
        .catch(error => console.log('error', error));
    }
  }
})