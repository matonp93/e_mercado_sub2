const searchinput = document.getElementById("searchinput");
const btninput = document.getElementById("button-addon2");
const products = document.getElementById('products');

document.addEventListener("DOMContentLoaded",()=>{
    searchinput.value = localStorage.getItem("searchquery");
    getJSONData(CATEGORIES_URL).then(result =>{
        result.data.forEach(element => {
            let linksArray = new Array();
            linksArray.push(PRODUCTS_URL +element.id + EXT_TYPE);
            linksArray.forEach(element =>{
                getJSONData(element).then(result =>{
                    result.data.products.forEach(element => contentProducts(element));
                })
            })
        });
    })
})

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
	products.appendChild(containerDiv);
}
function setCardId(id) {
    localStorage.setItem("cardId", id);
    location.href = "product-info.html";
};