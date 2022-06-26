import localAPI from "../localAPI.js";

const certificaTudo = obj => {
    let verifica = 0;
    if(!certificaLogin(obj.login)){
        verifica++;
    }
    if(!cetificaSenha(obj.senha, obj.cSenha)){
        verifica++;
    }
    if(!certificaEmail(obj.email)){
        verifica++;
    }
    if(!certificaNascimento(obj.nascimento)){
        verifica++;
    }
    if(!certificaNome(obj.nome)){
        verifica++;
    }
    if(!certificaSobrenome(obj.sobrenome)){
        verifica++;
    }
    if(!certificaTermos(obj.termos)){
        verifica++;
    }
    if(verifica == 0){
        return true;
    }else {
        return false;
    }
}

//depois eu arrumo
const certificaNascimento = (nascimento) => {
    return true;
}

const certificaEmail = email => {
    if(email.value.trim()){
        email.style.border = "";
        return true;
    }else {
        email.style.border = "solid #E8833A";
        return false
    }
}

const certificaSobrenome = sobrenome => {
    if(sobrenome.value.trim()){
        sobrenome.style.border = "";
        return true;
    }else {
        sobrenome.style.border = "solid #E8833A";
        return false
    }
}

const certificaNome = nome => {
    if(nome.value.trim()){
        nome.style.border = "";
        return true;
    }else {
        nome.style.border = "solid #E8833A";
        return false
    }
}

const certificaLogin = userName => {
    if(userName.value.trim()){
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
    if(senha.value.trim() == cSenha.value.trim() && senha.value.trim()!=''){
        senha.style.border = "";
        cSenha.style.border = "";
        return true;
    }else {
        senha.style.border = "solid #E8833A";
        cSenha.style.border = "solid #E8833A";
        return false;
    }
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const certificaCadastro = usuario => {
    const objDados = localAPI.leDados();
    for (let i = 0; i < objDados.usuarios.length; i++) {
        const element = objDados.usuarios[i];
        if(element.login == usuario.login){
            alert("Ja existe um usuário com esse nome de usuario");
            return false;
        }
        if(element.email == usuario.email){
            alert("Ja existe um usuário com esse email");
            return false;
        }
        if(element.id == usuario.id){
            cadastra(usuario);
            return false;
        }
    }
    return true;
}

const cadastra = usuario => {
    usuario.id = getRandomInt(0, 100000);       
    if(certificaCadastro(usuario)){
        localAPI.salvaDados(usuario);
    }
}

onload = () => {
    const nome = document.querySelector("#fname");
    const sobrenome = document.querySelector("#lname");
    const userName = document.querySelector("#uname");
    const date = document.querySelector("#date");
    const email = document.querySelector("#email");
    const senha = document.querySelector("#password");
    const confirmaSenha = document.querySelector("#confirm");
    const termos = document.querySelector("#terms");
    const btnEnviar = document.querySelector("#submit");
    btnEnviar.addEventListener("click", e => {
        e.preventDefault();
        const formulario = {
            login: userName,
            senha: senha,
            cSenha: confirmaSenha,
            email: email,
            nascimento: date,
            nome: nome,
            sobrenome: sobrenome,
            termos: termos,
        };
        if(certificaTudo(formulario)) {
            const novoUsuario = {
                login: userName.value.trim(),
                senha: senha.value.trim(),
                email: email.value.trim(),
                nascimento: date.value.trim(),
                nome: nome.value.trim(),
                sobrenome: sobrenome.value.trim(),
            };
            cadastra(novoUsuario);
        }  
    });
}