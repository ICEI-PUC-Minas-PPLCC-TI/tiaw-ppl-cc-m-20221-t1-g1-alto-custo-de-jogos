import viewAbstrata from "./viewAbstrata.js";
import localAPI from "../localAPI.js";


export default class extends viewAbstrata {
    constructor(root) {
        super();
        this.escolheTitulo("Base de Dados");    
        this.root = root;
        this.root.innerHTML = `
        <strong><p>id - login - senha - email</p></strong>
        <button class="carrega__dados">Carregar dados do banco de dados</button>`;

        const btnCarregaDados = this.root.querySelector(".carrega__dados");

        btnCarregaDados.addEventListener("click", () => this._atualizaBD());
    }

    _atualizaBD() {
        const objDados = localAPI.leDados();
        let strDados = "";
        for (let i = 0; i < objDados.usuarios.length; i++) {
            const elemento = objDados.usuarios[i];
            strDados += `<div class="usuario"><p>${elemento.id} - ${elemento.login} - ${elemento.senha} - ${elemento.email}</p></div>`;
        }
        this.root.innerHTML = strDados;
        //Deletar usuario 
        document.querySelectorAll(".usuario").forEach(usuario => {
            usuario.addEventListener("dblclick", () => {
                const deletar = confirm("Tem certeza que deseja deletar esse usuario?");
                if(deletar) {
                    const id = usuario.innerText.trim().split('-')[0];
                    localAPI.deletarDados(id);
                    this._atualizaBD;
                }
            });
        });
    }

}

