const Config = {//establecer "local" en el servidor deseado (ya sea localhost o api-tmngr)

    local : "http://localhost/xdt_domohome/public/",
    remote : "https://api-tmngr.xpertdt.xyz/public/index.php/",
    token : localStorage.getItem('token')

};

export default Config;