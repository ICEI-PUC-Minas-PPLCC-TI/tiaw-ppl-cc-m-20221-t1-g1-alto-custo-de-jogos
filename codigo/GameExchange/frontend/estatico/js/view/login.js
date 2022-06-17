export default class{
    constructor(root) {
        document.title = "Login";
        this.root = root;
        this.root.innerHTML = `
        <div class="background-cover"></div>
        <aside class="login-menu">
            <div>
                <img src="./imgs/usuarioImg.png" alt="perfil.png">
                <input type="text" placeholder="Usuário">
                <input type="text" placeholder="Senha">
                
                <div class="acessos">
                    <button>Entrar</button>
                    <a href="../cadastro" data-link>Cadastro</a>
                </div>
            </div>           
        </aside>
    `;
    }
}