const products = document.getElementById("products");
const productsTitle = document.getElementById("productsTitle");
const productsDesc = document.getElementById("productsDesc");
let link = "https://japceibal.github.io/emercado-api/cats_products/";

document.addEventListener("DOMContentLoaded",()=>{
    function comprobarLogin(){
        return ((localStorage.getItem("email") != null) && (localStorage.getItem("password") != null))
    }
    if (!comprobarLogin()){
        location.href = "login.html"
    } 
    
    link+=localStorage.getItem("catID")+".json";

switch (localStorage.getItem("catID")){
    case "101": 
        productsTitle.innerHTML+="Autos";
        productsDesc.innerHTML+='Los mejores precios en autos 0 kilómetro, de alta y media gama.';
    break;
    case "102": 
        productsTitle.innerHTML+="Juguetes";
        productsDesc.innerHTML+="Encuentra aquí los mejores precios para niños/as de cualquier edad.";
    break;
    case "103": 
        productsTitle.innerHTML+="Muebles";
        productsDesc.innerHTML+="Muebles antiguos, nuevos y para ser armados por uno mismo.";
}
listadoProductos();
})

function listadoProductos(){
    fetch(link)
    .then(response => response.json())
    .then(data => {
        data.products.forEach(element => {
            console.log(element)
            let h3 = document.createElement("h3");
            h3.innerHTML+= element.name + " <br>";
            let h2 = document.createElement("h2");
            h2.innerHTML+= element.currency + " " + element.cost;
            h2.classList.add('precio');
            let p1 = document.createElement("p");
            p1.classList.add('descripcion')
            p1.innerHTML+=element.description;
            let p2 = document.createElement("p");
            p2.classList.add('vendidos')
            p2.innerHTML+=element.soldCount+ " vendidos";
            
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
            image.setAttribute("src",element.image);
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
    }
     //funcionalidad del buscador
     //let  input =document.querySelector("buscador");
    //let resultList =document.getElementById("resultados");
 
//input.addEventListener(input,);

//function search() {
    //let searchTerm = input.value.trim();
  
   // if (searchTerm === '') {
    //  resultList.innerHTML = '';
   //   return;
   // }
  
    //fetch(`https://japceibal.github.io/emercado-api/cats_products/101.json`)
    //  .then(response => response.json())
     // .then(data => {
     //   resultList.innerHTML = '';
      //  data.forEach(item => {
      //    let li = document.createElement('li');
      //    li.textContent = item.title, item.description; 
       //   resultList.appendChild(li);
      //  });
     // })
     // .catch(error => {
      //  console.error('Error fetching data:', error);
     // });
  //}
  
  
  //}
 
   
  
