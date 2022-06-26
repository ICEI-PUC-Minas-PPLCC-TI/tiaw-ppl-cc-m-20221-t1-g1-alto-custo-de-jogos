import localAPI from "../localAPI.js";

export default class{
    constructor(root) {
        document.title = "Cadastro";
        root.innerHTML = `
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
                    <input type="checkbox" id="terms" name="aceitar" value="aceitouTermos">
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
        const formulario = {
            login: userName,
            senha: senha,
            cSenha: confirmaSenha,
            email: email,
            nascimento: date,
            nome: nome,
            sobrenome: sobrenome,
            termos: termos,
        };
        if(this._certificaTudo(formulario)) {
            const novoUsuario = {
                login: userName.value.trim(),
                senha: senha.value.trim(),
                email: email.value.trim(),
                nascimento: date.value.trim(),
                nome: nome.value.trim(),
                sobrenome: sobrenome.value.trim(),
            };
            this._cadastra(novoUsuario);
        }  
        });
    }

    _certificaTudo(obj){
        let verifica = 0;
        if(!this._certificaLogin(obj.login)){
            verifica++;
        }
        if(!this._cetificaSenha(obj.senha, obj.cSenha)){
            verifica++;
        }
        if(!this._certificaEmail(obj.email)){
            verifica++;
        }
        if(!this._certificaNascimento(obj.nascimento)){
            verifica++;
        }
        if(!this._certificaNome(obj.nome)){
            verifica++;
        }
        if(!this._certificaSobrenome(obj.sobrenome)){
            verifica++;
        }
        if(!this._certificaTermos(obj.termos)){
            verifica++;
        }
        if(verifica == 0){
            return true;
        }else {
            return false;
        }
    }

    _certificaNascimento(nascimento) {
        const string = String(nascimento.value.trim());
        if(string.length == 8){
            nascimento.style.border = "";
            return true;
        }else {
            nascimento.style.border = "solid #E8833A";
            alert('Voce deve digitar sua data de nascimento com apenas os 8 numeros (DDMMAAAA) para cadastrar!');
            return false
        }
    }

    _certificaEmail(email) {
        if(email.value.trim()){
            email.style.border = "";
            return true;
        }else {
            email.style.border = "solid #E8833A";
            return false
        }
    }

    _certificaSobrenome(sobrenome) {
        if(sobrenome.value.trim()){
            sobrenome.style.border = "";
            return true;
        }else {
            sobrenome.style.border = "solid #E8833A";
            return false
        }
    }

    _certificaNome(nome) {
        if(nome.value.trim()){
            nome.style.border = "";
            return true;
        }else {
            nome.style.border = "solid #E8833A";
            return false
        }
    }

    _certificaLogin(userName) {
        if(userName.value.trim()){
            userName.style.border = "";
            return true;
        }else {
            userName.style.border = "solid #E8833A";
            return false
        }
    }

    _certificaTermos(termos) {
        if(termos.checked) {
            return true;
        }else {
            alert('voce deve aceitar os termos para se cadastrar');
            return false;
        }
    }

    _cetificaSenha(senha, cSenha){
        if(senha.value.trim() == cSenha.value.trim() && senha.value.trim()!=''){
            senha.style.border = "";
            cSenha.style.border = "";
            return true;
        }else {
            senha.style.border = "solid #E8833A";
            cSenha.style.border = "solid #E8833A";
            return false;
        }
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