const nombre = document.getElementById("nombre"),
segundoNombre = document.getElementById("segundoNombre"),
apellido = document.getElementById("apellido"),
segundoApellido = document.getElementById("segundoApellido"),
usuario = document.getElementById("usuario"),
email = document.getElementById("email"),
telefono = document.getElementById("telefono"),
imagenSelector = document.getElementById("imagenSelector"),
imagenPlaceholder = document.getElementById("imagenPlaceholder"),
profileForm = document.getElementById("profileForm"),
profileFormButton = document.getElementById("profileFormButton");
let image,imageText, usersArray = new Array(), reader = new FileReader();

document.addEventListener("DOMContentLoaded",()=>{
    if(localStorage.users){
        usersArray = JSON.parse(localStorage.users);
    }
    imagenSelector.addEventListener("change",()=>{
       image = imagenSelector.files[0];
       reader.readAsDataURL(image);
    })
    reader.addEventListener("load",()=>{
        imageText = reader.result;
        imagenPlaceholder.src = imageText;
    })

    profileForm.addEventListener("submit",(event)=>{
        event.preventDefault();
        let user = new Object();
        user.nombre = nombre.value;
        user.segundoNombre = segundoNombre.value;
        user.apellido = apellido.value;
        user.segundoApellido = segundoApellido.value;
        user.usuario = usuario.value;
        user.email = email.value;
        user.telefono = telefono.value;
        user.image = imageText;
        usersArray.push(user);
        localStorage.users = JSON.stringify(usersArray);
    })

























})