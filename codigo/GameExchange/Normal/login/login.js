import localAPI from "../localAPI.js";

const entrar = (login, senha) => {
    const objDados = localAPI.leDados();
    for(let i=0;i<objDados.usuarios.length;i++){
        if(login == objDados.usuarios[i].login && senha == objDados.usuarios[i].senha){
            localAPI.logarUsuario(objDados.usuarios[i]);
            location.href = "./../index.html";
            break;
        }
    }
}

onload = () => {
    const login = document.querySelector("#login");
    const senha = document.querySelector("#senha");
    const btnEnviar = document.querySelector("#entrar");
    btnEnviar.addEventListener("click", () =>{
        entrar(login.value.trim(), senha.value.trim());
    });
}