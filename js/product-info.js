let localStorageValue = '50921';
const comentarios = document.getElementsByClassName("comentarios")[0];
const infoProductos = document.getElementsByClassName("info_prod")[0];

document.addEventListener("DOMContentLoaded",()=>{
   // localStorageValue = localStorage.getItem("cardId");
  fetch(PRODUCT_INFO_COMMENTS_URL + localStorageValue +EXT_TYPE)
  .then(response => response.json())
  .then(data => {
        data.forEach(element => {
            //Creación de elementos HTML
            let divCard = document.createElement("div");
            let divCardLoad = document.createElement("div");
            let divTitle = document.createElement("div");
            let divDescription = document.createElement("div");
            let pTitle = document.createElement("p");
            let pDescription = document.createElement("p");
            let image = document.createElement("img");
            //Atributos y clases
            image.src = "/img/gitlab.svg";
            divCard.classList.add("tarjeta");
            divCardLoad.classList.add("tarjeta_load");
            divTitle.classList.add("tarjeta_load_extreme_title");
            divDescription.classList.add("tarjeta_load_extreme_description");
            pTitle.innerHTML = element.user + " " + element.dateTime + " " + element.score;
            pDescription.innerHTML = element.description;
            //AppendChild's
            divTitle.appendChild(pTitle);
            divDescription.appendChild(pDescription);
            divCardLoad.appendChild(image)
            divCard.appendChild(divCardLoad);
            divCard.appendChild(divTitle);
            divCard.appendChild(divDescription);
            comentarios.appendChild(divCard);
        });
  });

  //Pedido a la URL informacion producto 
  console.log(PRODUCT_INFO_URL + localStorageValue +EXT_TYPE)
  fetch(PRODUCT_INFO_URL + localStorageValue +EXT_TYPE)
  .then(response => response.json())
  .then(data => {
            //Creación de elementos HTML
            let divinfoP = document.createElement("div");
            let divinfoTitle = document.createElement("div");
            let divinfoImages = document.createElement("div");
            let h1infoTitle = document.createElement("h1");
            let pPrice = document.createElement("p");
            let pDescription = document.createElement("p");
            let pCategory = document.createElement("p");
            let pSoldCount = document.createElement("p");

            //array de imagenes
            let divimgInfo = document.createElement("div");
            data.images.forEach(image => {
                let imginfo = document.createElement("img");
                imginfo.setAttribute("src", image);
                divimgInfo.classList.add("divImgInfo");
                divimgInfo.appendChild(imginfo);
            })

            //Atributos y clases
            divinfoP.classList.add("divInfoP");
            divinfoTitle.classList.add("divinfoTitle");
            divinfoImages.classList.add("divinfoImages");
            h1infoTitle.classList.add("h1infoTitle");
            pPrice.classList.add("pDescription");
            pDescription.classList.add("pDescription");
            pCategory.classList.add("pDescription");
            pSoldCount.classList.add("pDescription");
           
            //Contenido de cada elemento:

            h1infoTitle.innerHTML = data.name;
            pPrice.innerHTML = "<b>Precio:</b> <br>" + data.currency + " " + data.cost;
            pDescription.innerHTML = "<b>Descripción:</b> <br>" + data.description;
            pCategory.innerHTML = "<b>Categoría:</b> <br>" + data.category;
            pSoldCount.innerHTML = "<b>Cantidad de Vendidos:</b> <br>" + data.soldCount;
           
            //AppendChild's
            divinfoTitle.appendChild(h1infoTitle);
            divinfoP.appendChild(pPrice);
            divinfoP.appendChild(pDescription);
            divinfoP.appendChild(pCategory);
            divinfoP.appendChild(pSoldCount);
            infoProductos.appendChild(divinfoTitle);
            infoProductos.appendChild(divinfoP);
            infoProductos.appendChild(divimgInfo);
  });
})





