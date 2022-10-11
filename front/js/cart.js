const cartPrice = document.querySelector(".cart__price");
const catrOrder = document.querySelector(".cart__order");

/* On recupere le panier dans cartContent */
let cartContent = [];
let currentContent = localStorage.getItem("product");
if (currentContent) {
  cartContent = JSON.parse(currentContent);
}



/* Fetch de notre URL pour récuperer res.json */
const getProducts = fetch("http://localhost:3000/api/products/")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }
    return res.json();
  });

getProducts
  .then((products) => displayCart(products))
  .catch((error) => console.error(`Fetch problem: ${error}`));


/* Affichage du panier */
function displayCart(products) {
  for (let product of products) {
    for (let i in cartContent) {
      if (product._id === cartContent[i].id) { 
        let article = document.createElement("article"); 
        const cartItems = document.getElementById("cart__items");

        article.classList.add("cart__item");
        article.setAttribute("data-id", `${cartContent[i].id}`);
        article.setAttribute("data-color", `${cartContent[i].color}`);
        cartItems.appendChild(article);

        let divImg = document.createElement("div");
        divImg.classList.add("cart__item__img");
        article.appendChild(divImg);

        let img = document.createElement("img");
        img.setAttribute("src", product.imageUrl);
        img.setAttribute("alt", product.altTxt);
        divImg.appendChild(img);

        let content = document.createElement("div");
        content.classList.add("cart__item__content");
        article.appendChild(content);

        let itemContentDescription = document.createElement("div");
        itemContentDescription.classList.add("cart__item__content__description");
        content.appendChild(itemContentDescription);

        let title = document.createElement("h2");
        title.textContent = `${product.name}`;
        itemContentDescription.appendChild(title);

        let color = document.createElement("p");
        color.textContent = `${cartContent[i].color}`;
        itemContentDescription.appendChild(color);

        let price = document.createElement("p");
        price.textContent = `${product.price}€`;
        itemContentDescription.appendChild(price);

        let settings = document.createElement("div");
        settings.classList.add("cart__item__content__settings");
        content.appendChild(settings);

        let itemSettingsQuantity = document.createElement("div");
        itemSettingsQuantity.classList.add("cart__item__content__settings__quantity");
        settings.appendChild(itemSettingsQuantity);

        let quantity = document.createElement("p");
        quantity.textContent = "Qté : ";
        itemSettingsQuantity.appendChild(quantity);

        let inputQuantity = document.createElement("input");
        inputQuantity.classList.add("itemQuantity");
        inputQuantity.setAttribute("type", "number");
        inputQuantity.setAttribute("name", "itemQuantity");
        inputQuantity.setAttribute("min", "1");
        inputQuantity.setAttribute("max", "100");
        inputQuantity.setAttribute("value", `${cartContent[i].quantity}`);
        itemSettingsQuantity.appendChild(inputQuantity);

        let itemSettingsDelete = document.createElement("div");
        itemSettingsDelete.classList.add("cart__item__content__settings__delete");
        settings.appendChild(itemSettingsDelete);

        const deleteBtn = document.createElement("p");
        deleteBtn.classList.add("deleteItem");
        itemSettingsDelete.appendChild(deleteBtn);
        deleteBtn.textContent = "Supprimer";


        displayTotal();

        deleteBtn.addEventListener("click", deleteItem);
        inputQuantity.addEventListener("change", changeQuantity);
      }
    }
  }
}


/* On recupere les prix */
function displayTotal() {
  getProducts.then( (products) => display(products) )
    .catch( (error) => console.error(`Fetch problem displayTotal: ${error}`) );
}


/* Affichage des qte et des prix */
function display(products) {
  let totalQuantity = document.getElementById("totalQuantity");
  let totalPrice = document.getElementById("totalPrice");
  totalQuantity.textContent = 0;
  totalPrice.textContent = 0;
  for (let product of products) {
    for (let i in cartContent) {
      if (product._id == cartContent[i].id) {
      totalQuantity.textContent = Number(totalQuantity.textContent) + parseInt(`${cartContent[i].quantity}`);
      totalPrice.textContent = Number(totalPrice.textContent) + ((product.price) * parseInt(`${cartContent[i].quantity}`));
      }
    }
  }
  let jsonCart = JSON.stringify(cartContent);
  localStorage.setItem("product", jsonCart);
}


/* Fonction supprimer un article */
function deleteItem(e) {
  let inputQuantity = document.querySelector(".itemQuantity");
  let orderSubmit = document.querySelector(".cart__order__form__submit");
  const parent = e.target.closest("article.cart__item");
  parent.remove();

  for (let i in cartContent) {
    let parentId = parent.getAttribute("data-id");
    let parentColor = parent.getAttribute("data-color");
    if (parentId == cartContent[i].id && parentColor == cartContent[i].color) {
      cartContent.splice(i, 1);
      let jsonCart = JSON.stringify(cartContent);
      localStorage.setItem("product", jsonCart);
      displayTotal();
    }
  }

  if (orderSubmit.style.display == "none") {
    orderSubmit.removeAttribute("style");
    cartPrice.removeAttribute("style");
    inputQuantity.removeAttribute("style");
  }
}


/* Changement de qte dans le panier */
function changeQuantity(e) {
  let parent = e.target.closest("article.cart__item");
  let parentId = parent.getAttribute("data-id");
  let parentColor = parent.getAttribute("data-color");

  for (let i in cartContent) {
    if (parentId == `${cartContent[i].id}` && parentColor == `${cartContent[i].color}`) {
      cartContent[i].quantity = e.target.value;
      if (e.target.value <= 0 || e.target.value > 100) {
        let orderSubmit = document.querySelector(".cart__order__form__submit");
        e.target.style.color = "red";
        e.target.style.border ="solid 3px red";
        e.target.style.fontWeight = "bold";
        orderSubmit.style.display = "none";
        cartPrice.style.display = "none";
        e.target.addEventListener("change", (e) => {
          if (e.target.value > 0 && e.target.value < 101)
          orderSubmit.removeAttribute("style");
          cartPrice.removeAttribute("style");
          e.target.removeAttribute("style");
          changeQuantity(e);
        })
      }
      displayTotal();
    }
  }
}

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
    console.log(address.value);
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
  if (!cartContent) {
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
      for (product of cartContent) 
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