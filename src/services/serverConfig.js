const Config = {//establecer "local" en el servidor deseado (ya sea localhost o api-tmngr)

    remote : "http://localhost/xdt_domohome/public/",
    local : "https://bienvenido.xpertdt.xyz/public/index.php/",
    dinamic : window.localStorage.getItem('remoteUrl'),
    token : localStorage.getItem('token')

};

export default Config;