onload = () => {
    let loginStatus = JSON.parse(localStorage.getItem('status'));
    const objDados = JSON.parse(localStorage.getItem('users'));
    if(loginStatus == null){
        // cria o stats de login
        // 0 - não está logado
        let _obj = { login : 0, id : 0};
        localStorage.setItem('status', JSON.stringify(_obj));
    }

    if(loginStatus.login != 0){
        const logado = objDados.usuarios.find(usuario => usuario.id == loginStatus.id);
        const bemVindo = document.querySelector("#areaBemVindo");
        bemVindo.innerHTML = `<p>Bem vindo ${logado.login}! <button id="sair" class="butao">Sair</button></p>`;
        document.querySelector("#sair").addEventListener('click', () => {
            let _obj = { login : 0, id : 0};
            localStorage.setItem('status', JSON.stringify(_obj));
            window.location.reload();
        });
    }

    if(objDados == null){
        let userKey = {
            usuarios : [
            ]
        }
    
        localStorage.setItem('users', JSON.stringify(userKey));
    }


}