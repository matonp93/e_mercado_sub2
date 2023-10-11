document.addEventListener('DOMContentLoaded', () => {
    const url = CART_INFO_URL + '25801' + EXT_TYPE;
    const cartItems = document.getElementById('cartItems');
    cartItems.classList.add("cartItems");

    getJSONData(url)
    .then(response =>{
        response.data.articles.forEach(element => {
            mostrarProducto(element.name, element.image, element.currency, element.unitCost, element.count, false);
        });
    });

    let listaDelCarrito = JSON.parse(localStorage.getItem("productosCarrito"));
    listaDelCarrito.forEach(element => {
        getJSONData(PRODUCT_INFO_URL + element + EXT_TYPE)
        .then(data => {
            let producto = data.data;
            mostrarProducto(producto.name, producto.images[0], producto.currency, producto.cost, 1, producto.id, true);
        });
    });

    function mostrarProducto(name, image, currency, unitCost, count, id, eliminar){
        // Creación de elementos HTML //
        let itemCart = document.createElement('div');
        let divImgName = document.createElement('div');
        let divCantSubtotalBtn = document.createElement('div');
        let imgCart = document.createElement('img');
        let nameCart = document.createElement('p');
        let cantCart = document.createElement('input');
        let subtotalCart = document.createElement('p');
        let btnBorrar = document.createElement("button");
        
        imgCart.setAttribute('src', image);
        nameCart.innerHTML += name;
        cantCart.setAttribute('type', 'number');
        cantCart.setAttribute('min','1');
        cantCart.value = count;
        cantCart.addEventListener('change',()=>{
            subtotalCart.innerHTML = currency + " " + unitCost * cantCart.value;
        });
        btnBorrar.innerHTML = `<i class="bi bi-x-circle"></i>`;
        btnBorrar.addEventListener("click", () => {
            btnBorrar.parentElement.parentElement.remove();
            if (eliminar){
                listaDelCarrito.splice(listaDelCarrito.indexOf(id), 1);
                localStorage.setItem("productosCarrito", JSON.stringify(listaDelCarrito));
            };
        });
        subtotalCart.innerHTML += currency + " " + unitCost * count;
    
        // Atributos y clases //
        itemCart.classList.add('divCart');
        divCantSubtotalBtn.classList.add('divCantSubtotalBtn');
        divImgName.classList.add('divImgName');

        //titlePriceDiv.classList.add('divPrice');

        imgCart.classList.add('imaga');
        nameCart.classList.add('pName');

        //priceCart.classList.add('pPrice');

        cantCart.classList.add('pCant');
        subtotalCart.classList.add('pSubtotal');
        btnBorrar.classList.add('btnBorrar');

        // AppendChild's //

        //titlePriceDiv.appendChild(nameCart);
        //titlePriceDiv.appendChild(priceCart);
        divImgName.appendChild(imgCart);
        divImgName.appendChild(nameCart);
        itemCart.appendChild(divImgName);
        
        //itemCart.appendChild(titlePriceDiv);
        divCantSubtotalBtn.appendChild(cantCart);
        divCantSubtotalBtn.appendChild(subtotalCart);
        divCantSubtotalBtn.appendChild(btnBorrar);
        itemCart.appendChild(divCantSubtotalBtn);
        cartItems.appendChild(itemCart);
    };
});
 
