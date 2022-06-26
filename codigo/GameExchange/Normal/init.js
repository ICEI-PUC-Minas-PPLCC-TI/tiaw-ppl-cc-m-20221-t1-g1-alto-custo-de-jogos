import localAPI from "./localAPI.js";

onload = () => {
    const usuario = localAPI.consultarUsuario()
    if(usuario) {
        const bemVindo = document.querySelector("#bemVindo");
        bemVindo.innerHTML = `<p>Bem vindo ${usuario.login}! </p>`;
    }else {
    }
}