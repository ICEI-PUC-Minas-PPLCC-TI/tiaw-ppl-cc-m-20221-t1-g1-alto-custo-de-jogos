import viewAbstrata from "./viewAbstrata.js";

export default class extends viewAbstrata {
    constructor() {
        super();
        this.setTitle("Base de Dados");       
    }

    async getHtml() {
        return `
        <strong><p>login - senha - email</p></strong>
        <button onclick="carregaDados()">Carregar dados do banco de dados</button>`;
    }    
}

