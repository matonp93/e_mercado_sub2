const nombre = document.getElementById('nombre'),
  segundoNombre = document.getElementById('segundoNombre'),
  apellido = document.getElementById('apellido'),
  segundoApellido = document.getElementById('segundoApellido'),
  usuario = document.getElementById('usuario'),
  email = document.getElementById('email'),
  telefono = document.getElementById('telefono'),
  direccion = document.getElementById('direccion'),
  imagenSelector = document.getElementById('imagenSelector'),
  imagenPlaceholder = document.getElementById('imagenPlaceholder'),
  profileForm = document.getElementById('profileForm'),
  profileFormButton = document.getElementById('profileFormButton'),
  alertResult = document.getElementById('alertResult');

let imageText,
  reader = new FileReader();

document.addEventListener('DOMContentLoaded',() => {

  if (localStorage.token != "invitado") {
      fetch(USERS_URL,{
			headers: { "Content-Type": "application/json; charset=utf-8",
			"authorization":  "Bearer "+localStorage.token}
		  })
		  .then(response => response.json())
		  .then(data => data[0])
      .then(data => {
        getUserInfo(data);
      })
		  .catch(error => console.log(error));
    // getUserInfo();
  }else{
    location.href = "login.html"
  }

  imagenSelector.addEventListener('change', () => {
    image = imagenSelector.files[0];
    reader.readAsDataURL(image);
  });

  reader.addEventListener('load', () => {
    let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
    if ((encoded.length % 4) > 0) {
      encoded += '='.repeat(4 - (encoded.length % 4));
    }
    imageText = encoded;
    imagenPlaceholder.src = reader.result;
  });

  profileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    fetch(
      USERS_URL, {
        headers: { "Content-Type": "application/json; charset=utf-8",
        "authorization":  "Bearer "+localStorage.token },
        method: 'PUT',
        body: JSON.stringify({
          "name" : nombre.value,
          "secondname": segundoNombre.value,
          "surname" : apellido.value,
          "secondsurname" : segundoApellido.value,
          "username" : usuario.value,
          "phone" : telefono.value,
          "address" : direccion.value,
          "image" : imageText
        })
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
  });

  // Evento guardar cambios

  profileFormButton.addEventListener('click', () => {
    alertResult.removeAttribute('hidden');
    setTimeout(() => {
        alertResult.setAttribute('hidden', true);
    }, 5000);
  });
});

function getUserInfo(user) {
  if (user) {
    nombre.value = user.name;
    segundoNombre.value = user.secondname;
    apellido.value = user.surname;
    segundoApellido.value = user.secondsurname;
    usuario.value = user.username;
    email.value = user.email;
    telefono.value = user.phone;
    direccion.value = user.address;
    if (user.image){
        imagenPlaceholder.src = `http://localhost:3000/images/${user.username}.png`;
    } else {
        imagenPlaceholder.src = "/img/img_perfil.png";
    };
  };
};