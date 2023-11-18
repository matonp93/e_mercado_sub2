document.addEventListener("DOMContentLoaded", () => {

    const btnInvitado = document.getElementById("btnInvitado");
    const alertaDenegado = document.getElementById("alerta");
    const btnDenegado = document.getElementById("btnDenegado");
    const btnRegister = document.getElementById("btnRegister");

    function accesoDenegado(){
        alertaDenegado.classList.remove("hidden");
        sleep(2000).then(() => {
            alertaDenegado.style.opacity = '0';
            alertaDenegado.classList.add("hidden");
        }) /* hola q tal */
        alertaDenegado.style.opacity = '1';
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
    btnInvitado.addEventListener("click", ()=>{
        localStorage.setItem("email", "invitado");
        localStorage.setItem("password", "invitado");
        location.href = "index.html";
    })

   function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
    }

    btnRegister.addEventListener("click", () => {
            location.href = "register.html";
    });
})