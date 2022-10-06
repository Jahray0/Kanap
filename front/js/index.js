//récupération des données via fetch
const getUrl = "http://localhost:3000/api/products/";
let getKanap = function () {
  fetch(getUrl)
    .then((response) => response.json())
    .then((kanaps) => {
      //test pour voir notre element kanaps dans la console
      console.log(kanaps);

      let items = document.getElementById("items");
      //Affichage de tous les produits contenu dans kanaps
      for (i = 0; i < kanaps.length; i++) {

       let lien = document.createElement('a');                 //création d'une balise lien
       document.querySelector('section').appendChild(lien);    
       lien.href = `product.html?id=${kanaps[i]._id}`;         //ajout de l'url au lien avec l'id du kanap
       lien.classList.add("test-lien");                        

       let art = document.createElement('article');            //création d'un article
       lien.appendChild(art);                                  

       let image = document.createElement('img');              //création d'une balise img
       image.setAttribute('src',`${kanaps[i].imageUrl}`)       
       image.setAttribute('alt',`${kanaps[i].altTxt}`)         
       art.appendChild(image);                                 

       let titre = document.createElement('h3');               //création d'une balise h3
       art.appendChild(titre);                                 
       lien.classList.add("productName");                      
       titre.innerText = `${kanaps[i].name}`;                  

       let paragraphe = document.createElement('p');           //création d'une balise p
       art.appendChild(paragraphe);                            
       lien.classList.add("productDesciption");                
       paragraphe.innerText = `${kanaps[i].description}`;      
        
      }
    });
};
getKanap();

