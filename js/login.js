document.addEventListener("DOMContentLoaded", () => {

    function accesoPermitido(){
        Swal.fire({
            title: 'Bienvenidx!',
            text: 'Iniciaste sesión como',
            icon: 'success'
          });
    }

    function accesoDenegado(){
        Swal.fire({
			icon: 'error',
            title: ' Uy! ',
            text: 'Usuario u contraseña incorrecta!',
            footer: '<a href="">Olvidé mi contraseña?</a>'
            });
    }

    function validarPassword(password){
        return (password.length >= 6);
    }

    function validarEmail(email){
        return (email != "");
    }

    function login(password, email){
        if ((validarPassword(password)) && (validarEmail(email))){
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            accesoPermitido();
            location.href = "index.html";
        } else {
            accesoDenegado();
        }
    }

    const btnEnviar = document.getElementById("btnEnviar");

    btnEnviar.addEventListener("click", () => {
        let password = document.getElementById("password").value;
        let email = document.getElementById("email").value;
        login(password, email);
    });
})