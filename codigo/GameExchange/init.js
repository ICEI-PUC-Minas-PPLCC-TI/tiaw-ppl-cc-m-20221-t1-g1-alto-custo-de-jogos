onload = () => {
    
    let loginStatus = localStorage.getItem('status');
    
    if(loginStatus == null){
        // cria o stats de login
        // 0 - não está logado
        let _obj = { login : 0 };
        localStorage.setItem('status', JSON.stringify(_obj));
    }
}