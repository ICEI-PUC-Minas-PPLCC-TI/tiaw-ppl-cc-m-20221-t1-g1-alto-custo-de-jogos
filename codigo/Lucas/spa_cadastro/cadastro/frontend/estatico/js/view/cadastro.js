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
                <label for="login">Digite seu nome de usuário: </label>
                <input id="login" type="text"><br>               
                <label for="senha">Digite sua senha: </label>
                <input id="senha" type="text"><br>            
                <label for="email">Digite seu email: </label>
                <input id="email" type="text"><br>
                <button  id="enviar">Enviar cadastro</button>
            </div>            
        </div>        
        `; 
        const login = root.querySelector("#login");
        const senha = root.querySelector("#senha");
        const email = root.querySelector("#email");
        const btnCadastro = root.querySelector("#enviar");
        btnCadastro.addEventListener("click", () => this._cadastra(login, senha, email));
    }

    _cadastra(login, senha, email) {
        const objDados = localAPI.leDados();
        const novoUsuario = {
            id: Math.random() * 100000000,
            login: login.value.trim(),
            senha: senha.value.trim(),
            email: email.value.trim()
        };
        let igual = 0;
        for (let i = 0; i < objDados.usuarios.length; i++) {
            const element = objDados.usuarios[i];
            if(element.login == login){
                alert("Ja existe um usuário com esse nome");
                igual++;
            }
            if(element.email == email){
                alert("Ja existe um usuário com esse email");
                igual++;
            }
            if(element.id == novoUsuario.id){
                this._cadastra(login, senha, email);
                igual++;
            }
        }
        if(igual==0){
            localAPI.salvaDados(novoUsuario);
        }
    }

}