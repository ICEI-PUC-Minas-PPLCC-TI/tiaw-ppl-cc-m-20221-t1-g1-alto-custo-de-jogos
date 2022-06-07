import viewAbstrata from "./viewAbstrata.js";

export default class extends viewAbstrata {
    constructor() {
        super();
        this.setTitle("Login");
    }

    async getHtml() {
        return `
            <div class="row">
                <div id="loginT" class="col login">
                    <h1>Login</h1>
                    <label for="xLogin">Digite seu login:</label>
                    <input id="xLogin" type="text"><br>  
                    <label for="xSenha">Digite sua senha:</label>
                    <input id="xSenha" type="text"><br>  
                    <button id="enviarLogin">Entrar</button>
                </div>
            </div> 
        `;
    }
}