document.addEventListener('DOMContentLoaded', () => {
    const url = CART_INFO_URL + '25801' + EXT_TYPE;
    const cartItems = document.getElementById('cartItems');

    getJSONData(url)
    .then(response =>{
        response.data.articles.forEach(element => {
            // Creación de elementos HTML //
            let itemCart = document.createElement('div');
            let titlePriceDiv = document.createElement('div');
            let imgCart = document.createElement('img');
            let nameCart = document.createElement('p');
            let priceCart = document.createElement('p');
            let cantCart = document.createElement('input');
            let subtotalCart = document.createElement('p');
            
            imgCart.setAttribute('src', element.image);
            nameCart.innerHTML += element.name;
            priceCart.innerHTML += element.currency + " " + element.unitCost;
            cantCart.setAttribute('type', 'number');
            cantCart.value += element.count;
            subtotalCart.innerHTML += element.currency + " " + element.unitCost * element.count;
        
            // Atributos y clases //
            itemCart.classList.add('divCart');
            titlePriceDiv.classList.add('divPrice');
            imgCart.classList.add('imaga');
            nameCart.classList.add('pName');
            priceCart.classList.add('pPrice');
            cantCart.classList.add('pCant');
            subtotalCart.classList.add('pSubtotal');
        
            // AppendChild's //
            titlePriceDiv.appendChild(nameCart);
            titlePriceDiv.appendChild(priceCart);
            itemCart.appendChild(imgCart);
            itemCart.appendChild(titlePriceDiv);
            itemCart.appendChild(cantCart);
            itemCart.appendChild(subtotalCart);
            cartItems.appendChild(itemCart);
        });
    });   
});