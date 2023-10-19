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
		});
		btnBorrar.innerHTML = 'Eliminar';
		btnBorrar.addEventListener('click', () => {
			btnBorrar.parentElement.parentElement.remove();
			if (eliminar) {
				listaDelCarrito.splice(listaDelCarrito.indexOf(id), 1);
				localStorage.setItem('productosCarrito', JSON.stringify(listaDelCarrito));
			}
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
	}
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
		}
	});
}
function accesoDenegado() {
	const alerta = document.getElementById('alerta');
	alerta.removeAttribute('hidden');
	setTimeout(() => {
		alerta.setAttribute('hidden', 'true');
	}, 3500);
}

// Modal de Pago//

//Función para abrir el modal//

function openModal() {
	document.getElementById('paymentModal').style.display = 'block';
}

//Función para cerrar el modal//
function closeModal() {
	document.getElementById('paymentModal').style.display = 'none';
}

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
