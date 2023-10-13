const comentarios = document.getElementsByClassName('comentarios')[0];
const infoProductos = document.getElementsByClassName('info_prod')[0];
const productosRelacionados = document.getElementsByClassName('related-products')[0];
const comentariosSection = document.getElementsByClassName('comment-section__comment-container')[0];
const commentList = document.querySelector('.comment-container__comment-list');
const btnEnviar = document.getElementById('enviar');

document.addEventListener('DOMContentLoaded', () => {
	let localStorageValue = localStorage.getItem('cardId');

	// FECTH PARA INFO DEL PRODUCTO //
	fetch(PRODUCT_INFO_URL + localStorageValue + EXT_TYPE)
		.then((response) => response.json())
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
			data.images.forEach((image) => {
				let imginfo = document.createElement('img');
				imginfo.setAttribute('src', image);
				divimgInfo.classList.add('divImgInfo');
				divimgInfo.appendChild(imginfo);
			});

			// Array de productos relacionados //
			let divRelatedProducts = document.createElement('div');
			divRelatedProducts.classList.add('relatedProducts');
			data.relatedProducts.forEach((element) => {
				let divProductoRelacionado = document.createElement('div');
				let imageProductoRelacionado = document.createElement('img');
				let nameProductoRelacionado = document.createElement('p');

				// Atributos y clases //
				divProductoRelacionado.classList.add('divRelated');
				imageProductoRelacionado.classList.add('imageRelated');
				nameProductoRelacionado.classList.add('pRelated');
				imageProductoRelacionado.setAttribute('src', element.image);
				nameProductoRelacionado.innerHTML += element.name;
				divProductoRelacionado.addEventListener('click', () => {
					localStorage.setItem('cardId', element.id);
					location.href = 'product-info.html';
				});
				divProductoRelacionado.appendChild(imageProductoRelacionado);
				divProductoRelacionado.appendChild(nameProductoRelacionado);
				divRelatedProducts.appendChild(divProductoRelacionado);
			});
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
				let productosCarrito = JSON.parse(localStorage.getItem('productosCarrito'));
				if (productosCarrito.includes(data.id)) {
					alert('Ya esta en el carrito mi rey');
				} else {
					productosCarrito.push(data.id);
					localStorage.setItem('productosCarrito', JSON.stringify(productosCarrito));
				}
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
	fetch(PRODUCT_INFO_COMMENTS_URL + localStorageValue + EXT_TYPE)
		.then((response) => response.json())
		.then((data) => {
			data.forEach((element) => {
				// Creación de elementos HTML //
				let divCard = document.createElement('div');
				let divCardLoad = document.createElement('div');
				let divDescription = document.createElement('div');
				let pTitle = document.createElement('p');
				let pDescription = document.createElement('p');
				let image = document.createElement('object');

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
				image.data = 'gitlab.svg';
				image.type = 'image/svg+xml';
				image.onload = (e) => ResetearColores();
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
	// Creacion de elementos HTML //
	let divCard = document.createElement('div');
	let divCardLoad = document.createElement('div');
	let divDescription = document.createElement('div');
	let pTitle = document.createElement('p');
	let pDescription = document.createElement('p');
	let image = document.createElement('object');

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

	// Atributos y clases //
	image.data = 'gitlab.svg';
	image.type = 'image/svg+xml';
	image.onload = (e) => ResetearColores();
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
	document.getElementById('add-comment__input').value = '';
	puntajes.forEach((element) => (element.checked = false));
}

function ResetearColores() {
	let colores = ['#ffa7a7', '#ffa7fb', '#fff9a7', '#a7b0ff', '#b1ffa7', '#a7ffff'];
	let contador = 0;
	Array.from(document.getElementsByTagName('object')).forEach((element) => {
		if (contador > colores.length - 1) {
			contador = 0;
		}
		element.contentDocument.getElementsByTagName('svg')[0].style.color = colores[contador];
		contador++;
	});
}
