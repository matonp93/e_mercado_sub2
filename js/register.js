const form = document.getElementById('formRegister');
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const checkTerminos =document.getElementById('checkTerminos');

function validarFormulario() {
    email.style.borderColor = '';
    username.style.borderColor = '';
    password.style.borderColor = '';
    confirmPassword.style.borderColor = '';
    checkTerminos.style.borderColor = '';

    if (email.value.trim() === '') {
        email.style.borderColor = 'red';
    }

    if (username.value.trim() === '') {
        username.style.borderColor = 'red';
    }

    if (password.value.trim() === '') {
        password.style.borderColor = 'red';
    }

    if (confirmPassword.value.trim() === '' || confirmPassword.value !== password.value) {
        confirmPassword.style.borderColor = 'red';
    }

    if (!checkTerminos.checked) {
        checkTerminos.style.borderColor = 'red';
    }
}

function enviarSolicitud(){ 
validarFormulario();

const myHeaders = new Headers();
myHeaders.append("Content-Type",
"application/json");

const formData = {
    "email": email.value,
    "username": username.value,
    "password": password.value
}

const raw = JSON.stringify(formData);

const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};


fetch("http://localhost:3000/register", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
   enviarSolicitud();
});

const registrarse = document.getElementById('btnRegister');
registrarse.addEventListener('click', validarFormulario);