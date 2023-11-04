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
let image, imageText, usersArray = new Array(), reader = new FileReader();

document.addEventListener("DOMContentLoaded",()=>{
    if(localStorage.users){
        usersArray = JSON.parse(localStorage.users);
        getUserInfo();
    }
    email.value = localStorage.email;

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
        let user;
        let existingUser = usersArray.find(element => element.email == localStorage.email);
        if(existingUser){
            user = existingUser;
        }else{
            user = new Object();
            usersArray.push(user);
        }
        user.nombre = nombre.value;
        user.segundoNombre = segundoNombre.value;
        user.apellido = apellido.value;
        user.segundoApellido = segundoApellido.value;
        user.usuario = usuario.value;
        user.email = email.value;
        user.telefono = telefono.value;
        if(imageText){
            user.image = imageText;
        }
        localStorage.users = JSON.stringify(usersArray);
    })
})

function getUserInfo(){
    let user = usersArray.find(element => element.email == localStorage.email);
    if(user){
        nombre.value = user.nombre;
        segundoNombre.value = user.segundoNombre;
        apellido.value = user.apellido;
        segundoApellido.value = user.segundoApellido;
        usuario.value = user.usuario;
        email.value = user.email;
        telefono.value = user.telefono;
        imagenPlaceholder.src = user.image;
    }
}