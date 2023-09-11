const comentarios = document.getElementsByClassName("comentarios")[0];
const infoProductos = document.getElementsByClassName("info_prod")[0];
const comentariosSection = document.getElementsByClassName('comment-section__comment-container')[0];
const commentList = document.querySelector('.comment-container__comment-list');
const btnEnviar = document.getElementById('enviar');

document.addEventListener("DOMContentLoaded", () => {
  let localStorageValue = localStorage.getItem("cardId");

  // FECTH PARA INFO DEL PRODUCTO //
  fetch(PRODUCT_INFO_URL + localStorageValue + EXT_TYPE)
  .then(response => response.json())
  .then(data => {
    // Creación de elementos HTML //
    let divinfoP = document.createElement("div");
    let divinfoTitle = document.createElement("div");
    let divinfoImages = document.createElement("div");
    let h1infoTitle = document.createElement("h1");
    let pPrice = document.createElement("p");
    let pDescription = document.createElement("p");
    let pCategory = document.createElement("p");
    let pSoldCount = document.createElement("p");
    
    // Array de imagenes //
    let divimgInfo = document.createElement("div");
    data.images.forEach(image => {
      let imginfo = document.createElement("img");
      imginfo.setAttribute("src", image);
      divimgInfo.classList.add("divImgInfo");
      divimgInfo.appendChild(imginfo);
    });
    
    // Atributos y clases //
    divinfoP.classList.add("divInfoP");
    divinfoTitle.classList.add("divinfoTitle");
    divinfoImages.classList.add("divinfoImages");
    h1infoTitle.classList.add("h1infoTitle");
    pPrice.classList.add("pDescription");
    pDescription.classList.add("pDescription");
    pCategory.classList.add("pDescription");
    pSoldCount.classList.add("pDescription");
               
    // Contenido de cada elemento //
    h1infoTitle.innerHTML = data.name;
    pPrice.innerHTML = "<b>Precio:</b> <br>" + data.currency + " " + data.cost;
    pDescription.innerHTML = "<b>Descripción:</b> <br>" + data.description;
    pCategory.innerHTML = "<b>Categoría:</b> <br>" + data.category;
    pSoldCount.innerHTML = "<b>Cantidad de Vendidos:</b> <br>" + data.soldCount;
               
    // AppendChild's //
    divinfoTitle.appendChild(h1infoTitle);
    divinfoP.appendChild(pPrice);
    divinfoP.appendChild(pDescription);
    divinfoP.appendChild(pCategory);
    divinfoP.appendChild(pSoldCount);
    infoProductos.appendChild(divinfoTitle);
    infoProductos.appendChild(divinfoP);
    infoProductos.appendChild(divimgInfo);
  });

  // FETCH PARA COMENTARIOS DEL PRODUCTO //
  fetch(PRODUCT_INFO_COMMENTS_URL + localStorageValue + EXT_TYPE)
    .then(response => response.json())
    .then(data => {
      data.forEach(element => {
        // Creación de elementos HTML //
        let divCard = document.createElement('div');
        let divCardLoad = document.createElement('div');
        let divDescription = document.createElement('div');
        let pTitle = document.createElement('p');
        let pDescription = document.createElement('p');
        let image = document.createElement('img');

        // Estrellas en los comentarios //
        let estrellas = [];
        for (let i = 0; i < 5; i++){
          estrellas.push(document.createElement("label"));
          estrellas[i].classList.add("fa");
          estrellas[i].classList.add("fa-star");
          estrellas[i].style.color = "grey";
          pTitle.appendChild(estrellas[i]);
        };

        for (let i = 0; i < element.score; i++){
          estrellas[i].style.color = "#fd4";
        };

        // Atributos y clases //
        image.src = '/img/gitlab.svg';
        pTitle.classList.add('comment-title');
        divCard.classList.add('cards');
        divCardLoad.classList.add('tarjeta_load');
        divDescription.classList.add('tarjeta_load_extreme_description');
        pTitle.innerHTML = element.user + ' ' + pTitle.innerHTML;
        pDescription.innerHTML = element.description;

        // AppendChild's //
        divDescription.appendChild(pTitle);
        divDescription.appendChild(pDescription);
        divCardLoad.appendChild(image);
        divCard.appendChild(divCardLoad);
        divCard.appendChild(divDescription);
        commentList.appendChild(divCard);   
      });
    });

    btnEnviar.addEventListener('click', () => {
      agregarComentario();
    });

  });

// AGREGAR COMENTARIOS //
function agregarComentario(){

  // Creacion de elementos HTML //
  let divCard = document.createElement('div');
  let divCardLoad = document.createElement('div');
  let divDescription = document.createElement('div');
  let pTitle = document.createElement('p');
  let pDescription = document.createElement('p');
  let image = document.createElement('img');

	// Nombre del user //
	let user = localStorage.getItem('email');
	let partesDelUser = user.split('@');
	let nombreUser = partesDelUser[0];

	// Comentario del user //
	let comentario = document.getElementById('add-comment__input').value;

	// Puntaje //
	let puntajes = Array.from(document.getElementsByName('star'));
	let puntaje = '';
	puntajes.forEach((element) => {
		if (element.checked) {
			puntaje = element.value;
		}
	});

  // Agregar estrellas al comentario //
  let estrellas = [];
  for (let i = 0; i < 5; i++){
    estrellas.push(document.createElement("label"));
    estrellas[i].classList.add("fa");
    estrellas[i].classList.add("fa-star");
    estrellas[i].style.color = "grey";
    pTitle.appendChild(estrellas[i]);
  };

  for (let i = 0; i < puntaje; i++){
    estrellas[i].style.color = "#fd4";
  };

  // Atributos y clases //
  image.src = '/img/gitlab.svg';
  pTitle.classList.add('comment-title');
  divCard.classList.add('cards');
  divCardLoad.classList.add('tarjeta_load');
  divDescription.classList.add('tarjeta_load_extreme_description');
  pTitle.innerHTML = nombreUser + ' ' + pTitle.innerHTML;
  pDescription.innerHTML = comentario;

  // AppendChild's //
  divDescription.appendChild(pTitle);
  divDescription.appendChild(pDescription);
  divCardLoad.appendChild(image);
  divCard.appendChild(divCardLoad);
  divCard.appendChild(divDescription);
  commentList.appendChild(divCard);

  // Borrar inputs //
  document.getElementById("add-comment__input").value = "";
  puntajes.forEach(element => element.checked = false);
};
