
var gameList;   //elemento ul para listar os jogos
var thumbSect;  //elemento section para armazenar as capas

var gameBd;     //array de jogos na local storage
var gameOpt;    //lista de jogos disponíveis para cadastro

var tempGameId;  //indice temporário para acriação de um jogo

onload = () => {
    // eventos de controle
    // adição e remoção de jogos, definição do menu e campos de texto
    document.querySelector('#add-game').onclick = () => { 
        $('.menu-cadastro').css('visibility', 'visible'); 
        $('div.menu-cadastro > h3').text('Cadastre seu jogo');
        $('.name-field').css('background-color','white');
        $('.platform-field').css('background-color','white');
        $('.name-field').val('');
        $('.platform-field').val('');
        
        // adiciona a classe da operação
        let controlador = $('.menu-cadastro > div');
        
        if (controlador.hasClass('remover')){
            controlador.removeClass('remover');
            controlador.addClass('cadastro');
        }else{
            controlador.addClass('cadastro');
        }

        let campoN = $('.name-input #state-check');
        let campoP = $('.platform-input #state-check');

        if(campoN.hasClass('remover') && campoP.hasClass('remover')){
            campoN.removeClass('remover');
            campoP.removeClass('remover');

            campoN.addClass('cadastro');
            campoP.addClass('cadastro');
        }else{
            campoN.addClass('cadastro');
            campoP.addClass('cadastro');
        }
    };
    document.querySelector('#remove-game').onclick = () => {
        $('.menu-cadastro').css('visibility', 'visible'); 
        $('div.menu-cadastro > h3').text('Remover jogo');
        $('.name-field').css('background-color','white');
        $('.platform-field').css('background-color','white');
        $('.name-field').val('');
        $('.platform-field').val('');
        
        let controlador = $('.menu-cadastro > div');
        
        // adiciona a classe da operação
        if (controlador.hasClass('cadastro')){
            controlador.removeClass('cadastro');
            controlador.addClass('remover');
        }else{
            controlador.addClass('remover');
        }

        let campoN = $('.name-input #state-check');
        let campoP = $('.platform-input #state-check');

        if(campoN.hasClass('cadastro') && campoP.hasClass('cadastro')){
            campoN.removeClass('cadastro');
            campoP.removeClass('cadastro');

            campoN.addClass('remover');
            campoP.addClass('remover');
        }else{
            campoN.addClass('remover');
            campoP.addClass('remover');
        }
    };
    document.querySelector('.cancel').onclick = () => {
        $('.name-field').val('');
        $('.platform-field').val('');
        $('.menu-cadastro').css('visibility', 'hidden');
        
        let controlador = $('.menu-cadastro > div');
        
        if(controlador.hasClass('cadastro')) controlador.removeClass('cadastro');
        else if(controlador.hasClass('remover')) controlador.removeClass('remover');
    };
    document.querySelector('.submit').onclick = resolverMenu;  
    $('.menu-cadastro').css('visibility', 'hidden');
    
    // recupera os elementos do html
    gameList = document.querySelector('#list');
    thumbSect = document.querySelector('#thumbs');
    
    // banco de dados dos jogos possíveis para cadasto
    $.getJSON('data/banco_jogos.json', function(json){
        gameOpt = json;
    });

    // evento de entrada de texto
    // quando o usuário digitar nos campos de texto, estes eventos devem ser chamados
    document.querySelector('.name-field').onchange = () => {
        checarGame($('.name-field').val());
    };
    document.querySelector('.platform-field').onchange = () => {
        checarPlataforma($('.platform-field').val());
    };
    
    // inicializações
    inicializarBd();
    initBiblioteca();
}

// função construtora de jogos
function Jogo(nome, plataforma, capa, id){
    this.nome = nome;
    this.plataforma = plataforma;
    this.capa = capa;
    this.id = id;
}

// função para criar o banco de dados na local storage
function inicializarBd(){
    
    let getBd = localStorage.getItem('bd');
    if(!getBd){
        let bd = {  idSufix: 1, games:[]  };
        localStorage.setItem('bd', JSON.stringify(bd));
    }

    gameBd = localStorage.getItem('bd');
    gameBd = JSON.parse(gameBd);
}

// função para carregar os jogos da biblioteca
// somente se existirem jogos cadastrados no local storage
function initBiblioteca(){

    let amount = gameBd.games.length;
    if(amount == 0) return;

    for(let i = 0; i < amount; i++){
        let nome = gameBd.games[i].nome;
        let plataforma = gameBd.games[i].plataforma;
        let capa = gameBd.games[i].capa;
        let id = gameBd.games[i].id;

        let newL = document.createElement('li');
        let newT = document.createElement('img');

        newL.innerText = `${nome} (${plataforma})`;
        newL.setAttribute('id',id);
        newT.setAttribute('src', capa);
        newT.setAttribute('id', id);

        gameList.insertBefore(newL, gameList.firstChild);
        thumbSect.appendChild(newT);
    }
}

// função controladora do menu
// determina se irá adicionar ou remover o jogo
function resolverMenu(){
    let controlador = $('.menu-cadastro > div');

    if(controlador.hasClass('cadastro')) enviarGame();
    else removerGame();
}

// checa se o game está disponível para cadastro ou para remoção
function checarGame(str, type){
    let match = false;
    let operation = document.getElementById('state-check').getAttribute('class');

    if(operation === 'cadastro'){
        for(let i = 0; i < gameOpt.disponiveis.length; i++){
            if(str == gameOpt.disponiveis[i].nome){
                $('.name-field').css('background-color', 'green');
                match = true;
            }
        }
        if(match === false) $('.name-field').css('background-color', 'red');
    }
    else{
        for(let i = 0; i < gameBd.games.length; i++){
            if(str == gameBd.games[i].nome){
                $('.name-field').css('background-color', 'green');
                match = true;
            }
        }
        if(match === false) $('.name-field').css('background-color', 'red');
    }

    
    return match;
}
// checa se a plataforma existe
function checarPlataforma(str, type){
    let match = false;
    let operation = document.getElementById('state-check').getAttribute('class');

    //index do jogo para checar a plataforma
    let game_id = -1;
    for(let i = 0; i < gameOpt.disponiveis.length; i++){
        if($('.name-field').val() == gameOpt.disponiveis[i].nome) 
            game_id = i;
    }

    // tratamento de erro: nome não digitado
    if(game_id == -1){
        alert("Digite o nome de um jogo válido");
        return;
    }

    if(operation == 'cadastro'){
        for(let i = 0; i < gameOpt.disponiveis[game_id].plataformas.length; i++){
            if(str == gameOpt.disponiveis[game_id].plataformas[i]){
                $('.platform-field').css('background-color', 'green');
                match = true;
            }
        }
        if(match === false) $('.platform-field').css('background-color', 'red');
    }
    else {
        for(let i = 0; i < gameBd.games.length; i++){
            if(str == gameBd.games[i].plataforma){
                $('.platform-field').css('background-color', 'green');
                match = true;
            }
        }
        if(match === false) $('.platform-field').css('background-color', 'red');
    }

    return match;
}

function removerGame(){

    let nome = $('.name-field').val();
    let plataforma = $('.platform-field').val();

    //encontra o index do jogo no banco de dados
    let index = -1;
    for(let i = 0; i < gameBd.games.length; i++)
        if(nome == gameBd.games[i].nome && plataforma == gameBd.games[i].plataforma)
            index = i;
    
    // tratamento de erro
    // caso não encontre o nome ou a plataforma
    if (index == -1){
        alert("Jogo não encontrado.");
        return;
    }

    // pega o id do jogo
    let gameId = gameBd.games[index].id;
    
    //remove os componentes do html
    let liList = document.querySelectorAll('ul#list li');
    let imgList = document.querySelectorAll('section img');
    for(let i = 0; i < gameBd.games.length; i++){
        let liId = liList[i].getAttribute('id');
        let imgId = imgList[i].getAttribute('id');

        if(liId == gameId) liList[i].remove();
        if(imgId == gameId) imgList[i].remove();      
    }

    //atualiza o banco de dados
    gameBd.games.splice(index, 1);
    localStorage.setItem('bd', JSON.stringify(gameBd));

    $('.menu-cadastro').css('visibility', 'hidden');
    
}
function enviarGame(){

    let nome = $('.name-field').val();
    let plataforma = $('.platform-field').val();

    // tratamento de erro caso o nome ou a plataforma forem vazios
    if(nome == null || plataforma == null || nome.length == 0 || plataforma.length == 0){
        alert("Informações inválidas para o cadastro");
        return;
    }

    // chacagem se o jogo existe
    let nomeCheck = checarGame(nome);
    let plataformaCheck = checarPlataforma(plataforma);

    if(!nomeCheck){
        alert("Nome inválido");
        return;
    }
    else if(!plataformaCheck){
        alert("Plataforma inválida");
        return;
    }

    // recuperando a ID do jogo
    for(let i = 0; i < gameOpt.disponiveis.length; i++){
        if(nome == gameOpt.disponiveis[i].nome) 
            tempGameId = i;
    }

    // criando o objeto do jogo
    let jogo = new Jogo(nome, plataforma, gameOpt.disponiveis[tempGameId].capa, 'bd' + gameBd.idSufix++);
    gameBd.games.push(jogo);
    localStorage.setItem('bd', JSON.stringify(gameBd))


    //adiciona o nome do jogo a lista
    let newL = document.createElement('li');
    newL.innerText = `${nome} (${plataforma})`;
    newL.setAttribute('id',jogo.id);

    gameList.insertBefore(newL, gameList.firstChild);

    //adiciona a capa do jogo a biblioteca
    let newT = document.createElement('img');
    newT.setAttribute('src', gameOpt.disponiveis[tempGameId].capa)
    newT.setAttribute('id', jogo.id);
    
    thumbSect.appendChild(newT);

    $('.menu-cadastro').css('visibility', 'hidden');
    tempGameId = -1;    //valor padrão
}