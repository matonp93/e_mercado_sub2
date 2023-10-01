const searchinput = document.getElementById("searchinput");
const btninput = document.getElementById("button-addon2");
const products = document.getElementById('products');

document.addEventListener("DOMContentLoaded",()=>{
    // searchinput.value = localStorage.getItem("searchquery");
    // getJSONData(CATEGORIES_URL).then(result =>{
    //     result.data.forEach(element => {
    //         let linksArray = new Array();
    //         linksArray.push(PRODUCTS_URL +element.id + EXT_TYPE);
    //         linksArray.forEach(element =>{
    //             getJSONData(element).then(result =>{
    //                 result.data.products.forEach(element => contentProducts(element));
    //             })
    //         })
    //     });
    // })
	searchinput.value = localStorage.getItem("searchquery");
	localStorage.removeItem("searchquery");
	mostrarProductosBuscados();

	btninput.addEventListener("click", () => {
		//filtrarPriceRangeYBusqueda(searchinput.value.toLowerCase());
		mostrarProductosBuscados();
	});
});

function mostrarProductosBuscados(){
	products.innerHTML = "";

	getJSONData(CATEGORIES_URL)
	.then(data => {
		data.data.forEach(element => {
			getJSONData(PRODUCTS_URL + element.id + EXT_TYPE)
			.then(data => {
				data.data.products.forEach(element => {
					if (element.name.toLowerCase().includes(searchinput.value)){
						contentProducts(element);
						filtrarPriceRangeYBusqueda(searchinput.value)
					};
				});
			});
		});
	});
};

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
	containerDiv.style.visibility = 'hidden';
	containerDiv.style.order = 1;
	products.appendChild(containerDiv);
}
function setCardId(id) {
    localStorage.setItem("cardId", id);
    location.href = "product-info.html";
};

function filtrarPriceRangeYBusqueda(word) {
/*	let precioMaximo = document.getElementById('precioMaximo').value;
	let precioMinimo = document.getElementById('precioMinimo').value;*/
	let tarjetas = document.getElementsByClassName('productcard');
	tarjetas = Array.from(tarjetas);
	let tarjetasFiltradas = [];
	/*if (!(precioMaximo === "") && !(precioMinimo === "")){
	tarjetasFiltradas = tarjetas.filter (element => element.getElementsByClassName('precio')[0].innerHTML*1>=precioMinimo*1 && element.getElementsByClassName('precio')[0].innerHTML*1 <= precioMaximo*1);
}
	if (precioMinimo === ""){
	tarjetasFiltradas = tarjetas.filter (element => element.getElementsByClassName('precio')[0].innerHTML*1<= precioMaximo*1);
}
	if (precioMaximo === ""){
	tarjetasFiltradas = tarjetas.filter (element => element.getElementsByClassName('precio')[0].innerHTML*1>= precioMinimo*1);
}*/
	tarjetasFiltradas = tarjetas.filter((tarjeta) =>
		tarjeta.getElementsByClassName('tituloProducto')[0].innerHTML.toLowerCase().includes(word)
	);
	tarjetas.forEach((element) => {
	if (tarjetasFiltradas.includes(element)) {
		element.style.visibility = 'visible';
		element.style.order = 0;
	} else {
		element.style.visibility = 'hidden';
		element.style.order = 1;
	}
})
}