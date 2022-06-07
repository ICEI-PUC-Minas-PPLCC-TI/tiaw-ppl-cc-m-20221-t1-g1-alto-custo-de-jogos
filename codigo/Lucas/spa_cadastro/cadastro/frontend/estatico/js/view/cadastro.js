import viewAbstrata from "./viewAbstrata.js";

export default class extends viewAbstrata {
    constructor() {
        super();
        this.setTitle("Cadastro");
    }

    async getHtml() {
        return `
            <div class="row">
                <div class="col cadastro">
                    <h1>Cadastrar mais um usuario</h1>
                    <label for="login">Digite seu nome de usuário: </label>
                    <input id="login" type="text"><br>               
                    <label for="senha">Digite sua senha: </label>
                    <input id="senha" type="text"><br>            
                    <label for="email">Digite seu email: </label>
                    <input id="email" type="text"><br>
                    <button  id="enviar" onclick="incluirContato()">Enviar cadastro</button>

                </div>            
            </div>
        `;
    }
}