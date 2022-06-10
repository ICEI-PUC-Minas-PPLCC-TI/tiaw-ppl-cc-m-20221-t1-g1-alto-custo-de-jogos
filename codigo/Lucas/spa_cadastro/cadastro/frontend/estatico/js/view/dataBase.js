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
        //seleciona o usuario
        document.querySelectorAll(".usuario").forEach(usuario => {
            usuario.addEventListener("mouseenter", elemento => {
                elemento.target.style.fontSize = "125%";
            });
            usuario.addEventListener("mouseleave", elemento => {
                elemento.target.style.fontSize = "100%";
            });
            usuario.addEventListener("click", () => {
                const id = usuario.innerText.split('-')[0].trim();
                document.querySelectorAll('.selecionado').forEach(element => {
                    element.remove();
                });
                this._selecionado(id, objDados);
            });
        });
    }

    _selecionado(id){
        const htmlDoUsuario = document.getElementById(id);
        htmlDoUsuario.insertAdjacentHTML('beforeend', `<button id="trocarUsuario" class="selecionado">Mudar usuario</button><button id="trocarSenha" class="selecionado">Mudar senha</button><button id="trocarEmail" class="selecionado">Mudar email</button><button id="deletar" class="selecionado">Deletar</button>`);
        //Deleta usuario
        const btnDeletar = document.querySelector("#deletar");
        btnDeletar.addEventListener("click", () => {
            const deletar = confirm("Tem certeza que deseja deletar esse usuario?");
                if(deletar) {
                    localAPI.deletarDados(id);
                    this._atualizaBD();
                }
        });
        //Trocar nome do usuario
        const btnTrocaNome = document.querySelector("#trocarUsuario");
        btnTrocaNome.addEventListener("click", () => this.trocaNome(id));
        //Trocar senha do usuario
        const btnTrocaSenha = document.querySelector("#trocarSenha");

        //Trocar email do usuario
        const btnEmail = document.querySelector("#trocarEmail");
    }

    trocaNome(id) {
        const objDados = localAPI.leDados();

        objDados.usuarios.forEach(usuario => {

        });

    }
}

