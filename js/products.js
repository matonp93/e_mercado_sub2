// VARIABLES
const products = document.getElementById('products');
const productsTitle = document.getElementById('productsTitle');
const productsDesc = document.getElementById('productsDesc');
const btnFiltrar = document.getElementById('filtrar');
const btnNormal = document.getElementById('normal');
let link = 'https://japceibal.github.io/emercado-api/cats_products/';
const btnAscendente = document.getElementById('ascendentePorPrecio');
const btnDescendente = document.getElementById('descendentePorPrecio');
const btnDescendenteRelevancia = document.getElementById('descendentePorRelevancia');
let initialPromise;

// PAGINA
document.addEventListener('DOMContentLoaded', () => {
	function comprobarLogin() {
		return localStorage.getItem('email') != null && localStorage.getItem('password') != null;
	}
	if (!comprobarLogin()) {
		location.href = 'login.html';
	}

	link += localStorage.getItem('catID') + '.json';

	switch (localStorage.getItem('catID')) {
		case '101':
			productsTitle.innerHTML += 'Autos';
			productsDesc.innerHTML += 'Los mejores precios en autos 0 kilómetro, de alta y media gama.';
			break;
		case '102':
			productsTitle.innerHTML += 'Juguetes';
			productsDesc.innerHTML +=
				'Encuentra aquí los mejores precios para niños/as de cualquier edad.';
			break;
		case '103':
			productsTitle.innerHTML += 'Muebles';
			productsDesc.innerHTML += 'Muebles antiguos, nuevos y para ser armados por uno mismo.';
	}
	listadoProductosInicial();
	
	btnFiltrar.addEventListener('click', () => {
		filtrarPorRangoDePrecio();
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
});

// FUNCIONES

function contentProducts(element) {
		let h3 = document.createElement('h3');
		h3.innerHTML += element.name + ' <br>';
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
		containerDiv.setAttribute("id",element.id);
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
		products.appendChild(containerDiv);
}
function listadoProductos(){
	initialPromise = new Promise((resolve,reject) =>{ 
		fetch(link)
		.then((response) => response.json())
		.then((data) =>	resolve(data.products))
		.catch(error => reject(error));
	})
}
function listadoProductosInicial(){
	listadoProductos();
	initialPromise.then(data => {
		data.forEach(element =>{
			contentProducts(element);
		})
	})
}

// Agregamos Filtros:
// Tenemos que crear una función que filtre los precios del Array, a partir de un rango que el usuario determina en dos imput, un maximo y un mínimo.

function filtrarPorRangoDePrecio() {
	let precioMaximo = document.getElementById('precioMaximo').value;
	let precioMinimo = document.getElementById('precioMinimo').value;
	initialPromise.then((data) => {
			products.innerHTML = '';
			if (precioMaximo != '' && precioMinimo != '') {
				let prodfiltrados = data.filter(
					(element) => element.cost <= precioMaximo && element.cost >= precioMinimo
				);
				prodfiltrados.forEach((element) => {
					contentProducts(element);
				});
			}

			if (precioMinimo == '') {
				let prodfiltrados = data.filter((element) => element.cost <= precioMaximo);
				prodfiltrados.forEach((element) => {
					contentProducts(element);
				});
			}

			if (precioMaximo == '') {
				let prodfiltrados = data.filter((element) => element.cost >= precioMinimo);
				prodfiltrados.forEach((element) => {
					contentProducts(element);
				});
			}
		});
}

function volverAlNormal() {
	products.innerHTML = '';
	listadoProductosInicial();
	document.getElementById('precioMaximo').value = '';
	document.getElementById('precioMinimo').value = '';
}

//* ====== Filtro Orden Relevancia ====== *//

function ordenarAscendenciaPorPrecio() {
	let tarjetas = document.getElementsByClassName("productcard"); // devuelve un HTMLCollection (parecido a un array) de los objetos de clase "productcard"
	tarjetas = Array.from(tarjetas); // Array.from() convierte un objeto de tipo-array a un array
	tarjetas.sort((a,b) => a.getElementsByClassName("precio")[0].innerHTML - b.getElementsByClassName("precio")[0].innerHTML )
	// string.replace("Pepe","Manteca") te reemplaza la palabra "Pepe" por "Manteca" en un string
	products.innerHTML = ""; // Borra todas las tarjetas de el contenedor "products"
	tarjetas.forEach(element=>{ products.appendChild(element) }) // Pone las tarjetas del array con sort en products
}

function ordenarDesendenciaPorPrecio() {
	let tarjetas = document.getElementsByClassName("productcard");
	tarjetas = Array.from(tarjetas);
	tarjetas.sort((a,b) => b.getElementsByClassName("precio")[0].innerHTML - a.getElementsByClassName("precio")[0].innerHTML )
	products.innerHTML = "";
	tarjetas.forEach(element=>{ products.appendChild(element) })
}

function ordenarDesendenciaPorRelevancia() {
	initialPromise.then((data) => {
			products.innerHTML = '';
			let ordenadosD = [];

			for (let element of data) {
				ordenadosD.push(element);
				ordenadosD.sort((a, b) => b.soldCount - a.soldCount);
			}

			ordenadosD.forEach((element) => {
				contentProducts(element);
			});
		});
}
