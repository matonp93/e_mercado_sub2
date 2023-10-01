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
	const modoOscuroBtn = document.getElementsByName("Tema");

	switch(localStorage.getItem("preferencia")){
		case "Oscuro":
			document.getElementById("Oscuro").checked = true;
				break;
			case "Claro":
			document.getElementById("Claro").checked = true;
				break;
			case "Sistema":
			document.getElementById("Sistema").checked = true;
				break;
			default:
			document.getElementById("Claro").checked = true;
			localStorage.setItem("preferencia", "Claro");
			break;
	}	
	DetectarTema(localStorage.getItem("preferencia"));


	modoOscuroBtn.forEach(radio =>{
		radio.addEventListener('click', () => {
			DetectarTema(radio.value);
			localStorage.setItem("preferencia", radio.value);
		})
	})

	btnSalir.addEventListener('click', () => {
		salir();
	});

	btnVerPerfil.addEventListener('click', () => {
		verPerfil();
	});
});

// Modo Oscuro
let links = document.head.getElementsByTagName("link");

function DetectarTema(value){
	switch(value){
		case "Oscuro":
			cambiarTema("Light", "Dark");
			break;
		case "Claro":
			cambiarTema("Dark", "Light");
			break;
		case "Sistema":
			if (window.matchMedia) {
				if(window.matchMedia('(prefers-color-scheme: dark)').matches){
					cambiarTema("Light", "Dark");
				} else {
					cambiarTema("Dark", "Light");
				}
			  }
			break;
	}
}
function cambiarTema(estiloABorrar, estiloAAgregar){
	for (let link of links){
		if (link.getAttribute("href") === "css/productos" + estiloABorrar + ".css"){
			let linkNuevo = document.createElement("link");
			linkNuevo.href = "css/productos" + estiloAAgregar + ".css";
			linkNuevo.rel = "stylesheet";
			link.parentNode.appendChild(linkNuevo);
			setTimeout(() => {
				link.parentNode.removeChild(link);
			}, 10);
			break;
		};
	};
};

