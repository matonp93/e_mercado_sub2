// VARIABLES
const productsTitle = document.getElementById('productsTitle');
const productsDesc = document.getElementById('productsDesc');
const orderby = document.getElementById('sort'),
buscador = document.getElementById('buscador'),
preciominimo = document.getElementById('precio-minimo'),
preciomaximo = document.getElementById('precio-maximo'),
refresh = document.getElementById('refresh');
const products = document.getElementById('products');

document.addEventListener("DOMContentLoaded", () => {
	buscador.value = localStorage.getItem("searchquery");
	initialApiGetData(localStorage.getItem("searchquery"));
	localStorage.removeItem("searchquery");

	orderby.addEventListener("change",Filtrar);
	buscador.addEventListener("input",Filtrar);
	preciomaximo.addEventListener("input",Filtrar);
	preciominimo.addEventListener("input",Filtrar);
	refresh.addEventListener("click",()=>{
		orderby.value = "relevance";
		buscador.value = "";
		preciomaximo.value = "";
		preciominimo.value = "";
		Filtrar();
	})

});

function initialApiGetData(initialQuery){
	fetch(PRODUCTS_URL+"?filters= WHERE "+encodeURIComponent(`name like '%${initialQuery}%'`))
		.then((response) => response.json())
		.then((data) => data.forEach((element) => contentProducts(element)));
}

function contentProducts(element) {
	console.log(element);
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
	products.appendChild(containerDiv);
};

function setCardId(id) {
    localStorage.setItem("cardId", id);
    location.href = "product-info.html";
};

/* Filtros*/

// Agregamos Filtros:
// Tenemos que crear una función que filtre los precios del Array, a partir de un rango que el usuario determina en dos imput, un maximo y un mínimo.

function Filtrar(){
	products.innerHTML = "";
	let filterquery = "";
	let andfilters = new Array();
	if(preciominimo.value){
		andfilters.push("cost>"+preciominimo.value);
	}
	if(preciomaximo.value){
		andfilters.push("cost<"+preciomaximo.value);
	}
	if(buscador.value){
		andfilters.push(encodeURIComponent(`name like '%${buscador.value}%'`));
	}
	if(andfilters.length>0){
		filterquery+="WHERE "+andfilters.join(" AND ")+ " ";
	}
	switch(orderby.value){
		case "relevance":
			filterquery+= "order by soldCount desc";
			break;
		case "price-low-to-high":
			filterquery+= "order by cost asc";
			break;
		case "price-high-to-low":
			filterquery+= "order by cost desc";
			break;
	}
	fetch(PRODUCTS_URL+"?filters= "+filterquery)
		.then((response) => response.json())
		.then((data) => data.forEach((element) => contentProducts(element)));
}