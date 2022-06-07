export default () =>{
    const container = document.createElement('div');
    const cadastro = `
        <div class="row">
            <div class="col cadastro">
                <h1>Cadastrar mais um usuario</h1>
                <label for="login">Digite seu nome de usuário: </label>
                <input id="login" type="text"><br>               
                <label for="senha">Digite sua senha: </label>
                <input id="senha" type="text"><br>            
                <label for="email">Digite seu email: </label>
                <input id="email" type="text"><br>
                <button  id="enviar">Enviar cadastro</button>
            </div>            
        </div>
    `;
    container.innerHTML() = cadastro;
    return container;
}