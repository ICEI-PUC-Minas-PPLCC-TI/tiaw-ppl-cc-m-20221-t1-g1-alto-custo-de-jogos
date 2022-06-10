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
        const objDados = this.leDados();
        const existe = objDados.usuarios.find(usuario => usuario.id == dados.id);
        if(existe) {
            existe.login = dados.login;
            existe.senha = dados.senha;
            existe.email = dados.email;
        }
        else {
            objDados.usuarios.push(dados);
        }
        localStorage.setItem('db', JSON.stringify(objDados));
    }

    static deletarDados(id) {
        const objDados = this.leDados();
        let novosDados = {usuarios: []};
        for (let i = 0; i < objDados.usuarios.length; i++) {
            const element = objDados.usuarios[i].id;
            if(element == id){}
            else{
                novosDados.usuarios.push(objDados.usuarios[i]);
            }
        }
        localStorage.setItem('db', JSON.stringify(novosDados));
    }
}