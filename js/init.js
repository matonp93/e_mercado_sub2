const CATEGORIES_URL = 'https://japceibal.github.io/emercado-api/cats/cat.json';
const PUBLISH_PRODUCT_URL = 'https://japceibal.github.io/emercado-api/sell/publish.json';
const PRODUCTS_URL = 'https://japceibal.github.io/emercado-api/cats_products/';
const PRODUCT_INFO_URL = 'https://japceibal.github.io/emercado-api/products/';
const PRODUCT_INFO_COMMENTS_URL = 'https://japceibal.github.io/emercado-api/products_comments/';
const CART_INFO_URL = 'https://japceibal.github.io/emercado-api/user_cart/';
const CART_BUY_URL = 'https://japceibal.github.io/emercado-api/cart/buy.json';
const EXT_TYPE = '.json';
const btnSalir = document.getElementById('deslogear');
const btnVerPerfil = document.getElementById('irAPerfil');

let showSpinner = function () {
	document.getElementById('spinner-wrapper').style.display = 'block';
};

let hideSpinner = function () {
	document.getElementById('spinner-wrapper').style.display = 'none';
};

let getJSONData = function (url) {
	let result = {};
	showSpinner();
	return fetch(url)
		.then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw Error(response.statusText);
			}
		})
		.then(function (response) {
			result.status = 'ok';
			result.data = response;
			hideSpinner();
			return result;
		})
		.catch(function (error) {
			result.status = 'error';
			result.data = error;
			hideSpinner();
			return result;
		});
};

function salir() {
	localStorage.clear();
	location.href = 'login.html';
} //Se encarga de limpiar el localStorage y nos redirecciona a la pagina login.html

function verPerfil() {
	location.href = 'my-profile.html';
} // Nos redirecciona a la pagina my-profile.html

document.addEventListener('DOMContentLoaded', function () {
	let userNav = document.getElementById('user-info'); //Se selecciona un elemento del DOM con el id "user-info" y lo almacena en la variable userNav

	let storedUserName = localStorage.getItem('email'); //Se accede al valor del email almacenado en el localStorage

	let parts = storedUserName.split('@'); //Divide la dirección de correo electrónico en partes utilizando el símbolo "@" como delimitador

	let username = parts[0]; //Se obtiene solo el nombre de usuario

	userNav.textContent = username; //Se establece el nombre de usuario como contenido

	btnSalir.addEventListener('click', () => {
		salir();
	});

	btnVerPerfil.addEventListener('click', () => {
		verPerfil();
	});
});

// Modo Oscuro

const modoOscuroBtn = document.querySelector('#modoOscuro');

modoOscuroBtn.addEventListener('click', () => {
	if (modoOscuroBtn.innerText === 'Modo Oscuro') {
		modoOscuroBtn.innerText = 'Modo Claro';
	} else {
		modoOscuroBtn.innerText = 'Modo Oscuro';
	}
});
