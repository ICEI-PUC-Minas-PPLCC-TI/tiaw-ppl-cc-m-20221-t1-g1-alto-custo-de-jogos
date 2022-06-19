import localAPI from "../localAPI.js";

export default class{
    constructor(root) {
        document.title = "Cadastro";
        this.root = root;
        this.root.innerHTML = `
        <div class="background"></div>
        <aside class="main-area">
            <h2>Novo usuário</h2>
            <form action="" method="">    
                <div class="name-input">
                    <div>
                        <label for="fname">Digite seu nome:</label><br>
                        <input type="text" id="fname" placeholder="Primeiro nome"><br>
                    </div>
                    <div>
                        <label for="lname">Digite seu sobrenome:</label><br>
                        <input type="text" id="lname" placeholder="Sobrenome"><br>
                    </div>
                </div>
                
                <div class="user-input">
                    <label for="uname">Nome do usuário</label><br>
                    <input type="text" id="uname">
                </div>

                <!-- seletor de data -->
                <div class="form-group">
                    <label for="date">Data de Nascimento</label><br>
                    <input class="form-control" id="date" name="date" placeholder="DD/MM/AAAA" type="text"/>
                </div>
                  <!-- botão de envio -->
                  <!--<div class="form-group">
                    <button class="btn btn-primary " name="submit" type="submit">Submit</button>
                  </div>-->

                <div class="email-input">
                    <label for="email">E-mail</label><br>
                    <input type="text" id="email">
                </div>
                <div class="password-input">
                    <div>
                        <label for="password">Senha:</label><br>
                        <input type="text" id="password"><br>
                    </div>
                    <div>
                        <label for="confirm">Confirmar senha:</label><br>
                        <input type="text" id="confirm"><br>
                    </div>
                </div>

                <div class="term-check">
                    <input type="checkbox" id="terms">
                    <label for="terms">Aceito os termos e condições</label>
                </div>
                <button type="submit" id="submit">Enviar</button>
            </form>
        </aside>
        `;
        const nome = document.querySelector("#fname");
        const sobrenome = document.querySelector("#lname");
        const userName = document.querySelector("#uname");
        const date = document.querySelector("#date");
        const email = document.querySelector("#email");
        const senha = document.querySelector("#password");
        const confirmaSenha = document.querySelector("#confirm");
        const termos = document.querySelector("#terms");
        const btnEnviar = document.querySelector("#submit");
        btnEnviar.addEventListener("click", e => {
        e.preventDefault();
        //this._certificaSenhaETermos();
        //this._padrozinaData();
        const novoUsuario = {
            login: userName.value.trim(),
            senha: senha.value.trim(),
            email: email.value.trim(),
            nascimento: date.value.trim(),
            nome: nome.value.trim(),
            sobrenome: sobrenome.value.trim(),
        };
        this._cadastra(novoUsuario);
        });
    }

    _getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    _cadastra(usuario) {
        usuario.id = this._getRandomInt(0, 100000);       
        if(this._certificaCadastro(usuario)){
            localAPI.salvaDados(usuario);
        }
    }

    _certificaCadastro(usuario) {
        const objDados = localAPI.leDados();
        for (let i = 0; i < objDados.usuarios.length; i++) {
            const element = objDados.usuarios[i];
            if(element.login == usuario.login){
                alert("Ja existe um usuário com esse nome de usuario");
                return false;
            }
            if(element.email == usuario.email){
                alert("Ja existe um usuário com esse email");
                return false;
            }
            if(element.id == usuario.id){
                this._cadastra(usuario);
                return false;
            }
        }
        return true;
    }
}