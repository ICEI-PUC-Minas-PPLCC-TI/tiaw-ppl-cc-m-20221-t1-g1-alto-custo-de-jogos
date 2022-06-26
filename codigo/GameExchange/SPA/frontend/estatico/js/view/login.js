import localAPI from "../localAPI.js";

export default class{
    constructor(root) {
        document.title = "Login";
        this.root = root.innerHTML = `
        <div class="background-cover"></div>
        <aside class="login-menu">
            <div>
                <a href="/home" data-link>Home</a>
                <img src="estatico/img/usuarioImg.png" alt="perfil.png">
                <input type="text" placeholder="Usuário" id="login">
                <input type="text" placeholder="Senha" id="senha">
                
                <div class="acessos">
                    <button id="entrar">Entrar</button>
                    <a href="/cadastro" data-link>Cadastro</a>
                </div>
            </div>           
        </aside>
    `;
    const login = document.querySelector("#login");
    const senha = document.querySelector("#senha");
    const btnEnviar = document.querySelector("#entrar");
    btnEnviar.addEventListener("click", () =>{
        this._entrar(login.value.trim(), senha.value.trim());
    });
    }

    _entrar(login, senha) {
        const objDados = localAPI.leDados();
        for(let i=0;i<objDados.usuarios.length;i++){
            if(login == objDados.usuarios[i].login && senha == objDados.usuarios[i].senha){
                localAPI.logarUsuario(objDados.usuarios[i]);
                const homePage = document.querySelector('#homePage');
                homePage.c
                break;
            }
        }
    }

}