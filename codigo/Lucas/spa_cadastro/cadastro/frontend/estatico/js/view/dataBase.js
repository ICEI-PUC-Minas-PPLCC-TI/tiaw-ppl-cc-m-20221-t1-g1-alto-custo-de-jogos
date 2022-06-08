import viewAbstrata from "./viewAbstrata.js";
import localAPI from "../localAPI.js";


export default class extends viewAbstrata {
    constructor(root) {
        super();
        this.escolheTitulo("Base de Dados");    
        this.root = root;
        this.root.innerHTML = `
        <strong><p>login - senha - email</p></strong>
        <button class="carrega__dados">Carregar dados do banco de dados</button>`;

        const btnCarregaDados = this.root.querySelector(".carrega__dados");

        btnCarregaDados.addEventListener("click", this._atualizaBD());
    }
    //quando eu clico no botao de navegaçao esta como se ele fosse esse btnCarregaDados
    _atualizaBD() {
        console.log("oasodkoas");
    }
}

