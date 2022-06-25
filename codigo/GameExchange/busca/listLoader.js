
let loginStatus = JSON.parse(localStorage.getItem('status'));
// se não estiver logado
if(loginStatus.login == 0){
    alert("Usuário não identificado");
    window.location.href = "../index.html";
}

onload = () => {
     
    $.getJSON("../banco_jogos.json", function(json){

        let gameQtd = Object.keys(json.disponiveis);

        for(let i = 0; i < gameQtd.length; i++){
            $('.game-thumbs').append($(`<img src="${json.disponiveis[i].capa}">`));
            $('.game-list ul').append($(`<li>${json.disponiveis[i].nome}</li>`));
        }
    });
}