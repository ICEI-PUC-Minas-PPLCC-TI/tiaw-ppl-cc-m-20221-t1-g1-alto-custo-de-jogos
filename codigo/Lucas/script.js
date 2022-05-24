function leDados(){
    let strDados = localStorage.getItem('db');
    let objDados ={};
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
    let objDados ={};
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
function imprimeDados(){
    let visor = document.getElementById('visor');
    let strHtml = "";
    let objDados = leDados();
    strHtml = `<strong><p>login - senha - email</p></strong>`;
    for(i=0;i<objDados.usuarios.length;i++){
        strHtml += `<p>${objDados.usuarios[i].login} - ${objDados.usuarios[i].senha} - ${objDados.usuarios[i].email}</p>`;
    }
    visor.innerHTML = strHtml;
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
//configura butões

document.getElementById('enviar').addEventListener('click', incluirContato);
document.getElementById('carregaDados').addEventListener('click', imprimeDados);
document.getElementById('enviarLogin').addEventListener('click', entrar);