import viewAbstrata from "./viewAbstrata.js";
import localAPI from "../localAPI.js";


export default class extends viewAbstrata {
    constructor(root) {
        super();
        this.escolheTitulo("Base de Dados");    
        this.root = root;

        this.root.innerHTML = `
        <strong><p>id - login - senha - email</p></strong>
        <button id="carrega__dados">Carregar dados do banco de dados</button>`;

        const btnCarregaDados = this.root.querySelector("#carrega__dados");

        btnCarregaDados.addEventListener("click", () => this._atualizaBD());
    }

    _atualizaBD() {
        const objDados = localAPI.leDados();
        let strDados = "";
        for (let i = 0; i < objDados.usuarios.length; i++) {
            const elemento = objDados.usuarios[i];
            strDados += `<div class="usuario" id="${elemento.id}"><p>${elemento.id} - ${elemento.login} - ${elemento.senha} - ${elemento.email}</p></div>`;
        }
        this.root.innerHTML = strDados;
        //Deletar/Editar usuario 
        document.querySelectorAll(".usuario").forEach(usuario => {
            usuario.addEventListener("mouseover", elemento => {
                elemento.target.style.color = "orange";
                setTimeout(function() {
                    elemento.target.style.color = "";
                  }, 500);
            });
            usuario.addEventListener("click", () => {
                const id = usuario.innerText.split('-')[0].trim();
                console.log(id);
            });
            usuario.addEventListener("dblclick", () => {
                const deletar = confirm("Tem certeza que deseja deletar esse usuario?");
                if(deletar) {
                    const id = usuario.innerText.split('-')[0].trim();
                    localAPI.deletarDados(id);
                    this._atualizaBD();
                }
            });
        });
    }

    _selecionado(id, objDados){
        objDados.usuarios.forEach(elemento => {
            if(elemento.id == id) {
                //o elemento que combinar vai poder ser alterado o email, senha ou nome do usuario
            }
        });
    }
}

