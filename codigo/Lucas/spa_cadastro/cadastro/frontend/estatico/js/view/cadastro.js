import viewAbstrata from "./viewAbstrata.js";
import localAPI from "../localAPI.js";

export default class extends viewAbstrata {
    constructor(root) {
        super();
        this.escolheTitulo("Cadastro");
        this.root = root;
        this.root.innerHTML = `
        <div class="row">
            <div class="col cadastro">
                <h1>Cadastrar mais um usuario</h1>
                <label for="Xlogin">Digite seu nome de usuário: </label>
                <input id="Xlogin" type="text"><br>               
                <label for="Xsenha">Digite sua senha: </label>
                <input id="Xsenha" type="text"><br>            
                <label for="Xemail">Digite seu email: </label>
                <input id="Xemail" type="text"><br>
                <button  id="enviar">Enviar cadastro</button>
            </div>            
        </div>        
        `; 
        const login = root.querySelector("#Xlogin");
        const senha = root.querySelector("#Xsenha");
        const email = root.querySelector("#Xemail");
        const btnCadastro = root.querySelector("#enviar");
        btnCadastro.addEventListener("click", () => {
            this._cadastra(login, senha, email);
            login.value='';
            senha.value='';
            email.value='';
        });
    }

    _cadastra(login, senha, email) {
        const novoUsuario = {
            id: Math.random() * 1000,
            login: login.value.trim(),
            senha: senha.value.trim(),
            email: email.value.trim()
        };       
        if(this._certificaCadastro(novoUsuario)){
            localAPI.salvaDados(novoUsuario);
        }
    }

    _certificaCadastro(usuario) {
        const objDados = localAPI.leDados();
        for (let i = 0; i < objDados.usuarios.length; i++) {
            const element = objDados.usuarios[i];
            if(element.login == usuario.login){
                alert("Ja existe um usuário com esse nome");
                return false;
            }
            if(element.email == usuario.email){
                alert("Ja existe um usuário com esse email");
                return false;
            }
            if(element.id == usuario.id){
                this._cadastra(usuario.login, usuario.senha, usuario.email);
                return false;
            }
        }
        return true;
    }
}