import viewAbstrata from "./viewAbstrata.js";
import localAPI from "../localAPI.js";

export default class extends viewAbstrata {
    constructor(root) {
        super();
        this.escolheTitulo("Cadastro");
        this._criaHTML(root);
    }

    _criaHTML(root) {
        root.innerHTML = `
        <div class="row">
            <div class="col cadastro">
                <h1>Cadastrar mais um usuario</h1>
                <label for="login">Digite seu nome de usuário: </label>
                <input id="login" class="login" type="text"><br>               
                <label for="senha">Digite sua senha: </label>
                <input id="senha" class="senha" type="text"><br>            
                <label for="email">Digite seu email: </label>
                <input id="email" class="email" type="text"><br>
                <button  id="enviar" class="enviarCadastro">Enviar cadastro</button>
            </div>            
        </div>        
        `; 
        const Login = root.querySelector(".login");
        const senha = root.querySelector(".senha");
        const email = root.querySelector(".email");
        const btnCadastro = root.querySelector(".enviarCadastro");
        btnCadastro.addEventListener("click", this._cadastra());
    }

    _cadastra() {
        console.log("foi");
    }
}