import home from "./view/home.js";
import cadastro from "./view/cadastro.js";
import login from "./view/login.js";
import dataBase from "./view/dataBase.js";

const navegarPara = url => {
    history.pushState(null, null, url);
    rotaF();
}

const rotaF = async () => {
    const rotas = [
        {caminho: "/", view: home},
        {caminho: "/cadastro", view: cadastro},
        {caminho: "/login", view: login},
        {caminho: "/dataBase", view: dataBase},
    ];
    //testando cada rota para combinações em potencial
    const combinacoesEmPotencial = rotas.map(rota => {
        return {
            rota: rota,
            ehCombinado: location.pathname === rota.caminho
        };
    });
    let combinou = combinacoesEmPotencial.find(combinacaoEmPotencial => combinacaoEmPotencial.ehCombinado);

    if (!combinou){
        combinou = {
            rota: rotas[0],
            ehCombinado: true
        }; 
    }

    const view = new combinou.rota.view();

    document.querySelector("#root").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", rotaF);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navegarPara(e.target.href);
        }
    });
    rotaF();
});

function leDados(){
    let strDados = localStorage.getItem('db');
    let objDados = {};
    if(strDados){
        objDados = JSON.parse(strDados);
    }
    else{
        objDados = {usuarios:[{login: "log1", senha: "123", email:"email1@email.com"},{login: "log2", senha: "1234", email:"email2@email.com"},{login: "log4", senha: "12345", email:"email3@email.com"}]};
    }
    return objDados;
}

function leConta(){
    let strDados = localStorage.getItem('lg');
    let objDados = {};
    objDados = JSON.parse(strDados);
    return objDados;
}
function salvaDados(dados){
    localStorage.setItem('db', JSON.stringify(dados));
}
function salvaLogin(conta, index){
    localStorage.setItem('lg', JSON.stringify(conta));
    localStorage.setItem('i', index);
}
function clearLogin(){
    localStorage.setItem('lg', null);
    localStorage.setItem('i', null);
}

function incluirContato(){
    let objDados = leDados();

    let xLogin = document.getElementById('login').value;
    let xSenha = document.getElementById('senha').value;
    let xemail = document.getElementById('email').value;
    let igual = 0;
    let novoUsuario = {
        login: xLogin,
        senha: xSenha,
        email: xemail
    };
    for(i=0;i<objDados.usuarios.length;i++){
        if(objDados.usuarios[i].login == xLogin){
            alert('Ja existe um usuário com esse nome');
            igual++;
        }
        if(objDados.usuarios[i].email == xemail){
            alert('Ja existe um usuário com esse email');
            igual++;
        }
    }
    if(igual==0){
        objDados.usuarios.push(novoUsuario);
        salvaDados(objDados);
    }
}

function entrar(){
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

function loginTela(index){
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

function trocarEmail(){
    let visor = document.getElementById('loginT');
    let objConta = leConta();
    let strHtml = `<p>Seu email atual é ${objConta.email}</p>
                    <label for="novoEmail">Digite seu novo email:</label>
                    <input id="novoEmail" type="text"><br> 
                    <button id="enviarNEmail" onclick="salvaEmail()">Enviar</button> `;
    visor.innerHTML = strHtml;
}

function salvaEmail(){
    let novoEmail = document.getElementById('novoEmail').value;
    let objDados = leDados();
    let objConta = leConta();
    let index =localStorage.getItem('i');
    objDados.usuarios[index].email = novoEmail;
    objConta.email = novoEmail;
    salvaDados(objDados);
    salvaLogin(objConta);
    loginTela(index)
}

function sair(){
    clearLogin();
    let visor = document.getElementById('loginT');
    let strHtml = `<h1>Login</h1>
    <label for="xLogin">Digite seu login:</label>
    <input id="xLogin" type="text"><br>  
    <label for="xSenha">Digite sua senha:</label>
    <input id="xSenha" type="text"><br>  
    <button id="enviarLogin">Entrar</button>`;
    visor.innerHTML = strHtml;
}

function excluir(){
    let objDados = leDados();
    let index = localStorage.getItem('i');
    objDados.usuarios.splice(index,1);
    salvaDados(objDados);
    sair();
}

const carregaDados = () => console.log("funcionou"); 
