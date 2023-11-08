// VARIABLES
const productsTitle = document.getElementById('productsTitle');
const productsDesc = document.getElementById('productsDesc');
const btnFiltrar = document.getElementById('filtrar');
const btnNormal = document.getElementById('normal');
const btnAscendente = document.getElementById('ascendentePorPrecio');
const btnDescendente = document.getElementById('descendentePorPrecio');
const btnDescendenteRelevancia = document.getElementById('descendentePorRelevancia');
const precioMinimo = document.getElementById('precioMinimo');
const precioMaximo = document.getElementById('precioMaximo');
const searchinput = document.getElementById("searchinput");
const btninput = document.getElementById("button-addon2");
const products = document.getElementById('products');

document.addEventListener("DOMContentLoaded", () => {
	searchinput.value = localStorage.getItem("searchquery");
	localStorage.removeItem("searchquery");
	initialApiGetData();

	btninput.addEventListener("click", () => {
		filtrarPriceRangeYBusqueda(searchinput.value.toLowerCase());
	});

	btnFiltrar.addEventListener('click', () => {
		filtrarPriceRangeYBusqueda(searchinput.value.toLowerCase());
	});

	btnNormal.addEventListener('click', () => {
		volverAlNormal();
	});

	btnAscendente.addEventListener('click', () => {
		ordenarAscendenciaPorPrecio();
	});

	btnDescendente.addEventListener('click', () => {
		ordenarDesendenciaPorPrecio();
	});

	btnDescendenteRelevancia.addEventListener('click', () => {
		ordenarDesendenciaPorRelevancia();
	});

	precioMinimo.addEventListener('click', (e) => {
		e.stopPropagation();
	});

	precioMaximo.addEventListener('click', (e) => {
		e.stopPropagation();
	});

});

function initialApiGetData(){
	getJSONData(CATEGORIES_URL)
	.then(response => {
		response.data.forEach(element =>{
			getJSONData(PRODUCTS_URL + element.id + EXT_TYPE)
			.then(response =>{
				response.data.products.forEach(element =>{
					contentProducts(element);
				})
			})
		})
	})
}

function contentProducts(element) {
	let h3 = document.createElement('h3');
	h3.innerHTML += element.name + ' <br>';
	h3.classList.add('tituloProducto');
	let precioDiv = document.createElement('div');
	let h2 = document.createElement('h2');
	let p0 = document.createElement('p');
	p0.innerHTML += element.cost;
	h2.innerHTML += element.currency + ' ';
	precioDiv.appendChild(h2);
	precioDiv.appendChild(p0);
	h2.classList.add('currency');
	p0.classList.add('precio');
	let p1 = document.createElement('p');
	p1.classList.add('descripcion');
	p1.innerHTML += element.description;
	let p2 = document.createElement('p');
	p2.classList.add('vendidos');
	p2.innerHTML += element.soldCount + ' vendidos';
	/* Contenedores y clase de divs*/
	let containerDiv = document.createElement('div');
	containerDiv.classList.add('productcard');
	containerDiv.setAttribute('cardId', element.id);
	let imgDiv = document.createElement('div');
	imgDiv.classList.add('imgdiv');
	let h3Div = document.createElement('div');
	h3Div.classList.add('h3div');
	let pDiv = document.createElement('div');
	pDiv.classList.add('pdiv');
	let p2Div = document.createElement('div');
	p2Div.classList.add('p2div');
	let image = document.createElement('img');
	image.setAttribute('src', element.image);
	imgDiv.appendChild(image);
	h3Div.appendChild(h3);
	//h3Div.appendChild(h2);
	h3Div.appendChild(precioDiv);
	h3Div.appendChild(p1);
	p2Div.appendChild(p2);
	containerDiv.appendChild(imgDiv);
	containerDiv.appendChild(h3Div);
	containerDiv.appendChild(p2Div);
	containerDiv.addEventListener('click', () => {
		setCardId(element.id);
	});
	if((element.name.toLowerCase().includes(searchinput.value.toLowerCase())) || (element.description.toLowerCase().includes(searchinput.value.toLowerCase()))){
		containerDiv.style.visibility = 'visible';
		containerDiv.style.order = 0;
	}else{
		containerDiv.style.visibility = 'hidden';
		containerDiv.style.order = 1;
	}
	products.appendChild(containerDiv);
};

function setCardId(id) {
    localStorage.setItem("cardId", id);
    location.href = "product-info.html";
};

/* Filtros*/

// Agregamos Filtros:
// Tenemos que crear una función que filtre los precios del Array, a partir de un rango que el usuario determina en dos imput, un maximo y un mínimo.

function filtrarPriceRangeYBusqueda(word) {
	let precioMaximo = document.getElementById('precioMaximo').value;
	let precioMinimo = document.getElementById('precioMinimo').value;
	let tarjetas = document.getElementsByClassName('productcard');
	tarjetas = Array.from(tarjetas);
	let tarjetasFiltradas = [];
	if (!(precioMaximo === '') && !(precioMinimo === '')) {
		
tarjetasFiltradas = tarjetas.filter((tarjeta) =>
        tarjeta.getElementsByClassName('tituloProducto')[0].innerHTML.toLowerCase().includes(word) || tarjeta.getElementsByClassName('descripcion')[0].innerHTML.toLowerCase().includes(word)
    );


		tarjetasFiltradas = tarjetas.filter(
			(element) =>
				element.getElementsByClassName('precio')[0].innerHTML * 1 >= precioMinimo * 1 &&
				element.getElementsByClassName('precio')[0].innerHTML * 1 <= precioMaximo * 1
		);
	}
	if (precioMinimo === '') {
		tarjetasFiltradas = tarjetas.filter(
			(element) => element.getElementsByClassName('precio')[0].innerHTML * 1 <= precioMaximo * 1
		);
	}
	if (precioMaximo === '') {
		tarjetasFiltradas = tarjetas.filter(
			(element) => element.getElementsByClassName('precio')[0].innerHTML * 1 >= precioMinimo * 1
		);
	}
	tarjetasFiltradas = tarjetasFiltradas.filter((tarjeta) =>
        tarjeta.getElementsByClassName('tituloProducto')[0].innerHTML.toLowerCase().includes(word) || tarjeta.getElementsByClassName('descripcion')[0].innerHTML.toLowerCase().includes(word)
    );
	tarjetas.forEach((element) => {
		if (tarjetasFiltradas.includes(element)) {
			element.style.visibility = 'visible';
			element.style.order = 0;
		} else {
			element.style.visibility = 'hidden';
			element.style.order = 1;
		}
	});
}

function volverAlNormal() {
	products.innerHTML = '';
	initialApiGetData();
	document.getElementById('precioMaximo').value = '';
	document.getElementById('precioMinimo').value = '';
}

//* ====== Filtro Orden Relevancia ====== *//

function ordenarAscendenciaPorPrecio() {
	let tarjetas = document.getElementsByClassName('productcard'); // devuelve un HTMLCollection (parecido a un array) de los objetos de clase "productcard"
	tarjetas = Array.from(tarjetas); // Array.from() convierte un objeto de tipo-array a un array
	tarjetas.sort(
		(a, b) =>
			a.getElementsByClassName('precio')[0].innerHTML * 1 -
			b.getElementsByClassName('precio')[0].innerHTML * 1
	);
	// string.replace("Pepe","Manteca") te reemplaza la palabra "Pepe" por "Manteca" en un string
	products.innerHTML = ''; // Borra todas las tarjetas de el contenedor "products"
	tarjetas.forEach((element) => {
		products.appendChild(element);
	}); // Pone las tarjetas del array con sort en products
}

function ordenarDesendenciaPorPrecio() {
	let tarjetas = document.getElementsByClassName('productcard');
	tarjetas = Array.from(tarjetas);
	tarjetas.sort(
		(a, b) =>
			b.getElementsByClassName('precio')[0].innerHTML * 1 -
			a.getElementsByClassName('precio')[0].innerHTML * 1
	);
	products.innerHTML = '';
	tarjetas.forEach((element) => {
		products.appendChild(element);
	});
}

function ordenarDesendenciaPorRelevancia() {
	let tarjetas = document.getElementsByClassName('productcard');
	tarjetas = Array.from(tarjetas);
	tarjetas.sort(
		(a, b) =>
			b.getElementsByClassName('vendidos')[0].innerHTML.split(' ')[0] * 1 -
			a.getElementsByClassName('vendidos')[0].innerHTML.split(' ')[0] * 1
	);
	products.innerHTML = '';
	tarjetas.forEach((element) => {
		products.appendChild(element);
	});
}

//* ====== Pop-Up ====== *//

// ABRIR
const btnPopUp = document.querySelector('.btn-pop-up');
const popUp = document.querySelector('.filtros-container');

popUp.addEventListener('click', (e) => {
	e.stopPropagation();
});

btnPopUp.addEventListener('click', (e) => {
	e.stopPropagation();
	popUp.style.zIndex = '10';
	popUp.style.opacity = '1';
});

// CERRAR

let btnCerrar = document.querySelectorAll('.filtros-container div button');

btnCerrar.forEach((element) => {
	element.addEventListener('click', () => {
		popUp.style.opacity = '0';
		popUp.style.zIndex = '-1';
	});
});

document.getElementsByTagName('main')[0].addEventListener('click', () => {
	if (popUp.style.opacity == 1) {
		popUp.style.opacity = '0';
		popUp.style.zIndex = '-1';
	}
});