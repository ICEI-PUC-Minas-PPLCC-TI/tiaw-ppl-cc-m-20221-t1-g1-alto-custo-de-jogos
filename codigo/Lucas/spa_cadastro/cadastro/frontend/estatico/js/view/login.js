import viewAbstrata from "./viewAbstrata.js";

export default class extends viewAbstrata {
    constructor(root) {
        super();
        this.escolheTitulo("Login");
        this.root = root;
        this.root.innerHTML = `
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

    entrar() {
        let login = document.getElementById('xLogin').value;
        let senha = document.getElementById('xSenha').value;
        let objDados = leDados();
        for(i=0;i<objDados.usuarios.length;i++){
            if(login == objDados.usuarios[i].login && senha == objDados.usuarios[i].senha){
                loginTela(i);
                break;
            }
        }
    }

    loginTela(index) {
        let visor = document.getElementById('loginT');
        let objDados = leDados();
        let strHtml = `<p>Bem vindo ${objDados.usuarios[index].login}</p>
                        <p>Seu email atua é: ${objDados.usuarios[index].email}</p>
                        <button id="alterarEmail" onclick="trocarEmail()">Deseja alterar seu email?</button>
                        <button id="sair" onclick="sair()">Sair</button>
                        <button id="excluir" onclick="excluir()">Excluir conta!</button>
                        `;
        visor.innerHTML = strHtml;
        salvaLogin(objDados.usuarios[index], index);
    }

    trocarEmail() {
        let visor = document.getElementById('loginT');
        let objConta = leConta();
        let strHtml = `<p>Seu email atual é ${objConta.email}</p>
                        <label for="novoEmail">Digite seu novo email:</label>
                        <input id="novoEmail" type="text"><br> 
                        <button id="enviarNEmail" onclick="salvaEmail()">Enviar</button> `;
        visor.innerHTML = strHtml;
    }
}