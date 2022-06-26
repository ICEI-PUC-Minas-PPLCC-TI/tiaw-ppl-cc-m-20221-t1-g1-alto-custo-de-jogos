import home from "./view/home.js";
import login from "./view/login.js";
import cadastro from "./view/cadastro.js";

const root = document.getElementById("root");

const navegarPara = url => {
    history.pushState(null, null, url);
    rotaF();
}

const rotaF = async () => {
    const rotas = [
        {caminho: "/", view: home},
        {caminho: "/login", view: login},
        {caminho: "/cadastro", view: cadastro},
        {caminho: "/home", view: home}
    ];
    
    //testando cada rota para combinações em potencial
    const combinacoesEmPotencial = rotas.map(rota => {
        return {
            rota: rota,
            ehCombinado: location.pathname === rota.caminho
        };
    });
    // o que acontece aqui é tipo um .filter, ele vai percorrer as rotas e achar qual view tem a mesma rota da url
    let combinou = combinacoesEmPotencial.find(combinacaoEmPotencial => combinacaoEmPotencial.ehCombinado);

    if (!combinou){
        combinou = {
            rota: rotas[0],
            ehCombinado: true
        }; 
    }
    //vai enviar o root para a view montar o DOM
    const view = new combinou.rota.view(root);
};

//toda vez que o historico é algerado a funcao rotaF é iniciada
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