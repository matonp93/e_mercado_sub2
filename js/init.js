const CATEGORIES_URL = 'https://japceibal.github.io/emercado-api/cats/cat.json';
const PUBLISH_PRODUCT_URL = 'https://japceibal.github.io/emercado-api/sell/publish.json';
const PRODUCTS_URL = 'https://japceibal.github.io/emercado-api/cats_products/';
const PRODUCT_INFO_URL = 'https://japceibal.github.io/emercado-api/products/';
const PRODUCT_INFO_COMMENTS_URL = 'https://japceibal.github.io/emercado-api/products_comments/';
const CART_INFO_URL = 'https://japceibal.github.io/emercado-api/user_cart/';
const CART_BUY_URL = 'https://japceibal.github.io/emercado-api/cart/buy.json';
const EXT_TYPE = '.json';
const modoOscuroBtn = document.getElementsByName("Tema");
const btnSalir = document.getElementById('deslogear');
const btnVerPerfil = document.getElementById('irAPerfil');
const btnCarrito = document.getElementById('carrito');


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
	localStorage.removeItem("email");
	localStorage.removeItem("password");
	location.href = 'login.html';
} //Se encarga de limpiar el localStorage y nos redirecciona a la pagina login.html

function verPerfil() {
	location.href = 'my-profile.html';
} // Nos redirecciona a la pagina my-profile.html

document.addEventListener('DOMContentLoaded', ()=> {
	btnSalir.addEventListener('click', () => {
		salir();
	});

	btnVerPerfil.addEventListener('click', () => {
		verPerfil();
	});

	btnCarrito.addEventListener('click', () => {
	location.href = 'cart.html';
})

	modoOscuroBtn.forEach(radio =>{
		radio.addEventListener('click', () => {
			DiferenciarTema(radio.value);
			localStorage.setItem("preferencia", radio.value);
		})
	})

	if (localStorage.getItem("productosCarrito") == null){
		localStorage.setItem("productosCarrito", JSON.stringify([]));
	}

	//Pone el nombre del usuario en el dropdown del navbar
	document.getElementById('user-info').textContent = localStorage.getItem('email').split('@')[0];
		
	DiferenciarTema(localStorage.getItem("preferencia"));
});

// Modo Oscuro

function DiferenciarTema(value){
	switch(value){
		case "Oscuro":
			document.getElementById("Oscuro").checked = true;
			cambiarTema("Dark");
			break;
		case "Claro":
			document.getElementById("Claro").checked = true;
			cambiarTema("Light");
			break;
		case "Sistema":
			document.getElementById("Sistema").checked = true;
			if (window.matchMedia) {
				if(window.matchMedia('(prefers-color-scheme: dark)').matches){
					cambiarTema("Dark");
				} else {
					cambiarTema("Light");
				}
			  }else {
				alert("Tu sistema no tiene un tema predefinido");
				document.getElementById("Oscuro").checked = true;
				localStorage.setItem("preferencia", "Oscuro");
				cambiarTema("Dark");
			  }
			break;
		default:
			document.getElementById("Oscuro").checked = true;
			localStorage.setItem("preferencia", "Oscuro");
			cambiarTema("Dark")
			break;
	};
};

function cambiarTema(tema){
	console.log(tema);
	switch(tema){
		case "Dark":
			document.querySelectorAll("body *, body").forEach(element => element.setAttribute("data-theme","dark"));
			break;
		case "Light":
			document.querySelectorAll("body *, body").forEach(element => element.removeAttribute("data-theme"));
			break;
	}
};

