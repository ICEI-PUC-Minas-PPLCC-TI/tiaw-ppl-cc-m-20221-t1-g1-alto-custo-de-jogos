
var gameList;   //elemento ul para listar os jogos
var thumbSect;  //elemento section para armazenar as capas
var gameBd      //array de jogos na local storage

onload = () => {
    document.querySelector('#add-game').onclick = cadastrarGame;
    document.querySelector('#remove-game').onclick = removerGame;
    gameList = document.querySelector('#list');
    thumbSect = document.querySelector('#thumbs');

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
        let bd = {  idSufix: 1,games:[]  };
        localStorage.setItem('bd', JSON.stringify(bd));
    }

    gameBd = localStorage.getItem('bd');
    gameBd = JSON.parse(gameBd);
}

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

    ordenarLista();
}

function cadastrarGame(){
    
    let confirma = confirm("Cadastrar novo jogo?");
    if(!confirma) return;

    let nome = prompt("Qual o nome do jogo?");
    let plataforma = prompt("Qual a plataforma do jogo?");
    
    if(nome == null || plataforma == null){
        alert("Informações inválidas para o cadastro");
        return;
    }

    // criando o objeto do jogo
    let jogo = new Jogo(nome, plataforma, 'imgs/WireframeTest.jpg', 'bd' + gameBd.idSufix++);
    gameBd.games.push(jogo);
    localStorage.setItem('bd', JSON.stringify(gameBd))


    //adiciona o nome do jogo a lista
    let newL = document.createElement('li');
    newL.innerText = `${nome} (${plataforma})`;
    newL.setAttribute('id',jogo.id);

    gameList.insertBefore(newL, gameList.firstChild);

    //adiciona a capa do jogo a biblioteca
    let newT = document.createElement('img');
    newT.setAttribute('src', 'imgs/WireframeTest.jpg')
    newT.setAttribute('id', jogo.id);

    thumbSect.appendChild(newT);

    //ordena a lista
    ordenarLista();
}

function removerGame(){

    let confirma = confirm("Remover jogo?");
    if(!confirma) return;

    let nome = prompt("Nome do jogo");
    let plataforma = prompt("Plataforma do jogo");

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
    
}

function ordenarLista(){
    
    let liList = document.querySelectorAll('ul#list li');
    let sortedList = [];

    //inicializando a matriz
    for(let i = 0; i < liList.length; i++) sortedList[i] = [];

    for(let i = 0; i < liList.length; i++){
        for(j = 0; j < 2; j++){
            if(j == 0) sortedList[i][j] = liList[i].innerText;
            else if(j == 1) sortedList[i][j] = liList[i].id;
        }
    }

    //ordenando
    for(let i = 0; i < liList.length - 1; i++){

    }
}