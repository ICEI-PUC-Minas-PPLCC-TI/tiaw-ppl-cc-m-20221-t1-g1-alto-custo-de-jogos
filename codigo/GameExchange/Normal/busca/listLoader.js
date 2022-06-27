
let loginStatus = JSON.parse(localStorage.getItem('status'));
const objDados = JSON.parse(localStorage.getItem('users'));
// se não estiver logado
if(loginStatus.login == 0){
    alert("Usuário não identificado");
    window.location.href = "../index.html";
}

onload = () => {
    
    // mensagem de bem-vindo!
    const logado = objDados.usuarios.find(usuario => usuario.id == loginStatus.id);
    const bemVindo = document.querySelector("#areaBemVindo");
    bemVindo.innerHTML = `<p>Bem vindo ${logado.login}! <button id="sair">Sair</button></p>`;
    document.querySelector("#sair").addEventListener('click', () => {
        let _obj = { login : 0, id : 0};
        localStorage.setItem('status', JSON.stringify(_obj));
        window.location.href = '../index.html';
    });

    $.getJSON("../banco_jogos.json", function(json){

        let gameQtd = Object.keys(json.disponiveis);

        for(let i = 0; i < gameQtd.length; i++){
            $('.game-thumbs').append($(`<img src="${json.disponiveis[i].capa}">`));
            $('.game-list ul').append($(`<li>${json.disponiveis[i].nome}</li>`));
        }
    });
}