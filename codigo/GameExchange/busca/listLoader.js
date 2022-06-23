onload = () => {
    $.getJSON("../banco_jogos.json", function(json){

        let gameQtd = Object.keys(json.disponiveis);

        console.log(json.disponiveis[21]);
        for(let i = 0; i < gameQtd.length; i++){
            $('.game-thumbs').append($(`<img src="${json.disponiveis[i].capa}">`));
            $('.game-list ul').append($(`<li>${json.disponiveis[i].nome}</li>`));
        }
    });
}