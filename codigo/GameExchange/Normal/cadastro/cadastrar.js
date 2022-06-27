var userObj;

onload = () => {
    document.querySelector('.submit-button').onclick = checarInfo;
}

function checarInfo(){
    let fname = $('#fname').val();
    let lname = $('#lname').val();
    let usuario = $('#uname').val();
    let senha = $('#password').val();
    let cSenha = $('#confirm').val();
    let email = $('#email').val();
    let data = $('#date').val();
    let termos = document.querySelector("#terms");
    // checagens de campo
    let verifica = 0;
    if(!certificaLogin(usuario)){
        verifica++;
    }
    if(!cetificaSenha(senha, cSenha)){
        verifica++;
    }
    if(!certificaEmail(email)){
        verifica++;
    }
    if(!certificaNascimento(data)){
        verifica++;
    }
    if(!certificaNome(fname)){
        verifica++;
    }
    if(!certificaSobrenome(lname)){
        verifica++;
    }
    if(!certificaTermos(termos)){
        verifica++;
    }
    if(verifica == 0){
        const usuario = {};
        efetivarCadastro();
    }
}

const certificaNascimento = nascimento => {
    const string = String(nascimento).trim();
    if(string.length == 8){
        nascimento.style.border = "";
        return true;
    }else {
        nascimento.style.border = "solid #E8833A";
        alert('Voce deve digitar sua data de nascimento com apenas os 8 numeros (DDMMAAAA) para cadastrar!');
        return false
    }
}

const certificaEmail = email => {
    if(email.trim()){
        email.style.border = "";
        return true;
    }else {
        email.style.border = "solid #E8833A";
        return false
    }
}

const certificaSobrenome = sobrenome => {
    if(sobrenome.trim()){
        sobrenome.style.border = "";
        return true;
    }else {
        sobrenome.style.border = "solid #E8833A";
        return false
    }
}

const certificaNome = nome => {
    if(nome.trim()){
        nome.style.border = "";
        return true;
    }else {
        nome.style.border = "solid #E8833A";
        return false
    }
}

const certificaLogin = userName => {
    if(userName.trim()){
        userName.style.border = "";
        return true;
    }else {
        userName.style.border = "solid #E8833A";
        return false
    }
}

const certificaTermos = termos => {
    if(termos.checked) {
        return true;
    }else {
        alert('voce deve aceitar os termos para se cadastrar');
        return false;
    }
}

const cetificaSenha = (senha, cSenha) => {
    if(senha.trim() == cSenha.trim() && senha.trim()!=''){
        senha.style.border = "";
        cSenha.style.border = "";
        return true;
    }else {
        senha.style.border = "solid #E8833A";
        cSenha.style.border = "solid #E8833A";
        return false;
    }
}

function efetivarCadastro(){

    let nome = $('#uname').val();
    let nSenha = $('#password').val();
    let nEmail = $('#email').val();

    let key = JSON.parse(localStorage.getItem('users'));
    let nid = (Object.keys(key.usuarios).length) + 1;

    let newUser = {
        id : nid,
        login : nome,
        senha : nSenha,
        email : nEmail
    }


    key.usuarios.push(newUser);
    localStorage.setItem('users', JSON.stringify(key));

    alert('Cadastro efetivado');
    window.location.href = "../login/login.html";
}
