import viewAbstrata from "./viewAbstrata.js";

export default class extends viewAbstrata {
    constructor() {
        super();
        this.setTitle("Home");
    }

    async getHtml() {
        return `
            <div class="row">
                <div class="col cadastro">
                    <h1>Bem vindo as opções de cadastro</h1>
                    <p>Selecione o que deseja fazer</p>
                    <a href="/cadastro" class="nav__link" data-link>Cadastro</a>
                    <a href="/login" class="nav__link" data-link>Login</a>
                    <a href="/dataBase" class="nav__link" data-link>Base de dados</a>
                </div>            
            </div> 
        `;
    }
}