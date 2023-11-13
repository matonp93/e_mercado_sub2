const CATEGORIES_URL = 'http://localhost:3000/categories';
const PUBLISH_PRODUCT_URL = 'https://japceibal.github.io/emercado-api/sell/publish.json';
const PRODUCTS_URL = 'http://localhost:3000/products/';
const PRODUCT_INFO_URL = 'http://localhost:3000/productinfo/';
const PRODUCT_INFO_COMMENTS_URL = 'http://localhost:3000/comments/';
const CART_INFO_URL = 'https://japceibal.github.io/emercado-api/user_cart/';
const CART_BUY_URL = 'https://japceibal.github.io/emercado-api/cart/buy.json';
const EXT_TYPE = '';
const modoOscuroBtn = document.getElementsByName("Tema");
const btnSalir = document.getElementById('deslogear');
const btnVerPerfil = document.getElementById('irAPerfil');
const btnCarrito = document.getElementById('carrito');
let sumaNavbar = 0;

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
	if (localStorage.email === "invitado"){ // Comprueba si esta ingresado como invitado
		location.href = 'login.html';
	} else {
		location.href = 'my-profile.html';
	};
} // Nos redirecciona a la pagina my-profile.html

document.addEventListener('DOMContentLoaded', ()=> {
	btnSalir.addEventListener('click', () => {
		salir();
	});

	btnVerPerfil.addEventListener('click', () => {
		verPerfil();
	});
	if (!(document.location.pathname.includes('/cart.html'))){
	btnCarrito.addEventListener('click', () => {
	location.href = 'cart.html';
})}

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

function DiferenciarTema(value){ // Funcion para detectar el tema elegido por el usuario
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
				};
			} else {
				alert("Tu sistema no tiene un tema predefinido");
				document.getElementById("Oscuro").checked = true;
				localStorage.setItem("preferencia", "Oscuro");
				cambiarTema("Dark");
			};
			break;
		default:
			document.getElementById("Oscuro").checked = true;
			localStorage.setItem("preferencia", "Oscuro");
			cambiarTema("Dark")
			break;
	};
};

function cambiarTema(tema){ // Funcion que cambia el tema de la pagina
	switch(tema){
		case "Dark":
			document.querySelectorAll("body *, body").forEach(element => element.setAttribute("data-theme","dark"));
			break;
		case "Light":
			document.querySelectorAll("body *, body").forEach(element => element.removeAttribute("data-theme"));
			break;
	};
};


function productosNavbar(element) {
	
	let imgDiv = document.createElement('div');
	imgDiv.classList.add('imgDiv');
	let imagen = document.createElement('img');
	imagen.setAttribute('src', element.images[0]);
	imagen.classList.add('imgCarrito');
	imgDiv.appendChild(imagen);

	let botonDiv = document.createElement('div');
	botonDiv.classList.add('botonDiv');
	let tituloDiv = document.createElement('div');
	let titulo = document.createElement('p');
	let botonEliminar = document.createElement('button');
	botonEliminar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>';
	botonEliminar.classList.add('btnEliminar');
	botonEliminar.addEventListener("click", (e) =>{
		containerDiv.remove();
		if (element.currency === "USD") {
			sumaNavbar -= parseInt(element.cost);
			
		}
		else {
			sumaNavbar -= element.cost / 40;
		}	
		let arrayProducts = JSON.parse(localStorage.productosCarrito);
		let indice = arrayProducts.indexOf(element.id);
		arrayProducts.splice(indice, 1);
		localStorage.productosCarrito = JSON.stringify(arrayProducts);
		
		subtotalNavbar();
	})

	botonEliminar.classList.add('botonEliminar');
	tituloDiv.classList.add('tituloCarrito');
	titulo.innerHTML += element.name + ' <br>';
	titulo.classList.add('tituloInd');
	tituloDiv.appendChild(titulo);
	botonDiv.appendChild(botonEliminar);
	

	let precioDiv = document.createElement('div');
	precioDiv.classList.add('divPrecio');
	let p = document.createElement('p');
	p.classList.add('precioInd');
	p.innerHTML += element.currency + ' ' + element.cost;
	precioDiv.appendChild(p);

	let containerDiv = document.createElement('div');
	containerDiv.classList.add('containerCarrito');
	imgDiv.appendChild(imagen);
	containerDiv.appendChild(imgDiv);
	containerDiv.appendChild(tituloDiv);
	containerDiv.appendChild(precioDiv);
	containerDiv.appendChild(botonDiv);
	

	let productoNavbar = document.getElementById("productoNavbar");
	productoNavbar.appendChild(containerDiv);

	
	if (element.currency === "USD") {
		sumaNavbar += parseInt(element.cost);
		
	}
	else {
		sumaNavbar += element.cost / 40;
	}	
	
}

function subtotalNavbar (){
	
	let subtotalNavbar = document.getElementById("subtotalNavbar");
	
	subtotalNavbar.innerHTML = "USD " + sumaNavbar.toFixed(2);
} 

function carritoNavbar() {
	let prods = JSON.parse(localStorage.productosCarrito);
	prods.forEach((element) =>
	fetch(PRODUCT_INFO_URL + element + EXT_TYPE)
		.then((response) => response.json())
		.then((data) =>  productosNavbar(data))
		);

}
if (!(document.location.pathname.includes('/cart.html'))){
	carritoNavbar();
	setTimeout(() => {
		subtotalNavbar();
	}, 1000);
}





