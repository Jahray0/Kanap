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













//Fontion permettant de récupere les données de l'API
/*function getKanap() {
  fetch("http://localhost:3000/api/products")
    .then(function (res) {
      return res.json();
    })


.then(function (getAPI) {
    const kanaps = getAPI;
    //console.log(kanaps);              Affichage de l'api
    //console.log(kanaps[1].colors);    Affichage des couleurs du second Kanap 

    for (let kanap in kanaps){
      // //on parcours tous les elements de l'api
      // let lien = document.createElement('a');                 //création d'une balise lien
      // document.querySelector('section').appendChild(lien);    //fils de section
      // lien.href = `product.html?id=${kanaps[kanap]._id}`;     //ajout de l'url au lien avec l'id du kanap
      // lien.classList.add("test-lien");                        

      // let art = document.createElement('article');            //création d'un article
      // lien.appendChild(art);                                  //fils du lien

      // let image = document.createElement('img');              //création d'une balise img
      // image.setAttribute('src',`${kanaps[kanap].imageUrl}`)   //ajout de l'url de l'img
      // image.setAttribute('alt',`${kanaps[kanap].altTxt}`)     //ajout de l'alt de l'img
      // art.appendChild(image);                                 //fils de article

      // let titre = document.createElement('h3');               //création d'une balise h3
      // art.appendChild(titre);                                 //fils de article
      // lien.classList.add("productName");                      //ajout de la class productName
      // titre.innerText = `${kanaps[kanap].name}`;              //ajout du titre

      // let paragraphe = document.createElement('p');           //création d'une balise p
      // art.appendChild(paragraphe);                            //fils de article  
      // lien.classList.add("productDesciption");                //ajout de la class productDesciption  
      // paragraphe.innerText = `${kanaps[kanap].description}`;  //ajout de la description  
    }

});
}

getKanap();*/