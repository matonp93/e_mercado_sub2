// VARIABLES
const products = document.getElementById("products");
const productsTitle = document.getElementById("productsTitle");
const productsDesc = document.getElementById("productsDesc");
const btnFiltrar = document.getElementById("filtrar");
const btnNormal = document.getElementById("normal");
let link = "https://japceibal.github.io/emercado-api/cats_products/";

// PAGINA
document.addEventListener("DOMContentLoaded", () => {
    function comprobarLogin() {
        return ((localStorage.getItem("email") != null) && (localStorage.getItem("password") != null))
    }
    if (!comprobarLogin()) {
        location.href = "login.html"
    }

    link += localStorage.getItem("catID") + ".json";

    switch (localStorage.getItem("catID")) {
        case "101":
            productsTitle.innerHTML += "Autos";
            productsDesc.innerHTML += 'Los mejores precios en autos 0 kilómetro, de alta y media gama.';
            break;
        case "102":
            productsTitle.innerHTML += "Juguetes";
            productsDesc.innerHTML += "Encuentra aquí los mejores precios para niños/as de cualquier edad.";
            break;
        case "103":
            productsTitle.innerHTML += "Muebles";
            productsDesc.innerHTML += "Muebles antiguos, nuevos y para ser armados por uno mismo.";
    }
    listadoProductos();

    btnFiltrar.addEventListener("click", () => {
        filtrarPorRangoDePrecio();
    })

    btnNormal.addEventListener("click", () => {
        volverAlNormal();
    })
})

// FUNCIONES
function listadoProductos() {
    fetch(link)
        .then(response => response.json())
        .then(data => {
            data.products.forEach(element => {
                console.log(element)
                let h3 = document.createElement("h3");
                h3.innerHTML += element.name + " <br>";
                let h2 = document.createElement("h2");
                h2.innerHTML += element.currency + " " + element.cost;
                h2.classList.add('precio');
                let p1 = document.createElement("p");
                p1.classList.add('descripcion')
                p1.innerHTML += element.description;
                let p2 = document.createElement("p");
                p2.classList.add('vendidos')
                p2.innerHTML += element.soldCount + " vendidos";

                /* Contenedores y clase de divs*/
                let containerDiv = document.createElement("div")
                containerDiv.classList.add('productcard')
                let imgDiv = document.createElement("div");
                imgDiv.classList.add('imgdiv')
                let h3Div = document.createElement("div");
                h3Div.classList.add('h3div')
                let pDiv = document.createElement("div");
                pDiv.classList.add('pdiv')
                let p2Div = document.createElement("div")
                p2Div.classList.add('p2div')
                let image = document.createElement("img");
                image.setAttribute("src", element.image);
                imgDiv.appendChild(image);
                h3Div.appendChild(h3);
                h3Div.appendChild(h2);
                h3Div.appendChild(p1);
                p2Div.appendChild(p2);
                containerDiv.appendChild(imgDiv)
                containerDiv.appendChild(h3Div)
                containerDiv.appendChild(p2Div)
                products.appendChild(containerDiv);
            });

        })

}


// Agregamos Filtros:
// Tenemos que crear una función que filtre los precios del Array, a partir de un rango que el usuario determina en dos imput, un maximo y un mínimo.

function filtrarPorRangoDePrecio() {
    let precioMaximo = document.getElementById("precioMaximo").value;
    let precioMinimo = document.getElementById("precioMinimo").value;
    fetch(link)
        .then(response => response.json())
        .then(data => {
            products.innerHTML = "";
            let prodfiltrados = data.products.filter(element => element.cost >= precioMinimo && element.cost <= precioMaximo);
            prodfiltrados.forEach(element =>{
            
                let h3 = document.createElement("h3");
                h3.innerHTML += element.name + " <br>";
                let h2 = document.createElement("h2");
                h2.innerHTML += element.currency + " " + element.cost;
                h2.classList.add('precio');
                let p1 = document.createElement("p");
                p1.classList.add('descripcion')
                p1.innerHTML += element.description;
                let p2 = document.createElement("p");
                p2.classList.add('vendidos')
                p2.innerHTML += element.soldCount + " vendidos";

                /* Contenedores y clase de divs*/
                let containerDiv = document.createElement("div")
                containerDiv.classList.add('productcard')
                let imgDiv = document.createElement("div");
                imgDiv.classList.add('imgdiv')
                let h3Div = document.createElement("div");
                h3Div.classList.add('h3div')
                let pDiv = document.createElement("div");
                pDiv.classList.add('pdiv')
                let p2Div = document.createElement("div")
                p2Div.classList.add('p2div')
                let image = document.createElement("img");
                image.setAttribute("src", element.image);
                imgDiv.appendChild(image);
                h3Div.appendChild(h3);
                h3Div.appendChild(h2);
                h3Div.appendChild(p1);
                p2Div.appendChild(p2);
                containerDiv.appendChild(imgDiv)
                containerDiv.appendChild(h3Div)
                containerDiv.appendChild(p2Div)
                products.appendChild(containerDiv);
            });
        });
};

function volverAlNormal(){
    products.innerHTML = "";
    listadoProductos();
};


