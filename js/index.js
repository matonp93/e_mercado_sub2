const searchBtn = document.getElementById("button-addon2");

document.addEventListener("DOMContentLoaded", function(){
    searchBtn.addEventListener("click", ()=>{
        localStorage.setItem("searchquery",document.getElementById("searchinput").value);
        location.href = "search.html"
    });
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});



