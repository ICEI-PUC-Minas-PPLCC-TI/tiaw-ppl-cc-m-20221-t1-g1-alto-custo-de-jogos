var userObj;

onload = () => {
    document.querySelector('.submit-button').onclick = checarInfo;
}

function checarInfo(){
    let fname = $('#fname').val();
    let lname = $('#lname').val();
    let usu = $('#uname').val();
    let senha = $('#password').val();
    let email = $('#email').val();

    // checagens de campo
    if(fname == ''){
        alert('Digite seu primeiro nome!');
        return;
    }
    if(lname == ''){
        alert('Digite seu último nome!');
        return;
    }
    if(usu == ''){
        alert('Digite um nome de usuário!');
        return;
    }
    if(email == ''){
        alert('Digite um email válido');
        return;
    }
    if(senha == ''){
        alert('Digite uma senha válida!');
        return;
    }

    efetivarCadastro();
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
