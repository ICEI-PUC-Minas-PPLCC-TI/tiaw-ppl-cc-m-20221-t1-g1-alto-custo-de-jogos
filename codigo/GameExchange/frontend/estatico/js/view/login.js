export default class{
    constructor(root) {
        document.title = "Login";
        //document.styleSheets = "./estatico/css/login.css";
        this.root = root;
        this.root.innerHTML = `
        <div class="background-cover"></div>
        <aside class="login-menu">
            <div>
                <img src="./estatico/imgs/usuarioImg.png" alt="perfil.png">
                <input type="text" placeholder="Usuário">
                <input type="text" placeholder="Senha">
                
                <div class="acessos">
                    <button>Entrar</button>
                    <a href="#">Cadastro</a>
                </div>
            </div>           
        </aside>
    `;
    }
}