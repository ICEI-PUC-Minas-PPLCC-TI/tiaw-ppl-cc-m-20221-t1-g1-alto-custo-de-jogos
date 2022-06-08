export default class localAPI {
    static leDados() {
        let strDados = localStorage.getItem('db');
        let objDados = {};
        if(strDados){
            objDados = JSON.parse(strDados);
        }
        else{
            objDados = {usuarios:[{id: "1", login: "log1", senha: "123", email:"email1@email.com"},{id: "2", login: "log2", senha: "1234", email:"email2@email.com"},{id: "3", login: "log4", senha: "12345", email:"email3@email.com"}]};
        }
        return objDados;
    }

    static salvaDados(dados) {
        let objDados = this.leDados();
        objDados.usuarios.push(dados);
        localStorage.setItem('db', JSON.stringify(objDados));
    }
    // deixar aqui, depois eu vejo
    static incluirContato() {
        
        let objDados = this.leDados();
    
        let xLogin = document.getElementById('login').value;
        let xSenha = document.getElementById('senha').value;
        let xemail = document.getElementById('email').value;
        let igual = 0;
        let novoUsuario = {
            login: xLogin,
            senha: xSenha,
            email: xemail
        };
        for(i=0;i<objDados.usuarios.length;i++){
            if(objDados.usuarios[i].login == xLogin){
                alert('Ja existe um usuário com esse nome');
                igual++;
            }
            if(objDados.usuarios[i].email == xemail){
                alert('Ja existe um usuário com esse email');
                igual++;
            }
        }
        if(igual==0){
            objDados.usuarios.push(novoUsuario);
            salvaDados(objDados);
        }
    }

    static deletarDados(id) {
        let objDados = this.leDados();
        let novosDados = objDados();
    }

    leConta() {
        let strDados = localStorage.getItem('lg');
        let objDados = {};
        objDados = JSON.parse(strDados);
        return objDados;
    }
    
    salvaLogin(conta, index) {
        localStorage.setItem('lg', JSON.stringify(conta));
        localStorage.setItem('i', index);
    }
    
    clearLogin() {
        localStorage.setItem('lg', null);
        localStorage.setItem('i', null);
    }
}