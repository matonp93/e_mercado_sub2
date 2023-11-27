const form = document.getElementById('formRegister');
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

function validarFormulario() {
    console.log('Entrando en validarFormulario');

    if (email.value.trim() === '') {
        email.classList.add('error');
        setTimeout(() => { email.classList.remove('error') }, 7000);
    }

    if (username.value.trim() === '') {
        username.classList.add('error');
        setTimeout(() => { username.classList.remove('error') }, 7000);
    }

    if (password.value.trim() === '') {
        password.classList.add('error');
        setTimeout(() => { password.classList.remove('error') }, 7000);
    }

    if (confirmPassword.value.trim() === '' || confirmPassword.value !== password.value) {
        confirmPassword.classList.add('error');
        setTimeout(() => { confirmPassword.classList.remove('error') }, 7000);
    }

    if (
        (email.value.trim() === '') ||
        (username.value.trim() === '') ||
        (password.value.trim() === '') ||
        (confirmPassword.value.trim() === '') ||
        (confirmPassword.value !== password.value)
    ) {
        console.log('Formulario validado');
        return false;
    } else {
        return true;
    }
}

form.addEventListener("submit", function (event) {
    if (!validarFormulario()) {
        event.preventDefault();
    } else {
        enviarSolicitud();
    }
});

function enviarSolicitud(){ 

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


