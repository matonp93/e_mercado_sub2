document.addEventListener('DOMContentLoaded', () => {
	const url = CART_INFO_URL + '25801' + EXT_TYPE;
	const tableItems = document.getElementById('tableItems');
	tableItems.classList.add('tableItems');

	getJSONData(url).then((response) => {
		response.data.articles.forEach((element) => {
			mostrarProducto(
				element.name,
				element.image,
				element.currency,
				element.unitCost,
				element.count,
				false
			);
		});
	});

	let listaDelCarrito = JSON.parse(localStorage.getItem('productosCarrito'));
	listaDelCarrito.forEach((element) => {
		getJSONData(PRODUCT_INFO_URL + element + EXT_TYPE).then((data) => {
			let producto = data.data;
			mostrarProducto(
				producto.name,
				producto.images[0],
				producto.currency,
				producto.cost,
				1,
				producto.id,
				true
			);
		});
	});

	function mostrarProducto(name, image, currency, unitCost, count, id, eliminar) {
		// Creación de elementos HTML //
		let row = document.createElement('tr');
		let tdTitlePriceDiv = document.createElement('td');
		let titlePriceDiv = document.createElement('div');

		let tdImgCart = document.createElement('td');
		let imgCart = document.createElement('img');

		let nameCart = document.createElement('p');

		let priceCart = document.createElement('p');

		//let tdCantCart = document.createElement('td');
		let cantCart = document.createElement('input');

		let tdSubtotalCart = document.createElement('td');
		let subtotalCart = document.createElement('p');

		let tdBtnBorrar = document.createElement('td');
		let btnBorrar = document.createElement('button');

		imgCart.setAttribute('src', image);
		nameCart.innerHTML += name;
		priceCart.innerHTML += currency + ' ' + unitCost;
		cantCart.setAttribute('type', 'number');
		cantCart.setAttribute('min', '1');
		cantCart.value = count;
		cantCart.addEventListener('change', () => {
			subtotalCart.innerHTML = currency + ' ' + unitCost * cantCart.value;
            subtotalFinal();
            envio();
			TotalE();
		});
		btnBorrar.innerHTML = 'Eliminar';
		btnBorrar.addEventListener('click', () => {
			btnBorrar.parentElement.parentElement.remove();
			if (eliminar) {
				listaDelCarrito.splice(listaDelCarrito.indexOf(id), 1);
				localStorage.setItem('productosCarrito', JSON.stringify(listaDelCarrito));
			}
            subtotalFinal();
			envio();
			TotalE();
		});
		subtotalCart.innerHTML += currency + ' ' + unitCost * count;

		// Atributos y clases //
		titlePriceDiv.classList.add('divPrice');
		tdImgCart.classList.add('tdImage');
		imgCart.classList.add('image');
		nameCart.classList.add('pName');
		priceCart.classList.add('pPrice');
		cantCart.classList.add('pCant');
		subtotalCart.classList.add('pSubtotal');
		btnBorrar.classList.add('btnBorrar');

		// AppendChild's //
		titlePriceDiv.appendChild(nameCart);
		titlePriceDiv.appendChild(priceCart);
		tdTitlePriceDiv.appendChild(titlePriceDiv);
		tdImgCart.appendChild(imgCart);
		//tdCantCart.appendChild(cantCart);
		tdSubtotalCart.appendChild(subtotalCart);
		tdSubtotalCart.appendChild(cantCart);
		tdBtnBorrar.appendChild(btnBorrar);

		row.appendChild(tdImgCart);
		row.appendChild(tdTitlePriceDiv);
		//row.appendChild(tdCantCart);
		row.appendChild(tdSubtotalCart);
		row.appendChild(tdBtnBorrar);

		tableItems.appendChild(row);
		subtotalFinal();
		envio();
		TotalE();
	};
	finalizarCompra()
});
document.addEventListener('scroll', () => {
    document.documentElement.dataset.scroll = window.scrollY;
});
function initAutocomplete() {
	let arrayMarkers = new Array();
	const inputcalle = document.getElementById('inputcalle');
	const inputnumero = document.getElementById('inputnumero');
	const inputesquina = document.getElementById('inputesquina');
	let map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: -34.8225143, lng: -56.1970454 },
		zoom: 11,
		streetViewControl: false,
	});
	let autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
	autocomplete.setComponentRestrictions({
		country: ['uy', 'ar', 'br'],
	});
	autocomplete.setFields(['address_components', 'geometry']);
	autocomplete.addListener('place_changed', () => {
		var place = autocomplete.getPlace();
		if (!place.geometry) {
			document.getElementById('autocomplete').value = '';
			inputcalle.value = '';
			inputnumero.value = '';
			inputesquina.value = '';
			accesoDenegado();
			document.getElementById('autocomplete').placeholder = 'Ingrese un lugar válido';
		} else {
			if (Array.isArray(arrayMarkers) && arrayMarkers.length) {
				arrayMarkers.forEach((element) => element.setMap(null));
				arrayMarkers.length = 0;
			}
			map.setCenter(place.geometry.location);
			map.setZoom(18);
			arrayMarkers.push(
				new google.maps.Marker({
					position: place.geometry.location,
					map,
				})
			);
			for (const component of place.address_components) {
				const componentType = component.types[0];
				switch (componentType) {
					case 'street_number':
						inputnumero.value = component.short_name;
						break;
					case 'route':
						inputcalle.value = component.short_name;
						break;
					case 'street_address':
						inputcalle.value = component.short_name;
						break;
				}
			}
			inputesquina.focus();
		};
	});
};

function accesoDenegado() {
	const alerta = document.getElementById('alerta');
	alerta.removeAttribute('hidden');
	setTimeout(() => {
		alerta.setAttribute('hidden', 'true');
	}, 7000);
};
function completeFormaPago() {
	const alerta = document.getElementById('alertaPago');
	alerta.removeAttribute('hidden');
	setTimeout(() => {
		alerta.setAttribute('hidden', 'true');
	}, 7000);
};

// Modal de Pago//

for (let element of document.getElementsByName("option")){
	let camposDePago = document.getElementsByName("camposDePago");

	element.addEventListener("click", () => {
		if (document.getElementsByName("option")[0].checked){
			camposDePago[3].value = "";
			camposDePago[3].disabled = "true";
			camposDePago[3].classList.remove("pagoCampo");
			for (let i = 0; i < 3; i++){
				camposDePago[i].classList.add("pagoCampo");
				camposDePago[i].removeAttribute("disabled");
			};
		} else if (document.getElementsByName("option")[1].checked){
			for (let i = 0; i < 3; i++){
				camposDePago[i].value = "";
				camposDePago[i].disabled = "true";
				camposDePago[i].classList.remove("pagoCampo");
			};
			camposDePago[3].classList.add("pagoCampo");
			camposDePago[3].removeAttribute("disabled");
		};
	});
};

//Función para abrir el modal//

function openModal() {
	document.getElementById('paymentModal').style.display = 'block';
};

//Función para cerrar el modal//
function closeModal() {
	document.getElementById('paymentModal').style.display = 'none';
};

//Funcion para manejar el envío del formulario//
document.getElementById('paymentForm').addEventListener('submit', function (event) {
	event.preventDefault();

	let paymentMethod = document.getElementById('paymentMethod').value;
	let accountNumber = document.getElementById('accountNumber').value;
	let secureCode = document.getElementById('secureCode').value;
	let goThroug = document.getElementById('goThroug').value;
	let numberAccount = document.getElementById('numberAccount').value;

	closeModal();
});

let suma;
function subtotalFinal() {
    let subtotalProd = document.querySelectorAll('.pSubtotal');
	suma = 0;
    subtotalProd.forEach((element) => {
        let value = parseInt(element.textContent.split(' ')[1]);
        
		if (element.textContent.split(' ')[0] === "UYU"){
			precioEnDolar = value / 40;
		}
		else {
			precioEnDolar = value;
		};

        suma += precioEnDolar;
    });

    let subtotalCostos = document.querySelectorAll("#subtotalCostos");
	subtotalCostos.forEach(element => element.innerHTML = "USD " + suma);
}

function finalizarCompra(){
    const finalizarCompraBtn = document.querySelectorAll("#finalizarcompra");
	
    finalizarCompraBtn.forEach(element => element.addEventListener('click', () => {
		const autocomplete = document.getElementById('autocomplete');
        const inputCalle = document.getElementById('inputcalle');
        const inputNumero = document.getElementById('inputnumero');
        const inputEsquina = document.getElementById('inputesquina');
        const cantidadInputs = document.querySelectorAll('.pCant');
        const formaPago = document.querySelector('input[name="option"]:checked');
        const camposPago = document.querySelectorAll('.pagoCampo');
		const h3FormaPago = document.getElementById('formaPago');
        
		if (autocomplete.value.trim() === ''){
			autocomplete.style.borderColor = 'red';
			accesoDenegado();
			setTimeout(() => {autocomplete.style.borderColor = ''},7000);
		} else {autocomplete.style.borderColor = ''};

		if (inputCalle.value.trim() === ''){
			inputCalle.style.borderColor = 'red';
			accesoDenegado();
			setTimeout(() => {inputCalle.style.borderColor = ''},7000);
		} else {inputCalle.style.borderColor = ''};

		if (inputNumero.value.trim() === ''){
			inputNumero.style.borderColor = 'red';
			accesoDenegado();
			setTimeout(() => {inputNumero.style.borderColor = ''},7000);
		} else { inputNumero.style.borderColor = ''};

		if (inputEsquina.value.trim() === ''){
			inputEsquina.style.borderColor = 'red';
			accesoDenegado();
			setTimeout(() => {inputEsquina.style.borderColor = ''},7000);
		} else {inputEsquina.style.borderColor = ''};

        for (const cantidadInput of cantidadInputs) {
            if (parseInt(cantidadInput.value) <= 0) {
                alert('La cantidad para cada artículo debe ser mayor a 0.');
                return;
            };
        };
		
		if (!formaPago) {
            h3FormaPago.classList.add('error');
			completeFormaPago();
			setTimeout(() => {h3FormaPago.classList.remove('error')},7000);
			return;
        } else {
			h3FormaPago.classList.remove('error'); 
		};

        for (const campoPago of camposPago) {
            if (campoPago.value.trim() === '') {
                alert('Los campos de pago no pueden estar vacíos.');
                return;
            };
        };

		const mensaje = document.getElementById('mensajeFinalizadoId');
		const camposDeDireccion = Array.from(document.getElementsByName("camposDireccion"))
		if ((mensaje.style.display === 'none' || mensaje.style.display === '') && 
			(camposDeDireccion.every(element => element.value != ""))){
				mensaje.style.display = 'block';
				setTimeout(() => {
					mensaje.style.display = 'none';
				}, 5000);
		};
    }));
};
//calculando envío

let costEnvio = document.querySelectorAll("#costoEnvio");
let envioBasico = document.getElementById("basic");
let envioStandar = document.getElementById("standar");
let envioPremium = document.getElementById("premium");
let envioSuma = 0;
envioBasico.addEventListener("click", envio);

envioStandar.addEventListener("click", envio);

envioPremium.addEventListener("click", envio);

function envio(){
	let tipoEnvios = Array.from(document.getElementsByName("card"));
	let subtotalCostos = document.querySelectorAll("#subtotalCostos");
	tipoEnvios.forEach(element => {
		element.addEventListener("click", TotalE);
		if (element.checked && tipoEnvios.indexOf(element) === 0){
			envioSuma = suma * 0.05;
			costEnvio.forEach(element => element.innerHTML = "USD " + envioSuma.toFixed(2));
		} else if (element.checked && tipoEnvios.indexOf(element) === 1){
			envioSuma = suma * 0.07;
			costEnvio.forEach(element => element.innerHTML = "USD " + envioSuma.toFixed(2));
		} else if (element.checked && tipoEnvios.indexOf(element) === 2){
			envioSuma = suma * 0.15;
			costEnvio.forEach(element => element.innerHTML = "USD " + envioSuma.toFixed(2));
		};
	});
};

// ------- Total ------- //
function TotalE() {

	let totalCosto = suma + envioSuma;
	let totalCostosE = document.querySelectorAll("#totalCostos");
	totalCostosE.forEach(element => element.innerHTML = "USD " + totalCosto.toFixed(2));
  }