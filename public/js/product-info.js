const comentarios = document.getElementsByClassName('comentarios')[0];
const infoProductos = document.getElementsByClassName('info_prod')[0];
const productosRelacionados = document.getElementsByClassName('related-products')[0];
const comentariosSection = document.getElementsByClassName('comment-section__comment-container')[0];
const commentList = document.querySelector('.comment-container__comment-list');
const btnEnviar = document.getElementById('enviar');

document.addEventListener('DOMContentLoaded', () => {
	let localStorageValue = localStorage.getItem('cardId');

	// FECTH PARA INFO DEL PRODUCTO //
	fetch(PRODUCT_INFO_URL + localStorageValue)
		.then((response) => response.json())
		.then(data => data[0])
		.then((data) => {
			// Creación de elementos HTML //
			let divinfoTitle = document.createElement('div');
			let divinfoImages = document.createElement('div');
			let divPrice = document.createElement('div');
			let divBtnCarrito = document.createElement('div');
			let divSoldCount = document.createElement('div');
			let divinfoP = document.createElement('div');
			let h1infoTitle = document.createElement('h1');
			let pPrice = document.createElement('p');
			let pDescription = document.createElement('p');
			let pCategory = document.createElement('p');
			let pSoldCount = document.createElement('p');
			let btnAddCarrito = document.createElement('button');
			// Array de imagenes //
			let divimgInfo = document.createElement('div');
			data.images.split(',').forEach((image) => {
				let imginfo = document.createElement('img');
				imginfo.setAttribute('src', "http://localhost:3000/"+image);
				divimgInfo.classList.add('divImgInfo');
				divimgInfo.appendChild(imginfo);
			});

			// Array de productos relacionados //
			let divRelatedProducts = document.createElement('div');
			divRelatedProducts.classList.add('relatedProducts');
			data.relatedProducts.split(',').forEach((element) => {
				fetch(PRODUCT_INFO_URL + element)
				.then(response => response.json())
				.then(data => data[0])
				.then(data => {

				let divProductoRelacionado = document.createElement('div');
				let imageProductoRelacionado = document.createElement('img');
				let nameProductoRelacionado = document.createElement('p');
				// Atributos y clases //
				divProductoRelacionado.classList.add('divRelated');
				imageProductoRelacionado.classList.add('imageRelated');
				nameProductoRelacionado.classList.add('pRelated');
				imageProductoRelacionado.setAttribute('src', "http://localhost:3000/"+data.images.split(",")[0]);
				nameProductoRelacionado.innerHTML += data.name;
				divProductoRelacionado.addEventListener('click', () => {
					localStorage.setItem('cardId', data.id);
					location.href = 'product-info.html';
				});
				divProductoRelacionado.appendChild(imageProductoRelacionado);
				divProductoRelacionado.appendChild(nameProductoRelacionado);
				divRelatedProducts.appendChild(divProductoRelacionado);
			})});
			productosRelacionados.appendChild(divRelatedProducts);

			// Atributos y clases //
			divinfoP.classList.add('divInfoP');
			divinfoTitle.classList.add('divinfoTitle');
			divinfoImages.classList.add('divinfoImages');
			divPrice.classList.add('divPrice');
			divBtnCarrito.classList.add('divBtnCarrito');
			divSoldCount.classList.add('divSoldCount');
			h1infoTitle.classList.add('h1infoTitle');
			pPrice.classList.add('pPrice');
			pDescription.classList.add('pDescription');
			pCategory.classList.add('pCategory');
			pSoldCount.classList.add('pSoldCount');
			btnAddCarrito.classList.add('btnAddCarrito');
			btnAddCarrito.addEventListener('click', () => {
				fetch(
					USERS_CART, {
					  headers: { "Content-Type": "application/json; charset=utf-8",
					  "authorization":  "Bearer "+localStorage.token },
					  method: 'POST',
					  body: JSON.stringify({
						"productid": localStorageValue
					  })
					})
					.then(response => response.json())
					.then(data => {
						if(data == "Entrada duplicada"){
							alert("Este producto ya se encuentra en el carrito");
						}
					})
					.catch(error => console.log(error))
			});

			// Contenido de cada elemento //
			h1infoTitle.innerHTML = data.name;
			pPrice.innerHTML = data.currency + ' ' + data.cost;
			pDescription.innerHTML = '<b>Descripción:</b> <br>' + data.description;
			pCategory.innerHTML = ' ';
			pSoldCount.innerHTML = '<b>Vendidos:</b>   ' + data.soldCount;
			btnAddCarrito.innerHTML = `<div id="agregarAlCarrito">
				<p>Agregar al carrito</p>
				<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
				<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
				<path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
				<path d="M12.5 17h-6.5v-14h-2"></path>
				<path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5"></path>
				<path d="M16 19h6"></path>
				<path d="M19 16v6"></path>
				</svg>
			</div>`;

			// AppendChild's //
			divinfoTitle.appendChild(h1infoTitle);
			divPrice.appendChild(pPrice);
			divinfoP.appendChild(pDescription);
			divBtnCarrito.appendChild(btnAddCarrito);
			divSoldCount.appendChild(pSoldCount);
			infoProductos.appendChild(divinfoTitle);
			infoProductos.appendChild(divBtnCarrito);
			infoProductos.appendChild(divPrice);
			infoProductos.appendChild(divSoldCount);
			infoProductos.appendChild(divimgInfo);
			infoProductos.appendChild(divinfoP);
		});

	// FETCH PARA COMENTARIOS DEL PRODUCTO //
	fetch(PRODUCT_INFO_COMMENTS_URL + localStorageValue)
		.then((response) => response.json())
		.then((data) => {
			data.forEach((element) => {
				// Creación de elementos HTML //
				let divCard = document.createElement('div');
				let divCardLoad = document.createElement('div');
				let divDescription = document.createElement('div');
				let pTitle = document.createElement('p');
				let pDescription = document.createElement('p');
				let image = document.createElement('img');

				// Estrellas en los comentarios //
				let estrellas = [];
				for (let i = 0; i < 5; i++) {
					estrellas.push(document.createElement('label'));
					estrellas[i].classList.add('fa');
					estrellas[i].classList.add('fa-star');
					estrellas[i].style.color = 'grey';
					pTitle.appendChild(estrellas[i]);
				}

				for (let i = 0; i < element.score; i++) {
					estrellas[i].style.color = '#fd4';
				}
				// Atributos y clases //
				image.src = `http://localhost:3000/images/${element.image}`;
				image.classList.add("imagenPerfil");
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
function agregarComentario() {
	if(localStorage.token != "invitado"){
		fetch(USERS_URL,{
			headers: { "Content-Type": "application/json; charset=utf-8",
			"authorization":  "Bearer "+localStorage.token}
		  })
		  .then(response => response.json())
		  .then(data => {
			if(data == "token expirado"){
				location.href="login.html";
			}else{
			return data[0];
			}
			})
		  .then(data => {
	// Creacion de elementos HTML //
	let divCard = document.createElement('div');
	let divCardLoad = document.createElement('div');
	let divDescription = document.createElement('div');
	let pTitle = document.createElement('p');
	let pDescription = document.createElement('p');
	let image = document.createElement('img');
	
	// Nombre del user //
	let user = data.username;

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
	for (let i = 0; i < 5; i++) {
		estrellas.push(document.createElement('label'));
		estrellas[i].classList.add('fa');
		estrellas[i].classList.add('fa-star');
		estrellas[i].style.color = 'grey';
		pTitle.appendChild(estrellas[i]);
	}

	for (let i = 0; i < puntaje; i++) {
		estrellas[i].style.color = '#fd4';
	}
	fetch(PRODUCT_INFO_COMMENTS_URL,{
		headers: { "Content-Type": "application/json; charset=utf-8",
		"authorization":  "Bearer "+localStorage.token},
		method: 'POST',
		body: JSON.stringify({
			"product": localStorage.cardId,
			"score": puntaje,
			"description": comentario,
			"dateTime":  getDateTime()
		})
	  })
	  .then(response => response.json())
	  .then(data => {
		if(data == "token expirado"){
			location.href = "login.html"
		}
	  })
	  .catch(error => console.log(error));
	// Atributos y clases //
	image.src = `http://localhost:3000/images/${data.image}`;
	image.classList.add("imagenPerfil");
	pTitle.classList.add('comment-title');
	divCard.classList.add('cards');
	divCardLoad.classList.add('tarjeta_load');
	divDescription.classList.add('tarjeta_load_extreme_description');
	pTitle.innerHTML = user;
	pDescription.innerHTML = comentario;

	// AppendChild's //
	divDescription.appendChild(pTitle);	
	divDescription.appendChild(pDescription);
	divCardLoad.appendChild(image);
	divCard.appendChild(divCardLoad);
	divCard.appendChild(divDescription);
	commentList.appendChild(divCard);

	// Borrar inputs //
	document.getElementById('add-comment__input').value = '';
	puntajes.forEach((element) => (element.checked = false));
  }).catch(error => console.log(error));
}else{
	alert("Debe ser un usuario registrado para comentar");
}
}

 function getDateTime() {
	var now     = new Date(); 
	var year    = now.getFullYear();
	var month   = now.getMonth()+1; 
	var day     = now.getDate();
	var hour    = now.getHours();
	var minute  = now.getMinutes();
	var second  = now.getSeconds(); 
	if(month.toString().length == 1) {
		 month = '0'+month;
	}
	if(day.toString().length == 1) {
		 day = '0'+day;
	}   
	if(hour.toString().length == 1) {
		 hour = '0'+hour;
	}
	if(minute.toString().length == 1) {
		 minute = '0'+minute;
	}
	if(second.toString().length == 1) {
		 second = '0'+second;
	}   
	var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
	 return dateTime;
}