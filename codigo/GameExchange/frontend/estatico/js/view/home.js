export default class{
    constructor(root) {
        document.title = "Game Exchange";
        this.root = root;
        this.root.innerHTML = `
        <!-- cabeçalho -->
        <header>
            <div class="top-menu">
                <div class="logo">
                    <img src="./estatico/imgs/Logo.png" alt="logo.png">
                    <label>Game Exchange</label>
                </div>
                <div class="input-area">
                    <ul class="cadastro-login">
                        <li><a>Login</a></li>
                        <li>|</li>
                        <li><a>Cadastro</a></li>
                    </ul>
                    <div class="search-bar">
                        <input type="text" placeholder="Buscar">
                        <button>Ok</button>
                    </div>
                </div>
            </div>
            <div class="sub-menu">
                <nav>
                    <ul>
                        <li>opção 1</li>
                        <li>|</li>
                        <li>opção 2</li>
                        <li>|</li>
                        <li>opção 3</li>
                        <li>|</li>
                        <li>opção 4</li>
                    </ul>
                </nav>
            </div>
        </header>

        <!-- corpo intro -->
        <section class="intro">
            <h2>Apresentando o Serviço</h2>
            <div class="main-content">
                <img src="./estatico/imgs/WireframeTest.jpg" alt="apresentação.png">
                <div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem necessitatibus ipsum dicta dignissimos praesentium ullam blanditiis fugit corrupti temporibus nisi minima atque nemo repellendus, culpa sint sit voluptatem fugiat nostrum.
                    Autem cupiditate at, mollitia iste illum sequi laborum recusandae enim, iure obcaecati, architecto cum quisquam non minima corrupti culpa voluptate nulla dicta distinctio veritatis voluptatem voluptas explicabo eveniet totam! Iste.</p>
                    <button>Assinar</button>
                </div>
            </div>
        </section>
        <!-- corpo info -->
        <section class="info">
            <h3>Informações do serviço</h3>
            <ul>
                <li>lorem ispum dolor sit amet</li>
                <li>lorem ispum dolor sit amet</li>
                <li>lorem ispum dolor sit amet</li>
                <li>lorem ispum dolor sit amet</li>
                <li>lorem ispum dolor sit amet</li>
                <li>lorem ispum dolor sit amet</li>
            </ul>
        </section>
        <!-- corpo exemplo -->
        <section class="exemplo">
            <h3>Exemplo de Jogos</h3>
            <div class="thumbs">
                <img src="./estatico/imgs/WireframeTest.jpg" alt="thumb.png">
                <img src="./estatico/imgs/WireframeTest.jpg" alt="thumb.png">
                <img src="./estatico/imgs/WireframeTest.jpg" alt="thumb.png">
            </div>
        </section>
    `;
    }
}